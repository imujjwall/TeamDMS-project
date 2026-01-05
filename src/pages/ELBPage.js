import EnhancedPageLayout from '../components/EnhancedPageLayout';
import { elbTroubleshootingData } from '../data/elbTroubleshootingData';

function ELBPage() {
  return (
    <EnhancedPageLayout
      title=""
      subtitle=""
      data={elbTroubleshootingData}
      backLink="/netmns"
      headerProps={{
        title: "Elastic Load Balancer Troubleshooting",
        subtitle: "Comprehensive troubleshooting guides for AWS Elastic Load Balancer services including CLB, ALB, NLB, and GWLB",
        logoUrl: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png",
        logoAlt: "AWS Elastic Load Balancer Services"
      }}
    />
  );
}

export default ELBPage;