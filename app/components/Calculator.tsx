'use client'

import { useState, useEffect } from 'react'

interface CalculatorProps {
  rates: { [key: string]: number }
  isFixed: boolean
}

export default function Calculator({ rates, isFixed }: CalculatorProps) {
  const [selectedAsset, setSelectedAsset] = useState('USDT')
  const [amount, setAmount] = useState(500000)
  const [years, setYears] = useState(10)

  const currentRate = rates[selectedAsset] || 12

  // Calculate compound interest
  const calculateInterest = () => {
    const principal = amount
    const rate = currentRate / 100
    const time = years

    if (isFixed) {
      // For fixed term, simple yearly compounding
      const totalBalance = principal * Math.pow(1 + rate, time)
      const interest = totalBalance - principal
      return { interest, totalBalance }
    } else {
      // For flexible, daily compounding
      const dailyRate = rate / 365
      const days = time * 365
      const totalBalance = principal * Math.pow(1 + dailyRate, days)
      const interest = totalBalance - principal
      return { interest, totalBalance }
    }
  }

  const { interest, totalBalance } = calculateInterest()

  // Generate chart points for the graph
  const generateChartPoints = () => {
    const points = []
    const steps = 20
    for (let i = 0; i <= steps; i++) {
      const t = (years * i) / steps
      let value
      if (isFixed) {
        value = amount * Math.pow(1 + currentRate / 100, t)
      } else {
        const dailyRate = currentRate / 100 / 365
        const days = t * 365
        value = amount * Math.pow(1 + dailyRate, days)
      }
      points.push({ time: t, value })
    }
    return points
  }

  const chartPoints = generateChartPoints()

  return (
    <section className="mb-20 py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medium text-primary text-center mb-4">
          Estimate your earnings.
        </h2>
        <p className="text-lg text-subtext text-center mb-12">
          Compare your potential earnings with Exius&apos;s {isFixed ? 'Fixed-Term' : 'Flexible'}{' '}
          Savings to alternative yield options.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Controls */}
          <div className="space-y-6">
            {/* Asset Selection */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Asset</label>
              <div className="relative">
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-primary font-semibold appearance-none cursor-pointer"
                >
                  {Object.entries(rates).map(([coin, rate]) => (
                    <option key={coin} value={coin}>
                      {coin} - up to {rate}%
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-subtext">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Amount Slider */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Amount</label>
              <div className="text-3xl font-medium text-primary mb-4">
                ${amount.toLocaleString()}
              </div>
              <input
                type="range"
                min="5000"
                max="20000000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-subtext mt-2">
                <span>$5,000</span>
                <span>$20,000,000</span>
              </div>
            </div>

            {/* Start Earning Button */}
            <button className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              Start earning
            </button>

            {/* Info Box */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-subtext mb-2">
                Choose Exius&apos;s <span className="font-semibold text-primary">{isFixed ? 'Fixed-term' : 'Flexible'} Savings</span> and enjoy higher interest rates for the long term. Discover how much you can earn.
              </p>
              <a href="#" className="text-sm text-primary font-semibold hover:underline inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Chart and Results */}
          <div>
            {/* Results */}
            <div className="mb-6 space-y-4">
              <div>
                <div className="text-4xl font-medium text-[#00c9a7] mb-1">
                  ${interest.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-subtext">
                  in interest at {currentRate}%
                </div>
              </div>
              <div>
                <div className="text-2xl font-medium text-primary">
                  ${totalBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-subtext">
                  Total balance over {years} years
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="relative h-64">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid lines */}
                  <line x1="0" y1="0" x2="0" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Chart line */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a0f5e8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#a0f5e8" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Area under the curve */}
                  <path
                    d={`M 0 200 ${chartPoints
                      .map((point, i) => {
                        const x = (i / (chartPoints.length - 1)) * 400
                        const y = 200 - ((point.value - amount) / (totalBalance - amount)) * 150 - 30
                        return `L ${x} ${y}`
                      })
                      .join(' ')} L 400 200 Z`}
                    fill="url(#chartGradient)"
                  />

                  {/* Line */}
                  <path
                    d={chartPoints
                      .map((point, i) => {
                        const x = (i / (chartPoints.length - 1)) * 400
                        const y = 200 - ((point.value - amount) / (totalBalance - amount)) * 150 - 30
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                      })
                      .join(' ')}
                    stroke="#00c9a7"
                    strokeWidth="3"
                    fill="none"
                  />

                  {/* End point marker */}
                  <circle
                    cx={400 * (years / years)}
                    cy={200 - ((totalBalance - amount) / (totalBalance - amount)) * 150 - 30}
                    r="6"
                    fill="white"
                    stroke="#00c9a7"
                    strokeWidth="3"
                  />
                </svg>

                {/* Time label */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {years} years
                </div>
              </div>

              {/* Time axis labels */}
              <div className="flex justify-between text-xs text-subtext mt-4">
                <span>Today</span>
                <span>20 Years</span>
              </div>

              {/* Time slider */}
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primary mt-4"
              />
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00c9a7] rounded-full"></div>
                <span className="text-subtext">Exius {isFixed ? 'Fixed-term' : 'Flexible'} Savings</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-subtext mt-6">
              Any values, estimates, or figures are only indicative and are not intended to be relied upon for legal, financial, or commercial decisions. Returns are calculated based on the assumption that the principal and the interest remain in your Exius account. Comparative rates referenced are based on publicly available information last updated as of March 25, 2025, and may be subject to change without notice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
