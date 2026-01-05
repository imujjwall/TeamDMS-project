import { Link } from 'react-router-dom';
import Header from '../components/Header';

function DeploymentPage() {
  const deploymentServices = [
    {
      id: 'cda',
      title: 'Code Delivery and Analysis (CDA)',
      description: 'Comprehensive troubleshooting guides for CDA services including CodeCommit, CodeDeploy, CodePipeline, DevOps Guru, and Elastic Beanstalk',
      icon: '🚀',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'containers',
      title: 'Containers',
      description: 'Comprehensive troubleshooting guides for container services including EKS, ECS, Fargate, ECR, App Mesh, and Batch',
      icon: '📦',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    },
    {
      id: 'iac',
      title: 'Infrastructure as Code (IaC)',
      description: 'Comprehensive troubleshooting guides for IaC services including CloudFormation, CDK, Service Catalog, Control Tower, and OpsWorks',
      icon: '🏗️',
      route: '/coming-soon',
      color: '#ff6b35',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Deployment Troubleshooting"
        subtitle="Code Delivery and Analysis (CDA), Containers, and Infrastructure as Code (IaC) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Deployment Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific deployment troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {deploymentServices.map((service) => (
              <div key={service.id} className="service-card-wrapper">
                <Link to={service.route} className="service-card-link">
                  <div 
                    className={`service-card ${service.available !== false ? 'available' : 'coming-soon'}`}
                    style={{ '--service-color': service.color }}
                  >
                    <div className="service-card-header">
                      <span className="service-icon">{service.icon}</span>
                      <div className={`service-status ${service.available !== false ? 'available' : 'coming-soon'}`}>
                        {service.available !== false ? 'Available' : 'Coming Soon'}
                      </div>
                    </div>
                    <div className="service-card-content">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="service-card-footer">
                      <span className="service-action">
                        {service.available !== false ? 'Explore Guides →' : 'Coming Soon'}
                      </span>
                    </div>
                    {service.available === false && (
                      <div className="coming-soon-badge">Coming Soon</div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeploymentPage;