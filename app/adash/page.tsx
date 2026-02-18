'use client'

export default function AdminDashboardPage() {
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
            <linearGradient id="adminDashGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#adminDashGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-white mb-1">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm md:text-base">Overview of platform activity and statistics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs md:text-sm">Total Users</span>
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-white mb-1">1,247</div>
            <div className="text-xs md:text-sm text-green-400">+12.5% from last month</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs md:text-sm">Total Volume</span>
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-white mb-1">$45.2M</div>
            <div className="text-xs md:text-sm text-green-400">+8.2% from last month</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs md:text-sm">Pending Withdrawals</span>
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-white mb-1">23</div>
            <div className="text-xs md:text-sm text-yellow-400">Requires attention</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs md:text-sm">Active Savings</span>
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-2xl md:text-3xl font-medium text-white mb-1">$38.7M</div>
            <div className="text-xs md:text-sm text-green-400">+15.3% from last month</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-medium text-white mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-800/30 border border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-400/10 rounded-full flex items-center justify-center text-teal-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">john@example.com</div>
                      <div className="text-gray-400 text-xs">Deposit • BTC</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">0.5 BTC</div>
                    <div className="text-gray-400 text-xs">$45,500</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-medium text-white mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <div className="text-yellow-400 text-sm font-medium">23 pending withdrawals</div>
                  <div className="text-gray-400 text-xs">Review required for manual approval</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-blue-400 text-sm font-medium">System running normally</div>
                  <div className="text-gray-400 text-xs">All services operational</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-green-400 text-sm font-medium">New user registrations</div>
                  <div className="text-gray-400 text-xs">47 new users in the last 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
