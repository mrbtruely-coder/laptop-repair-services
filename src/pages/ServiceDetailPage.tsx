import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { servicesData, siteConfig } from '../config/site';
import {
  Sparkles,
  Zap,
  Check,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Wrench,
} from 'lucide-react';

interface SubCategoryItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  problems: string[];
  fee: string;
  feeNote: string;
}

const subcategoriesData: Record<string, SubCategoryItem[]> = {
  'laptop-repair': [
    {
      id: 'screen-display',
      title: 'Screen & Display Replacement',
      tag: 'OEM Display Panel',
      description:
        'Original FHD, IPS, 144Hz high-refresh rate panel replacement, backlight repair, ribbon cable troubleshooting, and zero-dead-pixel warranty.',
      problems: [
        'Cracked, broken or bleeding LCD panel',
        'Horizontal / vertical colored display lines',
        'Dim screen or complete backlight failure',
        'Flickering screen on hinge movement',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'motherboard-chip',
      title: 'Motherboard & Chip-Level Repair',
      tag: 'Chip-Level Master',
      description:
        'Component-level diagnosis with multi-meter voltage rail isolation, BGA chip reballing, power IC replacements, and short-circuit repair.',
      problems: [
        'Dead laptop / No power on pressing button',
        'Laptop turns on with black screen (No POST)',
        'Water or liquid spill corrosion damage',
        'Frequent blue screen (BSOD) & auto shutdown',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'battery-charging',
      title: 'Battery & Charging Jack Repair',
      tag: 'Power & Battery',
      description:
        'OEM genuine battery replacements with manufacturer warranty, charging port soldering, Type-C PD port repair, and power adapter testing.',
      problems: [
        'Battery draining within 15–30 minutes',
        'Loose or physically broken charging port',
        '"Plugged in, not charging" alert',
        'Swollen battery lifting laptop touchpad',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'keyboard-trackpad',
      title: 'Keyboard & Trackpad Replacement',
      tag: 'Precision Hardware',
      description:
        'Complete original keyboard replacement (backlit / chiclet), individual scissor-switch rebuilding, and high-precision glass trackpad repair.',
      problems: [
        'Multiple non-working or sticky keys',
        'Continuous typing / ghost keystrokes',
        'Unresponsive or erratic jumping cursor',
        'Liquid damage causing keyboard short circuit',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'ssd-ram-upgrade',
      title: 'High-Speed SSD & RAM Upgrade',
      tag: 'Speed Boost',
      description:
        'Blazing-fast NVMe M.2 / SATA SSD upgrades, dual-channel RAM expansion, and seamless 1-to-1 data & OS cloning without losing files.',
      problems: [
        'Slow boot time taking 5+ minutes',
        '100% disk usage freezing software',
        'Laptop crashing when opening multiple apps',
        'Hard drive clicking noise or failure warning',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'hinge-fabrication',
      title: 'Hinge Repair & Body Fabrication',
      tag: 'Structural Care',
      description:
        'Internal brass nut refitting, laser metal bracket rebuilding, cracked chassis welding, and smooth opening tension calibration.',
      problems: [
        'Broken or jammed display hinge',
        'Body panels opening up when lid moves',
        'Cracked corner chassis near screw mounts',
        'Loose display wobbling while typing',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
  ],
  'computer-repair': [
    {
      id: 'desktop-motherboard',
      title: 'Desktop Motherboard & CPU Repair',
      tag: 'Core Diagnostic',
      description:
        'VRM phase repairs, bent CPU socket pin realignment, BIOS chip re-flashing, CMOS battery fixes, and diagnostic beep code analysis.',
      problems: [
        'PC powers on but shows "No Signal"',
        'Frequent blue screen errors (BSOD)',
        'Random rebooting under normal workloads',
        'Front USB / Audio ports unresponsive',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'smps-power',
      title: 'SMPS Power Supply Replacement',
      tag: '80-Plus Certified',
      description:
        'Power load calibration, burnt capacitor isolation, high-efficiency 80-Plus certified SMPS replacement, and surge protection testing.',
      problems: [
        'PC completely dead with no fan rotation',
        'Burning smell or sparks from back unit',
        'System abruptly cuts off during gaming',
        'Unstable voltage causing drive corruptions',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'gpu-servicing',
      title: 'Gaming Graphics Card (GPU) Servicing',
      tag: 'Thermal Servicing',
      description:
        'GPU heatsink de-dusting, high-performance thermal paste repasting, thermal pad replacement, blower fan fixes, and PCIe diagnostics.',
      problems: [
        'GPU temperature throttling above 85°C',
        'Screen tearing or game artifacts',
        'Fan rattling loudly or not spinning',
        'Driver crashes during rendering tasks',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'pc-assembly',
      title: 'Custom PC Assembly & Cable Management',
      tag: 'Pro Builder',
      description:
        'Full custom gaming / editing PC assembly, liquid AIO cooler installation, clean velcro back-panel cable management, and BIOS setup.',
      problems: [
        'New PC components bought but unbuilt',
        'Messy internal airflow causing heat spikes',
        'AIO liquid pump gurgling or leaking',
        'XMP RAM profile not running at full speed',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
  ],
  'networking': [
    {
      id: 'structured-cabling',
      title: 'Structured CAT6 Office Cabling',
      tag: 'Enterprise Cabling',
      description:
        'Structured CAT6 / CAT6A concealed conduit cabling, keystones termination, patch panel punch-down, and Fluke cable speed validation.',
      problems: [
        'Intermittent connection drops across desks',
        'Damaged or loose RJ45 wall faceplates',
        'Slow local network file transfer speeds',
        'Messy unorganized office floor cables',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'mesh-wifi',
      title: 'Mesh Wi-Fi & Access Point Setup',
      tag: 'Zero Dead Zones',
      description:
        'Gigabit ceiling Access Points (Ubiquiti UniFi, TP-Link Omada), seamless mesh roaming, Wi-Fi 6 channel tuning, and dead zone elimination.',
      problems: [
        'Weak Wi-Fi signal in specific rooms / floors',
        'Frequent disconnection while moving around',
        'Bandwidth choking during video calls',
        'Router overheating with 20+ connected devices',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'server-rack',
      title: 'Server Rack Assembly & Switch Routing',
      tag: 'Infrastructure',
      description:
        'Wall-mount / floor-standing network rack installation, cable dressing, managed switch VLAN configuration, and surge PDU setup.',
      problems: [
        'Spaghetti tangled cables inside server room',
        'Unlabeled switch ports causing IT confusion',
        'Switch port burnout or loop storms',
        'No backup power routing for networking hubs',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'multi-wan-firewall',
      title: 'Multi-WAN Router & Firewall Security',
      tag: '100% Uptime',
      description:
        'Dual-ISP failover configuration (never lose internet), guest network isolation, VPN tunnel setup, and firewall port protection.',
      problems: [
        'Internet downtime halting office work',
        'Unauthorized devices accessing staff network',
        'Unable to connect remotely to office files',
        'Bandwidth abuse slowing down primary billing',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
  ],
  'cctv-repair-installation': [
    {
      id: 'ip-camera-install',
      title: '4K IP & HD Camera Installation',
      tag: 'Surveillance Setup',
      description:
        'Professional outdoor / indoor mounting, concealed PVC conduit piping, weatherproof junction boxes, and wide-angle blind spot coverage.',
      problems: [
        'New premises requiring CCTV security',
        'Existing cameras with blind spots',
        'Damaged outdoor wiring due to weather',
        'Water vapor inside dome camera lens',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'dvr-nvr-recovery',
      title: 'DVR / NVR Hard Drive Recording Recovery',
      tag: 'Video Storage',
      description:
        'Surveillance hard drive sector testing (WD Purple/SkyHawk), continuous recording loop setup, firmware update, and footage recovery.',
      problems: [
        'DVR continuously beeping with HDD error',
        'Past dates recording footage missing',
        'DVR not turning on or stuck on boot logo',
        'Forgotten DVR admin password unlock',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'mobile-viewing',
      title: 'Mobile Remote Live Viewing Setup',
      tag: 'Cloud Sync',
      description:
        'P2P cloud bridge configuration, router port forwarding, static IP binding, and encrypted live streaming on iOS, Android & Windows.',
      problems: [
        'Cameras offline when away from home Wi-Fi',
        '"Device offline" error on mobile application',
        'Motion detection push notifications not firing',
        'Slow video buffering over 4G/5G networks',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
    {
      id: 'cctv-wiring-smps',
      title: 'CCTV Power Supply & Wire Repair',
      tag: 'Circuit Repair',
      description:
        'Multi-channel 12V SMPS replacement, BNC & DC connector re-crimping, video balun replacements, and night-vision IR LED repairs.',
      problems: [
        'CCTV screen shows black screen / "No Video"',
        'Flickering video or rolling lines on screen',
        'Night vision IR LEDs not glowing in the dark',
        'Overheated power supply shutting down cameras',
      ],
      fee: 'From ₹299 Diagnostic Fee',
      feeNote: 'Adjusted in Bill',
    },
  ],
};

const serviceImages: Record<string, string> = {
  'laptop-repair':
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
  'computer-repair':
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
  'networking':
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  'cctv-repair-installation':
    'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
};

export const ServiceDetailPage: React.FC = () => {
  const { serviceSlug, subCategorySlug } = useParams<{
    serviceSlug: string;
    subCategorySlug?: string;
  }>();
  const navigate = useNavigate();
  const service = serviceSlug ? servicesData[serviceSlug] : null;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const subcategories = subcategoriesData[service.id] || [];

  const activeSubFromParam = subCategorySlug
    ? subcategories.find(
        (s) =>
          s.id === subCategorySlug ||
          s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === subCategorySlug
      )
    : null;

  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string | null>(
    activeSubFromParam?.id || null
  );

  React.useEffect(() => {
    if (activeSubFromParam) {
      setSelectedSubServiceId(activeSubFromParam.id);
    }
  }, [subCategorySlug, activeSubFromParam]);

  const heroImage =
    serviceImages[service.id] ||
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80';

  const handleSubSelect = (sub: SubCategoryItem) => {
    setSelectedSubServiceId(sub.id);
    navigate(`/services/${service.slug}/${sub.id}`);
  };

  const handleBookingClick = (sub: SubCategoryItem) => {
    navigate(`/services/${service.slug}/${sub.id}/book`);
  };

  return (
    <>
      <SEO
        title={`${activeSubFromParam ? `${activeSubFromParam.title} | ` : ''}${service.title} | Doorstep Service`}
        description={`Explore all available repair subcategories and upfront pricing for ${service.title}. 90-min technician arrival across Hyderabad, Bengaluru, Chennai, and Vizag with 90-day warranty.`}
        canonicalPath={`/services/${service.slug}${activeSubFromParam ? `/${activeSubFromParam.id}` : ''}`}
        keywords={[
          `${service.shortTitle.toLowerCase()} doorstep`,
          `${service.shortTitle.toLowerCase()} near me`,
          'motherboard chip repair',
          'laptop hardware servicing',
          'genuine replacement parts',
          'doorstep IT repair'
        ]}
      />

      {/* ========================================================
          1. DARK TOP HEADER (Exact Reference Layout)
         ======================================================== */}
      <section className="bg-[#06223A] text-white pt-8 pb-10 border-b border-[#0A3356]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          {/* Breadcrumbs */}
          <div className="flex justify-center text-xs text-slate-300">
            <Breadcrumbs
              items={[
                { label: 'Services', path: '/services' },
                { label: service.shortTitle, path: `/services/${service.slug}` },
                ...(activeSubFromParam
                  ? [{ label: activeSubFromParam.title }]
                  : [{ label: 'Subcategories' }]),
              ]}
            />
          </div>

          {/* Region Tag */}
          <div className="text-[11px] font-black uppercase tracking-widest text-[#22C55E]">
            HYDERABAD • BENGALURU • CHENNAI • VIZAG DOORSTEP REPAIRS
          </div>

          {/* Big Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {service.title}
          </h1>

          {/* Tagline */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            {service.tagline}
          </p>

          {/* Category Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <Link
              to="/services"
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              All Categories ({Object.keys(servicesData).length})
            </Link>
            {Object.values(servicesData).map((s) => {
              const isActive = s.id === service.id;
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#22C55E] text-[#06223A] shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {s.shortTitle}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MAIN SUBCATEGORY CONTENT AREA (Clean & Focused)
         ======================================================== */}
      <section className="py-8 sm:py-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back Button */}
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#06223A] bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs hover:shadow-xs transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Service Categories</span>
            </Link>
          </div>

          {/* Overview Hero Card (Exact Reference Structure) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#16A34A] text-xs font-bold border border-[#22C55E]/30">
                <Zap className="w-3.5 h-3.5" />
                <span>ALL SUBCATEGORIES START FROM ₹299 • SAME-DAY FIX</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#06223A]">
                {service.shortTitle} Subcategories
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Select your exact repair type below. Our certified doorstep technicians carry original brand spare parts, diagnostic multimeters, and precision tools directly to your home or office.
              </p>

              {/* 3 Trust Points with Checkmarks */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
                  <span>Starts from ₹299 (Adjusted in Bill)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
                  <span>90-Day Warranty</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
                  <span>Genuine OEM Spares</span>
                </span>
              </div>
            </div>

            {/* Right Side Tech Photo */}
            <div className="md:col-span-5 h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
              <img
                src={heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Verified On-Site IT Technicians</span>
                </span>
              </div>
            </div>
          </div>

          {/* Available Subcategory Services Section */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#06223A]">
              Available Subcategory Services ({subcategories.length})
            </h3>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map((sub) => {
                const isSelected = selectedSubServiceId === sub.id;

                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSubSelect(sub)}
                    className={`bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all flex flex-col justify-between shadow-sm cursor-pointer group relative ${
                      isSelected
                        ? 'border-[#22C55E] ring-2 ring-[#22C55E]/20 bg-slate-50/50'
                        : 'border-slate-200 hover:border-[#22C55E]'
                    }`}
                  >
                    <div className="space-y-3.5">
                      {/* Top Row: Pill Tag + Price Badge + Selected Status */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] bg-[#22C55E]/10 border border-[#22C55E]/30 px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span>{sub.tag}</span>
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-extrabold text-[#06223A] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                            Starts from ₹299
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#22C55E] px-2.5 py-0.5 rounded-full shadow-2xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Selected</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-[#06223A] group-hover:text-[#16A34A] transition-colors leading-snug">
                          {sub.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>

                      {/* Common Problems Solved */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                          COMMON PROBLEMS SOLVED:
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {sub.problems.map((prob, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5 stroke-[3]" />
                              <span>{prob}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Fee Box & Book Button */}
                    <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">
                            STARTS FROM
                          </div>
                          <div className="text-sm font-extrabold text-[#06223A] flex items-center gap-1.5">
                            <span>{sub.fee}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#16A34A] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-0.5 rounded-md">
                          {sub.feeNote}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookingClick(sub);
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-[#06223A] hover:bg-[#0A3356] active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Book {sub.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Help Bar (Call & WhatsApp) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-bold text-[#06223A]">
                Need help selecting the right service?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Our senior technicians are ready to advise you on diagnosis and part availability.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Call: {siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                  `Hi, I need assistance choosing a subcategory for ${service.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
