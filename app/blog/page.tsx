import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Blog – Exius',
  description: 'Insights, guides, and updates from the Exius team on crypto savings and DeFi.',
}

const posts = [
  {
    category: 'Education',
    date: 'Feb 12, 2026',
    title: 'What Is Daily Compounding and Why It Matters for Your Crypto',
    excerpt:
      'Compounding interest is one of the most powerful forces in finance. When applied daily to your crypto holdings, the results over time can be significant. Here\'s how it works and why Exius uses it.',
    readTime: '5 min read',
  },
  {
    category: 'Product',
    date: 'Jan 28, 2026',
    title: 'Introducing Fixed-Term Savings: Lock In Higher Rates for 1, 3, or 12 Months',
    excerpt:
      'We\'re excited to announce the launch of Fixed-Term Savings on Exius. If you\'re comfortable committing your assets for a set period, you can now earn significantly higher annual yields than our flexible savings products.',
    readTime: '4 min read',
  },
  {
    category: 'Guides',
    date: 'Jan 14, 2026',
    title: 'Bitcoin vs Stablecoins: Which Should You Put in Your Savings Account?',
    excerpt:
      'Both Bitcoin and stablecoins like USDT and USDC are available on Exius — but they serve different purposes. This guide breaks down the trade-offs between volatility and yield to help you decide.',
    readTime: '7 min read',
  },
  {
    category: 'Company',
    date: 'Dec 20, 2025',
    title: 'Year in Review: Exius 2025 — Milestones, Growth, and What\'s Next',
    excerpt:
      'From platform launch to $50M in assets under management, 2025 was a defining year for Exius. We reflect on what we built, the community that supported us, and the roadmap for 2026.',
    readTime: '6 min read',
  },
  {
    category: 'Education',
    date: 'Nov 30, 2025',
    title: 'Understanding APY vs APR: A Crypto Saver\'s Guide',
    excerpt:
      'Annual Percentage Yield (APY) and Annual Percentage Rate (APR) sound similar but can have a major impact on what you actually earn. Learn the difference and why Exius always shows you APY.',
    readTime: '4 min read',
  },
  {
    category: 'Security',
    date: 'Oct 15, 2025',
    title: 'How Exius Protects Your Assets: A Deep Dive into Our Security Model',
    excerpt:
      'Security is non-negotiable at Exius. In this post, our security team walks through the layers of protection that keep user funds safe — from multi-signature wallets to real-time monitoring.',
    readTime: '8 min read',
  },
]

const categoryColors: Record<string, string> = {
  Education: 'bg-blue-50 text-blue-600',
  Product: 'bg-teal-50 text-teal-600',
  Guides: 'bg-purple-50 text-purple-600',
  Company: 'bg-orange-50 text-orange-600',
  Security: 'bg-red-50 text-red-600',
}

export default function BlogPage() {
  return (
    <InfoPageLayout
      title="Exius Blog"
      subtitle="Insights, guides, and updates to help you make the most of your crypto savings."
    >
      {/* Featured Post */}
      <div className="mb-16">
        <div className="bg-[#0f1419] rounded-2xl p-10 md:p-14">
          <span className="text-sm text-teal-400 font-medium bg-teal-400/10 px-3 py-1 rounded-full">
            Featured
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-white mt-4 mb-4">
            What Is Daily Compounding and Why It Matters for Your Crypto
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
            Compounding interest is one of the most powerful forces in finance. When applied daily
            to your crypto holdings, the results over time can be significant. Here&apos;s how it
            works and why Exius uses it to help savers build wealth faster.
          </p>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>Feb 12, 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </div>
      </div>

      {/* All Posts */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.title}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-sm text-subtext">{post.date}</span>
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">{post.title}</h3>
              <p className="text-subtext flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-subtext">{post.readTime}</span>
                <a
                  href={`mailto:support@exius.ca?subject=Blog Inquiry – ${encodeURIComponent(post.title)}`}
                  className="text-teal-600 font-medium text-sm hover:text-teal-500 transition-colors inline-flex items-center gap-1"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-medium text-primary mb-4">Stay in the loop</h2>
        <p className="text-subtext mb-8 max-w-lg mx-auto">
          Get the latest Exius articles, product updates, and crypto savings insights delivered
          to your inbox.
        </p>
        <a
          href="mailto:support@exius.ca?subject=Subscribe to Exius Blog"
          className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
        >
          Subscribe for updates
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </InfoPageLayout>
  )
}
