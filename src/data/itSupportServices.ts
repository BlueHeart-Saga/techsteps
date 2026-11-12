export interface ITSubService {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  features: string[];
  sla: string;
  customRoute?: string; // If reusing an existing page
  faqs: { question: string; answer: string }[];
}

export interface ITCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  services: ITSubService[];
}

export const itSupportCategories: ITCategory[] = [
  {
    id: 'helpdesk-support',
    name: 'Helpdesk Support',
    description: 'Rapid remote and on-site technical resolution to keep UK workforces productive.',
    iconName: 'helpdesk',
    services: [
      {
        slug: 'remote-it-support',
        name: 'Remote IT Support',
        category: 'Helpdesk Support',
        categorySlug: 'helpdesk-support',
        shortDescription: 'Instant, secure remote troubleshooting and diagnostics with a 15-minute SLA.',
        longDescription: 'Our UK-based remote IT helpdesk delivers rapid, certified technical assistance directly to your team’s screens. Utilizing encrypted remote management tools, our Tier 2 and Tier 3 engineers diagnose software glitches, resolve system stalls, optimize registry settings, and restore user workflows within minutes of ticket submission.',
        benefits: [
          'Guaranteed 15-minute response SLA for critical incidents',
          'UK-based certified engineers (CompTIA, Microsoft, Cisco)',
          'Bank-grade encrypted 256-bit remote access sessions',
          'Eliminates downtime without waiting for technician travel'
        ],
        features: [
          'Live desktop screen sharing & diagnostics',
          'User credential and password reset desk',
          'Application error debugging and crash dump analysis',
          'Silent remote patch deployment & background maintenance'
        ],
        sla: '15-minute critical response',
        faqs: [
          {
            question: 'How fast do your remote technicians respond?',
            answer: 'For priority-1 incidents, our remote helpdesk initiates contact and begins diagnostics within 15 minutes. Routine requests are typically acknowledged within 30 minutes.'
          },
          {
            question: 'Is your remote connection secure?',
            answer: 'Yes. Every remote session requires explicit user authorization and is protected by end-to-end AES 256-bit encryption with full audit logging in compliance with ISO 27001.'
          },
          {
            question: 'Can you support hybrid and work-from-home staff?',
            answer: 'Absolutely. We support remote workers across the UK regardless of physical location, whether connecting via domestic broadband or mobile hotspots.'
          }
        ]
      },
      {
        slug: 'onsite-it-support',
        name: 'Onsite IT Support',
        category: 'Helpdesk Support',
        categorySlug: 'helpdesk-support',
        shortDescription: 'Scheduled and emergency on-site engineer dispatch across the UK.',
        longDescription: 'When issues require physical intervention, TechSteps dispatches certified hardware and network engineers directly to your facilities. From server room malfunctions and component replacements to office workstation installations, our nationwide field engineering fleet arrives equipped with diagnostic gear and replacement parts.',
        benefits: [
          'Nationwide field engineering coverage with 4-hour emergency SLA',
          'Direct hardware replacement, de-racking, and cabling fixes',
          'Friendly, professional engineers wearing TechSteps uniforms and ID',
          'Regular scheduled floor-walking and preventive health checks'
        ],
        features: [
          'Physical component diagnostics and motherboard swaps',
          'Structured cabling repair and network switch termination',
          'Server room rack re-cabling and UPS power testing',
          'Emergency disaster recovery site deployment'
        ],
        sla: '4-hour nationwide on-site dispatch',
        faqs: [
          {
            question: 'Which areas of the UK do you cover for on-site support?',
            answer: 'We provide nationwide on-site engineer dispatch across Greater London, the South East, Midlands, North of England, Wales, and Scotland.'
          },
          {
            question: 'Can we schedule recurring on-site engineer days?',
            answer: 'Yes. Many corporate clients utilize our scheduled floor-walking service, where a dedicated engineer visits weekly or fortnightly to assist staff with hardware needs.'
          }
        ]
      },
      {
        slug: 'technical-support',
        name: 'Technical Support',
        category: 'Helpdesk Support',
        categorySlug: 'helpdesk-support',
        shortDescription: 'Escalated Level 2 and Level 3 engineering support for complex environments.',
        longDescription: 'TechSteps Technical Support bridges the gap between basic helpdesk tickets and specialized systems engineering. Our senior technical leads troubleshoot complex directory architectures, virtual machine stalls, database locks, and hybrid cloud synchronization problems with precision.',
        benefits: [
          'Direct access to Senior Systems Engineers (L2/L3)',
          'Deep expertise across Windows Server, Hyper-V, VMware, and Linux',
          'Comprehensive incident root-cause documentation',
          'Integration with third-party software vendor support'
        ],
        features: [
          'Active Directory & Azure AD tenant troubleshooting',
          'Hypervisor host resource allocation and storage pool tuning',
          'Database connectivity and transactional lock diagnosis',
          'Multi-factor authentication (MFA) and SSO policy enforcement'
        ],
        sla: '1-hour escalated engineering triage',
        faqs: [
          {
            question: 'Can your team liaison directly with our software vendors?',
            answer: 'Yes. Our senior engineers handle vendor escalations (e.g. Sage, SAP, CAD, ERP) on your behalf, speaking their technical language to accelerate resolution.'
          }
        ]
      },
      {
        slug: 'it-troubleshooting',
        name: 'IT Troubleshooting',
        category: 'Helpdesk Support',
        categorySlug: 'helpdesk-support',
        shortDescription: 'Systematic problem identification, crash triage, and permanent resolution.',
        longDescription: 'Intermittent crashes, boot errors, memory leaks, and unexplained slowdowns drain organizational productivity. Our systematic IT Troubleshooting methodology isolates hardware, firmware, and software variables to eradicate recurring issues once and for all.',
        benefits: [
          'Elimination of persistent, recurring technology bugs',
          'Hardware stress testing and thermals verification',
          'Corrupted operating system registry and profile repair',
          'Detailed post-incident reporting to prevent recurrence'
        ],
        features: [
          'Windows Blue Screen of Death (BSOD) minidump parsing',
          'Kernel event log tracing and performance profiling',
          'Peripheral driver conflict mediation',
          'System integrity verification (SFC/DISM automation)'
        ],
        sla: 'Same-day diagnostic resolution',
        faqs: [
          {
            question: 'What happens if a workstation cannot be repaired software-wise?',
            answer: 'If hardware fault is confirmed, we immediately stage a loan unit or replace the faulty SSD/motherboard/RAM from our certified hardware inventory.'
          }
        ]
      }
    ]
  },
  {
    id: 'office-it-support',
    name: 'Office IT Support',
    description: 'Workplace technology provisioning, office moves, structured cabling, and daily equipment readiness.',
    iconName: 'office',
    services: [
      {
        slug: 'office-it-setup',
        name: 'Office IT Setup',
        category: 'Office IT Support',
        categorySlug: 'office-it-support',
        shortDescription: 'Complete workplace technology setup for new offices, expansions, and refits.',
        longDescription: 'Opening a new office or expanding your premises? TechSteps handles complete technological fit-outs: from structured Cat6a data cabling and comms rack installations to desk workstation builds, dual-monitor ergonomics, Wi-Fi 6 access points, and boardroom video conferencing systems.',
        benefits: [
          'Turnkey workplace technology installation delivered on schedule',
          'Clean, hidden under-desk cable management and power distribution',
          'Future-proof high-speed copper and optical fibre comms lines',
          'Tested and validated prior to employee move-in day'
        ],
        features: [
          'Server room & comms rack patching and PDU installation',
          'Dual-screen ergonomic desk mounting & docking stations',
          'Microsoft Teams / Zoom Room conference hardware integration',
          'Secure high-density employee Wi-Fi coverage'
        ],
        sla: 'Turnkey project milestones with 0-downtime go-live',
        faqs: [
          {
            question: 'Can you work outside normal office hours during an office setup?',
            answer: 'Yes. We frequently carry out rack installation, cabling, and workstation setups over weekends or evenings to avoid disrupting other trades or staff.'
          }
        ]
      },
      {
        slug: 'office-relocation',
        name: 'Office Relocation',
        category: 'Office IT Support',
        categorySlug: 'office-it-support',
        shortDescription: 'Certified IT relocation specialist services with secure, GPS-tracked fleet logistics.',
        longDescription: 'Relocating business IT requires specialist handling, anti-static packing, and precise de-racking. Leveraging our certified IT Logistics fleet, we transport your critical servers, workstations, and comms hardware with full consignment chain-of-custody and day-one re-commissioning.',
        benefits: [
          'Reuses our certified IT Relocations Specialist infrastructure',
          'Satellite-tracked vehicles with air-ride suspension',
          'Zero data loss and full audit compliance',
          'Guaranteed Monday morning operational readiness'
        ],
        features: [
          'Pre-move asset mapping and port labeling',
          'Anti-static flight-case server packing',
          'Post-move continuity testing and user floor-support',
          'Decommissioning and sanitisation of legacy office space'
        ],
        sla: 'Weekend turnaround with Day-1 go-live guarantee',
        customRoute: '/moving-relocation-services',
        faqs: [
          {
            question: 'How do you ensure zero data loss during server moves?',
            answer: 'We verify complete offline and cloud backups before physical de-racking, secure drives in padded anti-static transit cases, and transport them under strict chain of custody.'
          }
        ]
      },
      {
        slug: 'it-infrastructure-support',
        name: 'IT Infrastructure Support',
        category: 'Office IT Support',
        categorySlug: 'office-it-support',
        shortDescription: 'Proactive management of server racks, UPS units, switches, and comms rooms.',
        longDescription: 'Your comms room is the heartbeat of your enterprise. TechSteps maintains, optimizes, and protects your on-premise infrastructure. From uninterruptible power supply (UPS) load balancing and battery health audits to server rack airflow and patch management, we ensure 99.99% infrastructure uptime.',
        benefits: [
          'Reduces unplanned hardware outages and thermal throttling',
          'Ensures clean battery backup transitions during mains power cuts',
          'Regular physical inspection and dust mitigation in comms rooms',
          'Accredited ISO 9001 and ISO 27001 operational standards'
        ],
        features: [
          'Comms cabinet audit, re-termination, and aesthetic dressing',
          'UPS battery runtime testing and load simulation',
          'Environmental temperature and humidity sensor integration',
          'Core and distribution switch firmware updates'
        ],
        sla: '24/7 infrastructure telemetry monitoring',
        faqs: [
          {
            question: 'How often should UPS backup batteries be tested?',
            answer: 'We recommend scheduled semi-annual discharge tests and continuous voltage monitoring to replace aging cells before power disruptions strike.'
          }
        ]
      },
      {
        slug: 'printer-scanner-support',
        name: 'Printer & Scanner Support',
        category: 'Office IT Support',
        categorySlug: 'office-it-support',
        shortDescription: 'Centralised network printing, secure scan-to-folder, and driver management.',
        longDescription: 'Eliminate daily printing frustrations with centralized printer and scanner management. We configure print servers, secure PIN follow-me printing, optical character recognition (OCR) scan-to-email/cloud destinations, and resolve spooler queues swiftly.',
        benefits: [
          'Resolves driver conflicts across Windows and macOS clients',
          'Restricts unauthorized printing and reduces paper waste',
          'Secure confidential PIN / badge release printing',
          'Optimized network bandwidth for large scanned PDFs'
        ],
        features: [
          'Universal print driver deployment via GPO / Intune',
          'Scan-to-SharePoint, OneDrive, and SMB repository mapping',
          'SNMP toner level monitoring and alert forwarding',
          'AirPrint and mobile printing configuration'
        ],
        sla: 'Same-day driver & spooler resolution',
        faqs: [
          {
            question: 'Do you support multi-function copiers from major brands?',
            answer: 'Yes, we manage networked devices from Canon, Xerox, HP, Ricoh, Konica Minolta, and Brother.'
          }
        ]
      }
    ]
  },
  {
    id: 'hardware-support',
    name: 'Hardware Support',
    description: 'Fleet-wide computer maintenance, certified component repairs, installations, and procurement.',
    iconName: 'hardware',
    services: [
      {
        slug: 'desktop-laptop-support',
        name: 'Desktop & Laptop Support',
        category: 'Hardware Support',
        categorySlug: 'hardware-support',
        shortDescription: 'End-to-end lifecycle care for Windows PC, Apple Mac, and mobile workstations.',
        longDescription: 'Keep your workforce equipped with fast, reliable computers. We handle workstation imaging, rapid provisioning, SSD storage expansions, memory upgrades, operating system tune-ups, and secure sanitisation at retirement.',
        benefits: [
          'Standardized OS images deployed in under 20 minutes',
          'Extended hardware lifespan saving corporate capital budgets',
          'Rapid turnarounds for broken keys, cracked screens, or power faults',
          'Seamless integration with Microsoft Intune and Apple Business Manager'
        ],
        features: [
          'Automated Windows Autopilot & Mac DEP zero-touch enrollment',
          'High-speed NVMe SSD cloning and RAM capacity upgrades',
          'Battery health diagnostics and thermal paste replenishment',
          'Loaner laptop provision during extended hardware services'
        ],
        sla: 'Next business day replacement options',
        faqs: [
          {
            question: 'Can you support both Apple Mac and Windows PC environments?',
            answer: 'Yes. Our engineers are certified across Apple MacOS/iOS ecosystems and Microsoft Windows/Windows Server environments.'
          }
        ]
      },
      {
        slug: 'hardware-repair',
        name: 'Hardware Repair',
        category: 'Hardware Support',
        categorySlug: 'hardware-support',
        shortDescription: 'Component-level repairs, motherboard fixes, screen swaps, and power circuit remediation.',
        longDescription: 'Before writing off expensive equipment, let our certified bench technicians diagnose and repair the fault. From liquid damage ultrasonic cleaning and surface-mount capacitor replacements to hinge repairs and keyboard swaps, we restore business hardware cost-effectively.',
        benefits: [
          'Up to 70% cheaper than buying brand-new replacements',
          'Certified ESD-safe electronics workshop in the UK',
          'Genuine OEM replacement components with 12-month warranty',
          'Aligned with circular economy and Scope 3 carbon reduction goals'
        ],
        features: [
          'Component-level board diagnostics and power rail repair',
          'Precision cracked screen and digitizer replacements',
          'Keyboard, trackpad, and chassis hinge rebuilding',
          'Internal fan cleaning, bearing re-lubrication, and thermal pad repasting'
        ],
        sla: '24-to-48 hour workshop turnaround',
        faqs: [
          {
            question: 'Do repairs come with a warranty?',
            answer: 'Yes, all hardware repairs and installed components include a full 12-month TechSteps parts-and-labour warranty.'
          }
        ]
      },
      {
        slug: 'hardware-installation',
        name: 'Hardware Installation',
        category: 'Hardware Support',
        categorySlug: 'hardware-support',
        shortDescription: 'Professional on-site mounting, rack cabling, and peripheral commissioning.',
        longDescription: 'Ensure new IT assets are installed correctly, safely, and cleanly. Our technicians install server rails, PDU power drops, NAS arrays, monitor arm arrays, dock setups, and network appliances adhering to strict health and safety standards.',
        benefits: [
          'Clean, color-coded cabling conforming to BICSI standards',
          'Correct thermal spacing and power phase balance in racks',
          'Immediate firmware updates and baseline benchmark testing',
          'Full asset tagging and serial registration in your ITAM system'
        ],
        features: [
          '19-inch rack mounting for 1U-4U servers and storage arrays',
          'Multi-monitor dynamic desk arm installation',
          'UPS battery backup rack mounting and power testing',
          'Asset tag barcode application and serial inventory logging'
        ],
        sla: 'Certified installation sign-off report',
        faqs: [
          {
            question: 'Will you document installed assets in our asset database?',
            answer: 'Yes. Every installed item is tagged with a barcode and recorded with model, serial, MAC address, and location details in your ITAM portal.'
          }
        ]
      },
      {
        slug: 'it-equipment-procurement',
        name: 'IT Equipment Procurement',
        category: 'Hardware Support',
        categorySlug: 'hardware-support',
        shortDescription: 'Enterprise hardware sourcing with distributor pricing and circular ITAD trade-in rebates.',
        longDescription: 'Leverage TechSteps purchasing power to procure business hardware at tier-1 distributor discounts. We source enterprise Dell, HP, Lenovo, and Apple hardware, combined with trade-in rebates from retiring your existing assets through our certified ITAD facility.',
        benefits: [
          'Direct volume pricing from authorised UK hardware distributors',
          'Offset new hardware costs with trade-in values from old devices',
          'Pre-configured and imaged before arriving at your office',
          'Option for certified refurbished enterprise gear with warranty'
        ],
        features: [
          'Laptops, desktops, workstations, and thin clients',
          'Enterprise rack servers, SAS storage, and hyperconverged nodes',
          'Managed Cisco, Aruba, and UniFi network switches',
          'Monitors, docking stations, and ergonomic workspace accessories'
        ],
        sla: 'Express 48-hour delivery on core stock',
        faqs: [
          {
            question: 'Can we offset purchase costs by trading in old company laptops?',
            answer: 'Yes! As an accredited ITAD provider, we assess your retired fleet, apply residual market rebates directly to your invoice, and securely sanitize all drives.'
          }
        ]
      }
    ]
  },
  {
    id: 'software-support',
    name: 'Software Support',
    description: 'Application deployment, OS upgrades, Microsoft 365 administration, and enterprise email security.',
    iconName: 'software',
    services: [
      {
        slug: 'software-installation',
        name: 'Software Installation',
        category: 'Software Support',
        categorySlug: 'software-support',
        shortDescription: 'Automated software rollouts, silent installation packages, and license compliance.',
        longDescription: 'Deploy business software across 10 or 1,000 devices effortlessly. We package applications for silent, zero-touch deployment using Microsoft Intune and Group Policy, verify license entitlements, and eliminate user permission bottlenecks.',
        benefits: [
          'Zero disruption: silent installs run in the background',
          'Enforces corporate license compliance and avoids vendor audits',
          'Standardized software suites across departments',
          'Removal of unapproved bloatware and shadow IT apps'
        ],
        features: [
          'MSI / Win32 application packaging for Intune and SCCM',
          'Bulk license key activation and subscription assignment',
          'Specialist software rollouts (Adobe Creative Cloud, AutoCAD, Sage)',
          'Automated dependency checks (.NET, Visual C++, Java runtimes)'
        ],
        sla: 'Automated 1-click deployment catalogues',
        faqs: [
          {
            question: 'Can you restrict end users from installing unauthorized software?',
            answer: 'Yes. We configure AppLocker and Intune application control policies to ensure only IT-approved software can execute on company endpoints.'
          }
        ]
      },
      {
        slug: 'operating-system-support',
        name: 'Operating System Support',
        category: 'Software Support',
        categorySlug: 'software-support',
        shortDescription: 'Windows 11, macOS, and Linux server management, migration, and hardening.',
        longDescription: 'Ensure your fleet runs secure, modern operating systems. TechSteps manages Windows 10 to 11 migrations, macOS enterprise upgrades, and Linux server patch baselines while safeguarding legacy application compatibility.',
        benefits: [
          'Smooth migration to Windows 11 without application breakage',
          'Adherence to UK Cyber Essentials security baselines',
          'Optimized boot times and minimized background bloat',
          'BitLocker and FileVault full-disk encryption management'
        ],
        features: [
          'Fleet OS readiness audits (TPM 2.0, Secure Boot, CPU checks)',
          'Group Policy & Configuration Profile hardening',
          'User profile migration with zero data loss',
          'Emergency OS recovery and recovery partition staging'
        ],
        sla: 'Zero-data-loss migration guarantee',
        faqs: [
          {
            question: 'How do you handle Windows 10 end-of-life migrations?',
            answer: 'We audit your current fleet, flag devices requiring upgrade or replacement, and execute staged departmental migrations to Windows 11 with comprehensive roll-back safeguards.'
          }
        ]
      },
      {
        slug: 'microsoft-365-support',
        name: 'Microsoft 365 Support',
        category: 'Software Support',
        categorySlug: 'software-support',
        shortDescription: 'Certified M365 tenant management, SharePoint structure, Teams, and Intune MDM.',
        longDescription: 'Maximize your investment in Microsoft 365. TechSteps provides certified tenant administration, setting up Conditional Access, data loss prevention (DLP), SharePoint document libraries, Microsoft Teams voice/collaboration, and Intune mobile device management.',
        benefits: [
          'UK Microsoft Certified Solutions Experts on call',
          'Secure identity protection and Conditional Access enforcement',
          'Optimized cloud collaboration without file duplication',
          'Automatic device compliance and remote wipe capabilities'
        ],
        features: [
          'Exchange Online mailbox governance & shared inbox setup',
          'SharePoint permissions, hub sites, and OneDrive sync tuning',
          'Microsoft Teams phone system and channel architecture',
          'Azure AD / Entra ID Identity Protection & Self-Service Password Reset'
        ],
        sla: 'Tier-3 Microsoft Certified partner support',
        faqs: [
          {
            question: 'Can you migrate our files from an on-premise file server to SharePoint Online?',
            answer: 'Yes, we perform complete metadata-preserving migrations using Microsoft Migration Manager, restructuring permissions and folders for intuitive team access.'
          }
        ]
      },
      {
        slug: 'email-support',
        name: 'Email Support',
        category: 'Software Support',
        categorySlug: 'software-support',
        shortDescription: 'Corporate email delivery, spam filtering, phishing defense, and SPF/DKIM/DMARC.',
        longDescription: 'Business email is your primary communication channel and top attack vector. We configure bulletproof email deliverability with SPF, DKIM, and DMARC records, deploy AI-driven phishing filters, and troubleshoot missing messages or synchronization lags.',
        benefits: [
          'Guaranteed email deliverability preventing emails hitting client spam',
          'Advanced protection against CEO spoofing and invoice fraud',
          'Seamless synchronization across desktop, web, and smartphones',
          'Compliant immutable email archiving for legal discovery'
        ],
        features: [
          'DNS DKIM / SPF / DMARC record generation and strict p=reject policy',
          'Anti-spam and advanced threat protection (ATP) link scanning',
          'PST / legacy email migration to cloud mailboxes',
          'Automated disclaimer footers and signature synchronization'
        ],
        sla: '99.99% email deliverability & hygiene',
        faqs: [
          {
            question: 'Why are our outbound company emails going into spam folders?',
            answer: 'Usually due to missing or misconfigured SPF, DKIM, or DMARC DNS records. We audit your DNS records, align keys, and implement strict sender verification so major mail providers trust your domain.'
          }
        ]
      }
    ]
  },
  {
    id: 'network-support',
    name: 'Network Support',
    description: 'Corporate Wi-Fi 6, firewall security, managed switches, and low-latency LAN/WAN connectivity.',
    iconName: 'network',
    services: [
      {
        slug: 'network-troubleshooting',
        name: 'Network Troubleshooting',
        category: 'Network Support',
        categorySlug: 'network-support',
        shortDescription: 'Deep packet inspection, bottleneck resolution, latency mitigation, and packet loss fixes.',
        longDescription: 'When internet drops, VoIP calls stutter, or local file transfers crawl, our network engineers identify the true source. We deploy packet capture tools, audit routing tables, trace switch drops, and eliminate broadcast storms.',
        benefits: [
          'Pinpoints the root cause of network slowdowns within hours',
          'Eliminates VoIP dropouts and jitter during video calls',
          'Isolates rogue devices flooding the broadcast domain',
          'Clear topology maps and bandwidth utilisation reports'
        ],
        features: [
          'Wireshark packet capture & TCP handshake analysis',
          'DNS latency and gateway hop tracing',
          'Switch port duplex/speed mismatch diagnostics',
          'VLAN tag conflict resolution and routing leak fixes'
        ],
        sla: 'Rapid packet-level triage',
        faqs: [
          {
            question: 'Can you troubleshoot issues with our Internet Service Provider (ISP)?',
            answer: 'Yes. We run line quality tests, document packet loss at upstream hops, and manage support tickets with your ISP (BT, Virgin, Vodafone, Colt) until stable service is restored.'
          }
        ]
      },
      {
        slug: 'wifi-support',
        name: 'Wi-Fi Support',
        category: 'Network Support',
        categorySlug: 'network-support',
        shortDescription: 'High-density enterprise Wi-Fi 6 coverage, heatmapping, and secure guest portals.',
        longDescription: 'Dead zones, dropped connections, and sluggish roaming have no place in a modern office. TechSteps conducts predictive and active RF heat-mapping, tunes radio channel power to prevent co-channel interference, and builds isolated guest networks.',
        benefits: [
          'Seamless 802.11k/v/r roaming without dropped video calls',
          'High device density support for boardrooms and all-hands areas',
          'Isolated, branded captive portal for office visitors',
          'WPA3 Enterprise authentication with radius verification'
        ],
        features: [
          'Ekahau RF heat-map site surveys (predictive & on-site)',
          'Band steering (5GHz / 6GHz prioritization) and minimum RSSI tuning',
          'Rogue AP detection and wireless intrusion prevention (WIPS)',
          'PoE+ switch budget calculation for access point fleets'
        ],
        sla: 'Complete signal coverage guarantee',
        faqs: [
          {
            question: 'Why does our Wi-Fi disconnect when walking between conference rooms?',
            answer: 'This is commonly due to poor roaming threshold configuration and overlapping channel power. We calibrate AP transmit power and enable fast BSS transition protocols for seamless handoffs.'
          }
        ]
      },
      {
        slug: 'router-firewall-support',
        name: 'Router & Firewall Support',
        category: 'Network Support',
        categorySlug: 'network-support',
        shortDescription: 'Next-Gen firewall policies, IPSec site-to-site VPNs, and intrusion prevention.',
        longDescription: 'Protect your enterprise perimeter against unauthorized access, ransomware probes, and data exfiltration. We configure, maintain, and audit Next-Generation Firewalls (Fortinet, Cisco Meraki, SonicWall, Sophos, and pfSense) with automated threat intelligence.',
        benefits: [
          'Robust perimeter protection conforming to Cyber Essentials Plus',
          'Secure, high-throughput encrypted VPNs for remote workers',
          'Real-time intrusion detection and botnet command blocking',
          'Regular security rule cleanups removing redundant legacy ports'
        ],
        features: [
          'Deep Packet Inspection (DPI) with SSL certificate decryption',
          'Dual-WAN automatic failover and load balancing',
          'Client-to-site WireGuard and OpenVPN configurations with MFA',
          'Content filtering, geo-blocking, and application bandwidth capping'
        ],
        sla: 'Proactive firewall security updates',
        faqs: [
          {
            question: 'Which firewall brands do you manage?',
            answer: 'We support all major enterprise firewall platforms including Fortinet FortiGate, Cisco Meraki, Sophos XGS, SonicWall, WatchGuard, and DrayTek.'
          }
        ]
      },
      {
        slug: 'lan-wan-support',
        name: 'LAN & WAN Support',
        category: 'Network Support',
        categorySlug: 'network-support',
        shortDescription: 'VLAN segmentation, managed PoE switch stacking, SD-WAN failover, and dark fibre.',
        longDescription: 'Build a bulletproof local and wide area network infrastructure. We segment your LAN into secure corporate, guest, IoT, and voice VLANs, deploy redundant switch stacks with Link Aggregation (LACP), and manage SD-WAN routes across multi-site offices.',
        benefits: [
          'Isolates vulnerable IoT hardware from sensitive financial/medical data',
          'Zero-interruption switch failover with Spanning Tree (RSTP)',
          'Automated secondary line failover during primary broadband cuts',
          'Guaranteed Quality of Service (QoS) for VoIP telephony'
        ],
        features: [
          'Layer 2 & Layer 3 managed switch configuration',
          'VLAN 802.1Q tagging and inter-VLAN access control lists (ACLs)',
          'SD-WAN multi-site mesh routing and MPLS replacement',
          'SFP+ 10Gbps optical fibre uplinks between distribution racks'
        ],
        sla: 'High-availability 99.99% LAN backbone',
        faqs: [
          {
            question: 'What is SD-WAN and how does it help multi-site businesses?',
            answer: 'SD-WAN bonds multiple internet lines (e.g. leased line + 5G backup) dynamically, switching traffic instantly during outages and routing priority apps across the fastest path at lower cost than legacy MPLS.'
          }
        ]
      }
    ]
  },
  {
    id: 'managed-it-support',
    name: 'Managed IT Support',
    description: 'Proactive 24/7 monitoring, automated vulnerability patching, and predictable IT AMC contracts.',
    iconName: 'managed',
    services: [
      {
        slug: 'proactive-it-maintenance',
        name: 'Proactive IT Maintenance',
        category: 'Managed IT Support',
        categorySlug: 'managed-it-support',
        shortDescription: 'Preventative health cycles that eradicate problems before they impact operations.',
        longDescription: 'Don’t wait for systems to fail before seeking help. Our Proactive IT Maintenance service performs daily background audits, disk defragmentation, temporary cache purges, service state verifications, and automated backup trial restorations.',
        benefits: [
          'Prevents up to 85% of common workstation and server crashes',
          'Extended hardware lifespans and smoother user experiences',
          'Routine backup verification ensuring recovery when disasters strike',
          'Fixed, predictable monthly IT expenditure'
        ],
        features: [
          'Automated daily disk health and SMART status validation',
          'Database maintenance index rebuilding and transaction log truncating',
          'Automated test restores from cloud and NAS backup repositories',
          'Monthly executive health scorecards and capacity forecasts'
        ],
        sla: 'Daily automated preventive sweeps',
        faqs: [
          {
            question: 'How does proactive maintenance save our business money?',
            answer: 'By resolving minor memory leaks, drive degradation, and certificate expirations before they cause catastrophic unbudgeted downtime and loss of employee hours.'
          }
        ]
      },
      {
        slug: 'it-monitoring',
        name: 'IT Monitoring',
        category: 'Managed IT Support',
        categorySlug: 'managed-it-support',
        shortDescription: 'Around-the-clock 24/7/365 RMM telemetry, server health tracking, and alerting.',
        longDescription: 'Our Network Operations Centre (NOC) monitors your endpoints, servers, firewalls, and cloud services 24 hours a day, 365 days a year. The moment a critical service stops or CPU temperatures spike, an alert triggers automated remediation scripts or alerts on-call engineers.',
        benefits: [
          'Immediate warning before minor issues escalate into outages',
          'Monitors critical infrastructure while your staff sleeps',
          'Granular historical metrics for compliance and audit reporting',
          'Automated self-healing remediation scripts for rapid recovery'
        ],
        features: [
          'CPU, memory, disk I/O, and storage threshold alerting',
          'Windows service and daemon state monitoring with auto-restart',
          'SSL certificate expiration countdown tracking',
          'External ping and HTTP/HTTPS synthetic availability checks'
        ],
        sla: '24/7/365 continuous telemetry',
        faqs: [
          {
            question: 'Will monitoring software slow down our staff computers?',
            answer: 'No. Our lightweight monitoring agent uses less than 0.5% CPU and a few megabytes of RAM, executing silently in the background.'
          }
        ]
      },
      {
        slug: 'patch-management',
        name: 'Patch Management',
        category: 'Managed IT Support',
        categorySlug: 'managed-it-support',
        shortDescription: 'Automated OS and third-party security updates tested and deployed in staged rings.',
        longDescription: 'Unpatched software is the #1 vector for ransomware and malware infiltration. TechSteps delivers structured Patch Management: updates are first tested in an isolated lab, then deployed in pilot rings before fleet-wide rollout, guaranteeing security without breaking business apps.',
        benefits: [
          'Guaranteed compliance with UK Cyber Essentials and ISO 27001',
          'Protects against zero-day exploits and known vulnerabilities',
          'Scheduled out-of-hours deployment with automated reboots',
          'Covers Microsoft OS and 100+ common third-party tools (Chrome, Zoom, Adobe)'
        ],
        features: [
          'Multi-ring deployment strategy (Lab > Pilot > Broad rollout)',
          'Automated third-party application patching',
          'Granular reboot schedules tailored to departmental working hours',
          'Compliance dashboards showing fleet patch percentages in real time'
        ],
        sla: '14-day zero-day remediation cadence',
        faqs: [
          {
            question: 'How do you prevent a bad Windows update from disrupting our office?',
            answer: 'We never deploy patches immediately on release. All updates are vetted and released first to a non-critical pilot ring. If an update causes an issue, we pause deployment immediately.'
          }
        ]
      },
      {
        slug: 'it-amc-services',
        name: 'IT AMC Services',
        category: 'Managed IT Support',
        categorySlug: 'managed-it-support',
        shortDescription: 'Flexible Annual Maintenance Contracts tailored to UK SMEs and enterprise fleets.',
        longDescription: 'Gain complete peace of mind with a TechSteps Annual Maintenance Contract (AMC). Enjoy unlimited remote and on-site support, dedicated Technical Account Managers, guaranteed response times, and regular strategic IT roadmapping under one simple SLA.',
        benefits: [
          'Fixed, predictable monthly operational expenditure with no hidden fees',
          'Dedicated UK Technical Account Manager who knows your systems',
          'Quarterly technology business reviews (QBR) and strategic roadmaps',
          'Discounted hardware procurement and certified ITAD collections'
        ],
        features: [
          'Unlimited remote helpdesk and phone support for all staff',
          'Scheduled regular on-site preventive visits',
          'Disaster recovery planning, cyber insurance compliance, and backup audits',
          'Executive dashboard reporting on ticket volume and resolution speeds'
        ],
        sla: 'Comprehensive SLA with guaranteed response tiers',
        faqs: [
          {
            question: 'What is included in an IT AMC contract?',
            answer: 'Our AMC contracts include unlimited remote support, proactive monitoring, patch management, anti-virus/EDR protection, regular on-site engineer visits, and strategic IT planning.'
          },
          {
            question: 'Can AMC contracts be customized for our specific company size?',
            answer: 'Yes. We customize AMC tiers based on your exact headcount, physical server counts, and whether you require 8x5 or 24x7 emergency coverage.'
          }
        ]
      }
    ]
  }
];

