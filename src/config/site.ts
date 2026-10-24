export interface ServiceInfo {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  commonProblems: { problem: string; solution: string }[];
  deliverables: string[];
  processSteps: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
}

export interface CityInfo {
  id: string;
  slug: string;
  name: string;
  state: string;
  popularName?: string;
  description: string;
  leadTime: string;
  serviceHub: string;
  address: string;
  coverageRadius: string;
  localities: string[];
  helpline: string;
  email: string;
  serviceHighlights: string[];
}

export interface LocalityInfo {
  name: string;
  slug: string;
  distance: string;
  fullName: string;
}

export function parseLocality(locStr: string): LocalityInfo {
  const match = locStr.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  const name = match ? match[1].trim() : locStr.trim();
  const distance = match && match[2] ? match[2].trim() : '';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return { name, slug, distance, fullName: locStr };
}

export const siteConfig = {
  brandName: "TECHFIX",
  legalName: "TechFix Computer & IT Solutions",
  brandSubtitle: "Computer, Laptop, Networking & CCTV Specialists",
  domain: "https://techfixservices.in",
  phoneDisplay: "+91 95156 61677",
  phoneRaw: "+919515661677",
  whatsappDisplay: "+91 95156 61677",
  whatsappRaw: "919515661677",
  supportEmail: "support@techfixservices.in",
  workingHours: "Monday – Sunday: 8:30 AM to 8:30 PM",
  warrantyHighlight: "Up to 90 Days Service Warranty on hardware replacements",
  serviceModes: [
    {
      id: "doorstep",
      label: "Doorstep / On-Site Service",
      description: "Technician visits your home or office for immediate inspection & repair."
    },
    {
      id: "pickup",
      label: "Free Pickup & Drop",
      description: "Insured courier pickup for complex chip-level motherboard work."
    },
    {
      id: "workshop",
      label: "Direct Lab Walk-In",
      description: "Bring your device directly to our certified repair center."
    }
  ]
};

