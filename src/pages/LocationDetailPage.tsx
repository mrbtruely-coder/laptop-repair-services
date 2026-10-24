import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { citiesData, servicesData, siteConfig } from '../config/site';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Laptop,
  Monitor,
  Network,
  Video
} from 'lucide-react';

export const LocationDetailPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? citiesData[citySlug] : null;

  if (!city) {
    return <Navigate to="/locations" replace />;
  }

  const iconMap: Record<string, React.ReactNode> = {
    'laptop-repair': <Laptop className="w-5 h-5 text-cyan-400" />,
    'computer-repair': <Monitor className="w-5 h-5 text-blue-400" />,
    'networking': <Network className="w-5 h-5 text-emerald-400" />,
    'cctv-repair-installation': <Video className="w-5 h-5 text-amber-400" />,
  };

  const cityTitles: Record<string, string> = {
    bengaluru: 'Computer & Laptop Repair Services in Bengaluru | HSR Layout Hub & Doorstep Service',
    vizag: 'Computer & Laptop Repair in Vizag (Visakhapatnam) | Dwaraka Nagar Hub',
    chennai: 'Computer & Laptop Repair Services in Chennai | OMR & Central Tech Hubs',
    nellore: 'Computer & Laptop Repair Services in Nellore | 90-Min Dispatch Hub',
  };

  const cityDescriptions: Record<string, string> = {
    bengaluru: 'Reliable computer and laptop repair, networking support, and CCTV installation across Bengaluru. Doorstep engineer visits in Koramangala, Indiranagar, Whitefield, HSR Layout, and all major tech corridors.',
    vizag: 'Looking for computer or laptop repair in Visakhapatnam? Fast hardware diagnostics, chip-level motherboard servicing, and CCTV setups across Dwaraka Nagar, MVP Colony, Gajuwaka, and Greater Vizag.',
    chennai: 'Professional IT repair services in Chennai. On-site laptop motherboard repair, PC troubleshooting, office CAT6 cabling, and CCTV solutions across OMR, Velachery, T Nagar, Guindy, and Anna Nagar.',
    nellore: 'Doorstep computer and laptop repair, certified chip-level diagnostics, desktop PC troubleshooting, networking, and CCTV installation with rapid technician dispatch within 90 minutes in Nellore. Pay after diagnosis.',
  };

  const cityKeywords: Record<string, string[]> = {
    bengaluru: ['laptop repair Bengaluru', 'computer service HSR Layout', 'CCTV installation Bengaluru', 'office networking Bangalore', 'doorstep laptop repair Koramangala', 'motherboard chip repair Bengaluru'],
    vizag: ['laptop repair Vizag', 'computer repair Visakhapatnam', 'CCTV camera installation Dwaraka Nagar', 'desktop service MVP Colony', 'networking cabling Vizag', 'anti-corrosion laptop repair Vizag'],
    chennai: ['laptop repair Chennai', 'doorstep computer service OMR Chennai', 'laptop screen replacement Velachery', 'CCTV repair Chennai', 'office CAT6 cabling Guindy', 'MacBook repair Chennai'],
    nellore: ['laptop repair Nellore', 'doorstep computer service Trunk Road Nellore', 'networking setup Nellore', 'CCTV installation Nellore', 'laptop repair VRC Centre', 'chip level repair Nellore']
  };

  const cityFaqs = [
    {
      question: `What computer and laptop services do you offer in ${city.name}?`,
      answer: `In ${city.name}, we provide chip-level motherboard repair, OEM screen replacements, keyboard/battery swaps, SSD upgrades, desktop SMPS replacements, office CAT6 cabling, and HD/IP CCTV security camera installation.`
    },
    {
      question: `How fast can a technician visit my doorstep in ${city.name}?`,
      answer: `Our field engineers provide rapid on-site dispatches across ${city.localities.slice(0, 5).join(', ')} and surrounding localities, typically reaching your location within 90 minutes to 2 hours of booking.`
    },
    {
      question: `Do you provide a service warranty on repairs in ${city.name}?`,
      answer: `Yes, all genuine replacement parts and hardware repair services carry up to 90 days service warranty backed by our central support desk.`
    }
  ];

  return (
    <>
      <SEO
        title={cityTitles[city.id] || `Computer & Laptop Repair in ${city.name}`}
        description={cityDescriptions[city.id] || city.description}
        canonicalPath={`/locations/${city.slug}`}
        keywords={cityKeywords[city.id] || [`laptop repair ${city.name}`, `computer service ${city.name}`]}
        breadcrumbs={[
          { name: 'Locations', url: '/locations' },
          { name: city.name, url: `/locations/${city.slug}` },
        ]}
        city={city.name}
        state={city.state}
        faqs={cityFaqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Locations', path: '/locations' },
          { label: city.name },
        ]}
      />

      {/* Hero Header */}
      <section className="py-12 sm:py-16 bg-[#070B14] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Verified City Service Coverage • {city.state}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Computer, Laptop & IT Repair Services in {city.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {city.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{city.leadTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#E2B98E] font-medium">
                  <MapPin className="w-4 h-4 text-[#E2B98E] flex-shrink-0" />
                  <span>{city.address}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0B1220] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {city.popularName || city.name} Service Desk
              </h3>
              <p className="text-xs text-slate-400">
                Contact our local dispatch team for immediate technician scheduling or workshop pickup.
              </p>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call {city.helpline}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(`Hello TechFix, I need repair assistance in ${city.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-semibold text-xs py-3 px-4 rounded-xl transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp {city.popularName || city.name} Team</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* City Services & Localities Section */}
      <section className="py-14 sm:py-20 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Services Available in this City */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Local Offerings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Available Services Across {city.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore dedicated landing pages tailored to your specific hardware requirement in {city.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.values(servicesData).map((srv) => (
                <div
                  key={srv.id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#070B14] border border-white/5 group-hover:border-cyan-500/40 transition-colors">
                        {iconMap[srv.id]}
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400">AVAILABLE</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {srv.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {srv.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5">
                    <Link
                      to={`/${city.slug}/${srv.slug}`}
                      className="w-full inline-flex items-center justify-between text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1"
                    >
                      <span>{srv.shortTitle} in {city.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side by Side: Key Localities Coverage & Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Key Localities Breakdown & Service Hub Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl nature-panel border border-[#E2B98E]/20 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold shadow-inner">
                  Verified 25 km Coverage Radius
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  Key Localities Served in {city.name} (Within 25 km Radius)
                </h3>
                <p className="text-xs text-[#FAF6F0]/75 leading-relaxed">
                  Our mobile technician units operate throughout the following neighbourhoods strictly within a <strong className="text-[#E2B98E]">25 km radius</strong> of our service center ({city.address}) for doorstep inspections, repairs, and pickup:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {city.localities.map((loc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#12231A]/80 border border-[#E2B98E]/15 text-xs text-[#FAF6F0]/90 flex items-center gap-2 hover:border-[#E2B98E]/50 transition-colors shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0" />
                      <span className="truncate font-medium">{loc}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E2B98E]/10 text-xs text-[#FAF6F0]/70 flex flex-col gap-1.5">
                  <span>Need service at a doorstep within or near 25 km of {city.name} hub?</span>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#E2B98E] hover:underline font-semibold flex items-center gap-1">
                    <span>Call for instant 25 km route dispatch →</span>
                  </a>
                </div>
              </div>

              {/* Regional Service Commitments & Operating Timings */}
              <div className="p-5 rounded-2xl nature-panel border border-[#E2B98E]/15 space-y-3">
                <h4 className="text-sm font-bold text-[#FAF6F0] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7AA27D]" />
                  <span>{city.name} Service Commitments</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#FAF6F0]/80">
                  {city.serviceHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-[#E2B98E]/10 text-xs text-[#FAF6F0]/70 space-y-1.5">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0" />
                    <span><strong>Working Hours:</strong> {siteConfig.workingHours}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0" />
                    <span><strong>Service Hub:</strong> {city.serviceHub}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-7">
              <EnquiryForm
                initialCity={city.id}
                title={`Book an IT Repair in ${city.name}`}
                subtitle={`Select your required service below. Our ${city.name} support dispatcher will get in touch promptly.`}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
