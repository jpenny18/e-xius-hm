import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Help Center – Exius',
  description: 'Find answers to common questions about Exius savings products and your account.',
}

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an Exius account?',
        a: 'Visit exius.ca and click "Sign Up". You will need to provide your email address, create a password, and complete our identity verification (KYC) process. Verification typically takes 1–3 business days.',
      },
      {
        q: 'What documents do I need to verify my identity?',
        a: 'We require a valid government-issued photo ID (passport, driver\'s licence, or national ID card) and proof of address (utility bill or bank statement dated within 90 days).',
      },
      {
        q: 'Which countries can use Exius?',
        a: 'Exius is available globally in most jurisdictions. There may be some regional restrictions due to local regulations—if you are unable to register or have questions about availability in your country, please contact support@exius.ca for the latest information.',
      },
    ],
  },
  {
    category: 'Savings & Rates',
    questions: [
      {
        q: 'What is the difference between Flexible and Fixed-Term savings?',
        a: 'Flexible savings allow you to withdraw your funds at any time with no lockup period. Fixed-term savings lock your assets for 1, 3, or 12 months in exchange for higher annual yields. Fixed rates are locked in at the time of commitment.',
      },
      {
        q: 'How is interest calculated and paid?',
        a: 'Interest is calculated daily based on your account balance and annual rate, then credited to your Exius account each day. This means your interest also earns interest — the power of daily compounding.',
      },
      {
        q: 'What is the Exius Loyalty Program?',
        a: 'The Loyalty Program rewards users who maintain a balance above $5,000 with access to our highest annual percentage yields. Rates increase automatically once you meet the balance threshold.',
      },
      {
        q: 'Can I earn on stablecoins like USDT or USDC?',
        a: 'Yes. Exius supports USDT and USDC with some of our highest available rates — up to 26% APY on Fixed-Term plans. Stablecoin savings allow you to earn significant yield without exposure to crypto price volatility.',
      },
    ],
  },
  {
    category: 'Deposits & Withdrawals',
    questions: [
      {
        q: 'How do I deposit crypto into my Exius account?',
        a: 'Log in to your dashboard, navigate to the deposit section, and select the asset you want to deposit. Copy your unique Exius wallet address for that asset and send from your external wallet. Deposits are credited after the required blockchain confirmations.',
      },
      {
        q: 'How long do withdrawals take?',
        a: 'Withdrawals from Flexible savings are typically processed within 1–3 business hours. Fixed-term savings can only be withdrawn at the end of the term. All withdrawals are subject to standard blockchain confirmation times.',
      },
      {
        q: 'Is there a minimum deposit amount?',
        a: 'There is no minimum deposit. However, to access the Exius Loyalty Program rates, you will need a total account balance above $5,000 USD equivalent.',
      },
    ],
  },
  {
    category: 'Security & Account',
    questions: [
      {
        q: 'How is my account kept secure?',
        a: 'We recommend enabling two-factor authentication (2FA) on your account. Exius uses encryption, regular security audits, and industry-leading infrastructure to protect your account and assets.',
      },
      {
        q: 'What should I do if I suspect unauthorised access?',
        a: 'Immediately contact us at support@exius.ca with the subject line "Account Security". Our security team will assist you in securing your account, reviewing recent activity, and taking appropriate action.',
      },
      {
        q: 'How do I update my account information?',
        a: 'Log in and navigate to Settings > Profile. Some changes (like legal name updates) may require additional identity verification. Contact support@exius.ca for assistance.',
      },
    ],
  },
]

export default function HelpCenterPage() {
  return (
    <InfoPageLayout
      title="Help Center"
      subtitle="Answers to the most common questions about Exius."
    >
      {/* Contact Banner */}
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-medium text-primary mb-1">Can&apos;t find what you&apos;re looking for?</p>
          <p className="text-subtext text-sm">Our support team is ready to help. Usually responds within one business day.</p>
        </div>
        <a
          href="mailto:support@exius.ca"
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shrink-0 text-center"
        >
          Email support
        </a>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-14">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-2xl font-medium text-primary mb-6 border-b border-gray-100 pb-4">
              {section.category}
            </h2>
            <div className="space-y-6">
              {section.questions.map((item) => (
                <div key={item.q} className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-lg font-medium text-primary mb-3">{item.q}</h3>
                  <p className="text-subtext leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#0f1419] rounded-2xl p-10 text-center mt-16">
        <h2 className="text-3xl font-medium text-white mb-4">Still have questions?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Our support team is here to help with any questions about your account, savings
          products, or technical issues.
        </p>
        <a
          href="mailto:support@exius.ca"
          className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
        >
          Contact support
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </InfoPageLayout>
  )
}
