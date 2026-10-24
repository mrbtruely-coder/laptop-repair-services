import React from 'react';
import { ClipboardList, Search, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Submit Service Enquiry',
      desc: 'Tell us your issue online, call our team, or connect on WhatsApp. We log your device symptoms and service address.',
      icon: <ClipboardList className="w-5 h-5 text-[#E2B98E]" />
    },
    {
      stepNumber: '02',
      title: 'Expert Diagnostic Inspection',
      desc: 'Our technician inspects the device at your doorstep or in our specialized diagnostic lab to pinpoint the exact circuit or component fault.',
      icon: <Search className="w-5 h-5 text-[#9BBF9C]" />
    },
    {
      stepNumber: '03',
      title: 'Transparent Quotation & Approval',
      desc: 'You receive an itemized estimate for parts and labor before any physical repair begins. Zero hidden fees or surprises.',
      icon: <FileText className="w-5 h-5 text-[#E2B98E]" />
    },
    {
      stepNumber: '04',
      title: 'Precision Repair & Quality Test',
      desc: 'Repairs are executed using OEM-spec parts followed by comprehensive thermal, memory, and functional testing before handover.',
      icon: <CheckCircle className="w-5 h-5 text-[#9BBF9C]" />
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#152B20]/40 border-t border-[#E2B98E]/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            Structured Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
            How Our Doorstep Service Works
          </h2>
          <p className="text-[#FAF6F0]/75 text-sm sm:text-base mt-3 leading-relaxed">
            From initial booking to post-service warranty testing, here is the transparent path your equipment follows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl nature-card p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-extrabold font-mono text-[#E2B98E]/50 group-hover:text-[#E2B98E] transition-colors">
                    {item.stepNumber}
                  </span>
                  <div className="w-12 h-12 rounded-full icon-badge-3d flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#FAF6F0] mb-2 group-hover:text-[#E2B98E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FAF6F0]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-[#E2B98E]/10 flex items-center justify-between text-[11px] text-[#FAF6F0]/60 font-medium">
                <span>Phase {idx + 1} of 4</span>
                <span className="w-2 h-2 rounded-full bg-[#7AA27D]" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider sand-btn-3d px-7 py-3.5 rounded-full transition-all"
          >
            <span>Book Your Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

