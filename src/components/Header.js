const Header = ({ title = "DMS Troubleshooting Guide", subtitle = "Your comprehensive guide to diagnosing and resolving DMS service issues", logoUrl = "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png", logoAlt = "Amazon Logo" }) => {
  return (
    <header>
      <div className="logo-container">
        <img 
          src={logoUrl}
          alt={logoAlt}
          className="amazon-logo"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>
      <h1>{title}</h1>
      <p className="subtitle">
        {subtitle}
      </p>
    </header>
  );
};

export default Header;
