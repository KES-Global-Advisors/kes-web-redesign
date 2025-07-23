// app/admin/(dashboard)/content/page.tsx
import { Metadata } from 'next'
import ContentEditor from '../../../../components/admin/ContentEditor'

export const metadata: Metadata = {
  title: 'Content Editor',
  description: 'Edit website content',
}

export default function ContentEditorPage() {
  return <ContentEditor />
}