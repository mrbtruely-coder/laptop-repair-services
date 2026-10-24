import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { servicesData } from '../config/site';
import { Laptop, Monitor, Network, Video, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Clock, Wrench } from 'lucide-react';

export const AllServicesPage: React.FC = () => {
  const iconConfig: Record<string, { icon: React.ReactNode; badgeClass: string; accentColor: string }> = {
    'laptop-repair': {
      icon: <Laptop className="w-6 h-6 text-[#24160E]" />,
      badgeClass: 'icon-badge-sand',
      accentColor: 'text-[#E2B98E]',
    },
    'computer-repair': {
      icon: <Monitor className="w-6 h-6 text-[#FAF6F0]" />,
      badgeClass: 'icon-badge-clay',
      accentColor: 'text-[#E2B98E]',
    },
    'networking': {
      icon: <Network className="w-6 h-6 text-[#FAF6F0]" />,
      badgeClass: 'icon-badge-sage',
      accentColor: 'text-[#7AA27D]',
    },
    'cctv-repair-installation': {
      icon: <Video className="w-6 h-6 text-[#E2B98E]" />,
      badgeClass: 'icon-badge-3d',
      accentColor: 'text-[#E2B98E]',
    },
  };

  return (
    <>
      <SEO
        title="Computer, Laptop, Networking & CCTV Repair Services | Bengaluru, Vizag, Chennai, Nellore"
        description="Explore our specialized hardware & doorstep repair services: chip-level laptop diagnostics, desktop PC repair, office CAT6 networking, and CCTV security installations across Bengaluru, Vizag, Chennai & Nellore."
        canonicalPath="/services"
        keywords={[
          'laptop repair services',
          'computer repair catalog',
          'CCTV camera installation services',
          'networking IT solutions',
          'doorstep hardware repair',
          'Bengaluru Vizag Chennai Nellore services'
        ]}
        breadcrumbs={[
          { name: 'Services', url: '/services' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'All Services' }]} />

      {/* Hero Header with Rich Nature Palette */}
      <section className="py-14 sm:py-20 bg-[#12231A] border-b border-[#E2B98E]/15 relative overflow-hidden">
        {/* Ambient Organic Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7AA27D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E2B98E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
            <span>Master Technician IT Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight leading-tight">
            Specialized Hardware & IT Infrastructure Services
          </h1>

          <p className="text-[#D2DCD2] text-sm sm:text-base mt-4 leading-relaxed">
            High-precision computing hardware repairs, structured enterprise cabling, and high-definition surveillance installations. Every service is backed by transparent diagnostic estimates and up to 90 days warranty.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-6 text-xs text-[#E2B98E]">
            <span className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-1.5 rounded-full border border-[#E2B98E]/20 text-[#FAF6F0]/90">
              <ShieldCheck className="w-4 h-4 text-[#7AA27D]" />
              Up to 90 Days Hardware Warranty
            </span>
            <span className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-1.5 rounded-full border border-[#E2B98E]/20 text-[#FAF6F0]/90">
              <Clock className="w-4 h-4 text-[#E2B98E]" />
              Same-Day 2–4 Hr Doorstep Dispatch
            </span>
            <span className="flex items-center gap-1.5 bg-[#14281E] px-3.5 py-1.5 rounded-full border border-[#E2B98E]/20 text-[#FAF6F0]/90">
              <Wrench className="w-4 h-4 text-[#7AA27D]" />
              Chip-Level Certified Engineers
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid with in-depth details */}
      <section className="py-14 sm:py-20 bg-[#12231A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-10">
            {Object.values(servicesData).map((srv, idx) => {
              const cfg = iconConfig[srv.id] || {
                icon: <Wrench className="w-6 h-6 text-[#FAF6F0]" />,
                badgeClass: 'icon-badge-clay',
                accentColor: 'text-[#E2B98E]',
              };

              return (
                <div
                  key={srv.id}
                  className="nature-panel rounded-3xl p-6 sm:p-9 border border-[#E2B98E]/20 hover:border-[#E2B98E]/40 transition-all shadow-xl group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Service Description & Scope */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${cfg.badgeClass} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                          {cfg.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B98E] font-bold">
                              Core Vertical #{idx + 1}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7AA27D]/20 text-[#7AA27D] font-semibold border border-[#7AA27D]/30">
                              Active in Bengaluru, Vizag, Chennai
                            </span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF6F0] tracking-tight mt-0.5">
                            {srv.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm text-[#D2DCD2] leading-relaxed">
                        {srv.description}
                      </p>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E2B98E] mb-3">
                          Common Diagnoses, Repairs & Solutions Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#FAF6F0]/90">
                          {srv.deliverables.map((d, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 bg-[#12231A]/60 px-3 py-2 rounded-xl border border-[#E2B98E]/10">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#7AA27D] flex-shrink-0" />
                              <span className="line-clamp-1">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Tactile Action Card */}
                    <div className="lg:col-span-4 bg-[#14281E] p-6 rounded-2xl border border-[#E2B98E]/25 space-y-4 text-center lg:text-left shadow-lg">
                      <div className="space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#E2B98E] block">
                          Flexible Delivery
                        </span>
                        <span className="text-sm font-bold text-[#FAF6F0] block">
                          Doorstep Visit • Lab Pickup • Walk-In
                        </span>
                      </div>

                      <div className="border-t border-[#E2B98E]/15 pt-3 space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7AA27D] block">
                          Quality Assurance
                        </span>
                        <span className="text-sm font-bold text-[#FAF6F0] block flex items-center justify-center lg:justify-start gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#7AA27D]" />
                          Up to 90 Days Hardware Warranty
                        </span>
                      </div>

                      <div className="pt-2 flex flex-col gap-2.5">
                        <Link
                          to={`/services/${srv.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 sand-btn-3d text-[#24160E] font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md group"
                        >
                          <span>View Full Service Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          to="/contact"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#12231A] hover:bg-[#6E4331]/30 text-[#FAF6F0] text-xs font-semibold py-2.5 px-4 rounded-xl border border-[#E2B98E]/25 transition-colors"
                        >
                          <span>Schedule This Service</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
};
