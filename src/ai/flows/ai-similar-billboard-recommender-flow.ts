'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating AI-powered recommendations
 * for similar billboards based on provided criteria such as type, size, price, and proximity.
 *
 * - aiSimilarBillboardRecommender - A function to get AI-generated similar billboard recommendations.
 * - SimilarBillboardRecommenderInput - The input type for the aiSimilarBillboardRecommender function.
 * - SimilarBillboardRecommenderOutput - The return type for the aiSimilarBillboardRecommender function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimilarBillboardRecommenderInputSchema = z.object({
  currentBillboard: z.object({
    id: z.string().describe('The ID of the currently viewed billboard.'),
    title: z.string().describe('The title of the currently viewed billboard.'),
    type: z.string().describe('The type of the currently viewed billboard (e.g., Unipole, Gantry, Wall, Digital LED).'),
    size: z.string().describe('The size of the currently viewed billboard.'),
    pricePerMonth: z.number().describe('The price per month of the currently viewed billboard.'),
    city: z.string().describe('The city where the currently viewed billboard is located.'),
    address: z.string().describe('The address of the currently viewed billboard.'),
    latitude: z.number().describe('The latitude of the currently viewed billboard.'),
    longitude: z.number().describe('The longitude of the currently viewed billboard.'),
  }).describe('Details of the billboard for which similar recommendations are requested.'),
  // Note: The LLM currently cannot effectively filter against a dynamic list of existingBillboardIds
  // directly within the prompt without external tool calls. For this flow, the AI generates
  // hypothetical new IDs. If filtering real IDs from a database is required, a tool would be necessary.
  // existingBillboardIds: z.array(z.string()).describe('A list of billboard IDs that should be excluded from recommendations.'),
});
export type SimilarBillboardRecommenderInput = z.infer<typeof SimilarBillboardRecommenderInputSchema>;

const RecommendedBillboardSchema = z.object({
  id: z.string().describe('A unique identifier for the recommended billboard (e.g., a UUID).'),
  title: z.string().describe('A descriptive title for the recommended billboard.'),
  type: z.string().describe('The type of the recommended billboard (e.g., Unipole, Gantry, Wall, Digital LED).'),
  size: z.string().describe('The size of the recommended billboard.'),
  pricePerMonth: z.number().describe('The estimated price per month for the recommended billboard.'),
  city: z.string().describe('The city where the recommended billboard is located.'),
  address: z.string().describe('The address of the recommended billboard.'),
  latitude: z.number().describe('The latitude of the recommended billboard.'),
  longitude: z.number().describe('The longitude of the recommended billboard.'),
  reason: z.string().describe('A brief explanation of why this billboard is recommended as similar.'),
});

const SimilarBillboardRecommenderOutputSchema = z.object({
  recommendations: z.array(RecommendedBillboardSchema).describe('A list of similar billboard recommendations.'),
});
export type SimilarBillboardRecommenderOutput = z.infer<typeof SimilarBillboardRecommenderOutputSchema>;

export async function aiSimilarBillboardRecommender(input: SimilarBillboardRecommenderInput): Promise<SimilarBillboardRecommenderOutput> {
  return similarBillboardRecommenderFlow(input);
}

const similarBillboardRecommenderPrompt = ai.definePrompt({
  name: 'similarBillboardRecommenderPrompt',
  input: { schema: SimilarBillboardRecommenderInputSchema },
  output: { schema: SimilarBillboardRecommenderOutputSchema },
  prompt: `You are an AI assistant specialized in outdoor advertising in Ghana. Your task is to recommend 5 similar billboards based on the provided billboard details. The recommendations should be hypothetical but realistic, varying slightly in price (e.g., within +/- 15%), location (within the same city or a closely neighboring area, with latitude/longitude slightly adjusted by up to 0.05 degrees), size, and type, while maintaining overall similarity to the 'currentBillboard'.

Ensure that the generated billboard IDs are unique and distinct from the 'currentBillboard.id'. Provide a brief reason for each recommendation, highlighting the similarities.

Here are the details of the billboard for which you need to find similar recommendations:

Current Billboard Details:
- ID: {{{currentBillboard.id}}}
- Title: {{{currentBillboard.title}}}
- Type: {{{currentBillboard.type}}}
- Size: {{{currentBillboard.size}}}
- Price Per Month: {{{currentBillboard.pricePerMonth}}} GH₵
- City: {{{currentBillboard.city}}}
- Address: {{{currentBillboard.address}}}
- Latitude: {{{currentBillboard.latitude}}}
- Longitude: {{{currentBillboard.longitude}}}

Generate 5 similar billboard recommendations. Each recommendation must include a unique ID, title, type, size, pricePerMonth, city, address, latitude, longitude, and a 'reason' explaining its similarity. Remember to generate new, hypothetical details.`,
});

const similarBillboardRecommenderFlow = ai.defineFlow(
  {
    name: 'similarBillboardRecommenderFlow',
    inputSchema: SimilarBillboardRecommenderInputSchema,
    outputSchema: SimilarBillboardRecommenderOutputSchema,
  },
  async (input) => {
    const { output } = await similarBillboardRecommenderPrompt(input);
    if (!output) {
      throw new Error('Failed to generate billboard recommendations.');
    }
    return output;
  }
);
