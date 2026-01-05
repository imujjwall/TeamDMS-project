import { Link } from 'react-router-dom';
import Header from '../components/Header';

function NetworkingPage() {
  const networkingServices = [
    {
      id: 'netdev',
      title: 'Network Devices (NetDev)',
      description: 'Comprehensive troubleshooting guides for NetDev services including Direct Connect, VPN, Transit Gateway, Network Manager, Cloud WAN, Private 5G, Ground Station, and Client VPN',
      icon: '🔗',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'netinf',
      title: 'Network Infrastructure (NetInf)',
      description: 'Comprehensive troubleshooting guides for NetInf services including VPC, Route 53, WAF, Shield, Network Firewall, Firewall Manager, and DDoS protection',
      icon: '🏗️',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    },
    {
      id: 'netmns',
      title: 'Network Monitor and Scale (NetMnS)',
      description: 'Comprehensive troubleshooting guides for NetMnS services including ELB, CloudWatch, Auto Scaling, EventBridge, Global Accelerator, and VPC Lattice',
      icon: '⚖️',
      route: '/netmns',
      color: '#ff6b35'
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Networking Troubleshooting"
        subtitle="Network Devices (NetDev), Network Infrastructure (NetInf), and Network Monitor and Scale (NetMnS) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Networking Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific networking troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {networkingServices.map((service) => (
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

export default NetworkingPage;