'use server';
/**
 * @fileOverview An AI agent that generates compelling billboard descriptions.
 *
 * - generateBillboardDescription - A function that handles the billboard description generation process.
 * - GenerateBillboardDescriptionInput - The input type for the generateBillboardDescription function.
 * - GenerateBillboardDescriptionOutput - The return type for the generateBillboardDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBillboardDescriptionInputSchema = z.object({
  type: z.string().describe('The type of billboard (e.g., Unipole, Gantry, Wall, Digital LED).'),
  size: z.string().describe('The physical dimensions of the billboard (e.g., "10x20 feet").'),
  region: z.string().describe('The region where the billboard is located (e.g., "Greater Accra").'),
  city: z.string().describe('The city where the billboard is located (e.g., "Accra").'),
  address: z.string().describe('The specific address or prominent landmark near the billboard.'),
  trafficEstimate: z.string().describe('An estimate of daily traffic volume at the billboard location (e.g., "high", "moderate", "low").'),
  visibilityScore: z.string().describe('A score indicating the visibility of the billboard (e.g., "excellent", "good", "fair").'),
});
export type GenerateBillboardDescriptionInput = z.infer<typeof GenerateBillboardDescriptionInputSchema>;

const GenerateBillboardDescriptionOutputSchema = z.string().describe('A compelling and detailed description for the billboard listing.');
export type GenerateBillboardDescriptionOutput = z.infer<typeof GenerateBillboardDescriptionOutputSchema>;

export async function generateBillboardDescription(input: GenerateBillboardDescriptionInput): Promise<GenerateBillboardDescriptionOutput> {
  return generateBillboardDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBillboardDescriptionPrompt',
  input: { schema: GenerateBillboardDescriptionInputSchema },
  output: { schema: GenerateBillboardDescriptionOutputSchema },
  prompt: `You are an expert marketing copywriter specializing in outdoor advertising in Ghana. Your task is to create a compelling and detailed description for a billboard listing based on the provided attributes. Focus on highlighting the unique selling points and appeal to potential advertisers.

Billboard Details:
Type: {{{type}}}
Size: {{{size}}}
Region: {{{region}}}
City: {{{city}}}
Address: {{{address}}}
Traffic Estimate: {{{trafficEstimate}}}
Visibility Score: {{{visibilityScore}}}

Craft a vivid, engaging description that would make an advertiser want to book this space. Ensure the tone is professional and persuasive. The description should be a single paragraph, no more than 250 words.`,
});

const generateBillboardDescriptionFlow = ai.defineFlow(
  {
    name: 'generateBillboardDescriptionFlow',
    inputSchema: GenerateBillboardDescriptionInputSchema,
    outputSchema: GenerateBillboardDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
