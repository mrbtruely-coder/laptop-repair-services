import React from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, Zap, Star } from 'lucide-react';
import { AppDownloadBadges } from '../common/AppDownloadBadges';

export const AppDownloadSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm">
          
          {/* Background decorative circuits */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#06223A]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Information & Download CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold shadow-sm">
                <Smartphone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Available for Android & iOS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Book, Track & Manage Repairs on Our <span className="text-[#16A34A]">Mobile App</span>
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl">
                Get certified computer, laptop, networking, and CCTV doorstep technicians at your fingertips. Real-time GPS tracking, transparent estimates, and instant digital warranty cards.
              </p>

              {/* App Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-black font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span>90-Min Doorstep Dispatch & Live GPS</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-black font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span>Live Chip-Level Diagnostic Status</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-black font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span>Paperless GST Invoices & Warranty</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-black font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <span>Instant 1-Click WhatsApp Engineer Desk</span>
                </div>
              </div>

              {/* App Store & Play Store Download Badges */}
              <div className="pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-black mb-3">
                  Download Official App Free:
                </p>
                <AppDownloadBadges size="lg" theme="navy" />
              </div>

              {/* App Rating Pill */}
              <div className="pt-2 flex items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1 text-[#16A34A] font-bold">
                  <Star className="w-4 h-4 fill-[#22C55E] text-[#22C55E]" />
                  <span className="text-black font-bold">4.9 / 5.0</span>
                </div>
                <span>•</span>
                <span>Over 25,000+ App Downloads</span>
                <span>•</span>
                <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Secure
                </span>
              </div>

            </div>

            {/* Right Column: Visual Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] bg-[#06223A] rounded-[40px] p-4 shadow-2xl border-4 border-slate-300 relative text-white">
                
                {/* Phone Speaker & Camera Notch */}
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                </div>

                {/* Inner Screen */}
                <div className="bg-white rounded-[28px] p-4 text-black shadow-inner space-y-3">
                  
                  {/* In-app Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <img src="/logo.png" alt="App Logo" className="w-7 h-7 object-contain rounded-lg" />
                      <div>
                        <div className="text-[11px] font-extrabold text-black leading-none">Laptop Repairs</div>
                        <div className="text-[9px] text-[#16A34A] font-semibold">Service App</div>
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#16A34A] font-bold">LIVE</span>
                  </div>

                  {/* Active Order Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-500">DISPATCH STATUS</span>
                      <span className="text-[#16A34A] font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#22C55E]" /> In Transit (18 mins)
                      </span>
                    </div>
                    <div className="text-xs font-bold text-black">
                      Engineer Ravi Kumar is arriving
                    </div>
                    <div className="text-[10px] text-slate-600">
                      Dell XPS 15 Motherboard Diagnostic
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#22C55E] h-full w-3/4 rounded-full" />
                    </div>
                  </div>

                  {/* Quick Action Tiles */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-black">
                      <div className="text-base">💻</div>
                      <span>Laptop Repair</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-black">
                      <div className="text-base">🖥️</div>
                      <span>Desktop PC</span>
                    </div>
                  </div>

                  {/* Warranty Card Preview */}
                  <div className="p-2.5 rounded-xl bg-[#06223A] text-white flex items-center justify-between text-[10px]">
                    <div>
                      <div className="font-bold">Active 90-Day Warranty</div>
                      <div className="text-[9px] text-slate-300">Display Replacement #SR-8491</div>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
                  </div>

                  {/* Booking CTA Button */}
                  <button className="w-full py-2.5 rounded-xl bg-[#22C55E] text-white text-xs font-bold text-center shadow-md">
                    Book Doorstep Visit
                  </button>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
