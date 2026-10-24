import React from 'react';
import { ShieldCheck, Award, Cpu, Truck, Lock, UserCheck, PhoneCall } from 'lucide-react';
import { whyChooseUsPoints, siteConfig } from '../../config/site';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#22C55E]" />,
    Award: <Award className="w-5 h-5 text-[#06223A]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#16A34A]" />,
    Truck: <Truck className="w-5 h-5 text-[#22C55E]" />,
    Lock: <Lock className="w-5 h-5 text-[#06223A]" />,
    UserCheck: <UserCheck className="w-5 h-5 text-[#16A34A]" />,
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
            Verified Value & Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Why Discerning Clients Choose {siteConfig.brandName}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
            We focus on honest engineering: root cause diagnosis, certified testing, and genuine replacement parts backed by real warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 group relative overflow-hidden shadow-sm hover:shadow-lg hover:border-[#22C55E] transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                {iconMap[item.icon] || <ShieldCheck className="w-5 h-5 text-[#22C55E]" />}
              </div>
              <h3 className="text-base font-bold text-black group-hover:text-[#16A34A] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Diagnostic reassurance banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-black font-bold text-base sm:text-lg">Need advice on an uncertain computer, laptop, or network issue?</h4>
            <p className="text-xs sm:text-sm text-slate-600">Speak directly with a senior support engineer for free initial symptom guidance.</p>
          </div>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="whitespace-nowrap px-6 py-3 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {siteConfig.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

