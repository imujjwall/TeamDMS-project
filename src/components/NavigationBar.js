import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">☁️</span>
            <span className="brand-text">AWS Troubleshooting</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;