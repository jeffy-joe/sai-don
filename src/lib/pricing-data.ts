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
  // --- AWS Compute ---
  { id: 'aws-ec2-t3nano-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', vCPU: 2, RAM: '0.5GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3micro-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', vCPU: 2, RAM: '1GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3small-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.small', vCPU: 2, RAM: '2GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3medium-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.medium', vCPU: 2, RAM: '4GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3large-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.large', vCPU: 2, RAM: '8GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-c5large-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.large', vCPU: 2, RAM: '4GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-c5xlarge-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.xlarge', vCPU: 4, RAM: '8GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-c52xlarge-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.2xlarge', vCPU: 8, RAM: '16GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-r5large-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'r5.large', vCPU: 2, RAM: '16GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-r5xlarge-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'r5.xlarge', vCPU: 4, RAM: '32GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-g4dnxl-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'g4dn.xlarge', gpu: 'NVIDIA T4', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-p32xl-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'p3.2xlarge', gpu: 'NVIDIA V100', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-lambda-requests', provider: 'AWS', category: 'Compute', service_name: 'Lambda (Requests)', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', region: 'Global', unit_multiplier: 1000000 },
  { id: 'aws-lambda-compute', provider: 'AWS', category: 'Compute', service_name: 'Lambda (Compute)', price: 0, pricing_unit: 'GB-second', billing_cycle: 'unit', region: 'Global' },

  // --- Azure Compute ---
  { id: 'azure-vm-b1s-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', vCPU: 1, RAM: '1GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-b2s-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B2s', vCPU: 2, RAM: '4GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-d2sv3-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D2s v3', vCPU: 2, RAM: '8GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-d4sv3-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D4s v3', vCPU: 4, RAM: '16GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-f2-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'F2', vCPU: 2, RAM: '4GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-f4-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'F4', vCPU: 4, RAM: '8GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-functions-exec', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Azure Functions', price: 0, pricing_unit: '1M executions', billing_cycle: 'unit', region: 'Global', unit_multiplier: 1000000 },

  // --- GCP Compute ---
  { id: 'gcp-ce-e2micro-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-e2small-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-small', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-e2medium-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-medium', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-n2standard2-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-2', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-n2standard4-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-4', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-gpu-t4-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'NVIDIA T4 GPU', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },

  // --- Storage ---
  { id: 'aws-s3-standard', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'aws-s3-ia', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard-IA', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'aws-s3-glacier', provider: 'AWS', category: 'Storage', service_name: 'S3 Glacier', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'aws-ebs-gp3', provider: 'AWS', category: 'Storage', service_name: 'EBS General Purpose SSD', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'azure-blob-hot', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage Hot', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Storage (GB)' },
  { id: 'azure-managed-ssd', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Managed Disk Premium SSD', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Storage (GB)' },
  { id: 'gcp-storage-standard', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Standard', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Storage (GB)' },
  { id: 'gcp-disk-ssd', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Persistent Disk SSD', price: 0, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Storage (GB)' },

  // --- Database ---
  { id: 'aws-rds-mysql', provider: 'AWS', category: 'Database', service_name: 'RDS MySQL', instance_type: 'db.t3.micro', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-rds-pg', provider: 'AWS', category: 'Database', service_name: 'RDS PostgreSQL', instance_type: 'db.t3.small', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-dynamo-write', provider: 'AWS', category: 'Database', service_name: 'DynamoDB Write', price: 0, pricing_unit: '1M requests', billing_cycle: 'unit', region: 'Global', unit_multiplier: 1000000 },
  { id: 'azure-sql-basic', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database Basic', price: 0, pricing_unit: 'month', billing_cycle: 'month', region: 'East US' },
  { id: 'azure-cosmos', provider: 'Microsoft Azure', category: 'Database', service_name: 'Cosmos DB', price: 0, pricing_unit: '100 RU/s/hour', billing_cycle: 'hour', region: 'Global' },
  { id: 'gcp-sql-micro', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-f1-micro', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-firestore-write', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Firestore Write', price: 0, pricing_unit: '100k requests', billing_cycle: 'unit', region: 'Global', unit_multiplier: 100000 },

  // --- Asia Specific (Mumbai) ---
  { id: 'aws-ec2-t3micro-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', vCPU: 2, RAM: '1GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-south-1 (Mumbai)' },
  { id: 'azure-vm-b1s-mum', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', vCPU: 1, RAM: '1GB', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'South India (Mumbai)' },
  { id: 'gcp-ce-e2micro-mum', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', price: 0, pricing_unit: 'hour', billing_cycle: 'hour', region: 'asia-south1 (Mumbai)' },
];
