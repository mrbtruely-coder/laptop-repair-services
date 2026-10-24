import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { citiesData, servicesData, siteConfig } from '../config/site';
import { MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AllLocationsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Service Hubs & Doorstep Repair Locations | Bengaluru, Vizag, Chennai, Nellore"
        description="Find certified doorstep repair centers and on-site technician dispatch across Bengaluru (HSR Layout), Visakhapatnam (Dwaraka Nagar), Chennai (MG Road), and Nellore (Trunk Road). Rapid response."
        canonicalPath="/locations"
        keywords={[
          'computer repair locations',
          'laptop service centers South India',
          'doorstep repair Bengaluru',
          'computer service Vizag',
          'laptop repair Chennai',
          'doorstep service Nellore'
        ]}
        breadcrumbs={[
          { name: 'Locations', url: '/locations' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'Service Locations' }]} />

      {/* Header */}
      <section className="py-12 sm:py-16 bg-[#070B14] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold mb-3">
            Regional Service Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Service Hubs in India
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            We provide verified on-site field technicians and diagnostic labs across Bengaluru, Visakhapatnam (Vizag), and Chennai. Select your city to view coverage localities and direct helpline numbers.
          </p>
        </div>
      </section>

      {/* Cities Overview */}
      <section className="py-14 sm:py-20 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.values(citiesData).map((city) => (
              <div
                key={city.id}
                className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 text-cyan-400 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {city.name}
                        </h2>
                        <span className="text-xs text-slate-400">{city.state}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {city.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/5 space-y-2 text-xs mb-4">
                    <div className="flex items-start gap-2 text-[#E2B98E] font-medium leading-snug">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{city.address}</span>
                    </div>
                    <div className="text-emerald-400 font-medium flex items-center gap-1.5 pl-6">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{city.leadTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Localities Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {city.localities.map((loc, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-[#070B14] border border-white/5 text-slate-300"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* City Services Direct Links */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Local Service Pages:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {Object.values(servicesData).map((srv) => (
                        <li key={srv.id}>
                          <Link
                            to={`/${city.slug}/${srv.slug}`}
                            className="text-slate-300 hover:text-cyan-400 flex items-center justify-between group/link py-1"
                          >
                            <span>{srv.shortTitle} in {city.popularName || city.name}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500 group-hover/link:text-cyan-400 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between gap-3">
                  <Link
                    to={`/locations/${city.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors shadow-md"
                  >
                    <span>Full City Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/5"
                    title="Direct Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
