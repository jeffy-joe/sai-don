'use server';

/**
 * @fileOverview This file implements a Genkit flow that analyzes a user's current cloud infrastructure
 * and usage patterns to provide AI-driven suggestions for more cost-effective service configurations or instance types.
 *
 * - aiCostOptimizationSuggestions - The main function to call the AI for cost optimization suggestions.
 * - AICostOptimizationSuggestionsInput - The input type for the aiCostOptimizationSuggestions function.
 * - AICostOptimizationSuggestionsOutput - The return type for the aiCostOptimizationSuggestions function.
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
  service_name: z.string().describe('The name of the cloud service (e.g., EC2, S3, Lambda, Virtual Machines).'),
  description: z.string().describe('A brief description of how the service is currently being used and its configuration.'),
  estimated_monthly_cost: z.number().describe('The user\'s estimated monthly cost for this specific service instance.'),
  usage_details: z.record(z.any()).describe('A flexible object containing specific usage parameters for the service (e.g., hours_per_month, storage_gb, requests_per_month, vCPU, RAM, instance_type). For compute instances, include `hours_per_month`. For storage, `storage_gb`. For serverless requests, `requests_per_month`. For databases, include relevant metrics like `hours_per_month`, `writes_per_month`, `reads_per_month`, or `ru_s_per_hour`. For networking, `data_transfer_gb_per_month`.')
});

const AICostOptimizationSuggestionsInputSchema = z.object({
  currentInfrastructure: z.array(CurrentServiceSchema).describe('An array of services currently used or planned by the user, with their estimated usage and cost.'),
});
export type AICostOptimizationSuggestionsInput = z.infer<typeof AICostOptimizationSuggestionsInputSchema>;

const SuggestedServiceSchema = z.object({
  provider: z.enum(allCloudProviders).describe('The cloud provider for the suggested service.'),
  category: z.enum(allServiceCategories).describe('The category of the suggested cloud service.'),
  service_name: z.string().describe('The name of the suggested cloud service.'),
  configuration: z.record(z.any()).describe('A flexible object describing the suggested service configuration (e.g., instance_type, vCPU, RAM, storage_gb, or other relevant parameters).'),
  estimated_monthly_cost: z.number().describe('The estimated monthly cost of the suggested service configuration.'),
});

const CostOptimizationSuggestionSchema = z.object({
  originalServiceId: z.string().describe('The ID of the original service from the input that this suggestion applies to.'),
  originalServiceDescription: z.string().describe('A description of the original service configuration for context.'),
  suggestedService: SuggestedServiceSchema.describe('Details of the alternative, more cost-effective service configuration.'),
  monthlySavings: z.number().describe('The estimated monthly cost savings by switching to the suggested service.'),
  reason: z.string().describe('An explanation of why this suggestion is more cost-effective and how it meets the original service\'s needs, considering the provided usage details.'),
});

const AICostOptimizationSuggestionsOutputSchema = z.object({
  suggestions: z.array(CostOptimizationSuggestionSchema).describe('A list of AI-driven suggestions for optimizing cloud costs.'),
  summary: z.string().describe('A general summary of the optimization potential across the provided infrastructure.'),
});
export type AICostOptimizationSuggestionsOutput = z.infer<typeof AICostOptimizationSuggestionsOutputSchema>;

// The comprehensive pricing data for various cloud services.
const pricingDataJson = `
[
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.nano", "vCPU": 2, "RAM": "0.5GB", "price_per_hour": 0.0052, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.micro", "vCPU": 2, "RAM": "1GB", "price_per_hour": 0.0104, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.small", "vCPU": 2, "RAM": "2GB", "price_per_hour": 0.0208, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.medium", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.0416, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.large", "vCPU": 2, "RAM": "8GB", "price_per_hour": 0.0832, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.large", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.085, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.xlarge", "vCPU": 4, "RAM": "8GB", "price_per_hour": 0.17, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.2xlarge", "vCPU": 8, "RAM": "16GB", "price_per_hour": 0.34, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "r5.large", "vCPU": 2, "RAM": "16GB", "price_per_hour": 0.126, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "r5.xlarge", "vCPU": 4, "RAM": "32GB", "price_per_hour": 0.252, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Compute", "service_name": "Lambda", "resource_type": "requests", "price_per_unit": 0.20, "unit_multiplier": 1000000 },
  { "provider": "AWS", "category": "Compute", "service_name": "Lambda", "resource_type": "duration", "price_per_unit": 0.00001667 },
  
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B1s", "vCPU": 1, "RAM": "1GB", "price_per_hour": 0.012, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B2s", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.046, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "D2s v3", "vCPU": 2, "RAM": "8GB", "price_per_hour": 0.096, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "D4s v3", "vCPU": 4, "RAM": "16GB", "price_per_hour": 0.192, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Azure Functions", "price_per_unit": 0.20, "unit_multiplier": 1000000 },

  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-micro", "price_per_hour": 0.008, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-small", "price_per_hour": 0.017, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-medium", "price_per_hour": 0.033, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "n2-standard-2", "price_per_hour": 0.097, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "n2-standard-4", "price_per_hour": 0.194, "billing_cycle": "hour" },

  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard", "price_per_gb_month": 0.023 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard-IA", "price_per_gb_month": 0.0125 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Glacier", "price_per_gb_month": 0.004 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Deep Archive", "price_per_gb_month": 0.00099 },
  { "provider": "AWS", "category": "Storage", "service_name": "EBS GP SSD", "price_per_gb_month": 0.10 },
  { "provider": "AWS", "category": "Storage", "service_name": "EBS PIOPS SSD", "price_per_gb_month": 0.125 },

  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Hot", "price_per_gb_month": 0.0184 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Cool", "price_per_gb_month": 0.01 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Archive", "price_per_gb_month": 0.002 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Managed Disk Standard HDD", "price_per_gb_month": 0.05 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Managed Disk Premium SSD", "price_per_gb_month": 0.12 },

  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Standard", "price_per_gb_month": 0.020 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Nearline", "price_per_gb_month": 0.010 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Coldline", "price_per_gb_month": 0.004 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Archive", "price_per_gb_month": 0.0012 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Persistent Disk Standard", "price_per_gb_month": 0.04 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Persistent Disk SSD", "price_per_gb_month": 0.17 }
]
`;

const aiCostOptimizationSuggestionsPrompt = ai.definePrompt({
  name: 'aiCostOptimizationSuggestionsPrompt',
  input: {
    schema: z.object({
      currentInfrastructureJson: z.string().describe('JSON string of the user\'s current infrastructure configuration.'),
    }),
  },
  output: { schema: AICostOptimizationSuggestionsOutputSchema },
  prompt: `You are an expert cloud architect and cost optimization specialist for AWS, Azure, and Google Cloud Platform.
Your task is to analyze a user's existing or planned cloud infrastructure, identify areas for cost reduction, and suggest more cost-effective service configurations or instance types.

Here is a comprehensive list of pricing data for various cloud services you should use for your analysis. Use this data exclusively for pricing.
This pricing data is in JSON format:
${pricingDataJson}

Here is the user's current cloud infrastructure configuration, which is a JSON array of services, including estimated usage patterns for each:
{{{currentInfrastructureJson}}}

Instructions for your analysis:
1.  Parse the 'currentInfrastructureJson' to understand the user's current setup.
2.  Review each service in the parsed 'currentInfrastructure' array.
3.  For each service, identify alternative service configurations or instance types (either within the same provider or a different one) that offer similar functionality but at a lower monthly cost.
4.  **Crucially, use the 'usage_details' for each service in 'currentInfrastructure' to accurately calculate the estimated monthly cost of both the original service (if not explicitly provided, calculate it) and any suggested alternatives.**
    *   **Hourly Services (e.g., EC2, Azure VMs, GCP Compute Engine, RDS):** Assume 730 hours per month for calculations if 'hours_per_month' is not explicitly provided.
    *   **Storage Services (e.g., S3, EBS, Blob Storage, Persistent Disk):** Calculate monthly cost using 'price_per_gb_month' multiplied by the 'storage_gb' provided in usage_details.
    *   **Usage-Based Services (e.g., Lambda, Azure Functions):** Divide total usage by 'unit_multiplier' before multiplying by 'price_per_unit'.
5.  Suggestions should aim to provide the same or comparable performance/capacity as the original service based on its 'description' and 'usage_details'.
6.  Prioritize suggestions that maintain the same cloud provider if a cost-effective option exists, but also consider cross-cloud alternatives if savings are substantial.
7.  Ensure that the 'estimated_monthly_cost' for the 'suggestedService' in the output is accurately calculated.
8.  Provide a clear 'reason' for each suggestion.
9.  Generate a concise 'summary' of the overall optimization potential found.
10. Format your output strictly as a JSON object matching the AICostOptimizationSuggestionsOutputSchema.
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
    // Stringify the currentInfrastructure array for the prompt.
    const currentInfrastructureJson = JSON.stringify(input.currentInfrastructure);
    const {output} = await aiCostOptimizationSuggestionsPrompt({ currentInfrastructureJson });
    return output!;
  }
);
