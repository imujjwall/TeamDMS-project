import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ComingSoonPage() {
  return (
    <div className="page-content">
      <Header 
        title="Coming Soon"
        subtitle="This service troubleshooting guide is under development"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS DMS Troubleshooting Hub"
      />
      <div className="content-wrapper">
        <div className="coming-soon-page">
          <div className="coming-soon-content">
            <div className="coming-soon-icon">🚧</div>
            <h2 className="coming-soon-title">Service Under Development</h2>
            <p className="coming-soon-description">
              We're working hard to bring you comprehensive troubleshooting guides for this service. 
              Our team is developing detailed solutions, best practices, and expert guidance.
            </p>
            
            <div className="coming-soon-features">
              <h3>What's Coming:</h3>
              <ul>
                <li>📚 Comprehensive troubleshooting guides</li>
                <li>🔍 Advanced search functionality</li>
                <li>💡 Expert solutions and best practices</li>
                <li>🎯 Interactive problem-solving tools</li>
                <li>📖 Detailed documentation and examples</li>
              </ul>
            </div>
            
            <div className="coming-soon-actions">
              <Link to="/" className="back-home-btn">
                ← Back to Service Categories
              </Link>
              <Link to="/dms" className="explore-available-btn">
                Explore Available Services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonPage;