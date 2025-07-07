'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type ContentRow = Database['public']['Tables']['site_content']['Row']

interface ContentData {
  [key: string]: string
}

interface ContentContextType {
  content: ContentData
  loading: boolean
  error: string | null
  getContent: (section: string, fallback?: string) => string
  refreshContent: () => Promise<void>
}

// Default fallback content
const defaultContent: ContentData = {
  hero_title: 'Unlocking Your Organization\'s Full Potential',
  hero_subtitle: 'By engaging, aligning, and empowering your workforce, KES Global Advisors can help unlock your organization\'s full potential to drive sustainable improvements for your business.',
  about_title: 'Our Company',
  about_description: 'Our team of experts, with decades of global experience in the oil, gas, and chemicals sectors, can help your teams drive performance improvement that enhances the safe, reliable and profitable operation of your facilities.',
  mission_text: 'Our mission is simple — to add value by creating sustainable improvements in business performance. This commitment extends to every interaction, from the first meeting to the final project closeout.',
  commitment_text: 'Our passion for helping companies realize their employees\' full potential drives us. As a trusted advisor, our core focus is adding value to our clients in every interaction.',
  approach_title: 'Our Approach',
  approach_description: 'Recognizing that every client is unique, we tailor each engagement to address specific needs and challenges. With decades of global experience in the oil, gas, and chemicals sectors, we facilitate employee-led improvement and capability enhancement programs, integrating practical guidance and support to drive alignment and ensure sustainable results.',
  services_title: 'Transforming Leadership into Performance',
  insights_title: 'Insights',
  insights_description: 'We know how important it is to see other perspectives, and for that reason we freely share ours here.',
  contact_title: 'Get in Touch'
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  loading: true,
  error: null,
  getContent: (section: string, fallback?: string) => fallback || defaultContent[section] || '',
  refreshContent: async () => {}
})

interface ContentProviderProps {
  children: ReactNode
}

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [content, setContent] = useState<ContentData>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadContent = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Only load content on client side
      if (typeof window !== 'undefined' && supabase) {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')

        if (error) throw error

        const contentMap: ContentData = { ...defaultContent }
        
        if (data && Array.isArray(data)) {
          data.forEach((item: ContentRow) => {
            if (item.section && item.text) {
              contentMap[item.section] = item.text
            }
          })
        }

        setContent(contentMap)
      } else {
        // Use default content for SSR
        setContent(defaultContent)
      }
    } catch (err) {
      console.error('Failed to load content:', err)
      setError((err as Error).message)
      setContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContent()
  }, [])

  const getContent = (section: string, fallback?: string): string => {
    return content[section] || fallback || defaultContent[section] || ''
  }

  const refreshContent = async () => {
    await loadContent()
  }

  const value: ContentContextType = {
    content,
    loading,
    error,
    getContent,
    refreshContent
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}