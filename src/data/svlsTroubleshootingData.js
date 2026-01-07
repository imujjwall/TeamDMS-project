const svlsTroubleshootingData = [
  {
    id: "root",
    title: "AWS Serverless Troubleshooting",
    children: [
      {
        id: "lambda-service",
        title: "AWS Lambda Issues",
        children: [
          {
            id: "lambda-timeout",
            title: "Function Times Out",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "My function is timing out" or "Getting timeout errors"</p>
                
                <div class="section-header">What to Look For</div>
                <div class="checklist">
                  <ul>
                    <li>Check CloudWatch logs for "Task timed out after X seconds"</li>
                    <li>Look at function timeout setting (default is 3 seconds)</li>
                    <li>Check if function is doing heavy processing</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Increase timeout:</strong> Go to Lambda console → Configuration → General → Timeout (max 15 minutes)</li>
                    <li><strong>Check memory:</strong> Low memory = slow CPU = timeout</li>
                    <li><strong>Look for database connections:</strong> Are they hanging?</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/Lambda/Troubleshooting/Runbook" class="playbook-link" target="_blank">
                    Lambda Troubleshooting Runbook
                  </a>
                </div>

                <div class="note">
                  💡 Most timeouts are either too low timeout setting or database connection issues
                </div>
              </div>
            `
          },
          {
            id: "lambda-errors",
            title: "Function Throws Errors",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "My function is failing" or "Getting error messages"</p>
                
                <div class="section-header">Where to Look</div>
                <div class="checklist">
                  <ul>
                    <li>CloudWatch Logs → /aws/lambda/[function-name]</li>
                    <li>Look for red ERROR lines</li>
                    <li>Check the actual error message</li>
                  </ul>
                </div>

                <div class="section-header">Common Error Types</div>
                <div class="error-types">
                  <ul>
                    <li><strong>"Runtime.ExitError":</strong> Out of memory - increase memory</li>
                    <li><strong>"AccessDenied":</strong> Permission issue - check IAM role</li>
                    <li><strong>"Module not found":</strong> Missing dependency - check deployment package</li>
                    <li><strong>"Unable to import module":</strong> Code issue - check handler name</li>
                  </ul>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/Lambda/Troubleshooting/Runbook" class="playbook-link" target="_blank">
                    Lambda Troubleshooting Runbook
                  </a>
                </div>

                <div class="note">
                  💡 Always check CloudWatch logs first - the error message usually tells you exactly what's wrong
                </div>
              </div>
            `
          },
          {
            id: "lambda-slow",
            title: "Function is Slow",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "My function takes too long" or "Performance is poor"</p>
                
                <div class="section-header">Common Causes</div>
                <div class="checklist">
                  <ul>
                    <li><strong>Cold starts:</strong> First invocation is always slower</li>
                    <li><strong>Low memory:</strong> Less memory = slower CPU</li>
                    <li><strong>Database connections:</strong> Creating new connections each time</li>
                    <li><strong>Large packages:</strong> Big deployment packages slow down cold starts</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Increase memory:</strong> More memory = faster CPU (try doubling it)</li>
                    <li><strong>Reuse connections:</strong> Create DB connections outside the handler</li>
                    <li><strong>Use Provisioned Concurrency:</strong> For consistent performance</li>
                    <li><strong>Optimize package size:</strong> Remove unused dependencies</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/Lambda/Troubleshooting/Runbook" class="playbook-link" target="_blank">
                    Lambda Troubleshooting Runbook
                  </a>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: "apigateway-service",
        title: "API Gateway Issues",
        children: [
          {
            id: "cors-blocked",
            title: "Browser Blocks Request (CORS)",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "Browser blocks my API calls" or "CORS error in console"</p>
                
                <div class="section-header">What You'll See</div>
                <div class="error-types">
                  <ul>
                    <li>Browser console shows CORS error</li>
                    <li>Request works in Postman but not browser</li>
                    <li>OPTIONS request failing</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fix</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>API Gateway Console:</strong> Select resource → Actions → Enable CORS</li>
                    <li><strong>Set headers:</strong> Access-Control-Allow-Origin: * (or specific domain)</li>
                    <li><strong>Deploy API:</strong> Must deploy after enabling CORS!</li>
                    <li><strong>Lambda response:</strong> Make sure Lambda returns CORS headers too</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/APIGateway/Troubleshooting" class="playbook-link" target="_blank">
                    API Gateway Troubleshooting Guide
                  </a>
                </div>

                <div class="note">
                  💡 Remember: Enable CORS in API Gateway AND deploy the API. Both steps are required!
                </div>
              </div>
            `
          },
          {
            id: "auth-failed",
            title: "Authentication Failed",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "Getting 401 Unauthorized" or "403 Forbidden"</p>
                
                <div class="section-header">Check These First</div>
                <div class="checklist">
                  <ul>
                    <li><strong>API Key:</strong> Is it required? Is it being sent?</li>
                    <li><strong>Authorizer:</strong> Is there a Lambda authorizer? Is it working?</li>
                    <li><strong>IAM:</strong> Does the user/role have execute-api permissions?</li>
                    <li><strong>Cognito:</strong> Is the JWT token valid and not expired?</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Test without auth:</strong> Temporarily remove auth to isolate issue</li>
                    <li><strong>Check authorizer logs:</strong> Look at Lambda authorizer CloudWatch logs</li>
                    <li><strong>Verify token:</strong> Use jwt.io to decode and check JWT tokens</li>
                    <li><strong>Check IAM policies:</strong> Ensure execute-api:Invoke permission</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/APIGateway/Troubleshooting" class="playbook-link" target="_blank">
                    API Gateway Troubleshooting Guide
                  </a>
                </div>
              </div>
            `
          },
          {
            id: "too-many-requests",
            title: "Too Many Requests (429)",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "Getting 429 errors" or "API is being throttled"</p>
                
                <div class="section-header">What's Happening</div>
                <div class="checklist">
                  <ul>
                    <li>API Gateway has rate limits</li>
                    <li>Default: 10,000 requests per second per account</li>
                    <li>Usage plans can set lower limits</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Check usage plans:</strong> API Gateway → Usage Plans → check limits</li>
                    <li><strong>Increase limits:</strong> Modify usage plan or request limit increase</li>
                    <li><strong>Add retry logic:</strong> Client should retry with exponential backoff</li>
                    <li><strong>Use caching:</strong> Enable API Gateway caching to reduce requests</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/APIGateway/Troubleshooting" class="playbook-link" target="_blank">
                    API Gateway Troubleshooting Guide
                  </a>
                </div>
              </div>
            `
          },
          {
            id: "apigateway-additional-docs",
            title: "Additional Documentation & Resources",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Access</div>
                <p><strong>Need more help?</strong> Access comprehensive API Gateway documentation and training materials for deeper troubleshooting and learning.</p>
                
                <div class="section-header">Internal Resources</div>
                <div class="checklist">
                  <ul>
                    <li><strong>Knowledge Base FAQ:</strong> Frequently asked questions and common issues</li>
                    <li><strong>Training Materials:</strong> Best practices and advanced troubleshooting techniques</li>
                    <li><strong>Updated Content:</strong> Regularly updated with latest troubleshooting methods</li>
                  </ul>
                </div>

                <div class="section-header">Quick Access Links</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Knowledge Base:</strong> Search FAQ for common API Gateway issues</li>
                    <li><strong>Training Resources:</strong> Access comprehensive learning materials</li>
                    <li><strong>Internal Docs:</strong> Service-specific troubleshooting guides</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/APIGateway/KnowledgeBase/FAQ" class="playbook-link" target="_blank">
                    API Gateway Knowledge Base FAQ
                  </a>
                </div>

                <div class="playbook-reference">
                  <h4>🎓 Training Materials</h4>
                  <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/DMS/APIGateway/Training/Resources" class="playbook-link" target="_blank">
                    API Gateway Training Resources
                  </a>
                </div>

                <div class="note">
                  💡 These internal resources are your go-to for complex API Gateway issues and continuous learning!
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: "stepfunctions-service",
        title: "Step Functions Issues",
        children: [
          {
            id: "workflow-fails",
            title: "Workflow Execution Fails",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "My Step Function is failing" or "Workflow stops working"</p>
                
                <div class="section-header">Where to Look</div>
                <div class="checklist">
                  <ul>
                    <li>Step Functions console → Executions → Failed executions</li>
                    <li>Click on failed execution to see visual flow</li>
                    <li>Red states show where it failed</li>
                    <li>Check the error message in the failed state</li>
                  </ul>
                </div>

                <div class="section-header">Common Issues</div>
                <div class="error-types">
                  <ul>
                    <li><strong>Lambda function fails:</strong> Check Lambda logs</li>
                    <li><strong>Timeout:</strong> State took too long to complete</li>
                    <li><strong>Wrong input format:</strong> Data doesn't match what state expects</li>
                    <li><strong>Permission denied:</strong> Step Function can't invoke the service</li>
                  </ul>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/Forecasting/Marvel/Tech/StepFunction/" class="playbook-link" target="_blank">
                    Step Functions Troubleshooting Guide
                  </a>
                </div>

                <div class="note">
                  💡 The Step Functions visual interface shows exactly where it failed - start there!
                </div>
              </div>
            `
          },
          {
            id: "workflow-stuck",
            title: "Workflow Gets Stuck",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Quick Check</div>
                <p><strong>Customer says:</strong> "My workflow is running forever" or "Step Function won't complete"</p>
                
                <div class="section-header">Common Causes</div>
                <div class="checklist">
                  <ul>
                    <li><strong>Wait state:</strong> Waiting for a specific time or condition</li>
                    <li><strong>Lambda timeout:</strong> Lambda function is hanging</li>
                    <li><strong>Choice state:</strong> No matching condition, no default path</li>
                    <li><strong>Parallel state:</strong> One branch is stuck</li>
                  </ul>
                </div>

                <div class="section-header">Quick Fixes</div>
                <div class="best-practices">
                  <ol>
                    <li><strong>Check execution history:</strong> See which state is currently running</li>
                    <li><strong>Add timeouts:</strong> Set TimeoutSeconds on states</li>
                    <li><strong>Check Lambda logs:</strong> If Lambda state is stuck</li>
                    <li><strong>Add default choice:</strong> Always have a default path in Choice states</li>
                  </ol>
                </div>

                <div class="playbook-reference">
                  <h4>📖 Internal Playbook Reference</h4>
                  <a href="https://w.amazon.com/bin/view/Forecasting/Marvel/Tech/StepFunction/" class="playbook-link" target="_blank">
                    Step Functions Troubleshooting Guide
                  </a>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: "monitoring-debugging",
        title: "How to Monitor & Debug",
        children: [
          {
            id: "cloudwatch-logs",
            title: "Check CloudWatch Logs",
            content: `
              <div class="best-practices">
                <div class="section-header">Essential Log Groups</div>
                <ul>
                  <li><strong>Lambda:</strong> /aws/lambda/[function-name]</li>
                  <li><strong>API Gateway:</strong> API-Gateway-Execution-Logs_[api-id]/[stage]</li>
                  <li><strong>Step Functions:</strong> /aws/vendedlogs/states/[state-machine-name]</li>
                </ul>

                <div class="section-header">What to Look For</div>
                <ul>
                  <li><strong>ERROR:</strong> Red error messages</li>
                  <li><strong>TIMEOUT:</strong> Function timeouts</li>
                  <li><strong>START/END/REPORT:</strong> Lambda execution info</li>
                  <li><strong>Duration:</strong> How long things take</li>
                </ul>

                <div class="note">
                  💡 Pro tip: Use CloudWatch Insights to search logs with queries like "fields @timestamp, @message | filter @message like /ERROR/"
                </div>
              </div>
            `
          },
          {
            id: "cloudwatch-metrics",
            title: "Check CloudWatch Metrics",
            content: `
              <div class="best-practices">
                <div class="section-header">Key Metrics to Monitor</div>
                <ul>
                  <li><strong>Lambda Duration:</strong> How long functions take</li>
                  <li><strong>Lambda Errors:</strong> Number of failed invocations</li>
                  <li><strong>API Gateway 4XXError:</strong> Client errors (auth, validation)</li>
                  <li><strong>API Gateway 5XXError:</strong> Server errors (Lambda failures)</li>
                  <li><strong>Step Functions ExecutionsFailed:</strong> Failed workflow executions</li>
                </ul>

                <div class="section-header">Setting Up Alarms</div>
                <ul>
                  <li>Create alarms for error rates > 1%</li>
                  <li>Monitor duration for performance issues</li>
                  <li>Set up SNS notifications for critical failures</li>
                </ul>
              </div>
            `
          },
          {
            id: "xray-tracing",
            title: "Use X-Ray for Tracing",
            content: `
              <div class="best-practices">
                <div class="section-header">When to Use X-Ray</div>
                <ul>
                  <li>Complex workflows with multiple services</li>
                  <li>Performance issues across services</li>
                  <li>Need to see the full request flow</li>
                </ul>

                <div class="section-header">How to Enable</div>
                <ul>
                  <li><strong>Lambda:</strong> Configuration → Monitoring → Enable X-Ray tracing</li>
                  <li><strong>API Gateway:</strong> Stages → [stage] → Logs/Tracing → Enable X-Ray</li>
                  <li><strong>Step Functions:</strong> Enable tracing in state machine definition</li>
                </ul>

                <div class="note">
                  💡 X-Ray shows you the complete request journey across all AWS services
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: "common-solutions",
        title: "Common Solutions & Best Practices",
        children: [
          {
            id: "performance-tips",
            title: "Performance Optimization",
            content: `
              <div class="best-practices">
                <div class="section-header">Lambda Performance</div>
                <ul>
                  <li><strong>Right-size memory:</strong> More memory = faster CPU</li>
                  <li><strong>Reuse connections:</strong> Initialize outside handler</li>
                  <li><strong>Use Provisioned Concurrency:</strong> For consistent performance</li>
                  <li><strong>Optimize package size:</strong> Smaller = faster cold starts</li>
                </ul>

                <div class="section-header">API Gateway Performance</div>
                <ul>
                  <li><strong>Enable caching:</strong> Cache responses for repeated requests</li>
                  <li><strong>Use CloudFront:</strong> CDN for global performance</li>
                  <li><strong>Optimize payload size:</strong> Smaller responses = faster</li>
                </ul>

                <div class="section-header">Step Functions Performance</div>
                <ul>
                  <li><strong>Use Express workflows:</strong> For high-volume, short-duration workflows</li>
                  <li><strong>Parallel processing:</strong> Run independent tasks in parallel</li>
                  <li><strong>Optimize state transitions:</strong> Minimize data passed between states</li>
                </ul>
              </div>
            `
          },
          {
            id: "security-checklist",
            title: "Security Best Practices",
            content: `
              <div class="best-practices">
                <div class="section-header">IAM & Permissions</div>
                <ul>
                  <li><strong>Least privilege:</strong> Only grant necessary permissions</li>
                  <li><strong>Use roles:</strong> Not IAM users for Lambda execution</li>
                  <li><strong>Resource-based policies:</strong> Control who can invoke functions</li>
                </ul>

                <div class="section-header">API Security</div>
                <ul>
                  <li><strong>Use HTTPS:</strong> Always encrypt in transit</li>
                  <li><strong>API Keys:</strong> For usage tracking and basic auth</li>
                  <li><strong>Authorizers:</strong> Lambda or Cognito for advanced auth</li>
                  <li><strong>Rate limiting:</strong> Prevent abuse with usage plans</li>
                </ul>

                <div class="section-header">Data Protection</div>
                <ul>
                  <li><strong>Environment variables:</strong> Encrypt sensitive data</li>
                  <li><strong>VPC:</strong> Use for database connections</li>
                  <li><strong>Secrets Manager:</strong> For database credentials</li>
                </ul>
              </div>
            `
          },
          {
            id: "cost-optimization",
            title: "Cost Optimization",
            content: `
              <div class="best-practices">
                <div class="section-header">Lambda Costs</div>
                <ul>
                  <li><strong>Right-size memory:</strong> Don't over-provision</li>
                  <li><strong>Optimize duration:</strong> Faster = cheaper</li>
                  <li><strong>Use ARM processors:</strong> Graviton2 is 20% cheaper</li>
                  <li><strong>Monitor unused functions:</strong> Delete what you don't need</li>
                </ul>

                <div class="section-header">API Gateway Costs</div>
                <ul>
                  <li><strong>Use HTTP APIs:</strong> Cheaper than REST APIs</li>
                  <li><strong>Enable caching:</strong> Reduce backend calls</li>
                  <li><strong>Monitor request volume:</strong> Understand your usage patterns</li>
                </ul>

                <div class="section-header">Step Functions Costs</div>
                <ul>
                  <li><strong>Express vs Standard:</strong> Express is cheaper for high-volume</li>
                  <li><strong>Minimize state transitions:</strong> Each transition costs money</li>
                  <li><strong>Use direct integrations:</strong> Skip Lambda when possible</li>
                </ul>
              </div>
            `
          }
        ]
      }
    ]
  }
];

export { svlsTroubleshootingData };