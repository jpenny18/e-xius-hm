export default function HeroStats() {
  return (
    <div className="hidden md:block relative w-full max-w-7xl mx-auto mt-16 px-4">
      {/* Main Container with Gradient Background */}
      <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-teal-900/20 rounded-3xl p-8 md:p-16 lg:p-20 overflow-hidden min-h-[400px] md:min-h-[500px] border border-gray-700/30 backdrop-blur-sm">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent rounded-3xl"></div>
        {/* Decorative gradient shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-40">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 0 250 Q 100 180, 200 150 T 400 50 L 400 300 L 0 300 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M 0 250 Q 100 180, 200 150 T 400 50"
              stroke="#14b8a6"
              strokeWidth="3"
              fill="none"
            />
            {/* Data points */}
            <circle cx="200" cy="150" r="6" fill="white" stroke="#14b8a6" strokeWidth="3" />
          </svg>
        </div>

        {/* Floating Crypto Cards */}
        <div className="relative z-10 mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center md:justify-start">
            {/* BTC Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-6 min-w-[320px] md:min-w-[360px]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
                ₿
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-xl md:text-2xl">BTC</div>
                <div className="text-white text-base md:text-lg">12.5</div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm text-white">Up to</div>
                <div className="text-3xl md:text-4xl font-medium text-white">9%</div>
              </div>
            </div>

            {/* USDC Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-6 min-w-[320px] md:min-w-[360px] md:ml-12">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
                $
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-xl md:text-2xl">USDC</div>
                <div className="text-white text-base md:text-lg">180,000</div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm text-white">Up to</div>
                <div className="text-3xl md:text-4xl font-medium text-white">14.5%</div>
              </div>
            </div>

          </div>
        </div>

        {/* Stats Row */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          <div>
            <div className="text-gray-400 text-sm md:text-base lg:text-lg mb-2">Operating</div>
            <div className="text-white text-xl md:text-2xl lg:text-2xl font-medium">since 2018</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm md:text-base lg:text-lg mb-2">Personalized</div>
            <div className="text-white text-xl md:text-2xl lg:text-2xl font-medium">client care 24/7</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm md:text-base lg:text-lg mb-2">Global clients served</div>
            <div className="text-white text-xl md:text-2xl lg:text-2xl font-medium">1,000+</div>
          </div>
        </div>
      </div>
    </div>
  )
}
