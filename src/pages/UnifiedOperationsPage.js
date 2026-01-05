import { Link } from 'react-router-dom';
import Header from '../components/Header';

function UnifiedOperationsPage() {
  const unifiedOperationsServices = [
    {
      id: 'genai',
      title: 'Gen-AI',
      description: 'Comprehensive troubleshooting guides for Gen-AI services including GenAI-SageMaker, GenAI-S3, GenAI-FSx, GenAI-EC2, and GenAI-EKS',
      icon: '🤖',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'mss',
      title: 'MSS (Media Support Solution)',
      description: 'Comprehensive troubleshooting guides for MSS services including MSS MediaConvert, MSS CloudFront, MSS MediaLive, and media support solutions',
      icon: '📺',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    },
    {
      id: 'telco',
      title: 'Telco',
      description: 'Comprehensive troubleshooting guides for Telco services including Public5G Direct Connect, Public5G-Outposts, Public5G EKS, and telecommunications services',
      icon: '📡',
      route: '/coming-soon',
      color: '#ff6b35',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Unified Operations Troubleshooting"
        subtitle="Gen-AI, MSS (Media Support Solution), and Telco troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Unified Operations Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific unified operations troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {unifiedOperationsServices.map((service) => (
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

export default UnifiedOperationsPage;