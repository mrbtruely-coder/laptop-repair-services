import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/site';
import { FileText, CheckCircle2, AlertCircle, Phone, MessageSquare } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title={`Terms and Conditions | ${siteConfig.brandName}`}
        description={`Read the Terms of Service and repair policy for ${siteConfig.brandName}. Information on diagnostic procedures, warranty coverage, and customer rights.`}
        canonicalPath="/terms"
        keywords={[
          'terms of service',
          'repair policy',
          'warranty terms',
          'laptop service terms',
          'computer repair conditions'
        ]}
        breadcrumbs={[
          { name: 'Terms and Conditions', url: '/terms' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-4 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Please review the operating terms, service warranty policies, and transparent repair guidelines governing {siteConfig.brandName}.
          </p>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Last Updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Section 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold">1</span>
              <span>Scope of Services</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {siteConfig.brandName} delivers on-site doorstep diagnostics, chip-level hardware repair, operating system maintenance, office network structured cabling, and CCTV camera installation across Bengaluru, Visakhapatnam, Chennai, and Hyderabad. All requests are booked through our authorized web portal or official customer helpline.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold">2</span>
              <span>Diagnosis, Estimates & Upfront Approval</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Before undertaking any physical or chip-level hardware repairs, our field engineer performs preliminary diagnostics and provides a clear, itemized cost estimate. No repair is commenced without explicit customer approval. Customers retain the right to decline repair following initial diagnosis.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <span>Zero hidden charges: all quotations include part costs and labor.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <span>Written digital service receipt provided upon job completion.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold">3</span>
              <span>Warranty Coverage & Conditions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Replacement components and hardware servicing are backed by up to a <strong>90-day service warranty</strong>. The exact duration depends on the specific component (e.g., OEM screens, batteries, keyboards, SSDs, power supplies) and is detailed in your service invoice.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs sm:text-sm text-amber-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Warranty Exclusions:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                <li>Physical damage, liquid ingress, or drop impacts occurring post-service.</li>
                <li>Unauthorized tampering, third-party disassemblies, or broken warranty seal stickers.</li>
                <li>Software issues caused by malicious software, user virus downloads, or OS tampering.</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold">4</span>
              <span>Customer Data & Confidentiality</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We uphold strict privacy protocols. Our technicians do not access, copy, or distribute your private personal files, passwords, or documents during hardware repair. However, customers are strongly encouraged to maintain backups of critical data before submitting equipment for diagnosis or motherboard level servicing.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-black flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold">5</span>
              <span>Payments, Cancellations & Support</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Payment is due upon successful completion of the service and customer verification. We accept UPI, bank transfers, credit/debit cards, and cash. Service requests may be rescheduled or cancelled without penalty prior to technician dispatch.
            </p>
          </div>

          {/* Contact Assistance */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-black">Questions About Our Terms?</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Our central support desk is available daily to address any service questions or clarify warranty terms.
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
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello, I have a question regarding service terms and warranty.')}`}
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

export default TermsPage;
