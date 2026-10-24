import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Laptop, Monitor, Network, Video } from 'lucide-react';

export const CommonIssues: React.FC = () => {
  const issuesList = [
    {
      category: 'Laptop Issues',
      icon: <Laptop className="w-5 h-5 text-[#22C55E]" />,
      link: '/services/laptop-repair',
      items: [
        'Laptop not powering on or charging LED dead',
        'Flickering screen, vertical lines or broken display panel',
        'Overheating, loud fan whine and random shutdowns',
        'Water or liquid spillage on keyboard & motherboard'
      ]
    },
    {
      category: 'Desktop & PC Faults',
      icon: <Monitor className="w-5 h-5 text-[#06223A]" />,
      link: '/services/computer-repair',
      items: [
        'PC powers up but shows "No Signal" on monitor',
        'Continuous Blue Screen of Death (BSOD) crashes',
        'Burnt SMPS power supply or burning electrical smell',
        'Corrupted hard drive, click of death & data loss'
      ]
    },
    {
      category: 'Network Downtime',
      icon: <Network className="w-5 h-5 text-[#16A34A]" />,
      link: '/services/networking',
      items: [
        'Frequent Wi-Fi disconnects & high latency lag',
        'Dead zones in multi-floor office or residential spaces',
        'Messy server rack with unlabelled or faulty cables',
        'Slow file sharing between local office systems'
      ]
    },
    {
      category: 'CCTV & Camera Faults',
      icon: <Video className="w-5 h-5 text-[#06223A]" />,
      link: '/services/cctv-repair-installation',
      items: [
        'Camera screen black / "Video Loss" message on DVR',
        'DVR/NVR continuous beeping & hard disk recording failure',
        'Cannot view CCTV live feed on mobile phone away from home',
        'Blurry nighttime video or damaged outdoor cabling'
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-[#22C55E]" />
            Troubleshooting Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Common IT Problems We Solve Daily
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
            Recognize any of these symptoms in your equipment? Explore tailored solutions or book an inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {issuesList.map((box, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl hover:border-[#22C55E] transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    {box.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-black group-hover:text-[#16A34A] transition-colors">
                    {box.category}
                  </h3>
                </div>

                <ul className="space-y-3 text-xs text-slate-800">
                  {box.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E] mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link
                  to={box.link}
                  className="text-xs font-bold text-[#06223A] hover:text-[#16A34A] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Troubleshoot & Fix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

