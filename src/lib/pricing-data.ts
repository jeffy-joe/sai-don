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
  vCPU?: number;
  RAM?: string;
  gpu?: string;
  price: number;
  pricing_unit: string;
  billing_cycle: 'hour' | 'month' | 'unit';
  region: string;
  description?: string;
  input_label?: string;
  unit_multiplier?: number;
}

// Prices are set to 0 as they will be fetched exclusively via Gemini real-time lookup
export const CLOUD_SERVICES: PricingService[] = [
  // --- AWS ---
  { id: 'aws-ec2-t3micro-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ec2-t3micro-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'Asia Pacific (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-ec2-t3micro-sg', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'Asia Pacific (Singapore)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-s3-standard', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'aws-rds-mysql', provider: 'AWS', category: 'Database', service_name: 'RDS MySQL', instance_type: 'db.t3.micro', region: 'US East (N. Virginia)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-eks-cluster', provider: 'AWS', category: 'Containers & Kubernetes', service_name: 'EKS Cluster Management', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'aws-lambda-requests', provider: 'AWS', category: 'Compute', service_name: 'Lambda Requests', region: 'Global', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', unit_multiplier: 1000000 },
  { id: 'aws-cloudfront', provider: 'AWS', category: 'CDN & Edge', service_name: 'CloudFront Data Transfer', region: 'Global', price: 0, pricing_unit: 'GB', billing_cycle: 'unit' },

  // --- Azure ---
  { id: 'azure-vm-b1s-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'US East', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-vm-b1s-mum', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'South India (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-blob-hot', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage Hot', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'azure-sql-basic', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database Basic', region: 'US East', price: 0, pricing_unit: 'month', billing_cycle: 'month' },
  { id: 'azure-aks-mgmt', provider: 'Microsoft Azure', category: 'Containers & Kubernetes', service_name: 'AKS Cluster Management', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- GCP ---
  { id: 'gcp-ce-e2micro-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-ce-e2micro-mum', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'asia-south1 (Mumbai)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-storage-standard', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Standard', region: 'Global', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', input_label: 'Storage (GB)' },
  { id: 'gcp-sql-micro', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-f1-micro', region: 'us-central1', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-gke-mgmt', provider: 'Google Cloud Platform', category: 'Containers & Kubernetes', service_name: 'GKE Cluster Management', region: 'Global', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- Additional Asian Regions ---
  { id: 'aws-ec2-t3micro-tokyo', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', region: 'Asia Pacific (Tokyo)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'azure-vm-b1s-sg', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', region: 'Southeast Asia (Singapore)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },
  { id: 'gcp-ce-e2micro-sg', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', region: 'asia-southeast1 (Singapore)', price: 0, pricing_unit: 'hour', billing_cycle: 'hour' },

  // --- Specialized Services ---
  { id: 'aws-athena', provider: 'AWS', category: 'Analytics / Big Data', service_name: 'Athena', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit' },
  { id: 'azure-synapse', provider: 'Microsoft Azure', category: 'Analytics / Big Data', service_name: 'Synapse Analytics', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit' },
  { id: 'gcp-bigquery', provider: 'Google Cloud Platform', category: 'Analytics / Big Data', service_name: 'BigQuery', region: 'Global', price: 0, pricing_unit: 'TB scanned', billing_cycle: 'unit' },
  { id: 'aws-waf', provider: 'AWS', category: 'Security Services', service_name: 'WAF Web ACL', region: 'Global', price: 0, pricing_unit: 'ACL/month', billing_cycle: 'month' },
  { id: 'aws-sqs', provider: 'AWS', category: 'Messaging & Integration', service_name: 'SQS Requests', region: 'Global', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', unit_multiplier: 1000000 },
];
