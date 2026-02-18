import InfoPageLayout from '../components/InfoPageLayout'

export const metadata = {
  title: 'Careers – Exius',
  description: 'Join the Exius team and help build the future of crypto savings.',
}

const openRoles = [
  {
    title: 'Senior Backend Engineer',
    team: 'Engineering',
    location: 'Remote – Canada',
    type: 'Full-time',
    description:
      'Build and scale the core infrastructure powering Exius savings products. You will work on high-availability APIs, real-time interest engines, and blockchain integrations.',
  },
  {
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote – Canada',
    type: 'Full-time',
    description:
      'Own the end-to-end design of Exius user-facing products. From research to pixel-perfect execution, you will shape how users experience crypto savings.',
  },
  {
    title: 'Compliance & Regulatory Analyst',
    team: 'Legal & Compliance',
    location: 'Toronto, ON',
    type: 'Full-time',
    description:
      'Help navigate the evolving landscape of crypto regulation in Canada and internationally. You will support AML/KYC programs, regulatory filings, and internal policy development.',
  },
  {
    title: 'Growth Marketing Manager',
    team: 'Marketing',
    location: 'Remote – Canada',
    type: 'Full-time',
    description:
      'Drive user acquisition and retention across paid, organic, and partnership channels. Bring data-driven strategies that accelerate Exius growth.',
  },
  {
    title: 'Customer Support Specialist',
    team: 'Support',
    location: 'Remote – Canada',
    type: 'Full-time',
    description:
      'Be the first point of contact for Exius users. Resolve account, product, and technical queries with empathy and efficiency, helping build a best-in-class support experience.',
  },
]

export default function CareersPage() {
  return (
    <InfoPageLayout
      title="Careers at Exius"
      subtitle="Help us redefine what crypto savings looks like for the next generation of investors."
    >
      {/* Why Exius */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-primary mb-8 text-center">
          Why work at Exius?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Move fast, build things</h3>
            <p className="text-subtext">
              We ship quickly and give team members real ownership over their work. Your
              contributions directly shape the product and company direction.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Remote-first culture</h3>
            <p className="text-subtext">
              We are a distributed team across Canada and believe great work happens wherever
              you are most productive. Flexible hours, async communication, and full remote support.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-primary mb-3">Competitive compensation</h3>
            <p className="text-subtext">
              Market-rate salaries, equity participation, and a benefits package designed to
              support your wellbeing and long-term financial growth.
            </p>
          </div>
        </div>
      </div>

      {/* Open Roles */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-primary mb-8">Open Positions</h2>
        <div className="space-y-4">
          {openRoles.map((role) => (
            <div
              key={role.title}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-primary mb-1">{role.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full">
                      {role.team}
                    </span>
                    <span className="text-sm text-subtext bg-white border border-gray-200 px-3 py-1 rounded-full">
                      {role.location}
                    </span>
                    <span className="text-sm text-subtext bg-white border border-gray-200 px-3 py-1 rounded-full">
                      {role.type}
                    </span>
                  </div>
                  <p className="text-subtext">{role.description}</p>
                </div>
                <a
                  href={`mailto:support@exius.ca?subject=Application – ${encodeURIComponent(role.title)}`}
                  className="shrink-0 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all text-center"
                >
                  Apply now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General application */}
      <div className="bg-[#0f1419] rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-medium text-white mb-4">Don&apos;t see your role?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          We&apos;re always looking for exceptional people. Send us your resume and tell us how
          you&apos;d contribute to Exius.
        </p>
        <a
          href="mailto:support@exius.ca?subject=General Application – Exius"
          className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
        >
          Send a general application
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </InfoPageLayout>
  )
}
