import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { ServiceCards } from '../components/sections/ServiceCards';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { HowItWorks } from '../components/sections/HowItWorks';
import { LocationsCoverage } from '../components/sections/LocationsCoverage';
import { CommonIssues } from '../components/sections/CommonIssues';
import { AppDownloadSection } from '../components/sections/AppDownloadSection';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { generalFaqs } from '../config/site';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Doorstep Computer, Laptop & CCTV Repair in Bengaluru, Vizag, Chennai & Chanda Nagar"
        description="Certified doorstep laptop motherboard repair, desktop servicing, office IT networking & CCTV camera installation across Bengaluru, Vizag, Chennai & Chanda Nagar. Rapid 90-min dispatch & 90-day warranty."
        canonicalPath="/"
        keywords={[
          'doorstep laptop repair Bengaluru',
          'laptop motherboard repair Vizag',
          'computer desktop repair Chennai',
          'computer and laptop repair Chanda Nagar',
          'CCTV installation and DVR repair',
          'office networking CAT6 cabling',
          'chip-level laptop servicing',
          'screen and battery replacement doorstep'
        ]}
        faqs={generalFaqs}
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Service Categories */}
      <ServiceCards />

      {/* 3. Why Choose Us */}
      <WhyChooseUs />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Service Locations */}
      <LocationsCoverage />

      {/* 6. Common Repair Issues */}
      <CommonIssues />

      {/* 7. Mobile App Download Section */}
      <AppDownloadSection />

      {/* 8. Frequently Asked Questions */}
      <FAQAccordion />
    </>
  );
};
