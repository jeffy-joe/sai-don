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

// All prices initialized to 0. Gemini fetches real-time data for every selection.
export const CLOUD_SERVICES: PricingService[] = [
  // --- AWS COMPUTE ---
  { id: 'aws-t3-nano', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-t3-micro', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-t3-small', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.small', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-t3-medium', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.medium', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-t3-large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.large', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-c5-large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.large', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-c5-xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.xlarge', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-c5-2xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.2xlarge', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-r5-large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'r5.large', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-r5-xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'r5.xlarge', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-g4dn-xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'g4dn.xlarge', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-p3-2xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'p3.2xlarge', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-lambda', provider: 'AWS', category: 'Compute', service_name: 'AWS Lambda', region: 'Global', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', unit_multiplier: 1000000, input_label: 'Requests (Millions)' },

  // --- AZURE COMPUTE ---
  { id: 'az-b1s', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-b2s', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B2s', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-d2s-v3', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D2s v3', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-d4s-v3', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D4s v3', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-f2', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'F2', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-f4', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'F4', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-functions', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Azure Functions', region: 'Global', price: 0, pricing_unit: '1M executions', billing_cycle: 'unit', unit_multiplier: 1000000, input_label: 'Executions (Millions)' },

  // --- GCP COMPUTE ---
  { id: 'gcp-e2-micro', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-e2-small', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-small', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-e2-medium', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-medium', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-n2-standard-2', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-2', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-n2-standard-4', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-4', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-gpu-t4', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'NVIDIA T4 GPU', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- CONTAINERS ---
  { id: 'aws-eks', provider: 'AWS', category: 'Containers & Kubernetes', service_name: 'EKS', region: 'Global', price: 0, pricing_unit: 'cluster/hour', billing_cycle: 'hour' },
  { id: 'aws-ecs', provider: 'AWS', category: 'Containers & Kubernetes', service_name: 'ECS Fargate', region: 'Global', price: 0, pricing_unit: 'vCPU/hour', billing_cycle: 'hour', input_label: 'vCPU Count' },
  { id: 'az-aks', provider: 'Microsoft Azure', category: 'Containers & Kubernetes', service_name: 'AKS', region: 'Global', price: 0, pricing_unit: 'cluster/hour', billing_cycle: 'hour' },
  { id: 'gcp-gke', provider: 'Google Cloud Platform', category: 'Containers & Kubernetes', service_name: 'GKE', region: 'Global', price: 0, pricing_unit: 'cluster/hour', billing_cycle: 'hour' },

  // --- STORAGE (OBJECT) ---
  { id: 'aws-s3-std', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'aws-s3-ia', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard-IA', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'aws-s3-glacier', provider: 'AWS', category: 'Storage', service_name: 'S3 Glacier', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'aws-s3-deep', provider: 'AWS', category: 'Storage', service_name: 'S3 Deep Archive', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'az-blob-hot', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage (Hot)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'az-blob-cool', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage (Cool)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'az-blob-archive', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage (Archive)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'gcp-gcs-std', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage (Standard)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'gcp-gcs-near', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage (Nearline)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'gcp-gcs-cold', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage (Coldline)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'gcp-gcs-archive', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage (Archive)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },

  // --- STORAGE (BLOCK) ---
  { id: 'aws-ebs-gp3', provider: 'AWS', category: 'Storage', service_name: 'EBS GP3', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },
  { id: 'aws-ebs-io2', provider: 'AWS', category: 'Storage', service_name: 'EBS IO2', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },
  { id: 'az-disk-hdd', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Managed Disk (HDD)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },
  { id: 'az-disk-ssd', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Managed Disk (SSD)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },
  { id: 'gcp-pd-std', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Persistent Disk (Standard)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },
  { id: 'gcp-pd-ssd', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Persistent Disk (SSD)', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Disk size (GB)' },

  // --- DATABASES ---
  { id: 'aws-rds-mysql', provider: 'AWS', category: 'Database', service_name: 'RDS MySQL', instance_type: 'db.t3.micro', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-rds-postgres', provider: 'AWS', category: 'Database', service_name: 'RDS PostgreSQL', instance_type: 'db.t3.small', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-dynamo-writes', provider: 'AWS', category: 'Database', service_name: 'DynamoDB Writes', region: 'Global', price: 0, pricing_unit: 'WCU', billing_cycle: 'unit', input_label: 'Writes/sec' },
  { id: 'aws-dynamo-reads', provider: 'AWS', category: 'Database', service_name: 'DynamoDB Reads', region: 'Global', price: 0, pricing_unit: 'RCU', billing_cycle: 'unit', input_label: 'Reads/sec' },
  { id: 'az-sql-basic', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database (Basic)', region: 'Global', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'az-sql-std', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database (Standard)', region: 'Global', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'az-sql-prem', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database (Premium)', region: 'Global', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'az-cosmos', provider: 'Microsoft Azure', category: 'Database', service_name: 'Cosmos DB', region: 'Global', price: 0, pricing_unit: '100 RU/s', billing_cycle: 'unit' },
  { id: 'gcp-sql-micro', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-f1-micro', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-sql-small', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-g1-small', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-firestore-writes', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Firestore Writes', region: 'Global', price: 0, pricing_unit: '100k units', billing_cycle: 'unit', unit_multiplier: 100000, input_label: 'Writes (100k)' },
  { id: 'gcp-firestore-reads', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Firestore Reads', region: 'Global', price: 0, pricing_unit: '100k units', billing_cycle: 'unit', unit_multiplier: 100000, input_label: 'Reads (100k)' },

  // --- NETWORKING / CDN / SECURITY ---
  { id: 'aws-transfer', provider: 'AWS', category: 'Networking', service_name: 'Data Transfer Out', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Data (GB)' },
  { id: 'aws-alb', provider: 'AWS', category: 'Networking', service_name: 'Application Load Balancer', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-cloudfront', provider: 'AWS', category: 'CDN & Edge', service_name: 'CloudFront', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Transfer (GB)' },
  { id: 'aws-waf', provider: 'AWS', category: 'Security Services', service_name: 'WAF', region: 'Global', price: 0, pricing_unit: 'ACL/month', billing_cycle: 'month' },
  { id: 'az-transfer', provider: 'Microsoft Azure', category: 'Networking', service_name: 'Data Transfer Out', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Data (GB)' },
  { id: 'az-lb', provider: 'Microsoft Azure', category: 'Networking', service_name: 'Load Balancer', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-cdn', provider: 'Microsoft Azure', category: 'CDN & Edge', service_name: 'Azure CDN', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Transfer (GB)' },
  { id: 'az-waf', provider: 'Microsoft Azure', category: 'Security Services', service_name: 'WAF', region: 'Global', price: 0, pricing_unit: 'policy/month', billing_cycle: 'month' },
  { id: 'gcp-transfer', provider: 'Google Cloud Platform', category: 'Networking', service_name: 'Data Transfer Out', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Data (GB)' },
  { id: 'gcp-lb', provider: 'Google Cloud Platform', category: 'Networking', service_name: 'Cloud Load Balancer', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-cdn', provider: 'Google Cloud Platform', category: 'CDN & Edge', service_name: 'Cloud CDN', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit', input_label: 'Transfer (GB)' },
  { id: 'gcp-armor', provider: 'Google Cloud Platform', category: 'Security Services', service_name: 'Cloud Armor', region: 'Global', price: 0, pricing_unit: 'policy/month', billing_cycle: 'month' },

  // --- AI / BIG DATA / DEVOPS / MONITORING ---
  { id: 'aws-sagemaker', provider: 'AWS', category: 'AI / Machine Learning', service_name: 'SageMaker Training', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-emr', provider: 'AWS', category: 'Analytics / Big Data', service_name: 'EMR', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-athena', provider: 'AWS', category: 'Analytics / Big Data', service_name: 'Athena', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit', input_label: 'Scan (TB)' },
  { id: 'aws-codebuild', provider: 'AWS', category: 'DevOps & CI/CD', service_name: 'CodeBuild', region: 'Global', price: 0, pricing_unit: 'min', billing_cycle: 'unit', input_label: 'Build Min' },
  { id: 'aws-cloudwatch', provider: 'AWS', category: 'Monitoring & Logging', service_name: 'CloudWatch', region: 'Global', price: 0, pricing_unit: 'GB ingested', billing_cycle: 'unit', input_label: 'Log Ingest (GB)' },
  { id: 'az-ml', provider: 'Microsoft Azure', category: 'AI / Machine Learning', service_name: 'Azure Machine Learning', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-synapse', provider: 'Microsoft Azure', category: 'Analytics / Big Data', service_name: 'Synapse Analytics', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit', input_label: 'Scan (TB)' },
  { id: 'az-devops', provider: 'Microsoft Azure', category: 'DevOps & CI/CD', service_name: 'Azure DevOps', region: 'Global', price: 0, pricing_unit: 'user/month', billing_cycle: 'month', input_label: 'Users' },
  { id: 'az-monitor', provider: 'Microsoft Azure', category: 'Monitoring & Logging', service_name: 'Azure Monitor', region: 'Global', price: 0, pricing_unit: 'GB ingested', billing_cycle: 'unit', input_label: 'Log Ingest (GB)' },
  { id: 'gcp-vertex', provider: 'Google Cloud Platform', category: 'AI / Machine Learning', service_name: 'Vertex AI', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-bq', provider: 'Google Cloud Platform', category: 'Analytics / Big Data', service_name: 'BigQuery', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit', input_label: 'Scan (TB)' },
  { id: 'gcp-build', provider: 'Google Cloud Platform', category: 'DevOps & CI/CD', service_name: 'Cloud Build', region: 'Global', price: 0, pricing_unit: 'min', billing_cycle: 'unit', input_label: 'Build Min' },
  { id: 'gcp-monitoring', provider: 'Google Cloud Platform', category: 'Monitoring & Logging', service_name: 'Cloud Monitoring', region: 'Global', price: 0, pricing_unit: 'GB ingested', billing_cycle: 'unit', input_label: 'Log Ingest (GB)' },

  // --- MESSAGING ---
  { id: 'aws-sqs', provider: 'AWS', category: 'Messaging & Integration', service_name: 'SQS', region: 'Global', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', unit_multiplier: 1000000, input_label: 'Requests (M)' },
  { id: 'az-servicebus', provider: 'Microsoft Azure', category: 'Messaging & Integration', service_name: 'Service Bus', region: 'Global', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'gcp-pubsub', provider: 'Google Cloud Platform', category: 'Messaging & Integration', service_name: 'Pub/Sub', region: 'Global', price: 0, pricing_unit: 'TB throughput', billing_cycle: 'unit', input_label: 'Throughput (TB)' },

  // --- ASIAN REGIONS SAMPLES ---
  { id: 'aws-t3-micro-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'Asia Pacific (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-t3-micro-tok', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'Asia Pacific (Tokyo)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'az-b1s-mum', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'South India', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-e2-micro-mum', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'asia-south1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
];
