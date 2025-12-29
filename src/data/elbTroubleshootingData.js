export const elbTroubleshootingData = [
  {
    id: "root",
    title: "What is the customer experiencing with their Elastic Load Balancer?",
    children: [
      {
        id: "approach",
        title: "🎯 General Troubleshooting Guidance",
        content: `
          <div class="section-header">Initial Approach</div>
          <div class="checklist">
            <ol>
              <li><strong>Understand the customer's ask</strong>
                <ul>
                  <li>Get your understanding confirmed if you are in the meeting room with customer.</li>
                  <li>Do not assume, Get all the resources or facts checked.</li>
                </ul>
              </li>
              <li><strong>Validate issue</strong>
                <ul>
                  <li>Verify if the issue is about ELB services or some other related service in the network flow/workflow causing the issue e.g. EC2 or Lambda.</li>
                </ul>
              </li>
              <li><strong>Gather resource information</strong>
                <ul>
                  <li>Use internal tools (Atlas, Impersonation metric tool) to locate resources in question.</li>
                  <li>Verify if you can observe the same issue (ALB 5xx data points, CW alarm state change, ASG EC2 termination events).</li>
                </ul>
              </li>
              <li><strong>Follow troubleshooting steps for the specific service error.</strong></li>
              <li><strong>Provide alternative solutions if the expected behavior is working.</strong></li>
              <li><strong>Document/Note-down properly</strong>
                <ul>
                  <li>Annotate internal notes with resource links.</li>
                  <li>Update SOC.</li>
                </ul>
              </li>
            </ol>
          </div>

          <div class="section-header">Basic TCP/HTTP(S) Flow</div>
          <div class="checklist">
            <table>
              <tr><th>Protocol</th><th>Steps Performed</th></tr>
              <tr><td>TCP</td><td>TCP 3-way handshake</td></tr>
              <tr><td>SSL</td><td>TCP 3-way handshake + SSL negotiation</td></tr>
              <tr><td>HTTP</td><td>TCP 3-way handshake + HTTP request</td></tr>
              <tr><td>HTTPS</td><td>TCP 3-way handshake + SSL negotiation + HTTP request [Encrypted]</td></tr>
            </table>
          </div>

          <div class="section-header">Target Group Health Check Parameters:</div>
          <div class="checklist">
            <ul>
              <li><strong>Protocol:</strong> TCP or TLS or HTTP or HTTPS</li>
              <li><strong>Port:</strong> Traffic port or Override port</li>
              <li><strong>Path:</strong> URL path for health check (e.g., /health)</li>
              <li><strong>Timeout:</strong> 2-120 seconds (how long to wait for response)</li>
              <li><strong>Interval:</strong> 5-300 seconds (time between checks)</li>
              <li><strong>Success Codes:</strong> Range of HTTP codes (200-399 default)</li>
              <li><strong>Unhealthy Threshold:</strong> 2-10 failures to mark unhealthy</li>
              <li><strong>Healthy Threshold:</strong> 2-10 successes to mark healthy</li>
            </ul>
          </div>

          <div class="playbook-reference">
            <h4>📖 Internal Playbook References</h4>
            <a href="https://w.amazon.com/bin/view/DSE/Request_Reply/Software_Load_Balancer/Developer_Docs/DataPlane/Runbooks/Waypoint/" class="playbook-link" target="_blank">
              ELB Waypoint Documentation
            </a>
          </div>
        `
      },
      {
        id: "clb-alb",
        title: "🌐 CLB/ALB Connection Issues",
        children: [
          {
            id: "dns-resolution",
            title: "🔍 DNS Resolution Problems",
            content: `
              <div class="troubleshooting">
                <p>Run below dig/nslookup command to check if the customer's custom domain is resolving to ELB's IP addresses as displayed in Atlas WayPoint section.</p>
                <ul>
                  <li><code>For linux: $ dig +short custom_domain_name</code></li>
                  <li><code>For linux & Windows: $ nslookup custom_domain_name</code></li>
                </ul>
              </div>

              <div class="note">
                <strong>Note:</strong><br>
                • Only active nodes IP address are published in the ELB DNS.<br>
                • For CLB/ALB with more AZ's enabled, only a maximum of 8 IP addresses are published in DNS.<br>
                • With each DNS query, Route53 resolver will rotate among the node IPs to provide an even distribution as possible.
              </div>

              <div class="playbook-reference">
                <h4>📖 Internal Playbook References</h4>
                <a href="https://w.amazon.com/bin/view/DSE/Request_Reply/Software_Load_Balancer/Developer_Docs/DataPlane/Runbooks/Waypoint/#How_does_DNS_Resolution_Work_for_ALB.3F" class="playbook-link" target="_blank">
                  How DNS Resolution Works for ALB
                </a>
              </div>
            `
          },
          {
            id: "connection-timeout",
            title: "⏱️ Connection Timeout Issues",
            content: `
              <div class="troubleshooting">
                <p>Verify customer's unable to connect to load balancer by running below test:</p>
                <ul>
                  <li><code>For linux & windows: $ telnet custom_domain_name port</code></li>
                  <li><code>For Windows: $ curl -iv http(s)://custom_domain_name</code></li>
                </ul>

                <div class="section-header">Troubleshooting Steps</div>
                <ol>
                  <li>Confirm customer has appropriate connectivity path configured to reach load balancer</li>
                  <li>Verify route tables for all ELB subnets in Atlas to ensure proper IGW configuration</li>
                  <li>Ensure there is no port access restrictions in subnet NACLs</li>
                  <li>Check Security group restrictions blocking load balancer access</li>
                  <li>If enabled VPC flow logs with metadata can help diagnose ELB connectivity issues</li>
                  <li>Use tools like traceroute, mtr, hping to identify client-side issues</li>
                </ol>

                <div class="section-header">Packet Capture</div>
                <code>sudo tcpdump -i any port listener_port_number -w traces.pcap</code>
              </div>

              <div class="note">
                Remember Internal load balancers are not accessible from the public internet by design.
              </div>
            `
          },
          {
            id: "connection-refused",
            title: "🚫 Connection Refused",
            content: `
              <div class="troubleshooting">
                <p>Verify customer's refused connection while requesting loadbalancer:</p>
                <ul>
                  <li><code>For linux & windows: $ telnet custom_domain_name</code></li>
                  <li><code>For linux: $ curl -iv http(s)://custom_domain_name</code></li>
                </ul>

                <div class="section-header">Common Causes & Solutions</div>
                <ol>
                  <li><strong>No Listener Configured:</strong> Ensure ELB has a listener configured for the port being accessed</li>
                  <li><strong>VPC Flow Logs:</strong> Analyse enabled VPC flow logs with metadata on ELB nodes' interfaces</li>
                  <li><strong>Client-side Firewall:</strong> Verify local firewall rules aren't blocking access</li>
                  <li><strong>Packet Captures:</strong> Take packet captures on client machine to see RST packets</li>
                </ol>
              </div>
            `
          },
          {
            id: "ssl-tls-issues",
            title: "🔒 SSL/TLS Issues",
            content: `
              <div class="troubleshooting">
                <p>Verify SSL/TLS issue on customer's end:</p>
                <ul>
                  <li><code>For linux: $ curl -iv https://custom_domain_name</code></li>
                  <li><code>For Windows Powershell: $ Test-NetConnection -ComputerName custom_domain_name -Port port_number</code></li>
                </ul>

                <p>Check CloudWatch metrics:</p>
                <ul>
                  <li><strong>CLB:</strong> "InboundSSLNegotiationFailures" metric</li>
                  <li><strong>ALB:</strong> "ClientTLSNegotiationErrorCount" metric</li>
                </ul>
              </div>

              <div class="section-header">Certificate Related Issues</div>
              <div class="error-types">
                <p>Access customer's domain on any web browser to learn more on certificate-related issues:</p>
                <ul>
                  <li>Domain name mismatches</li>
                  <li>Expired certificates</li>
                  <li>Validation failures with self-signed certificates</li>
                </ul>
              </div>

              <div class="section-header">Protocol and Cipher Mismatch</div>
              <div class="troubleshooting">
                <p>SSL negotiation fails when the client and ELB have no matching SSL protocol version or cipher suite.</p>
                
                <div class="section-header">Troubleshooting Commands</div>
                <ul>
                  <li><code>OpenSSL command for TLSv1.2: openssl s_client -connect domain_name:port_number -showcerts -tls1_2</code></li>
                  <li><code>Packet Capture: sudo tcpdump -i any port listener_port_number -w traces.pcap</code></li>
                </ul>
              </div>

              <div class="note">
                ALB's SNI support allows multiple certificates per listener, with selection determined by a smart certificate selection algorithm.
              </div>

              <div class="playbook-reference">
                <h4>📖 Internal Playbook References</h4>
                <a href="https://docs.aws.amazon.com/cli/latest/reference/elbv2/describe-ssl-policies.html" class="playbook-link" target="_blank">
                  ALB SSL Policies CLI Reference
                </a>
              </div>
            `
          }
        ]
      }
    ]
  }
];

