// Content templates for common troubleshooting patterns

/**
 * Generate standardized troubleshooting content
 * @param {Object} config - Configuration for the content
 * @returns {string} HTML content string
 */
export const generateTroubleshootingContent = (config) => {
  const {
    customerSays,
    quickCheck = [],
    commonCauses = [],
    quickFixes = [],
    playbookLink,
    playbookTitle,
    note,
    errorTypes = [],
    sections = []
  } = config;
  
  let content = '<div class="troubleshooting">';
  
  // Quick Check section
  if (customerSays) {
    content += `
      <div class="section-header">Quick Check</div>
      <p><strong>Customer says:</strong> "${customerSays}"</p>
    `;
  }
  
  // What to Look For / Where to Look section
  if (quickCheck.length > 0) {
    content += `
      <div class="section-header">${quickCheck.length > 1 ? 'What to Look For' : 'Where to Look'}</div>
      <div class="checklist">
        <ul>
          ${quickCheck.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Common Causes section
  if (commonCauses.length > 0) {
    content += `
      <div class="section-header">Common Causes</div>
      <div class="checklist">
        <ul>
          ${commonCauses.map(cause => `<li>${cause}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Error Types section
  if (errorTypes.length > 0) {
    content += `
      <div class="section-header">Common Error Types</div>
      <div class="error-types">
        <ul>
          ${errorTypes.map(error => `<li>${error}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Quick Fixes section
  if (quickFixes.length > 0) {
    content += `
      <div class="section-header">Quick Fixes</div>
      <div class="best-practices">
        <ol>
          ${quickFixes.map(fix => `<li>${fix}</li>`).join('')}
        </ol>
      </div>
    `;
  }
  
  // Custom sections
  sections.forEach(section => {
    content += `
      <div class="section-header">${section.title}</div>
      <div class="${section.className || 'section-content'}">
        ${section.content}
      </div>
    `;
  });
  
  // Playbook reference
  if (playbookLink && playbookTitle) {
    content += `
      <div class="playbook-reference">
        <h4>📖 Internal Playbook Reference</h4>
        <a href="${playbookLink}" class="playbook-link" target="_blank">
          ${playbookTitle}
        </a>
      </div>
    `;
  }
  
  // Note section
  if (note) {
    content += `
      <div class="note">
        💡 ${note}
      </div>
    `;
  }
  
  content += '</div>';
  
  return content;
};

/**
 * Common troubleshooting templates
 */
export const CONTENT_TEMPLATES = {
  // Timeout issues template
  timeout: (service, maxTimeout) => generateTroubleshootingContent({
    customerSays: "My function/service is timing out",
    quickCheck: [
      `Check CloudWatch logs for "Task timed out after X seconds"`,
      `Look at ${service} timeout setting`,
      "Check if service is doing heavy processing"
    ],
    quickFixes: [
      `<strong>Increase timeout:</strong> Go to ${service} console → Configuration → General → Timeout${maxTimeout ? ` (max ${maxTimeout})` : ''}`,
      "<strong>Check memory:</strong> Low memory = slow CPU = timeout",
      "<strong>Look for database connections:</strong> Are they hanging?"
    ],
    note: "Most timeouts are either too low timeout setting or database connection issues"
  }),
  
  // Permission errors template
  permissions: (service) => generateTroubleshootingContent({
    customerSays: "Getting permission denied or access denied errors",
    quickCheck: [
      "Check CloudWatch logs for AccessDenied errors",
      "Look at IAM role attached to the service",
      "Check resource-based policies"
    ],
    quickFixes: [
      `<strong>Check IAM role:</strong> Go to ${service} console → Configuration → Permissions`,
      "<strong>Verify policies:</strong> Ensure required permissions are attached",
      "<strong>Check resource policies:</strong> S3 bucket policies, KMS key policies, etc."
    ],
    note: "Always use least privilege principle when adding permissions"
  }),
  
  // Performance issues template
  performance: (service) => generateTroubleshootingContent({
    customerSays: "Service is running slowly or performance is poor",
    commonCauses: [
      "Cold starts (first invocation is always slower)",
      "Insufficient memory allocation",
      "Database connection pooling issues",
      "Large deployment packages",
      "Network latency"
    ],
    quickFixes: [
      "<strong>Increase memory:</strong> More memory = faster CPU",
      "<strong>Optimize code:</strong> Remove unnecessary dependencies",
      "<strong>Use connection pooling:</strong> Reuse database connections",
      "<strong>Enable provisioned concurrency:</strong> Reduce cold starts"
    ],
    note: "Monitor CloudWatch metrics to identify bottlenecks"
  }),
  
  // Generic error template
  genericError: (service) => generateTroubleshootingContent({
    customerSays: "Getting error messages or service is failing",
    quickCheck: [
      `CloudWatch Logs → /aws/${service.toLowerCase()}/[resource-name]`,
      "Look for red ERROR lines",
      "Check the actual error message"
    ],
    errorTypes: [
      '<strong>"Runtime.ExitError":</strong> Out of memory - increase memory',
      '<strong>"AccessDenied":</strong> Permission issue - check IAM role',
      '<strong>"Module not found":</strong> Missing dependency - check deployment package',
      '<strong>"Unable to import module":</strong> Code issue - check handler name'
    ],
    note: "Always check CloudWatch logs first - the error message usually tells you exactly what's wrong"
  })
};

/**
 * Generate playbook link
 * @param {string} service - Service name
 * @param {string} type - Type of runbook (troubleshooting, best-practices, etc.)
 * @returns {string} Playbook URL
 */
export const generatePlaybookLink = (service, type = 'troubleshooting') => {
  const baseUrl = "https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal";
  return `${baseUrl}/DMS/${service}/${type}/Runbook`;
};

/**
 * Validate template configuration
 * @param {Object} config - Template configuration
 * @returns {Array} Array of validation errors
 */
export const validateTemplateConfig = (config) => {
  const errors = [];
  
  if (!config || typeof config !== 'object') {
    errors.push('Template configuration must be an object');
    return errors;
  }
  
  // Check for required fields based on template type
  if (config.customerSays && typeof config.customerSays !== 'string') {
    errors.push('customerSays must be a string');
  }
  
  if (config.quickCheck && !Array.isArray(config.quickCheck)) {
    errors.push('quickCheck must be an array');
  }
  
  if (config.quickFixes && !Array.isArray(config.quickFixes)) {
    errors.push('quickFixes must be an array');
  }
  
  if (config.playbookLink && typeof config.playbookLink !== 'string') {
    errors.push('playbookLink must be a string');
  }
  
  return errors;
};