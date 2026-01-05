import { Link } from 'react-router-dom';
import Header from '../components/Header';

function LinuxPage() {
  const linuxServices = [
    {
      id: 'ec2-linux',
      title: 'Elastic Compute Cloud (EC2 - Linux)',
      description: 'Comprehensive troubleshooting guides for EC2 Linux instances, performance optimization, and system administration',
      icon: '🖥️',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'systems-manager-linux',
      title: 'Systems Manager Linux',
      description: 'Systems Manager troubleshooting guides for Linux environments including patch management and automation',
      icon: '⚙️',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    },
    {
      id: 'elasticache',
      title: 'ElastiCache',
      description: 'ElastiCache troubleshooting guides for Redis and Memcached clusters on Linux environments',
      icon: '💾',
      route: '/coming-soon',
      color: '#ff6b35',
      available: false
    },
    {
      id: 'ebs',
      title: 'Elastic Block Store (EBS)',
      description: 'EBS troubleshooting guides for volume management, performance optimization, and storage issues',
      icon: '💿',
      route: '/coming-soon',
      color: '#9c27b0',
      available: false
    },
    {
      id: 'lightsail',
      title: 'Lightsail',
      description: 'Lightsail troubleshooting guides for VPS instances, networking, and application deployment',
      icon: '⛵',
      route: '/coming-soon',
      color: '#e91e63',
      available: false
    },
    {
      id: 'migration-services',
      title: 'Migration Services (Linux)',
      description: 'Application Migration Service, Server Migration Service, and migration troubleshooting for Linux workloads',
      icon: '🔄',
      route: '/coming-soon',
      color: '#795548',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Linux Troubleshooting"
        subtitle="Comprehensive troubleshooting guides for AWS Linux services including EC2, Systems Manager, ElastiCache, and migration services"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Linux Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific Linux troubleshooting service to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {linuxServices.map((service) => (
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

export default LinuxPage;