import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { citiesData, servicesData, siteConfig } from '../config/site';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Laptop,
  Monitor,
  Network,
  Video,
  AlertCircle,
  Sparkles,
  Clock,
  Wrench
} from 'lucide-react';

export const CityServicePage: React.FC = () => {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug: string }>();

  const city = citySlug ? citiesData[citySlug] : null;
  const service = serviceSlug ? servicesData[serviceSlug] : null;

  if (!city || !service) {
    return <Navigate to="/locations" replace />;
  }

  const iconConfig: Record<string, { icon: React.ReactNode; badgeClass: string }> = {
    'laptop-repair': {
      icon: <Laptop className="w-8 h-8 text-[#24160E]" />,
      badgeClass: 'icon-badge-sand',
    },
    'computer-repair': {
      icon: <Monitor className="w-8 h-8 text-[#FAF6F0]" />,
      badgeClass: 'icon-badge-clay',
    },
    'networking': {
      icon: <Network className="w-8 h-8 text-[#FAF6F0]" />,
      badgeClass: 'icon-badge-sage',
    },
    'cctv-repair-installation': {
      icon: <Video className="w-8 h-8 text-[#E2B98E]" />,
      badgeClass: 'icon-badge-3d',
    },
  };

  const currentIcon = iconConfig[service.id] || {
    icon: <Wrench className="w-8 h-8 text-[#FAF6F0]" />,
    badgeClass: 'icon-badge-clay',
  };

  // Unique SEO titles & descriptions exactly following the prompt guidelines
  const getCityServiceMeta = () => {
    const key = `${city.id}-${service.id}`;
    switch (key) {
      case 'bengaluru-laptop-repair':
        return {
          title: 'Laptop Repair in Bengaluru (HSR Layout, Koramangala) | Fast Doorstep Chip-Level Service',
          desc: 'Expert doorstep laptop repair in Bengaluru. Chip-level motherboard diagnostics, OEM screen replacement, and battery fixes across Koramangala, Indiranagar, Whitefield, and HSR Layout with 90-day warranty.',
          keywords: ['laptop repair Bengaluru', 'laptop service HSR Layout', 'motherboard chip repair Bengaluru', 'laptop screen replacement Koramangala', 'MacBook repair Bengaluru']
        };
      case 'bengaluru-computer-repair':
        return {
          title: 'Computer Repair in Bengaluru | Desktop & PC Services | SMPS & Motherboard Fixes',
          desc: 'Professional desktop and computer repair services in Bengaluru. Expert SMPS replacement, motherboard fixes, and workstation troubleshooting for tech workers and businesses across tech corridors.',
          keywords: ['computer repair Bengaluru', 'desktop service Bengaluru', 'PC troubleshooting HSR Layout', 'SMPS replacement Bengaluru', 'custom PC repair Bengaluru']
        };
      case 'bengaluru-networking':
        return {
          title: 'Office Networking & Cabling in Bengaluru | Enterprise Wi-Fi 6 & CAT6 Solutions',
          desc: 'Structured CAT6 cabling, enterprise Wi-Fi 6 mesh setups, server rack assembly, and firewall router configuration for startups and commercial offices across Bengaluru.',
          keywords: ['office networking Bengaluru', 'structured cabling Bengaluru', 'CAT6 network cabling HSR Layout', 'Wi-Fi installation Bengaluru', 'server rack setup Bengaluru']
        };
      case 'bengaluru-cctv-repair-installation':
        return {
          title: 'CCTV Installation & Repair in Bengaluru | HD & IP Security Camera Systems',
          desc: 'Commercial and residential CCTV camera installation, DVR/NVR hard drive repair, and remote mobile viewing setup across Bengaluru homes, tech parks, and commercial spaces.',
          keywords: ['CCTV installation Bengaluru', 'security camera repair Bengaluru', 'DVR NVR repair HSR Layout', 'IP camera setup Bengaluru', 'CCTV AMC Bengaluru']
        };
      case 'vizag-laptop-repair':
        return {
          title: 'Laptop Repair in Vizag (Dwaraka Nagar, MVP Colony) | Chip-Level Motherboard Servicing',
          desc: 'Reliable laptop repair in Visakhapatnam (Vizag). Chip-level motherboard diagnostics, anti-corrosion chemical servicing, and OEM screen replacements in Dwaraka Nagar, MVP Colony & Gajuwaka.',
          keywords: ['laptop repair Vizag', 'laptop service Dwaraka Nagar Visakhapatnam', 'motherboard repair Vizag', 'laptop screen replacement MVP Colony', 'anti-corrosion laptop cleaning Vizag']
        };
      case 'vizag-computer-repair':
        return {
          title: 'Computer Repair in Vizag (Visakhapatnam) | Desktop Troubleshooting & IT Support',
          desc: 'Need computer repair in Visakhapatnam? Contact us for computer troubleshooting, SMPS power unit fixes, hardware upgrades, and enterprise desktop maintenance in Greater Vizag.',
          keywords: ['computer repair Vizag', 'desktop service Visakhapatnam', 'PC repair Dwaraka Nagar', 'computer motherboard repair Vizag', 'SMPS power supply Vizag']
        };
      case 'vizag-networking':
        return {
          title: 'Networking Services in Vizag | Structured IT Cabling & Commercial Wi-Fi',
          desc: 'Commercial and residential Wi-Fi networking, server rack cabling, patch panel punch-down, and internet troubleshooting in Visakhapatnam and industrial zones.',
          keywords: ['networking services Vizag', 'structured cabling Visakhapatnam', 'office Wi-Fi setup Vizag', 'CAT6 LAN cabling Dwaraka Nagar', 'router firewall setup Vizag']
        };
      case 'vizag-cctv-repair-installation':
        return {
          title: 'CCTV Camera Installation in Visakhapatnam (Vizag) | CCTV Repair & DVR Recovery',
          desc: 'Reliable HD & IP CCTV surveillance solutions, DVR hard drive recovery, and camera maintenance across Visakhapatnam homes, stores, and coastal warehouses.',
          keywords: ['CCTV installation Vizag', 'security camera repair Visakhapatnam', 'DVR repair Dwaraka Nagar', 'CCTV technician Vizag', 'outdoor CCTV camera setup Vizag']
        };
      case 'chennai-laptop-repair':
        return {
          title: 'Doorstep Laptop Repair in Chennai (OMR, Velachery, T Nagar) | Hardware Servicing',
          desc: 'Fast doorstep laptop repair in Chennai. Screen replacement, battery fixes, anti-humidity cleaning, and chip-level motherboard restoration across OMR, Velachery, T Nagar, and Guindy.',
          keywords: ['laptop repair Chennai', 'doorstep laptop service OMR Chennai', 'laptop screen replacement Velachery', 'motherboard repair T Nagar', 'MacBook service Chennai']
        };
      case 'chennai-computer-repair':
        return {
          title: 'Computer Repair in Chennai | Desktop Troubleshooting & Hardware Diagnostics',
          desc: 'Expert desktop PC repair and hardware diagnostics in Chennai. SMPS replacements, BSOD resolutions, GPU servicing, and custom PC repairs along the IT expressway.',
          keywords: ['computer repair Chennai', 'desktop service OMR Chennai', 'PC repair Velachery', 'SMPS power supply replacement Chennai', 'BSOD error fix Chennai']
        };
      case 'chennai-networking':
        return {
          title: 'Networking Services in Chennai | Office Cabling & Enterprise Wi-Fi Support',
          desc: 'High-speed structured CAT6 cabling, patch panel organization, network rack setup, and office network troubleshooting throughout Chennai tech parks.',
          keywords: ['networking services Chennai', 'structured cabling OMR Chennai', 'office Wi-Fi setup Chennai', 'CAT6 cabling Guindy', 'managed switch configuration Chennai']
        };
      case 'chennai-cctv-repair-installation':
        return {
          title: 'CCTV Installation & Repair in Chennai | Commercial & Home Security Systems',
          desc: 'Professional CCTV installation, camera troubleshooting, DVR recording recovery, and mobile streaming setup across Chennai apartments, villas, and corporate offices.',
          keywords: ['CCTV installation Chennai', 'security camera service OMR Chennai', 'DVR repair Velachery', 'IP camera setup Chennai', 'CCTV maintenance AMC Chennai']
        };
      case 'nellore-laptop-repair':
        return {
          title: 'Laptop Repair in Nellore (Trunk Road, VRC Centre) | 90-Min Doorstep Dispatch',
          desc: 'Doorstep laptop repair in Nellore. Chip-level motherboard diagnostics, screen replacement, and battery servicing across Trunk Road, VRC Centre, Magunta Layout & Dargamitta. 90-min dispatch.',
          keywords: ['laptop repair Nellore', 'laptop screen replacement Nellore', 'doorstep laptop service Trunk Road Nellore', 'chip level motherboard repair Nellore', 'laptop repair VRC Centre']
        };
      case 'nellore-computer-repair':
        return {
          title: 'Computer & Desktop Repair in Nellore | Fast Hardware Diagnostics',
          desc: 'Reliable desktop computer repair in Nellore. SMPS replacement, motherboard fixes, Windows OS recovery, and PC tuning across Trunk Road, Balaji Nagar & Magunta Layout.',
          keywords: ['computer repair Nellore', 'desktop service Nellore', 'PC repair Trunk Road Nellore', 'SMPS power supply replacement Nellore']
        };
      case 'nellore-networking':
        return {
          title: 'Networking & Wi-Fi Setup in Nellore | Home & Commercial IT Solutions',
          desc: 'Structured CAT6 network cabling, high-speed Wi-Fi router setup, and LAN troubleshooting for businesses, retail stores, and residences across Nellore.',
          keywords: ['networking setup Nellore', 'office Wi-Fi installation Nellore', 'CAT6 cabling Nellore', 'router configuration Nellore']
        };
      case 'nellore-cctv-repair-installation':
        return {
          title: 'CCTV Installation & Repair in Nellore | Security Camera Setup & DVR Fix',
          desc: 'Professional CCTV camera installation, DVR/NVR hard drive repair, and mobile live viewing setup across Nellore homes, shops, and warehouses.',
          keywords: ['CCTV installation Nellore', 'security camera repair Nellore', 'DVR repair Nellore', 'IP camera setup Trunk Road Nellore']
        };
      default:
        return {
          title: `${service.shortTitle} in ${city.name} | Doorstep Service & Repair`,
          desc: `Professional ${service.title.toLowerCase()} in ${city.name}. Reliable diagnosis, genuine spares, and verified technician dispatch across ${city.localities.slice(0, 4).join(', ')}.`,
          keywords: [`${service.shortTitle.toLowerCase()} ${city.name}`, `${service.title.toLowerCase()} near me`, `doorstep ${service.shortTitle.toLowerCase()} ${city.name}`]
        };
    }
  };

  const meta = getCityServiceMeta();

  // Localized contextual notes per city
  const localizedInsights: Record<string, string> = {
    bengaluru: 'Our Bengaluru dispatch network specifically caters to high-demand corporate professionals, startups, and remote software engineers. We stock genuine displays, RAM/SSD upgrades, and maintain specialized diagnostic rigs for fast turnaround across Outer Ring Road and tech corridors.',
    vizag: 'Operating in Visakhapatnam means our technicians pay special attention to coastal salt humidity corrosion on laptop motherboards and desktop SMPS units. We apply anti-corrosive chemical baths and conformal coating during servicing to maximize hardware longevity.',
    chennai: 'Serving Chennai’s extensive IT corridor along OMR, GST Road, and central business hubs, our field engineers travel equipped with portable diagnostic analyzers and replacement modules for same-day on-site troubleshooting.',
    nellore: 'Providing direct 90-minute doorstep service coverage across Trunk Road, VRC Centre, Dargamitta, and Magunta Layout. Certified field technicians arrive equipped with genuine spares, diagnostic multimeters, and offer no-fee doorstep visit registration.'
  };

  const localizedFaqs = [
    {
      question: `Do you provide doorstep ${service.shortTitle} across all areas of ${city.name}?`,
      answer: `Yes, our technicians cover key localities in ${city.name} including ${city.localities.slice(0, 5).join(', ')} and surrounding regions within a 25 km radius for on-site diagnosis and repair.`
    },
    {
      question: `How quickly can a technician reach my location in ${city.name}?`,
      answer: `Depending on the time of booking and your locality, our dispatch team typically schedules doorstep visits within 2 to 4 hours, or you can opt for free pickup and drop.`
    },
    {
      question: `What warranty do I receive on ${service.shortTitle} in ${city.name}?`,
      answer: `All hardware replacement parts (screens, batteries, motherboards, SMPS, storage) come with up to 90 days service warranty backed by our central support desk.`
    }
  ];

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.desc}
        canonicalPath={`/${city.slug}/${service.slug}`}
        keywords={meta.keywords}
        breadcrumbs={[
          { name: 'Locations', url: '/locations' },
          { name: city.name, url: `/locations/${city.slug}` },
          { name: `${service.shortTitle} in ${city.name}`, url: `/${city.slug}/${service.slug}` },
        ]}
        city={city.name}
        state={city.state}
        serviceName={`${service.title} in ${city.name}`}
        faqs={localizedFaqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Locations', path: '/locations' },
          { label: city.name, path: `/locations/${city.slug}` },
          { label: `${service.shortTitle} in ${city.name}` },
        ]}
      />

      {/* Hero Header with Nature Palette */}
      <section className="py-12 sm:py-16 bg-[#12231A] border-b border-[#E2B98E]/15 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#7AA27D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E2B98E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-[#E2B98E]" />
                <span>{city.name} Regional IT Hub</span>
                <span className="text-[#FAF6F0]/60">• 25 km Radial Coverage</span>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl ${currentIcon.badgeClass} flex items-center justify-center flex-shrink-0 shadow-xl`}>
                  {currentIcon.icon}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
                    {service.shortTitle} in {city.name}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#D2DCD2] leading-relaxed max-w-3xl">
                {meta.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <div className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-2 rounded-full border border-[#7AA27D]/30 text-[#FAF6F0]">
                  <CheckCircle2 className="w-4 h-4 text-[#7AA27D]" />
                  <span>{city.leadTime} Doorstep Visits</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-2 rounded-full border border-[#E2B98E]/30 text-[#FAF6F0]">
                  <ShieldCheck className="w-4 h-4 text-[#E2B98E]" />
                  <span>Up to 90 Days Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-2 rounded-full border border-[#E2B98E]/30 text-[#FAF6F0]">
                  <Clock className="w-4 h-4 text-[#E2B98E]" />
                  <span>Verified Spares & On-Site Diagnostics</span>
                </div>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="lg:col-span-4 clay-card p-6 sm:p-7 rounded-3xl border border-[#E2B98E]/30 shadow-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B98E] font-bold">
                  {city.name} Regional Support Desk
                </span>
                <h3 className="text-lg font-bold text-[#FAF6F0]">
                  {city.popularName || city.name} Helpline
                </h3>
              </div>
              <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                Connect directly with our local coordinator at {city.serviceHub} for immediate diagnostic booking.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 sand-btn-3d text-[#24160E] font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md group"
                >
                  <Phone className="w-4 h-4 text-[#24160E]" />
                  <span>Call {city.helpline}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(`Hello TechFix, I need ${service.title} in ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Local Insights & Coverage with Nature Palette */}
      <section className="py-14 sm:py-20 bg-[#12231A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Localized insight box */}
          <div className="p-6 sm:p-8 rounded-3xl nature-panel border border-[#E2B98E]/20 space-y-3 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/25 text-[#E2B98E] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
              <span>Regional Engineering Context</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAF6F0]">
              Why Local Expertise Matters for {service.shortTitle} in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#D2DCD2] leading-relaxed">
              {localizedInsights[city.id] || city.description}
            </p>
          </div>

          {/* Common Problems Solved */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block mb-1">
                Common Symptoms
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                Frequently Diagnosed {service.shortTitle} Issues in {city.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.commonProblems.slice(0, 6).map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#14281E] border border-[#E2B98E]/15 hover:border-[#E2B98E]/30 transition-all shadow-md">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#FAF6F0] mb-2">
                    <div className="w-6 h-6 rounded-lg bg-[#6E4331]/40 border border-[#E2B98E]/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-3.5 h-3.5 text-[#E2B98E]" />
                    </div>
                    <span>{item.problem}</span>
                  </div>
                  <p className="text-xs text-[#D2DCD2] leading-relaxed pl-8">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Localities Served (Within 25 km Radius) */}
          <div className="p-6 sm:p-8 rounded-3xl nature-panel border border-[#E2B98E]/25 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#FAF6F0]">
                Doorstep {service.shortTitle} Coverage Across {city.name} Localities (25 km Radius)
              </h3>
              <span className="text-xs text-[#7AA27D] font-semibold bg-[#7AA27D]/15 px-3 py-1 rounded-full border border-[#7AA27D]/30 w-fit">
                Hub: {city.serviceHub}
              </span>
            </div>
            <p className="text-xs text-[#D2DCD2] mb-5 leading-relaxed">
              Our mobile engineers are dispatched from our hub at <strong className="text-[#E2B98E] font-medium">{city.address}</strong> to all neighbourhoods strictly within a 25 km radius:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {city.localities.map((loc, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-[#12231A] border border-[#E2B98E]/20 text-[#FAF6F0]/90 flex items-center gap-1.5 shadow-sm hover:border-[#E2B98E]/50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E2B98E]" />
                  <span>{loc}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Lead Booking Form Preloaded with City & Service */}
          <div>
            <EnquiryForm
              initialCity={city.id}
              initialService={service.id}
              title={`Request ${service.shortTitle} in ${city.name}`}
              subtitle={`Tell us your ${city.name} address, preferred service slot date and time. Choose your discount offer and our coordinator will confirm dispatch.`}
            />
          </div>

        </div>
      </section>

      {/* Localized FAQs */}
      <FAQAccordion
        items={localizedFaqs}
        title={`${service.shortTitle} in ${city.name} - FAQs`}
        subtitle={`Everything you need to know about getting ${service.shortTitle.toLowerCase()} in ${city.name}.`}
      />
    </>
  );
};
