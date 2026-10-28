import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Please run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

/**
 * @typedef {Object} RouteSeo
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {string[]} keywords
 * @property {string} h1
 * @property {string} summary
 * @property {string} [city]
 * @property {string} [service]
 * @property {string} [locality]
 */

const routesToPrerender = [
  {
    url: '/',
    title: 'Doorstep Laptop & Computer Repair Services | Certified Engineers',
    description: 'Fast doorstep repair for laptops, desktop PCs, CCTV & MacBooks in Bengaluru, Hyderabad, Vizag, Chennai & Vijayawada. Verified technicians at your home in 90 mins with 90-day warranty. Call 9515661677.',
    keywords: ['laptop repair services', 'doorstep laptop repair', 'computer repair doorstep', 'chip level motherboard repair', 'cctv camera installation'],
    h1: 'Professional Doorstep Laptop & Computer Repair Services',
    summary: 'Expert chip-level motherboard diagnostics, screen replacement, power issues, data recovery, and IT networking delivered right to your doorstep.'
  },
  {
    url: '/service-center',
    title: 'Laptop & Computer Service Centers Across India | Doorstep Repairs',
    description: 'Find certified laptop, desktop and CCTV service centers in Bengaluru, Hyderabad, Vizag, Chennai and Vijayawada. 90-minute doorstep service with warranty.',
    keywords: ['laptop service center', 'service center', 'computer repair doorstep', 'laptop repair doorstep service', 'desktop pc technician service'],
    h1: 'Certified Laptop & Computer Service Centers Near You',
    summary: 'Locate local diagnostic labs and doorstep service technicians across major cities in South India.'
  },
  {
    url: '/services',
    title: 'All Repair Services | Laptop, Desktop, Mac, Networking & CCTV',
    description: 'Explore comprehensive repair and maintenance services for laptops, desktop computers, Wi-Fi networking, and CCTV surveillance systems.',
    keywords: ['repair services', 'laptop repair', 'computer repair', 'cctv installation', 'it networking service'],
    h1: 'Complete Range of IT Hardware & Security Services',
    summary: 'From motherboard micro-soldering to enterprise office networking and CCTV surveillance.'
  },
  {
    url: '/services/laptop-repair',
    title: 'Doorstep Laptop Repair & Screen Replacement | Certified Technicians',
    description: 'Certified chip-level diagnostics, screen replacement, liquid damage recovery, and battery replacement for all laptop brands at your doorstep.',
    keywords: ['laptop repair service', 'doorstep laptop repair', 'laptop screen replacement', 'chip level motherboard repair', 'laptop repair doorstep service'],
    h1: 'Fast Doorstep Laptop Repair & Chip-Level Servicing',
    summary: 'Reliable repair for Dell, HP, Lenovo, ASUS, Acer, and Apple MacBook with genuine parts and up to 90 days warranty.',
    service: 'Laptop Repair'
  },
  {
    url: '/services/computer-repair',
    title: 'Desktop PC & Computer Repair Services | Hardware & OS Diagnostics',
    description: 'Complete repair and maintenance for assembled desktop PCs, gaming rigs, and office enterprise workstations. SMPS, GPU, and motherboard solutions.',
    keywords: ['computer repair service', 'desktop repair', 'pc repair doorstep', 'smps replacement', 'desktop troubleshooting'],
    h1: 'Desktop PC & Computer Repair Services',
    summary: 'Specialized hardware troubleshooting, power supply replacement, blue screen crash fixes, and workstation tuning.',
    service: 'Computer Repair'
  },
  {
    url: '/services/networking',
    title: 'Office IT Networking & Structured Cabling Services | Wi-Fi Setup',
    description: 'End-to-end structured cabling, server racks, managed switches, and mesh Wi-Fi solutions for residential homes and corporate office spaces.',
    keywords: ['office networking', 'structured cabling', 'wifi mesh setup', 'router installation', 'network rack setup'],
    h1: 'Structured IT Networking & High-Speed Wi-Fi Solutions',
    summary: 'Reliable network design, CAT6 cabling, dual-broadband failover, and enterprise network management.',
    service: 'Networking'
  },
  {
    url: '/services/cctv-repair-installation',
    title: 'CCTV Camera Installation & Repair Services | IP & HD Surveillance',
    description: 'Professional CCTV camera installation, DVR/NVR configuration, and surveillance camera repair for residential and commercial spaces.',
    keywords: ['cctv camera installation', 'cctv repair service', 'doorstep cctv service', 'cctv camera doorstep', 'cctv repair'],
    h1: 'CCTV Camera Installation, Repair & AMC Services',
    summary: 'HD analog and 4K IP security cameras, cloud remote viewing on mobile, and night vision camera maintenance.',
    service: 'CCTV Installation'
  },
  {
    url: '/bengaluru',
    title: 'Doorstep Laptop Repair in Bengaluru | Fast Same Day Service',
    description: 'Doorstep laptop and computer repair across Bengaluru including HSR Layout, Koramangala, Whitefield, Indiranagar, and Electronic City. Call 9515661677.',
    keywords: ['laptop repair in bengaluru', 'computer repair bengaluru', 'doorstep laptop service bengaluru', 'laptop service center bengaluru', 'best laptop repair bengaluru'],
    h1: 'Doorstep Laptop & Computer Repair in Bengaluru',
    summary: 'Serving Bengaluru tech corridors with rapid on-site motherboard diagnostics, screen replacement, and MacBook repair.',
    city: 'Bengaluru'
  },
  {
    url: '/hyderabad',
    title: 'Doorstep Laptop Repair in Hyderabad | Fast Same Day Service',
    description: 'Certified doorstep laptop, Mac, desktop & CCTV repair across Hyderabad & Secunderabad. OEM parts, 90-day warranty, 90-min technician arrival.',
    keywords: ['laptop repair in hyderabad', 'computer repair hyderabad', 'doorstep laptop service hyderabad', 'laptop service center hyderabad', 'cctv camera service hyderabad'],
    h1: 'Doorstep Laptop & Computer Repair in Hyderabad',
    summary: 'Local verified technicians across Chanda Nagar, Madhapur, Hitec City, Gachibowli, Kukatpally, and Secunderabad.',
    city: 'Hyderabad'
  },
  {
    url: '/vizag',
    title: 'Doorstep Laptop Repair in Vizag | Same Day Service & Warranty',
    description: 'Expert doorstep laptop, desktop and CCTV repair in Visakhapatnam (Vizag). Certified chip-level technicians reach you in 90 mins. Call 9515661677.',
    keywords: ['laptop repair in vizag', 'computer repair vizag', 'doorstep laptop service vizag', 'laptop service center vizag', 'best laptop repair vizag'],
    h1: 'Doorstep Laptop & Computer Repair in Visakhapatnam (Vizag)',
    summary: 'Fast on-site repair across Dwaraka Nagar, MVP Colony, Gajuwaka, Madhurawada, and Seethammadhara.',
    city: 'Visakhapatnam'
  },
  {
    url: '/chennai',
    title: 'Doorstep Laptop Repair in Chennai | Certified Engineers & Warranty',
    description: 'Doorstep laptop and desktop repair across Chennai including OMR, Adyar, Velachery, Anna Nagar, and T. Nagar. High-quality parts and 90-day warranty.',
    keywords: ['laptop repair in chennai', 'computer repair chennai', 'doorstep laptop service chennai', 'laptop service center chennai', 'best laptop repair chennai'],
    h1: 'Doorstep Laptop & Computer Repair in Chennai',
    summary: 'Certified laptop diagnostics, motherboard micro-soldering, anti-corrosive cleaning, and CCTV installation across Chennai.',
    city: 'Chennai'
  },
  {
    url: '/vijayawada',
    title: 'Doorstep Laptop Repair in Vijayawada | Same Day Service',
    description: 'Expert doorstep computer and laptop repair across Vijayawada including Benz Circle, MG Road, Bhavanipuram, and Patamata. Call 9515661677.',
    keywords: ['laptop repair in vijayawada', 'computer repair vijayawada', 'doorstep laptop service vijayawada', 'laptop service center vijayawada', 'best laptop repair vijayawada'],
    h1: 'Doorstep Laptop & Computer Repair in Vijayawada',
    summary: 'Verified technicians at your doorstep in 90 mins for laptop screen replacement, motherboard repair, and CCTV setups in Vijayawada.',
    city: 'Vijayawada'
  },
  {
    url: '/book-service',
    title: 'Book Laptop & Computer Repair Service Online | Doorstep Technician',
    description: 'Schedule certified doorstep technician in 90 seconds. Select your city, device problem, and preferred time slot for instant doorstep support.',
    keywords: ['book service', 'book laptop repair', 'doorstep repair booking', 'laptop technician near me', 'online service booking'],
    h1: 'Book Your Doorstep Hardware Repair Service',
    summary: 'Instant online booking for laptop repair, computer diagnostics, networking, and CCTV installation with transparent pricing.'
  }
];

