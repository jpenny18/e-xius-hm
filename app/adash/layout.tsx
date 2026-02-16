import AdminSidebar from './components/AdminSidebar'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0f1419] flex">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
