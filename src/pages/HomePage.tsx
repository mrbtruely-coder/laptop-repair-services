import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { ServiceCards } from '../components/sections/ServiceCards';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { HowItWorks } from '../components/sections/HowItWorks';
import { LocationsCoverage } from '../components/sections/LocationsCoverage';
import { AppDownloadSection } from '../components/sections/AppDownloadSection';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { generalFaqs } from '../config/site';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Doorstep Computer, Laptop & CCTV Repair in Bengaluru, Chennai & Hyderabad"
        description="Certified doorstep laptop motherboard repair, desktop servicing, office IT networking and CCTV camera setup across Bengaluru, Vizag, Chennai, and Hyderabad. 90-min dispatch & 90-day warranty."
        canonicalPath="/"
        keywords={[
          'doorstep laptop repair',
          'computer repair Bengaluru',
          'laptop service Hyderabad',
          'CCTV installation Chennai',
          'computer repair Vizag',
          'chip level motherboard fix',
          'office networking CAT6'
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

      {/* 6. Mobile App Download Section */}
      <AppDownloadSection />

      {/* 7. Frequently Asked Questions */}
      <FAQAccordion />
    </>
  );
};
