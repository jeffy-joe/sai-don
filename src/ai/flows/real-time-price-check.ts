'use server';

/**
 * @fileOverview A flow that uses Gemini to fetch "real-time" cloud pricing data for a specific service.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RealTimePriceInputSchema = z.object({
  provider: z.string(),
  serviceName: z.string(),
  instanceType: z.string().optional(),
  region: z.string(),
  category: z.string(),
});
export type RealTimePriceInput = z.infer<typeof RealTimePriceInputSchema>;

const RealTimePriceOutputSchema = z.object({
  price: z.number().describe('The verified current price for the service.'),
  pricingUnit: z.string().describe('The unit of pricing (e.g., hour, GB/month).'),
  lastVerified: z.string().describe('The timestamp of verification.'),
  confidence: z.number().describe('Confidence score of the price accuracy (0-1).'),
  notes: z.string().optional().describe('Any specific details about the price (e.g., free tier info).'),
});
export type RealTimePriceOutput = z.infer<typeof RealTimePriceOutputSchema>;

const priceCheckPrompt = ai.definePrompt({
  name: 'priceCheckPrompt',
  input: { schema: RealTimePriceInputSchema },
  output: { schema: RealTimePriceOutputSchema },
  prompt: `You are a cloud infrastructure pricing expert. Your task is to provide the most current, real-time pricing for the following cloud service.

Provider: {{{provider}}}
Service: {{{serviceName}}}
{{#if instanceType}}Instance Type: {{{instanceType}}}{{/if}}
Region: {{{region}}}
Category: {{{category}}}

Rules:
1. Provide the most accurate current market price.
2. If it's a compute instance, provide the hourly price.
3. If it's storage, provide the price per GB per month.
4. Ensure the output is a raw number (no currency symbols).
5. If the exact instance is discontinued, provide the price of its direct successor.
`,
});

export async function getRealTimePrice(input: RealTimePriceInput): Promise<RealTimePriceOutput> {
  return realTimePriceCheckFlow(input);
}

const realTimePriceCheckFlow = ai.defineFlow(
  {
    name: 'realTimePriceCheckFlow',
    inputSchema: RealTimePriceInputSchema,
    outputSchema: RealTimePriceOutputSchema,
  },
  async (input) => {
    const { output } = await priceCheckPrompt(input);
    return output!;
  }
);
