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

export const CLOUD_SERVICES: PricingService[] = [
  // --- AWS Compute - US ---
  { id: 'aws-ec2-t3nano-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', vCPU: 2, RAM: '0.5GB', price: 0.0052, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3micro-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', vCPU: 2, RAM: '1GB', price: 0.0104, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3small-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.small', vCPU: 2, RAM: '2GB', price: 0.0208, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3medium-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.medium', vCPU: 2, RAM: '4GB', price: 0.0416, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3large-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.large', vCPU: 2, RAM: '8GB', price: 0.0832, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },

  // --- AWS Compute - Mumbai (ap-south-1) ---
  { id: 'aws-ec2-t3nano-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', vCPU: 2, RAM: '0.5GB', price: 0.0058, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-south-1 (Mumbai)' },
  { id: 'aws-ec2-t3micro-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', vCPU: 2, RAM: '1GB', price: 0.0116, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-south-1 (Mumbai)' },
  { id: 'aws-ec2-t3small-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.small', vCPU: 2, RAM: '2GB', price: 0.0232, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-south-1 (Mumbai)' },
  { id: 'aws-ec2-t3medium-mum', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.medium', vCPU: 2, RAM: '4GB', price: 0.0464, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-south-1 (Mumbai)' },

  // --- AWS Compute - Singapore (ap-southeast-1) ---
  { id: 'aws-ec2-t3nano-sin', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', vCPU: 2, RAM: '0.5GB', price: 0.0056, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-southeast-1 (Singapore)' },
  { id: 'aws-ec2-t3micro-sin', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', vCPU: 2, RAM: '1GB', price: 0.0112, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-southeast-1 (Singapore)' },

  // --- Azure Compute - Mumbai (South India) ---
  { id: 'azure-vm-b1s-mum', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', vCPU: 1, RAM: '1GB', price: 0.0135, pricing_unit: 'hour', billing_cycle: 'hour', region: 'South India (Mumbai)' },
  { id: 'azure-vm-b2s-mum', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B2s', vCPU: 2, RAM: '4GB', price: 0.052, pricing_unit: 'hour', billing_cycle: 'hour', region: 'South India (Mumbai)' },

  // --- Azure Compute - Singapore (Southeast Asia) ---
  { id: 'azure-vm-b1s-sin', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', vCPU: 1, RAM: '1GB', price: 0.013, pricing_unit: 'hour', billing_cycle: 'hour', region: 'Southeast Asia (Singapore)' },
  { id: 'azure-vm-b2s-sin', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B2s', vCPU: 2, RAM: '4GB', price: 0.05, pricing_unit: 'hour', billing_cycle: 'hour', region: 'Southeast Asia (Singapore)' },

  // --- GCP Compute - Mumbai (asia-south1) ---
  { id: 'gcp-ce-e2micro-mum', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', price: 0.009, pricing_unit: 'hour', billing_cycle: 'hour', region: 'asia-south1 (Mumbai)' },
  { id: 'gcp-ce-e2small-mum', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-small', price: 0.019, pricing_unit: 'hour', billing_cycle: 'hour', region: 'asia-south1 (Mumbai)' },

  // --- GCP Compute - Singapore (asia-southeast1) ---
  { id: 'gcp-ce-e2micro-sin', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', price: 0.0085, pricing_unit: 'hour', billing_cycle: 'hour', region: 'asia-southeast1 (Singapore)' },

  // --- Storage ---
  { id: 'aws-s3-standard-mum', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard', price: 0.025, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'ap-south-1 (Mumbai)', input_label: 'Storage (GB)' },
  { id: 'azure-blob-hot-mum', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage Hot', price: 0.020, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'South India (Mumbai)', input_label: 'Storage (GB)' },
  { id: 'gcp-storage-standard-mum', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Standard', price: 0.023, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'asia-south1 (Mumbai)', input_label: 'Storage (GB)' },

  // --- Database ---
  { id: 'aws-rds-mysql-micro-mum', provider: 'AWS', category: 'Database', service_name: 'RDS MySQL', instance_type: 'db.t3.micro', price: 0.02, pricing_unit: 'hour', billing_cycle: 'hour', region: 'ap-south-1 (Mumbai)' },
  { id: 'azure-sql-basic-mum', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database Basic', price: 5.50, pricing_unit: 'month', billing_cycle: 'month', region: 'South India (Mumbai)' },
  { id: 'gcp-sql-micro-mum', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-f1-micro', price: 0.018, pricing_unit: 'hour', billing_cycle: 'hour', region: 'asia-south1 (Mumbai)' },

  // --- Global Services ---
  { id: 'aws-data-out-global', provider: 'AWS', category: 'Networking', service_name: 'Data Transfer Out', price: 0.09, pricing_unit: 'GB', billing_cycle: 'unit', region: 'Global', input_label: 'Data Out (GB)' },
  { id: 'aws-cloudfront-global', provider: 'AWS', category: 'CDN & Edge', service_name: 'CloudFront', price: 0.085, pricing_unit: 'GB', billing_cycle: 'unit', region: 'Global', input_label: 'Data (GB)' },
  { id: 'azure-devops-global', provider: 'Microsoft Azure', category: 'DevOps & CI/CD', service_name: 'Azure DevOps', price: 40.00, pricing_unit: 'user/month', billing_cycle: 'month', region: 'Global', input_label: 'Users' },
  
  // Existing US East Services (Simplified for brevity but kept as fallback)
  { id: 'aws-ec2-c5large-us', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.large', vCPU: 2, RAM: '4GB', price: 0.085, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'azure-vm-d2sv3-us', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D2s v3', vCPU: 2, RAM: '8GB', price: 0.096, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'gcp-ce-n2standard2-us', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-2', price: 0.097, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' }
];
