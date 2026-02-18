'use client'

export default function AdminSettingsPage() {
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
            <linearGradient id="adminSettingsGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#adminSettingsGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-white mb-1">Admin Settings</h1>
          <p className="text-gray-400 text-sm md:text-base">Configure platform settings and parameters</p>
        </div>

        {/* Platform Settings */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 md:p-8 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-white mb-5 md:mb-6">Platform Configuration</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name</label>
              <input
                type="text"
                defaultValue="Exius"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
              <input
                type="email"
                defaultValue="support@exius.com"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Deposit</label>
                <input
                  type="number"
                  defaultValue="1000"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Withdrawal</label>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interest Rate Settings */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 md:p-8 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-white mb-5 md:mb-6">Interest Rate Settings</h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div>
                <div className="text-white font-medium">Flexible Savings Base Rate</div>
                <div className="text-gray-400 text-sm">Applied to all flexible savings accounts</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue="10.5"
                  step="0.1"
                  className="w-24 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div>
                <div className="text-white font-medium">Fixed-Term Savings Bonus</div>
                <div className="text-gray-400 text-sm">Additional rate for fixed-term accounts</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue="4.2"
                  step="0.1"
                  className="w-24 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 md:p-8 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-white mb-5 md:mb-6">Security Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="min-w-0">
                <div className="text-white font-medium">Require Email Verification</div>
                <div className="text-gray-400 text-sm">Users must verify email before accessing platform</div>
              </div>
              <button className="relative flex-shrink-0 w-12 h-6 rounded-full bg-red-500">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="min-w-0">
                <div className="text-white font-medium">Manual Withdrawal Approval</div>
                <div className="text-gray-400 text-sm">All withdrawals require admin approval</div>
              </div>
              <button className="relative flex-shrink-0 w-12 h-6 rounded-full bg-red-500">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="min-w-0">
                <div className="text-white font-medium">Two-Factor Authentication Required</div>
                <div className="text-gray-400 text-sm">Enforce 2FA for all user accounts</div>
              </div>
              <button className="relative flex-shrink-0 w-12 h-6 rounded-full bg-gray-700">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 md:p-8 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-white mb-5 md:mb-6">Email Templates</h2>

          <div className="space-y-3">
            {['Withdrawal Approved', 'Withdrawal Denied', 'Deposit Confirmed', 'Deposit Missing', 'Welcome Email'].map(
              (template) => (
                <div
                  key={template}
                  className="flex items-center justify-between gap-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg"
                >
                  <div className="text-white text-sm md:text-base">{template}</div>
                  <button className="flex-shrink-0 px-3 md:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm">
                    Edit
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex flex-wrap gap-3 md:gap-4">
          <button className="flex-1 sm:flex-none px-6 md:px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all">
            Save All Changes
          </button>
          <button className="flex-1 sm:flex-none px-6 md:px-8 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
