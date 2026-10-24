import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { citiesData, siteConfig } from '../../config/site';

export const LocationsCoverage: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-[#12231A] border-t border-[#E2B98E]/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            Local Presence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
            Serving Major Metropolitan & Regional Hubs
          </h2>
          <p className="text-[#FAF6F0]/75 text-sm sm:text-base mt-3 leading-relaxed">
            We provide verified technician dispatches, door-to-door pickup & drop, and certified diagnostic facilities across Bengaluru, Vizag, Chennai, and Nellore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(citiesData).map((city, idx) => (
            <div
              key={city.id}
              className={`p-6 rounded-3xl ${idx === 1 ? 'clay-card' : 'nature-card'} flex flex-col justify-between group relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full icon-badge-3d flex items-center justify-center text-[#E2B98E] shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                        {city.name}
                      </h3>
                      <span className="text-xs text-[#FAF6F0]/65 block">{city.state}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#12231A]/60 border border-[#E2B98E]/20 text-[#E2B98E]">
                    HUB
                  </span>
                </div>

                <p className="text-xs text-[#FAF6F0]/80 mt-2 leading-relaxed">
                  {city.description}
                </p>

                {/* Service Center Location Address */}
                <div className="mt-3.5 p-3 rounded-2xl bg-[#12231A]/70 border border-[#E2B98E]/20 flex items-start gap-2.5 shadow-inner">
                  <MapPin className="w-4 h-4 text-[#E2B98E] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#E2B98E] uppercase tracking-wider block">Service Center Address:</span>
                    <span className="text-xs text-[#FAF6F0] leading-snug block mt-0.5">{city.address}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E2B98E]/10">
                  <span className="text-[11px] font-semibold text-[#E2B98E] uppercase tracking-wider block mb-2.5">
                    Key Localities Served (Within 25 km Radius):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {city.localities.slice(0, 7).map((loc, locIdx) => (
                      <span
                        key={locIdx}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-[#12231A]/50 border border-[#E2B98E]/15 text-[#FAF6F0]/85"
                      >
                        {loc}
                      </span>
                    ))}
                    <span className="text-[11px] px-2.5 py-1 rounded-full text-[#E2B98E] font-medium">
                      +{city.localities.length - 7} more within 25 km
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2B98E]/10 space-y-1.5 text-xs text-[#FAF6F0]/70">
                  <div className="flex items-center gap-2 text-[#7AA27D] font-medium">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{city.leadTime}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2B98E]/10 flex items-center justify-between">
                <Link
                  to={`/locations/${city.slug}`}
                  className="text-xs font-bold text-[#E2B98E] hover:text-[#FAF6F0] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore {city.popularName || city.name} Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-9 h-9 rounded-full icon-badge-3d flex items-center justify-center text-[#E2B98E] hover:text-[#FAF6F0] transition-colors"
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

