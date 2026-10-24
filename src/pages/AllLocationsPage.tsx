import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { primaryCities, servicesData, siteConfig } from '../config/site';
import { MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AllLocationsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Service Hubs & Doorstep Repair Locations | Bengaluru, Vizag, Chennai, Chanda Nagar"
        description="Find certified doorstep repair centers and on-site technician dispatch across Bengaluru (HSR Layout), Visakhapatnam (Dwaraka Nagar), Chennai (MG Road), and Chanda Nagar (Trunk Road). Rapid response."
        canonicalPath="/locations"
        keywords={[
          'computer repair locations',
          'laptop service centers South India',
          'doorstep repair Bengaluru',
          'computer service Vizag',
          'laptop repair Chennai',
          'doorstep service Chanda Nagar'
        ]}
        breadcrumbs={[
          { name: 'Locations', url: '/locations' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'Service Locations' }]} />

      {/* Header */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3">
            Regional Service Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
            Our Service Hubs in India
          </h1>
          <p className="text-slate-700 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            We provide verified on-site field technicians and diagnostic labs across Bengaluru, Visakhapatnam (Vizag), Chennai, and Chanda Nagar. Select your city to view coverage localities and direct helpline numbers.
          </p>
        </div>
      </section>

      {/* Cities Overview */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryCities.map((city) => (
              <div
                key={city.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-[#22C55E] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#16A34A]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-black group-hover:text-[#16A34A] transition-colors">
                          {city.name}
                        </h2>
                        <span className="text-xs text-slate-500 font-semibold">{city.state}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {city.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs mb-4">
                    <div className="flex items-start gap-2 text-black font-semibold leading-snug">
                      <MapPin className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span>{city.address}</span>
                    </div>
                    <div className="text-[#16A34A] font-bold flex items-center gap-1.5 pl-6">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{city.leadTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Localities Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {city.localities.slice(0, 4).map((loc, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* City Services Direct Links */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Local Service Pages:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {Object.values(servicesData).map((srv) => (
                        <li key={srv.id}>
                          <Link
                            to={`/${city.slug}/${srv.slug}`}
                            className="text-slate-700 hover:text-[#16A34A] font-medium flex items-center justify-between group/link py-1"
                          >
                            <span>{srv.shortTitle} in {city.popularName || city.name}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400 group-hover/link:text-[#16A34A] group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to={`/locations/${city.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors shadow-xs"
                  >
                    <span>Full City Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#06223A] border border-slate-200"
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
