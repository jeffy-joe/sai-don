export type Provider = 'AWS' | 'Microsoft Azure' | 'Google Cloud Platform';

export type Category =
  | 'Compute'
  | 'Storage'
  | 'Database'
  | 'Networking'
  | 'Containers & Kubernetes'
  | 'AI / Machine Learning'
  | 'Analytics / Big Data'
  | 'DevOps & CI/CD'
  | 'Monitoring & Logging'
  | 'Security Services'
  | 'CDN & Edge'
  | 'Messaging & Integration';

export interface PricingService {
  id: string;
  provider: Provider;
  category: Category;
  service_name: string;
  instance_type?: string;
  price: number;
  pricing_unit: string;
  billing_cycle: 'hour' | 'month' | 'unit';
  region: string;
  description?: string;
  input_label?: string;
  unit_multiplier?: number;
}

// All prices initialized to 0. Gemini fetches real-time data.
export const CLOUD_SERVICES: PricingService[] = [
  // --- AWS COMPUTE ---
  { id: 'aws-ec2-t3nano', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ec2-t3micro', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ec2-t3small', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.small', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ec2-t3medium', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.medium', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ec2-t3large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.large', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-lambda', provider: 'AWS', category: 'Compute', service_name: 'AWS Lambda', region: 'Global', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', unit_multiplier: 1000000, input_label: 'Requests (Millions)' },

  // --- AZURE COMPUTE ---
  { id: 'azure-vm-b1s', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-vm-b2s', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B2s', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-vm-d2sv3', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D2s v3', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-functions', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Azure Functions', region: 'Global', price: 0, pricing_unit: '1M executions', billing_cycle: 'unit', unit_multiplier: 1000000, input_label: 'Executions (Millions)' },

  // --- GCP COMPUTE ---
  { id: 'gcp-ce-e2micro', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-ce-e2small', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-small', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-ce-e2medium', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-medium', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- CONTAINERS ---
  { id: 'aws-eks', provider: 'AWS', category: 'Containers & Kubernetes', service_name: 'EKS Cluster', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ecs', provider: 'AWS', category: 'Containers & Kubernetes', service_name: 'ECS Fargate', region: 'Global', price: 0, pricing_unit: 'vCPU/hour', billing_cycle: 'hour', input_label: 'vCPU Count' },
  { id: 'azure-aks', provider: 'Microsoft Azure', category: 'Containers & Kubernetes', service_name: 'AKS Cluster', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-gke', provider: 'Google Cloud Platform', category: 'Containers & Kubernetes', service_name: 'GKE Cluster', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- STORAGE ---
  { id: 'aws-s3', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'aws-ebs', provider: 'AWS', category: 'Storage', service_name: 'Elastic Block Store', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Provisioned Storage (GB)' },
  { id: 'azure-blob', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'azure-disk', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Managed Disk', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },
  { id: 'gcp-gcs', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'gcp-pd', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Persistent Disk', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },

  // --- DATABASE ---
  { id: 'aws-rds', provider: 'AWS', category: 'Database', service_name: 'RDS MySQL', instance_type: 'db.t3.micro', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-dynamodb', provider: 'AWS', category: 'Database', service_name: 'DynamoDB', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'azure-sql', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database', region: 'Global', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'azure-cosmos', provider: 'Microsoft Azure', category: 'Database', service_name: 'Cosmos DB', region: 'Global', price: 0, pricing_unit: '100 RU/s', billing_cycle: 'unit' },
  { id: 'gcp-sql', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-f1-micro', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-firestore', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Firestore', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },

  // --- NETWORKING ---
  { id: 'aws-alb', provider: 'AWS', category: 'Networking', service_name: 'Application Load Balancer', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-lb', provider: 'Microsoft Azure', category: 'Networking', service_name: 'Load Balancer', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-lb', provider: 'Google Cloud Platform', category: 'Networking', service_name: 'Cloud Load Balancer', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- CDN ---
  { id: 'aws-cloudfront', provider: 'AWS', category: 'CDN & Edge', service_name: 'CloudFront', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Data Transfer (GB)' },
  { id: 'azure-cdn', provider: 'Microsoft Azure', category: 'CDN & Edge', service_name: 'Azure CDN', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Data Transfer (GB)' },
  { id: 'gcp-cdn', provider: 'Google Cloud Platform', category: 'CDN & Edge', service_name: 'Cloud CDN', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Data Transfer (GB)' },

  // --- AI / ML ---
  { id: 'aws-sagemaker', provider: 'AWS', category: 'AI / Machine Learning', service_name: 'SageMaker Training', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-ml', provider: 'Microsoft Azure', category: 'AI / Machine Learning', service_name: 'Azure Machine Learning', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-vertex', provider: 'Google Cloud Platform', category: 'AI / Machine Learning', service_name: 'Vertex AI Training', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- ANALYTICS ---
  { id: 'aws-emr', provider: 'AWS', category: 'Analytics / Big Data', service_name: 'EMR Cluster', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-athena', provider: 'AWS', category: 'Analytics / Big Data', service_name: 'Athena', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit', input_label: 'Data Scanned (TB)' },
  { id: 'azure-synapse', provider: 'Microsoft Azure', category: 'Analytics / Big Data', service_name: 'Synapse Analytics', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit', input_label: 'Data Scanned (TB)' },
  { id: 'gcp-bigquery', provider: 'Google Cloud Platform', category: 'Analytics / Big Data', service_name: 'BigQuery', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit', input_label: 'Data Scanned (TB)' },

  // --- DEVOPS ---
  { id: 'aws-codebuild', provider: 'AWS', category: 'DevOps & CI/CD', service_name: 'CodeBuild', region: 'Global', price: 0, pricing_unit: 'build minute', billing_cycle: 'unit', input_label: 'Build Minutes' },
  { id: 'azure-devops', provider: 'Microsoft Azure', category: 'DevOps & CI/CD', service_name: 'Azure DevOps', region: 'Global', price: 0, pricing_unit: 'user/month', billing_cycle: 'month', input_label: 'Users' },
  { id: 'gcp-cloudbuild', provider: 'Google Cloud Platform', category: 'DevOps & CI/CD', service_name: 'Cloud Build', region: 'Global', price: 0, pricing_unit: 'build minute', billing_cycle: 'unit', input_label: 'Build Minutes' },

  // --- MONITORING ---
  { id: 'aws-cloudwatch', provider: 'AWS', category: 'Monitoring & Logging', service_name: 'CloudWatch', region: 'Global', price: 0, pricing_unit: 'GB ingested', billing_cycle: 'unit', input_label: 'Log Ingestion (GB)' },
  { id: 'azure-monitor', provider: 'Microsoft Azure', category: 'Monitoring & Logging', service_name: 'Azure Monitor', region: 'Global', price: 0, pricing_unit: 'GB ingested', billing_cycle: 'unit', input_label: 'Log Ingestion (GB)' },
  { id: 'gcp-monitoring', provider: 'Google Cloud Platform', category: 'Monitoring & Logging', service_name: 'Cloud Monitoring', region: 'Global', price: 0, pricing_unit: 'GB ingested', billing_cycle: 'unit', input_label: 'Log Ingestion (GB)' },

  // --- SECURITY ---
  { id: 'aws-waf', provider: 'AWS', category: 'Security Services', service_name: 'AWS WAF', region: 'Global', price: 0, pricing_unit: 'Web ACL', billing_cycle: 'month' },
  { id: 'azure-waf', provider: 'Microsoft Azure', category: 'Security Services', service_name: 'Azure WAF', region: 'Global', price: 0, pricing_unit: 'policy', billing_cycle: 'month' },
  { id: 'gcp-armor', provider: 'Google Cloud Platform', category: 'Security Services', service_name: 'Cloud Armor', region: 'Global', price: 0, pricing_unit: 'policy', billing_cycle: 'month' },

  // --- MESSAGING ---
  { id: 'aws-sqs', provider: 'AWS', category: 'Messaging & Integration', service_name: 'SQS Requests', region: 'Global', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', unit_multiplier: 1000000, input_label: 'Requests (Millions)' },
  { id: 'azure-servicebus', provider: 'Microsoft Azure', category: 'Messaging & Integration', service_name: 'Service Bus', region: 'Global', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'gcp-pubsub', provider: 'Google Cloud Platform', category: 'Messaging & Integration', service_name: 'Pub/Sub', region: 'Global', price: 0, pricing_unit: 'TB data', billing_cycle: 'unit', input_label: 'Throughput (TB)' },

  // --- ASIAN REGIONS ---
  { id: 'aws-ec2-t3micro-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'Asia Pacific (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-vm-b1s-mum', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'South India (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-ce-e2micro-mum', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'asia-south1 (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
];
