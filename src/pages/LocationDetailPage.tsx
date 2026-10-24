import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { citiesData, servicesData, siteConfig, parseLocality } from '../config/site';
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

export const LocationDetailPage: React.FC = () => {
  const { citySlug, localitySlug } = useParams<{ citySlug: string; localitySlug?: string }>();
  const city = citySlug ? citiesData[citySlug] : null;

  if (!city) {
    return <Navigate to="/service-center" replace />;
  }

  // Parse all localities for this city
  const allParsedLocalities = city.localities.map(parseLocality);

  // If a sub-locality slug is in the URL, identify it
  const currentLocality = localitySlug
    ? allParsedLocalities.find((l) => l.slug === localitySlug.toLowerCase()) || {
        name: localitySlug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        slug: localitySlug.toLowerCase(),
        distance: 'Local Area',
        fullName: localitySlug
      }
    : null;

  const isSubLocality = Boolean(currentLocality);
  const locationDisplayName = currentLocality ? currentLocality.name : city.name;
  const fullDisplayName = currentLocality ? `${currentLocality.name}, ${city.name}` : city.name;

  const iconMap: Record<string, React.ReactNode> = {
    'laptop-repair': <Laptop className="w-5 h-5 text-[#E2B98E]" />,
    'computer-repair': <Monitor className="w-5 h-5 text-[#9BBF9C]" />,
    'networking': <Network className="w-5 h-5 text-[#E2B98E]" />,
    'cctv-repair-installation': <Video className="w-5 h-5 text-[#9BBF9C]" />,
  };

  const cityTitles: Record<string, string> = {
    bengaluru: 'Computer & Laptop Repair Services in Bengaluru | HSR Layout Hub & Doorstep Service',
    vizag: 'Computer & Laptop Repair in Vizag (Visakhapatnam) | Dwaraka Nagar Hub',
    chennai: 'Computer & Laptop Repair Services in Chennai | OMR & Central Tech Hubs',
    nellore: 'Computer & Laptop Repair Services in Nellore | 90-Min Dispatch Hub',
  };

  const pageTitle = isSubLocality
    ? `Computer, Laptop, Networking & CCTV Repair in ${fullDisplayName}`
    : cityTitles[city.id] || `Computer & Laptop Repair in ${city.name}`;

  const pageDescription = isSubLocality
    ? `Certified doorstep computer, laptop, networking, and CCTV camera repair in ${fullDisplayName}. Fast technician dispatch (${currentLocality?.distance || 'within 45–90 mins'}), transparent diagnosis, and 90-day warranty.`
    : city.description;

  const canonicalPath = isSubLocality
    ? `/service-center/${city.slug}/${currentLocality?.slug}`
    : `/service-center/${city.slug}`;

  const breadcrumbsList = isSubLocality
    ? [
        { name: 'Service Centers', url: '/service-center' },
        { name: city.name, url: `/service-center/${city.slug}` },
        { name: locationDisplayName, url: `/service-center/${city.slug}/${currentLocality?.slug}` },
      ]
    : [
        { name: 'Service Centers', url: '/service-center' },
        { name: city.name, url: `/service-center/${city.slug}` },
      ];

  const breadcrumbsItems = isSubLocality
    ? [
        { label: 'Service Centers', path: '/service-center' },
        { label: city.name, path: `/service-center/${city.slug}` },
        { label: locationDisplayName },
      ]
    : [
        { label: 'Service Centers', path: '/service-center' },
        { label: city.name },
      ];

  const pageFaqs = [
    {
      question: `What computer and laptop services do you offer in ${locationDisplayName}?`,
      answer: `In ${locationDisplayName}, we provide chip-level motherboard repair, OEM screen replacements, keyboard/battery swaps, SSD upgrades, desktop SMPS replacements, office CAT6 cabling, and HD/IP CCTV security camera installation.`
    },
    {
      question: `How fast can a technician reach my doorstep in ${locationDisplayName}?`,
      answer: `Our service hub is located at ${city.address}. For ${locationDisplayName}${currentLocality?.distance ? ` (${currentLocality.distance})` : ''}, technician arrival is typically within 45 to 90 minutes of booking confirmation.`
    },
    {
      question: `Do you provide a service warranty on repairs in ${locationDisplayName}?`,
      answer: `Yes, all genuine replacement parts and hardware repair services carry up to 90 days service warranty backed by our central support desk.`
    }
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        keywords={[
          `laptop repair ${locationDisplayName}`,
          `computer service ${locationDisplayName} ${city.name}`,
          `CCTV installation ${locationDisplayName}`,
          `wifi networking ${locationDisplayName}`,
          `doorstep PC repair ${locationDisplayName}`
        ]}
        breadcrumbs={breadcrumbsList}
        city={city.name}
        state={city.state}
        faqs={pageFaqs}
      />

      <Breadcrumbs items={breadcrumbsItems} />

      {/* Hero Header */}
      <section className="py-10 sm:py-16 bg-[#102016] border-b border-[#E2B98E]/15 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-bold uppercase tracking-wider shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-[#E2B98E]" />
                <span>
                  {isSubLocality
                    ? `Verified Doorstep Hub • ${fullDisplayName}`
                    : `Verified City Service Coverage • ${city.state}`}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6F0] tracking-tight leading-tight">
                {isSubLocality ? (
                  <>
                    Computer, Laptop, Networking & CCTV Repair in{' '}
                    <span className="gradient-text">{locationDisplayName}</span>
                  </>
                ) : (
                  <>
                    Computer, Laptop & IT Repair Services in{' '}
                    <span className="gradient-text">{city.name}</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#FAF6F0]/80 leading-relaxed max-w-3xl">
                {isSubLocality
                  ? `Need dependable on-site IT support in ${locationDisplayName}? Our mobile technician fleet operates directly from our ${city.popularName || city.name} hub (${currentLocality?.distance || 'within coverage radius'}) with OEM parts, upfront quotes, and 90-day warranty.`
                  : city.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#FAF6F0]/80">
                <div className="flex items-center gap-1.5 text-[#E2B98E] font-semibold">
                  <Zap className="w-4 h-4 text-[#E2B98E]" />
                  <span>{isSubLocality ? 'Doorstep Dispatch: 45–90 Mins' : city.leadTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#9BBF9C] font-semibold">
                  <MapPin className="w-4 h-4 text-[#9BBF9C] flex-shrink-0" />
                  <span>
                    {isSubLocality
                      ? `Hub Distance: ${currentLocality?.distance || 'Within 25 km'}`
                      : city.address}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#FAF6F0]/80">
                  <ShieldCheck className="w-4 h-4 text-[#E2B98E]" />
                  <span>Up to 90 Days Warranty</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl nature-panel border border-[#E2B98E]/25 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2B98E]/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E2B98E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FAF6F0]">
                    {locationDisplayName} Service Desk
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#E2B98E] font-bold">ACTIVE</span>
              </div>

              <p className="text-xs text-[#FAF6F0]/75 leading-relaxed">
                Connect directly with our {city.name} support dispatcher for immediate slot scheduling.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 sand-btn-3d text-[#24160E] font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                    `Hello, I need computer / laptop repair assistance in ${locationDisplayName}, ${city.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp {locationDisplayName} Desk</span>
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#6E4331] hover:bg-[#85523D] text-[#FAF6F0] border border-[#E2B98E]/30 font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-95 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E2B98E]" />
                  <span>Book Service Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* City Services & Localities Section */}
      <section className="py-14 sm:py-20 bg-[#12231A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Services Available in this City / SubLocality */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block mb-1">
                Local Offerings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0]">
                Available Services in {locationDisplayName}
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/70 mt-1">
                Dedicated on-site diagnostics and repairs tailored for {locationDisplayName}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Object.values(servicesData).map((srv) => (
                <div
                  key={srv.id}
                  className="nature-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#E2B98E]/50 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#12231A] border border-[#E2B98E]/20 text-[#E2B98E] group-hover:border-[#E2B98E]/50 transition-colors">
                        {iconMap[srv.id]}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#E2B98E] bg-[#6E4331]/30 px-2 py-0.5 rounded-full border border-[#E2B98E]/20">
                        AVAILABLE
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                      {srv.shortTitle} in {locationDisplayName}
                    </h3>
                    <p className="text-xs text-[#FAF6F0]/70 mt-2 line-clamp-3 leading-relaxed">
                      {srv.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E2B98E]/10">
                    <Link
                      to={`/${city.slug}/${srv.slug}`}
                      className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#E2B98E] hover:text-[#FAF6F0] py-1 transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side By Side: Key Localities Coverage & Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Key Localities Breakdown & Service Hub Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl nature-panel border border-[#E2B98E]/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold shadow-inner">
                    Verified 25 km Coverage Radius
                  </div>
                  {isSubLocality && (
                    <Link
                      to={`/service-center/${city.slug}`}
                      className="text-xs font-semibold text-[#E2B98E] hover:underline"
                    >
                      ← All {city.name} Localities
                    </Link>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  {isSubLocality
                    ? `Localities Served Around ${locationDisplayName}`
                    : `Key Localities Served in ${city.name} (Within 25 km Radius)`}
                </h3>
                
                <p className="text-xs text-[#FAF6F0]/75 leading-relaxed">
                  Our mobile technician units operate throughout the following neighbourhoods strictly within a <strong className="text-[#E2B98E]">25 km radius</strong> of our service center ({city.address}):
                </p>

                {/* Localities Grid with Clickable Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {allParsedLocalities.map((loc, idx) => {
                    const isSelected = isSubLocality && currentLocality?.slug === loc.slug;
                    return (
                      <Link
                        key={idx}
                        to={`/service-center/${city.slug}/${loc.slug}`}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all shadow-sm group ${
                          isSelected
                            ? 'bg-[#E2B98E] text-[#24160E] font-bold border-[#E2B98E] shadow-md'
                            : 'bg-[#12231A]/80 border-[#E2B98E]/15 text-[#FAF6F0]/90 hover:border-[#E2B98E] hover:bg-[#183023] hover:text-[#E2B98E]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin
                            className={`w-3.5 h-3.5 flex-shrink-0 group-hover:scale-110 transition-transform ${
                              isSelected ? 'text-[#24160E]' : 'text-[#E2B98E]'
                            }`}
                          />
                          <span className="truncate font-medium">{loc.name}</span>
                          {loc.distance && (
                            <span
                              className={`text-[10px] shrink-0 ${
                                isSelected ? 'text-[#24160E]/70' : 'text-[#FAF6F0]/50'
                              }`}
                            >
                              ({loc.distance})
                            </span>
                          )}
                        </div>
                        <ArrowRight
                          className={`w-3 h-3 group-hover:translate-x-0.5 transition-all shrink-0 ml-1 ${
                            isSelected ? 'text-[#24160E]' : 'text-[#E2B98E]/50 group-hover:text-[#E2B98E]'
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[#E2B98E]/10 text-xs text-[#FAF6F0]/70 flex flex-col gap-1.5">
                  <span>Need service at a doorstep in {locationDisplayName}?</span>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-[#E2B98E] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Call for instant route dispatch →</span>
                  </a>
                </div>
              </div>

              {/* Regional Service Commitments & Operating Timings */}
              <div className="p-5 rounded-2xl nature-panel border border-[#E2B98E]/15 space-y-3">
                <h4 className="text-sm font-bold text-[#FAF6F0] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7AA27D]" />
                  <span>{locationDisplayName} Service Commitments</span>
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
                    <span><strong>Operating Service Hub:</strong> {city.serviceHub}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div id="booking-section" className="lg:col-span-7 scroll-mt-28">
              <EnquiryForm
                initialCity={city.id}
                title={`Book an IT Repair in ${locationDisplayName}`}
                subtitle={`Instant doorstep technician dispatch for ${locationDisplayName}, ${city.name}. Select your service below.`}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
export default LocationDetailPage;
