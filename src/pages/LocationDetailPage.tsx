import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { citiesData, siteConfig, parseLocality } from '../config/site';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Calendar,
  Navigation,
  Loader2,
  X,
  AlertCircle
} from 'lucide-react';

export const LocationDetailPage: React.FC = () => {
  const { citySlug, localitySlug } = useParams<{ citySlug: string; localitySlug?: string }>();
  const navigate = useNavigate();
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

  // Local state for interactive sub-area selection and "+ Other" drawer
  const [selectedSubArea, setSelectedSubArea] = useState<string>(currentLocality?.name || '');
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [customColony, setCustomColony] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectStatus, setDetectStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleBookingRedirect = (targetService?: string, subAreaName?: string, otherName?: string) => {
    const params = new URLSearchParams();
    params.set('city', city.id);
    if (targetService) params.set('service', targetService);
    if (subAreaName) params.set('subArea', subAreaName);
    if (otherName) params.set('otherSubArea', otherName);
    navigate(`/book-service?${params.toString()}`);
  };

  // Helper to format high-precision, exact user location
  const formatExactLocation = (data: any): string => {
    if (!data) return '';
    const addr = data.address || {};
    const clean = (s?: string) => (s || '').replace(/^Ward \d+\s*/i, '').trim();
    const parts: string[] = [];

    // 1. Specific building, house number, shop, office, or landmark
    const building = addr.building || addr.house_name || addr.amenity || addr.office || addr.shop || '';
    if (building && building !== addr.road && !parts.includes(building)) {
      parts.push(building);
    }
    if (addr.house_number && !parts.some((p) => p.includes(addr.house_number))) {
      parts.push(addr.house_number);
    }

    // 2. Road, Street, or Lane
    const road = addr.road || addr.street || addr.pedestrian || addr.footway || '';
    if (road && !parts.some((p) => p.toLowerCase() === road.toLowerCase())) {
      parts.push(road);
    }

    // 3. Exact Colony, Neighbourhood, Residential Area, Sector, Phase, or Block
    const colony = clean(
      addr.neighbourhood ||
      addr.residential ||
      addr.subdivision ||
      addr.quarter ||
      addr.commercial ||
      addr.hamlet ||
      addr.village
    );
    if (colony && !parts.some((p) => p.toLowerCase() === colony.toLowerCase())) {
      parts.push(colony);
    }

    // 4. Suburb / Main Locality (e.g. Banjara Hills, Madhapur, Hitec City)
    const suburb = clean(addr.suburb || addr.city_district || addr.district);
    if (suburb && !parts.some((p) => p.toLowerCase().includes(suburb.toLowerCase()))) {
      parts.push(suburb);
    }

    // 5. City / Town
    const city = clean(addr.city || addr.town || addr.municipality || '');
    if (city && !parts.some((p) => p.toLowerCase().includes(city.toLowerCase()))) {
      parts.push(city);
    }

    // 6. Postcode / PIN Code
    if (addr.postcode && !parts.some((p) => p.includes(addr.postcode))) {
      parts.push(addr.postcode);
    }

    // If structured address details are rich (2+ parts), return them
    if (parts.length >= 2) {
      return parts.join(', ');
    }

    // Fallback: clean display_name by filtering out broad administrative labels
    if (data.display_name) {
      const rawSegments = data.display_name.split(',').map((s: string) => s.trim());
      const filtered = rawSegments.filter((seg: string) => {
        const lower = seg.toLowerCase();
        return (
          !lower.includes('greater hyderabad') &&
          !lower.includes('municipal corporation') &&
          !lower.includes('zone') &&
          !lower.includes('mandal') &&
          lower !== 'india'
        );
      });
      if (filtered.length > 0) {
        return filtered.slice(0, 4).join(', ');
      }
    }

    return parts.join(', ') || data.display_name || 'Current Location';
  };

  // Option B: High-Accuracy Auto-detect location handler using GPS & Reverse Geocoding
  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      setDetectStatus({
        type: 'error',
        text: 'Geolocation is not supported by your browser. Please type your colony manually.',
      });
      return;
    }
    setIsDetectingLocation(true);
    setDetectStatus(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const data = await res.json();
            const resultStr = formatExactLocation(data);

            setCustomColony(resultStr);
            setSelectedSubArea('Other');
            setDetectStatus({
              type: 'success',
              text: `✅ Exact location detected: ${resultStr}`,
            });
          } else {
            // Fallback: BigDataCloud client-side reverse geocode
            try {
              const bdcRes = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              if (bdcRes.ok) {
                const bdcData = await bdcRes.json();
                const bdcParts = [
                  bdcData.locality,
                  bdcData.principalSubdivision,
                  bdcData.city,
                  bdcData.postcode,
                ].filter(Boolean);
                const bdcStr = bdcParts.join(', ') || `GPS Pin (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
                setCustomColony(bdcStr);
                setSelectedSubArea('Other');
                setDetectStatus({
                  type: 'success',
                  text: `✅ Exact location detected: ${bdcStr}`,
                });
              } else {
                throw new Error('Fallback failed');
              }
            } catch {
              const fallback = `GPS Pin (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
              setCustomColony(fallback);
              setSelectedSubArea('Other');
              setDetectStatus({
                type: 'success',
                text: `✅ Acquired GPS coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
              });
            }
          }
        } catch {
          const fallback = `GPS Pin (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
          setCustomColony(fallback);
          setSelectedSubArea('Other');
          setDetectStatus({
            type: 'success',
            text: `✅ Acquired GPS coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          });
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (err) => {
        setIsDetectingLocation(false);
        if (err.code === err.PERMISSION_DENIED) {
          setDetectStatus({
            type: 'error',
            text: '⚠️ GPS permission denied. Please allow location access or type your colony name manually.',
          });
        } else {
          setDetectStatus({
            type: 'error',
            text: '⚠️ Could not acquire real-time GPS coordinates. Please enter manually.',
          });
        }
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  const cityTitles: Record<string, string> = {
    bengaluru: 'Laptop & Computer Repair in Bengaluru | Doorstep IT & CCTV Service',
    vizag: 'Laptop & Computer Repair in Vizag | Doorstep CCTV & IT Servicing',
    chennai: 'Laptop & Computer Repair in Chennai | Doorstep CCTV & IT Support',
    hyderabad: 'Laptop & Computer Repair in Hyderabad | Doorstep CCTV & IT Service',
    'chanda-nagar': 'Laptop & Computer Repair in Hyderabad | Doorstep CCTV & IT Service',
    'Chanda Nagar': 'Laptop & Computer Repair in Hyderabad | Doorstep CCTV & IT Service',
    'nellore': 'Laptop & Computer Repair in Hyderabad | Doorstep CCTV & IT Service',
  };

  const cityDescriptions: Record<string, string> = {
    bengaluru: 'Certified doorstep laptop and computer repair in Bengaluru. We fix screens, motherboard issues, desktop problems, Wi-Fi networking, and CCTV cameras with genuine parts and a 90-day warranty across all layouts.',
    vizag: 'Doorstep computer and laptop repair in Visakhapatnam (Vizag). Serving Dwaraka Nagar, MVP Colony & Gajuwaka. Chip-level motherboard fixes, broken screens, CCTV camera setup, and Wi-Fi networking with a 90-day warranty.',
    chennai: 'Professional doorstep computer and laptop repair in Chennai across Adyar, OMR, Velachery, and T Nagar. We repair laptops, desktop PCs, CCTV cameras, and Wi-Fi networks with upfront pricing and a 90-day warranty.',
    hyderabad: 'Fast same-day computer and laptop repair at your doorstep in Hyderabad. Serving Hitec City, Madhapur, Gachibowli, and Chanda Nagar. Expert chip-level motherboard repair, screen replacement, CCTV setup, and 90-day warranty.',
    'chanda-nagar': 'Fast same-day computer and laptop repair at your doorstep in Hyderabad. Serving Hitec City, Madhapur, Gachibowli, and Chanda Nagar. Expert chip-level motherboard repair, screen replacement, CCTV setup, and 90-day warranty.',
  };

  const pageTitle = isSubLocality
    ? `Laptop & Computer Repair in ${locationDisplayName}, ${city.name} | Doorstep Service`
    : cityTitles[city.id] || `Computer & Laptop Repair in ${city.name} | Doorstep Service`;

  const pageDescription = isSubLocality
    ? `Fast doorstep computer and laptop repair in ${locationDisplayName}, ${city.name}. Certified technician visit within 45–90 mins with genuine parts, chip-level motherboard repair, screen replacement, and CCTV setup with a 90-day warranty.`
    : cityDescriptions[city.id] || city.description;

  const canonicalPath = isSubLocality
    ? `/${city.slug}/${currentLocality?.slug}`
    : `/${city.slug}`;

  const pageKeywords = isSubLocality
    ? [
        `laptop repair ${locationDisplayName}`,
        `computer repair ${locationDisplayName}`,
        `doorstep laptop repair ${city.name}`,
        `CCTV camera installation ${locationDisplayName}`,
        `motherboard repair ${locationDisplayName}`,
        `laptop screen replacement ${city.name}`,
        `desktop PC repair ${locationDisplayName}`,
      ]
    : [
        `laptop repair ${city.name}`,
        `computer repair ${city.name}`,
        `doorstep laptop service ${city.name}`,
        `desktop PC repair ${city.name}`,
        `CCTV installation ${city.name}`,
        `motherboard chip repair ${city.name}`,
        `laptop screen replacement ${city.name}`,
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

  // 4 Core IT Services with Authentic Visual Cards (Strictly Brand Colors: Navy Blue & Green)
  const itServices = [
    {
      id: 'laptop-repair',
      slug: 'laptop-repair',
      title: `Laptop Repair in ${locationDisplayName}`,
      desc: 'Chip-level motherboard repair, broken screen replacement, keyboard & battery replacement, overheating & liquid damage fix.',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
      tag: 'TECH ON SITE',
      turnaround: 'Same-Day Service',
      deliverables: ['Motherboard Chip Repair', 'Screen & Battery Replacement'],
      fee: 'From ₹299',
    },
    {
      id: 'computer-repair',
      slug: 'computer-repair',
      title: `Computer & PC Repair in ${locationDisplayName}`,
      desc: 'Hardware diagnostics, custom workstation fixes, SMPS power solutions, blue screen (BSOD) recovery, and GPU servicing.',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
      tag: 'TECH ON SITE',
      turnaround: 'Same-Day Service',
      deliverables: ['SMPS & Power Supply', 'Blue Screen (BSOD) Fix'],
      fee: 'From ₹299',
    },
    {
      id: 'networking',
      slug: 'networking',
      title: `Networking Support in ${locationDisplayName}`,
      desc: 'High-speed Wi-Fi 6 mesh setup, office structured CAT6 cabling, router/firewall configuration, and server rack dressing.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
      tag: 'TECH ON SITE',
      turnaround: 'Same-Day Service',
      deliverables: ['Wi-Fi Mesh & Dead Zones', 'Structured CAT6 Cabling'],
      fee: 'From ₹299',
    },
    {
      id: 'cctv-repair-installation',
      slug: 'cctv-repair-installation',
      title: `CCTV Installation & Repair in ${locationDisplayName}`,
      desc: 'HD/IP security camera setup, DVR/NVR hard drive recovery, mobile app live view configuration, and wiring repairs.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
      tag: 'TECH ON SITE',
      turnaround: 'Same-Day Service',
      deliverables: ['Camera Offline & Wiring', 'DVR / NVR Storage Fix'],
      fee: 'From ₹299',
    },
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

      {/* Top Header: Breadcrumbs + Hub Quick-Switcher Pills (Navy & Green) */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              SELECT HUB:
            </span>
            {[
              { id: 'hyderabad', name: 'Hyderabad' },
              { id: 'bengaluru', name: 'Bengaluru' },
              { id: 'chennai', name: 'Chennai' },
              { id: 'vizag', name: 'Vizag' },
            ].map((hub) => {
              const isActive = city.id === hub.id;
              return (
                <Link
                  key={hub.id}
                  to={`/${hub.id}`}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#06223A] text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-[#22C55E] hover:text-[#16A34A]'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-[#22C55E]" />
                  <span>{hub.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          1. CENTER-ALIGNED HERO SECTION WITH 4-METRIC TRUST BAR
         ======================================================== */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Top Radial Badge (Navy Blue & Green) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06223A] text-white text-xs font-bold tracking-wider uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>10 KM SERVICE RADIUS COVERING {city.name.toUpperCase()}</span>
          </div>

          {/* Main Headline (Black & Logo Green) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-tight max-w-4xl mx-auto">
            Doorstep Computer & Laptop Repair in{' '}
            <span className="text-[#22C55E]">{locationDisplayName}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Certified multi-brand technicians dispatched directly to your home within 60 to 90 minutes. Enjoy ₹0 Booking Fee and comprehensive repair coverage across all residential colonies within a 10 KM Radius of our {city.name} Dispatch Hub.
          </p>

          {/* 4-Metric Trust Bar (Clean Neutral Container with Logo Green & Navy Accents) */}
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#16A34A] shadow-2xs flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-[#06223A] leading-tight">
                  10 KM Radial Reach
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                  All residential colonies & apartments covered
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#16A34A] shadow-2xs flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-[#06223A] leading-tight">
                  45–90 Min Arrival
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                  Lightning fast technician dispatch
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#16A34A] shadow-2xs flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-[#06223A] leading-tight">
                  90 Days Warranty
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                  Genuine OEM parts & service guarantee
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#16A34A] shadow-2xs flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-[#06223A] leading-tight">
                  Local Hub: {city.name}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                  Direct regional dispatch & tech squad
                </div>
              </div>
            </div>
          </div>

          {/* 3 Centered Action Buttons (Navy Blue, White & Logo Green) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleBookingRedirect()}
              className="px-6 py-3.5 rounded-xl bg-[#06223A] hover:bg-[#0A3356] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#22C55E]" />
              <span>Book Service in {locationDisplayName}</span>
            </button>

            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-extrabold shadow-2xs transition-all active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#06223A]" />
              <span>Call Dispatch: {siteConfig.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                `Hello, I need computer / laptop repair assistance in ${locationDisplayName}, ${city.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp {locationDisplayName} Desk</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. COLONIES & AREAS COVERED WITHIN 10 KM OF CITY
         ======================================================== */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              LOCAL SERVICE COVERAGE
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black">
              Colonies & Areas Covered Within 10 KM of {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our mobile IT squads reach all residential areas and gated communities within 60–90 minutes across your local hub. All sub-areas below receive guaranteed priority dispatch.
            </p>
          </div>

          {/* Sub-Areas Grid + '+ Other Sub-Area / Colony' card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allParsedLocalities.map((loc) => {
              const isSelected = selectedSubArea === loc.name;
              return (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => handleBookingRedirect(undefined, loc.name)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer shadow-2xs group ${
                    isSelected
                      ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] text-[#06223A] ring-2 ring-[#22C55E]/20 shadow-xs font-bold'
                      : 'bg-white border-slate-200 hover:border-[#22C55E] hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#22C55E] text-white'
                          : 'bg-slate-100 border border-slate-200 text-[#06223A] group-hover:bg-[#22C55E]/10 group-hover:text-[#16A34A]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-slate-900 truncate group-hover:text-[#16A34A]">
                        {loc.name}
                      </span>
                      {loc.distance && (
                        <span className="block text-[10px] text-slate-400 font-medium">({loc.distance})</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-[#16A34A] flex items-center gap-0.5 flex-shrink-0">
                    <span>Select</span>
                    <span>→</span>
                  </span>
                </button>
              );
            })}

            {/* '+ Other Sub-Area / Colony' Tile (Logo Green Outline) */}
            <button
              type="button"
              onClick={() => {
                const next = !isOtherOpen;
                setIsOtherOpen(next);
                if (next) setSelectedSubArea('Other');
              }}
              className={`p-3.5 rounded-2xl text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                isOtherOpen
                  ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] shadow-xs ring-2 ring-[#22C55E]/25'
                  : 'bg-white border-2 border-dashed border-[#22C55E] hover:border-[#16A34A] hover:bg-[#22C55E]/5'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#22C55E] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-[#06223A] truncate">
                    + Other Sub-Area / Colony
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#16A34A] flex items-center gap-0.5 flex-shrink-0">
                {isOtherOpen ? <span>Close ✕</span> : <span>Enter Area →</span>}
              </span>
            </button>
          </div>

          {/* Expandable Drawer with Option A & Option B in SAME input field (Navy Blue & Green) */}
          {isOtherOpen && (
            <div className="max-w-2xl mx-auto w-full p-5 sm:p-6 rounded-3xl bg-slate-50 border-2 border-[#22C55E]/50 space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#06223A]">
                  <Sparkles className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span>Don't see your locality? Enter your sub-area in {city.name}:</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
                  <span className="text-[#06223A]">Option A: Manual Type</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-[#16A34A]">Option B: 1-Click GPS</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-[#06223A]">⚡ Express Doorstep Dispatch:</span> Certified technicians reach all residential colonies and apartments in {city.name} within 60–90 minutes.
              </p>

              {/* Single Unified Input Row with Option A & Option B */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#06223A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={customColony}
                    onChange={(e) => setCustomColony(e.target.value)}
                    placeholder={`Enter your colony or landmark in ${city.name}`}
                    className="w-full bg-white border border-slate-300 focus:border-[#22C55E] rounded-xl pl-10 pr-28 sm:pr-32 py-3 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 transition-all font-medium"
                    autoFocus
                  />

                  {/* Inside Same Input: Option B - GPS Auto-Detect Button (Navy Blue) */}
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {customColony && (
                      <button
                        type="button"
                        onClick={() => {
                          setCustomColony('');
                          setDetectStatus(null);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                        title="Clear entered area"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleAutoDetectLocation}
                      disabled={isDetectingLocation}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#06223A] hover:bg-[#0A3356] text-white text-[11px] font-bold shadow-2xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                      title="Auto-detect current colony/area using GPS"
                    >
                      {isDetectingLocation ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-[#22C55E]" />
                          <span className="hidden sm:inline">Detecting...</span>
                        </>
                      ) : (
                        <>
                          <Navigation className="w-3 h-3 text-[#22C55E]" />
                          <span>Auto-Detect</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (customColony.trim()) {
                      handleBookingRedirect(undefined, 'Other', customColony);
                    } else {
                      handleBookingRedirect(undefined, 'Other');
                    }
                  }}
                  className="px-6 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>View Services in this Area</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {detectStatus && (
                <p
                  className={`text-xs px-3.5 py-2 rounded-xl font-medium flex items-center gap-2 ${
                    detectStatus.type === 'success'
                      ? 'bg-[#22C55E]/15 text-[#15803D] border border-[#22C55E]/30'
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}
                >
                  {detectStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{detectStatus.text}</span>
                </p>
              )}
            </div>
          )}

          {/* 10 KM Radial Radius Assurance Banner (Green & Navy) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-slate-800 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#16A34A] flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="font-extrabold text-[#06223A]">10 KM Radial Radius Assurance:</strong>{' '}
              Even if your specific colony or apartment isn't listed above, our service vans cover all locations within a 10 KM radial perimeter from our central hub.
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          3. REPAIR CATEGORIES IN CITY (4 IT SERVICE CARDS)
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              DOORSTEP SERVICES AVAILABLE
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black">
              Repair Categories in {locationDisplayName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Choose your required service. Multi-brand doorstep technicians in {city.name} complete all diagnostics and fixed pricing.
            </p>
          </div>

          {/* 4 IT Service Cards Grid (Navy Blue Buttons & Green Highlights) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {itServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#22C55E] transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image with Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#06223A]/90 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-xs flex items-center gap-1 shadow-sm">
                      <Zap className="w-3 h-3 text-[#22C55E]" />
                      <span>{srv.tag}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-bold shadow-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#16A34A]" />
                      <span>{srv.turnaround}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight group-hover:text-[#16A34A] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {srv.desc}
                    </p>

                    {/* Key Deliverables Pills */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        KEY SERVICES COVERED
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Diagnostic Fee Bar */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Diagnostic Fee at Door:</span>
                      <span className="font-extrabold text-[#06223A]">{srv.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Navy Blue + White) */}
                <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookingRedirect(srv.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-bold transition-all shadow-2xs text-center cursor-pointer"
                  >
                    Book in {city.name}
                  </button>
                  <Link
                    to={`/${city.slug}/${srv.slug}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 group-hover:text-[#16A34A]"
                  >
                    <span>Explore</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          4. FAST DOORSTEP DISPATCH IN CITY WITHIN 90 MINUTES
         ======================================================== */}
      <section className="py-12 sm:py-16 bg-[#06223A] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#22C55E] text-xs font-bold tracking-wider uppercase border border-white/20">
            <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>FAST IT DISPATCH</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Fast Doorstep Dispatch in {city.name} Within 90 Minutes
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have a critical laptop crash or network failure? Our {city.name} mobile squad is on standby with genuine parts and chip-level diagnostic equipment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleBookingRedirect()}
              className="px-6 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-extrabold shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              Book Technician Now
            </button>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-extrabold transition-all active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#22C55E]" />
              <span>Call {siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationDetailPage;
