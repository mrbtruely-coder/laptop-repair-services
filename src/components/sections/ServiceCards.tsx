import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Monitor, Network, Video, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { servicesData } from '../../config/site';

export const ServiceCards: React.FC = () => {
  const iconConfig: Record<string, { icon: React.ReactNode; badgeBg: string }> = {
    'laptop-repair': {
      icon: <Laptop className="w-6 h-6 text-[#22C55E]" />,
      badgeBg: 'bg-[#22C55E]/10 border-[#22C55E]/20',
    },
    'computer-repair': {
      icon: <Monitor className="w-6 h-6 text-[#06223A]" />,
      badgeBg: 'bg-[#06223A]/10 border-[#06223A]/20',
    },
    'networking': {
      icon: <Network className="w-6 h-6 text-[#16A34A]" />,
      badgeBg: 'bg-[#16A34A]/10 border-[#16A34A]/20',
    },
    'cctv-repair-installation': {
      icon: <Video className="w-6 h-6 text-[#06223A]" />,
      badgeBg: 'bg-[#06223A]/10 border-[#06223A]/20',
    },
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Certified IT Hardware Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">
            Comprehensive Computer, Laptop & IT Infrastructure Services
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
            High-reliability computing equipment, micro-soldering chip repairs, enterprise cabling, and commercial CCTV surveillance.
          </p>
        </div>

        {/* 4 Core Service Cards in Crisp White Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(servicesData).map((service) => {
            const cfg = iconConfig[service.id] || {
              icon: <Laptop className="w-6 h-6 text-[#22C55E]" />,
              badgeBg: 'bg-[#22C55E]/10 border-[#22C55E]/20',
            };

            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between h-full group hover:border-[#22C55E] hover:shadow-xl transition-all shadow-sm"
              >
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${cfg.badgeBg} border flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm`}>
                      {cfg.icon}
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      VERIFIED
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-black group-hover:text-[#16A34A] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-700 mt-2.5 line-clamp-3 leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Deliverables snippet */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider block text-black">
                      Common Solutions:
                    </span>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full inline-flex items-center justify-between text-xs font-bold px-4 py-3 rounded-2xl transition-all shadow-sm bg-[#06223A] text-white hover:bg-[#22C55E] hover:text-white"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
