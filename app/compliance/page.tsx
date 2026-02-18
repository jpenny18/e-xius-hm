import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Compliance – Exius',
  description: 'How Exius meets its regulatory obligations and upholds industry standards.',
}

export default function CompliancePage() {
  return (
    <InfoPageLayout
      title="Compliance"
      subtitle="Our commitment to operating within the bounds of the law and beyond."
    >
      {/* Intro */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-medium text-primary mb-4">Our Compliance Framework</h2>
            <p className="text-subtext leading-relaxed mb-4">
              Exius operates under a robust compliance program designed to meet the requirements of
              Canadian financial regulators and international best-practice standards for
              anti-money laundering (AML), counter-terrorist financing (CTF), and know-your-customer
              (KYC) obligations.
            </p>
            <p className="text-subtext leading-relaxed">
              We take compliance seriously — not because it is required, but because it is the
              foundation of the trust our users place in us. A compliant platform is a safe platform.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-medium text-primary mb-4">Compliance contact</h3>
            <p className="text-subtext mb-4">
              For compliance-related inquiries, regulatory requests, or to report a concern,
              please reach out to our compliance team directly.
            </p>
            <a
              href="mailto:support@exius.ca?subject=Compliance Inquiry"
              className="text-teal-600 font-semibold hover:text-teal-500 transition-colors"
            >
              support@exius.ca
            </a>
          </div>
        </div>
      </div>

      {/* Compliance Pillars */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-8 text-center">
          Key Compliance Areas
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Know Your Customer (KYC)</h3>
            <p className="text-subtext leading-relaxed">
              All users must complete identity verification before accessing Exius savings products.
              We collect and verify government-issued ID, proof of address, and other information
              required by Canadian regulations. Our KYC process is powered by trusted, regulated
              identity verification partners.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Anti-Money Laundering (AML)</h3>
            <p className="text-subtext leading-relaxed">
              Exius maintains a comprehensive AML program in accordance with Canada&apos;s Proceeds of
              Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA). We conduct ongoing
              transaction monitoring, screen users against global sanctions lists, and file
              suspicious transaction reports (STRs) with FINTRAC as required.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Sanctions Screening</h3>
            <p className="text-subtext leading-relaxed">
              We screen all users and transactions against OFAC, UN, EU, and Canadian government
              sanctions lists. Access to Exius is denied to individuals, entities, or jurisdictions
              subject to applicable sanctions.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Regulatory Reporting</h3>
            <p className="text-subtext leading-relaxed">
              Exius fulfills all required regulatory reporting obligations in Canada. We maintain detailed records of user transactions, identity verification files, and compliance decisions in accordance with applicable regulatory retention requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Programme Statement */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-6">Our Compliance Programme</h2>
        <div className="space-y-4 text-subtext">
          <p className="leading-relaxed">
            Exius has appointed a dedicated Chief Compliance Officer (CCO) responsible for
            overseeing all aspects of our compliance program. Our compliance team conducts
            regular internal audits, risk assessments, and staff training to ensure that all
            team members understand and adhere to our compliance obligations.
          </p>
          <p className="leading-relaxed">
            We engage independent third-party auditors on a periodic basis to review our AML/KYC
            controls and provide recommendations for continuous improvement.
          </p>
          <p className="leading-relaxed">
            Our compliance program is built on a risk-based approach, allowing us to allocate
            resources proportionally to the level of risk associated with individual users,
            products, and transaction types.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0f1419] rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-medium text-white mb-4">Questions about compliance?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Our compliance team is available to address regulatory inquiries, user concerns, or
          requests from law enforcement and regulatory agencies.
        </p>
        <a
          href="mailto:support@exius.ca?subject=Compliance Inquiry"
          className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
        >
          Contact compliance
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </InfoPageLayout>
  )
}
