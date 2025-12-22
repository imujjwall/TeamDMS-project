import { Link } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <div className="home-page">
          <p className="home-intro">Choose your service category to access comprehensive troubleshooting resources and expert guidance</p>
          
          <div className="section-cards">
            <Link to="/svls" className="section-card-link">
              <div className="section-card">
                <span className="card-icon"></span>
                <h3>SVLS (Serverless)</h3>
                <p>Comprehensive troubleshooting guides for AWS serverless services including Lambda, API Gateway, and Step Functions with detailed solutions</p>
              </div>
            </Link>
            
            <Link to="/dmi" className="section-card-link">
              <div className="section-card">
                <span className="card-icon"></span>
                <h3>DMI (Direct Management Interface)</h3>
                <p>Amazon Connect and direct management troubleshooting guides with detailed solutions and best practices for enterprise environments</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;