import EnhancedPageLayout from '../components/EnhancedPageLayout';
import { svlsTroubleshootingData } from '../data/svlsTroubleshootingData';

function SVLSPage() {
  return (
    <EnhancedPageLayout
      title=""
      subtitle=""
      data={svlsTroubleshootingData}
      backLink="/dms"
      headerProps={{
        title: "Serverless (SVLS)",
        subtitle: "Comprehensive troubleshooting guides for SVLS services including Lambda, API Gateway, Step Functions, SAM, SWF, Support API, Cloud9, and Alexa for Business",
        logoUrl: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png",
        logoAlt: "AWS Serverless Services"
      }}
    />
  );
}

export default SVLSPage;