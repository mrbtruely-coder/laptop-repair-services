import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { FAQPage } from './pages/FAQPage';
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
            <Route path="/book-service" element={<ContactPage />} />
            <Route path="/book" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<AllServicesPage />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />

            {/* Locations / Service Center Routes */}
            <Route path="/service-center" element={<AllLocationsPage />} />
            <Route path="/service-center/:citySlug" element={<LocationDetailPage />} />
            <Route path="/service-center/:citySlug/:localitySlug" element={<SubLocationPage />} />
            <Route path="/locations" element={<AllLocationsPage />} />
            <Route path="/locations/:citySlug" element={<LocationDetailPage />} />
            <Route path="/locations/:citySlug/:localitySlug" element={<SubLocationPage />} />

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
