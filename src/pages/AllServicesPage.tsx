import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { servicesData } from '../config/site';
import {
  Laptop,
  Monitor,
  Network,
  Video,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Wrench
} from 'lucide-react';

const iconConfig: Record<string, { icon: React.ReactNode }> = {
  'laptop-repair': {
    icon: <Laptop className="w-6 h-6 text-white" />,
  },
  'computer-repair': {
    icon: <Monitor className="w-6 h-6 text-white" />,
  },
  'networking': {
    icon: <Network className="w-6 h-6 text-white" />,
  },
  'cctv-repair-installation': {
    icon: <Video className="w-6 h-6 text-white" />,
  },
};

export const AllServicesPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Computer, Laptop, CCTV & Networking Repair Services"
        description="Comprehensive chip-level laptop repairs, PC desktop troubleshooting, enterprise Cat6 cabling, Wi-Fi mesh setups, and IP camera installations across Bengaluru, Vizag, Chennai, and Hyderabad."
        canonicalPath="/services"
        keywords={[
          'all computer repair services',
          'laptop motherboard repair',
          'doorstep PC service Bengaluru',
          'networking cabling services',
          'CCTV security installation Chennai',
          'chip-level diagnostic lab'
        ]}
        breadcrumbs={[
          { name: 'Services', url: '/services' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'All Services' }]} />

      {/* Hero Header */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Master Technician IT Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Specialized Hardware & IT Infrastructure Services
          </h1>

          <p className="text-slate-700 text-sm sm:text-base mt-4 leading-relaxed">
            High-precision computing hardware repairs, structured enterprise cabling, and high-definition surveillance installations. Every service is backed by transparent diagnostic estimates and up to 90 days warranty.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              Up to 90 Days Hardware Warranty
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 font-medium">
              <Clock className="w-4 h-4 text-[#16A34A]" />
              Same-Day 2–4 Hr Doorstep Dispatch
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 font-medium">
              <Wrench className="w-4 h-4 text-[#16A34A]" />
              Chip-Level Certified Engineers
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid with in-depth details */}
      <section className="py-14 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-10">
            {Object.values(servicesData).map((srv, idx) => {
              const cfg = iconConfig[srv.id] || {
                icon: <Wrench className="w-6 h-6 text-white" />,
              };

              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 hover:border-[#22C55E] transition-all shadow-sm group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left: Service Description & Scope */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#06223A] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                          {cfg.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#16A34A] font-bold">
                              Core Vertical #{idx + 1}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#16A34A] font-bold border border-[#22C55E]/30">
                              Active in Bengaluru, Vizag, Chennai, Hyderabad
                            </span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mt-0.5">
                            {srv.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {srv.description}
                      </p>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
                          Common Diagnoses, Repairs & Solutions Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                          {srv.deliverables.map((d, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                              <span className="line-clamp-1">{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Card */}
                    <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-center lg:text-left shadow-xs">
                      <div className="space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
                          Flexible Delivery
                        </span>
                        <span className="text-sm font-extrabold text-black block">
                          Doorstep Visit • Lab Pickup • Walk-In
                        </span>
                      </div>

                      <div className="border-t border-slate-200 pt-3 space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-[#16A34A] block">
                          Quality Assurance
                        </span>
                        <span className="text-sm font-bold text-black block flex items-center justify-center lg:justify-start gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                          Up to 90 Days Hardware Warranty
                        </span>
                      </div>

                      <div className="pt-2 flex flex-col gap-2.5">
                        <Link
                          to={`/services/${srv.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-extrabold text-xs py-3 px-4 rounded-xl transition-all shadow-md group"
                        >
                          <span>View Full Service Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          to="/book-service"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-[#06223A] text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-300 transition-colors"
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
