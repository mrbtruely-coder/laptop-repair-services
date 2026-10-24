import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { servicesData, primaryCities, siteConfig } from '../config/site';
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

  // Other related services
  const otherServices = Object.values(servicesData).filter((s) => s.id !== service.id);

  // SEO metadata tailor
  const seoTitles: Record<string, string> = {
    'laptop-repair': 'Laptop Repair & Motherboard Servicing | Bengaluru, Vizag, Chennai, Chanda Nagar',
    'computer-repair': 'Desktop & Computer Repair Services | Bengaluru, Vizag, Chennai, Chanda Nagar',
    'networking': 'Structured IT Networking Services & Cabling | Bengaluru, Vizag, Chennai, Chanda Nagar',
    'cctv-repair-installation': 'CCTV Camera Installation & DVR Repair | Bengaluru, Vizag, Chennai, Chanda Nagar',
  };

  const seoDescriptions: Record<string, string> = {
    'laptop-repair': 'Expert laptop repair, chip-level motherboard diagnostics, OEM screen replacement, and battery servicing across Bengaluru, Vizag, Chennai & Chanda Nagar. Rapid doorstep inspection & 90-day warranty.',
    'computer-repair': 'Professional desktop computer repair, SMPS replacement, BSOD troubleshooting, and performance upgrades across Bengaluru, Vizag, Chennai & Chanda Nagar. Fast doorstep dispatch.',
    'networking': 'Enterprise CAT6 cabling, Wi-Fi 6 mesh setups, server rack installation, and router configuration for offices and residences across Bengaluru, Vizag, Chennai & Chanda Nagar.',
    'cctv-repair-installation': 'HD and IP CCTV installation, DVR hard drive recovery, mobile live streaming setup, and camera repair across Bengaluru, Vizag, Chennai & Chanda Nagar. Get a free quotation.',
  };

  const serviceKeywords: Record<string, string[]> = {
    'laptop-repair': ['laptop repair Bengaluru', 'laptop service Vizag', 'laptop screen replacement Chennai', 'doorstep laptop repair Chanda Nagar', 'motherboard chip repair', 'MacBook repair', 'Dell HP Lenovo repair'],
    'computer-repair': ['computer repair Bengaluru', 'desktop repair Vizag', 'PC troubleshooting Chennai', 'SMPS replacement Chanda Nagar', 'custom gaming PC repair', 'BSOD error fix'],
    'networking': ['structured cabling Bengaluru', 'office networking Chennai', 'Wi-Fi 6 setup Vizag', 'CAT6 LAN cabling Chanda Nagar', 'server rack installation', 'router firewall configuration'],
    'cctv-repair-installation': ['CCTV installation Bengaluru', 'security camera repair Vizag', 'DVR repair Chennai', 'IP camera setup Chanda Nagar', 'CCTV AMC', 'night vision surveillance camera'],
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

      {/* Service Hero */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Certified Hardware & IT Infrastructure Support</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#06223A] flex items-center justify-center flex-shrink-0 shadow-md">
                  {currentIcon.icon}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
                    {service.title}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl font-normal">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200 text-slate-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Up to 90 Days Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200 text-slate-800 font-medium">
                  <Clock className="w-4 h-4 text-[#16A34A]" />
                  <span>Transparent On-Site Diagnostic Estimate</span>
                </div>
              </div>
            </div>

            {/* Direct Assistance Card */}
            <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#16A34A] font-bold">
                  Quick Dispatch Desk
                </span>
                <h3 className="text-lg font-bold text-black">
                  Direct Service Assistance
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Connect directly with our local coordinator in Bengaluru, Vizag, Chennai, or Chanda Nagar for instant slot scheduling.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm group"
                >
                  <Phone className="w-4 h-4 text-[#22C55E]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(`Hello, I need assistance regarding ${service.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Slot Booking</span>
                </a>

                {/* Book Service Button */}
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-black border border-slate-300 font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-xs group"
                >
                  <Calendar className="w-4 h-4 text-[#16A34A]" />
                  <span>Book Service Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Section: Common Problems & Solutions */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
                Symptom & Fault Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                Common {service.shortTitle} Problems We Resolve
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Everyday issues our certified technicians diagnose and resolve on-site with precision tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.commonProblems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-[#22C55E] transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                      </div>
                      <h3 className="text-sm font-bold text-black leading-snug">{item.problem}</h3>
                    </div>
                  </div>
                  <div className="pl-8 pt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-3 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                    <strong className="text-black font-semibold">Resolution: </strong>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Available Services & Deliverables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block">
                Scope of Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                Available Repair & Installation Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you require single component replacement or full enterprise cabling setups, our engineers arrive with OEM spares and testing gear.
              </p>

              <div className="space-y-2.5 pt-2">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] transition-colors shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#16A34A] stroke-[3]" />
                    </div>
                    <span className="text-xs text-black font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Process */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block">
                Expectations & Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                Step-by-Step Service Process
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear diagnostic workflow with zero hidden fees and upfront estimate approvals.
              </p>

              <div className="space-y-3 pt-2">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-xs">
                    <span className="w-8 h-8 rounded-xl bg-[#06223A] text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-black">{step.step}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* City Coverage for this specific service */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
                  Local Service Hub Availability
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  Available Across Bengaluru, Vizag, Chennai & Chanda Nagar
                </h3>
              </div>
              <span className="text-xs text-[#16A34A] font-semibold bg-[#22C55E]/15 px-3 py-1 rounded-full border border-[#22C55E]/30">
                Doorstep dispatch within 90 minutes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {primaryCities.map((city) => (
                <Link
                  key={city.id}
                  to={`/${city.slug}/${service.slug}`}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#22C55E] transition-all group flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#16A34A]" />
                      </div>
                      <h4 className="text-sm font-bold text-black group-hover:text-[#16A34A] transition-colors">
                        {service.shortTitle} in {city.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {city.serviceHub} • Doorstep visit available across {city.localities.slice(0, 3).join(', ')} and surrounding localities.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-[#16A34A] font-bold">
                    <span>View {city.popularName || city.name} Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Services Navigation */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-4">
              Other IT & Repair Verticals:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherServices.map((os) => (
                <Link
                  key={os.id}
                  to={`/services/${os.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] transition-all flex items-center justify-between group shadow-xs"
                >
                  <span className="text-xs font-bold text-black group-hover:text-[#16A34A] transition-colors">
                    {os.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16A34A] group-hover:translate-x-1 transition-transform" />
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
