import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Monitor, Network, Video, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { servicesData } from '../../config/site';

export const ServiceCards: React.FC = () => {
  const iconConfig: Record<string, { icon: React.ReactNode; badgeClass: string }> = {
    'laptop-repair': {
      icon: <Laptop className="w-6 h-6 text-[#24160E]" />,
      badgeClass: 'icon-badge-sand',
    },
    'computer-repair': {
      icon: <Monitor className="w-6 h-6 text-[#FAF6F0]" />,
      badgeClass: 'icon-badge-clay',
    },
    'networking': {
      icon: <Network className="w-6 h-6 text-[#FAF6F0]" />,
      badgeClass: 'icon-badge-sage',
    },
    'cctv-repair-installation': {
      icon: <Video className="w-6 h-6 text-[#E2B98E]" />,
      badgeClass: 'icon-badge-3d',
    },
  };

  return (
    <section className="py-10 sm:py-14 bg-[#12231A] border-y border-[#E2B98E]/15 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7AA27D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E2B98E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
            <span>Certified IT Hardware Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
            Comprehensive Computer, Laptop & IT Infrastructure Services
          </h2>
          <p className="text-[#D2DCD2] text-sm sm:text-base mt-3 leading-relaxed">
            High-reliability computing equipment, micro-soldering chip repairs, enterprise cabling, and commercial CCTV surveillance.
          </p>
        </div>

        {/* 4 Core Service Cards in Tactile Nature Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(servicesData).map((service, index) => {
            // Alternating tactile card themes (Forest, Clay, Sand, Forest)
            const cardThemeClass = index === 1 ? 'clay-card' : index === 2 ? 'sand-card' : 'nature-card';
            const isSandCard = index === 2;
            const cfg = iconConfig[service.id] || {
              icon: <Laptop className="w-6 h-6 text-[#FAF6F0]" />,
              badgeClass: 'icon-badge-clay',
            };

            return (
              <div
                key={service.id}
                className={`${cardThemeClass} rounded-3xl p-6 flex flex-col justify-between h-full group transition-all`}
              >
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${cfg.badgeClass} flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg`}>
                      {cfg.icon}
                    </div>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isSandCard
                        ? 'bg-[#24160E]/20 text-[#24160E]'
                        : 'bg-[#E2B98E]/20 text-[#E2B98E]'
                    }`}>
                      VERIFIED
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold ${isSandCard ? 'text-[#24160E]' : 'text-[#FAF6F0]'} group-hover:text-[#E2B98E] transition-colors`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs ${isSandCard ? 'text-[#3E2417]' : 'text-[#D2DCD2]'} mt-2.5 line-clamp-3 leading-relaxed`}>
                    {service.tagline}
                  </p>

                  {/* Deliverables snippet */}
                  <div className={`mt-5 pt-4 border-t ${isSandCard ? 'border-[#24160E]/15' : 'border-[#E2B98E]/15'} space-y-2`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${isSandCard ? 'text-[#24160E]' : 'text-[#E2B98E]'}`}>
                      Common Solutions:
                    </span>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs ${isSandCard ? 'text-[#2C1A11]' : 'text-[#FAF6F0]'}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isSandCard ? 'text-[#24160E]' : 'text-[#7AA27D]'} flex-shrink-0 mt-0.5`} />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className={`pt-5 mt-5 border-t ${isSandCard ? 'border-[#24160E]/15' : 'border-[#E2B98E]/15'}`}>
                  <Link
                    to={`/services/${service.slug}`}
                    className={`w-full inline-flex items-center justify-between text-xs font-bold px-4 py-3 rounded-2xl transition-all shadow-md ${
                      isSandCard
                        ? 'bg-[#24160E] text-[#FAF6F0] hover:bg-[#3D2214]'
                        : 'sand-btn-3d text-[#24160E]'
                    }`}
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