export const servicesData: Record<string, ServiceInfo> = {
  "laptop-repair": {
    id: "laptop-repair",
    slug: "laptop-repair",
    title: "Laptop Repair & Servicing",
    shortTitle: "Laptop Repair",
    tagline: "Expert chip-level motherboard diagnostics, screen replacements, and performance servicing.",
    description: "We provide comprehensive diagnosis and hardware repair for all major laptop brands including Dell, HP, Lenovo, ASUS, Acer, and Apple MacBook. From broken hinges to component-level motherboard repairs, our certified engineers ensure reliable, transparent fixes.",
    iconName: "Laptop",
    commonProblems: [
      { problem: "No Power / Laptop Won't Turn On", solution: "Motherboard DC power IC, charging jack, or power rail capacitor replacement." },
      { problem: "Broken / Cracked Display Screen", solution: "OEM FHD, IPS, 144Hz high-refresh rate screen replacement with zero-dead-pixel assurance." },
      { problem: "Severe Overheating & Fan Noise", solution: "Internal deep cleaning, blower fan replacement, and high-performance Arctic thermal paste repasting." },
      { problem: "Battery Not Charging / Fast Draining", solution: "OEM genuine battery replacement and internal charging circuit diagnosis." },
      { problem: "Liquid / Water Spill Damage", solution: "Ultrasonic motherboard bath, short-circuit trace repair, and corrosion removal." },
      { problem: "Sluggish Speed & 100% Disk Usage", solution: "High-speed NVMe/SATA SSD upgrade and dual-channel RAM expansion." },
      { problem: "Broken Hinge or Body Fabrication", solution: "Precision metal bracket refitting and durable structural chassis fabrication." }
    ],
    deliverables: [
      "Chip-level motherboard repair (BGA / SMD re-soldering)",
      "Original display panel replacement",
      "Keyboard & Precision trackpad replacement",
      "Hard drive to high-speed NVMe SSD cloning",
      "Cooling system overhaul & thermal repaste",
      "Operating system restoration & data backup",
      "Hinge structural rebuilding without chassis replacement"
    ],
    processSteps: [
      { step: "1. Intake & Initial Inspection", detail: "We log your machine symptoms and run basic voltage and POST checks." },
      { step: "2. Precision Diagnosis", detail: "Lab-level multi-meter testing to isolate the exact faulty component." },
      { step: "3. Transparent Quotation", detail: "We share an exact itemized cost before starting any physical repair." },
      { step: "4. Repair & Stress Testing", detail: "Hardware repair followed by 24-hour thermal, memory, and stress benchmarks." }
    ],
    faqs: [
      {
        question: "How long does a typical laptop repair take?",
        answer: "Standard repairs like screen replacement, SSD upgrades, and battery changes are usually completed within 2 to 4 hours. Complex chip-level motherboard or liquid spill repairs typically take 24 to 48 hours for proper testing."
      },
      {
        question: "Do you use original OEM replacement parts?",
        answer: "Yes, we source authentic OEM panels, batteries, keyboards, and components with manufacturer-backed warranties."
      },
      {
        question: "Will my hard drive data be kept confidential and safe?",
        answer: "Absolutely. We follow strict data confidentiality protocols. For software or motherboard repairs, we never wipe your storage without prior written consent, and offer pre-repair data backups."
      },
      {
        question: "Do you offer doorstep laptop repair?",
        answer: "Yes, our certified field technicians offer doorstep visits in Bengaluru, Vizag, and Chennai for diagnostic checks, OS issues, RAM/SSD upgrades, and screen replacements."
      }
    ]
  },
  "computer-repair": {
    id: "computer-repair",
    slug: "computer-repair",
    title: "Desktop & Computer Repair",
    shortTitle: "Computer Repair",
    tagline: "Reliable desktop diagnostics, custom workstation fixes, SMPS power solutions, and OS recovery.",
    description: "Complete repair and maintenance services for assembled desktop PCs, gaming rigs, and office enterprise workstations. From constant blue-screen (BSOD) crashes to burnt power supplies, we keep your desktop computing setup at peak stability.",
    iconName: "Monitor",
    commonProblems: [
      { problem: "Desktop Turns On But Shows 'No Signal'", solution: "RAM re-seating, graphics card diagnostic, CMOS reset, or motherboard VRM repair." },
      { problem: "Sudden Power Off / Burning Smell", solution: "Immediate SMPS (power supply unit) failure isolation and 80-Plus certified replacement." },
      { problem: "Frequent Blue Screen (BSOD) Errors", solution: "Memory error diagnosis (MemTest), corrupted registry rebuild, or storage sector check." },
      { problem: "Excessive CPU Throttling & Noise", solution: "AIO liquid cooler refill/pump repair, heatsink de-dusting, and thermal compound renewal." },
      { problem: "Failed Hard Drive & Boot Failure", solution: "Drive sector recovery, operating system repair, and high-speed SSD data migration." }
    ],
    deliverables: [
      "SMPS Power Supply replacement and wattage calibration",
      "Motherboard capacitor, VRM, and PCIe slot repairs",
      "Dedicated GPU diagnostics and thermal servicing",
      "Custom PC re-cabling, airflow optimization, and cleaning",
      "RAID array setup and enterprise data preservation",
      "Dual-boot and professional OS installation with drivers"
    ],
    processSteps: [
      { step: "1. Power & POST Check", detail: "Testing power rails, diagnostic beep codes, and motherboard debug LEDs." },
      { step: "2. Modular Hardware Swap", detail: "Isolating bad memory modules, PSU, GPU, or CPU thermal throttles." },
      { step: "3. Approval & Repair", detail: "Replacement of failed components with transparent pricing." },
      { step: "4. Full Load Benchmarking", detail: "Executing Prime95 and 3DMark benchmarks to guarantee system stability." }
    ],
    faqs: [
      {
        question: "Can you upgrade an older desktop to run modern software?",
        answer: "Yes! Installing an NVMe/SATA SSD, upgrading DDR4/DDR5 RAM, and swapping outdated power supplies or graphics cards can dramatically revitalize an older system at a fraction of the cost of a new PC."
      },
      {
        question: "Do you repair custom liquid-cooled gaming PCs?",
        answer: "Yes, our technicians handle custom loop maintenance, AIO liquid cooler troubleshooting, leak prevention, and GPU thermal re-padding."
      },
      {
        question: "Can an engineer visit our office for desktop troubleshooting?",
        answer: "Yes, we support both home users and commercial offices across Bengaluru, Vizag, and Chennai with on-site technician dispatches."
      }
    ]
  },
  "networking": {
    id: "networking",
    slug: "networking",
    title: "Networking Installation & Troubleshooting",
    shortTitle: "Networking Support",
    tagline: "Enterprise-grade Wi-Fi coverage, structured CAT6 cabling, router/firewall configuration, and rack setups.",
    description: "Professional network infrastructure setup and repair for homes, multi-story villas, retail stores, and commercial offices. We eliminate dead zones, fix intermittent disconnects, install structured patch panels, and configure secure router/firewall systems.",
    iconName: "Network",
    commonProblems: [
      { problem: "Wi-Fi Dead Zones & Weak Signals", solution: "Deployment of Mesh Wi-Fi 6 nodes and strategically positioned Access Points (APs)." },
      { problem: "Intermittent Internet Drops & High Ping", solution: "LAN cable continuity testing, faulty switch port replacement, and ISP gateway tuning." },
      { problem: "Messy Server Rack / Cable Spaghetti", solution: "Structured CAT6 patch panel re-termination, velcro cable dressing, and port labeling." },
      { problem: "Office Network Vulnerabilities", solution: "VLAN segmentation, guest network isolation, and firewall router security policies." },
      { problem: "Slow File Transfers Between Office PCs", solution: "Gigabit / 10G managed switch upgrades and optimized local NAS network routes." }
    ],
    deliverables: [
      "Structured CAT6 / CAT6A / Fiber Optic cabling and termination",
      "Enterprise Access Point (Ubiquiti UniFi, TP-Link Omada, Cisco) deployment",
      "Network rack assembly, cable dressing, and patch panel punch-down",
      "Managed switch configuration (VLANs, QoS, Port trunking)",
      "Multi-WAN failover router setup for 100% office internet uptime",
      "Site survey and Wi-Fi heatmapping for full-facility coverage"
    ],
    processSteps: [
      { step: "1. On-Site Physical Survey", detail: "We map floor plans, wall conduits, structural interference, and drop locations." },
      { step: "2. Architecture Design", detail: "Drafting router, switch, and AP placement for optimal speed and zero dead zones." },
      { step: "3. Cabling & Hardware Mounting", detail: "Clean conduit running, patch panel punch-down, and rack installation." },
      { step: "4. Speed & Latency Validation", detail: "Fluke cable certification, throughput testing, and remote management handover." }
    ],
    faqs: [
      {
        question: "Do you install cabling for commercial office setups?",
        answer: "Yes, we provide end-to-end structured cabling, server racks, managed switches, and patch panels for startups, small businesses, and co-working spaces."
      },
      {
        question: "How do you solve weak Wi-Fi signals in large residential properties?",
        answer: "We deploy unified ceiling-mounted Access Points connected via wired Gigabit ethernet backhaul or robust mesh systems, ensuring uninterrupted roaming without signal degradation."
      },
      {
        question: "Can you configure dual-broadband failover?",
        answer: "Yes, we configure load-balancing multi-WAN routers so that if your primary ISP drops, traffic automatically routes through your backup line without business interruption."
      }
    ]
  },
  "cctv-repair-installation": {
    id: "cctv-repair-installation",
    slug: "cctv-repair-installation",
    title: "CCTV Installation, Maintenance & Repair",
    shortTitle: "CCTV Services",
    tagline: "High-definition IP camera setups, DVR/NVR recording recovery, remote mobile live viewing, and AMCs.",
    description: "Reliable surveillance solutions for residential apartments, independent homes, retail outlets, warehouses, and commercial complexes. We install, troubleshoot, and service HD analog and 4K IP cameras from top manufacturers such as Hikvision, CP PLUS, and Dahua.",
    iconName: "Video",
    commonProblems: [
      { problem: "CCTV Camera Showing Black Screen or 'No Video'", solution: "BNC/RJ45 connector re-crimping, 12V SMPS power channel diagnosis, or sensor replacement." },
      { problem: "DVR / NVR Beeping & Not Recording", solution: "Surveillance hard drive (WD Purple/Seagate SkyHawk) sector testing, firmware update, or drive replacement." },
      { problem: "Cannot View Cameras on Mobile Phone", solution: "Static IP / P2P cloud bridge re-configuration, router port forwarding, and mobile app syncing." },
      { problem: "Blurry Picture or Poor Night Vision", solution: "Infrared IR LED array replacement, lens focal recalibration, and weatherproof dome cleaning." },
      { problem: "Damaged Outdoor CCTV Wiring", solution: "UV-resistant conduit replacement, weatherproof junction box refitting, and shielded cabling." }
    ],
    deliverables: [
      "IP & HD Analog camera mounting with clean conceal-piping",
      "DVR / NVR installation, configuration, and storage optimization",
      "Remote live viewing configuration on iOS, Android, and Windows PC",
      "High-capacity surveillance-grade Hard Disk installation",
      "Motion detection alerts and email notification setup",
      "Annual Maintenance Contracts (AMC) for businesses and residential communities"
    ],
    processSteps: [
      { step: "1. Security Angle Assessment", detail: "Identifying entry points, blind spots, lighting conditions, and cable routes." },
      { step: "2. Equipment Selection", detail: "Selecting proper focal length (2.8mm/3.6mm/6mm), night-vision IR range, and storage capacity." },
      { step: "3. Installation & Conduit Routing", detail: "Professional mounting with hidden conduit piping and surge-protected power units." },
      { step: "4. Calibration & Mobile App Handover", detail: "Live focus adjustment, recording retention setup, and configuring client mobile apps." }
    ],
    faqs: [
      {
        question: "Can I watch my CCTV camera footage when away from home/office?",
        answer: "Yes, we configure secure P2P cloud viewing and mobile applications on your smartphones and laptops with password-protected encryption."
      },
      {
        question: "How many days of recording will my hard drive store?",
        answer: "Depending on whether you use H.265+ compression, motion-triggered recording, and hard drive size (1TB to 8TB), storage typically lasts between 15 to 45 days before auto-looping."
      },
      {
        question: "Do you repair existing CCTV systems installed by other vendors?",
        answer: "Yes, we troubleshoot and repair any existing CCTV setup, including replacing bad power supplies, fixing broken cables, adding extra cameras, and resetting locked DVR passwords."
      }
    ]
  }
};

