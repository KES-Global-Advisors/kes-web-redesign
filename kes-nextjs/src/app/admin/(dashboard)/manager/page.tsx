// app/admin/(dashboard)/manager/page.tsx
import { Metadata } from 'next'
import ContentManager from '../../../../components/admin/ContentManager'

export const metadata: Metadata = {
  title: 'Content Manager',
  description: 'Manage documents and insights',
}

export default function ContentManagerPage() {
  return <ContentManager />
}