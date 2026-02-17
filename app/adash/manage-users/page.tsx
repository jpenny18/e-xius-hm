'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { getAllUsersWithBalances, getUserById, getUserTransactions, updateUserBalance } from '@/lib/transactions'

export default function ManageUsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [userTransactions, setUserTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingUser, setLoadingUser] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingBalance, setEditingBalance] = useState<{ coin: string; savingsType: string } | null>(null)
  const [newBalanceAmount, setNewBalanceAmount] = useState('')
  const [newBalanceUsd, setNewBalanceUsd] = useState('')

  const coinLogos: { [key: string]: string } = {
    BTC: '/BTC.svg',
    ETH: '/ETH.svg',
    XRP: '/XRP.svg',
    BNB: '/BNB.svg',
    USDT: '/USDT.svg',
    TRX: '/TRX.svg',
    USDC: '/USDC.svg',
    SOL: '/SOL.svg',
    LTC: '/ltc.png',
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const result = await getAllUsersWithBalances()
    if (result.success) {
      setUsers(result.users)
    }
    setLoading(false)
  }

  const handleSelectUser = async (userId: string) => {
    setLoadingUser(true)
    const result = await getUserById(userId)
    if (result.success) {
      setSelectedUser(result.user)
      setUserTransactions(result.transactions || [])
    }
    setLoadingUser(false)
  }

  const handleUpdateBalance = async () => {
    if (!editingBalance || !selectedUser || !user?.email) return

    const amount = parseFloat(newBalanceAmount)
    const usd = parseFloat(newBalanceUsd)

    if (isNaN(amount) || isNaN(usd)) {
      alert('Please enter valid numbers')
      return
    }

    const result = await updateUserBalance(
      selectedUser.id,
      editingBalance.coin,
      editingBalance.savingsType as 'flexible' | 'fixed-term',
      amount,
      usd,
      user.email
    )

    if (result.success) {
      alert('Balance updated successfully!')
      setEditingBalance(null)
      setNewBalanceAmount('')
      setNewBalanceUsd('')
      // Reload user data
      await handleSelectUser(selectedUser.id)
      // Reload users list
      await loadUsers()
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen p-8">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute w-full h-full" width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="manageUsersGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z" fill="url(#manageUsersGradient)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white mb-2">Manage Users</h1>
          <p className="text-gray-400">View and manage user balances and transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h2 className="text-xl font-medium text-white mb-4">Users</h2>
              
              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              />

              {/* User List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <p className="text-gray-400 text-center py-4">Loading...</p>
                ) : filteredUsers.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No users found</p>
                ) : (
                  filteredUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleSelectUser(u.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedUser?.id === u.id
                          ? 'bg-red-500/20 border-2 border-red-500'
                          : 'bg-gray-800/30 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
                          {u.firstName?.[0] || u.email[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">
                            {u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : 'User'}
                          </div>
                          <div className="text-gray-400 text-sm truncate">{u.email}</div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="lg:col-span-2">
            {!selectedUser ? (
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-400">Select a user to view details</p>
              </div>
            ) : loadingUser ? (
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                <p className="text-gray-400">Loading user details...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h2 className="text-xl font-medium text-white mb-4">User Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Name</div>
                      <div className="text-white">{selectedUser.firstName} {selectedUser.lastName}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Email</div>
                      <div className="text-white">{selectedUser.email}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Account Type</div>
                      <div className="text-white capitalize">{selectedUser.accountType}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Joined</div>
                      <div className="text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Balances */}
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-white">Balances</h2>
                  </div>
                  
                  {selectedUser.balances && Object.keys(selectedUser.balances).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(selectedUser.balances).map(([key, balance]: [string, any]) => {
                        const [coin, savingsType] = key.split('_')
                        const isEditing = editingBalance?.coin === coin && editingBalance?.savingsType === savingsType
                        
                        return (
                          <div key={key} className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Image src={coinLogos[coin] || '/BTC.svg'} alt={coin} width={32} height={32} />
                                <div>
                                  <div className="text-white font-medium">{coin}</div>
                                  <div className="text-gray-400 text-sm capitalize">{savingsType} Savings</div>
                                </div>
                              </div>
                              <div className="text-right">
                                {isEditing ? (
                                  <div className="space-y-2">
                                    <input
                                      type="number"
                                      value={newBalanceAmount}
                                      onChange={(e) => setNewBalanceAmount(e.target.value)}
                                      placeholder="Amount"
                                      className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    />
                                    <input
                                      type="number"
                                      value={newBalanceUsd}
                                      onChange={(e) => setNewBalanceUsd(e.target.value)}
                                      placeholder="USD Value"
                                      className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={handleUpdateBalance}
                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => {
                                          setEditingBalance(null)
                                          setNewBalanceAmount('')
                                          setNewBalanceUsd('')
                                        }}
                                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-white font-medium">${balance.usdValue.toFixed(2)}</div>
                                    <div className="text-gray-400 text-sm">{balance.amount} {coin}</div>
                                    <button
                                      onClick={() => {
                                        setEditingBalance({ coin, savingsType })
                                        setNewBalanceAmount(balance.amount.toString())
                                        setNewBalanceUsd(balance.usdValue.toString())
                                      }}
                                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                    >
                                      Adjust Balance
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No balances yet</p>
                  )}
                </div>

                {/* Transactions */}
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h2 className="text-xl font-medium text-white mb-4">Recent Transactions</h2>
                  
                  {userTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {userTransactions.map((tx) => (
                        <div key={tx.id} className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-medium capitalize">{tx.type}</div>
                              <div className="text-gray-400 text-sm">{new Date(tx.createdAt).toLocaleString()}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-medium">${tx.usdValue.toFixed(2)}</div>
                              <div className="text-gray-400 text-sm">{tx.coin}</div>
                              <div className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${
                                tx.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {tx.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No transactions yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
