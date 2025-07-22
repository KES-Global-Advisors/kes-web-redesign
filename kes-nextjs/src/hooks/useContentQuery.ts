// hooks/useContentQuery.ts
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { queryKeys } from '../components/providers/ReactQueryProvider'
import type { Database } from '../lib/supabase'

type ContentRow = Database['public']['Tables']['site_content']['Row']

interface ContentData {
  [key: string]: string
}

// Default fallback content (same as original)
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

// Fetch function for content
const fetchSiteContent = async (): Promise<ContentData> => {
  try {
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

    return contentMap
  } catch (error) {
    console.error('Failed to fetch site content:', error)
    return defaultContent
  }
}

// Main hook for fetching content
export const useContentQuery = () => {
  return useQuery({
    queryKey: queryKeys.siteContent,
    queryFn: fetchSiteContent,
    staleTime: 10 * 60 * 1000, // 10 minutes - content changes infrequently
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    // Always return default content as fallback
    placeholderData: defaultContent,
  })
}

// Hook for getting individual content items
export const useContent = () => {
  const { data: content, isLoading, error } = useContentQuery()
  
  const getContent = (section: string, fallback?: string): string => {
    return content?.[section] || fallback || defaultContent[section] || ''
  }

  return {
    content: content || defaultContent,
    loading: isLoading,
    error: error?.message || null,
    getContent,
    refreshContent: () => {
      // This will be handled by React Query's refetch
      console.log('Content refresh triggered by React Query')
    }
  }
}

// Mutation hook for updating content (admin use)
export const useUpdateContentMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ section, text }: { section: string; text: string }) => {
      const { data, error } = await supabase
        .from('site_content')
        .upsert({ section, text, updated_at: new Date().toISOString() })
        .select()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      // Invalidate and refetch content
      queryClient.invalidateQueries({ queryKey: queryKeys.siteContent })
    },
    onError: (error) => {
      console.error('Failed to update content:', error)
    }
  })
}