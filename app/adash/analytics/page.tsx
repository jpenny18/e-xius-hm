'use client'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Diagonal Teal Stripe Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg
          className="absolute w-full h-full"
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="analyticsGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#analyticsGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-white mb-1">Analytics & Reports</h1>
          <p className="text-gray-400 text-sm md:text-base">Platform performance and insights</p>
        </div>

        {/* Time Period Selector */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium">7 Days</button>
            <button className="px-4 py-2 bg-gray-800/50 text-gray-400 hover:text-white rounded-lg font-medium transition-colors">
              30 Days
            </button>
            <button className="px-4 py-2 bg-gray-800/50 text-gray-400 hover:text-white rounded-lg font-medium transition-colors">
              90 Days
            </button>
            <button className="px-4 py-2 bg-gray-800/50 text-gray-400 hover:text-white rounded-lg font-medium transition-colors">
              1 Year
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="text-gray-400 text-xs md:text-sm mb-1">Transaction Volume</div>
            <div className="text-white text-2xl md:text-3xl font-medium mb-1">$12.4M</div>
            <div className="text-green-400 text-xs md:text-sm">+18.2% vs last period</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="text-gray-400 text-xs md:text-sm mb-1">New Users</div>
            <div className="text-white text-2xl md:text-3xl font-medium mb-1">324</div>
            <div className="text-green-400 text-xs md:text-sm">+12.5% vs last period</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="text-gray-400 text-xs md:text-sm mb-1">Active Users</div>
            <div className="text-white text-2xl md:text-3xl font-medium mb-1">1,247</div>
            <div className="text-green-400 text-xs md:text-sm">+8.3% vs last period</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="text-gray-400 text-xs md:text-sm mb-1">Avg. Balance</div>
            <div className="text-white text-2xl md:text-3xl font-medium mb-1">$36.2K</div>
            <div className="text-green-400 text-xs md:text-sm">+5.7% vs last period</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-medium text-white mb-4">Transaction Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p>Chart visualization would go here</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-medium text-white mb-4">User Growth</h3>
            <div className="h-64 flex items-center justify-center bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p>Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Crypto Distribution */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-medium text-white mb-4">Asset Distribution</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-4">
            {[
              { coin: 'BTC', percentage: 28.4 },
              { coin: 'ETH', percentage: 22.1 },
              { coin: 'USDT', percentage: 18.5 },
              { coin: 'USDC', percentage: 12.3 },
              { coin: 'SOL', percentage: 7.2 },
              { coin: 'XRP', percentage: 4.8 },
              { coin: 'BNB', percentage: 3.1 },
              { coin: 'TRX', percentage: 2.2 },
              { coin: 'LTC', percentage: 1.4 },
            ].map((asset) => (
              <div key={asset.coin} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-white font-medium text-lg mb-1">{asset.coin}</div>
                <div className="text-teal-400 text-2xl font-medium">{asset.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-medium text-white mb-4">Top Users by Balance</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-400/10 rounded-full flex items-center justify-center text-teal-400 font-semibold text-sm">
                      {i}
                    </div>
                    <div>
                      <div className="text-white font-medium">User {i}</div>
                      <div className="text-gray-400 text-sm">user{i}@example.com</div>
                    </div>
                  </div>
                  <div className="text-white font-medium">${(250000 - i * 40000).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-medium text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {['Withdrawal approved', 'New user registered', 'Deposit confirmed', 'Interest payout processed', 'System backup completed'].map(
                (activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-white">{activity}</div>
                    </div>
                    <div className="text-gray-400 text-sm">{i + 1}m ago</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