export const citiesData: Record<string, CityInfo> = {
  bengaluru: {
    id: "bengaluru",
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    popularName: "Bangalore",
    address: "27th Main Rd, opp. KLM Fashion Mall, Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
    coverageRadius: "25 km",
    description: "Serving India's Silicon Valley with rapid doorstep computer diagnostics, laptop motherboard servicing, structured IT networking, and IP surveillance for tech professionals and corporate enterprises within a 25 km service radius.",
    leadTime: "Same-Day Doorstep Service across 25 km radius of HSR Layout",
    serviceHub: "27th Main Rd, opp. KLM Fashion Mall, Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
    localities: [
      "HSR Layout (0 km)", "BTM Layout (3 km)", "Koramangala (4 km)", "Bellandur (4 km)",
      "Sarjapur Road (5 km)", "Jayanagar (6 km)", "JP Nagar (7 km)", "Electronic City (8 km)",
      "Indiranagar (8 km)", "Domlur (7 km)", "Marathahalli (9 km)", "Bannerghatta Road (8 km)",
      "Bommanahalli (3 km)", "Kudlu Gate (4 km)", "Whitefield (14 km)", "Mahadevapura (11 km)",
      "Banashankari (10 km)", "MG Road / CBD (9 km)", "Malleshwaram (14 km)", "Rajajinagar (15 km)",
      "Hebbal (18 km)"
    ],
    helpline: "+91 98450 12345",
    email: "bengaluru@techfixservices.in",
    serviceHighlights: [
      "Walk-in lab & service center: 27th Main Rd, opp. KLM Fashion Mall, HSR Layout Sector 2",
      "Dedicated tech corridor on-site engineers with mobile diagnostic toolkits within 25 km",
      "Specialized in MacBook & high-performance developer laptop servicing",
      "High-speed office mesh Wi-Fi & CAT6 cabling for startups and co-working hubs",
      "Surveillance camera maintenance for commercial premises and villas"
    ]
  },
  vizag: {
    id: "vizag",
    slug: "vizag",
    name: "Visakhapatnam (Vizag)",
    state: "Andhra Pradesh",
    popularName: "Vizag",
    address: "50-81-57/1, Virat Computers and mobiles, Seethammapeta Main Rd, Ganesh Nagar, Seetamma Peta, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016",
    coverageRadius: "25 km",
    description: "Delivering trusted laptop chip-level repair, desktop troubleshooting, industrial networking, and CCTV security installations across Visakhapatnam within a 25 km service radius.",
    leadTime: "Fast On-Site & Lab Response across 25 km radius of Seethammapeta",
    serviceHub: "50-81-57/1, Virat Computers and mobiles, Seethammapeta Main Rd, Ganesh Nagar, Seetamma Peta, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016",
    localities: [
      "Seethammapeta (0 km)", "Dwaraka Nagar (1 km)", "Seethammadhara (1.5 km)", "Asilmetta (1 km)",
      "Akkayyapalem (1 km)", "CBM Compound (1.5 km)", "Siripuram (2.5 km)", "MVP Colony (3.5 km)",
      "Maddilapalem (2.5 km)", "Waltair Uplands (3 km)", "Muralinagar (4 km)", "Kancharapalem (3 km)",
      "NAD Junction (6 km)", "Gopalapatnam (7 km)", "Marripalem (4 km)", "Simhachalam (9 km)",
      "Madhurawada (12 km)", "Rushikonda (13 km)", "Gajuwaka (14 km)", "Pendurthi (16 km)",
      "Kurmannapalem (18 km)"
    ],
    helpline: "+91 98450 12345",
    email: "vizag@techfixservices.in",
    serviceHighlights: [
      "Service center: 50-81-57/1, Virat Computers and mobiles, Seethammapeta Main Rd, Dwaraka Nagar",
      "Rapid dispatch across 25 km radius including Dwaraka Nagar, MVP Colony, Gajuwaka, and Madhurawada",
      "Specialized motherboard repair for laptops damaged by coastal humidity",
      "Complete warehouse, store, and home CCTV camera installations",
      "Desktop computer SMPS and power outage hardware diagnostics"
    ]
  },
  chennai: {
    id: "chennai",
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    popularName: "Chennai",
    address: "MG Road, Chennai, Tamil Nadu",
    coverageRadius: "25 km",
    description: "Reliable computer and laptop servicing, IT cabling, and comprehensive CCTV maintenance throughout Chennai within a 25 km service radius.",
    leadTime: "Quick On-Site Dispatch across 25 km radius of MG Road",
    serviceHub: "MG Road, Chennai, Tamil Nadu",
    localities: [
      "MG Road (0 km)", "Adyar (2 km)", "Besant Nagar (2.5 km)", "Thiruvanmiyur (3 km)",
      "Kotturpuram (3 km)", "Mylapore (4 km)", "Alwarpet (4.5 km)", "T. Nagar (5 km)",
      "Velachery (5 km)", "Guindy (6 km)", "Nungambakkam (7 km)", "Perungudi OMR (6 km)",
      "Thoraipakkam (8 km)", "Sholinganallur (12 km)", "Anna Nagar (11 km)", "Porur (12 km)",
      "Meenambakkam (11 km)", "Pallavaram (13 km)", "Chromepet (15 km)", "Tambaram (18 km)",
      "Medavakkam (12 km)"
    ],
    helpline: "+91 98450 12345",
    email: "chennai@techfixservices.in",
    serviceHighlights: [
      "Service desk & walk-in facility: MG Road, Chennai",
      "Direct technician coverage within 25 km along OMR tech corridors and central Chennai",
      "Anti-corrosive thermal cleaning for coastal laptop reliability",
      "Business network rack setup and CAT6 structured cabling",
      "Residential apartment community CCTV upgrade and DVR hard drive restoration"
    ]
  },
  nellore: {
    id: "nellore",
    slug: "nellore",
    name: "Nellore",
    state: "Andhra Pradesh",
    popularName: "Nellore",
    address: "Trunk Road, Near VRC Centre, Nellore, Andhra Pradesh 524001",
    coverageRadius: "20 km",
    description: "Doorstep computer and laptop repair, certified chip-level diagnostics, office networking, CCTV installation, and quick technician dispatch within 90 minutes in Nellore.",
    leadTime: "Doorstep Dispatch in Nellore within 90 minutes",
    serviceHub: "Trunk Road, Near VRC Centre, Nellore, Andhra Pradesh",
    localities: [
      "Trunk Road (0 km)", "VRC Centre (0.5 km)", "Dargamitta (1.5 km)", "Magunta Layout (2 km)",
      "Pogathota (1.5 km)", "Stonehousepet (2 km)", "Balaji Nagar (2.5 km)", "Vedayapalem (3 km)",
      "Harmathpet (2 km)", "Ramamurthy Nagar (3.5 km)", "Nellore Rural (5 km)", "Kovur (6 km)"
    ],
    helpline: "+91 95156 61677",
    email: "nellore@doorstepservice.in",
    serviceHighlights: [
      "Doorstep technician dispatch in Nellore within 90 minutes",
      "No booking fee — Free registration & inspection",
      "Verified local Nellore certified engineers",
      "Computer, Laptop, Networking, and CCTV surveillance repair"
    ]
  }
};

