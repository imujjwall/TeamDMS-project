import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Node from '../components/Node';
import { troubleshootingData } from '../data/troubleshootingData';

function DMIPage() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <div className="page-navigation">
          <Link to="/" className="back-button">← Back to Home</Link>
        </div>
        <div className="page-title">
          <h2>DMI - Direct Management Interface</h2>
          <p>Amazon Connect and direct management troubleshooting guides</p>
        </div>
        <div className="mindmap">
          {troubleshootingData.map((node, index) => (
            <Node key={node.id} node={node} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DMIPage;