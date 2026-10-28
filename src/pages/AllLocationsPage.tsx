import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { primaryCities, parseLocality } from '../config/site';
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Shield,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface HubMeta {
  tag: string;
  pin: string;
  hubBase: string;
  description: string;
}

const hubMetadata: Record<string, HubMeta> = {
  hyderabad: {
    tag: 'Primary Hub',
    pin: '500081',
    hubBase: 'Hitec City Dispatch Base',
    description:
      'Full doorstep laptop & computer repair coverage across all residential colonies and commercial IT hubs within a 10 KM radius of Hitec City.',
  },
  bengaluru: {
    tag: 'Tech Corridor',
    pin: '560102',
    hubBase: 'HSR Layout & Indiranagar Hub',
    description:
      'Immediate doorstep technician dispatch covering all residential layouts and tech parks within a 10 KM radius of HSR Layout & Koramangala.',
  },
  chennai: {
    tag: 'Fast Response',
    pin: '600017',
    hubBase: 'T Nagar & OMR Dispatch Base',
    description:
      'Same-day doorstep computer and hardware servicing across all residential neighborhoods within a 10 KM perimeter of T Nagar & Guindy.',
  },
  vizag: {
    tag: 'Verified Technicians',
    pin: '530016',
    hubBase: 'Dwaraka Nagar Central Hub',
    description:
      'Express doorstep IT assistance across all coastal colonies and commercial hubs within a 10 KM radius of Dwaraka Nagar & MVP Colony.',
  },
};

const categoryServices = [
  {
    id: 'laptop-repair',
    title: 'Laptop Repair & Servicing',
    subcategories: '7 Subcategories',
    price: 'Starts from ₹299',
    desc: 'Expert repair for broken screens, battery drain, liquid damage, keyboard faults, and chip-level motherboard issues across all leading brands.',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    link: '/services/laptop-repair',
  },
  {
    id: 'desktop-repair',
    title: 'Desktop PC & Workstation Repair',
    subcategories: '5 Subcategories',
    price: 'Starts from ₹299',
    desc: 'Hardware diagnostics, SMPS power supply replacement, CPU overheating fixes, graphic card testing, and custom PC assembly.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    link: '/services/computer-repair',
  },
  {
    id: 'mac-repair',
    title: 'MacBook & Apple Repair',
    subcategories: '4 Subcategories',
    price: 'Starts from ₹299',
    desc: 'Specialized MacBook Air, MacBook Pro & iMac diagnostics, retina display panel replacement, logic board repairs, and battery replacement.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    link: '/services/laptop-repair',
  },
  {
    id: 'cctv-services',
    title: 'CCTV & Security Camera Setup',
    subcategories: '4 Subcategories',
    price: 'Starts from ₹299',
    desc: 'HD analog & 4K IP camera installation, DVR/NVR surveillance hard drive setup, mobile live viewing configuration, and maintenance.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    link: '/services/cctv-repair-installation',
  },
  {
    id: 'networking-services',
    title: 'Networking & Wi-Fi Solutions',
    subcategories: '4 Subcategories',
    price: 'Starts from ₹299',
    desc: 'Structured CAT6 enterprise cabling, mesh Wi-Fi router optimization, network switch routing, and office network troubleshooting.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    link: '/services/networking',
  },
  {
    id: 'data-recovery',
    title: 'Data Recovery & Storage',
    subcategories: '4 Subcategories',
    price: 'Starts from ₹299',
    desc: 'Clean-room data extraction from clicking hard drives, formatted SSDs, unbootable laptops, and operating system recovery.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    link: '/services/laptop-repair',
  },
];

