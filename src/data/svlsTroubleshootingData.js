const svlsTroubleshootingData = [
  {
    id: "root",
    title: "AWS Serverless Troubleshooting",
    children: [
      {
        id: "lambda",
        title: "AWS Lambda Troubleshooting",
        children: [
          {
            id: "lambda-errors",
            title: "Common Lambda Errors",
            children: [
              {
                id: "timeout-errors",
                title: "Timeout Errors",
                content: `
                  <div class="section-header">Lambda Function Timeout Issues</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> Function execution exceeds configured timeout limit</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws logs filter-log-events --log-group-name /aws/lambda/function-name --filter-pattern "Task timed out"</code><br>
                      <code>aws lambda get-function --function-name function-name</code><br>
                      <code>aws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name Duration --dimensions Name=FunctionName,Value=function-name</code>
                    </ul>

                    <div class="section-header">Resolution Steps</div>
                    <ol>
                      <li><strong>Increase timeout value:</strong>
                        <ul>
                          <li>Maximum timeout is 15 minutes (900 seconds)</li>
                          <li>Update via AWS Console, CLI, or Infrastructure as Code</li>
                        </ul>
                      </li>
                      <li><strong>Optimize function performance:</strong>
                        <ul>
                          <li>Review CloudWatch metrics for memory usage patterns</li>
                          <li>Increase memory allocation if CPU-bound</li>
                          <li>Optimize database connections and external API calls</li>
                        </ul>
                      </li>
                      <li><strong>Implement asynchronous processing:</strong>
                        <ul>
                          <li>Use SQS for long-running tasks</li>
                          <li>Break down large operations into smaller chunks</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                `
              },
              {
                id: "memory-errors",
                title: "Memory Errors",
                content: `
                  <div class="section-header">Lambda Memory Issues</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> Out of memory errors, function crashes, or poor performance</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws logs filter-log-events --log-group-name /aws/lambda/function-name --filter-pattern "Runtime.ExitError"</code><br>
                      <code>aws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name MemoryUtilization --dimensions Name=FunctionName,Value=function-name</code><br>
                      <code>aws lambda get-function --function-name function-name --query 'Configuration.MemorySize'</code>
                    </ul>

                    <div class="section-header">Resolution Steps</div>
                    <ol>
                      <li><strong>Monitor memory usage:</strong>
                        <ul>
                          <li>Check CloudWatch logs for "Max Memory Used" reports</li>
                          <li>Use AWS X-Ray for detailed memory profiling</li>
                        </ul>
                      </li>
                      <li><strong>Increase memory allocation:</strong>
                        <ul>
                          <li>Memory range: 128 MB to 10,240 MB (10 GB)</li>
                          <li>CPU power scales proportionally with memory</li>
                        </ul>
                      </li>
                      <li><strong>Optimize code for memory efficiency:</strong>
                        <ul>
                          <li>Avoid loading large files into memory</li>
                          <li>Use streaming for large data processing</li>
                          <li>Clean up unused variables and connections</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                `
              },
              {
                id: "permission-errors",
                title: "Permission Errors",
                content: `
                  <div class="section-header">Lambda Permission Issues</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> Access denied errors, unable to access AWS services or resources</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws lambda get-function --function-name function-name --query 'Configuration.Role'</code><br>
                      <code>aws iam get-role --role-name lambda-execution-role</code><br>
                      <code>aws iam list-attached-role-policies --role-name lambda-execution-role</code><br>
                      <code>aws logs filter-log-events --log-group-name /aws/lambda/function-name --filter-pattern "AccessDenied"</code>
                    </ul>

                    <div class="section-header">Resolution Steps</div>
                    <ol>
                      <li><strong>Verify execution role:</strong>
                        <ul>
                          <li>Ensure Lambda has a valid execution role attached</li>
                          <li>Check role trust policy allows lambda.amazonaws.com</li>
                        </ul>
                      </li>
                      <li><strong>Review IAM policies:</strong>
                        <ul>
                          <li>Attach AWSLambdaBasicExecutionRole for CloudWatch Logs</li>
                          <li>Add specific service permissions (S3, DynamoDB, etc.)</li>
                          <li>Use least privilege principle</li>
                        </ul>
                      </li>
                      <li><strong>Check resource-based policies:</strong>
                        <ul>
                          <li>Verify S3 bucket policies, KMS key policies</li>
                          <li>Ensure VPC security groups allow required traffic</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                `
              }
            ]
          },
          {
            id: "lambda-performance",
            title: "Performance Optimization",
            children: [
              {
                id: "cold-starts",
                title: "Cold Start Issues",
                content: `
                  <div class="section-header">Lambda Cold Start Optimization</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> High latency on first invocation, inconsistent response times</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name InitDuration --dimensions Name=FunctionName,Value=function-name</code><br>
                      <code>aws logs filter-log-events --log-group-name /aws/lambda/function-name --filter-pattern "INIT_START"</code><br>
                      <code>aws lambda get-provisioned-concurrency-config --function-name function-name</code>
                    </ul>

                    <div class="section-header">Resolution Strategies</div>
                    <ol>
                      <li><strong>Provisioned Concurrency:</strong>
                        <ul>
                          <li>Pre-warm function instances for consistent performance</li>
                          <li>Configure based on expected traffic patterns</li>
                          <li>Monitor utilization to optimize costs</li>
                        </ul>
                      </li>
                      <li><strong>Runtime Optimization:</strong>
                        <ul>
                          <li>Choose faster runtimes (Python 3.9+, Node.js 18+)</li>
                          <li>Minimize package size and dependencies</li>
                          <li>Use Lambda Layers for shared libraries</li>
                        </ul>
                      </li>
                      <li><strong>Code Optimization:</strong>
                        <ul>
                          <li>Initialize connections outside handler function</li>
                          <li>Reuse database connections and HTTP clients</li>
                          <li>Lazy load heavy dependencies</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                `
              }
            ]
          },
          {
            id: "lambda-monitoring",
            title: "Monitoring and Debugging",
            content: `
              <div class="section-header">Lambda Monitoring Best Practices</div>
              <div class="troubleshooting">
                <div class="section-header">CloudWatch Metrics</div>
                <ul>
                  <li><strong>Duration:</strong> Function execution time</li>
                  <li><strong>Errors:</strong> Number of failed invocations</li>
                  <li><strong>Throttles:</strong> Number of throttled invocations</li>
                  <li><strong>ConcurrentExecutions:</strong> Number of concurrent executions</li>
                  <li><strong>DeadLetterErrors:</strong> Failed async invocations sent to DLQ</li>
                </ul>

                <div class="section-header">X-Ray Tracing</div>
                <ul>
                  <code>aws lambda put-function-configuration --function-name function-name --tracing-config Mode=Active</code><br>
                  <code>aws xray get-trace-summaries --time-range-type TimeRangeByStartTime --start-time 2023-01-01T00:00:00 --end-time 2023-01-02T00:00:00</code>
                </ul>

                <div class="section-header">Log Analysis</div>
                <ul>
                  <code>aws logs describe-log-groups --log-group-name-prefix /aws/lambda/</code><br>
                  <code>aws logs filter-log-events --log-group-name /aws/lambda/function-name --start-time 1640995200000</code><br>
                  <code>aws logs insights start-query --log-group-name /aws/lambda/function-name --start-time 1640995200 --end-time 1641081600 --query-string 'fields @timestamp, @message | filter @message like /ERROR/'</code>
                </ul>
              </div>
            `
          }
        ]
      },
      {
        id: "api-gateway",
        title: "API Gateway Troubleshooting",
        children: [
          {
            id: "api-gateway-errors",
            title: "Common API Gateway Errors",
            children: [
              {
                id: "cors-issues",
                title: "CORS Issues",
                content: `
                  <div class="section-header">Cross-Origin Resource Sharing (CORS) Problems</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> Browser blocks requests, preflight OPTIONS requests fail</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>curl -H "Origin: https://example.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: X-Requested-With" -X OPTIONS https://api.example.com/resource</code><br>
                      <code>aws apigateway get-method --rest-api-id api-id --resource-id resource-id --http-method OPTIONS</code><br>
                      <code>aws logs filter-log-events --log-group-name API-Gateway-Execution-Logs_api-id/stage --filter-pattern "CORS"</code>
                    </ul>

                    <div class="section-header">REST API vs HTTP API CORS Configuration</div>
                    <div class="section-header">REST API CORS Setup</div>
                    <ol>
                      <li><strong>Enable CORS in API Gateway Console:</strong>
                        <ul>
                          <li>Select resource → Actions → Enable CORS</li>
                          <li>Configure allowed origins, headers, and methods</li>
                          <li>Deploy API after enabling CORS</li>
                        </ul>
                      </li>
                      <li><strong>Manual OPTIONS method configuration:</strong>
                        <ul>
                          <li>Create OPTIONS method for each resource</li>
                          <li>Set integration type to Mock</li>
                          <li>Configure method response headers</li>
                        </ul>
                      </li>
                    </ol>

                    <div class="section-header">HTTP API CORS Setup</div>
                    <ul>
                      <code>aws apigatewayv2 update-api --api-id api-id --cors-configuration AllowOrigins="*",AllowMethods="GET,POST,PUT,DELETE",AllowHeaders="Content-Type,Authorization"</code>
                    </ul>
                  </div>
                `
              },
              {
                id: "authentication-errors",
                title: "Authentication Errors",
                content: `
                  <div class="section-header">API Gateway Authentication Issues</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> 401 Unauthorized, 403 Forbidden responses</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws apigateway get-authorizers --rest-api-id api-id</code><br>
                      <code>aws apigateway test-invoke-authorizer --rest-api-id api-id --authorizer-id authorizer-id --headers Authorization=Bearer-token</code><br>
                      <code>aws logs filter-log-events --log-group-name API-Gateway-Execution-Logs_api-id/stage --filter-pattern "Unauthorized"</code>
                    </ul>

                    <div class="section-header">Authentication Types</div>
                    <ol>
                      <li><strong>AWS IAM Authentication:</strong>
                        <ul>
                          <li>Verify IAM user/role has execute-api permissions</li>
                          <li>Check resource-based policies on API Gateway</li>
                          <li>Validate AWS Signature Version 4 signing</li>
                        </ul>
                      </li>
                      <li><strong>Cognito User Pool Authorizer:</strong>
                        <ul>
                          <li>Verify JWT token is valid and not expired</li>
                          <li>Check token audience (aud) matches client ID</li>
                          <li>Validate token issuer matches User Pool</li>
                        </ul>
                      </li>
                      <li><strong>Lambda Authorizer:</strong>
                        <ul>
                          <li>Check authorizer function logs for errors</li>
                          <li>Verify authorizer returns proper policy format</li>
                          <li>Test authorizer function independently</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                `
              },
              {
                id: "throttling-errors",
                title: "Throttling Errors",
                content: `
                  <div class="section-header">API Gateway Throttling Issues</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> 429 Too Many Requests, intermittent failures under load</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws apigateway get-usage-plan --usage-plan-id usage-plan-id</code><br>
                      <code>aws cloudwatch get-metric-statistics --namespace AWS/ApiGateway --metric-name ThrottledCount --dimensions Name=ApiName,Value=api-name</code><br>
                      <code>aws apigateway get-account</code>
                    </ul>

                    <div class="section-header">Throttling Levels</div>
                    <ol>
                      <li><strong>Account-level throttling:</strong>
                        <ul>
                          <li>Default: 10,000 requests per second</li>
                          <li>Request limit increase through AWS Support</li>
                        </ul>
                      </li>
                      <li><strong>Usage Plan throttling:</strong>
                        <ul>
                          <li>Configure per-client rate and burst limits</li>
                          <li>Associate API keys with usage plans</li>
                        </ul>
                      </li>
                      <li><strong>Method-level throttling:</strong>
                        <ul>
                          <li>Set specific limits for individual methods</li>
                          <li>Override usage plan settings</li>
                        </ul>
                      </li>
                    </ol>

                    <div class="section-header">Resolution Strategies</div>
                    <ul>
                      <li>Implement exponential backoff in client applications</li>
                      <li>Use CloudFront for caching static responses</li>
                      <li>Consider API Gateway caching for dynamic content</li>
                      <li>Distribute load across multiple APIs or regions</li>
                    </ul>
                  </div>
                `
              }
            ]
          },
          {
            id: "api-gateway-integration",
            title: "Integration Issues",
            children: [
              {
                id: "lambda-integration",
                title: "Lambda Integration Problems",
                content: `
                  <div class="section-header">API Gateway Lambda Integration Issues</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> 502 Bad Gateway, 504 Gateway Timeout, malformed responses</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws apigateway get-integration --rest-api-id api-id --resource-id resource-id --http-method GET</code><br>
                      <code>aws lambda get-policy --function-name function-name</code><br>
                      <code>aws logs filter-log-events --log-group-name API-Gateway-Execution-Logs_api-id/stage --filter-pattern "Lambda"</code>
                    </ul>

                    <div class="section-header">Common Integration Issues</div>
                    <ol>
                      <li><strong>Lambda Proxy Integration:</strong>
                        <ul>
                          <li>Function must return proper response format with statusCode, headers, body</li>
                          <li>Body must be string (JSON.stringify for objects)</li>
                          <li>Headers must be string key-value pairs</li>
                        </ul>
                      </li>
                      <li><strong>Lambda Permission Issues:</strong>
                        <ul>
                          <li>API Gateway needs lambda:InvokeFunction permission</li>
                          <li>Check resource-based policy on Lambda function</li>
                        </ul>
                      </li>
                      <li><strong>Timeout Configuration:</strong>
                        <ul>
                          <li>API Gateway timeout: 29 seconds maximum</li>
                          <li>Lambda timeout must be less than API Gateway timeout</li>
                        </ul>
                      </li>
                    </ol>

                    <div class="section-header">Response Format Example</div>
                    <ul>
                      <code>{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  "body": "{\\"message\\": \\"Hello World\\"}"
}</code>
                    </ul>
                  </div>
                `
              }
            ]
          }
        ]
      },
      {
        id: "step-functions",
        title: "Step Functions Troubleshooting",
        children: [
          {
            id: "step-functions-errors",
            title: "Common Step Functions Errors",
            children: [
              {
                id: "state-machine-failures",
                title: "State Machine Execution Failures",
                content: `
                  <div class="section-header">Step Functions Execution Failures</div>
                  <div class="troubleshooting">
                    <p><strong>Symptoms:</strong> State machine executions fail, states timeout, or produce unexpected results</p>
                    
                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws stepfunctions list-executions --state-machine-arn arn:aws:states:region:account:stateMachine:name --status-filter FAILED</code><br>
                      <code>aws stepfunctions describe-execution --execution-arn execution-arn</code><br>
                      <code>aws stepfunctions get-execution-history --execution-arn execution-arn</code><br>
                      <code>aws logs filter-log-events --log-group-name /aws/vendedlogs/states/state-machine-name --filter-pattern "ERROR"</code>
                    </ul>

                    <div class="section-header">Common Failure Scenarios</div>
                    <ol>
                      <li><strong>Task State Failures:</strong>
                        <ul>
                          <li>Lambda function errors or timeouts</li>
                          <li>Service integration failures (DynamoDB, SNS, etc.)</li>
                          <li>Invalid input/output processing</li>
                          <li>Timeout issues in task execution</li>
                        </ul>
                      </li>
                      <li><strong>Choice State Issues:</strong>
                        <ul>
                          <li>Incorrect comparison operators</li>
                          <li>Missing default choice</li>
                          <li>Type mismatches in conditions</li>
                        </ul>
                      </li>
                      <li><strong>Parallel State Problems:</strong>
                        <ul>
                          <li>One or more branches failing</li>
                          <li>Result combination issues</li>
                          <li>Timeout in parallel execution</li>
                          <li>Integration problems with external services</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                `
              }
            ]
          },
          {
            id: "step-functions-debugging",
            title: "Debugging and Monitoring",
            children: [
              {
                id: "execution-history",
                title: "Execution History Analysis",
                content: `
                  <div class="section-header">Analyzing Step Functions Execution History</div>
                  <div class="troubleshooting">
                    <div class="section-header">Event Types</div>
                    <ul>
                      <li><strong>ExecutionStarted:</strong> Initial event with input data</li>
                      <li><strong>StateEntered/StateExited:</strong> State transitions</li>
                      <li><strong>TaskScheduled/TaskSucceeded/TaskFailed:</strong> Task execution events</li>
                      <li><strong>ExecutionSucceeded/ExecutionFailed:</strong> Final execution status</li>
                    </ul>

                    <div class="section-header">Diagnostic Commands</div>
                    <ul>
                      <code>aws stepfunctions get-execution-history --execution-arn execution-arn --max-results 100</code><br>
                      <code>aws stepfunctions get-execution-history --execution-arn execution-arn --reverse-order</code><br>
                      <code>aws stepfunctions describe-state-machine --state-machine-arn state-machine-arn</code>
                    </ul>

                    <div class="section-header">Analysis Tips</div>
                    <ul>
                      <li>Check input/output at each state transition</li>
                      <li>Verify ResultPath and OutputPath configurations</li>
                      <li>Look for error messages in TaskFailed events</li>
                      <li>Compare successful vs failed execution patterns</li>
                      <li>Use debugging techniques to trace state machine execution</li>
                      <li>Enable monitoring and logging for better visibility</li>
                    </ul>
                  </div>
                `
              },
              {
                id: "state-definition-validation",
                title: "State Definition Validation",
                content: `
                  <div class="section-header">JSON State Definition Validation</div>
                  <div class="troubleshooting">
                    <div class="section-header">Common Definition Errors</div>
                    <ol>
                      <li><strong>Syntax Errors:</strong>
                        <ul>
                          <li>Invalid JSON format</li>
                          <li>Missing required fields (Type, StartAt)</li>
                          <li>Incorrect state type names</li>
                        </ul>
                      </li>
                      <li><strong>State Reference Errors:</strong>
                        <ul>
                          <li>Next field references non-existent state</li>
                          <li>StartAt references invalid state</li>
                          <li>Unreachable states in definition</li>
                        </ul>
                      </li>
                    </ol>

                    <div class="section-header">Validation Commands</div>
                    <ul>
                      <code>aws stepfunctions validate-state-machine-definition --definition file://state-machine.json</code><br>
                      <code>aws stepfunctions create-state-machine --name test-validation --definition file://state-machine.json --role-arn role-arn --dry-run</code>
                    </ul>
                  </div>
                `
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = { svlsTroubleshootingData };