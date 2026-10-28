import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/site';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GeoLocationData {
  region: string;
  placename: string;
  position: string;
  lat: number;
  lng: number;
  streetAddress: string;
  locality: string;
  regionName: string;
  postalCode: string;
}

export const CITY_GEO_REGISTRY: Record<string, GeoLocationData> = {
  bengaluru: {
    region: 'IN-KA',
    placename: 'Bengaluru',
    position: '12.9116;77.6433',
    lat: 12.9116,
    lng: 77.6433,
    streetAddress: '27th Main Rd, opp. KLM Fashion Mall, Sector 2, HSR Layout',
    locality: 'Bengaluru',
    regionName: 'Karnataka',
    postalCode: '560102',
  },
  vizag: {
    region: 'IN-AP',
    placename: 'Visakhapatnam',
    position: '17.7291;83.3087',
    lat: 17.7291,
    lng: 83.3087,
    streetAddress: '50-81-57/1, Seethammapeta Main Rd, Dwaraka Nagar',
    locality: 'Visakhapatnam',
    regionName: 'Andhra Pradesh',
    postalCode: '530016',
  },
  chennai: {
    region: 'IN-TN',
    placename: 'Chennai',
    position: '13.0033;80.2550',
    lat: 13.0033,
    lng: 80.2550,
    streetAddress: 'MG Road, Adyar',
    locality: 'Chennai',
    regionName: 'Tamil Nadu',
    postalCode: '600020',
  },
  hyderabad: {
    region: 'IN-TG',
    placename: 'Hyderabad',
    position: '17.4947;78.3375',
    lat: 17.4947,
    lng: 78.3375,
    streetAddress: 'Chanda Nagar, Near Main Road',
    locality: 'Hyderabad',
    regionName: 'Telangana',
    postalCode: '500050',
  },
  'chanda-nagar': {
    region: 'IN-TG',
    placename: 'Hyderabad',
    position: '17.4947;78.3375',
    lat: 17.4947,
    lng: 78.3375,
    streetAddress: 'Chanda Nagar, Near Main Road',
    locality: 'Hyderabad',
    regionName: 'Telangana',
    postalCode: '500050',
  },
  'nellore': {
    region: 'IN-TG',
    placename: 'Hyderabad',
    position: '17.4947;78.3375',
    lat: 17.4947,
    lng: 78.3375,
    streetAddress: 'Chanda Nagar, Near Main Road',
    locality: 'Hyderabad',
    regionName: 'Telangana',
    postalCode: '500050',
  },
};

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogType?: 'website' | 'article' | 'business.business';
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  city?: string;
  state?: string;
  serviceName?: string;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords = [],
  ogType = 'website',
  breadcrumbs = [],
  faqs = [],
  city,
  state,
  serviceName,
  noIndex = false,
}) => {
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${siteConfig.domain}${cleanPath === '/' ? '' : cleanPath}`;
  // Strictly enforce Title <= 90 characters, Description <= 250 characters, Keywords < 10 items
  const formatSeoTitle = (rawTitle: string): string => {
    let combined = rawTitle.includes(siteConfig.brandName)
      ? rawTitle
      : `${rawTitle} | ${siteConfig.brandName}`;
    if (combined.length <= 90) return combined;
    if (rawTitle.length <= 90) return rawTitle;
    return rawTitle.slice(0, 87).trim() + '...';
  };

  const formatSeoDescription = (rawDesc: string): string => {
    if (!rawDesc) return '';
    const trimmed = rawDesc.trim();
    if (trimmed.length <= 250) return trimmed;
    // Truncate at word boundary within 247 chars + '...'
    const cut = trimmed.slice(0, 247);
    const lastSpace = cut.lastIndexOf(' ');
    return (lastSpace > 180 ? cut.slice(0, lastSpace) : cut) + '...';
  };

  const fullTitle = formatSeoTitle(title);
  const formattedDescription = formatSeoDescription(description);
  const ogImageUrl = `${siteConfig.domain}/og-image.png`;

  // Normalize city key for geo lookup
  const normalizedCityKey = (city || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[()]/g, '');

  let matchedGeo: GeoLocationData | null = null;
  if (normalizedCityKey.includes('bengaluru') || normalizedCityKey.includes('bangalore')) {
    matchedGeo = CITY_GEO_REGISTRY.bengaluru;
  } else if (normalizedCityKey.includes('vizag') || normalizedCityKey.includes('visakhapatnam')) {
    matchedGeo = CITY_GEO_REGISTRY.vizag;
  } else if (normalizedCityKey.includes('chennai')) {
    matchedGeo = CITY_GEO_REGISTRY.chennai;
  } else if (normalizedCityKey.includes('hyderabad') || normalizedCityKey.includes('chanda') || normalizedCityKey.includes('nellore')) {
    matchedGeo = CITY_GEO_REGISTRY.hyderabad;
  }

  // Fallback to South India multi-city geo
  const activeGeo = matchedGeo || {
    region: 'IN-KA',
    placename: 'Bengaluru, Visakhapatnam, Chennai, Hyderabad',
    position: '12.9116;77.6433',
    lat: 12.9116,
    lng: 77.6433,
    streetAddress: '27th Main Rd, Sector 2, HSR Layout',
    locality: 'Bengaluru',
    regionName: 'Karnataka',
    postalCode: '560102',
  };

  // Dynamic Keyword Generator based on title, description, url, city, and serviceName (up to 10 keywords)
  const generateDynamicKeywords = (): string[] => {
    const list: string[] = [];

    // 1. Add explicitly passed keywords first
    if (keywords && keywords.length > 0) {
      list.push(...keywords);
    }

    // 2. Add location and service specific keywords if present
    if (serviceName && city) {
      list.push(`${serviceName} in ${city}`.toLowerCase());
      list.push(`${serviceName} service ${city}`.toLowerCase());
      list.push(`doorstep ${serviceName} ${city}`.toLowerCase());
    } else if (serviceName) {
      list.push(`${serviceName} service`.toLowerCase());
      list.push(`doorstep ${serviceName}`.toLowerCase());
    } else if (city) {
      list.push(`laptop repair in ${city}`.toLowerCase());
      list.push(`computer repair ${city}`.toLowerCase());
      list.push(`doorstep laptop service ${city}`.toLowerCase());
      list.push(`laptop service center ${city}`.toLowerCase());
    }

    // 3. Extract meaningful phrases from URL path
    const urlSegments = cleanPath
      .split('/')
      .filter(Boolean)
      .map((s) => s.replace(/-/g, ' ').trim().toLowerCase())
      .filter((s) => s.length > 2);
    urlSegments.forEach((segment) => {
      list.push(segment);
      if (city && !segment.includes(city.toLowerCase())) {
        list.push(`${segment} in ${city.toLowerCase()}`);
      }
    });

    // 4. Extract key keywords/phrases from Title
    const titleClean = title.replace(/[|–—\-,:.]/g, ' ').toLowerCase();
    const titleTokens = titleClean
      .split(/\s+/)
      .filter((t) => t.length > 3 && !['repair', 'services', 'service', 'with', 'from', 'your', 'same', 'best'].includes(t));
    if (titleTokens.length >= 2) {
      list.push(`${titleTokens[0]} ${titleTokens[1]} repair`);
    }

    // 5. Add domain and industry standard keywords
    list.push(
      city ? `best laptop repair ${city}`.toLowerCase() : 'laptop repair services',
      city ? `cctv camera service ${city}`.toLowerCase() : 'computer repair doorstep',
      city ? `chip level motherboard repair ${city}`.toLowerCase() : 'chip level motherboard repair',
      'laptop repair doorstep service',
      'desktop pc technician service'
    );

    // Deduplicate, filter so each keyword phrase has < 10 words, and cap strictly to 10 keywords
    const seen = new Set<string>();
    const finalKeywords: string[] = [];

    for (const kw of list) {
      const cleanKw = kw.trim().toLowerCase();
      if (!cleanKw || seen.has(cleanKw)) continue;
      const wordCount = cleanKw.split(/\s+/).length;
      if (wordCount < 10 && cleanKw.length >= 3) {
        seen.add(cleanKw);
        finalKeywords.push(cleanKw);
        if (finalKeywords.length >= 10) break;
      }
    }

    return finalKeywords;
  };

  const dynamicKeywords = generateDynamicKeywords();

  // Breadcrumb schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.domain}${item.url}`,
    })),
  } : null;

  // LocalBusiness / ElectronicsRepair Schema (Industry Standard for Local SEO)
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectronicsRepair', 'ComputerRepair'],
    name: siteConfig.legalName,
    alternateName: siteConfig.brandName,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/logo.png`,
    image: ogImageUrl,
    description: description,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.supportEmail,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: activeGeo.streetAddress,
      addressLocality: activeGeo.locality,
      addressRegion: activeGeo.regionName,
      postalCode: activeGeo.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: activeGeo.lat,
      longitude: activeGeo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '08:30',
        closes: '20:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1284',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: city
      ? [
        {
          '@type': 'City',
          name: city,
        },
        {
          '@type': 'State',
          name: state || activeGeo.regionName,
        },
      ]
      : ['Bengaluru', 'Visakhapatnam', 'Chennai', 'Hyderabad', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Telangana'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Doorstep Hardware & Electronics Repair Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Laptop Repair & Chip-Level Motherboard Diagnostics',
            description: 'OEM screen replacement, water damage recovery, keyboard replacement, SSD upgrades and BGA re-soldering.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desktop & Workstation Computer Repair',
            description: 'SMPS power supply replacement, BSOD crash resolution, RAM/GPU diagnostics, and custom gaming PC repairs.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial & Residential IT Networking Solutions',
            description: 'Structured CAT6 cabling, Wi-Fi 6 mesh coverage, multi-WAN load balancing, and server rack assembly.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CCTV Camera Surveillance Installation & DVR Repair',
            description: 'IP & HD camera mounting, DVR/NVR hard drive restoration, and remote mobile viewing configuration.',
          },
        },
      ],
    },
  };

  // Specific Service Schema if serviceName is present
  const serviceSchema = serviceName ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.legalName,
      telephone: siteConfig.phoneRaw,
      url: siteConfig.domain,
    },
    areaServed: city || 'Bengaluru, Visakhapatnam, Chennai, Hyderabad',
    description: formattedDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  } : null;

  // FAQ Schema
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={formattedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      <meta name="keywords" content={dynamicKeywords.join(', ')} />
      <meta name="author" content={siteConfig.brandName} />
      <meta name="publisher" content={siteConfig.legalName} />
      <meta name="google-site-verification" content="clH9FvGCsCEslpFBXVt09eUvkF9m-B9wmIFRSyyRceM" />

      {/* Local & Geographic SEO Meta Tags (Crucial for Local Services Ranking) */}
      <meta name="geo.region" content={activeGeo.region} />
      <meta name="geo.placename" content={activeGeo.placename} />
      <meta name="geo.position" content={activeGeo.position} />
      <meta name="ICBM" content={activeGeo.position.replace(';', ', ')} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="business:contact_data:locality" content={activeGeo.locality} />
      <meta property="business:contact_data:region" content={activeGeo.regionName} />
      <meta property="business:contact_data:country_name" content="India" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteConfig.brandName} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.brandName} - Doorstep Repair & IT Services`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={formattedDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};