export const allITSubServices: ITSubService[] = itSupportCategories.flatMap((c) => c.services);

export function getITServiceBySlug(slug: string): ITSubService | undefined {
  return allITSubServices.find((s) => s.slug === slug);
}

export function getITServiceExpandedFaqs(service: ITSubService): { question: string; answer: string }[] {
  const specificFaqs = service.faqs || [];

  const commonEnterpriseFaqs = [
    {
      question: `What SLA response times do you guarantee for ${service.name}?`,
      answer: `We provide a guaranteed 15-minute response SLA for critical Priority-1 incidents affecting business operations. Qualified Tier-2 and Tier-3 engineers begin active troubleshooting immediately upon ticket logging. Routine requests and user guidance are acknowledged within 1 to 2 business hours.`
    },
    {
      question: `Is ${service.name} delivered remotely, on-site, or as a blended model?`,
      answer: `We deliver this service flexibly according to the nature of the requirement. Diagnostics, configuration, and software resolutions happen instantly via encrypted remote sessions. When physical component swaps, rack installations, or cabling adjustments are needed, our UK field engineers dispatch directly to your office.`
    },
    {
      question: `Which regions across the UK are covered for on-site engineering dispatch?`,
      answer: `Our certified field engineering fleet provides nationwide coverage across mainland UK. We maintain regional dispatch hubs across Greater London, the South East, Midlands, North West, Yorkshire, the South West, Wales, and Scotland, guaranteeing prompt on-site arrival.`
    },
    {
      question: `How does TechSteps protect company data during technical support sessions?`,
      answer: `All remote sessions require explicit end-user authorization and use end-to-end AES 256-bit encryption. TechSteps operates under certified ISO 27001 and Cyber Essentials Plus information security management systems, maintaining tamper-evident audit logs of every system interaction.`
    },
    {
      question: `Can you co-manage ${service.name} alongside our internal IT team?`,
      answer: `Yes. We frequently work under a co-managed IT framework, acting as specialized Tier-2/Tier-3 escalations, infrastructure architects, or out-of-hours coverage for internal IT directors, while leaving day-to-day internal administration with your team.`
    },
    {
      question: `What contract terms apply to ${service.name}? Are there long-term tie-ins?`,
      answer: `We believe in transparent, value-led partnerships without restrictive long-term lock-ins. You can engage us through flexible rolling monthly support agreements, prepaid engineer credit blocks, or customized Annual Maintenance Contracts (AMC) with fixed fees.`
    },
    {
      question: `How do our staff log support tickets and track resolution status?`,
      answer: `Employees can log tickets 24/7 via our branded self-service web portal, phone our dedicated UK engineer dispatch desk (+44 1784 640216), email our helpdesk, or benefit from automated telemetry alerts generated by our remote monitoring agents.`
    }
  ];

  const result = [...specificFaqs];
  for (const faq of commonEnterpriseFaqs) {
    if (!result.some((f) => f.question.toLowerCase() === faq.question.toLowerCase())) {
      result.push(faq);
    }
    if (result.length >= 10) break;
  }

  return result;
}
