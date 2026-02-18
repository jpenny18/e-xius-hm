import Sidebar from './components/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0f1419] flex">
        <Sidebar />
        <main className="flex-1 min-w-0 pt-16 md:pt-0">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
