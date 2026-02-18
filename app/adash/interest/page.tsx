'use client'

import { useState } from 'react'
import { applyDailyInterestToAllUsers, getTotalPlatformInterest } from '@/lib/interest'

export default function InterestManagementPage() {
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [totalInterest, setTotalInterest] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleApplyInterest = async () => {
    if (!confirm('Are you sure you want to apply daily interest to all users? This should only be done once per day.')) {
      return
    }

    setProcessing(true)
    setResults(null)

    try {
      const result = await applyDailyInterestToAllUsers()
      setResults(result)
      
      if (result.success && result.results) {
        alert(`Interest applied successfully!\n\nUsers processed: ${result.results.usersProcessed}\nTotal interest added: $${result.results.totalInterestAdded.toFixed(2)}`)
        loadTotalInterest()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  const loadTotalInterest = async () => {
    setLoading(true)
    const result = await getTotalPlatformInterest()
    if (result.success) {
      setTotalInterest(result.total)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute w-full h-full" width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="interestGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z" fill="url(#interestGradient)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-white mb-1">Interest Management</h1>
          <p className="text-gray-400 text-sm md:text-base">Apply daily interest to user balances</p>
        </div>

        {/* Warning Card */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-yellow-400 font-medium mb-1">Important Notice</h3>
              <p className="text-yellow-300 text-sm">
                The "Apply Daily Interest" button should only be clicked once per day. In production, this will be automated via a cron job. 
                For the MVP, you can manually trigger it daily.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-medium text-white">Platform Statistics</h2>
            <button
              onClick={loadTotalInterest}
              disabled={loading}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-1">Total Interest Paid</div>
              <div className="text-2xl font-medium text-teal-400">
                {totalInterest !== null ? `$${totalInterest.toFixed(2)}` : '—'}
              </div>
            </div>
            
            {results && results.success && (
              <>
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Last Run - Users Processed</div>
                  <div className="text-2xl font-medium text-white">
                    {results.results.usersProcessed}
                  </div>
                </div>
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Last Run - Interest Added</div>
                  <div className="text-2xl font-medium text-green-400">
                    ${results.results.totalInterestAdded.toFixed(2)}
                  </div>
                </div>
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-1">Last Run - Total Users</div>
                  <div className="text-2xl font-medium text-white">
                    {results.results.totalUsers}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-medium text-white mb-4">Daily Interest Application</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2">How it works:</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Calculates daily compound interest for all user balances</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Applies interest based on flexible or fixed-term APY rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Updates user balances and tracks total earned</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Logs all interest payments for audit trail</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleApplyInterest}
              disabled={processing}
              className="w-full bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Apply Daily Interest
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && results.results && results.results.errors.length > 0 && (
          <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-red-400 font-medium mb-2">Errors:</h3>
            <ul className="space-y-1">
              {results.results.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-300 text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-blue-400 font-medium mb-2">For Production:</h3>
          <p className="text-blue-300 text-sm">
            Set up a cron job or scheduled function to run <code className="bg-blue-500/20 px-2 py-1 rounded">applyDailyInterestToAllUsers()</code> once every 24 hours at a specific time (e.g., midnight UTC).
          </p>
        </div>
      </div>
    </div>
  )
}
