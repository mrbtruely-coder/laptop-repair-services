import React from 'react';
import { siteConfig } from '../../config/site';

interface AppDownloadBadgesProps {
  className?: string;
  theme?: 'dark' | 'light' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export const AppDownloadBadges: React.FC<AppDownloadBadgesProps> = ({
  className = '',
  theme = 'navy',
  size = 'md',
  playStoreUrl,
  appStoreUrl,
}) => {
  const isNavy = theme === 'navy';
  const isLight = theme === 'light';

  const finalPlayStoreUrl = playStoreUrl || siteConfig.playStoreUrl;
  const finalAppStoreUrl = appStoreUrl || siteConfig.appStoreUrl;

  const btnBg = isNavy
    ? 'bg-[#06223A] hover:bg-[#0A3356] text-white border border-[#06223A]'
    : isLight
    ? 'bg-white hover:bg-slate-50 text-black border border-slate-300'
    : 'bg-black hover:bg-zinc-900 text-white border border-zinc-800';

  const pad = size === 'sm' ? 'px-3 py-1.5' : size === 'lg' ? 'px-5 py-3' : 'px-4 py-2.5';
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Google Play Store Badge */}
      <a
        href={finalPlayStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Doorstep Hub on Google Play Store"
        className={`inline-flex items-center gap-3 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.02] ${btnBg} ${pad}`}
      >
        {/* Play Store SVG */}
        <svg className={`${iconSize} flex-shrink-0`} viewBox="0 0 512 512">
          <path
            fill="#4285F4"
            d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
          />
          <path
            fill="#34A853"
            d="M47 38.6c-4.4 7.6-7 16.7-7 26.6v381.6c0 9.9 2.6 19 7 26.6l234.7-234.7L47 38.6z"
          />
          <path
            fill="#FBBC04"
            d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"
          />
          <path
            fill="#EA4335"
            d="M444.6 226.7l-59.2-34-60.1 60.1 60.1 60.1 59.2-34c17.5-10.1 27.4-28.7 27.4-46.1s-9.9-36-27.4-46.1z"
          />
        </svg>
        <div className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-wider font-semibold opacity-80">
            GET IT ON
          </span>
          <span className="block text-xs sm:text-sm font-bold tracking-tight mt-0.5">
            Google Play
          </span>
        </div>
      </a>

      {/* Apple App Store Badge */}
      <a
        href={finalAppStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Doorstep Hub on Apple App Store"
        className={`inline-flex items-center gap-3 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.02] ${btnBg} ${pad}`}
      >
        {/* Apple SVG */}
        <svg className={`${iconSize} flex-shrink-0 fill-current`} viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.79-11.9-14.24-5.59-8.49-10.02-18.42-13.3-29.8-3.28-11.37-4.92-22.18-4.92-32.42 0-14.18 3.52-26.06 10.57-35.63 7.05-9.57 16.03-14.47 26.94-14.7 4.93 0 10.28 1.34 16.05 4.02 5.77 2.68 9.53 4.09 11.29 4.24 1.39-.28 5.48-1.77 12.28-4.47 6.8-2.7 12.39-3.89 17.76-3.56 13.55.76 24.32 5.56 32.32 14.41-11.75 7.12-17.5 16.89-17.25 29.31.25 9.7 3.99 17.79 11.23 24.28 7.23 6.48 15.93 10.24 26.09 11.27-2.12 6.52-4.66 13.01-7.63 19.46zM119.22 33.72c0-7.39 2.64-14.28 7.93-20.67 5.29-6.39 11.83-10.74 19.63-13.05.65 3.16.98 6.06.98 8.7 0 7.28-2.68 14.21-8.04 20.79-5.36 6.57-11.88 10.98-19.56 13.23-.28-2.83-.94-5.83-.94-9z" />
        </svg>
        <div className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-wider font-semibold opacity-80">
            Download on the
          </span>
          <span className="block text-xs sm:text-sm font-bold tracking-tight mt-0.5">
            App Store
          </span>
        </div>
      </a>
    </div>
  );
};
