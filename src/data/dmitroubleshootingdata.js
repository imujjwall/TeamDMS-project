export const dmitroubleshootingdata = [
  {
    id: "root",
    title: "Amazon Connect Support Knowledge",
    children: [
      {
        id: "approach",
        title: "General Troubleshooting Guidance",
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
                  <li>Verify if the issue is about NMnS services or some other related service in the network flow/workflow causing the issue e.g. Ec2 or Lambda.</li>
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
              <tr>
                <th>Protocol</th>
                <th>Steps Performed</th>
              </tr>
              <tr>
                <td>TCP</td>
                <td>TCP 3-way handshake</td>
              </tr>
              <tr>
                <td>SSL</td>
                <td>TCP 3-way handshake + SSL negotiation</td>
              </tr>
              <tr>
                <td>HTTP</td>
                <td>TCP 3-way handshake + HTTP request</td>
              </tr>
              <tr>
                <td>HTTPS</td>
                <td>TCP 3-way handshake + SSL negotiation + HTTP request [Encrypted]</td>
              </tr>
            </table>
          </div>

          <div class="section-header">Target Group Health Check Parameters</div>
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
        `
      },
      {
        id: "clb-alb",
        title: "Validate connectivity to Amazon Connect with the Endpoint Test Utility",
        children: [
          {
            id: "dns-resolution",
            title: "DNS Resolution",
            content: `
              <div class="troubleshooting">
                <p>Run below dig/nslookup command to check if the customer's custom domain is resolving to ELB's IP addresses as displayed in Atlas WayPoint section.</p>
                <ul>
                  <code>For linux: $ dig +short custom_domain_name</code><br>
                  <code>For linux & Windows: $ nslookup custom_domain_name</code>
                </ul>
              </div>
              <p class="note">
                <strong>Note:</strong><br>
                • Only active nodes IP address are published in the ELB DNS.<br>
                • For CLB/ALB with more AZ's enabled, only a maximum of 8 IP addresses are published in DNS. Scaling out might cause it to have more nodes per AZ and can scale out up to a 100 nodes in total. Even though there is 100 nodes, single DNS query will be giving 8 IPs are any point of time. With each DNS query, Route53 resolver will rotate among the node IPs to provide an even distribution as possible.<br>
                • Read more about how DNS resolution works in ELB <a href="https://w.amazon.com/bin/view/DSE/Request_Reply/Software_Load_Balancer/Developer_Docs/DataPlane/Runbooks/Waypoint/#How_does_DNS_Resolution_Work_for_ALB.3F">here</a>.
              </p>
            `
          },
          {
            id: "connection-timeout",
            title: "Connection Timeout",
            content: `
              <div class="troubleshooting">
                <p>Verify customer's unable to connect to load balancer by running below test:</p>
                <ul>
                  <code>For linux & windows: $ telnet custom_domain_name port</code><br>
                  <code>For Windows: $ curl -iv http(s)://custom_domain_name</code>
                </ul>
                <p>• Confirm customer has appropriate connectivity path configured to reach load balancer. Remember Internal load balancers are not accessible from the public internet by design.</p>
                <p>• Verify route tables for all ELB subnets in Atlas to ensure proper IGW configuration and alternatively gateways (NAT, TGW, VGW) for internal ELBs</p>
                <p>• Ensure there is no port access restrictions in subnet NACLs or Client IP allowlisting limitations and all required ephemeral ports (typically 1024-65535) are allowed in outbound rules.</p>
                <p>• Check Security group restrictions blocking load balancer access like required port access not allowed or client/NAT IP not in allowlist using Atlas.</p>
                <p>• If enabled VPC flow logs with metadata can help diagnose ELB connectivity issues by confirming if client SYN packets reach the load balancer and whether SYN-ACK responses are sent back, with missing SYN-ACK responses indicating a potential ELB node problem.</p>
                <p>• If all above checks out, issue may exist between client and ELB like Client-side firewall. Use tools like traceroute, mtr, hping etc to learn the same.</p>
                <p>• Additionally, simultaneous packet captures on the client machine can identify precisely which step of the TCP three-way handshake is failing during connection attempts.</p>
                <ul>
                  <code>sudo tcpdump -i any port listener_port_number -w traces.pcap</code>
                </ul>
              </div>
            `
          },
          {
            id: "connection-refused",
            title: "Connection Refused",
            content: `
              <div class="troubleshooting">
                <p>Verify customer's refused connection while requesting loadbalancer by running below test:</p>
                <ul>
                  <code>For linux & windows: $ telnet custom_domain_name</code><br>
                  <code>For linux: $ curl -iv http(s)://custom_domain_name</code>
                </ul>
                <p>• Ensure ELB does has a listener configured for the port being accessed. Check the listeners on ELB Atlas page.</p>
                <p>• Analyse enabled VPC flow logs with metadata on ELB nodes' interfaces and see if there is a packet with RST flag set from ELB.</p>
                <p>• Nothing above confirms, a client-side firewall may be blocking access to the required port or IP address, so customers should verify their local firewall rules.</p>
                <p>• Additionally, taking packet captures on the client machine to see the connection refused (RST packets from device sending it).</p>
              </div>
            `
          },
          {
            id: "ssl-tls-issues",
            title: "SSL/TLS Issues",
            content: `
              <div class="troubleshooting">
                <p>Verify SSL/TLS issue on customer's end, by running below command:</p>
                <ul>
                  <code>For linux: $ curl -iv https://custom_domain_name</code><br>
                  <code>For Windows Powershell: $ Test-NetConnection -ComputerName custom_domain_name -Port port_number</code>
                </ul>
                <p>• Check "InboundSSLNegotiationFailures" CW metric for CLB or "ClientTLSNegotiationErrorCount" CW metric for ALB with the data points for the timestamp in concern.</p>
                <p>• Following are the most common reasons for SSL negotiation errors:</p>
                <ul>
                  <ol>
                    <li>Cipher Suite and Protocol mismatch</li>
                    <li>Certificate related issue</li>
                  </ol>
                </ul>

                <div class="section-header">Certificate related issues</div>
                <p>• Access customers domain on any web browser to learn more on certificate-related issues such as domain name mismatches, expired certificates, or validation failures with self-signed certificates. The issues displayed are self-explanatory error messages.</p>
                <p>• Upon learning the observed error message, you can examine an ELB's associated certificate by finding its ARN and then checking details like expiry date, valid domains, and key size through either the ACM or IAM tool, depending on the ARN.</p>
                <p class="note">Note: ALB's SNI support allows multiple certificates per listener, with selection determined by a <a href="https://w.amazon.com/index.php/DSE/Request_Reply/Software_Load_Balancer/Developer_Docs/DataPlane/Playbooks/Waypoint#What_is_Smart_Certificate_Selection.3F">smart certificate selection algorithm.</a></p>

                <div class="section-header">Protocol and Cipher mismatch</div>
                <p>• SSL negotiation fails when the client and ELB have no matching SSL protocol version or cipher suite, which can be verified by checking the ELB's supported protocols and ciphers in the atlas page.</p>
                <p>• Since this issue is highly client-dependent with varying support across different clients, it's essential to troubleshoot from the customer's or their clients' perspective rather than relying solely on your own testing environment.</p>
                <p>• You can troubleshoot SSL negotiation issues by checking available protocols and ciphers using AWS CLI commands <a href="https://docs.aws.amazon.com/cli/latest/reference/elbv2/describe-ssl-policies.html">('describe-ssl-policies' for ALB)</a> or <a href="https://docs.aws.amazon.com/cli/latest/reference/elb/describe-load-balancer-policies.html">('describe-load-balancer-policies' for CLB)</a> and utilizing tools like OpenSSL and packet captures.</p>
                <ul>
                  <code><strong>OpenSSL command for TLSv1.2 showing certs:</strong> openssl s_client -connect domain_name:port_number -showcerts -tls1_2</code><br>
                  <code><strong>Packet Capture:</strong> sudo tcpdump -i any port listener_port_number -w traces.pcap</code>
                </ul>
              </div>
            `
          }
        ]
      }
    ]
  }
];