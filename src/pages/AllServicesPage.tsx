import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/site';
import {
  Sparkles,
  Zap,
  ArrowRight,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface ServiceCategoryCard {
  id: string;
  slug: string;
  title: string;
  tag: string;
  subcategoriesCount: string;
  description: string;
  subcategories: string[];
  priceRange: string;
  image: string;
}

const serviceCategories: ServiceCategoryCard[] = [
  {
    id: 'laptop-repair',
    slug: 'laptop-repair',
    title: 'Laptop Repair & Servicing',
    tag: 'Same-Day Fix',
    subcategoriesCount: '6 Subcategories',
    description:
      'Expert repair for broken screens, battery draining fast, motherboard chip-level faults, liquid spills, and cooling fan servicing across all laptop brands.',
    subcategories: [
      'Screen & Display Panel',
      'Motherboard Chip-Level',
      'Battery & Charging Jack',
      'SSD & RAM Speed Upgrade',
    ],
    priceRange: 'Starts from ₹299',
    image:
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'computer-repair',
    slug: 'computer-repair',
    title: 'Desktop PC & Workstation Repair',
    tag: '60 Min Arrival',
    subcategoriesCount: '4 Subcategories',
    description:
      'Desktop motherboard diagnostics, SMPS power unit replacement, CPU thermal servicing, gaming GPU fixes, and custom PC assembly.',
    subcategories: [
      'Motherboard & CPU Diagnostics',
      'SMPS Power Supply Replacement',
      'Gaming GPU Thermal Servicing',
      'Custom PC Build & Cabling',
    ],
    priceRange: 'Starts from ₹299',
    image:
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mac-repair',
    slug: 'laptop-repair',
    title: 'MacBook & Apple Repair',
    tag: 'Genuine Spares',
    subcategoriesCount: '4 Subcategories',
    description:
      'Certified MacBook Air, MacBook Pro & iMac diagnostics, retina display panel replacement, logic board repairs, and genuine battery replacement.',
    subcategories: [
      'Retina Display Panel',
      'Apple Logic Board Repair',
      'Keyboard & Trackpad Fix',
      'macOS & Storage Upgrade',
    ],
    priceRange: 'Starts from ₹299',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cctv-repair-installation',
    slug: 'cctv-repair-installation',
    title: 'CCTV & Security Camera Setup',
    tag: 'HD & 4K Setup',
    subcategoriesCount: '4 Subcategories',
    description:
      'HD analog & 4K IP camera installation, DVR/NVR surveillance hard drive recovery, mobile live streaming configuration, and AMC maintenance.',
    subcategories: [
      'IP Camera Concealed Piping',
      'DVR / NVR Hard Drive Recovery',
      'Mobile Live Remote Viewing',
      'CCTV Multi-Channel SMPS',
    ],
    priceRange: 'Starts from ₹299',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'networking',
    slug: 'networking',
    title: 'Networking & Wi-Fi Solutions',
    tag: '100% Uptime',
    subcategoriesCount: '4 Subcategories',
    description:
      'Structured enterprise CAT6 cabling, mesh Wi-Fi 6 coverage, server rack dressing, patch panels punch-down, and multi-WAN failover routers.',
    subcategories: [
      'Structured CAT6 Office Cabling',
      'Mesh Wi-Fi & Access Points',
      'Server Rack Switch Routing',
      'Multi-WAN Failover & Firewall',
    ],
    priceRange: 'Starts from ₹299',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'data-recovery',
    slug: 'laptop-repair',
    title: 'Data Recovery & Storage',
    tag: 'Clean-Room Lab',
    subcategoriesCount: '4 Subcategories',
    description:
      'Clean-room data extraction from clicking hard drives, formatted SSDs, unbootable laptops, and operating system recovery without loss.',
    subcategories: [
      'Clicking Hard Drive Recovery',
      'Formatted / Corrupt SSD Fix',
      'Dead Laptop Data Extraction',
      'OS Crash System Recovery',
    ],
    priceRange: 'Starts from ₹299',
    image:
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
  },
];

export const AllServicesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredCategories =
    selectedFilter === 'all'
      ? serviceCategories
      : serviceCategories.filter((c) => c.id === selectedFilter);

  return (
    <>
      <SEO
        title="Laptop, Computer, CCTV & Networking Repair Services | Doorstep IT Fix"
        description="Explore IT repair categories including laptop screen & motherboard fixes, desktop PC maintenance, enterprise networking, and CCTV camera setup across Bengaluru, Hyderabad, Vizag, and Chennai."
        canonicalPath="/services"
        keywords={[
          'laptop repair services',
          'computer repair services',
          'CCTV camera installation',
          'office IT networking',
          'desktop PC servicing',
          'motherboard repair'
        ]}
        breadcrumbs={[{ name: 'Services', url: '/services' }]}
      />

      {/* ========================================================
          1. DARK TOP HERO SECTION (Exact Reference Structure)
         ======================================================== */}
      <section className="bg-[#06223A] text-white pt-8 pb-10 border-b border-[#0A3356]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          {/* Breadcrumbs */}
          <div className="flex justify-center text-xs text-slate-300">
            <Breadcrumbs items={[{ label: 'Services' }]} />
          </div>

          {/* Region Tag */}
          <div className="text-[11px] font-black uppercase tracking-widest text-[#22C55E]">
            HYDERABAD • BENGALURU • CHENNAI • VIZAG DOORSTEP REPAIRS
          </div>

          {/* Big Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our IT & Computer Repair Categories
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Choose any repair category below to see detailed subcategories, transparent pricing, and instant doorstep technician booking.
          </p>

          {/* Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#22C55E] text-[#06223A] shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              All Categories ({serviceCategories.length})
            </button>
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedFilter(c.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === c.id
                    ? 'bg-[#22C55E] text-[#06223A] shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {c.title.replace(' & Servicing', '').replace(' & Workstation Repair', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CATEGORY LIST GRID SECTION (Exact Reference Layout)
         ======================================================== */}
      <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#16A34A] text-xs font-bold tracking-wider uppercase border border-[#22C55E]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>CHOOSE IT REPAIR CATEGORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06223A]">
              Select a Category to View Subcategories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Click on any repair category below to see its exact subcategory repairs, service pricing, and book your verified local technician.
            </p>
          </div>

          {/* 6 Category Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#22C55E] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image at Top with Badges */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Top Left Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#06223A] text-[10px] font-bold shadow-sm flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#16A34A]" />
                      <span>{cat.tag}</span>
                    </div>

                    {/* Top Right Subcategories Count Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#06223A]/90 text-white text-[10px] font-bold shadow-sm backdrop-blur-xs flex items-center gap-1.5">
                      <span>{cat.subcategoriesCount}</span>
                      <span className="w-1 h-1 rounded-full bg-[#22C55E]" />
                      <span className="text-[#22C55E]">From ₹299</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#06223A] group-hover:text-[#16A34A] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    </div>

                    {/* Included Subcategories Pills */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        INCLUDED SUBCATEGORIES:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subcategories.map((sub, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            <span>{sub}</span>
                            <span className="text-[10px] font-bold text-[#16A34A]">(From ₹299)</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Price + Explore Subcategories Button */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      STARTS FROM
                    </div>
                    <div className="text-sm font-extrabold text-[#06223A] flex items-center gap-1.5">
                      <span>{cat.priceRange}</span>
                      <span className="text-[10px] font-bold text-[#16A34A] bg-[#22C55E]/15 px-1.5 py-0.5 rounded">
                        Adjusted in bill
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/services/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs group-hover:bg-[#16A34A]"
                  >
                    <span>Explore Subcategories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Help Bar (Call & WhatsApp) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mt-8">
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-bold text-[#06223A]">
                Need help selecting the right service?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Our certified technicians are available to help you diagnose any laptop, PC, CCTV, or network problem.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Call: {siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                  'Hi, I need assistance choosing a repair category.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