console.log(`Starting static pre-rendering for ${routesToPrerender.length} routes...`);

for (const route of routesToPrerender) {
  const canonicalUrl = `https://laptoprepairsservices.com${route.url === '/' ? '' : route.url}`;
  
  // Build realistic semantic initial HTML for bot crawlers
  const prerenderedBody = `
    <div id="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#ffffff;background:#041624;">
      <header style="border-bottom:1px solid #1e293b;padding-bottom:20px;margin-bottom:30px;">
        <h1 style="font-size:2rem;font-weight:700;margin-bottom:12px;color:#22C55E;">${route.h1}</h1>
        <p style="font-size:1.1rem;line-height:1.6;color:#94a3b8;">${route.summary}</p>
      </header>
      <main>
        <section style="margin-bottom:30px;">
          <h2 style="font-size:1.4rem;color:#38bdf8;margin-bottom:10px;">Service Highlights & Coverage</h2>
          <p style="line-height:1.7;color:#cbd5e1;">${route.description}</p>
          <div style="margin-top:20px;">
            <a href="/book-service" style="display:inline-block;padding:12px 24px;background:#22C55E;color:#041624;font-weight:700;text-decoration:none;border-radius:8px;margin-right:15px;">Book Doorstep Service</a>
            <a href="tel:+919515661677" style="display:inline-block;padding:12px 24px;background:#1e293b;color:#ffffff;font-weight:600;text-decoration:none;border-radius:8px;border:1px solid #334155;">Call Helpline: +91 95156 61677</a>
          </div>
        </section>
        <footer style="margin-top:40px;border-top:1px solid #1e293b;padding-top:20px;font-size:0.9rem;color:#64748b;">
          <p>Laptop Repairs & Services | Doorstep IT Hardware & Surveillance Support | Serving Bengaluru, Hyderabad, Vizag, Chennai & Vijayawada.</p>
        </footer>
      </main>
    </div>
  `;

  // Inject meta tags and initial content into template
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  
  // Replace Description
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);
  
  // Replace Keywords
  html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${route.keywords.join(', ')}" />`);
  
  // Replace Canonical Link or Insert
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Update Open Graph tags
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);
  }

  // Insert initial HTML inside root container
  html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`);

  // Determine output file path
  let targetFile;
  if (route.url === '/') {
    targetFile = path.join(distDir, 'index.html');
  } else {
    const routeClean = route.url.startsWith('/') ? route.url.slice(1) : route.url;
    const targetDir = path.join(distDir, routeClean);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    targetFile = path.join(targetDir, 'index.html');
  }

  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`✓ Pre-rendered: ${route.url} -> ${path.relative(distDir, targetFile)}`);
}

console.log('Static pre-rendering complete successfully!');
