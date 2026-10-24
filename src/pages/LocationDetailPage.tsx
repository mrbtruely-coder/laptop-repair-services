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
    'laptop-repair': <Laptop className="w-5 h-5 text-[#16A34A]" />,
    'computer-repair': <Monitor className="w-5 h-5 text-[#06223A]" />,
    'networking': <Network className="w-5 h-5 text-[#16A34A]" />,
    'cctv-repair-installation': <Video className="w-5 h-5 text-[#06223A]" />,
  };

  const cityTitles: Record<string, string> = {
    bengaluru: 'Doorstep Laptop, Computer, Networking & CCTV Repair Services in Bengaluru | 90-Min Dispatch',
    vizag: 'Laptop & Computer Repair in Vizag (Visakhapatnam) | CCTV Installation & Networking Services',
    chennai: 'Doorstep Laptop & Computer Repair in Chennai | CCTV Camera & Networking Support',
    hyderabad: 'Doorstep Laptop & Computer Repair in Hyderabad | CCTV & Networking Services | 90-Min Arrival',
    'chanda-nagar': 'Doorstep Laptop & Computer Repair in Hyderabad | CCTV & Networking Services | 90-Min Arrival',
    'Chanda Nagar': 'Doorstep Laptop & Computer Repair in Hyderabad | CCTV & Networking Services | 90-Min Arrival',
    'nellore': 'Doorstep Laptop & Computer Repair in Hyderabad | CCTV & Networking Services | 90-Min Arrival',
  };

  const cityDescriptions: Record<string, string> = {
    bengaluru: 'Need quick computer or laptop repair in Bengaluru? Our certified technicians visit your doorstep across HSR Layout, Koramangala, Whitefield, and all Bengaluru areas. We fix laptop screens, motherboard issues, desktop problems, Wi-Fi networking, and CCTV cameras with genuine parts and a 90-day warranty.',
    vizag: 'Get fast, reliable doorstep computer and laptop repair in Visakhapatnam (Vizag). Serving Dwaraka Nagar, MVP Colony, Gajuwaka, and all Vizag localities. Chip-level motherboard fixes, broken screen replacement, desktop repairs, CCTV camera setup, and home Wi-Fi networking with a 90-day warranty.',
    chennai: 'Looking for professional computer or laptop repair in Chennai? Our expert technicians provide fast doorstep service across Adyar, OMR, Velachery, T Nagar, Anna Nagar, and all Chennai areas. We repair laptops, desktop PCs, CCTV surveillance systems, and office Wi-Fi networks with upfront pricing and a 90-day warranty.',
    hyderabad: 'Fast same-day computer and laptop repair at your doorstep in Hyderabad. Serving Hitec City, Madhapur, Gachibowli, Kondapur, Chanda Nagar, Kukatpally, and all Hyderabad localities. Expert chip-level motherboard repair, screen replacement, desktop troubleshooting, CCTV setup, and Wi-Fi cabling with a 90-day warranty.',
    'chanda-nagar': 'Fast same-day computer and laptop repair at your doorstep in Hyderabad. Serving Hitec City, Madhapur, Gachibowli, Kondapur, Chanda Nagar, Kukatpally, and all Hyderabad localities. Expert chip-level motherboard repair, screen replacement, desktop troubleshooting, CCTV setup, and Wi-Fi cabling with a 90-day warranty.',
  };

  const pageTitle = isSubLocality
    ? `Laptop & Computer Repair in ${locationDisplayName}, ${city.name} | Doorstep Service & CCTV Setup`
    : cityTitles[city.id] || `Computer, Laptop, Networking & CCTV Repair Services in ${city.name}`;

  const pageDescription = isSubLocality
    ? `Need fast doorstep computer or laptop repair in ${locationDisplayName}, ${city.name}? Our certified technicians reach within 45–90 mins with genuine parts, chip-level motherboard repair, screen replacement, Wi-Fi networking, and CCTV camera setup with 90-day warranty.`
    : cityDescriptions[city.id] || city.description;

  const canonicalPath = isSubLocality
    ? `/service-center/${city.slug}/${currentLocality?.slug}`
    : `/service-center/${city.slug}`;

  // Keywords tailored strictly by URL type:
  // - Area based URLs: city + service + area keywords
  // - City based URLs: city + service keywords
  const pageKeywords = isSubLocality
    ? [
        `laptop repair ${locationDisplayName} ${city.name}`,
        `computer repair ${locationDisplayName} ${city.name}`,
        `desktop repair ${locationDisplayName} ${city.name}`,
        `CCTV camera installation ${locationDisplayName} ${city.name}`,
        `networking service ${locationDisplayName} ${city.name}`,
        `doorstep laptop repair ${locationDisplayName}`,
        `motherboard chip repair ${locationDisplayName} ${city.name}`,
        `laptop screen replacement ${locationDisplayName}`,
        `MacBook repair ${locationDisplayName} ${city.name}`,
        `computer technician in ${locationDisplayName}`
      ]
    : [
        `laptop repair ${city.name}`,
        `computer repair ${city.name}`,
        `doorstep laptop service ${city.name}`,
        `desktop PC repair ${city.name}`,
        `CCTV camera installation ${city.name}`,
        `office networking CAT6 cabling ${city.name}`,
        `laptop motherboard chip repair ${city.name}`,
        `laptop screen replacement ${city.name}`,
        `MacBook repair ${city.name}`,
        `computer technician near me ${city.name}`
      ];

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
      answer: `We provide certified doorstep technician dispatch across ${city.name}. For ${locationDisplayName}${currentLocality?.distance ? ` (${currentLocality.distance})` : ''}, technician arrival is typically within 45 to 90 minutes of booking confirmation.`
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
        keywords={pageKeywords}
        breadcrumbs={breadcrumbsList}
        city={city.name}
        state={city.state}
        faqs={pageFaqs}
      />

      <Breadcrumbs items={breadcrumbsItems} />

      {/* Hero Header */}
      <section className="py-10 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>
                  {isSubLocality
                    ? `Verified Doorstep Hub • ${fullDisplayName}`
                    : `Verified City Service Coverage • ${city.state}`}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                {isSubLocality ? (
                  <>
                    Computer, Laptop, Networking & CCTV Repair in{' '}
                    <span className="text-[#16A34A]">{locationDisplayName}</span>
                  </>
                ) : (
                  <>
                    Computer, Laptop & IT Repair Services in{' '}
                    <span className="text-[#16A34A]">{city.name}</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
                {isSubLocality
                  ? `Need reliable on-site IT support in ${locationDisplayName}? Our mobile technician squad dispatches directly from our ${city.popularName || city.name} hub (${currentLocality?.distance || 'within coverage radius'}) with authentic OEM parts, zero hidden diagnostic fees, and a 90-day warranty.`
                  : `Need fast, reliable doorstep computer, laptop, networking, or CCTV repair in ${city.name}? Our certified technicians reach your doorstep with genuine spare parts, transparent diagnosis, and a 90-day warranty.`}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                  <Zap className="w-4 h-4 text-[#16A34A]" />
                  <span>{isSubLocality ? 'Doorstep Dispatch: 45–90 Mins' : city.leadTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <MapPin className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span>
                    {isSubLocality
                      ? `Hub Distance: ${currentLocality?.distance || 'Within 25 km'}`
                      : city.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Up to 90 Days Warranty</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    {locationDisplayName} Service Desk
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#16A34A] font-bold">ACTIVE</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our {city.name} support dispatcher for immediate slot scheduling.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#22C55E]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                    `Hello, I need computer / laptop repair assistance in ${locationDisplayName}, ${city.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm active:scale-95"
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

      {/* City Services & Localities Section */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Services Available in this City / SubLocality */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
                Local Offerings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                Available Services in {locationDisplayName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Dedicated on-site diagnostics and repairs tailored for {locationDisplayName}.
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
                      {srv.shortTitle} in {locationDisplayName}
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

          {/* Side By Side: Key Localities Coverage & Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Key Localities Breakdown & Service Hub Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold">
                    Verified 25 km Coverage Radius
                  </div>
                  {isSubLocality && (
                    <Link
                      to={`/service-center/${city.slug}`}
                      className="text-xs font-semibold text-[#16A34A] hover:underline"
                    >
                      ← All {city.name} Localities
                    </Link>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  {isSubLocality
                    ? `Localities Served Around ${locationDisplayName}`
                    : `Key Localities Served in ${city.name} (Within 25 km Radius)`}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Our mobile technician units operate throughout the following neighbourhoods across {city.name} strictly within a <strong className="text-black">25 km radius</strong>:
                </p>

                {/* Localities Grid with Clickable Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {allParsedLocalities.map((loc, idx) => {
                    const isSelected = isSubLocality && currentLocality?.slug === loc.slug;
                    return (
                      <Link
                        key={idx}
                        to={`/service-center/${city.slug}/${loc.slug}`}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all shadow-xs group ${isSelected
                            ? 'bg-[#22C55E]/15 text-black font-extrabold border-[#22C55E]'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-[#22C55E] hover:bg-white'
                          }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin
                            className={`w-3.5 h-3.5 flex-shrink-0 group-hover:scale-110 transition-transform ${isSelected ? 'text-[#16A34A]' : 'text-slate-500'
                              }`}
                          />
                          <span className="truncate font-semibold">{loc.name}</span>
                          {loc.distance && (
                            <span
                              className="text-[10px] shrink-0 text-slate-400"
                            >
                              ({loc.distance})
                            </span>
                          )}
                        </div>
                        <ArrowRight
                          className={`w-3 h-3 group-hover:translate-x-0.5 transition-all shrink-0 ml-1 ${isSelected ? 'text-[#16A34A]' : 'text-slate-400 group-hover:text-[#16A34A]'
                            }`}
                        />
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex flex-col gap-1.5">
                  <span>Need service at a doorstep in {locationDisplayName}?</span>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-[#16A34A] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Call for instant route dispatch →</span>
                  </a>
                </div>
              </div>

              {/* Regional Service Commitments & Operating Timings */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <h4 className="text-sm font-bold text-black flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>{locationDisplayName} Service Commitments</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {city.serviceHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                    <span><strong>Working Hours:</strong> {siteConfig.workingHours}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                    <span><strong>Operating Service Hub:</strong> {city.name} Hub</span>
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
