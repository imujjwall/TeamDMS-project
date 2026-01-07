export const dmitroubleshootingdata = [
  {
    id: "root",
    title: "Amazon Connect Support Knowledge",
    children: [
      {
        id: "dmi-general-approach",
        title: "General Troubleshooting Approach",
        content: `
          <div class="section-header">Initial Troubleshooting Steps</div>
          <div class="checklist">
            <ol>
              <li><strong>Understand the customer's issue</strong>
                <ul>
                  <li>Confirm your understanding if in a meeting with the customer</li>
                  <li>Do not assume - verify all resources and facts</li>
                  <li>Gather specific examples with timestamps</li>
                </ul>
              </li>
              <li><strong>Validate the issue</strong>
                <ul>
                  <li>Verify if issue is with Amazon Connect or related AWS services</li>
                  <li>Check if issue is reproducible</li>
                  <li>Determine scope: single agent, multiple agents, or instance-wide</li>
                </ul>
              </li>
              <li><strong>Gather resource information</strong>
                <ul>
                  <li>Instance ARN</li>
                  <li>Contact IDs of affected calls</li>
                  <li>Agent usernames</li>
                  <li>Timestamps and timezone</li>
                  <li>Contact flow ARNs if applicable</li>
                </ul>
              </li>
              <li><strong>Use diagnostic tools</strong>
                <ul>
                  <li>Amazon Connect Check Connectivity Tool</li>
                  <li>CCP logs</li>
                  <li>Contact search and recordings</li>
                  <li>CloudWatch metrics and logs</li>
                </ul>
              </li>
              <li><strong>Document findings</strong>
                <ul>
                  <li>Annotate internal notes with resource links</li>
                  <li>Update support tickets with findings</li>
                  <li>Track patterns across multiple incidents</li>
                </ul>
              </li>
            </ol>
          </div>
        `
      },
      {
        id: "dmi-ccp-issues",
        title: "Contact Control Panel (CCP) Issues",
        children: [
          {
            id: "ccp-connectivity",
            title: "CCP Connectivity Issues",
            content: `
              <div class="troubleshooting">
                <div class="section-header">CCP Does Not Initialize/Connect</div>
                <p><strong>Common Causes:</strong></p>
                <ul>
                  <li>Missing port/IP allowlist entries</li>
                  <li>Browser microphone access not granted</li>
                  <li>External device not answered (for desk phone)</li>
                  <li>Multiple CCP tabs open simultaneously</li>
                </ul>
                
                <p><strong>Troubleshooting Steps:</strong></p>
                <ol>
                  <li><strong>Run Connectivity Test:</strong>
                    <ul>
                      <li>Use Amazon Connect Check Connectivity Tool: <code>https://s3.amazonaws.com/connectivitytest/checkConnectivity.html</code></li>
                      <li>Or newer version: <code>https://tools.connect.aws/endpoint-test/</code></li>
                      <li>Check browser compatibility and version</li>
                      <li>Verify microphone permissions</li>
                      <li>Test network latency to AWS resources</li>
                      <li>Ensure required ports are open</li>
                    </ul>
                  </li>
                  <li><strong>Verify Network Configuration:</strong>
                    <ul>
                      <li>Ensure all IPs from <a href="https://docs.aws.amazon.com/connect/latest/adminguide/ccp-networking.html">Network Setup Guide</a> are allowlisted</li>
                      <li>Check for recent ipranges.json updates</li>
                      <li>Verify firewall rules allow WebSocket connections</li>
                      <li>Test without VPN if applicable</li>
                    </ul>
                  </li>
                  <li><strong>Browser Configuration:</strong>
                    <ul>
                      <li>Verify using supported browser (Chrome, Firefox, Edge)</li>
                      <li>Check browser is one of latest 3 versions</li>
                      <li>Clear browser cache and cookies</li>
                      <li>Disable browser extensions that might interfere</li>
                      <li>Ensure only one CCP tab is open</li>
                    </ul>
                  </li>
                  <li><strong>Download CCP Logs:</strong>
                    <ul>
                      <li>Click settings cogwheel in CCP</li>
                      <li>Select "Download logs"</li>
                      <li>Analyze logs for connection errors</li>
                      <li>Use CCP Log Parser tool for detailed analysis</li>
                    </ul>
                  </li>
                </ol>

                <div class="section-header">Periodic Connection Errors</div>
                <p><strong>Common Causes:</strong></p>
                <ul>
                  <li>Network contention</li>
                  <li>Updated ipranges.json not added to allowlist</li>
                  <li>Intermittent firewall issues</li>
                  <li>Workstation resource constraints</li>
                </ul>

                <p><strong>Resolution:</strong></p>
                <ul>
                  <li>Monitor network bandwidth usage</li>
                  <li>Check for AWS IP range updates</li>
                  <li>Review CloudWatch metrics for patterns</li>
                  <li>Verify workstation meets minimum requirements</li>
                </ul>
              </div>
            `
          },
          {
            id: "dmi-audio-issues",
            title: "Audio Quality Issues",
            content: `
              <div class="troubleshooting">
                <div class="section-header">One-Way Audio</div>
                <p><strong>When agent can't hear caller OR caller can't hear agent:</strong></p>
                
                <p><strong>Troubleshooting Steps:</strong></p>
                <ol>
                  <li><strong>Check Headset Connectivity:</strong>
                    <ul>
                      <li>Windows: Device Manager → Audio inputs and outputs</li>
                      <li>Verify computer recognizes headset</li>
                      <li>Test with different USB port</li>
                      <li>Try different headset if available</li>
                      <li>Recommended: USB 2.0 headset</li>
                    </ul>
                  </li>
                  <li><strong>Browser Microphone Permissions:</strong>
                    <ul>
                      <li><strong>Chrome:</strong> Settings → Site Settings → Microphone</li>
                      <li><strong>Firefox:</strong> Click lock icon in address bar → Permissions</li>
                      <li>Ensure correct headset is selected</li>
                      <li>Grant permissions to CCP domain</li>
                    </ul>
                  </li>
                  <li><strong>Check Call Recording:</strong>
                    <ul>
                      <li>Listen to recording to determine which channel has issue</li>
                      <li>Agent audio = right channel</li>
                      <li>Customer audio = left channel</li>
                      <li>If both channels affected, likely network issue</li>
                    </ul>
                  </li>
                  <li><strong>Network Diagnostics:</strong>
                    <ul>
                      <li>Check packet loss using WebRTC internals</li>
                      <li>Verify bandwidth meets requirements (100Kbps per call minimum)</li>
                      <li>Test latency to AWS region</li>
                    </ul>
                  </li>
                </ol>

                <div class="section-header">Audio Choppy/Cutting Out/Echo</div>
                <p><strong>Common Causes:</strong></p>
                <ul>
                  <li>Network packet loss</li>
                  <li>High jitter or latency</li>
                  <li>Workstation resource contention</li>
                  <li>Bandwidth limitations</li>
                  <li>VPN configuration issues</li>
                </ul>

                <p><strong>Troubleshooting Steps:</strong></p>
                <ol>
                  <li><strong>Analyze Call Recording:</strong>
                    <ul>
                      <li>Use Audacity or similar tool to examine audio</li>
                      <li>Identify which channel (agent/customer) has issues</li>
                      <li>Check for consistent vs intermittent problems</li>
                    </ul>
                  </li>
                  <li><strong>Check Network Metrics:</strong>
                    <ul>
                      <li>Review ToInstancePacketLossRate in CloudWatch</li>
                      <li>Should be less than 20% packet loss</li>
                      <li>Check for network congestion</li>
                      <li>Verify internet speed (upload/download)</li>
                    </ul>
                  </li>
                  <li><strong>Workstation Requirements:</strong>
                    <ul>
                      <li>Close unnecessary applications</li>
                      <li>Check CPU and memory usage</li>
                      <li>Verify meeting minimum system requirements</li>
                      <li>Test with different workstation if possible</li>
                    </ul>
                  </li>
                  <li><strong>WebRTC Capture:</strong>
                    <ul>
                      <li>Navigate to chrome://webrtc-internals/</li>
                      <li>Enable "Create Dump" during call</li>
                      <li>Analyze packet loss, jitter, and latency metrics</li>
                      <li>Check Round Trip Time (should be < 300ms)</li>
                    </ul>
                  </li>
                </ol>

                <div class="section-header">Latency/Cross-Talk</div>
                <p><strong>Symptoms:</strong> Delay between speaking and hearing, parties talking over each other</p>
                <p><strong>Resolution:</strong></p>
                <ul>
                  <li>Calculate PSTN and agent latency</li>
                  <li>Target: Round Trip Time < 300ms</li>
                  <li>Check network path for bottlenecks</li>
                  <li>Consider moving closer to router</li>
                  <li>Disable VPN if not required</li>
                  <li>Use wired connection instead of WiFi</li>
                </ul>

                <div class="section-header">Wobble (Audio Speed Variations)</div>
                <p><strong>Cause:</strong> Media codecs compensating for high jitter and latency</p>
                <p><strong>Resolution:</strong></p>
                <ul>
                  <li>Address underlying network issues</li>
                  <li>Reduce jitter through QoS settings</li>
                  <li>Improve network stability</li>
                  <li>Check for bandwidth contention</li>
                </ul>
              </div>
            `
          },
          {
            id: "dmi-ccp-state-issues",
            title: "CCP State and Call Handling Issues",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Missed Calls, State Change Delays, CCP Unresponsive</div>
                <p><strong>Common Causes:</strong></p>
                <ul>
                  <li>Resource contention on agent workstation</li>
                  <li>Network instability</li>
                  <li>Poor connection to AWS resources</li>
                  <li>Multiple CCP instances running</li>
                </ul>

                <p><strong>Note:</strong> Agents have 20 seconds to accept or reject a contact. If no action taken, status changes to "Missed" and contact routes to next available agent.</p>

                <p><strong>Troubleshooting Steps:</strong></p>
                <ol>
                  <li>Check workstation resource usage (CPU, memory, disk)</li>
                  <li>Verify network stability and bandwidth</li>
                  <li>Ensure only one CCP tab/window is open</li>
                  <li>Review CCP logs for timing issues</li>
                  <li>Check for browser extensions causing conflicts</li>
                  <li>Test with vanilla CCP (not embedded)</li>
                </ol>

                <div class="section-header">Call Disconnects</div>
                <p><strong>Important:</strong> Note when during the call disconnections occur to identify patterns</p>
                
                <p><strong>Common Scenarios:</strong></p>
                <ul>
                  <li><strong>During transfer:</strong> May indicate third-party transfer issue</li>
                  <li><strong>Circular transfers:</strong> Transferring out of and back into Connect</li>
                  <li><strong>Random disconnects:</strong> Network or workstation issues</li>
                  <li><strong>At specific times:</strong> May indicate scheduled maintenance or capacity issues</li>
                </ul>

                <p><strong>Diagnostic Steps:</strong></p>
                <ol>
                  <li>Review contact records for DisconnectDetails</li>
                  <li>Check call recordings for audio before disconnect</li>
                  <li>Analyze CloudWatch metrics for patterns</li>
                  <li>Review contact flow logic for transfer blocks</li>
                  <li>Check for AWS Health Dashboard notifications</li>
                </ol>
              </div>
            `
          }
        ]
      },
      {
        id: "dmi-setup-configuration",
        title: "Setup and Configuration Issues",
        children: [
          {
            id: "user-setup",
            title: "User Setup and Permissions",
            content: `
              <div class="troubleshooting">
                <div class="section-header">User Cannot Log Into Connect</div>
                <p><strong>Required Configuration:</strong></p>
                <ol>
                  <li><strong>Correct Security Profile:</strong>
                    <ul>
                      <li>Verify user has appropriate security profile (e.g., 'Agent')</li>
                      <li>Check permissions include "Access CCP"</li>
                      <li>Confirm user can view required resources</li>
                    </ul>
                  </li>
                  <li><strong>Correct Routing Profile:</strong>
                    <ul>
                      <li>User must be assigned to a routing profile</li>
                      <li>Routing profile must have queues configured</li>
                      <li>Verify channel settings (voice, chat, task)</li>
                    </ul>
                  </li>
                  <li><strong>Username Format:</strong>
                    <ul>
                      <li>Must match exactly (case-sensitive)</li>
                      <li>No special characters unless required</li>
                      <li>Format: username@domain (if using SAML)</li>
                    </ul>
                  </li>
                  <li><strong>Agent Hierarchy:</strong>
                    <ul>
                      <li>User should be assigned to appropriate hierarchy</li>
                      <li>Required for reporting and metrics</li>
                    </ul>
                  </li>
                </ol>

                <div class="section-header">Agent Cannot Access Recordings</div>
                <p><strong>Requirements:</strong></p>
                <ul>
                  <li>Security profile must have "Listen" enabled under "Metrics and Quality > Call recordings"</li>
                  <li>User must have active Connect session</li>
                  <li>Recordings must be enabled in instance settings</li>
                  <li>S3 bucket permissions must be configured correctly</li>
                </ul>
              </div>
            `
          },
          {
            id: "dmi-instance-configuration",
            title: "Instance Configuration",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Instance Setup Requirements</div>
                <ol>
                  <li><strong>Identity Management:</strong>
                    <ul>
                      <li>Choose between SAML 2.0 or Connect user management</li>
                      <li>Configure SSO if using SAML</li>
                      <li>Set up access URL with standard naming</li>
                    </ul>
                  </li>
                  <li><strong>Telephony Options:</strong>
                    <ul>
                      <li>Enable incoming calls</li>
                      <li>Enable outbound calls if needed</li>
                      <li>Configure early media if required</li>
                    </ul>
                  </li>
                  <li><strong>Data Storage:</strong>
                    <ul>
                      <li>Configure S3 bucket for call recordings</li>
                      <li>Set up bucket for exported reports</li>
                      <li>Enable contact flow logs</li>
                      <li>Configure encryption settings</li>
                    </ul>
                  </li>
                  <li><strong>Hours of Operation:</strong>
                    <ul>
                      <li>Define business hours for each queue</li>
                      <li>Set timezone correctly</li>
                      <li>Configure holiday schedules</li>
                    </ul>
                  </li>
                </ol>

                <div class="section-header">Phone Number Issues</div>
                <p><strong>Claiming/Porting Numbers:</strong></p>
                <ul>
                  <li>Verify number availability in desired region</li>
                  <li>Complete porting documentation accurately</li>
                  <li>Allow sufficient time for porting process</li>
                  <li>Test numbers after claiming/porting</li>
                  <li>Associate numbers with correct contact flows</li>
                </ul>
              </div>
            `
          },
          {
            id: "dmi-routing-configuration",
            title: "Routing Profiles and Queues",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Routing Profile Configuration</div>
                <p><strong>Key Components:</strong></p>
                <ul>
                  <li><strong>Media Concurrency:</strong> How many contacts agent can handle simultaneously</li>
                  <li><strong>Default Outbound Queue:</strong> Queue used for outbound calls</li>
                  <li><strong>Queue Associations:</strong> Which queues agent can receive contacts from</li>
                  <li><strong>Priority Settings:</strong> Order in which queues are checked</li>
                  <li><strong>Delay Settings:</strong> Time before checking next priority queue</li>
                </ul>

                <p><strong>Common Issues:</strong></p>
                <ol>
                  <li><strong>Agent Not Receiving Calls:</strong>
                    <ul>
                      <li>Verify routing profile has correct queues</li>
                      <li>Check queue has contacts waiting</li>
                      <li>Confirm agent status is "Available"</li>
                      <li>Review priority and delay settings</li>
                    </ul>
                  </li>
                  <li><strong>Calls Going to Wrong Agents:</strong>
                    <ul>
                      <li>Review routing profile assignments</li>
                      <li>Check queue priority settings</li>
                      <li>Verify contact flow routing logic</li>
                    </ul>
                  </li>
                </ol>

                <div class="section-header">Queue Configuration</div>
                <p><strong>Essential Settings:</strong></p>
                <ul>
                  <li>Queue name and description</li>
                  <li>Hours of operation</li>
                  <li>Outbound caller ID (if applicable)</li>
                  <li>Maximum contacts in queue</li>
                  <li>Quick connects for transfers</li>
                </ul>
              </div>
            `
          }
        ]
      },
      {
        id: "dmi-contact-flows",
        title: "Contact Flow Issues",
        children: [
          {
            id: "flow-errors",
            title: "Contact Flow Errors",
            content: `
              <div class="troubleshooting">
                <div class="section-header">Troubleshooting Contact Flow Issues</div>
                <p><strong>Enable Contact Flow Logs:</strong></p>
                <ol>
                  <li>Add "Set logging behavior" block to contact flow</li>
                  <li>Enable logging in CloudWatch</li>
                  <li>Review logs for errors and execution path</li>
                </ol>

                <p><strong>Common Flow Errors:</strong></p>
                <ul>
                  <li><strong>Lambda Function Failures:</strong>
                    <ul>
                      <li>Check Lambda function logs in CloudWatch</li>
                      <li>Verify function has correct permissions</li>
                      <li>Test function independently</li>
                      <li>Check timeout settings</li>
                      <li>Review error handling in flow</li>
                    </ul>
                  </li>
                  <li><strong>Invalid Attribute References:</strong>
                    <ul>
                      <li>Verify attribute names are correct</li>
                      <li>Check attribute is set before use</li>
                      <li>Use proper syntax: $.Attributes.AttributeName</li>
                    </ul>
                  </li>
                  <li><strong>Queue Transfer Failures:</strong>
                    <ul>
                      <li>Verify queue exists and is active</li>
                      <li>Check hours of operation</li>
                      <li>Ensure agents are available</li>
                      <li>Review queue capacity settings</li>
                    </ul>
                  </li>
                  <li><strong>Missing Error Branches:</strong>
                    <ul>
                      <li>Always configure error branches</li>
                      <li>Add disconnect block for error paths</li>
                      <li>Log errors for troubleshooting</li>
                    </ul>
                  </li>
                </ul>

                <div class="section-header">Testing Contact Flows</div>
                <p><strong>Best Practices:</strong></p>
                <ol>
                  <li>Test in non-production environment first</li>
                  <li>Use test phone numbers</li>
                  <li>Review contact flow logs after each test</li>
                  <li>Test all branches and error conditions</li>
                  <li>Verify prompts play correctly</li>
                  <li>Check attribute values are set correctly</li>
                </ol>
              </div>
            `
          }
        ]
      },
      {
        id: "dmi-network-requirements",
        title: "Network Requirements and Configuration",
        content: `
          <div class="troubleshooting">
            <div class="section-header">Network Configuration Requirements</div>
            <p><strong>Required Ports and Protocols:</strong></p>
            <table>
              <tr>
                <th>Port</th>
                <th>Protocol</th>
                <th>Purpose</th>
              </tr>
              <tr>
                <td>443</td>
                <td>TCP</td>
                <td>HTTPS for signaling and API calls</td>
              </tr>
              <tr>
                <td>3478</td>
                <td>UDP</td>
                <td>Softphone media (STUN/TURN)</td>
              </tr>
            </table>

            <p><strong>Required Domains to Allowlist:</strong></p>
            <ul>
              <li>*.my.connect.aws - CCP and admin console</li>
              <li>*.transport.connect.[region].amazonaws.com - WebSocket traffic</li>
              <li>turnNlb-*.elb.* - Softphone media</li>
              <li>*.cloudfront.net - Static CCP assets</li>
            </ul>

            <p><strong>IP Address Ranges:</strong></p>
            <ul>
              <li>Download latest ranges from: <code>https://ip-ranges.amazonaws.com/ip-ranges.json</code></li>
              <li>Filter for "AMAZON_CONNECT" service</li>
              <li>Include all CIDR ranges for your region</li>
              <li>Update allowlist when AWS publishes changes</li>
            </ul>

            <div class="section-header">Bandwidth Requirements</div>
            <ul>
              <li><strong>Minimum per call:</strong> 100 Kbps</li>
              <li><strong>Recommended:</strong> 200 Kbps per concurrent call</li>
              <li><strong>For video:</strong> Additional 1-2 Mbps per video call</li>
            </ul>

            <div class="section-header">VPN Considerations</div>
            <p><strong>Recommended Configuration:</strong></p>
            <ul>
              <li>Use split tunneling for Connect traffic</li>
              <li>Exclude Connect domains from VPN routing</li>
              <li>If full tunnel required, ensure VPN supports WebRTC</li>
              <li>Test latency through VPN (should be < 300ms RTT)</li>
            </ul>

            <div class="section-header">Firewall Configuration</div>
            <p><strong>Requirements:</strong></p>
            <ul>
              <li>Allow WebSocket connections (wss://)</li>
              <li>Do not perform SSL inspection on Connect traffic</li>
              <li>Allow UDP traffic on port 3478</li>
              <li>Configure stateful firewall rules</li>
              <li>Allow all ephemeral ports for return traffic</li>
            </ul>
          </div>
        `
      },
      {
        id: "dmi-monitoring-metrics",
        title: "Monitoring and Metrics",
        content: `
          <div class="troubleshooting">
            <div class="section-header">Key CloudWatch Metrics</div>
            <table>
              <tr>
                <th>Metric</th>
                <th>Description</th>
                <th>Threshold</th>
              </tr>
              <tr>
                <td>ToInstancePacketLossRate</td>
                <td>Packet loss from agent to Connect</td>
                <td>< 20%</td>
              </tr>
              <tr>
                <td>CallsBreachingConcurrencyQuota</td>
                <td>Calls exceeding concurrent call limit</td>
                <td>0</td>
              </tr>
              <tr>
                <td>MissedCalls</td>
                <td>Calls not answered by agents</td>
                <td>Monitor trend</td>
              </tr>
              <tr>
                <td>ContactFlowErrors</td>
                <td>Errors in contact flow execution</td>
                <td>0</td>
              </tr>
              <tr>
                <td>ThrottledCalls</td>
                <td>API calls being throttled</td>
                <td>0</td>
              </tr>
            </table>

            <div class="section-header">Real-Time Monitoring</div>
            <p><strong>Available Metrics:</strong></p>
            <ul>
              <li>Agents online/available/on call</li>
              <li>Contacts in queue</li>
              <li>Oldest contact in queue</li>
              <li>Service level performance</li>
              <li>Average handle time</li>
            </ul>

            <div class="section-header">Historical Reports</div>
            <p><strong>Key Reports:</strong></p>
            <ul>
              <li>Agent activity audit</li>
              <li>Contact search with filters</li>
              <li>Login/logout report</li>
              <li>Queue performance</li>
              <li>Contact flow execution</li>
            </ul>

            <div class="section-header">Contact Search</div>
            <p><strong>Search Capabilities:</strong></p>
            <ul>
              <li>By contact ID</li>
              <li>By phone number</li>
              <li>By agent username</li>
              <li>By queue</li>
              <li>By date/time range</li>
              <li>By conversation characteristics (Contact Lens)</li>
              <li>By keywords (Contact Lens)</li>
            </ul>
          </div>
        `
      },
      {
        id: "dmi-escalation",
        title: "When to Escalate to AWS Support",
        content: `
          <div class="troubleshooting">
            <div class="section-header">Information to Gather Before Opening Case</div>
            <p><strong>Required Information:</strong></p>
            <ol>
              <li><strong>Instance Details:</strong>
                <ul>
                  <li>Instance ARN</li>
                  <li>AWS Region</li>
                  <li>Instance alias/URL</li>
                </ul>
              </li>
              <li><strong>Issue Details:</strong>
                <ul>
                  <li>5+ affected contact IDs (from last 24-48 hours)</li>
                  <li>Timestamp when issue started (with timezone)</li>
                  <li>Frequency: constant, intermittent, specific times</li>
                  <li>Scope: single agent, multiple agents, all agents</li>
                </ul>
              </li>
              <li><strong>Diagnostic Data:</strong>
                <ul>
                  <li>CCP logs from affected agents</li>
                  <li>Call recordings (if audio issue)</li>
                  <li>Contact flow ARN (if flow issue)</li>
                  <li>Endpoint test results</li>
                  <li>WebRTC capture (if audio issue)</li>
                </ul>
              </li>
              <li><strong>Troubleshooting Performed:</strong>
                <ul>
                  <li>Steps already taken</li>
                  <li>Results of diagnostic tests</li>
                  <li>Any recent changes to configuration</li>
                </ul>
              </li>
            </ol>

            <div class="section-header">Severity Guidelines</div>
            <table>
              <tr>
                <th>Severity</th>
                <th>Description</th>
                <th>Response Time</th>
              </tr>
              <tr>
                <td>Critical</td>
                <td>Production system down, business-critical impact</td>
                <td>< 1 hour</td>
              </tr>
              <tr>
                <td>Urgent</td>
                <td>Production system impaired, significant business impact</td>
                <td>< 4 hours</td>
              </tr>
              <tr>
                <td>High</td>
                <td>Important functions impaired or degraded</td>
                <td>< 12 hours</td>
              </tr>
              <tr>
                <td>Normal</td>
                <td>General questions, feature requests</td>
                <td>< 24 hours</td>
              </tr>
            </table>

            <div class="section-header">Escalation Scenarios</div>
            <p><strong>Escalate to AWS Support when:</strong></p>
            <ul>
              <li>Issue affects multiple agents or entire instance</li>
              <li>Audio quality issues persist after agent-side troubleshooting</li>
              <li>Contact flow errors with no clear cause</li>
              <li>API throttling or service limits reached</li>
              <li>Suspected AWS service issue</li>
              <li>Need to increase service quotas</li>
              <li>Telephony issues (call routing, PSTN connectivity)</li>
            </ul>
          </div>
        `
      }
    ]
  }
];