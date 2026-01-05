import { Link } from 'react-router-dom';
import Header from '../components/Header';

function BigDataPage() {
  const bigDataServices = [
    {
      id: 'dist',
      title: 'Distributed Processing (DIST)',
      description: 'Comprehensive troubleshooting guides for DIST services including Elastic MapReduce (EMR) and distributed processing frameworks',
      icon: '🔄',
      route: '/coming-soon',
      color: '#4285f4',
      available: false
    },
    {
      id: 'dbl',
      title: 'DynamoDB and Language (DBL)',
      description: 'Comprehensive troubleshooting guides for DBL services including DynamoDB, Polly, Transcribe, Lex, Comprehend, and language services',
      icon: '🗣️',
      route: '/coming-soon',
      color: '#34a853',
      available: false
    },
    {
      id: 'etl',
      title: 'Extract, Transform and Load (ETL)',
      description: 'Comprehensive troubleshooting guides for ETL services including Glue, Athena, MWAA, Lake Formation, and data processing pipelines',
      icon: '⚙️',
      route: '/coming-soon',
      color: '#ff6b35',
      available: false
    },
    {
      id: 'svo',
      title: 'SageMaker, Vision & Other (SVO)',
      description: 'Comprehensive troubleshooting guides for SVO services including SageMaker, Bedrock, Rekognition, Textract, and ML services',
      icon: '🤖',
      route: '/coming-soon',
      color: '#9c27b0',
      available: false
    }
  ];

  return (
    <div className="page-content">
      <Header 
        title="Big Data Troubleshooting"
        subtitle="Distributed Processing (DIST), DynamoDB and Language (DBL), Extract Transform Load (ETL), and SageMaker Vision & Other (SVO) troubleshooting categories"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Big Data Troubleshooting"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Service Categories</Link>
        </div>
        
        <div className="home-page">
          <div className="home-intro-section">
            <p className="home-intro">
              Choose your specific big data troubleshooting category to access detailed guides and solutions
            </p>
          </div>
          
          <div className="service-grid dms-service-grid">
            {bigDataServices.map((service) => (
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

export default BigDataPage;