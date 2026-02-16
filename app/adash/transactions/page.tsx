'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Transaction {
  id: number
  user: string
  email: string
  coin: string
  amount: string
  usdValue: string
  address: string
  date: string
  status: 'pending' | 'confirmed' | 'denied' | 'missing'
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'deposits'>('withdrawals')

  // Mock withdrawal data
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      coin: 'BTC',
      amount: '0.5',
      usdValue: '$45,500.00',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      date: '2026-02-11 14:32',
      status: 'pending',
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane@example.com',
      coin: 'ETH',
      amount: '2.5',
      usdValue: '$6,650.00',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      date: '2026-02-11 13:15',
      status: 'pending',
    },
    {
      id: 3,
      user: 'Bob Johnson',
      email: 'bob@example.com',
      coin: 'USDT',
      amount: '10000',
      usdValue: '$10,000.00',
      address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
      date: '2026-02-11 12:45',
      status: 'confirmed',
    },
  ])

  // Mock deposit data
  const [deposits, setDeposits] = useState<Transaction[]>([
    {
      id: 1,
      user: 'Alice Williams',
      email: 'alice@example.com',
      coin: 'BTC',
      amount: '0.25',
      usdValue: '$22,750.00',
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      date: '2026-02-11 15:20',
      status: 'pending',
    },
    {
      id: 2,
      user: 'Charlie Brown',
      email: 'charlie@example.com',
      coin: 'ETH',
      amount: '5.0',
      usdValue: '$13,300.00',
      address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      date: '2026-02-11 14:55',
      status: 'confirmed',
    },
    {
      id: 3,
      user: 'David Lee',
      email: 'david@example.com',
      coin: 'USDC',
      amount: '5000',
      usdValue: '$5,000.00',
      address: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
      date: '2026-02-11 14:30',
      status: 'pending',
    },
  ])

  const handleWithdrawalStatus = (id: number, status: 'pending' | 'confirmed' | 'denied') => {
    setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status } : w))
    // Placeholder: Email would be sent here
  }

  const handleDepositStatus = (id: number, status: 'pending' | 'confirmed' | 'missing') => {
    setDeposits(deposits.map(d => d.id === id ? { ...d, status } : d))
    // Placeholder: Email would be sent here
  }

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

              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* User & Coin Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={coinLogos[withdrawal.coin]}
                          alt={withdrawal.coin}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">{withdrawal.user}</div>
                        <div className="text-gray-400 text-sm">{withdrawal.email}</div>
                        <div className="text-gray-500 text-xs mt-1">{withdrawal.date}</div>
                      </div>
                    </div>

                    {/* Amount & Address */}
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">
                        {withdrawal.amount} {withdrawal.coin}
                      </div>
                      <div className="text-gray-400 text-sm mb-2">{withdrawal.usdValue}</div>
                      <div className="bg-gray-900/50 border border-gray-700 rounded px-3 py-2">
                        <div className="text-xs text-gray-400 mb-1">Withdrawal Address</div>
                        <div className="font-mono text-xs text-white truncate">{withdrawal.address}</div>
                      </div>
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
                            onClick={() => handleWithdrawalStatus(withdrawal.id, 'confirmed')}
                            className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleWithdrawalStatus(withdrawal.id, 'denied')}
                            className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all"
                          >
                            Deny
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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

              {deposits.map((deposit) => (
                <div
                  key={deposit.id}
                  className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* User & Coin Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={coinLogos[deposit.coin]}
                          alt={deposit.coin}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">{deposit.user}</div>
                        <div className="text-gray-400 text-sm">{deposit.email}</div>
                        <div className="text-gray-500 text-xs mt-1">{deposit.date}</div>
                      </div>
                    </div>

                    {/* Amount & Address */}
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">
                        {deposit.amount} {deposit.coin}
                      </div>
                      <div className="text-gray-400 text-sm mb-2">{deposit.usdValue}</div>
                      <div className="bg-gray-900/50 border border-gray-700 rounded px-3 py-2">
                        <div className="text-xs text-gray-400 mb-1">Deposit Address</div>
                        <div className="font-mono text-xs text-white truncate">{deposit.address}</div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium text-center ${
                          deposit.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            : deposit.status === 'confirmed'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </div>

                      {deposit.status === 'pending' && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleDepositStatus(deposit.id, 'confirmed')}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all"
                          >
                            Confirmed
                          </button>
                          <button
                            onClick={() => handleDepositStatus(deposit.id, 'missing')}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all"
                          >
                            Missing
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
