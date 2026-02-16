'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    accountType: 'Personal',
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    transactionNotifications: true,
    weeklyReports: false,
    marketingEmails: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecurityData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications],
    }))
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
            <linearGradient id="settingsGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#settingsGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 space-y-2">
              <button
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeSection === 'profile'
                    ? 'bg-teal-400/10 text-teal-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">Profile</span>
              </button>

              <button
                onClick={() => setActiveSection('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeSection === 'security'
                    ? 'bg-teal-400/10 text-teal-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="font-medium">Security</span>
              </button>

              <button
                onClick={() => setActiveSection('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeSection === 'notifications'
                    ? 'bg-teal-400/10 text-teal-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="font-medium">Notifications</span>
              </button>

              <button
                onClick={() => setActiveSection('preferences')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeSection === 'preferences'
                    ? 'bg-teal-400/10 text-teal-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                <span className="font-medium">Preferences</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Profile Information</h2>

                <form className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-teal-400 flex items-center justify-center text-primary font-bold text-2xl">
                      JD
                    </div>
                    <div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
                      >
                        Change Photo
                      </button>
                      <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Country & Account Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      >
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
                      <input
                        type="text"
                        name="accountType"
                        value={formData.accountType}
                        disabled
                        className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-400 text-primary rounded-lg font-semibold hover:bg-teal-300 transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-medium text-white mb-6">Change Password</h2>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={securityData.currentPassword}
                        onChange={handleSecurityChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={securityData.newPassword}
                        onChange={handleSecurityChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={securityData.confirmPassword}
                        onChange={handleSecurityChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-400 text-primary rounded-lg font-semibold hover:bg-teal-300 transition-all"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-medium text-white mb-6">Two-Factor Authentication</h2>
                  <p className="text-gray-400 mb-6">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className="px-6 py-3 bg-teal-400 text-primary rounded-lg font-semibold hover:bg-teal-300 transition-all">
                    Enable 2FA
                  </button>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-medium text-white mb-4">Active Sessions</h2>
                  <p className="text-gray-400 mb-6">Manage your active sessions across different devices.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-teal-400/10 rounded-lg flex items-center justify-center text-teal-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white font-medium">MacBook Pro - Current</div>
                          <div className="text-gray-400 text-sm">San Francisco, CA • Last active now</div>
                        </div>
                      </div>
                      <span className="text-teal-400 text-sm font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-700">
                    <div>
                      <div className="text-white font-medium mb-1">Email Alerts</div>
                      <div className="text-gray-400 text-sm">
                        Receive email notifications for important account activities
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('emailAlerts')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.emailAlerts ? 'bg-teal-400' : 'bg-gray-700'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.emailAlerts ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-gray-700">
                    <div>
                      <div className="text-white font-medium mb-1">Transaction Notifications</div>
                      <div className="text-gray-400 text-sm">
                        Get notified about deposits, withdrawals, and interest payments
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('transactionNotifications')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.transactionNotifications ? 'bg-teal-400' : 'bg-gray-700'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.transactionNotifications ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-gray-700">
                    <div>
                      <div className="text-white font-medium mb-1">Weekly Reports</div>
                      <div className="text-gray-400 text-sm">Receive weekly summaries of your earnings and activity</div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('weeklyReports')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.weeklyReports ? 'bg-teal-400' : 'bg-gray-700'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.weeklyReports ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <div className="text-white font-medium mb-1">Marketing Emails</div>
                      <div className="text-gray-400 text-sm">Receive updates about new features and promotions</div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('marketingEmails')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.marketingEmails ? 'bg-teal-400' : 'bg-gray-700'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.marketingEmails ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="px-6 py-3 bg-teal-400 text-primary rounded-lg font-semibold hover:bg-teal-300 transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-medium text-white mb-6">Display Preferences</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Currency Display</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all">
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+1 (Central European Time)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="px-6 py-3 bg-teal-400 text-primary rounded-lg font-semibold hover:bg-teal-300 transition-all">
                      Save Preferences
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                  <h2 className="text-2xl font-medium text-white mb-4">Danger Zone</h2>
                  <p className="text-gray-400 mb-6">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="px-6 py-3 bg-red-500/10 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500/20 transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
