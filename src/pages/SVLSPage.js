import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Node from '../components/Node';
import { svlsTroubleshootingData } from '../data/svlsTroubleshootingData';

function SVLSPage() {
  return (
    <>
      <Header 
        title="AWS Serverless Troubleshooting"
        subtitle="Comprehensive troubleshooting guides for Lambda, API Gateway, and Step Functions"
        logoUrl="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
        logoAlt="AWS Serverless Services - Lambda, API Gateway, Step Functions, EventBridge"
      />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Home</Link>
        </div>
        <div className="page-title">
          <h2>SVLS - Serverless Troubleshooting</h2>
          <p>Comprehensive troubleshooting guides for AWS serverless services</p>
        </div>
        <div className="mindmap">
          {svlsTroubleshootingData.map((node, index) => (
            <Node key={node.id} node={node} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SVLSPage;