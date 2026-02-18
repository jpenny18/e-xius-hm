import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Contact Us – Exius',
  description: 'Get in touch with the Exius support team.',
}

const contactOptions = [
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'General Support',
    description: 'Account questions, savings products, deposits and withdrawals.',
    contact: 'support@exius.ca',
    href: 'mailto:support@exius.ca',
    responseTime: 'Usually responds within 1 business day',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Security Issues',
    description: 'Suspected fraud, unauthorised access, or security vulnerabilities.',
    contact: 'support@exius.ca',
    href: 'mailto:support@exius.ca?subject=Security Issue',
    responseTime: 'Priority response within 4 hours',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    title: 'Press & Media',
    description: 'Interview requests, press releases, and media asset inquiries.',
    contact: 'support@exius.ca',
    href: 'mailto:support@exius.ca?subject=Press Inquiry',
    responseTime: 'Usually responds within 1 business day',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    title: 'Compliance & Legal',
    description: 'Regulatory requests, legal notices, and compliance inquiries.',
    contact: 'support@exius.ca',
    href: 'mailto:support@exius.ca?subject=Compliance & Legal Inquiry',
    responseTime: 'Usually responds within 2 business days',
  },
]

export default function ContactPage() {
  return (
    <InfoPageLayout
      title="Contact Us"
      subtitle="We're here to help. Reach out to the right team for the fastest response."
    >
      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {contactOptions.map((option) => (
          <div
            key={option.title}
            className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              {option.icon}
            </div>
            <h3 className="text-xl font-medium text-primary mb-2">{option.title}</h3>
            <p className="text-subtext mb-4">{option.description}</p>
            <a
              href={option.href}
              className="text-teal-600 font-semibold hover:text-teal-500 transition-colors block mb-2"
            >
              {option.contact}
            </a>
            <p className="text-sm text-subtext">{option.responseTime}</p>
          </div>
        ))}
      </div>

      {/* Direct contact section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-medium text-primary mb-4">Write to us</h2>
          <p className="text-subtext leading-relaxed mb-6">
            For all inquiries, the fastest way to reach our team is via email. Include as much
            detail as possible — your account email, the nature of your request, and any relevant
            transaction IDs — so we can resolve your issue quickly.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-sm text-subtext mb-1">Primary contact email</p>
            <a
              href="mailto:support@exius.ca"
              className="text-2xl font-medium text-primary hover:text-teal-600 transition-colors"
            >
              support@exius.ca
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-primary mb-4">Before you write</h2>
          <p className="text-subtext leading-relaxed mb-4">
            Many questions are already answered in our Help Center. Check there first — you may
            get an instant answer.
          </p>
          <ul className="space-y-3 text-subtext mb-6">
            {[
              'How to deposit and withdraw',
              'How rates and compounding work',
              'Identity verification requirements',
              'Fixed vs flexible savings differences',
              'Account security best practices',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="/help-center"
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2"
          >
            Visit Help Center
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Response time notice */}
      <div className="bg-[#0f1419] rounded-2xl p-10">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-medium text-teal-400 mb-2">&lt; 1 day</div>
            <div className="text-gray-300 text-sm">Average response time</div>
          </div>
          <div>
            <div className="text-3xl font-medium text-teal-400 mb-2">24/7</div>
            <div className="text-gray-300 text-sm">Security monitoring</div>
          </div>
          <div>
            <div className="text-3xl font-medium text-teal-400 mb-2">English</div>
            <div className="text-gray-300 text-sm">Support language</div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  )
}
