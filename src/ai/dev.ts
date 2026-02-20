import { config } from 'dotenv';
config();

import '@/ai/flows/ai-billboard-description-generator.ts';
import '@/ai/flows/ai-campaign-location-recommender.ts';
import '@/ai/flows/ai-similar-billboard-recommender-flow.ts';
import '@/ai/flows/ai-pricing-guidance.ts';