// Service configuration and metadata
export const SERVICES = {
  // Serverless Services
  svls: {
    id: 'svls',
    name: 'Serverless (SVLS)',
    description: 'Comprehensive troubleshooting guides for SVLS services including Lambda, API Gateway, Step Functions, SAM, SWF, Support API, Cloud9, and Alexa for Business',
    category: 'compute',
    backLink: '/dms',
    dataFile: 'svlsTroubleshootingData',
    logoAlt: 'AWS Serverless Services'
  },
  
  // Elastic Load Balancer
  elb: {
    id: 'elb',
    name: 'Elastic Load Balancer Troubleshooting',
    description: 'Comprehensive troubleshooting guides for AWS Elastic Load Balancer services including CLB, ALB, NLB, and GWLB',
    category: 'networking',
    backLink: '/netmns',
    dataFile: 'elbTroubleshootingData',
    logoAlt: 'AWS Elastic Load Balancer Services'
  },
  
  // Developer Mobile, Messaging & IoT
  dmi: {
    id: 'dmi',
    name: 'Developer Mobile, Messaging & IoT (DMI)',
    description: 'Comprehensive troubleshooting guides for DMI services including IoT, Connect, messaging, mobile, and developer tools',
    category: 'developer',
    backLink: '/dms',
    dataFile: 'dmitroubleshootingdata',
    logoAlt: 'AWS Developer Mobile, Messaging & IoT Services'
  }
};

// Service categories for organization
export const SERVICE_CATEGORIES = {
  compute: {
    name: 'Compute Services',
    description: 'EC2, Lambda, Container services',
    icon: '⚡'
  },
  networking: {
    name: 'Networking Services', 
    description: 'VPC, Load Balancers, CDN',
    icon: '🌐'
  },
  database: {
    name: 'Database Services',
    description: 'RDS, DynamoDB, ElastiCache',
    icon: '🗄️'
  },
  storage: {
    name: 'Storage Services',
    description: 'S3, EBS, EFS',
    icon: '💾'
  },
  developer: {
    name: 'Developer Tools',
    description: 'CodeCommit, CodeBuild, CodeDeploy',
    icon: '🛠️'
  },
  analytics: {
    name: 'Analytics Services',
    description: 'Kinesis, EMR, Redshift',
    icon: '📊'
  },
  security: {
    name: 'Security Services',
    description: 'IAM, KMS, CloudTrail',
    icon: '🔒'
  },
  operations: {
    name: 'Operations Services',
    description: 'CloudWatch, Systems Manager',
    icon: '🔧'
  }
};

// Theme colors for services (can be overridden)
export const SERVICE_COLORS = {
  lambda: '#ffc107',
  apigateway: '#2196f3', 
  dms: '#ff6b35',
  monitoring: '#17a2b8',
  solutions: '#28a745',
  elb: '#9c27b0',
  svls: '#00bcd4',
  dmi: '#e91e63',
  database: '#4caf50',
  analytics: '#ff9800',
  security: '#f44336',
  operations: '#607d8b'
};