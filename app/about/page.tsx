import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'About Us – Exius',
  description: 'Learn about Exius, the crypto savings platform built for the modern investor.',
}

export default function AboutPage() {
  return (
    <InfoPageLayout
      title="About Exius"
      subtitle="Building the future of crypto savings — one daily payout at a time."
    >
      {/* Mission */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-primary mb-6">Our Mission</h2>
        <p className="text-lg text-subtext leading-relaxed max-w-3xl">
          Exius exists to make your digital assets work as hard as you do. We believe that
          everyone deserves access to high-yield savings products — not just institutional investors
          or Wall Street insiders. Our platform gives individuals and businesses the tools to grow
          their crypto holdings with industry-leading annual rates, daily compounding, and
          transparent, trustworthy infrastructure.
        </p>
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-6">Our Story</h2>
          <p className="text-subtext leading-relaxed mb-4">
            Exius was founded by a team of fintech veterans and blockchain engineers who saw a gap
            in the market: crypto holders were leaving enormous value on the table by keeping assets
            idle in wallets. Traditional savings accounts offered near-zero returns, while the
            decentralised finance ecosystem was complex, risky, and inaccessible to most people.
          </p>
          <p className="text-subtext leading-relaxed mb-4">
            We set out to bridge that gap — offering the simplicity of a traditional savings account
            with the yield potential of DeFi, wrapped in a regulated, secure platform that users
            can trust.
          </p>
          <p className="text-subtext leading-relaxed">
            Today, Exius serves thousands of users across Canada and beyond, with a growing suite
            of savings products covering Bitcoin, Ethereum, stablecoins, and more.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="text-4xl font-medium text-primary mb-2">26%</div>
            <div className="text-subtext text-sm">Max yearly rate</div>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="text-4xl font-medium text-primary mb-2">9+</div>
            <div className="text-subtext text-sm">Supported assets</div>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="text-4xl font-medium text-primary mb-2">Daily</div>
            <div className="text-subtext text-sm">Compounding payouts</div>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="text-4xl font-medium text-primary mb-2">0</div>
            <div className="text-subtext text-sm">Lockup on flexible plans</div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-primary mb-8 text-center">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Security First</h3>
            <p className="text-subtext">
              We safeguard user assets with institutional-grade security, cold storage protocols,
              and continuous audits. Your funds are our responsibility.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Radical Transparency</h3>
            <p className="text-subtext">
              No hidden fees, no confusing rate structures. Every rate, term, and condition is
              clearly stated so you always know what you're earning.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Built for Everyone</h3>
            <p className="text-subtext">
              Whether you're saving $500 or $500,000, Exius offers products designed to meet you
              where you are and grow with you.
            </p>
          </div>
        </div>
      </div>

      {/* Team / CTA */}
      <div className="bg-[#0f1419] rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-medium text-white mb-4">Join the Exius community</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Thousands of users already trust Exius to grow their digital wealth. Start earning
          daily returns on your crypto today — with no lockups on flexible plans.
        </p>
        <a
          href="/login"
          className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
        >
          Get started
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </InfoPageLayout>
  )
}
