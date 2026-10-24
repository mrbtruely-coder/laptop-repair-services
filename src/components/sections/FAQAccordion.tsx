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
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#22C55E]" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
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
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-black hover:text-[#16A34A] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#06223A] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-[#22C55E] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
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

