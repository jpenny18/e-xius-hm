import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Cookie Policy – Exius',
  description: 'How Exius uses cookies and similar technologies on its platform.',
}

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    description:
      'These cookies are essential for the Exius platform to function. They enable core functionality such as authentication, session management, and security features. You cannot opt out of these cookies.',
    examples: ['Session token', 'CSRF protection', 'Authentication state'],
    canOptOut: false,
  },
  {
    name: 'Performance & Analytics Cookies',
    description:
      'These cookies help us understand how users interact with the platform, which pages are visited most, and where errors occur. This information is used to improve our services. Data is aggregated and anonymised.',
    examples: ['Page view tracking', 'Error logging', 'Load time monitoring'],
    canOptOut: true,
  },
  {
    name: 'Functional Cookies',
    description:
      'These cookies remember your preferences and settings to provide a more personalised experience. For example, they may store your preferred language, currency, or theme setting.',
    examples: ['Language preference', 'UI settings', 'Recently viewed assets'],
    canOptOut: true,
  },
  {
    name: 'Marketing Cookies',
    description:
      'We use these cookies to understand the effectiveness of our marketing campaigns and to deliver relevant content. These are only used with your explicit consent.',
    examples: ['Ad performance tracking', 'Referral attribution'],
    canOptOut: true,
  },
]

export default function CookiePolicyPage() {
  return (
    <InfoPageLayout
      title="Cookie Policy"
      subtitle="Last updated: February 1, 2026"
    >
      <div className="max-w-3xl space-y-10">

        <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
          <p className="text-subtext leading-relaxed">
            This Cookie Policy explains how Exius Technologies Inc. (&quot;Exius&quot;, &quot;we&quot;, &quot;us&quot;) uses
            cookies and similar tracking technologies on our platform and website. By continuing to
            use Exius, you agree to the use of cookies as described in this policy.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">What Are Cookies?</h2>
          <p className="text-subtext leading-relaxed">
            Cookies are small text files stored on your device (computer, tablet, or mobile) when
            you visit a website. They allow the website to recognise your device on subsequent
            visits and provide functionality, preferences, and analytics. Alongside cookies, we
            may also use similar technologies such as local storage, session storage, and pixel
            tags.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-6">Types of Cookies We Use</h2>
          <div className="space-y-6">
            {cookieTypes.map((type) => (
              <div key={type.name} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-medium text-primary">{type.name}</h3>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ml-4 ${
                      type.canOptOut
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {type.canOptOut ? 'Optional' : 'Required'}
                  </span>
                </div>
                <p className="text-subtext leading-relaxed mb-4">{type.description}</p>
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs text-subtext bg-white border border-gray-200 px-3 py-1 rounded-full"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">Third-Party Cookies</h2>
          <p className="text-subtext leading-relaxed">
            Some cookies on the Exius platform are set by third-party service providers, including
            analytics providers and identity verification services. These third parties have their
            own privacy policies that govern the data they collect. We only work with trusted
            partners who are contractually required to handle data securely and in compliance with
            applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">Managing Your Cookie Preferences</h2>
          <p className="text-subtext leading-relaxed mb-4">
            You can manage or disable optional cookies through your browser settings. Most browsers
            allow you to:
          </p>
          <ul className="space-y-3 text-subtext mb-4">
            {[
              'View cookies stored on your device',
              'Delete all or specific cookies',
              'Block cookies from specific websites',
              'Set preferences for future cookie handling',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-subtext leading-relaxed">
            Please note that disabling strictly necessary cookies may impair the functionality of
            the Exius platform, including your ability to log in and access your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">Cookie Retention</h2>
          <p className="text-subtext leading-relaxed">
            Session cookies expire when you close your browser. Persistent cookies remain on your
            device for a defined period (typically between 30 days and 2 years, depending on the
            cookie type) or until you delete them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">Updates to This Policy</h2>
          <p className="text-subtext leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices
            or applicable law. The &quot;Last updated&quot; date at the top of this page will be revised
            accordingly. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-primary mb-4">Contact Us</h2>
          <p className="text-subtext leading-relaxed">
            If you have any questions about our use of cookies, please contact us at{' '}
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
