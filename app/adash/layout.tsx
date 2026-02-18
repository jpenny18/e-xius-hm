import AdminSidebar from './components/AdminSidebar'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-[#0f1419] flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 pt-16 md:pt-0">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
