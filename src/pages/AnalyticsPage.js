import { Link } from 'react-router-dom';
import Header from '../components/Header';

function AnalyticsPage() {
  const analyticsServices = [
    {
      id: 'dfa',
      title: 'Data Flow Analytics (DFA)',
      description: 'Comprehensive troubleshooting guides for DFA services including MSK, OpenSearch, Kinesis, AppFlow, Kendra, and CloudSearch',
      icon: '🌊',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'dia',
      title: 'Data Insight Analytics (DIA)',
      description: 'Comprehensive troubleshooting guides for DIA services including Redshift, QuickSight, Grafana, Prometheus, Neptune, and DataZone',
      icon: '📈',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Analytics Troubleshooting"
        subtitle="Data Flow Analytics (DFA) and Data Insight Analytics (DIA) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Analytics Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific analytics troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {analyticsServices.map((service) => (
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

export default AnalyticsPage;