import { Link } from 'react-router-dom';
import Header from '../components/Header';

function NetMnSPage() {
  const netmnsServices = [
    {
      id: 'elb',
      title: 'Elastic Load Balancing (ELB)',
      description: 'Complete troubleshooting guides for AWS Elastic Load Balancer services including CLB, ALB, NLB, and GWLB with expert solutions',
      icon: '⚖️',
      route: '/elb',
      color: '#34a853'
    },
    {
      id: 'cloudwatch',
      title: 'CloudWatch',
      description: 'Comprehensive CloudWatch troubleshooting guides for monitoring, metrics, alarms, logs, and dashboards',
      icon: '📊',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'autoscaling',
      title: 'Auto Scaling',
      description: 'Auto Scaling troubleshooting guides for EC2 Auto Scaling groups, scaling policies, and capacity management',
      icon: '📈',
      route: '/coming-soon',
      color: '#ff6b35',
      available: false
    },
    {
      id: 'eventbridge',
      title: 'EventBridge',
      description: 'EventBridge troubleshooting guides for event routing, rules, targets, and event-driven architectures',
      icon: '🔄',
      route: '/coming-soon',
      color: '#9c27b0',
      available: false
    },
    {
      id: 'global-accelerator',
      title: 'Global Accelerator',
      description: 'Global Accelerator troubleshooting guides for traffic optimization, endpoint health, and global routing',
      icon: '🌍',
      route: '/coming-soon',
      color: '#e91e63',
      available: false
    },
    {
      id: 'vpc-lattice',
      title: 'VPC Lattice',
      description: 'VPC Lattice troubleshooting guides for service networking, service mesh, and inter-service communication',
      icon: '🕸️',
      route: '/coming-soon',
      color: '#795548',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Network Monitor and Scale (NetMnS)"
        subtitle="Comprehensive troubleshooting guides for NetMnS services including ELB, CloudWatch, Auto Scaling, EventBridge, and Global Accelerator"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Network Monitor and Scale Services"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/networking" className="back-button">← Back to Networking Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific NetMnS troubleshooting service to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {netmnsServices.map((service) => (
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

export default NetMnSPage;