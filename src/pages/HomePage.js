import { Link } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  const serviceCategories = [
    {
      id: 'dms-troubleshooting',
      title: 'DMS Troubleshooting',
      description: 'Comprehensive troubleshooting guides for AWS Database Migration Service with detailed solutions and best practices',
      icon: '🔄',
      route: '/dms',
      available: true
    },
    {
      id: 'database-troubleshooting',
      title: 'Database',
      description: 'Databases MySQL (DBMy) and Databases PostgreSQL (DBPo) troubleshooting guides for RDS, Aurora, DynamoDB, and database services',
      icon: '🗄️',
      route: '/database',
      available: true
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Data Flow Analytics (DFA) and Data Insight Analytics (DIA) troubleshooting guides for Redshift, OpenSearch, Kinesis, and analytics services',
      icon: '📊',
      route: '/analytics',
      available: true
    },
    {
      id: 'big-data',
      title: 'Big Data',
      description: 'Distributed Processing (DIST), DynamoDB and Language (DBL), Extract Transform Load (ETL), and SageMaker Vision & Other (SVO) troubleshooting guides',
      icon: '📈',
      route: '/bigdata',
      available: true
    },
    {
      id: 'networking',
      title: 'Networking',
      description: 'VPC, Load Balancer, CloudFront, and networking troubleshooting with connectivity solutions',
      icon: '🌐',
      route: '/networking',
      available: true
    },
    {
      id: 'deployment',
      title: 'Deployment',
      description: 'Code Delivery and Analysis (CDA), Containers, and Infrastructure as Code (IaC) troubleshooting guides for CI/CD and deployment automation',
      icon: '🚀',
      route: '/deployment',
      available: true
    },
    {
      id: 'scd',
      title: 'SCD',
      description: 'Data in Transit & Storage (DTS) and Media & Content Delivery (MCD) troubleshooting guides for storage, backup, and content delivery services',
      icon: '⚙️',
      route: '/scd',
      available: true
    },
    {
      id: 'linux',
      title: 'Linux',
      description: 'Linux system administration, performance tuning, and troubleshooting guides for AWS environments',
      icon: '🐧',
      route: '/linux',
      available: true
    },
    {
      id: 'windows',
      title: 'Windows',
      description: 'Enterprise Applications (EAP) and Windows (WIN) troubleshooting guides for Windows Server, WorkSpaces, and enterprise Windows solutions',
      icon: '🪟',
      route: '/windows',
      available: true
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Security Identity and Protection (SIP) and Security and Crypto (SNC) troubleshooting guides for IAM, GuardDuty, WAF, and security services',
      icon: '🔒',
      route: '/security',
      available: true
    },
    {
      id: 'unified-operations',
      title: 'Unified Operations',
      description: 'Gen-AI, MSS, and Telco troubleshooting guides for CloudWatch, Systems Manager, and unified operations monitoring',
      icon: '🔧',
      route: '/operations',
      available: true
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="AWS Troubleshooting Hub"
        subtitle="Comprehensive troubleshooting resources and expert guidance for AWS services"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Troubleshooting Hub"
      />
      <div className="content-wrapper">
        <div className="home-page">
          <p className="home-intro">Choose your service category to access comprehensive troubleshooting resources and expert guidance</p>
          
          <div className="section-cards">
            {serviceCategories.map((service) => (
              <Link key={service.id} to={service.route} className="section-card-link">
                <div className={`section-card ${service.available ? 'available' : 'coming-soon'}`}>
                  <span className="card-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {!service.available && (
                    <div className="coming-soon-badge">Coming Soon</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;