'use server';
/**
 * @fileOverview Provides AI-generated suggested pricing ranges for billboards based on various attributes.
 *
 * - aiPricingGuidance - A function that handles the AI pricing guidance process.
 * - AiPricingGuidanceInput - The input type for the aiPricingGuidance function.
 * - AiPricingGuidanceOutput - The return type for the aiPricingGuidance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AiPricingGuidanceInputSchema = z.object({
  billboardId: z.string().describe('The unique identifier of the billboard.'),
  city: z.string().describe('The city where the billboard is located.'),
  region: z.string().describe('The region where the billboard is located (e.g., Greater Accra).'),
  latitude: z.number().describe('The latitude coordinate of the billboard.'),
  longitude: z.number().describe('The longitude coordinate of the billboard.'),
  type: z.enum(['Unipole', 'Gantry', 'Wall', 'Digital LED']).describe('The type of the billboard.'),
  size: z.string().describe('The physical dimensions of the billboard (e.g., "10x20 ft", "3x6 m").'),
  trafficEstimate: z.number().describe('An estimated daily traffic count around the billboard location.'),
  visibilityScore: z.number().min(0).max(10).describe('A score from 0-10 indicating the visibility of the billboard (10 being excellent).'),
  isDigital: z.boolean().describe('True if the billboard is a digital LED display, false otherwise.')
});
export type AiPricingGuidanceInput = z.infer<typeof AiPricingGuidanceInputSchema>;

// Output Schema
const AiPricingGuidanceOutputSchema = z.object({
  suggestedMinPricePerMonth: z.number().min(0).describe('The suggested minimum monthly price in GH₵ for the billboard.'),
  suggestedMaxPricePerMonth: z.number().min(0).describe('The suggested maximum monthly price in GH₵ for the billboard.'),
  rationale: z.string().describe('A detailed explanation for the suggested pricing range, considering all input factors.')
});
export type AiPricingGuidanceOutput = z.infer<typeof AiPricingGuidanceOutputSchema>;

// Prompt definition
const aiPricingGuidancePrompt = ai.definePrompt({
  name: 'aiPricingGuidancePrompt',
  input: { schema: AiPricingGuidanceInputSchema },
  output: { schema: AiPricingGuidanceOutputSchema },
  prompt: `You are an expert market analyst and pricing consultant specializing in outdoor advertising in Ghana.
Your task is to provide a suggested monthly rental price range (in Ghanaian Cedis - GH₵) for a billboard, along with a detailed rationale.
The pricing suggestions are for an administrator to consider, NOT for automatic pricing.
The suggested range should be competitive and profitable, taking into account the Ghanaian market context.

Analyze the following billboard characteristics:
- Billboard ID: {{{billboardId}}}
- Location: {{{city}}}, {{{region}}} (Latitude: {{{latitude}}}, Longitude: {{{longitude}}})
- Type: {{{type}}}
- Size: {{{size}}}
- Traffic Estimate: {{{trafficEstimate}}} vehicles/people per day
- Visibility Score: {{{visibilityScore}}}/10
- Is Digital: {{#if isDigital}}Yes{{else}}No{{/if}}

Consider these factors when determining the price range:
1.  **Location:** High-traffic, prime areas in major cities (e.g., Accra, Kumasi) will command higher prices.
2.  **Type:** Digital LED billboards generally have higher value than static ones due to dynamic content capabilities.
3.  **Size:** Larger billboards typically cost more.
4.  **Traffic and Visibility:** Higher traffic estimates and visibility scores directly correlate with higher advertising value.
5.  **Market Conditions:** Acknowledge the general economic climate and advertising demand in Ghana.

Provide a conservative yet realistic monthly price range in GH₵.
Ensure the rationale clearly explains how each factor contributed to your suggestion.

Example Output Format:
{
  "suggestedMinPricePerMonth": 1500,
  "suggestedMaxPricePerMonth": 2500,
  "rationale": "Based on a prime location in Accra, high traffic, and digital capabilities, a range of GH₵ 1500-2500 is suggested. The high visibility score further justifies the upper end of this range..."
}
`
});

// Flow definition
const aiPricingGuidanceFlow = ai.defineFlow(
  {
    name: 'aiPricingGuidanceFlow',
    inputSchema: AiPricingGuidanceInputSchema,
    outputSchema: AiPricingGuidanceOutputSchema
  },
  async (input) => {
    const { output } = await aiPricingGuidancePrompt(input);
    if (!output) {
      throw new Error('AI pricing guidance prompt did not return any output.');
    }
    return output;
  }
);

// Wrapper function
export async function aiPricingGuidance(
  input: AiPricingGuidanceInput
): Promise<AiPricingGuidanceOutput> {
  return aiPricingGuidanceFlow(input);
}