export const whyChooseUsPoints = [
  {
    title: "Transparent Diagnosis & Upfront Quotes",
    description: "No hidden charges or surprise invoices. We inspect your device, isolate the root cause, and obtain your explicit approval before performing any repairs.",
    icon: "ShieldCheck"
  },
  {
    title: "Genuine Parts & Service Warranty",
    description: "We use tested, authentic replacement components backed by up to 90 days service warranty for guaranteed peace of mind.",
    icon: "Award"
  },
  {
    title: "Component-Level Repair Expertise",
    description: "Instead of costly full-motherboard replacements, our certified technicians repair chips, ICs, and circuits to save you money.",
    icon: "Cpu"
  },
  {
    title: "Flexible Service Options",
    description: "Choose doorstep technician dispatch at your home or office, free pickup and drop, or visit our clean, equipped diagnostic lab.",
    icon: "Truck"
  },
  {
    title: "100% Data Confidentiality",
    description: "Your business and personal data stays strictly confidential with non-disclosure practices and zero unauthorized storage access.",
    icon: "Lock"
  },
  {
    title: "Verified Local Engineers",
    description: "Background-verified, experienced IT professionals equipped with professional testing tools and anti-static equipment.",
    icon: "UserCheck"
  }
];

export const generalFaqs = [
  {
    question: "Which cities do you currently serve?",
    answer: "We actively provide laptop repair, desktop repair, networking, and CCTV services across Bengaluru (Karnataka), Visakhapatnam (Vizag, Andhra Pradesh), and Chennai (Tamil Nadu)."
  },
  {
    question: "Do you service all laptop and computer brands?",
    answer: "Yes, our certified engineers repair Dell, HP, Lenovo, ASUS, Acer, Apple MacBook, MSI, Toshiba, Samsung, and all custom-assembled desktop computers."
  },
  {
    question: "How do I request a repair service?",
    answer: "You can submit an enquiry through our online form, call our helpline at +91 98450 12345, or tap the WhatsApp button for instant assistance."
  },
  {
    question: "What happens if a device cannot be repaired?",
    answer: "We follow a clear diagnostic policy. If an older device is beyond economical repair or parts are obsolete, our engineer will explain the situation honestly without pressing you into unviable expenses."
  },
  {
    question: "Do you provide CCTV camera installation for homes as well as businesses?",
    answer: "Yes! We install and service CCTV security cameras for individual apartments, independent villas, retail shops, schools, warehouses, and corporate facilities."
  },
  {
    question: "What is your warranty policy on repairs?",
    answer: "Most hardware replacements (displays, keyboards, batteries, hard drives, SMPS) carry standard 30 to 90 days warranty coverage against defects."
  }
];
