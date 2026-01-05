import { Link } from 'react-router-dom';
import Header from '../components/Header';

function DMSPage() {
  const dmsServices = [
    {
      id: 'svls',
      title: 'Serverless (SVLS)',
      description: 'Comprehensive troubleshooting guides for SVLS services including Lambda, API Gateway, Step Functions, SAM, SWF, Support API, Cloud9, and Alexa for Business',
      icon: '⚡',
      route: '/svls',
      color: '#ff6b35'
    },
    {
      id: 'dmi',
      title: 'Developer Mobile, Messaging & IoT (DMI)',
      description: 'Comprehensive troubleshooting guides for DMI services including IoT, Chime SDK, Amazon One, Connect, SQS, SNS, Amplify, AppSync, GameLift, Pinpoint, and mobile services',
      icon: '🎯',
      route: '/dmi',
      color: '#4285f4'
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="DMS Troubleshooting"
        subtitle="Developer Mobile, Messaging & IoT (DMI) and Serverless (SVLS) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS DMS Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific DMS troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {dmsServices.map((service) => (
              <div key={service.id} className="service-card-wrapper">
                <Link to={service.route} className="service-card-link">
                  <div 
                    className="service-card available"
                    style={{ '--service-color': service.color }}
                  >
                    <div className="service-card-header">
                      <span className="service-icon">{service.icon}</span>
                      <div className="service-status available">Available</div>
                    </div>
                    <div className="service-card-content">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="service-card-footer">
                      <span className="service-action">Explore Guides →</span>
                    </div>
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

export default DMSPage;