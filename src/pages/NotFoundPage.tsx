import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Home, Wrench } from 'lucide-react';
import { siteConfig } from '../config/site';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found (404)"
        description="The requested page could not be found. Explore our computer, laptop, networking, and CCTV repair services across Bengaluru, Vizag, Chennai, and Hyderabad."
        noIndex={true}
      />

      <section className="py-24 sm:py-32 bg-[#0B1220] flex items-center justify-center text-center px-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <Wrench className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-mono">
              404
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let us help you find what you need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-colors shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs py-3 px-5 rounded-xl transition-colors"
            >
              <span>Explore Services</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-white/5 text-xs text-slate-500">
            <span>Need immediate technical help? </span>
            <a href={`tel:${siteConfig.phoneRaw}`} className="text-cyan-400 hover:underline">
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
