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
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.nano", "vCPU": 2, "RAM": "0.5GB", "price_per_hour": 0.0052, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.micro", "vCPU": 2, "RAM": "1GB", "price_per_hour": 0.0104, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.small", "vCPU": 2, "RAM": "2GB", "price_per_hour": 0.0208, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.medium", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.0416, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "t3.large", "vCPU": 2, "RAM": "8GB", "price_per_hour": 0.0832, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.large", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.085, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.xlarge", "vCPU": 4, "RAM": "8GB", "price_per_hour": 0.17, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "c5.2xlarge", "vCPU": 8, "RAM": "16GB", "price_per_hour": 0.34, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "r5.large", "vCPU": 2, "RAM": "16GB", "price_per_hour": 0.126, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "r5.xlarge", "vCPU": 4, "RAM": "32GB", "price_per_hour": 0.252, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "g4dn.xlarge", "GPU": "NVIDIA T4", "price_per_hour": 0.526, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "EC2", "instance_type": "p3.2xlarge", "GPU": "NVIDIA V100", "price_per_hour": 3.06, "billing_cycle": "hour", "region": "us-east-1" },
  { "provider": "AWS", "category": "Compute", "service_name": "Lambda", "resource_type": "requests", "price_per_unit": 0.20, "unit_description": "per 1 million requests", "billing_cycle": "month", "unit_multiplier": 1000000 },
  { "provider": "AWS", "category": "Compute", "service_name": "Lambda", "resource_type": "compute_duration", "price_per_unit": 0.00001667, "unit_description": "per GB-second", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B1s", "vCPU": 1, "RAM": "1GB", "price_per_hour": 0.012, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "B2s", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.046, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "D2s v3", "vCPU": 2, "RAM": "8GB", "price_per_hour": 0.096, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "D4s v3", "vCPU": 4, "RAM": "16GB", "price_per_hour": 0.192, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "F2", "vCPU": 2, "RAM": "4GB", "price_per_hour": 0.085, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Virtual Machines", "instance_type": "F4", "vCPU": 4, "RAM": "8GB", "price_per_hour": 0.169, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Compute", "service_name": "Azure Functions", "resource_type": "executions", "price_per_unit": 0.20, "unit_description": "per 1 million executions", "billing_cycle": "month", "unit_multiplier": 1000000 },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-micro", "price_per_hour": 0.008, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-small", "price_per_hour": 0.017, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "e2-medium", "price_per_hour": 0.033, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "n2-standard-2", "price_per_hour": 0.097, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "Compute Engine", "instance_type": "n2-standard-4", "price_per_hour": 0.194, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Compute", "service_name": "GPU Instances", "GPU": "NVIDIA T4 GPU", "price_per_hour": 0.35, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Containers & Kubernetes", "service_name": "Elastic Kubernetes Service (EKS)", "resource_type": "cluster_management", "price_per_unit": 0.10, "unit_description": "per cluster/hour", "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Containers & Kubernetes", "service_name": "Elastic Container Service (ECS)", "resource_type": "compute_cost", "price_per_unit": 0.040, "unit_description": "per vCPU/hour", "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Containers & Kubernetes", "service_name": "Azure Kubernetes Service", "resource_type": "cluster_management", "price_per_unit": 0.10, "unit_description": "per cluster/hour", "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Containers & Kubernetes", "service_name": "Google Kubernetes Engine", "resource_type": "cluster_management", "price_per_unit": 0.10, "unit_description": "per cluster/hour", "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard", "price_per_unit": 0.023, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Storage", "service_name": "S3 Standard Infrequent Access", "price_per_unit": 0.0125, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Storage", "service_name": "Glacier", "price_per_unit": 0.004, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Storage", "service_name": "Deep Archive", "price_per_unit": 0.00099, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Hot tier", "price_per_unit": 0.0184, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Cool tier", "price_per_unit": 0.01, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Blob Storage Archive tier", "price_per_unit": 0.002, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Standard", "price_per_unit": 0.020, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Nearline", "price_per_unit": 0.010, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Coldline", "price_per_unit": 0.004, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Cloud Storage Archive", "price_per_unit": 0.0012, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Storage", "service_name": "EBS General Purpose SSD", "price_per_unit": 0.10, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Storage", "service_name": "EBS Provisioned IOPS SSD", "price_per_unit": 0.125, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Managed Disk Standard HDD", "price_per_unit": 0.05, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Storage", "service_name": "Managed Disk Premium SSD", "price_per_unit": 0.12, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Persistent Disk Standard", "price_per_unit": 0.04, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Storage", "service_name": "Persistent Disk SSD", "price_per_unit": 0.17, "unit_description": "per GB/month", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Database", "service_name": "RDS MySQL", "instance_type": "db.t3.micro", "price_per_hour": 0.017, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Database", "service_name": "RDS PostgreSQL", "instance_type": "db.t3.small", "price_per_hour": 0.034, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "SQL Database Basic", "price_per_month": 5.00, "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "SQL Database Standard", "price_per_month": 15.00, "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "SQL Database Premium", "price_per_month": 465.00, "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Cloud SQL", "instance_type": "db-f1-micro", "price_per_hour": 0.015, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Cloud SQL", "instance_type": "db-g1-small", "price_per_hour": 0.025, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Database", "service_name": "DynamoDB Writes", "price_per_unit": 1.25, "unit_description": "per 1 million requests", "billing_cycle": "month", "unit_multiplier": 1000000 },
  { "provider": "AWS", "category": "Database", "service_name": "DynamoDB Reads", "price_per_unit": 0.25, "unit_description": "per 1 million requests", "billing_cycle": "month", "unit_multiplier": 1000000 },
  { "provider": "Microsoft Azure", "category": "Database", "service_name": "Cosmos DB", "price_per_unit": 0.008, "unit_description": "per 100 RU/s per hour", "billing_cycle": "hour", "unit_multiplier": 100 },
  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Firestore Writes", "price_per_unit": 0.18, "unit_description": "per 100k", "billing_cycle": "month", "unit_multiplier": 100000 },
  { "provider": "Google Cloud Platform", "category": "Database", "service_name": "Firestore Reads", "price_per_unit": 0.06, "unit_description": "per 100k", "billing_cycle": "month", "unit_multiplier": 100000 },
  { "provider": "AWS", "category": "Networking", "service_name": "Data Transfer Out", "price_per_unit": 0.09, "unit_description": "per GB", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Networking", "service_name": "Data Transfer Out", "price_per_unit": 0.087, "unit_description": "per GB", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Networking", "service_name": "Data Transfer Out", "price_per_unit": 0.085, "unit_description": "per GB", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Networking", "service_name": "Application Load Balancer", "price_per_hour": 0.0225, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "Networking", "service_name": "Load Balancer", "price_per_hour": 0.025, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "Networking", "service_name": "Load Balancer", "price_per_hour": 0.025, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "CDN & Edge", "service_name": "CloudFront", "price_per_unit": 0.085, "unit_description": "per GB", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "CDN & Edge", "service_name": "Azure CDN", "price_per_unit": 0.081, "unit_description": "per GB", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "CDN & Edge", "service_name": "Cloud CDN", "price_per_unit": 0.08, "unit_description": "per GB", "billing_cycle": "month" },
  { "provider": "AWS", "category": "AI / Machine Learning", "service_name": "SageMaker Training compute", "price_per_hour": 0.12, "billing_cycle": "hour" },
  { "provider": "Microsoft Azure", "category": "AI / Machine Learning", "service_name": "Azure Machine Learning Training compute", "price_per_hour": 0.10, "billing_cycle": "hour" },
  { "provider": "Google Cloud Platform", "category": "AI / Machine Learning", "service_name": "Vertex AI Training compute", "price_per_hour": 0.11, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Analytics / Big Data", "service_name": "EMR", "price_per_hour": 0.096, "billing_cycle": "hour" },
  { "provider": "AWS", "category": "Analytics / Big Data", "service_name": "Athena", "price_per_unit": 5.00, "unit_description": "per TB scanned", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Analytics / Big Data", "service_name": "Synapse Analytics", "price_per_unit": 5.00, "unit_description": "per TB scanned", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Analytics / Big Data", "service_name": "BigQuery", "price_per_unit": 5.00, "unit_description": "per TB scanned", "billing_cycle": "month" },
  { "provider": "AWS", "category": "DevOps & CI/CD", "service_name": "CodeBuild", "price_per_unit": 0.005, "unit_description": "per build minute", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "DevOps & CI/CD", "service_name": "Azure DevOps", "price_per_unit": 40.00, "unit_description": "per user/month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "DevOps & CI/CD", "service_name": "Cloud Build", "price_per_unit": 0.003, "unit_description": "per build minute", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Monitoring & Logging", "service_name": "CloudWatch", "price_per_unit": 0.30, "unit_description": "per metric/month", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Monitoring & Logging", "service_name": "Azure Monitor", "price_per_unit": 2.76, "unit_description": "per GB log ingestion", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Monitoring & Logging", "service_name": "Cloud Monitoring", "price_per_unit": 0.258, "unit_description": "per MiB logs", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Security Services", "service_name": "WAF", "price_per_unit": 5.00, "unit_description": "per Web ACL", "billing_cycle": "month" },
  { "provider": "Microsoft Azure", "category": "Security Services", "service_name": "Azure WAF", "price_per_unit": 20.00, "unit_description": "per month", "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Security Services", "service_name": "Cloud Armor", "price_per_unit": 5.00, "unit_description": "per policy", "billing_cycle": "month" },
  { "provider": "AWS", "category": "Messaging & Integration", "service_name": "SQS", "price_per_unit": 0.40, "unit_description": "per million requests", "billing_cycle": "month", "unit_multiplier": 1000000 },
  { "provider": "Microsoft Azure", "category": "Messaging & Integration", "service_name": "Service Bus", "price_per_unit": 10.00, "billing_cycle": "month" },
  { "provider": "Google Cloud Platform", "category": "Messaging & Integration", "service_name": "Pub/Sub", "price_per_unit": 40.00, "unit_description": "per TB data", "billing_cycle": "month" }
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
    *   **Hourly Services (e.g., EC2, Azure VMs, GCP Compute Engine, RDS, EKS, ECS, Load Balancers, SageMaker, EMR):** Assume 730 hours per month for calculations if 'hours_per_month' is not explicitly provided in 'usage_details'.
        *   Cost = price_per_hour * hours_per_month * number_of_instances (if applicable).
        *   Match vCPU and RAM requirements where possible.
    *   **Usage-Based Services (e.g., Lambda, Azure Functions, S3, Blob Storage, Cloud Storage, DynamoDB, Firestore, Data Transfer Out, CDN, CodeBuild, Azure Monitor, CloudWatch, WAF, SQS, Pub/Sub, BigQuery, Athena):**
        *   Calculate cost based on 'price_per_unit' and the relevant usage metric (e.g., 'storage_gb', 'requests_per_month', 'gb_seconds_per_month', 'writes_per_month', 'reads_per_month', 'data_transfer_gb_per_month', 'tb_scanned_per_month', 'build_minutes_per_month', 'metrics_per_month', 'gb_log_ingestion_per_month').
        *   Be mindful of 'unit_multiplier' where a price is "per X" units (e.g., "per 1 million requests", "per 100 RU/s"). Divide the total usage by the unit_multiplier before multiplying by price_per_unit if unit_multiplier is present. For example, for "per 1 million requests" with 5 million requests, use (5,000,000 / 1,000,000) * price.
    *   **Monthly Fixed Services (e.g., Azure SQL Database Basic, Standard, Premium, Azure DevOps, Azure WAF, Azure Service Bus, Security Services):**
        *   Cost = price_per_month (if applicable).
5.  Suggestions should aim to provide the same or comparable performance/capacity as the original service based on its 'description' and 'usage_details'. Avoid suggesting significantly underpowered or overpowered alternatives unless there's a clear cost advantage and the reason is explained.
6.  Prioritize suggestions that maintain the same cloud provider if a cost-effective option exists, but also consider cross-cloud alternatives if savings are substantial.
7.  Ensure that the 'estimated_monthly_cost' for the 'suggestedService' in the output is accurately calculated based on the provided usage details and the pricing data.
8.  Provide a clear 'reason' for each suggestion, explaining why it's more cost-effective.
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