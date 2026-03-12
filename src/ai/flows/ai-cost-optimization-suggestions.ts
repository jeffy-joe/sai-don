'use server';

/**
 * @fileOverview This file implements a Genkit flow that analyzes a user's current cloud infrastructure
 * and usage patterns to provide AI-driven suggestions for more cost-effective service configurations or instance types.
 * It strictly uses AI reasoning for cost estimation without hardcoded formulas.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const allCloudProviders = ["AWS", "Microsoft Azure", "Google Cloud Platform"] as const;
const allServiceCategories = [
  "Compute", "Storage", "Database", "Networking", "Containers & Kubernetes",
  "AI / Machine Learning", "Analytics / Big Data", "DevOps & CI/CD",
  "Monitoring & Logging", "Security Services", "CDN & Edge", "Messaging & Integration"
] as const;

const CurrentServiceSchema = z.object({
  id: z.string().describe('Unique ID for this service instance in the current infrastructure.'),
  provider: z.enum(allCloudProviders).describe('The cloud provider for this service.'),
  category: z.enum(allServiceCategories).describe('The category of the cloud service.'),
  service_name: z.string().describe('The name of the cloud service.'),
  description: z.string().describe('A brief description of how the service is currently being used.'),
  estimated_monthly_cost: z.number().describe('The user\'s estimated monthly cost.'),
  usage_details: z.record(z.any()).describe('Usage parameters (hours, storage, requests).')
});

const AICostOptimizationSuggestionsInputSchema = z.object({
  currentInfrastructure: z.array(CurrentServiceSchema).describe('The user\'s current cloud infrastructure.'),
});
export type AICostOptimizationSuggestionsInput = z.infer<typeof AICostOptimizationSuggestionsInputSchema>;

const SuggestedServiceSchema = z.object({
  provider: z.enum(allCloudProviders).describe('The suggested provider.'),
  category: z.enum(allServiceCategories).describe('The suggested category.'),
  service_name: z.string().describe('The suggested service name.'),
  configuration: z.record(z.any()).describe('The suggested configuration.'),
  estimated_monthly_cost: z.number().describe('The estimated monthly cost of the suggestion.'),
});

const CostOptimizationSuggestionSchema = z.object({
  originalServiceId: z.string().describe('ID of the service being optimized.'),
  originalServiceDescription: z.string().describe('Description of the original service.'),
  suggestedService: SuggestedServiceSchema.describe('Details of the optimized alternative.'),
  monthlySavings: z.number().describe('Estimated monthly savings.'),
  reason: z.string().describe('Reasoning for the suggestion.'),
});

const AICostOptimizationSuggestionsOutputSchema = z.object({
  suggestions: z.array(CostOptimizationSuggestionSchema).describe('List of suggestions.'),
  summary: z.string().describe('Summary of potential savings.'),
});
export type AICostOptimizationSuggestionsOutput = z.infer<typeof AICostOptimizationSuggestionsOutputSchema>;

const aiCostOptimizationSuggestionsPrompt = ai.definePrompt({
  name: 'aiCostOptimizationSuggestionsPrompt',
  input: {
    schema: z.object({
      currentInfrastructureJson: z.string(),
    }),
  },
  output: { schema: AICostOptimizationSuggestionsOutputSchema },
  prompt: `You are a world-class cloud cost optimization specialist. 
Analyze the provided cloud infrastructure and suggest cheaper, equivalent alternatives across AWS, Azure, and Google Cloud.

User Infrastructure:
{{{currentInfrastructureJson}}}

Rules:
1. Always suggest more cost-effective instance types or tiers (e.g., S3 Glacier for archive, E2 instances for burstable workloads).
2. Compare cross-provider if significant savings exist (e.g., AWS Lambda vs Azure Functions).
3. Identify over-provisioned resources (e.g., c5.2xlarge used for simple web server).
4. For databases, consider if managed serverless options (DynamoDB/Firestore) are cheaper for small workloads.
5. For CDN and Networking, suggest provider-specific cost-saving plans or alternative regions if applicable.
6. Provide a detailed reasoning for each suggestion based on current cloud market trends.
7. Return estimated monthly savings as a raw number.
`
});

export async function aiCostOptimizationSuggestions(input: AICostOptimizationSuggestionsInput): Promise<AICostOptimizationSuggestionsOutput> {
  return aiCostOptimizationSuggestionsFlow(input);
}

const aiCostOptimizationSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiCostOptimizationSuggestionsFlow',
    inputSchema: AICostOptimizationSuggestionsInputSchema,
    outputSchema: AICostOptimizationSuggestionsOutputSchema,
  },
  async (input) => {
    const {output} = await aiCostOptimizationSuggestionsPrompt({ 
      currentInfrastructureJson: JSON.stringify(input.currentInfrastructure) 
    });
    return output!;
  }
);
