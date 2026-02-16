'use client'

import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  accountType: 'Personal' | 'Corporate'
  totalBalance: string
  savingsType: 'Flexible' | 'Fixed' | 'Both'
  joinedDate: string
  status: 'active' | 'suspended'
  verification: 'verified' | 'pending' | 'unverified'
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all')

  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      accountType: 'Personal',
      totalBalance: '$91,234.56',
      savingsType: 'Both',
      joinedDate: '2025-08-15',
      status: 'active',
      verification: 'verified',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      accountType: 'Corporate',
      totalBalance: '$245,678.90',
      savingsType: 'Fixed',
      joinedDate: '2025-09-22',
      status: 'active',
      verification: 'verified',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      accountType: 'Personal',
      totalBalance: '$45,123.45',
      savingsType: 'Flexible',
      joinedDate: '2025-11-03',
      status: 'active',
      verification: 'pending',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      accountType: 'Personal',
      totalBalance: '$78,456.12',
      savingsType: 'Both',
      joinedDate: '2026-01-10',
      status: 'active',
      verification: 'verified',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      accountType: 'Corporate',
      totalBalance: '$156,789.34',
      savingsType: 'Fixed',
      joinedDate: '2026-02-05',
      status: 'suspended',
      verification: 'verified',
    },
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
            <linearGradient id="usersGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#usersGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white mb-2">User Management</h1>
          <p className="text-gray-400">View and manage platform users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-1">Total Users</div>
            <div className="text-white text-3xl font-medium">{users.length}</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-1">Active Users</div>
            <div className="text-white text-3xl font-medium">{users.filter(u => u.status === 'active').length}</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-1">Verified Users</div>
            <div className="text-white text-3xl font-medium">{users.filter(u => u.verification === 'verified').length}</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-1">Total Balance</div>
            <div className="text-white text-3xl font-medium">$617K</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  filterStatus === 'all'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  filterStatus === 'active'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('suspended')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  filterStatus === 'suspended'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                Suspended
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">User</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Account Type</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Total Balance</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Savings</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Joined</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {user.accountType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{user.totalBalance}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{user.savingsType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{user.joinedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.verification === 'verified'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : user.verification === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                          }`}
                        >
                          {user.verification.charAt(0).toUpperCase() + user.verification.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
