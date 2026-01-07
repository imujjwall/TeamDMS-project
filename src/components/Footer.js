import { usePageTracking } from '../hooks/usePageTracking';

const Footer = () => {
  const quickLinks = usePageTracking();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About</h4>
          <p>AWS Troubleshooting Hub - Your comprehensive guide to diagnosing and resolving AWS service issues</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={`${link.path}-${index}`}>
                <a href={link.path}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://isengard.amazon.com/console-access" target="_blank" rel="noopener noreferrer">Isengard</a></li>
            <li><a href="https://repost.aws" target="_blank" rel="noopener noreferrer">AWS re:Post</a></li>
            <li><a href="https://docs.aws.amazon.com" target="_blank" rel="noopener noreferrer">AWS Documentation</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Developer</h4>
          <div className="developer-info">
            <p>Developed by <strong>Sai Srihari</strong></p>
            <div className="social-links">
              <a href="https://phonetool.amazon.com/users/sriharaz" target="_blank" rel="noopener noreferrer" className="github-link">
                <span className="github-icon">👤</span>
                Developer Profile
              </a>
              <a href="https://phonetool.amazon.com/users/sriharaz" target="_blank" rel="noopener noreferrer" className="repo-link">
                <span className="repo-icon">📁</span>
                Project Repository
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 AWS Troubleshooting Hub. Built for the AWS community.</p>
        <p className="footer-note">This is an independent project and is made for internal use only.</p>
      </div>
    </footer>
  );
};

export default Footer;