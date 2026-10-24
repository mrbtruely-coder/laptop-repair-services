import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileActionBar } from './MobileActionBar';
import { FloatingActionWidget } from '../common/FloatingActionWidget';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-[#22C55E] selection:text-white">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0 bg-white text-black">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <FloatingActionWidget />
    </div>
  );
};
