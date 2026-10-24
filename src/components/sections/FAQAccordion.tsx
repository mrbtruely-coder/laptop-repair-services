import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { generalFaqs } from '../../config/site';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items = generalFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Have questions about our service warranty, on-site technician visits, or diagnosis process? Here are answers to common questions."
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-10 sm:py-14 bg-[#12231A] border-t border-[#E2B98E]/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            <HelpCircle className="w-3.5 h-3.5 text-[#E2B98E]" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#FAF6F0]/75 text-sm sm:text-base mt-3 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3.5">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E2B98E]/15 bg-[#173022] overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-[#203F30]/50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#FAF6F0]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full icon-badge-3d flex items-center justify-center text-[#E2B98E] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed border-t border-[#E2B98E]/10 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

