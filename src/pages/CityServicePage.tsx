import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { citiesData, servicesData, siteConfig, parseLocality } from '../config/site';
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
  Wrench,
  ArrowRight,
  Calendar
} from 'lucide-react';

export const CityServicePage: React.FC = () => {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug: string }>();

  const city = citySlug ? citiesData[citySlug] : null;
  const service = serviceSlug ? servicesData[serviceSlug] : null;

  if (!city || !service) {
    return <Navigate to="/service-center" replace />;
  }

  const iconConfig: Record<string, { icon: React.ReactNode }> = {
    'laptop-repair': {
      icon: <Laptop className="w-8 h-8 text-white" />,
    },
    'computer-repair': {
      icon: <Monitor className="w-8 h-8 text-white" />,
    },
    'networking': {
      icon: <Network className="w-8 h-8 text-white" />,
    },
    'cctv-repair-installation': {
      icon: <Video className="w-8 h-8 text-white" />,
    },
  };

  const currentIcon = iconConfig[service.id] || {
    icon: <Wrench className="w-8 h-8 text-white" />,
  };

  // Unique SEO titles & descriptions
  const getCityServiceMeta = () => {
    const key = `${city.id}-${service.id}`;
    switch (key) {
      case 'bengaluru-laptop-repair':
        return {
          title: 'Laptop Repair in Bengaluru | Doorstep Chip-Level Motherboard Service',
          desc: 'Doorstep laptop repair in Bengaluru. Chip-level motherboard diagnostics, OEM screen replacement, and battery fixes across Koramangala, Indiranagar, Whitefield, and HSR Layout with 90-day warranty.',
          keywords: ['laptop repair Bengaluru', 'laptop service HSR Layout', 'motherboard chip repair Bengaluru', 'laptop screen replacement Koramangala', 'MacBook repair Bengaluru']
        };
      case 'bengaluru-computer-repair':
        return {
          title: 'Computer Repair in Bengaluru | Desktop PC & SMPS Motherboard Fixes',
          desc: 'Professional desktop and computer repair services in Bengaluru. Expert SMPS replacement, motherboard fixes, and workstation troubleshooting for tech workers and businesses across tech corridors.',
          keywords: ['computer repair Bengaluru', 'desktop service Bengaluru', 'PC troubleshooting HSR Layout', 'SMPS replacement Bengaluru', 'custom PC repair Bengaluru']
        };
      case 'bengaluru-networking':
        return {
          title: 'Office Networking & Cabling in Bengaluru | Enterprise Wi-Fi 6 Setup',
          desc: 'Structured CAT6 cabling, enterprise Wi-Fi 6 mesh setups, server rack assembly, and firewall router configuration for startups and commercial offices across Bengaluru.',
          keywords: ['office networking Bengaluru', 'structured cabling Bengaluru', 'CAT6 network cabling HSR Layout', 'Wi-Fi installation Bengaluru', 'server rack setup Bengaluru']
        };
      case 'bengaluru-cctv-repair-installation':
        return {
          title: 'CCTV Installation & Repair in Bengaluru | HD & IP Security Cameras',
          desc: 'Commercial and residential CCTV camera installation, DVR/NVR hard drive repair, and remote mobile viewing setup across Bengaluru homes, tech parks, and commercial spaces.',
          keywords: ['CCTV installation Bengaluru', 'security camera repair Bengaluru', 'DVR NVR repair HSR Layout', 'IP camera setup Bengaluru', 'CCTV AMC Bengaluru']
        };
      case 'vizag-laptop-repair':
        return {
          title: 'Laptop Repair in Vizag | Chip-Level Motherboard & Screen Servicing',
          desc: 'Reliable laptop repair in Visakhapatnam (Vizag). Chip-level motherboard diagnostics, anti-corrosion chemical servicing, and OEM screen replacements in Dwaraka Nagar, MVP Colony & Gajuwaka.',
          keywords: ['laptop repair Vizag', 'laptop service Dwaraka Nagar Visakhapatnam', 'motherboard repair Vizag', 'laptop screen replacement MVP Colony', 'anti-corrosion laptop cleaning Vizag']
        };
      case 'vizag-computer-repair':
        return {
          title: 'Computer Repair in Vizag | Desktop Troubleshooting & Hardware Support',
          desc: 'Need computer repair in Visakhapatnam? Contact us for computer troubleshooting, SMPS power unit fixes, hardware upgrades, and enterprise desktop maintenance in Greater Vizag.',
          keywords: ['computer repair Vizag', 'desktop service Visakhapatnam', 'PC repair Dwaraka Nagar', 'computer motherboard repair Vizag', 'SMPS power supply Vizag']
        };
      case 'vizag-networking':
        return {
          title: 'Networking Services in Vizag | Structured IT Cabling & Office Wi-Fi',
          desc: 'Commercial and residential Wi-Fi networking, server rack cabling, patch panel punch-down, and internet troubleshooting in Visakhapatnam and industrial zones.',
          keywords: ['networking services Vizag', 'structured cabling Visakhapatnam', 'office Wi-Fi setup Vizag', 'CAT6 LAN cabling Dwaraka Nagar', 'router firewall setup Vizag']
        };
      case 'vizag-cctv-repair-installation':
        return {
          title: 'CCTV Camera Installation in Vizag | CCTV Repair & DVR Data Recovery',
          desc: 'Reliable HD & IP CCTV surveillance solutions, DVR hard drive recovery, and camera maintenance across Visakhapatnam homes, stores, and coastal warehouses.',
          keywords: ['CCTV installation Vizag', 'security camera repair Visakhapatnam', 'DVR repair Dwaraka Nagar', 'CCTV technician Vizag', 'outdoor CCTV camera setup Vizag']
        };
      case 'chennai-laptop-repair':
        return {
          title: 'Doorstep Laptop Repair in Chennai | Motherboard & Screen Servicing',
          desc: 'Fast doorstep laptop repair in Chennai. Screen replacement, battery fixes, anti-humidity cleaning, and chip-level motherboard restoration across OMR, Velachery, T Nagar, and Guindy.',
          keywords: ['laptop repair Chennai', 'doorstep laptop service OMR Chennai', 'laptop screen replacement Velachery', 'motherboard repair T Nagar', 'MacBook service Chennai']
        };
      case 'chennai-computer-repair':
        return {
          title: 'Computer Repair in Chennai | Desktop PC Hardware & SMPS Diagnostics',
          desc: 'Expert desktop PC repair and hardware diagnostics in Chennai. SMPS replacements, BSOD resolutions, GPU servicing, and custom PC repairs along the IT expressway.',
          keywords: ['computer repair Chennai', 'desktop service OMR Chennai', 'PC repair Velachery', 'SMPS power supply replacement Chennai', 'BSOD error fix Chennai']
        };
      case 'chennai-networking':
        return {
          title: 'Networking Services in Chennai | Office Cabling & Enterprise Wi-Fi',
          desc: 'High-speed structured CAT6 cabling, patch panel organization, network rack setup, and office network troubleshooting throughout Chennai tech parks.',
          keywords: ['networking services Chennai', 'structured cabling OMR Chennai', 'office Wi-Fi setup Chennai', 'CAT6 cabling Guindy', 'managed switch configuration Chennai']
        };
      case 'chennai-cctv-repair-installation':
        return {
          title: 'CCTV Installation & Repair in Chennai | Commercial Security Cameras',
          desc: 'Professional CCTV installation, camera troubleshooting, DVR recording recovery, and mobile streaming setup across Chennai apartments, villas, and corporate offices.',
          keywords: ['CCTV installation Chennai', 'security camera service OMR Chennai', 'DVR repair Velachery', 'IP camera setup Chennai', 'CCTV maintenance AMC Chennai']
        };
      case 'hyderabad-laptop-repair':
      case 'Hyderabad-laptop-repair':
      case 'Chanda Nagar-laptop-repair':
      case 'chanda-nagar-laptop-repair':
      case 'nellore-laptop-repair':
        return {
          title: 'Laptop Repair in Hyderabad | 90-Min Doorstep Chip-Level Service',
          desc: 'Doorstep laptop repair in Hyderabad. Chip-level motherboard diagnostics, screen replacement, and battery servicing across Madhapur, Hitec City, Gachibowli, Chanda Nagar, and Kukatpally. 90-min dispatch.',
          keywords: ['laptop repair Hyderabad', 'laptop screen replacement Hyderabad', 'doorstep laptop service Hitec City Hyderabad', 'chip level motherboard repair Hyderabad', 'laptop repair Chanda Nagar Hyderabad']
        };
      case 'hyderabad-computer-repair':
      case 'Hyderabad-computer-repair':
      case 'Chanda Nagar-computer-repair':
      case 'chanda-nagar-computer-repair':
      case 'nellore-computer-repair':
        return {
          title: 'Computer & Desktop Repair in Hyderabad | Fast Hardware Diagnostics',
          desc: 'Reliable desktop computer repair in Hyderabad. SMPS replacement, motherboard fixes, Windows OS recovery, and PC tuning across Hitec City, Madhapur, Kondapur, and Chanda Nagar.',
          keywords: ['computer repair Hyderabad', 'desktop service Hyderabad', 'PC repair Hitec City Hyderabad', 'SMPS power supply replacement Hyderabad']
        };
      case 'hyderabad-networking':
      case 'Hyderabad-networking':
      case 'Chanda Nagar-networking':
      case 'chanda-nagar-networking':
      case 'nellore-networking':
        return {
          title: 'Networking & Wi-Fi Setup in Hyderabad | Commercial IT Cabling Solutions',
          desc: 'Structured CAT6 network cabling, high-speed Wi-Fi router setup, and LAN troubleshooting for businesses, retail stores, and residences across Hyderabad.',
          keywords: ['networking setup Hyderabad', 'office Wi-Fi installation Hyderabad', 'CAT6 cabling Hyderabad', 'router configuration Hyderabad']
        };
      case 'hyderabad-cctv-repair-installation':
      case 'Hyderabad-cctv-repair-installation':
      case 'Chanda Nagar-cctv-repair-installation':
      case 'chanda-nagar-cctv-repair-installation':
      case 'nellore-cctv-repair-installation':
        return {
          title: 'CCTV Installation & Repair in Hyderabad | Security Camera Setup & DVR',
          desc: 'Professional CCTV camera installation, DVR/NVR hard drive repair, and mobile live viewing setup across Hyderabad homes, shops, and warehouses.',
          keywords: ['CCTV installation Hyderabad', 'security camera repair Hyderabad', 'DVR repair Hyderabad', 'IP camera setup Hyderabad']
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

  const localizedInsights: Record<string, string> = {
    bengaluru: 'Our Bengaluru dispatch network specifically caters to high-demand corporate professionals, startups, and remote software engineers. We stock genuine displays, RAM/SSD upgrades, and maintain specialized diagnostic rigs for fast turnaround across Outer Ring Road and tech corridors.',
    vizag: 'Operating in Visakhapatnam means our technicians pay special attention to coastal salt humidity corrosion on laptop motherboards and desktop SMPS units. We apply anti-corrosive chemical baths and conformal coating during servicing to maximize hardware longevity.',
    hyderabad: 'Providing direct 90-minute doorstep service coverage across Hitec City, Madhapur, Gachibowli, Chanda Nagar, and Kondapur. Certified field technicians arrive equipped with genuine spares, diagnostic multimeters, and offer no-fee doorstep visit registration.',
    'chanda-nagar': 'Providing direct 90-minute doorstep service coverage across Hitec City, Madhapur, Gachibowli, Chanda Nagar, and Kondapur. Certified field technicians arrive equipped with genuine spares, diagnostic multimeters, and offer no-fee doorstep visit registration.',
    'Chanda Nagar': 'Providing direct 90-minute doorstep service coverage across Hitec City, Madhapur, Gachibowli, Chanda Nagar, and Kondapur. Certified field technicians arrive equipped with genuine spares, diagnostic multimeters, and offer no-fee doorstep visit registration.',
    'nellore': 'Providing direct 90-minute doorstep service coverage across Hitec City, Madhapur, Gachibowli, Chanda Nagar, and Kondapur. Certified field technicians arrive equipped with genuine spares, diagnostic multimeters, and offer no-fee doorstep visit registration.'
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
          { name: 'Service Centers', url: '/service-center' },
          { name: city.name, url: `/service-center/${city.slug}` },
          { name: `${service.shortTitle} in ${city.name}`, url: `/${city.slug}/${service.slug}` },
        ]}
        city={city.name}
        state={city.state}
        serviceName={`${service.title} in ${city.name}`}
        faqs={localizedFaqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Service Centers', path: '/service-center' },
          { label: city.name, path: `/service-center/${city.slug}` },
          { label: `${service.shortTitle} in ${city.name}` },
        ]}
      />

      {/* Hero Header */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>{city.name} Regional IT Hub</span>
                <span className="text-slate-500">• 25 km Radial Coverage</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#06223A] flex items-center justify-center flex-shrink-0 shadow-md">
                  {currentIcon.icon}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
                    {service.shortTitle} in {city.name}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
                {meta.desc}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200 text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>{city.leadTime} Doorstep Visits</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200 text-slate-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Up to 90 Days Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200 text-slate-800 font-medium">
                  <Clock className="w-4 h-4 text-[#16A34A]" />
                  <span>Verified Spares & On-Site Diagnostics</span>
                </div>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#16A34A] font-bold">
                  {city.name} Regional Support Desk
                </span>
                <h3 className="text-lg font-bold text-black">
                  {city.popularName || city.name} Helpline
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our local coordinator at {city.serviceHub} for immediate diagnostic booking.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm group"
                >
                  <Phone className="w-4 h-4 text-[#22C55E]" />
                  <span>Call {city.helpline}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(`Hello, I need ${service.title} in ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Book Service Button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('booking-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-black border border-slate-300 font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-xs active:scale-95 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#16A34A]" />
                  <span>Book Service Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Local Insights & Coverage */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          {/* Localized insight box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#16A34A] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Regional Engineering Context</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              Why Local Expertise Matters for {service.shortTitle} in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {localizedInsights[city.id] || city.description}
            </p>
          </div>

          {/* Common Problems Solved */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
                Common Symptoms
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-black">
                Frequently Diagnosed {service.shortTitle} Issues in {city.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.commonProblems.slice(0, 6).map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] transition-all shadow-xs">
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-black mb-2">
                    <div className="w-6 h-6 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/25 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                    </div>
                    <span>{item.problem}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SIDE BY SIDE: Localities Served & Lead Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Localities Served */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-[#16A34A] font-semibold bg-[#22C55E]/15 px-3 py-1 rounded-full border border-[#22C55E]/30 w-fit">
                    Hub: {city.serviceHub}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-black">
                    Doorstep {service.shortTitle} Coverage Across {city.name} Localities (25 km Radius)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our mobile engineers are dispatched across <strong className="text-black font-semibold">{city.name}</strong> to all neighbourhoods strictly within a 25 km radius:
                </p>

                {/* Localities as Clickable Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {city.localities.map((locStr, idx) => {
                    const loc = parseLocality(locStr);
                    return (
                      <Link
                        key={idx}
                        to={`/service-center/${city.slug}/${loc.slug}`}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between shadow-xs hover:border-[#22C55E] hover:bg-white hover:text-black transition-all group"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="truncate font-medium">{loc.name}</span>
                          {loc.distance && (
                            <span className="text-[10px] text-slate-400 shrink-0">({loc.distance})</span>
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex flex-col gap-1.5">
                  <span>Need doorstep {service.shortTitle.toLowerCase()} in {city.name}?</span>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#16A34A] hover:underline font-bold flex items-center gap-1">
                    <span>Call {siteConfig.phoneDisplay} for instant route dispatch →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Booking Form */}
            <div id="booking-section" className="lg:col-span-7 scroll-mt-28">
              <EnquiryForm
                initialCity={city.id}
                initialService={service.id}
                title={`Request ${service.shortTitle} in ${city.name}`}
                subtitle={`Tell us your ${city.name} address, preferred service slot date and time. Choose your discount offer and our coordinator will confirm dispatch.`}
              />
            </div>

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
