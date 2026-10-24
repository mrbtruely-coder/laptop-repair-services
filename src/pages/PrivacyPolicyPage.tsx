import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/site';
import { Shield, Lock, Eye, FileCheck, Phone, MessageSquare } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title={`Privacy Policy | ${siteConfig.brandName}`}
        description={`Learn how ${siteConfig.brandName} protects your customer data and personal information during doorstep computer, laptop, networking, and CCTV services.`}
        canonicalPath="/privacy-policy"
        keywords={[
          'privacy policy',
          'customer data security',
          'laptop repair privacy',
          'computer service confidentiality',
          'data protection policy'
        ]}
        breadcrumbs={[
          { name: 'Privacy Policy', url: '/privacy-policy' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-4 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Your trust and personal privacy are our top priorities. Here is how {siteConfig.brandName} collects, protects, and handles your service information.
          </p>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Effective Date: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Section 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-black font-bold text-lg sm:text-xl">
              <Eye className="w-5 h-5 text-[#16A34A]" />
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When booking a repair appointment or requesting a quote through our website or customer helpline, we collect only necessary contact and equipment details:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-1">
              <li><strong>Contact Information:</strong> Full name, telephone/WhatsApp number, and email address.</li>
              <li><strong>Service Location:</strong> City, area/locality, and doorstep delivery address for field technician navigation.</li>
              <li><strong>Device & Issue Description:</strong> Equipment brand, model number, observed symptoms, and selected service category.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-black font-bold text-lg sm:text-xl">
              <FileCheck className="w-5 h-5 text-[#16A34A]" />
              <h2>2. How We Use Your Information</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We use your submitted details strictly to fulfill your requested IT and hardware services:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-1">
              <li>Dispatching certified technicians to your doorstep at the chosen date and time.</li>
              <li>Providing upfront diagnostic quotations and service updates via WhatsApp or telephone.</li>
              <li>Issuing digital warranty receipts and tracking post-repair service warranties.</li>
              <li>Improving customer service and dispatch efficiency across our regional coverage zones.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-black font-bold text-lg sm:text-xl">
              <Shield className="w-5 h-5 text-[#16A34A]" />
              <h2>3. Device Data Confidentiality</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We adhere strictly to ethical data confidentiality practices:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-1">
              <li><strong>Zero Data Browsing:</strong> Technicians are strictly prohibited from inspecting personal documents, browsing photos, or accessing personal accounts on client devices.</li>
              <li><strong>Storage Integrity:</strong> In cases requiring OS restoration or drive formatting, work proceeds only after explicit customer confirmation.</li>
              <li><strong>No Data Sharing or Selling:</strong> We never sell, lease, or monetize your contact details or device data to any third-party marketing companies.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-black font-bold text-lg sm:text-xl">
              <Lock className="w-5 h-5 text-[#16A34A]" />
              <h2>4. Data Storage & Security Measures</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Our website uses secure SSL encryption to safeguard all transmission of booking forms and inquiries. Access to customer contact records is restricted solely to authorized dispatch managers and assigned repair coordinators.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-black">5. Your Privacy Choices & Contact Desk</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You may request review, modification, or complete deletion of your customer booking record at any time by contacting our privacy coordinator at <a href={`mailto:${siteConfig.supportEmail}`} className="text-[#16A34A] underline font-medium">{siteConfig.supportEmail}</a>.
            </p>
          </div>

          {/* Support Helpline Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-black">Have Questions About Your Privacy?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Our support team is happy to explain our security policies and data handling practices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs py-3 px-6 rounded-full transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello, I have a question regarding data privacy and security.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-3 px-6 rounded-full transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
