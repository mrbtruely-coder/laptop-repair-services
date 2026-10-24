import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { generalFaqs, servicesData, siteConfig } from '../config/site';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

export const FAQPage: React.FC = () => {
  // Combine general FAQs and service-specific questions
  const allQuestions = [
    ...generalFaqs,
    ...servicesData['laptop-repair'].faqs,
    ...servicesData['computer-repair'].faqs,
    ...servicesData['networking'].faqs,
    ...servicesData['cctv-repair-installation'].faqs,
  ];

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQs) | Laptop, Computer & CCTV Repair"
        description="Clear answers on repair costs, doorstep dispatch timelines, OEM screen warranties, and CCTV setups across Bengaluru, Vizag, Chennai, and Nellore."
        canonicalPath="/faq"
        keywords={[
          'laptop repair FAQ',
          'computer repair questions',
          'doorstep repair cost Bengaluru',
          'laptop warranty policy',
          'CCTV camera installation FAQ',
          'screen replacement time'
        ]}
        breadcrumbs={[
          { name: 'FAQs', url: '/faq' }
        ]}
        faqs={allQuestions}
      />

      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      {/* Header */}
      <section className="py-14 sm:py-20 bg-[#12231A] border-b border-[#E2B98E]/15 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7AA27D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E2B98E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
            <span>Clear & Honest Information</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[#D2DCD2] text-sm sm:text-base mt-4 leading-relaxed">
            Everything you need to know about our service warranty, on-site technician dispatches, component-level repairs, and diagnostic procedures across Bengaluru, Vizag, and Chennai.
          </p>
        </div>
      </section>

      {/* Accordion list */}
      <section className="py-14 sm:py-20 bg-[#12231A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <FAQAccordion
            items={allQuestions}
            title="All Common Questions & Answers"
            subtitle="Click on any item to read the full explanation."
          />

          {/* Still have questions card */}
          <div className="p-7 sm:p-9 rounded-3xl clay-card border border-[#E2B98E]/30 text-center space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-[#FAF6F0]">Still have questions about your specific equipment?</h3>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 max-w-lg mx-auto leading-relaxed">
              Our service coordinators are on standby 7 days a week to answer your questions and give upfront diagnostic estimates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 sand-btn-3d text-[#24160E] font-bold text-xs py-3 px-5 rounded-full transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-[#24160E]" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello TechFix, I have a question regarding a repair.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] font-bold text-xs py-3 px-5 rounded-full transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