const additionalELBData = [
  {
    id: "clb",
    title: "⚖️ Classic Load Balancer (CLB)",
    children: [
      {
        id: "clb-health-check",
        title: "❤️ CLB Health Check Issues",
        content: `
          <div class="section-header">CLB Health Check Checklist</div>
          <div class="troubleshooting">
            <ol>
              <li>Examine per-AZ metrics (HealthyHostCount and UnhealthyHostCount) during the problem timeframe</li>
              <li>If unhealthy hosts are detected, verify if all AZs report consistent metrics</li>
              <li>Review AZ logs to determine health check failure reasons</li>
            </ol>

            <p>Health Check issues majorly fall in 3 categories:</p>
            <ul>
              <li>TCP 3-way handshake failure</li>
              <li>SSL Negotiation failure</li>
              <li>HTTP request failure</li>
            </ul>
          </div>

          <div class="section-header">TCP 3-way Handshake Failure</div>
          <div class="error-types">
            <p><strong>Connection Timeout:</strong></p>
            <ul>
              <li>CLB couldn't establish a TCP connection to the backend within the health check timeout period</li>
              <li>Verify security configurations: ELB security groups, NACL rules, backend server security groups</li>
              <li>Use packet captures or VPC flow logs to identify where traffic flow breaks</li>
            </ul>

            <p><strong>Connection Refused:</strong></p>
            <ul>
              <li>CLB received a TCP RST from the backend when attempting to establish a connection</li>
              <li>Check ELB's BackendConnectionErrors metric</li>
              <li>Test direct access: <code>curl -ivk http(s)://backend-ip:healthcheck-port/healthcheck-path</code></li>
              <li>Verify application listening: <code>netstat -tnlp | grep &lt;port number&gt;</code></li>
              <li>Check firewall configurations: <code>iptables -L</code></li>
            </ul>
          </div>

          <div class="section-header">HTTP Request Failure</div>
          <div class="troubleshooting">
            <p>Classic Load Balancer health checks send HTTP requests with the target's private IP in the Host header and "ELB-HealthChecker/1.0" as the User-Agent.</p>
            
            <p>HTTP health checks can fail for three main reasons:</p>
            <ul>
              <li><strong>Non-200 responses:</strong> Backend returns status codes other than HTTP 200 OK</li>
              <li><strong>Timeout issues:</strong> Backend response time exceeds the health check timeout</li>
              <li><strong>Connection termination:</strong> Backend closes connections with RST for pending health check requests</li>
            </ul>

            <p>Troubleshooting command:</p>
            <code>curl -ivk http://backend-ip:healthcheck-port/healthcheck-path</code>
          </div>

          <div class="playbook-reference">
            <h4>📖 Internal Playbook References</h4>
            <a href="https://w.amazon.com/index.php/DSE/Request%20Reply/Software%20Load%20Balancer/Developer%20Docs/DataPlane/Playbooks/MarcoZero#Diagnosing_Health_Check_Issues" class="playbook-link" target="_blank">
              Diagnosing Health Check Issues
            </a>
          </div>
        `
      },
      {
        id: "clb-5xx",
        title: "❌ CLB 5xx Errors",
        content: `
          <div class="section-header">CLB 5xx Checklist</div>
          <div class="troubleshooting">
            <ol>
              <li>Compare "HTTPCode_ELB_5XX" and "HTTPCode_Backend_5XX" metrics to identify error source</li>
              <li>Check CLB access logs - if "backend_status_code" shows 5XX error, backend is generating the error</li>
              <li>When backend generates an error, "elb_status_code" will match "backend_status_code" value</li>
            </ol>
          </div>

          <div class="section-header">CLB 5xx Troubleshooting</div>
          <div class="error-types">
            <p><strong>CLB HTTP 502:</strong></p>
            <ul>
              <li>CLB generates 502 errors only when receiving malformed HTTP responses from backends</li>
              <li>Ensure backend server does not send non-RFC compliant responses</li>
            </ul>

            <p><strong>CLB HTTP 503:</strong></p>
            <ul>
              <li><strong>No healthy backend instances:</strong> When HealthyHostCount is zero</li>
              <li><strong>No registered instances:</strong> Check both Healthy and Unhealthy host count metrics</li>
              <li><strong>Insufficient capacity:</strong> Check for RequestCount spikes and 100% CPU utilization</li>
              <li><strong>Surge queue full:</strong> Determine if affecting all or specific AZ nodes</li>
            </ul>

            <p><strong>CLB HTTP 504:</strong></p>
            <ul>
              <li><strong>ELB Idle Timeout:</strong> Backend doesn't respond within configured timeout period</li>
              <li><strong>Backend Connection Termination:</strong> Backend closes connection with FIN or RST</li>
              <li><strong>ELB Race Condition:</strong> Immediate 504 errors with low latency</li>
              <li><strong>TCP Defer Accept:</strong> Half-open connections causing RST packets</li>
            </ul>

            <p>Packet capture command:</p>
            <code>sudo tcpdump -i any dst port PORT_NUMBER</code>
          </div>

          <div class="playbook-reference">
            <h4>📖 Internal Playbook References</h4>
            <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/ELBPlayBook/AccessLogAnalysis-CLB/" class="playbook-link" target="_blank">
              CLB Access Log Analysis
            </a>
          </div>
        `
      }
    ]
  },
  {
    id: "alb",
    title: "🌐 Application Load Balancer (ALB)",
    children: [
      {
        id: "alb-health-check",
        title: "❤️ ALB Health Check Issues",
        content: `
          <div class="section-header">ALB Health Check Checklist</div>
          <div class="troubleshooting">
            <ol>
              <li>Confirm the problem by examining per Target Group (TG) and per Way Point (WP) health check metrics</li>
              <li>Check WP logs for health check failure reasons or use the 'DTH' tool from the atlas page</li>
              <li>Test publicly accessible targets directly with curl command</li>
              <li>Based on the reason code, resolve the issue</li>
            </ol>

            <div class="note">
              <strong>Note:</strong><br>
              1. Each WP independently checks targets in enabled AZs and routes requests only to healthy targets<br>
              2. ALB operates in fail-open mode if all targets in a TG are unhealthy<br>
              3. A target appears healthy in the console if at least one WP marks it as healthy
            </div>

            <p>Test command:</p>
            <code>curl -ivk HC_protocol://Target_IP:HC_port/HC_path</code>
          </div>

          <div class="section-header">Target.ResponseCodeMismatch</div>
          <div class="error-types">
            <p><strong>Symptoms:</strong></p>
            <ul>
              <li>Registered target didn't return the expected HTTP code to HC requests</li>
              <li>WP logs show: <code>RESPONSE_CODE_MISMATCH: non_200_HTTP_error</code></li>
            </ul>

            <p><strong>Fixing the issue:</strong></p>
            <ul>
              <li>Verify expected success codes (Default is 200, Valid range is 200-499)</li>
              <li>Confirm ping path validity (Default path is "/")</li>
              <li>Update settings if needed via AWS console</li>
            </ul>
          </div>

          <div class="section-header">Target.FailedHealthChecks</div>
          <div class="error-types">
            <p><strong>Symptoms:</strong></p>
            <ul>
              <li>Target resets ALB connection</li>
              <li>WP logs show: <code>TARGET_ERROR: 502</code></li>
            </ul>

            <p><strong>Fixing the issue:</strong></p>
            <ul>
              <li><strong>Bypass ALB test:</strong> <code>curl -ivk HC_protocol://Target_IP:HC_port/HC_path</code></li>
              <li><strong>Verify application status:</strong> Use service command (Linux) or Task Manager (Windows)</li>
              <li><strong>Confirm port listening:</strong> <code>netstat -tunlp | grep &lt;HC_port&gt;</code></li>
              <li><strong>Check OS-level firewalls:</strong> <code>iptables -L</code></li>
              <li><strong>Review VPC flow logs:</strong> Check for TCP RST in logs</li>
            </ul>
          </div>
        `
      },
      {
        id: "alb-5xx",
        title: "❌ ALB 5xx Errors",
        content: `
          <div class="section-header">ALB 5xx Error Analysis</div>
          <div class="troubleshooting">
            <ol>
              <li>Compare "HTTPCode_ELB_5XX" and "HTTPCode_Target_5XX" metrics to identify error source</li>
              <li>Check ALB access logs - if "target_status_code" shows 5XX error, target is generating the error</li>
              <li>When target generates an error, "elb_status_code" will match "target_status_code" value</li>
              <li>Use per-target group metrics to isolate problematic targets</li>
            </ol>
          </div>

          <div class="section-header">ALB HTTP 502 Bad Gateway</div>
          <div class="error-types">
            <p><strong>Target Connection Issues:</strong></p>
            <ul>
              <li>Target closes connection before ALB can send the request</li>
              <li>Target sends malformed HTTP response</li>
              <li>Target doesn't respond within idle timeout</li>
            </ul>

            <p><strong>Troubleshooting Steps:</strong></p>
            <ul>
              <li>Check target health status and health check logs</li>
              <li>Verify target application is running and listening on correct port</li>
              <li>Review target security group rules</li>
              <li>Check for target resource constraints (CPU, memory)</li>
              <li>Analyze VPC flow logs for connection patterns</li>
            </ul>
          </div>

          <div class="section-header">ALB HTTP 503 Service Unavailable</div>
          <div class="error-types">
            <p><strong>No Healthy Targets:</strong></p>
            <ul>
              <li>All targets in target group are unhealthy</li>
              <li>No targets registered in target group</li>
              <li>Target group has no enabled availability zones</li>
            </ul>

            <p><strong>Capacity Issues:</strong></p>
            <ul>
              <li>ALB surge queue is full (check RequestCountPerTarget)</li>
              <li>Target group capacity exceeded</li>
              <li>Auto Scaling group not scaling fast enough</li>
            </ul>
          </div>

          <div class="section-header">ALB HTTP 504 Gateway Timeout</div>
          <div class="error-types">
            <p><strong>Timeout Scenarios:</strong></p>
            <ul>
              <li>Target doesn't respond within idle timeout (default 60 seconds)</li>
              <li>Target processing time exceeds timeout</li>
              <li>Network connectivity issues between ALB and target</li>
            </ul>

            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Increase ALB idle timeout if needed</li>
              <li>Optimize target application response time</li>
              <li>Check target resource utilization</li>
              <li>Verify network path between ALB and targets</li>
            </ul>
          </div>

          <div class="playbook-reference">
            <h4>📖 Internal Playbook References</h4>
            <a href="https://w.amazon.com/bin/view/AmazonWebServices/SalesSupport/DeveloperSupport/Internal/ELBPlayBook/AccessLogAnalysis-ALB/" class="playbook-link" target="_blank">
              ALB Access Log Analysis
            </a>
          </div>
        `
      }
    ]
  },
  {
    id: "nlb",
    title: "🔗 Network Load Balancer (NLB)",
    children: [
      {
        id: "nlb-health-check",
        title: "❤️ NLB Health Check Issues",
        content: `
          <div class="section-header">NLB Health Check Overview</div>
          <div class="troubleshooting">
            <p>NLB supports TCP, HTTP, and HTTPS health checks with different behaviors:</p>
            <ul>
              <li><strong>TCP Health Checks:</strong> Establishes TCP connection and immediately closes it</li>
              <li><strong>HTTP/HTTPS Health Checks:</strong> Sends HTTP request and expects 200-399 response</li>
            </ul>

            <div class="note">
              <strong>Key Differences from ALB:</strong><br>
              • NLB preserves client IP address<br>
              • NLB operates at Layer 4 (TCP/UDP)<br>
              • NLB has different timeout behaviors<br>
              • NLB supports static IP addresses
            </div>
          </div>

          <div class="section-header">TCP Health Check Troubleshooting</div>
          <div class="error-types">
            <p><strong>Connection Timeout:</strong></p>
            <ul>
              <li>Target doesn't accept connections within timeout period</li>
              <li>Security group rules blocking NLB health checker</li>
              <li>Network ACL restrictions</li>
              <li>Target application not listening on health check port</li>
            </ul>

            <p><strong>Connection Refused:</strong></p>
            <ul>
              <li>Target actively refuses connection (TCP RST)</li>
              <li>Port not open on target</li>
              <li>Application firewall blocking connections</li>
            </ul>

            <p><strong>Troubleshooting Commands:</strong></p>
            <code>
              # Test TCP connectivity<br>
              telnet target-ip health-check-port<br><br>
              # Check listening ports<br>
              netstat -tunlp | grep health-check-port<br><br>
              # Test from NLB subnet<br>
              nc -zv target-ip health-check-port
            </code>
          </div>

          <div class="playbook-reference">
            <h4>📖 Internal Playbook References</h4>
            <a href="https://w.amazon.com/bin/view/DSE/Request_Reply/Software_Load_Balancer/Developer_Docs/DataPlane/Runbooks/Waypoint/#NLB_Health_Checks" class="playbook-link" target="_blank">
              NLB Health Check Documentation
            </a>
          </div>
        `
      },
      {
        id: "nlb-connectivity",
        title: "🔌 NLB Connectivity Issues",
        content: `
          <div class="section-header">NLB Connection Troubleshooting</div>
          <div class="troubleshooting">
            <p>NLB operates at Layer 4, so troubleshooting focuses on TCP/UDP connectivity:</p>
            
            <ol>
              <li><strong>Verify NLB DNS Resolution:</strong>
                <ul>
                  <li><code>dig +short nlb-dns-name</code></li>
                  <li>Should return static IP addresses for each AZ</li>
                </ul>
              </li>
              <li><strong>Test Direct IP Connectivity:</strong>
                <ul>
                  <li><code>telnet nlb-ip port</code></li>
                  <li><code>nc -zv nlb-ip port</code></li>
                </ul>
              </li>
              <li><strong>Check Client Security Groups:</strong>
                <ul>
                  <li>Ensure outbound rules allow traffic to NLB</li>
                  <li>For internal NLB, verify VPC connectivity</li>
                </ul>
              </li>
            </ol>
          </div>

          <div class="section-header">Cross-Zone Load Balancing</div>
          <div class="troubleshooting">
            <p>NLB cross-zone load balancing behavior affects traffic distribution:</p>
            <ul>
              <li><strong>Enabled:</strong> Traffic distributed evenly across all healthy targets in all AZs</li>
              <li><strong>Disabled (default):</strong> Traffic distributed only to targets in the same AZ as the NLB node</li>
            </ul>

            <p>Check CloudWatch metrics:</p>
            <ul>
              <li><strong>ActiveFlowCount:</strong> Number of concurrent flows</li>
              <li><strong>NewFlowCount:</strong> Number of new flows per minute</li>
              <li><strong>ProcessedBytes:</strong> Total bytes processed</li>
            </ul>
          </div>

          <div class="section-header">Client IP Preservation</div>
          <div class="troubleshooting">
            <p>NLB preserves client IP, which can cause issues:</p>
            <ul>
              <li><strong>Security Group Rules:</strong> Target security groups must allow client IPs, not NLB IPs</li>
              <li><strong>Application Logging:</strong> Applications see actual client IPs, not NLB IPs</li>
              <li><strong>Connection Limits:</strong> Targets may hit per-client connection limits</li>
            </ul>
          </div>
        `
      }
    ]
  },
  {
    id: "gwlb",
    title: "🌉 Gateway Load Balancer (GWLB)",
    children: [
      {
        id: "gwlb-overview",
        title: "🎯 GWLB Troubleshooting Overview",
        content: `
          <div class="section-header">Gateway Load Balancer Basics</div>
          <div class="troubleshooting">
            <p>GWLB operates at Layer 3 (Network Layer) and is designed for deploying, scaling, and managing third-party network virtual appliances:</p>
            
            <ul>
              <li><strong>GENEVE Protocol:</strong> Uses GENEVE encapsulation on port 6081</li>
              <li><strong>Flow Hash:</strong> Uses 5-tuple flow hash for consistent routing</li>
              <li><strong>Symmetric Routing:</strong> Ensures traffic flows through the same appliance</li>
            </ul>
          </div>

          <div class="section-header">Common GWLB Issues</div>
          <div class="error-types">
            <p><strong>GENEVE Encapsulation Issues:</strong></p>
            <ul>
              <li>Appliance doesn't support GENEVE protocol</li>
              <li>MTU size issues with encapsulation overhead</li>
              <li>Firewall blocking GENEVE traffic on port 6081</li>
            </ul>

            <p><strong>Flow Stickiness Problems:</strong></p>
            <ul>
              <li>Asymmetric routing causing connection issues</li>
              <li>Appliance not maintaining session state</li>
              <li>Flow hash not working as expected</li>
            </ul>

            <p><strong>Health Check Failures:</strong></p>
            <ul>
              <li>Appliance not responding to health checks</li>
              <li>GENEVE health check configuration issues</li>
              <li>Network connectivity between GWLB and appliances</li>
            </ul>
          </div>

          <div class="section-header">Troubleshooting Commands</div>
          <div class="troubleshooting">
            <code>
              # Check GENEVE interface<br>
              ip link show type geneve<br><br>
              # Monitor GENEVE traffic<br>
              tcpdump -i any port 6081<br><br>
              # Check MTU settings<br>
              ip link show | grep mtu<br><br>
              # Test appliance connectivity<br>
              ping appliance-ip
            </code>
          </div>

          <div class="playbook-reference">
            <h4>📖 Internal Playbook References</h4>
            <a href="https://w.amazon.com/bin/view/DSE/Request_Reply/Software_Load_Balancer/Developer_Docs/DataPlane/Runbooks/GWLB/" class="playbook-link" target="_blank">
              GWLB Troubleshooting Guide
            </a>
          </div>
        `
      }
    ]
  }
];

elbTroubleshootingData[0].children.push(...additionalELBData);