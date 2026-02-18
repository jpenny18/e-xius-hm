import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Security Status – Exius',
  description: 'Current security status and incident history for the Exius platform.',
}

const systems = [
  { name: 'Platform & Dashboard', status: 'operational' },
  { name: 'Deposits & Withdrawals', status: 'operational' },
  { name: 'Interest Calculation Engine', status: 'operational' },
  { name: 'Identity Verification (KYC)', status: 'operational' },
  { name: 'API Services', status: 'operational' },
  { name: 'Notifications & Alerts', status: 'operational' },
  { name: 'Authentication & 2FA', status: 'operational' },
]

const statusConfig = {
  operational: {
    label: 'Operational',
    dot: 'bg-green-400',
    text: 'text-green-600',
    bg: 'bg-green-50',
  },
  degraded: {
    label: 'Degraded Performance',
    dot: 'bg-yellow-400',
    text: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  outage: {
    label: 'Partial Outage',
    dot: 'bg-red-400',
    text: 'text-red-600',
    bg: 'bg-red-50',
  },
}

const incidentHistory = [
  {
    date: 'January 14, 2026',
    title: 'Scheduled Maintenance – API Infrastructure Upgrade',
    duration: '45 minutes',
    resolution: 'All services restored. API response times improved by ~30% following infrastructure upgrade.',
    type: 'maintenance',
  },
  {
    date: 'November 28, 2025',
    title: 'Elevated Deposit Confirmation Times',
    duration: '2 hours 10 minutes',
    resolution: 'Root cause identified as a third-party blockchain node provider experiencing high load. Switched to backup node provider. All pending deposits confirmed.',
    type: 'incident',
  },
  {
    date: 'October 3, 2025',
    title: 'Scheduled Maintenance – Database Migration',
    duration: '30 minutes',
    resolution: 'Database migration completed successfully with zero data loss. Platform fully restored ahead of schedule.',
    type: 'maintenance',
  },
]

export default function SecurityStatusPage() {
  const allOperational = systems.every((s) => s.status === 'operational')

  return (
    <InfoPageLayout
      title="Security Status"
      subtitle="Real-time status of Exius platform systems and services."
    >
      {/* Overall Status Banner */}
      <div
        className={`rounded-xl p-6 mb-12 flex items-center gap-4 ${
          allOperational ? 'bg-green-50 border border-green-100' : 'bg-yellow-50 border border-yellow-100'
        }`}
      >
        <div className={`w-4 h-4 rounded-full ${allOperational ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse shrink-0`} />
        <div>
          <p className={`font-semibold text-lg ${allOperational ? 'text-green-700' : 'text-yellow-700'}`}>
            {allOperational ? 'All systems operational' : 'Some systems experiencing issues'}
          </p>
          <p className={`text-sm ${allOperational ? 'text-green-600' : 'text-yellow-600'}`}>
            Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* System Status Table */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-6">System Components</h2>
        <div className="space-y-3">
          {systems.map((system) => {
            const config = statusConfig[system.status as keyof typeof statusConfig]
            return (
              <div
                key={system.name}
                className="bg-gray-50 px-6 py-5 rounded-xl flex items-center justify-between"
              >
                <span className="font-medium text-primary">{system.name}</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Security Practices */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-8">How We Protect Your Assets</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Cold Storage</h3>
            <p className="text-subtext">
              The majority of user assets are held in cold storage — offline wallets that are
              physically air-gapped and inaccessible from the internet.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Multi-Signature Wallets</h3>
            <p className="text-subtext">
              All transactions require multi-signature authorisation, meaning no single key or
              person can move funds unilaterally. This protects against insider threats and
              single points of failure.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">24/7 Monitoring</h3>
            <p className="text-subtext">
              Our security operations team monitors platform activity around the clock. Automated
              alerts and manual review processes detect and respond to anomalous activity in
              real time.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Regular Security Audits</h3>
            <p className="text-subtext">
              Exius undergoes regular third-party penetration testing and security audits. Findings
              are addressed on a priority basis and audit reports are reviewed by our executive
              team.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Two-Factor Authentication</h3>
            <p className="text-subtext">
              All Exius accounts support two-factor authentication (2FA). We strongly recommend
              enabling 2FA to protect against unauthorised access even if your password is
              compromised.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Scheduled Maintenance</h3>
            <p className="text-subtext">
              All planned maintenance windows are communicated in advance. We schedule
              maintenance during low-traffic periods and work to minimise service disruption.
            </p>
          </div>
        </div>
      </div>

      {/* Incident History */}
      <div className="mb-16">
        <h2 className="text-3xl font-medium text-primary mb-6">Incident History</h2>
        <div className="space-y-4">
          {incidentHistory.map((item) => (
            <div key={item.title} className="bg-gray-50 p-8 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      item.type === 'maintenance'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {item.type === 'maintenance' ? 'Maintenance' : 'Incident'}
                  </span>
                  <span className="text-sm text-subtext">{item.date}</span>
                </div>
              </div>
              <p className="text-sm text-subtext mb-1">
                <strong className="text-primary">Duration:</strong> {item.duration}
              </p>
              <p className="text-sm text-subtext">
                <strong className="text-primary">Resolution:</strong> {item.resolution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Report vulnerability */}
      <div className="bg-[#0f1419] rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-medium text-white mb-4">Found a security issue?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          We take security reports seriously. If you&apos;ve discovered a potential vulnerability,
          please disclose it responsibly by contacting our security team directly.
        </p>
        <a
          href="mailto:support@exius.ca?subject=Security Vulnerability Report"
          className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
        >
          Report a vulnerability
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </InfoPageLayout>
  )
}
