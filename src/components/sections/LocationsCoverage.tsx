import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { siteConfig, primaryCities } from '../../config/site';

export const LocationsCoverage: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
            Local Presence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Serving Major Metropolitan & Regional Hubs
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
            We provide verified technician dispatches, door-to-door pickup & drop, and certified diagnostic facilities across Bengaluru, Vizag, Chennai, and Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryCities.map((city) => (
            <div
              key={city.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl hover:border-[#22C55E] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#16A34A] shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black group-hover:text-[#16A34A] transition-colors">
                        {city.name}
                      </h3>
                      <span className="text-xs text-slate-500 block">{city.state}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#06223A] font-bold">
                    HUB
                  </span>
                </div>

                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  {city.description}
                </p>

                {/* Service Coverage Area */}
                <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#06223A] uppercase tracking-wider block">Service Coverage Area:</span>
                    <span className="text-xs text-black font-medium leading-snug block mt-0.5">{city.address}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-black uppercase tracking-wider block mb-2.5">
                    Key Localities Served (Within 25 km Radius):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {city.localities.slice(0, 5).map((loc, locIdx) => (
                      <span
                        key={locIdx}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800"
                      >
                        {loc}
                      </span>
                    ))}
                    <span className="text-[11px] px-2.5 py-1 rounded-full text-[#16A34A] font-semibold">
                      +{city.localities.length - 5} more
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2 text-[#16A34A] font-medium">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{city.leadTime}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/${city.slug}`}
                  className="text-xs font-bold text-[#06223A] hover:text-[#16A34A] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore {city.popularName || city.name} Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`tel:${city.helpline || siteConfig.phoneRaw}`}
                  className="w-9 h-9 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white flex items-center justify-center transition-colors shadow-sm"
                  title="Call city helpline"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

