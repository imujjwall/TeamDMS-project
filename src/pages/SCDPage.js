import { Link } from 'react-router-dom';
import Header from '../components/Header';

function SCDPage() {
  const scdServices = [
    {
      id: 'dts',
      title: 'Data in Transit & Storage (DTS)',
      description: 'Comprehensive troubleshooting guides for DTS services including S3, EFS, FSx, Snowball, DataSync, Backup, and storage services',
      icon: '💾',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'mcd',
      title: 'Media & Content Delivery (MCD)',
      description: 'Comprehensive troubleshooting guides for MCD services including CloudFront, MediaLive, MediaConvert, SES, and content delivery services',
      icon: '🎬',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="SCD Troubleshooting"
        subtitle="Data in Transit & Storage (DTS) and Media & Content Delivery (MCD) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS SCD Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific SCD troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {scdServices.map((service) => (
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

export default SCDPage;