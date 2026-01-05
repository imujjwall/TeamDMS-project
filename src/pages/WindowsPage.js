import { Link } from 'react-router-dom';
import Header from '../components/Header';

function WindowsPage() {
  const windowsServices = [
    {
      id: 'eap',
      title: 'Enterprise Applications (EAP)',
      description: 'Comprehensive troubleshooting guides for EAP services including WorkSpaces, Directory Service, FSx for Windows, AppStream, and enterprise applications',
      icon: '🏢',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'win',
      title: 'Windows (WIN)',
      description: 'Comprehensive troubleshooting guides for WIN services including EC2 Windows, Systems Manager Windows, License Manager, and Windows Server solutions',
      icon: '🪟',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Windows Troubleshooting"
        subtitle="Enterprise Applications (EAP) and Windows (WIN) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Windows Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific Windows troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {windowsServices.map((service) => (
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

export default WindowsPage;