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
        description="Clear answers on repair costs, doorstep dispatch timelines, OEM screen warranties, and CCTV setups across Bengaluru, Vizag, Chennai, and Hyderabad."
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

      {/* Hero */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Clear & Honest Information</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-800 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Everything you need to know about our service warranty, on-site technician dispatches, component-level repairs, and diagnostic procedures across Bengaluru, Vizag, Chennai, and Hyderabad.
          </p>
        </div>
      </section>

      {/* Accordion list */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <FAQAccordion
            items={allQuestions}
            title="All Common Questions & Answers"
            subtitle="Click on any item to read the full explanation."
          />

          {/* Still have questions card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-black">Still have questions about your specific equipment?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Our service coordinators are on standby 7 days a week from 8:30 AM to 8:30 PM to answer your questions and give upfront diagnostic estimates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-3 px-6 rounded-full transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello, I have a question regarding a repair service.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-3 px-6 rounded-full transition-all shadow-sm"
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
