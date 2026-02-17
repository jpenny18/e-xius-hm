'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { getAllTransactions, confirmTransaction, rejectTransaction, Transaction } from '@/lib/transactions'
import { sendDepositConfirmedEmail, sendDepositRejectedEmail } from '@/lib/email'

export default function TransactionsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'deposits'>('deposits')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Load transactions from Firebase
  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    setLoading(true)
    const result = await getAllTransactions()
    if (result.success) {
      setTransactions(result.transactions)
    }
    setLoading(false)
  }

  // Get APY rate based on coin and savings type
  const getAPY = (coin: string, savingsType: 'flexible' | 'fixed-term') => {
    const flexibleRates: { [key: string]: number } = {
      BTC: 9, ETH: 12.3, XRP: 9.3, BNB: 8, USDT: 16, TRX: 8, USDC: 14.5, SOL: 10, LTC: 7,
    }
    const fixedRates: { [key: string]: number } = {
      BTC: 9.8, ETH: 14.6, XRP: 10.3, BNB: 9.6, USDT: 26, TRX: 12, USDC: 22.5, SOL: 16, LTC: 13,
    }
    const rates = savingsType === 'flexible' ? flexibleRates : fixedRates
    return rates[coin.toUpperCase()] || 0
  }

  const handleApprove = async (transaction: Transaction) => {
    if (!user?.email) return
    
    setProcessingId(transaction.id || '')
    
    try {
      const result = await confirmTransaction(transaction.id!, user.email)
      
      if (result.success) {
        // Send confirmation email to user
        await sendDepositConfirmedEmail(
          transaction.userEmail,
          transaction.userEmail.split('@')[0], // Simple name extraction
          transaction.coin,
          transaction.usdValue,
          getAPY(transaction.coin, transaction.savingsType),
          transaction.savingsType
        )
        
        // Reload transactions
        await loadTransactions()
        alert('Deposit confirmed successfully! Confirmation email sent to user.')
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (transaction: Transaction) => {
    if (!user?.email) return
    
    const reason = prompt('Enter reason for rejection (will be sent to user):')
    if (!reason) return
    
    setProcessingId(transaction.id || '')
    
    try {
      const result = await rejectTransaction(transaction.id!, user.email)
      
      if (result.success) {
        // Send rejection email to user
        await sendDepositRejectedEmail(
          transaction.userEmail,
          transaction.userEmail.split('@')[0],
          transaction.coin,
          transaction.usdValue,
          reason
        )
        
        // Reload transactions
        await loadTransactions()
        alert('Deposit rejected. Notification email sent to user.')
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      setProcessingId(null)
    }
  }

  const deposits = transactions.filter(t => t.type === 'deposit')
  const withdrawals = transactions.filter(t => t.type === 'withdrawal')

  const coinLogos: { [key: string]: string } = {
    BTC: '/BTC.svg',
    ETH: '/ETH.svg',
    USDT: '/USDT.svg',
    USDC: '/USDC.svg',
  }

  return (
    <div className="min-h-screen p-8">
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
            <linearGradient id="transactionsGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#transactionsGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white mb-2">Transaction Management</h1>
          <p className="text-gray-400">Review and manage user deposits and withdrawals</p>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
          <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'withdrawals' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setActiveTab('deposits')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'deposits' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Deposits
            </button>
          </div>

          {/* Withdrawals Tab */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-white">Withdrawal Requests</h2>
                <span className="text-sm text-gray-400">
                  {withdrawals.filter(w => w.status === 'pending').length} pending
                </span>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                  <p className="text-gray-400">Loading transactions...</p>
                </div>
              ) : withdrawals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No withdrawal requests</p>
                </div>
              ) : (
                withdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* User & Coin Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={coinLogos[withdrawal.coin] || '/BTC.svg'}
                            alt={withdrawal.coin}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="text-white font-medium">{withdrawal.userEmail.split('@')[0]}</div>
                          <div className="text-gray-400 text-sm">{withdrawal.userEmail}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            {new Date(withdrawal.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Amount & Address */}
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          ${withdrawal.usdValue.toFixed(2)}
                        </div>
                        <div className="text-gray-400 text-sm mb-2">{withdrawal.coin}</div>
                        {withdrawal.withdrawalAddress && (
                          <div className="bg-gray-900/50 border border-gray-700 rounded px-3 py-2">
                            <div className="text-xs text-gray-400 mb-1">Withdrawal Address</div>
                            <div className="font-mono text-xs text-white truncate">{withdrawal.withdrawalAddress}</div>
                          </div>
                        )}
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
                            withdrawal.status === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : withdrawal.status === 'confirmed'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                        </div>

                        {withdrawal.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              disabled={processingId === withdrawal.id}
                              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              disabled={processingId === withdrawal.id}
                              className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Deposits Tab */}
          {activeTab === 'deposits' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-white">Deposit Transactions</h2>
                <span className="text-sm text-gray-400">
                  {deposits.filter(d => d.status === 'pending').length} pending
                </span>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                  <p className="text-gray-400">Loading transactions...</p>
                </div>
              ) : deposits.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No deposit transactions</p>
                </div>
              ) : (
                deposits.map((deposit) => (
                  <div
                    key={deposit.id}
                    className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* User & Coin Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={coinLogos[deposit.coin] || '/BTC.svg'}
                            alt={deposit.coin}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="text-white font-medium">{deposit.userEmail.split('@')[0]}</div>
                          <div className="text-gray-400 text-sm">{deposit.userEmail}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            {new Date(deposit.createdAt).toLocaleString()}
                          </div>
                          {deposit.trackingPhrase && (
                            <div className="text-teal-400 text-xs mt-1 font-mono">
                              🔑 {deposit.trackingPhrase}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Amount & Details */}
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          ${deposit.usdValue.toFixed(2)} USD
                        </div>
                        <div className="text-gray-400 text-sm mb-2">
                          {deposit.coin} • {deposit.savingsType === 'flexible' ? 'Flexible' : 'Fixed-Term'}
                          {deposit.network && ` • ${deposit.network}`}
                        </div>
                        {deposit.depositAddress && (
                          <div className="bg-gray-900/50 border border-gray-700 rounded px-3 py-2">
                            <div className="text-xs text-gray-400 mb-1">Deposit Address</div>
                            <div className="font-mono text-xs text-white truncate">{deposit.depositAddress}</div>
                          </div>
                        )}
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
                            deposit.status === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : deposit.status === 'confirmed'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : deposit.status === 'rejected'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                        </div>

                        {deposit.status === 'pending' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleApprove(deposit)}
                              disabled={processingId === deposit.id}
                              className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processingId === deposit.id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleReject(deposit)}
                              disabled={processingId === deposit.id}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processingId === deposit.id ? 'Processing...' : 'Reject'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
