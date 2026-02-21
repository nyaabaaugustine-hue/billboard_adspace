'use server';
/**
 * @fileOverview Asibi, the Adspace AI Assistant.
 *
 * - asibiAssistant - A function that handles user queries about the platform.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { firestore } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Role } from '@/lib/types';

const AsibiInputSchema = z.object({
  query: z.string().describe("The user's question about billboards, vendors, campaigns, or the platform."),
  userRole: z.enum(['ADMIN', 'VENDOR', 'USER']).describe('The role of the user asking the question.'),
  userId: z.string().optional().describe("The user's unique ID. This is required for non-admin roles to fetch user-specific data like bookings."),
});
export type AsibiInput = z.infer<typeof AsibiInputSchema>;

const AsibiOutputSchema = z.string().describe('A helpful and context-aware answer from Asibi.');
export type AsibiOutput = z.infer<typeof AsibiOutputSchema>;

export async function asibiAssistant(input: AsibiInput): Promise<AsibiOutput> {
  return asibiAssistantFlow(input);
}

// Define an extended schema for the prompt's input
const AsibiPromptInputSchema = AsibiInputSchema.extend({
    billboards: z.array(z.any()).describe('List of all billboard documents from the database.'),
    vendors: z.array(z.any()).describe('List of all vendor documents from the database.'),
    bookings: z.array(z.any()).describe('List of all booking documents from the database.'),
});


const prompt = ai.definePrompt({
  name: 'asibiAssistantPrompt',
  input: { schema: AsibiPromptInputSchema }, // Use the extended schema
  output: { schema: AsibiOutputSchema },
  prompt: `You are Asibi, an expert AI assistant for Adspace, a billboard advertising platform in Ghana. Your role is to provide helpful, accurate, and concise information to users based on the platform's data. Your persona is friendly, professional, and an expert on the Ghanaian advertising market.

The user asking the question has the role: {{{userRole}}}. Tailor your response to be most helpful for this type of user.
- For 'USER' (Advertisers), focus on campaign planning, billboard discovery, and booking.
- For 'VENDOR', focus on managing listings, performance, and earnings.
- For 'ADMIN', focus on platform overview, trends, and management tasks.

Here is the current platform data (in JSON format):
Billboards Data:
\`\`\`json
{{{json billboards}}}
\`\`\`

Vendors Data:
\`\`\`json
{{{json vendors}}}
\`\`\`

Bookings Data:
\`\`\`json
{{{json bookings}}}
\`\`\`

Based ONLY on the data provided, answer the user's question. Be conversational. If the data doesn't contain the answer, say that you don't have enough information to answer, but you can help with other questions. Do not make up information. Do not answer any questions about security, passwords, or user credentials.

User's question: "{{{query}}}"
`,
});

const asibiAssistantFlow = ai.defineFlow(
  {
    name: 'asibiAssistantFlow',
    inputSchema: AsibiInputSchema,
    outputSchema: AsibiOutputSchema,
  },
  async (input) => {
    // Fetch data from Firestore
    const billboardsCol = collection(firestore, 'billboards');
    const vendorsCol = collection(firestore, 'vendors');
    const bookingsCol = collection(firestore, 'bookings');

    let bookingsPromise;
    if (input.userRole === 'ADMIN') {
        // Admins can see all bookings
        bookingsPromise = getDocs(bookingsCol);
    } else if (input.userId) {
        // Users/Vendors can only see their own bookings
        const userBookingsQuery = query(bookingsCol, where('userId', '==', input.userId));
        bookingsPromise = getDocs(userBookingsQuery);
    } else {
        // No user ID, so no bookings can be fetched.
        bookingsPromise = Promise.resolve(null);
    }

    const [billboardsSnapshot, vendorsSnapshot, bookingsSnapshot] = await Promise.all([
        getDocs(billboardsCol),
        getDocs(vendorsCol),
        bookingsPromise
    ]);
    
    const billboards = billboardsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    const vendors = vendorsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    const bookings = bookingsSnapshot ? bookingsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) : [];

    const { output } = await prompt({
        ...input,
        billboards,
        vendors,
        bookings
    });
    return output!;
  }
);
