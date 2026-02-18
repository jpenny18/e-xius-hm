import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Privacy Policy – Exius',
  description: 'How Exius collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      subtitle="Last updated: February 1, 2026"
    >
      <div className="max-w-3xl prose-like space-y-10">

        <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
          <p className="text-subtext leading-relaxed">
            At Exius, your privacy is a fundamental priority. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your personal information when you use the Exius
            platform and services. By accessing or using Exius, you agree to the practices described
            in this policy.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">1. Who We Are</h2>
          <p className="text-subtext leading-relaxed">
            Exius is a crypto savings platform operated by Exius Technologies Inc., a company
            incorporated under the laws of Canada. For questions about this policy or your data,
            you can reach us at{' '}
            <a href="mailto:support@exius.ca" className="text-teal-600 hover:text-teal-500">
              support@exius.ca
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">2. Information We Collect</h2>
          <p className="text-subtext leading-relaxed mb-4">
            We collect information that is necessary to provide our services and comply with
            applicable laws, including:
          </p>
          <ul className="space-y-3 text-subtext">
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Identity information:</strong> Full name, date of
                birth, government-issued ID for KYC verification.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Contact information:</strong> Email address,
                phone number, and mailing address.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Financial information:</strong> Wallet addresses,
                transaction history, and account balances within the Exius platform.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Technical information:</strong> IP address, browser
                type, device identifiers, and usage analytics collected through cookies and similar
                technologies.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">3. How We Use Your Information</h2>
          <p className="text-subtext leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="space-y-3 text-subtext">
            {[
              'Verify your identity and comply with KYC/AML obligations',
              'Provide, maintain, and improve the Exius platform and services',
              'Process transactions and calculate interest payouts',
              'Send account notifications, security alerts, and service updates',
              'Respond to your inquiries and provide customer support',
              'Detect, investigate, and prevent fraud or other harmful activity',
              'Comply with applicable laws and regulatory requirements',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">4. Sharing Your Information</h2>
          <p className="text-subtext leading-relaxed mb-4">
            We do not sell your personal information. We may share your data with:
          </p>
          <ul className="space-y-3 text-subtext">
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Service providers:</strong> Third-party partners
                who assist in identity verification, cloud infrastructure, analytics, and customer
                support, under strict confidentiality agreements.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Regulatory authorities:</strong> Where required by
                law, court order, or to comply with applicable regulations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                <strong className="text-primary">Business transfers:</strong> In connection with a
                merger, acquisition, or sale of assets, where you will be notified.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">5. Data Retention</h2>
          <p className="text-subtext leading-relaxed">
            We retain your personal information for as long as your account is active and for a
            period of at least five (5) years thereafter, or as required by applicable law. You
            may request deletion of your data subject to legal and regulatory obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">6. Your Rights</h2>
          <p className="text-subtext leading-relaxed mb-4">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="space-y-3 text-subtext">
            {[
              'Access a copy of the personal data we hold about you',
              'Correct inaccurate or incomplete information',
              'Request deletion of your personal data (subject to legal obligations)',
              'Withdraw consent where processing is based on consent',
              'Lodge a complaint with a supervisory authority',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-subtext leading-relaxed mt-4">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:support@exius.ca" className="text-teal-600 hover:text-teal-500">
              support@exius.ca
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">7. Security</h2>
          <p className="text-subtext leading-relaxed">
            We implement industry-standard technical and organisational measures to protect your
            personal information against unauthorised access, disclosure, alteration, or
            destruction. However, no method of transmission over the internet is completely
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">8. Cookies</h2>
          <p className="text-subtext leading-relaxed">
            We use cookies and similar tracking technologies to improve your experience and
            understand how our platform is used. For more information, please review our{' '}
            <a href="/cookie-policy" className="text-teal-600 hover:text-teal-500">
              Cookie Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">9. Changes to This Policy</h2>
          <p className="text-subtext leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we will update the
            &quot;Last updated&quot; date at the top of this page and notify you by email if the changes are
            material. Continued use of the Exius platform constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">10. Contact Us</h2>
          <p className="text-subtext leading-relaxed">
            If you have any questions or concerns about this Privacy Policy or how we handle your
            data, please contact us at{' '}
            <a href="mailto:support@exius.ca" className="text-teal-600 hover:text-teal-500">
              support@exius.ca
            </a>
            .
          </p>
        </section>

      </div>
    </InfoPageLayout>
  )
}
