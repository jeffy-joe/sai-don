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
  usage_details: z.record(z.any()).describe('A flexible object containing specific usage parameters for the service (e.g., hours_per_month, storage_gb, requests_per_month, vCPU, RAM, instance_type).')
});

const AICostOptimizationSuggestionsInputSchema = z.object({
  currentInfrastructure: z.array(CurrentServiceSchema).describe('An array of services currently used or planned by the user, with their estimated usage and cost.'),
});
export type AICostOptimizationSuggestionsInput = z.infer<typeof AICostOptimizationSuggestionsInputSchema>;

const SuggestedServiceSchema = z.object({
  provider: z.enum(allCloudProviders).describe('The cloud provider for the suggested service.'),
  category: z.enum(allServiceCategories).describe('The category of the suggested cloud service.'),
  service_name: z.string().describe('The name of the suggested cloud service.'),
  configuration: z.record(z.any()).describe('A flexible object describing the suggested service configuration (e.g., instance_type, vCPU, RAM, storage_gb).'),
  estimated_monthly_cost: z.number().describe('The estimated monthly cost of the suggested service configuration.'),
});

const CostOptimizationSuggestionSchema = z.object({
  originalServiceId: z.string().describe('The ID of the original service from the input that this suggestion applies to.'),
  originalServiceDescription: z.string().describe('A description of the original service configuration for context.'),
  suggestedService: SuggestedServiceSchema.describe('Details of the alternative, more cost-effective service configuration.'),
  monthlySavings: z.number().describe('The estimated monthly cost savings by switching to the suggested service.'),
  reason: z.string().describe('An explanation of why this suggestion is more cost-effective and how it meets the original service\'s needs.'),
});

const AICostOptimizationSuggestionsOutputSchema = z.object({
  suggestions: z.array(CostOptimizationSuggestionSchema).describe('A list of AI-driven suggestions for optimizing cloud costs.'),
  summary: z.string().describe('A general summary of the optimization potential across the provided infrastructure.'),
});
export type AICostOptimizationSuggestionsOutput = z.infer<typeof AICostOptimizationSuggestionsOutputSchema>;

// Updated pricing data based on the latest catalogs
const pricingDataJson = `
[
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.nano", "vCPU": 2, "RAM": "0.5GB", "price_per_hour": 0.0052 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.micro", "vCPU": 2, "RAM": "1GB", "price_per_hour": 0.0104 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.small", "vCPU": 2, "RAM": "2GB", "price_per_hour": 0.0208 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.medium", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.0416 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.large", "vCPU": 2, "RAM": "8GB", "price_per_hour": 0.0832 },
  { "provider": "AWS", "category": "Compute", "service_name": "Lambda", "price_per_million_requests": 0.20, "price_per_gb_second": 0.00001667 },
  
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B1s", "vCPU": 1, "RAM": "1GB", "price_per_hour": 0.012 },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B2s", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.046 },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Azure Functions", "price_per_million_executions": 0.20 },

  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-micro", "price_per_hour": 0.008 },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-small", "price_per_hour": 0.017 },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-medium", "price_per_hour": 0.033 },

  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard", "price_per_gb_month": 0.023 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard-IA", "price_per_gb_month": 0.0125 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Glacier", "price_per_gb_month": 0.004 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Deep Archive", "price_per_gb_month": 0.00099 },
  { "provider": "AWS", "category": "Storage", "service_name": "EBS GP SSD", "price_per_gb_month": 0.10 },

  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Hot", "price_per_gb_month": 0.0184 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Cool", "price_per_gb_month": 0.01 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Archive", "price_per_gb_month": 0.002 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Managed Disk HDD", "price_per_gb_month": 0.05 },

  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Standard", "price_per_gb_month": 0.020 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Nearline", "price_per_gb_month": 0.010 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Archive", "price_per_gb_month": 0.0012 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Persistent Disk Standard", "price_per_gb_month": 0.04 },

  { "provider": "AWS", "category": "Database", "service_name": "RDS MySQL", "instance_type": "db.t3.micro", "price_per_hour": 0.017 },
  { "provider": "AWS", "category": "Database", "service_name": "RDS PostgreSQL", "instance_type": "db.t3.small", "price_per_hour": 0.034 },
  { "provider": "AWS", "category": "Database", "service_name": "DynamoDB", "price_per_million_writes": 1.25, "price_per_million_reads": 0.25 },

  { "provider": "Microsoft Azure", "category": "Database", "service_name": "SQL Database Basic", "price_per_month": 5.00 },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "SQL Database Standard", "price_per_month": 15.00 },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "Cosmos DB", "price_per_100_ru_hour": 0.008 },

  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Cloud SQL", "instance_type": "db-f1-micro", "price_per_hour": 0.015 },
  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Firestore", "price_per_100k_writes": 0.18, "price_per_100k_reads": 0.06 }
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
  prompt: `You are an expert cloud architect and cost optimization specialist.
Analyze the user's current cloud infrastructure and suggest more cost-effective alternatives.

Use this internal pricing data for comparisons:
${pricingDataJson}

User Infrastructure:
{{{currentInfrastructureJson}}}

Rules:
1. Suggest same-provider alternatives first (e.g. moving from S3 Standard to Standard-IA if description implies cold storage).
2. For databases, suggest smaller instances or NoSQL alternatives where appropriate based on cost.
3. Calculate savings precisely using 730 hours/month for hourly services.
4. Output strict JSON matching AICostOptimizationSuggestionsOutputSchema.
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
    const currentInfrastructureJson = JSON.stringify(input.currentInfrastructure);
    const {output} = await aiCostOptimizationSuggestionsPrompt({ currentInfrastructureJson });
    return output!;
  }
);
