import React from 'react';
import { ClipboardList, Search, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Submit Service Enquiry',
      desc: 'Tell us your issue online, call our team, or connect on WhatsApp. We log your device symptoms and service address.',
      icon: <ClipboardList className="w-5 h-5 text-[#22C55E]" />
    },
    {
      stepNumber: '02',
      title: 'Expert Diagnostic Inspection',
      desc: 'Our technician inspects the device at your doorstep or in our specialized diagnostic lab to pinpoint the exact circuit or component fault.',
      icon: <Search className="w-5 h-5 text-[#06223A]" />
    },
    {
      stepNumber: '03',
      title: 'Transparent Quotation & Approval',
      desc: 'You receive an itemized estimate for parts and labor before any physical repair begins. Zero hidden fees or surprises.',
      icon: <FileText className="w-5 h-5 text-[#16A34A]" />
    },
    {
      stepNumber: '04',
      title: 'Precision Repair & Quality Test',
      desc: 'Repairs are executed using OEM-spec parts followed by comprehensive thermal, memory, and functional testing before handover.',
      icon: <CheckCircle className="w-5 h-5 text-[#22C55E]" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
            Structured Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            How Our Doorstep Service Works
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
            From initial booking to post-service warranty testing, here is the transparent path your equipment follows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:border-[#22C55E] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-extrabold font-mono text-slate-300 group-hover:text-[#22C55E] transition-colors">
                    {item.stepNumber}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-black mb-2 group-hover:text-[#16A34A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Phase {idx + 1} of 4</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-[#22C55E] hover:bg-[#16A34A] text-white px-7 py-3.5 rounded-full transition-all shadow-sm"
          >
            <span>Book Your Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

