import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web',
      'Cache-Control': 'public, max-age=86400', // 24 hour cache
    },
  },
})

// Types for our database
export interface Database {
  public: {
    Tables: {
      site_content: {
        Row: {
          id: string
          section: string
          text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          text: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          text?: string
          created_at?: string
          updated_at?: string
        }
      }
      insights: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          document_filename: string
          document_url: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          document_filename: string
          document_url: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          document_filename?: string
          document_url?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}