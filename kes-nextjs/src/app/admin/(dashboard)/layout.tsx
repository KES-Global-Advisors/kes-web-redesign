// app/admin/(dashboard)/layout.tsx
import { Metadata } from 'next'
import AdminPanel from '../../../components/admin/AdminPanel'

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard | KES Global Advisors',
    template: '%s | Admin | KES Global Advisors'
  },
  description: 'Admin dashboard for KES Global Advisors',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminPanel>{children}</AdminPanel>
}