export const AllLocationsPage: React.FC = () => {
  const [selectedHubFilter, setSelectedHubFilter] = useState<string>('all');
  const [expandedCities, setExpandedCities] = useState<Record<string, boolean>>({});

  const toggleCityExpand = (cityId: string) => {
    setExpandedCities((prev) => ({
      ...prev,
      [cityId]: !prev[cityId],
    }));
  };

  const filteredCities =
    selectedHubFilter === 'all'
      ? primaryCities
      : primaryCities.filter((c) => c.id === selectedHubFilter);

  return (
    <>
      <SEO
        title="Service Hubs & Doorstep IT Repair Locations | Bengaluru & Hyderabad"
        description="Find verified doorstep laptop, computer, networking, and CCTV service centers across Hyderabad, Bengaluru, Chennai, and Visakhapatnam (Vizag). 60–90 min arrival with warranty."
        canonicalPath="/service-center"
        keywords={[
          'laptop repair centers',
          'computer service Bengaluru',
          'laptop repair Hyderabad',
          'doorstep IT repair Chennai',
          'computer service Vizag',
          'CCTV service hubs'
        ]}
        breadcrumbs={[{ name: 'Service Centers', url: '/service-center' }]}
      />

      {/* ========================================================
          1. TOP BREADCRUMBS & SELECT HUB BAR
         ======================================================== */}
      <section className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Breadcrumbs
            items={[
              { label: 'Locations', path: '/service-center' },
              { label: `All City Hubs & Coverage (${primaryCities.length} Cities)` },
            ]}
          />

          {/* Quick Hub Switcher Filter */}
          <div className="flex items-center gap-1.5 flex-wrap self-start md:self-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Select Hub:
            </span>
            <button
              type="button"
              onClick={() => setSelectedHubFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedHubFilter === 'all'
                  ? 'bg-[#06223A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Hubs
            </button>
            {primaryCities.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedHubFilter(c.id)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedHubFilter === c.id
                    ? 'bg-[#06223A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MapPin className="w-2.5 h-2.5 text-[#22C55E]" />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CENTERED HERO & 4-METRIC TRUST BAR
         ======================================================== */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Top Pill Badge (Navy Blue with Green Accent) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06223A] text-white text-xs font-bold tracking-wide shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="uppercase tracking-wider">
              10 KM Service Radius Across {primaryCities.length} Cities
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#06223A] tracking-tight">
            All Service Hubs &{' '}
            <span className="text-[#16A34A]">Coverage Areas</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Verified doorstep technician squads operating across{' '}
            <strong className="text-slate-900 font-semibold">
              Hyderabad, Bengaluru, Chennai, and Nellore/Vizag
            </strong>
            . Enjoy fast{' '}
            <strong className="text-slate-900 font-semibold">
              60 to 90–minute arrival
            </strong>
            , ₹0 Booking Fee, and 100% transparent diagnostics across a{' '}
            <strong className="text-[#16A34A] font-semibold">
              10 KM radial perimeter
            </strong>{' '}
            in each central hub.
          </p>

          {/* 4-Metric Trust Bar */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-start gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#06223A]">
                  4 Dedicated Hubs
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Hyd, Blr, Chn, Vizag
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-start gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#06223A]">
                  60–90 Min Arrival
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Doorstep tech squad
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-start gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#06223A]">
                  90 Days Warranty
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  100% Genuine spares
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-start gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#06223A]">
                  10 KM Radial Reach
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  All residential areas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. MAIN HUB DIRECTORY: "Select Your City Service Hub"
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              CENTRAL SERVICE HUBS
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06223A]">
              Select Your City Service Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Click on your city to view its exact colony coverage map or click any residential colony tag to book immediately.
            </p>
          </div>

          {/* Hub Cards Grid (Exact Reference Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filteredCities.map((city) => {
              const meta = hubMetadata[city.id] || {
                tag: 'Primary Hub',
                pin: '500001',
                hubBase: `${city.name} Central Hub`,
                description: `Full doorstep IT repair coverage across residential colonies and commercial hubs in ${city.name}.`,
              };

              const isExpanded = !!expandedCities[city.id];
              // Sub area show limited (5 items), with 'Add More' expander
              const visibleLocalities = isExpanded
                ? city.localities
                : city.localities.slice(0, 5);
              const remainingCount = city.localities.length - 5;

              return (
                <div
                  key={city.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-[#22C55E] transition-all flex flex-col justify-between group shadow-sm relative"
                >
                  <div className="space-y-4">
                    {/* Top Row: Pill Tag + PIN Code */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-[#06223A] text-[11px] font-bold border border-slate-200">
                        <Zap className="w-3 h-3 text-[#16A34A]" />
                        <span>{meta.tag}</span>
                      </span>
                      <span className="text-xs font-bold text-[#16A34A]">
                        PIN: {meta.pin}
                      </span>
                    </div>

                    {/* Hub Title & Address Base */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#06223A] group-hover:text-[#16A34A] transition-colors">
                        {city.name} Hub
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                        <span className="truncate">{meta.hubBase}</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {meta.description}
                    </p>

                    {/* Radial Coverage Box */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#06223A] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                      <span>10 KM Radial Coverage • 60–90 Minutes Arrival</span>
                    </div>

                    {/* Key Colonies Covered with "Add More" Toggle */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>KEY COLONIES COVERED ({city.localities.length}):</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {visibleLocalities.map((locStr, idx) => {
                          const parsed = parseLocality(locStr);
                          return (
                            <Link
                              key={idx}
                              to={`/book-service?city=${city.slug}&subArea=${encodeURIComponent(parsed.name)}`}
                              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-[#22C55E]/15 hover:text-[#16A34A] text-slate-700 font-medium transition-colors"
                              title={`Book doorstep service in ${parsed.name}`}
                            >
                              <MapPin className="w-2.5 h-2.5 text-rose-500 flex-shrink-0" />
                              <span>{parsed.name}</span>
                            </Link>
                          );
                        })}

                        {/* "Add More / Show Less" Expander Button */}
                        {remainingCount > 0 && (
                          <button
                            type="button"
                            onClick={() => toggleCityExpand(city.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] hover:text-[#15803D] bg-[#22C55E]/10 hover:bg-[#22C55E]/20 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            {isExpanded ? (
                              <>
                                <span>Show less</span>
                                <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>+ {remainingCount} more</span>
                                <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dual CTA Buttons (Primary Navy Blue + Outlined Book) */}
                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                    <Link
                      to={`/${city.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>Explore {city.name} Hub Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/book-service?city=${city.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#06223A] text-[#06223A] text-xs font-bold transition-all text-center block"
                    >
                      Book Service in {city.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CATEGORY SERVICES SECTION ("Available Across Hubs")
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              DOORSTEP IT & COMPUTER SERVICES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06223A]">
              Available Across Hyderabad, Bengaluru, Chennai & Vizag
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All computer, laptop, networking, and CCTV services are supported across all 4 central hubs with certified doorstep engineers.
            </p>
          </div>

          {/* 6 Category Service Cards Grid (Exact Reference Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#22C55E] transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Tag */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#06223A]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-sm">
                      {srv.subcategories}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#06223A] group-hover:text-[#16A34A] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Price & Link with Arrow */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 pt-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      STARTS FROM
                    </div>
                    <div className="text-sm font-extrabold text-[#06223A] flex items-center gap-1">
                      <span>₹299</span>
                      <span className="text-[10px] text-slate-500 font-normal">Diagnostic</span>
                    </div>
                  </div>
                  <Link
                    to={srv.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] hover:text-[#15803D] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>View Subcategories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 10 KM Radial Radius Assurance Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-slate-800 shadow-2xs max-w-4xl mx-auto mt-10">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#16A34A] flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="font-extrabold text-[#06223A]">
                10 KM Radial Radius Assurance:
              </strong>{' '}
              Every home, apartment, and IT corridor located within a 10 KM radius from any of our 4 central service hubs (Hitec City, HSR Layout, T Nagar, Dwaraka Nagar) is fully supported with express same-day doorstep technician dispatch.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
