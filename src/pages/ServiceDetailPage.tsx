import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { servicesData, citiesData, siteConfig } from '../config/site';
import {
  Laptop,
  Monitor,
  Network,
  Video,
  AlertCircle,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  ArrowRight,
  MapPin,
  Sparkles,
  Wrench,
  Check,
  Calendar
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceSlug ? servicesData[serviceSlug] : null;

  if (!service) {
    return <Navigate to="/services" replace />;
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

  // Other related services
  const otherServices = Object.values(servicesData).filter((s) => s.id !== service.id);

  // SEO metadata tailor
  const seoTitles: Record<string, string> = {
    'laptop-repair': 'Laptop Repair & Motherboard Servicing | Bengaluru, Vizag, Chennai, Nellore',
    'computer-repair': 'Desktop & Computer Repair Services | Bengaluru, Vizag, Chennai, Nellore',
    'networking': 'Structured IT Networking Services & Cabling | Bengaluru, Vizag, Chennai, Nellore',
    'cctv-repair-installation': 'CCTV Camera Installation & DVR Repair | Bengaluru, Vizag, Chennai, Nellore',
  };

  const seoDescriptions: Record<string, string> = {
    'laptop-repair': 'Expert laptop repair, chip-level motherboard diagnostics, OEM screen replacement, and battery servicing across Bengaluru, Vizag, Chennai & Nellore. Rapid doorstep inspection & 90-day warranty.',
    'computer-repair': 'Professional desktop computer repair, SMPS replacement, BSOD troubleshooting, and performance upgrades across Bengaluru, Vizag, Chennai & Nellore. Fast doorstep dispatch.',
    'networking': 'Enterprise CAT6 cabling, Wi-Fi 6 mesh setups, server rack installation, and router configuration for offices and residences across Bengaluru, Vizag, Chennai & Nellore.',
    'cctv-repair-installation': 'HD and IP CCTV installation, DVR hard drive recovery, mobile live streaming setup, and camera repair across Bengaluru, Vizag, Chennai & Nellore. Get a free quotation.',
  };

  const serviceKeywords: Record<string, string[]> = {
    'laptop-repair': ['laptop repair Bengaluru', 'laptop service Vizag', 'laptop screen replacement Chennai', 'doorstep laptop repair Nellore', 'motherboard chip repair', 'MacBook repair', 'Dell HP Lenovo repair'],
    'computer-repair': ['computer repair Bengaluru', 'desktop repair Vizag', 'PC troubleshooting Chennai', 'SMPS replacement Nellore', 'custom gaming PC repair', 'BSOD error fix'],
    'networking': ['structured cabling Bengaluru', 'office networking Chennai', 'Wi-Fi 6 setup Vizag', 'CAT6 LAN cabling Nellore', 'server rack installation', 'router firewall configuration'],
    'cctv-repair-installation': ['CCTV installation Bengaluru', 'security camera repair Vizag', 'DVR repair Chennai', 'IP camera setup Nellore', 'CCTV AMC', 'night vision surveillance camera'],
  };

  return (
    <>
      <SEO
        title={seoTitles[service.id] || service.title}
        description={seoDescriptions[service.id] || service.description}
        canonicalPath={`/services/${service.slug}`}
        keywords={serviceKeywords[service.id] || [service.title, service.shortTitle]}
        breadcrumbs={[
          { name: 'Services', url: '/services' },
          { name: service.shortTitle, url: `/services/${service.slug}` },
        ]}
        serviceName={service.title}
        faqs={service.faqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: service.shortTitle },
        ]}
      />

      {/* Service Hero with Organic Tactile Palette */}
      <section className="py-12 sm:py-16 bg-[#12231A] border-b border-[#E2B98E]/15 relative overflow-hidden">
        {/* Glow accents */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#7AA27D]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-10 w-80 h-80 bg-[#E2B98E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
                <span>Certified Hardware & IT Infrastructure Support</span>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl ${currentIcon.badgeClass} flex items-center justify-center flex-shrink-0 shadow-xl`}>
                  {currentIcon.icon}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
                    {service.title}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#D2DCD2] leading-relaxed max-w-3xl">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <div className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-2 rounded-full border border-[#7AA27D]/30 text-[#FAF6F0]">
                  <ShieldCheck className="w-4 h-4 text-[#7AA27D]" />
                  <span className="font-medium">Up to 90 Days Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-2 rounded-full border border-[#E2B98E]/30 text-[#FAF6F0]">
                  <Clock className="w-4 h-4 text-[#E2B98E]" />
                  <span className="font-medium">Transparent On-Site Diagnostic Estimate</span>
                </div>
              </div>
            </div>

            {/* Direct Assistance Card in Clay Styling */}
            <div className="lg:col-span-4 clay-card p-6 sm:p-7 rounded-3xl border border-[#E2B98E]/30 shadow-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B98E] font-bold">
                  Quick Dispatch Desk
                </span>
                <h3 className="text-lg font-bold text-[#FAF6F0]">
                  Direct Service Assistance
                </h3>
              </div>
              <p className="text-xs text-[#FAF6F0]/80 leading-relaxed">
                Connect directly with our local coordinator in Bengaluru, Vizag, or Chennai for instant slot scheduling.
              </p>
              
              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 sand-btn-3d text-[#24160E] font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md group"
                >
                  <Phone className="w-4 h-4 text-[#24160E]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(`Hello TechFix, I need assistance regarding ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Slot Booking</span>
                </a>

                {/* Book Service Button */}
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#6E4331] hover:bg-[#85523D] text-[#FAF6F0] border border-[#E2B98E]/30 font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-95 group"
                >
                  <Calendar className="w-4 h-4 text-[#E2B98E]" />
                  <span>Book Service Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-14 sm:py-20 bg-[#12231A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section: Common Problems & Solutions */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block mb-1">
                Symptom & Fault Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] tracking-tight">
                Common {service.shortTitle} Problems We Resolve
              </h2>
              <p className="text-[#D2DCD2] text-xs sm:text-sm mt-1">
                Everyday issues our certified technicians diagnose and resolve on-site with precision tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.commonProblems.map((item, idx) => (
                <div
                  key={idx}
                  className="nature-panel p-5 sm:p-6 rounded-2xl border border-[#E2B98E]/15 hover:border-[#E2B98E]/40 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#6E4331]/50 border border-[#E2B98E]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#E2B98E]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#FAF6F0] leading-snug">{item.problem}</h3>
                    </div>
                  </div>
                  <div className="pl-8 pt-3 text-xs text-[#FAF6F0]/80 leading-relaxed border-t border-[#E2B98E]/10 mt-3 bg-[#12231A]/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
                    <strong className="text-[#E2B98E] font-semibold">Resolution: </strong>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Available Services & Deliverables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block">
                Scope of Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] tracking-tight">
                Available Repair & Installation Services
              </h2>
              <p className="text-xs sm:text-sm text-[#D2DCD2] leading-relaxed">
                Whether you require single component replacement or full enterprise cabling setups, our engineers arrive with OEM spares and testing gear.
              </p>

              <div className="space-y-2.5 pt-2">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#14281E] border border-[#E2B98E]/15 hover:border-[#E2B98E]/30 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-[#7AA27D]/20 border border-[#7AA27D]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#7AA27D] stroke-[3]" />
                    </div>
                    <span className="text-xs text-[#FAF6F0]/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Process */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#7AA27D] uppercase tracking-wider block">
                Expectations & Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] tracking-tight">
                Step-by-Step Service Process
              </h2>
              <p className="text-xs sm:text-sm text-[#D2DCD2] leading-relaxed">
                Clear diagnostic workflow with zero hidden fees and upfront estimate approvals.
              </p>

              <div className="space-y-3 pt-2">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#14281E] border border-[#E2B98E]/15 flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-xl icon-badge-sand text-[#24160E] text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#FAF6F0]">{step.step}</h4>
                      <p className="text-xs text-[#D2DCD2] mt-0.5 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* City Coverage for this specific service */}
          <div className="p-6 sm:p-8 rounded-3xl nature-panel border border-[#E2B98E]/25 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block mb-1">
                  Local Service Hub Availability
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  Available Across Bengaluru, Vizag & Chennai
                </h3>
              </div>
              <span className="text-xs text-[#7AA27D] font-medium bg-[#7AA27D]/15 px-3 py-1 rounded-full border border-[#7AA27D]/30">
                Doorstep dispatch in 2–4 hours across 25 km service radius
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(citiesData).map((city) => (
                <Link
                  key={city.id}
                  to={`/${city.slug}/${service.slug}`}
                  className="p-5 rounded-2xl bg-[#12231A]/80 border border-[#E2B98E]/15 hover:border-[#E2B98E]/50 transition-all group flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#6E4331]/40 border border-[#E2B98E]/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#E2B98E]" />
                      </div>
                      <h4 className="text-sm font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                        {service.shortTitle} in {city.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#D2DCD2] line-clamp-2 leading-relaxed">
                      {city.serviceHub} • Doorstep visit available across {city.localities.slice(0, 3).join(', ')} and surrounding localities.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E2B98E]/15 flex items-center justify-between text-xs text-[#E2B98E] font-semibold">
                    <span>View {city.popularName || city.name} Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Services Navigation */}
          <div className="pt-8 border-t border-[#E2B98E]/15">
            <h3 className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider mb-4">
              Other IT & Repair Verticals:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherServices.map((os) => (
                <Link
                  key={os.id}
                  to={`/services/${os.slug}`}
                  className="p-4 rounded-2xl bg-[#14281E] border border-[#E2B98E]/15 hover:border-[#E2B98E]/40 transition-all flex items-center justify-between group shadow-sm"
                >
                  <span className="text-xs font-semibold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                    {os.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2B98E]/60 group-hover:text-[#E2B98E] group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Service specific FAQs */}
      <FAQAccordion
        items={service.faqs}
        title={`${service.shortTitle} - Frequently Asked Questions`}
        subtitle="Common questions regarding repair duration, parts warranties, and doorstep diagnosis."
      />
    </>
  );
};
