// lib/serverDataFetchers.ts
import { supabase } from './supabase'
import type { Database } from './supabase'

type ContentRow = Database['public']['Tables']['site_content']['Row']
type InsightRow = Database['public']['Tables']['insights']['Row']

interface ContentData {
  [key: string]: string
}

// Default fallback content (same as client-side)
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

// Default fallback insights
const defaultInsights: InsightRow[] = [
  {
    id: '1',
    title: 'Translating Motivation into Performance',
    description: 'When looking at leveraging the value of an organization\'s workforce, you are effectively considering the value of changing on-the-job behaviors of the employees to drive positive changes in business performance.',
    image_url: '/assets/Motivation to Performance.jpg',
    document_url: 'https://drive.google.com/file/d/1lmDPXpryrGHLXoKMjKVANFYxqcAILOkh/view?usp=sharing',
    document_filename: 'motivation-to-performance.pdf',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'The Value of Digital Transformation',
    description: 'The key to getting the most out of the technology available today is to ensure that the technology being utilized fits into an overall plan for an organization that not just aligns and enables the various core work processes or enables completely new work processes or practices but ensures that the organizational capabilities are developed to fully support the utilization of that technology.',
    image_url: '/assets/digital transformation 5.jpg',
    document_url: 'https://drive.google.com/file/d/1RRkdevcorIbaYL-BShZXp_dIccbmTIvx/view?usp=sharing',
    document_filename: 'digital-transformation.pdf',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Intentional Leadership',
    description: 'General thinking is that leaders are always intentional and purposeful. However, many, if not most, leaders are reactionary and opportunistic, and while there is nothing wrong with those leadership styles and at times these are good tools for the kit, real and lasting change requires intentional leadership.',
    image_url: '/assets/Intentional 2.png',
    document_url: 'https://drive.google.com/file/d/11kzMmPZ1Dqh9OKiBeineoNMPAbY9dQxh/view?usp=sharing',
    document_filename: 'intentional-leadership.pdf',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Multi-Dimensional Digital Transformation',
    description: 'The current industry focus on digital transformation is driving some great innovations in industry, and in some cases, enabling complete transformation in how we work and what we can do.',
    image_url: '/assets/What If - Technology3.jpg',
    document_url: 'https://drive.google.com/file/d/1rQIpEHRuO_hkXOwHlQH1NbjdIDRcT_nJ/view?usp=sharing',
    document_filename: 'multi-dimensional-digital-transformation.pdf',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Does Technology Have Value?',
    description: 'Technology has no value. This simple truth, although unpopular with some and seemingly at odds with conventional thinking, should be the basis behind every digitalization strategy.',
    image_url: 'https://i.postimg.cc/MKPJfxTW/Digital-No-Value-2.avif',
    document_url: 'https://drive.google.com/file/d/1bh7LeTN73oBiFt8uNs7PZbyJnheY8DpT/view?usp=sharing',
    document_filename: 'technology-no-value.pdf',
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Digital Operational Excellence',
    description: 'For operating companies in the energy and chemicals sectors, there should be a clear integration between their digitalization strategies and their operational excellence programs/practices.',
    image_url: 'https://i.postimg.cc/sD2tr8Jb/Digital-Operational-Excellence.avif',
    document_url: 'https://drive.google.com/file/d/1GuKYniRyEX7gwBse-dTj63HMsU4ZFtah/view?usp=sharing',
    document_filename: 'operational-excellence.pdf',
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

/**
 * Server-side function to fetch site content
 * Used for SSG/SSR - runs at build time or request time
 */
export async function fetchSiteContentServer(): Promise<ContentData> {
  try {
    console.log('🔄 Fetching site content on server...')
    
    const { data, error } = await supabase
      .from('site_content')
      .select('*')

    if (error) {
      console.error('❌ Supabase error fetching content:', error)
      return defaultContent
    }

    const contentMap: ContentData = { ...defaultContent }
    
    if (data && Array.isArray(data)) {
      data.forEach((item: ContentRow) => {
        if (item.section && item.text) {
          contentMap[item.section] = item.text
        }
      })
      console.log(`✅ Fetched ${data.length} content items from server`)
    } else {
      console.log('📋 Using default content (no data from Supabase)')
    }

    return contentMap
  } catch (error) {
    console.error('❌ Failed to fetch site content on server:', error)
    return defaultContent
  }
}

/**
 * Server-side function to fetch active insights
 * Used for SSG/ISR - runs at build time or during revalidation
 */
export async function fetchActiveInsightsServer(): Promise<InsightRow[]> {
  try {
    console.log('🔄 Fetching insights on server...')
    
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('❌ Supabase error fetching insights:', error)
      return defaultInsights
    }

    if (data && data.length > 0) {
      console.log(`✅ Fetched ${data.length} insights from server`)
      return data
    } else {
      console.log('📋 Using default insights (no data from Supabase)')
      return defaultInsights
    }
  } catch (error) {
    console.error('❌ Failed to fetch insights on server:', error)
    return defaultInsights
  }
}

/**
 * Server-side function to fetch all insights (for admin pages)
 */
export async function fetchAllInsightsServer(): Promise<InsightRow[]> {
  try {
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('❌ Failed to fetch all insights on server:', error)
    return []
  }
}

/**
 * Helper function to create React Query dehydrated state
 * This allows us to pre-populate React Query cache with server data
 */
export function createDehydratedState(content: ContentData, insights: InsightRow[]) {
  return {
    queries: [
      {
        queryKey: ['site-content'],
        data: content,
      },
      {
        queryKey: ['insights', 'active'],
        data: insights,
      },
    ],
  }
}