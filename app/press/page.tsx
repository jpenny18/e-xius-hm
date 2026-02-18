import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Press – Exius',
  description: 'Press resources, media inquiries, and news about Exius.',
}

const pressReleases = [
  {
    date: 'February 2026',
    title: 'Exius Launches Fixed-Term Savings Products with Up to 26% Annual Yield',
    summary:
      'Exius expands its savings suite with fixed-term plans ranging from 1 to 12 months, offering users the ability to lock in higher rates while preserving capital.',
  },
  {
    date: 'November 2025',
    title: 'Exius Crosses $50M in User Savings Under Management',
    summary:
      'The Canadian crypto savings platform announces a major milestone as user assets under management surpass $50 million, driven by strong adoption across BTC, ETH, and stablecoin products.',
  },
  {
    date: 'August 2025',
    title: 'Exius Introduces the Loyalty Program: Higher Rates for Dedicated Savers',
    summary:
      'Exius unveils its loyalty tier program, rewarding users who maintain balances above $5,000 with access to industry-leading annual percentage rates and priority support.',
  },
  {
    date: 'April 2025',
    title: 'Exius Platform Launch: Daily Compounding Crypto Savings for Canadian Investors',
    summary:
      'Exius officially launches to the public, offering Canadian investors a regulated, transparent way to earn daily compounding interest on Bitcoin, Ethereum, and top stablecoins.',
  },
]

export default function PressPage() {
  return (
    <InfoPageLayout
      title="Press & Media"
      subtitle="News, press releases, and media resources from Exius."
    >
      {/* Media Contact */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-medium text-primary mb-4">Media Contact</h2>
          <p className="text-subtext leading-relaxed mb-6">
            For press inquiries, interview requests, or media assets, please reach out to our
            communications team. We aim to respond to all media requests within one business day.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-sm text-subtext mb-1">Press & Communications</p>
            <a
              href="mailto:support@exius.ca"
              className="text-primary font-semibold text-lg hover:text-teal-600 transition-colors"
            >
              support@exius.ca
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-medium text-primary mb-4">Brand Assets</h2>
          <p className="text-subtext leading-relaxed mb-6">
            Download official Exius logos, brand guidelines, and product screenshots for use in
            editorial content. Please review our brand guidelines before use.
          </p>
          <a
            href="mailto:support@exius.ca?subject=Brand Assets Request"
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2"
          >
            Request brand assets
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Press Releases */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-8">Press Releases</h2>
        <div className="space-y-6">
          {pressReleases.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-teal-600 font-medium mb-2">{item.date}</p>
              <h3 className="text-xl font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-subtext">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Facts */}
      <div className="bg-[#0f1419] rounded-2xl p-10">
        <h2 className="text-3xl font-medium text-white mb-8 text-center">Company at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-medium text-teal-400 mb-2">2025</div>
            <div className="text-gray-400 text-sm">Founded</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-medium text-teal-400 mb-2">Canada</div>
            <div className="text-gray-400 text-sm">Headquartered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-medium text-teal-400 mb-2">9+</div>
            <div className="text-gray-400 text-sm">Supported assets</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-medium text-teal-400 mb-2">26%</div>
            <div className="text-gray-400 text-sm">Max yearly APY</div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  )
}
