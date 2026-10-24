import React from 'react';
import { ShieldCheck, Award, Cpu, Truck, Lock, UserCheck, PhoneCall } from 'lucide-react';
import { whyChooseUsPoints, siteConfig } from '../../config/site';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#E2B98E]" />,
    Award: <Award className="w-5 h-5 text-[#E2B98E]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#9BBF9C]" />,
    Truck: <Truck className="w-5 h-5 text-[#E2B98E]" />,
    Lock: <Lock className="w-5 h-5 text-[#9BBF9C]" />,
    UserCheck: <UserCheck className="w-5 h-5 text-[#E2B98E]" />,
  };

  return (
    <section className="py-10 sm:py-14 bg-[#12231A] relative border-t border-[#E2B98E]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            Verified Value & Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
            Why Discerning Clients Choose {siteConfig.brandName}
          </h2>
          <p className="text-[#FAF6F0]/75 text-sm sm:text-base mt-3 leading-relaxed">
            We focus on honest engineering: root cause diagnosis, certified testing, and genuine replacement parts backed by real warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsPoints.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl ${idx % 3 === 1 ? 'clay-card' : 'nature-card'} group relative overflow-hidden`}
            >
              <div className="w-12 h-12 rounded-full icon-badge-3d flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg">
                {iconMap[item.icon] || <ShieldCheck className="w-5 h-5 text-[#E2B98E]" />}
              </div>
              <h3 className="text-base font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#FAF6F0]/70 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Diagnostic reassurance banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl nature-panel flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-[#FAF6F0] font-bold text-base sm:text-lg">Need advice on an uncertain computer, laptop, or network issue?</h4>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/75">Speak directly with a senior support engineer for free initial symptom guidance.</p>
          </div>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="whitespace-nowrap px-6 py-3 rounded-full sand-btn-3d font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {siteConfig.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

