'use server';
/**
 * @fileOverview This file implements a Genkit flow that provides AI-powered recommendations for optimal billboard locations.
 *
 * - aiCampaignLocationRecommender - A function that handles the campaign location recommendation process.
 * - AiCampaignLocationRecommenderInput - The input type for the aiCampaignLocationRecommender function.
 * - AiCampaignLocationRecommenderOutput - The return type for the aiCampaignLocationRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const AiCampaignLocationRecommenderInputSchema = z.object({
  targetAudience: z.string().describe('A detailed description of the target audience for the campaign (e.g., age, interests, income level, location preferences).'),
  budget: z.string().describe('A description of the campaign budget (e.g., "low", "medium", "high", or a specific range like "GH₵ 5000-10000 per month").'),
  campaignGoals: z.string().describe('A detailed description of the campaign goals (e.g., "increase brand awareness by 20%", "drive foot traffic to new store in Accra", "generate leads for online courses").'),
  availableLocations: z.array(z.object({
    id: z.string().describe('Unique identifier for the billboard.'),
    title: z.string().describe('Title or name of the billboard.'),
    city: z.string().describe('City where the billboard is located.'),
    region: z.string().describe('Region where the billboard is located.'),
    trafficEstimate: z.number().optional().describe('Estimated daily traffic passing the billboard.'),
    visibilityScore: z.number().optional().describe('A score indicating the visibility of the billboard (e.g., 1-10).'),
    isDigital: z.boolean().optional().describe('True if the billboard is a digital LED, false otherwise.'),
  })).optional().describe('Optional list of available billboard locations with relevant data to inform recommendations.'),
});
export type AiCampaignLocationRecommenderInput = z.infer<typeof AiCampaignLocationRecommenderInputSchema>;

// Output Schema
const AiCampaignLocationRecommenderOutputSchema = z.object({
  recommendedLocations: z.array(z.object({
    city: z.string().describe('The recommended city or major area for billboard placement.'),
    reason: z.string().describe('A detailed justification for why this location is recommended based on the target audience, budget, and campaign goals.'),
    suitabilityScore: z.number().min(0).max(100).describe('A score from 0-100 indicating the suitability of this location for the campaign.'),
  })).describe('A list of recommended locations for billboard placement.'),
  generalAdvice: z.string().describe('General advice and insights to maximize the effectiveness of the outdoor advertising campaign.'),
  suggestedPricingRange: z.object({
    min: z.number().describe('Suggested minimum price per month for billboards in the recommended locations, in GH₵.'),
    max: z.number().describe('Suggested maximum price per month for billboards in the recommended locations, in GH₵.'),
  }).optional().describe('An optional suggested pricing range (GH₵ per month) for billboards in the recommended locations, for admin internal reference. This is not for automatic pricing.'),
});
export type AiCampaignLocationRecommenderOutput = z.infer<typeof AiCampaignLocationRecommenderOutputSchema>;

export async function aiCampaignLocationRecommender(input: AiCampaignLocationRecommenderInput): Promise<AiCampaignLocationRecommenderOutput> {
  return aiCampaignLocationRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCampaignLocationRecommenderPrompt',
  input: {schema: AiCampaignLocationRecommenderInputSchema},
  output: {schema: AiCampaignLocationRecommenderOutputSchema},
  prompt: `You are an expert outdoor advertising consultant specializing in the Ghanaian market.
Consider the unique characteristics of Ghana, including popular cities, regions, and traffic patterns.

Available Billboard Information (if provided):
{{#if availableLocations}}
'''json
{{{json availableLocations}}}
'''
{{else}}
No specific billboard data provided. Rely on general market knowledge.
{{/if}}

Target Audience: {{{targetAudience}}}
Campaign Budget: {{{budget}}}
Campaign Goals: {{{campaignGoals}}}

Based on this information, recommend optimal locations, provide clear justifications, and offer general advice for the campaign. Additionally, provide a suggested pricing range for billboards in these recommended locations to assist the admin with manual pricing decisions (this is for internal reference only and will not be used for automatic pricing).

Please provide the output in the specified JSON format.`,
});

const aiCampaignLocationRecommenderFlow = ai.defineFlow(
  {
    name: 'aiCampaignLocationRecommenderFlow',
    inputSchema: AiCampaignLocationRecommenderInputSchema,
    outputSchema: AiCampaignLocationRecommenderOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
