import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AllServicesPage } from './pages/AllServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AllLocationsPage } from './pages/AllLocationsPage';
import { LocationDetailPage } from './pages/LocationDetailPage';
import { SubLocationPage } from './pages/SubLocationPage';
import { CityServicePage } from './pages/CityServicePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookServicePage } from './pages/BookServicePage';
import { FAQPage } from './pages/FAQPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-service" element={<BookServicePage />} />
            <Route path="/book" element={<BookServicePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<AllServicesPage />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
            <Route path="/services/:serviceSlug/:subCategorySlug" element={<ServiceDetailPage />} />
            <Route path="/services/:serviceSlug/:subCategorySlug/book" element={<BookServicePage />} />
            <Route path="/services/:serviceSlug/book" element={<BookServicePage />} />
            <Route path="/laptop-repair" element={<Navigate to="/services/laptop-repair" replace />} />
            <Route path="/computer-repair" element={<Navigate to="/services/computer-repair" replace />} />
            <Route path="/networking" element={<Navigate to="/services/networking" replace />} />
            <Route path="/cctv-repair-installation" element={<Navigate to="/services/cctv-repair-installation" replace />} />
            <Route path="/cctv-services" element={<Navigate to="/services/cctv-repair-installation" replace />} />
            <Route path="/mac-repair" element={<Navigate to="/services/laptop-repair" replace />} />

            {/* All City Locations Directory */}
            <Route path="/service-center" element={<AllLocationsPage />} />
            <Route path="/locations" element={<Navigate to="/service-center" replace />} />

            {/* Direct City & Locality Pages (e.g. /bengaluru, /hyderabad, /chennai, /vizag) */}
            <Route path="/service-center/:citySlug" element={<LocationDetailPage />} />
            <Route path="/service-center/:citySlug/:localitySlug" element={<SubLocationPage />} />
            <Route path="/locations/:citySlug" element={<LocationDetailPage />} />
            <Route path="/locations/:citySlug/:localitySlug" element={<SubLocationPage />} />
            <Route path="/:citySlug" element={<LocationDetailPage />} />
            <Route path="/:citySlug/service-center" element={<LocationDetailPage />} />
            <Route path="/:citySlug/:localitySlug" element={<SubLocationPage />} />

            {/* Genuine Localized City + Service Landing Pages */}
            <Route path="/:citySlug/:serviceSlug" element={<CityServicePage />} />

            {/* 404 Catch All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
