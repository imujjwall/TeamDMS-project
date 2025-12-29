import EnhancedPageLayout from '../components/EnhancedPageLayout';
import { dmitroubleshootingdata } from '../data/dmitroubleshootingdata';

function DMIPage() {
  return (
    <EnhancedPageLayout
      title=""
      subtitle=""
      data={dmitroubleshootingdata}
      backLink="/dms"
      headerProps={{
        title: "Developer Mobile, Messaging & IoT (DMI)",
        subtitle: "Comprehensive troubleshooting guides for DMI services including IoT, Connect, messaging, mobile, and developer tools",
        logoUrl: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png",
        logoAlt: "AWS Developer Mobile, Messaging & IoT Services"
      }}
    />
  );
}

export default DMIPage;