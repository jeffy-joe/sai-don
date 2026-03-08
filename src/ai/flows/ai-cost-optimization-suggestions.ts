'use server';

/**
 * @fileOverview This file implements a Genkit flow that analyzes a user's current cloud infrastructure
 * and usage patterns to provide AI-driven suggestions for more cost-effective service configurations or instance types.
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

const pricingDataJson = `
[
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.nano", "price_per_hour": 0.0052 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.micro", "price_per_hour": 0.0104 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.small", "price_per_hour": 0.0208 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.medium", "price_per_hour": 0.0416 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.large", "price_per_hour": 0.0832 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.large", "price_per_hour": 0.085 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.xlarge", "price_per_hour": 0.17 },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.2xlarge", "price_per_hour": 0.34 },
  { "provider": "AWS", "category": "Compute", "service_name": "Lambda", "price_per_million": 0.20 },
  
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B1s", "price_per_hour": 0.012 },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B2s", "price_per_hour": 0.046 },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "D2s v3", "price_per_hour": 0.096 },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Azure Functions", "price_per_million": 0.20 },

  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-micro", "price_per_hour": 0.008 },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-small", "price_per_hour": 0.017 },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-medium", "price_per_hour": 0.033 },

  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard", "price_per_gb": 0.023 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard-IA", "price_per_gb": 0.0125 },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Glacier", "price_per_gb": 0.004 },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Hot", "price_per_gb": 0.0184 },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage", "price_per_gb": 0.020 },

  { "provider": "AWS", "category": "Database", "service_name": "RDS MySQL", "instance_type": "db.t3.micro", "price_per_hour": 0.017 },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "SQL DB Basic", "price_per_month": 5.00 },
  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Cloud SQL", "instance_type": "db-f1-micro", "price_per_hour": 0.015 },

  { "provider": "AWS", "category": "Containers & Kubernetes", "service_name": "EKS", "price_per_hour": 0.10 },
  { "provider": "AWS", "category": "Containers & Kubernetes", "service_name": "ECS", "price_per_vcpu_hour": 0.040 },
  { "provider": "Microsoft Azure", "category": "Containers & Kubernetes", "service_name": "AKS", "price_per_hour": 0.10 },
  { "provider": "Google Cloud Platform", "category": "Containers & Kubernetes", "service_name": "GKE", "price_per_hour": 0.10 },

  { "provider": "AWS", "category": "DevOps & CI/CD", "service_name": "CodeBuild", "price_per_min": 0.005 },
  { "provider": "Microsoft Azure", "category": "DevOps & CI/CD", "service_name": "Azure DevOps", "price_per_user": 40.00 },
  { "provider": "Google Cloud Platform", "category": "DevOps & CI/CD", "service_name": "Cloud Build", "price_per_min": 0.003 },

  { "provider": "AWS", "category": "Monitoring & Logging", "service_name": "CloudWatch", "price_per_metric": 0.30 },
  { "provider": "Microsoft Azure", "category": "Monitoring & Logging", "service_name": "Azure Monitor", "price_per_gb": 2.76 },
  { "provider": "Google Cloud Platform", "category": "Monitoring & Logging", "service_name": "Cloud Monitoring", "price_per_mib": 0.258 },

  { "provider": "AWS", "category": "Security Services", "service_name": "WAF", "price_per_acl": 5.00 },
  { "provider": "Microsoft Azure", "category": "Security Services", "service_name": "WAF", "price_per_month": 20.00 },
  { "provider": "Google Cloud Platform", "category": "Security Services", "service_name": "Cloud Armor", "price_per_policy": 5.00 },

  { "provider": "AWS", "category": "CDN & Edge", "service_name": "CloudFront", "price_per_gb": 0.085 },
  { "provider": "Microsoft Azure", "category": "CDN & Edge", "service_name": "Azure CDN", "price_per_gb": 0.081 },
  { "provider": "Google Cloud Platform", "category": "CDN & Edge", "service_name": "Cloud CDN", "price_per_gb": 0.08 },

  { "provider": "AWS", "category": "Messaging & Integration", "service_name": "SQS", "price_per_million": 0.40 },
  { "provider": "Microsoft Azure", "category": "Messaging & Integration", "service_name": "Service Bus", "price_per_month": 10.00 },
  { "provider": "Google Cloud Platform", "category": "Messaging & Integration", "service_name": "Pub/Sub", "price_per_tb": 40.00 }
]
`;

const aiCostOptimizationSuggestionsPrompt = ai.definePrompt({
  name: 'aiCostOptimizationSuggestionsPrompt',
  input: {
    schema: z.object({
      currentInfrastructureJson: z.string(),
    }),
  },
  output: { schema: AICostOptimizationSuggestionsOutputSchema },
  prompt: `Analyze the following cloud infrastructure and suggest cost optimization alternatives.

Internal Pricing Data:
${pricingDataJson}

User Infrastructure:
{{{currentInfrastructureJson}}}

Rules:
1. Focus on comparing similar service types across providers or within the same provider.
2. For Messaging, compare SQS million-request costs vs monthly service bus fees or Pub/Sub throughput costs.
3. For DevOps/CI/CD, compare build minute costs where applicable.
4. Suggest tiering down for cold storage if descriptions imply infrequent access.
5. For Monitoring, compare ingestion rates across providers.
6. For Security Services, consider WAF costs which can scale per policy or per month.
7. For CDN, compare the price per GB transferred across providers.
8. For Containers, compare cluster management fees and ECS vCPU costs if applicable. Consider if serverless containers (ECS) might be cheaper for smaller workloads.
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
