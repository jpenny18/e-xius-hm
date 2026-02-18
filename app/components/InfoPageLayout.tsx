import Header from './Header'
import Footer from './Footer'

interface InfoPageLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function InfoPageLayout({ title, subtitle, children }: InfoPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Page Hero */}
        <section className="bg-[#0f1419] py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">{title}</h1>
            {subtitle && (
              <p className="text-lg text-gray-300 max-w-2xl">{subtitle}</p>
            )}
          </div>
        </section>

        {/* Page Content */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">{children}</div>
        </section>

        <Footer />
      </main>
    </>
  )
}
