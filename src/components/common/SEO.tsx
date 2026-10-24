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
  const fullTitle = title.includes(siteConfig.brandName) ? title : `${title} | ${siteConfig.brandName}`;
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

  // Default industry-level keywords if not specified
  const effectiveKeywords = [
    ...keywords,
    'laptop repair doorstep',
    'computer repair near me',
    'chip-level motherboard servicing',
    'CCTV camera installation',
    'office networking CAT6 cabling',
    'fast doorstep technician dispatch',
    '90 days service warranty',
    ...(city ? [`${city} computer repair`, `${city} laptop service`, `${city} CCTV installation`] : ['Bengaluru laptop repair', 'Vizag computer service', 'Chennai networking', 'Hyderabad doorstep repair']),
  ];
  // Deduplicate keywords
  const uniqueKeywords = Array.from(new Set(effectiveKeywords));

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
    description: description,
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
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      <meta name="keywords" content={uniqueKeywords.join(', ')} />
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
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
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
      <meta name="twitter:description" content={description} />
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
