// app/admin/login/page.tsx
import { Metadata } from 'next'
import AdminLogin from '../../../components/admin/AdminLogin'

export const metadata: Metadata = {
  title: 'Admin Login | KES Global Advisors',
  description: 'Admin login for KES Global Advisors',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
}

export default function AdminLoginPage() {
  return <AdminLogin />
}