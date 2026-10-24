import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { citiesData, servicesData, siteConfig, parseLocality, type LocalityInfo } from '../config/site';
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
  Video,
  Sparkles,
  Zap,
  Calendar
} from 'lucide-react';

export const SubLocationPage: React.FC = () => {
  const { citySlug, localitySlug } = useParams<{ citySlug: string; localitySlug: string }>();

  const city = citySlug ? citiesData[citySlug] : null;

  if (!city || !localitySlug) {
    return <Navigate to="/service-center" replace />;
  }

  // Find the matching locality
  const allParsedLocalities: LocalityInfo[] = city.localities.map(parseLocality);
  const currentLocality = allParsedLocalities.find(
    (loc) => loc.slug === localitySlug.toLowerCase()
  );

  // Fallback if slug isn't an exact match
  const localityName = currentLocality
    ? currentLocality.name
    : localitySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

  const localityDistance = currentLocality?.distance || 'Within 25 km';

  const iconMap: Record<string, React.ReactNode> = {
    'laptop-repair': <Laptop className="w-5 h-5 text-[#16A34A]" />,
    'computer-repair': <Monitor className="w-5 h-5 text-[#06223A]" />,
    'networking': <Network className="w-5 h-5 text-[#16A34A]" />,
    'cctv-repair-installation': <Video className="w-5 h-5 text-[#06223A]" />,
  };

  const localityFaqs = [
    {
      question: `Do you provide doorstep laptop and computer repair in ${localityName}, ${city.name}?`,
      answer: `Yes! Our certified field engineers provide fast doorstep service throughout ${localityName} and surrounding areas with fully equipped diagnostic toolkits.`
    },
    {
      question: `How fast can a technician arrive at my home or office in ${localityName}?`,
      answer: `With our dedicated doorstep service units across ${city.name} (${localityDistance}), our technician typically arrives within 45 to 90 minutes of your booking confirmation.`
    },
    {
      question: `What computer and CCTV services are supported in ${localityName}?`,
      answer: `We cover chip-level laptop motherboard repairs, cracked screen replacements, SMPS/RAM/SSD desktop repairs, CAT6 structured cabling, Wi-Fi 6 mesh setup, and IP/HD CCTV surveillance installation.`
    },
    {
      question: `Do I need to pay anything before inspection in ${localityName}?`,
      answer: `No advance payment is required. You get transparent upfront diagnostic quotes, and you pay only after the diagnosis or service is completed.`
    }
  ];

  return (
    <>
      <SEO
        title={`Laptop & Computer Repair in ${localityName}, ${city.name} | Doorstep Service & CCTV Setup`}
        description={`Need fast doorstep computer or laptop repair in ${localityName}, ${city.name}? Our certified technicians reach within 45–90 mins with genuine parts, chip-level motherboard repair, screen replacement, Wi-Fi networking, and CCTV camera setup with 90-day warranty.`}
        canonicalPath={`/service-center/${city.slug}/${localitySlug}`}
        keywords={[
          `laptop repair ${localityName} ${city.name}`,
          `computer repair ${localityName} ${city.name}`,
          `desktop repair ${localityName} ${city.name}`,
          `CCTV camera installation ${localityName} ${city.name}`,
          `networking service ${localityName} ${city.name}`,
          `doorstep laptop service ${localityName} ${city.name}`,
          `motherboard chip repair ${localityName} ${city.name}`,
          `laptop screen replacement ${localityName} ${city.name}`,
          `MacBook repair ${localityName} ${city.name}`,
          `computer technician ${localityName} ${city.name}`
        ]}
        breadcrumbs={[
          { name: 'Service Centers', url: '/service-center' },
          { name: city.name, url: `/service-center/${city.slug}` },
          { name: localityName, url: `/service-center/${city.slug}/${localitySlug}` },
        ]}
        city={city.name}
        state={city.state}
        faqs={localityFaqs}
      />

      <Breadcrumbs
        items={[
          { label: 'Service Centers', path: '/service-center' },
          { label: city.name, path: `/service-center/${city.slug}` },
          { label: localityName },
        ]}
      />

      {/* Hero Header for Sub-Location */}
      <section className="py-10 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Doorstep Dispatch Hub • {localityName}, {city.name}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Computer, Laptop, Networking & CCTV Repair in <span className="text-[#16A34A]">{localityName}</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
                Need reliable on-site IT support in <strong>{localityName}</strong>? Our mobile technician squad dispatches directly from our {city.popularName || city.name} hub ({localityDistance}) with authentic OEM parts, zero hidden diagnostic fees, and a 90-day warranty.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                  <Zap className="w-4 h-4 text-[#16A34A]" />
                  <span>Doorstep Arrival: 45–90 Mins</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Hub Distance: {localityDistance}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Pay After Service Guarantee</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    {localityName} Dispatch
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#16A34A] font-bold">ONLINE</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our {city.name} support desk to lock in a technician slot for {localityName}.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#22C55E]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(`Hello, I need laptop / computer repair in ${localityName}, ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp {localityName} Desk</span>
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-black border border-slate-300 font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-xs active:scale-95 group cursor-pointer"
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

      {/* Main Content Area: Services in Locality & Side-by-Side Booking Section */}
      <section className="py-12 sm:py-18 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Services Tailored for this Locality */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
                Localized IT Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                Services Available in {localityName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Specialized doorstep services available for homes, startups, and commercial stores in {localityName}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Object.values(servicesData).map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#22C55E] border border-slate-200 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#06223A] group-hover:border-[#22C55E] transition-colors">
                        {iconMap[srv.id]}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#16A34A] bg-[#22C55E]/15 px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                        AVAILABLE
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-black group-hover:text-[#16A34A] transition-colors">
                      {srv.shortTitle} in {localityName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {srv.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      to={`/${city.slug}/${srv.slug}`}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-[#16A34A] hover:text-[#06223A] py-1 transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDE BY SIDE: Locality Details & Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Locality Details & Nearby Localities in City */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Coverage & Hub Details Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold">
                  Verified Local Hub
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  Doorstep Service for {localityName}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our service engineers carry ESD-safe diagnostic stations, replacement screens, and high-speed NVMe drives right to your doorstep in <strong>{localityName}</strong>.
                </p>

                <div className="space-y-2.5 pt-2 text-xs text-slate-700 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <span><strong>Operating Service Hub:</strong> {city.name} Hub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span><strong>Working Hours:</strong> {siteConfig.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span><strong>Warranty:</strong> {siteConfig.warrantyHighlight}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex flex-col gap-1.5">
                  <span>Need instant route confirmation for {localityName}?</span>
                  <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#16A34A] hover:underline font-bold flex items-center gap-1">
                    <span>Call our dispatch manager →</span>
                  </a>
                </div>
              </div>

              {/* Other Localities in City (Clickable Pills) */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#16A34A]" />
                  <span>Other Localities Served in {city.name}</span>
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  {allParsedLocalities.map((loc, idx) => {
                    const isCurrent = loc.slug === localitySlug.toLowerCase();
                    return (
                      <Link
                        key={idx}
                        to={`/service-center/${city.slug}/${loc.slug}`}
                        className={`p-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                          isCurrent
                            ? 'bg-[#22C55E]/15 text-black border border-[#22C55E]'
                            : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#22C55E] hover:bg-white'
                        }`}
                      >
                        <MapPin className={`w-3 h-3 ${isCurrent ? 'text-[#16A34A]' : 'text-slate-400'}`} />
                        <span>{loc.name}</span>
                        {loc.distance && (
                          <span className={`text-[10px] ${isCurrent ? 'text-slate-500' : 'text-slate-400'}`}>
                            ({loc.distance})
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Booking Form pre-filled with locality */}
            <div id="booking-section" className="lg:col-span-7 scroll-mt-28">
              <EnquiryForm
                initialCity={city.id}
                title={`Book an IT Repair in ${localityName}`}
                subtitle={`Instant doorstep technician dispatch for ${localityName}, ${city.name}. Select your service below.`}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
export default SubLocationPage;
