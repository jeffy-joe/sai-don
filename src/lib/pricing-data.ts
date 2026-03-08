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
  // AWS Compute - EC2 General Purpose
  { id: 'aws-ec2-t3nano', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.nano', vCPU: 2, RAM: '0.5GB', price: 0.0052, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3micro', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.micro', vCPU: 2, RAM: '1GB', price: 0.0104, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3small', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.small', vCPU: 2, RAM: '2GB', price: 0.0208, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3medium', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.medium', vCPU: 2, RAM: '4GB', price: 0.0416, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-t3large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 't3.large', vCPU: 2, RAM: '8GB', price: 0.0832, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  
  // AWS Compute - EC2 Compute Optimized
  { id: 'aws-ec2-c5large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.large', vCPU: 2, RAM: '4GB', price: 0.085, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-c5xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.xlarge', vCPU: 4, RAM: '8GB', price: 0.17, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-c52xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'c5.2xlarge', vCPU: 8, RAM: '16GB', price: 0.34, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  
  // AWS Compute - EC2 Memory Optimized
  { id: 'aws-ec2-r5large', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'r5.large', vCPU: 2, RAM: '16GB', price: 0.126, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-r5xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'r5.xlarge', vCPU: 4, RAM: '32GB', price: 0.252, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  
  // AWS Compute - EC2 GPU Instances
  { id: 'aws-ec2-g4dnxlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'g4dn.xlarge', gpu: 'NVIDIA T4', price: 0.526, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'aws-ec2-p32xlarge', provider: 'AWS', category: 'Compute', service_name: 'EC2', instance_type: 'p3.2xlarge', gpu: 'NVIDIA V100', price: 3.06, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  
  // AWS Compute - Serverless
  { id: 'aws-lambda-requests', provider: 'AWS', category: 'Compute', service_name: 'Lambda', description: 'Requests per month', price: 0.20, pricing_unit: '1M requests', billing_cycle: 'unit', region: 'us-east-1', unit_multiplier: 1000000, input_label: 'Requests' },
  { id: 'aws-lambda-duration', provider: 'AWS', category: 'Compute', service_name: 'Lambda', description: 'Compute duration', price: 0.00001667, pricing_unit: 'GB-second', billing_cycle: 'unit', region: 'us-east-1', input_label: 'GB-Seconds' },

  // Azure Compute - Virtual Machines B Series
  { id: 'azure-vm-b1s', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B1s', vCPU: 1, RAM: '1GB', price: 0.012, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-b2s', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'B2s', vCPU: 2, RAM: '4GB', price: 0.046, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  
  // Azure Compute - Virtual Machines D Series
  { id: 'azure-vm-d2sv3', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D2s v3', vCPU: 2, RAM: '8GB', price: 0.096, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-d4sv3', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'D4s v3', vCPU: 4, RAM: '16GB', price: 0.192, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  
  // Azure Compute - Virtual Machines F Series
  { id: 'azure-vm-f2', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'F2', vCPU: 2, RAM: '4GB', price: 0.085, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'azure-vm-f4', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Virtual Machines', instance_type: 'F4', vCPU: 4, RAM: '8GB', price: 0.169, pricing_unit: 'hour', billing_cycle: 'hour', region: 'East US' },
  
  // Azure Compute - Serverless
  { id: 'azure-functions', provider: 'Microsoft Azure', category: 'Compute', service_name: 'Azure Functions', description: 'Execution pricing', price: 0.20, pricing_unit: '1M executions', billing_cycle: 'unit', region: 'East US', unit_multiplier: 1000000, input_label: 'Executions' },

  // GCP Compute - E2 Instances
  { id: 'gcp-ce-e2micro', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-micro', price: 0.008, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-e2small', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-small', price: 0.017, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-e2medium', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'e2-medium', price: 0.033, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  
  // GCP Compute - N2 Instances
  { id: 'gcp-ce-n2standard2', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-2', price: 0.097, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  { id: 'gcp-ce-n2standard4', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'Compute Engine', instance_type: 'n2-standard-4', price: 0.194, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },
  
  // GCP Compute - GPU
  { id: 'gcp-ce-gpu-t4', provider: 'Google Cloud Platform', category: 'Compute', service_name: 'GPU Instance', instance_type: 'NVIDIA T4 GPU', price: 0.35, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },

  // Storage - AWS S3
  { id: 'aws-s3-standard', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard', price: 0.023, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'aws-s3-si', provider: 'AWS', category: 'Storage', service_name: 'S3 Standard-IA', price: 0.0125, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'aws-s3-glacier', provider: 'AWS', category: 'Storage', service_name: 'S3 Glacier', price: 0.004, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },
  { id: 'aws-s3-deep-archive', provider: 'AWS', category: 'Storage', service_name: 'S3 Deep Archive', price: 0.00099, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Storage (GB)' },

  // Storage - Azure Blob
  { id: 'azure-blob-hot', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage Hot', price: 0.0184, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Storage (GB)' },
  { id: 'azure-blob-cool', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage Cool', price: 0.01, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Storage (GB)' },
  { id: 'azure-blob-archive', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Blob Storage Archive', price: 0.002, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Storage (GB)' },

  // Storage - GCP Storage
  { id: 'gcp-storage-standard', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Standard', price: 0.020, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Storage (GB)' },
  { id: 'gcp-storage-nearline', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Nearline', price: 0.010, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Storage (GB)' },
  { id: 'gcp-storage-coldline', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Coldline', price: 0.004, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Storage (GB)' },
  { id: 'gcp-storage-archive', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Cloud Storage Archive', price: 0.0012, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Storage (GB)' },

  // Block Storage
  { id: 'aws-ebs-gp', provider: 'AWS', category: 'Storage', service_name: 'EBS GP SSD', price: 0.10, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Size (GB)' },
  { id: 'aws-ebs-piops', provider: 'AWS', category: 'Storage', service_name: 'EBS PIOPS SSD', price: 0.125, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-east-1', input_label: 'Size (GB)' },
  { id: 'azure-disk-hdd', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Managed Disk Standard HDD', price: 0.05, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Size (GB)' },
  { id: 'azure-disk-ssd', provider: 'Microsoft Azure', category: 'Storage', service_name: 'Managed Disk Premium SSD', price: 0.12, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'East US', input_label: 'Size (GB)' },
  { id: 'gcp-pd-standard', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Persistent Disk Standard', price: 0.04, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Size (GB)' },
  { id: 'gcp-pd-ssd', provider: 'Google Cloud Platform', category: 'Storage', service_name: 'Persistent Disk SSD', price: 0.17, pricing_unit: 'GB/month', billing_cycle: 'month', region: 'us-central1', input_label: 'Size (GB)' },

  // Database
  { id: 'aws-rds-mysql', provider: 'AWS', category: 'Database', service_name: 'RDS MySQL', instance_type: 'db.t3.micro', price: 0.017, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'azure-sql-basic', provider: 'Microsoft Azure', category: 'Database', service_name: 'SQL Database Basic', price: 5.00, pricing_unit: 'month', billing_cycle: 'month', region: 'East US' },
  { id: 'gcp-sql-micro', provider: 'Google Cloud Platform', category: 'Database', service_name: 'Cloud SQL', instance_type: 'db-f1-micro', price: 0.015, pricing_unit: 'hour', billing_cycle: 'hour', region: 'us-central1' },

  // Containers
  { id: 'aws-eks', provider: 'AWS', category: 'Containers & Kubernetes', service_name: 'EKS', description: 'Cluster management', price: 0.10, pricing_unit: 'cluster/hour', billing_cycle: 'hour', region: 'us-east-1' },
  { id: 'azure-aks', provider: 'Microsoft Azure', category: 'Containers & Kubernetes', service_name: 'AKS', description: 'Cluster management', price: 0.10, pricing_unit: 'cluster/hour', billing_cycle: 'hour', region: 'East US' },
  { id: 'gcp-gke', provider: 'Google Cloud Platform', category: 'Containers & Kubernetes', service_name: 'GKE', description: 'Cluster management', price: 0.10, pricing_unit: 'cluster/hour', billing_cycle: 'hour', region: 'us-central1' },

  // Networking
  { id: 'aws-data-out', provider: 'AWS', category: 'Networking', service_name: 'Data Transfer Out', price: 0.09, pricing_unit: 'GB', billing_cycle: 'unit', region: 'Global', input_label: 'Data Out (GB)' },
  { id: 'azure-data-out', provider: 'Microsoft Azure', category: 'Networking', service_name: 'Data Transfer Out', price: 0.087, pricing_unit: 'GB', billing_cycle: 'unit', region: 'Global', input_label: 'Data Out (GB)' },
  { id: 'gcp-data-out', provider: 'Google Cloud Platform', category: 'Networking', service_name: 'Data Transfer Out', price: 0.085, pricing_unit: 'GB', billing_cycle: 'unit', region: 'Global', input_label: 'Data Out (GB)' }
];
