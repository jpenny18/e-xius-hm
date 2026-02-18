import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Terms of Service – Exius',
  description: 'The terms and conditions governing your use of the Exius platform.',
}

export default function TermsOfServicePage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      subtitle="Last updated: February 1, 2026"
    >
      <div className="max-w-3xl space-y-10">

        <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
          <p className="text-subtext leading-relaxed">
            Please read these Terms of Service carefully before using the Exius platform. By
            accessing or using Exius, you agree to be bound by these terms. If you do not agree,
            do not use our services.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">1. Acceptance of Terms</h2>
          <p className="text-subtext leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you
            and Exius Technologies Inc. (&quot;Exius&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) governing your use of
            the Exius platform, website, and all related services (collectively, the &quot;Services&quot;).
            By creating an account or using the Services, you confirm that you are at least 18 years
            of age and have the legal capacity to enter into this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">2. Eligibility</h2>
          <p className="text-subtext leading-relaxed mb-4">
            To use Exius, you must:
          </p>
          <ul className="space-y-3 text-subtext">
            {[
              'Be at least 18 years of age',
              'Reside in a jurisdiction where our services are permitted',
              'Complete our identity verification (KYC) process',
              'Not be subject to any sanctions or prohibited from using financial services',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-subtext leading-relaxed mt-4">
            Exius reserves the right to refuse service, terminate accounts, or restrict access in
            its sole discretion, including for compliance with applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">3. Account Registration</h2>
          <p className="text-subtext leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activity that occurs under your account. You must notify us immediately at{' '}
            <a href="mailto:support@exius.ca" className="text-teal-600 hover:text-teal-500">
              support@exius.ca
            </a>{' '}
            if you suspect any unauthorised access or security breach. Exius is not liable for
            losses arising from your failure to maintain account security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">4. Savings Products</h2>
          <p className="text-subtext leading-relaxed mb-4">
            Exius offers flexible and fixed-term crypto savings products. The following conditions
            apply to all savings products:
          </p>
          <ul className="space-y-3 text-subtext">
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                Advertised annual percentage yields (APY) are indicative and may change at any time
                for flexible savings products. Fixed-term rates are locked at the time of commitment.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                Interest is calculated and accrued daily. Payouts are credited to your Exius account
                balance.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                Minimum account balances may apply to qualify for certain rates or the Exius
                Loyalty Program.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span>
                Fixed-term savings products are subject to early redemption restrictions. Breaking a
                term early may result in forfeiture of accrued interest.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">5. Fees</h2>
          <p className="text-subtext leading-relaxed">
            Exius does not charge fees for deposits or interest earnings. Withdrawal fees, if any,
            will be clearly disclosed in the platform prior to transaction confirmation. We reserve
            the right to introduce or modify fees with at least 30 days&apos; notice to affected users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">6. Prohibited Activities</h2>
          <p className="text-subtext leading-relaxed mb-4">You agree not to:</p>
          <ul className="space-y-3 text-subtext">
            {[
              'Use Exius for money laundering, terrorist financing, or any illegal activity',
              'Attempt to access accounts or data that are not yours',
              'Introduce malicious code, bots, or automated scripts to the platform',
              'Provide false or misleading information during registration or KYC',
              'Engage in any activity that interferes with the operation of the platform',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">7. Risk Disclosure</h2>
          <p className="text-subtext leading-relaxed">
            Digital assets are inherently volatile and speculative. The value of your crypto
            holdings may increase or decrease significantly. Interest rates on flexible savings
            products are variable and not guaranteed. Exius does not provide financial, investment,
            tax, or legal advice. Nothing on the platform should be construed as such. You should
            consult qualified professionals before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">8. Limitation of Liability</h2>
          <p className="text-subtext leading-relaxed">
            To the maximum extent permitted by applicable law, Exius and its directors, employees,
            and affiliates shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising from your use of the Services. Our total liability in
            connection with any claim arising from these Terms shall not exceed the amount of fees
            paid by you to Exius in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">9. Termination</h2>
          <p className="text-subtext leading-relaxed">
            You may close your Exius account at any time by contacting{' '}
            <a href="mailto:support@exius.ca" className="text-teal-600 hover:text-teal-500">
              support@exius.ca
            </a>
            . Exius reserves the right to suspend or terminate your account at any time for
            violations of these Terms, regulatory requirements, or at our discretion with reasonable
            notice. Upon termination, any funds in your account will be returned to you subject to
            applicable terms and legal holds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">10. Governing Law</h2>
          <p className="text-subtext leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the Province
            of Ontario and the federal laws of Canada applicable therein. Any disputes arising from
            these Terms shall be subject to the exclusive jurisdiction of the courts of Ontario.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">11. Changes to These Terms</h2>
          <p className="text-subtext leading-relaxed">
            We may update these Terms from time to time. When we make material changes, we will
            notify you via email or a prominent notice on the platform at least 15 days before the
            changes take effect. Continued use of the Services after the effective date constitutes
            your acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">12. Contact</h2>
          <p className="text-subtext leading-relaxed">
            For questions about these Terms, please contact us at{' '}
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
