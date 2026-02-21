'use server';
/**
 * @fileOverview Asibi, the Adspace AI Assistant.
 *
 * - asibiAssistant - A function that handles user queries about the platform.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { billboards, vendors, bookings } from '@/lib/data';
import { Role } from '@/lib/types';

const AsibiInputSchema = z.object({
  query: z.string().describe("The user's question about billboards, vendors, campaigns, or the platform."),
  userRole: z.enum(['ADMIN', 'VENDOR', 'USER']).describe('The role of the user asking the question.'),
});
export type AsibiInput = z.infer<typeof AsibiInputSchema>;

const AsibiOutputSchema = z.string().describe('A helpful and context-aware answer from Asibi.');
export type AsibiOutput = z.infer<typeof AsibiOutputSchema>;

export async function asibiAssistant(input: AsibiInput): Promise<AsibiOutput> {
  return asibiAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'asibiAssistantPrompt',
  input: { schema: AsibiInputSchema },
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

Based ONLY on the data provided, answer the user's question. Be conversational. If the data doesn't contain the answer, say that you don't have enough information to answer, but you can help with other questions. Do not make up information.

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
    const { output } = await prompt({
        ...input,
        // @ts-ignore
        billboards,
        // @ts-ignore
        vendors,
        // @ts-ignore
        bookings
    });
    return output!;
  }
);
