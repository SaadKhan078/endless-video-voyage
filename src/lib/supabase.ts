import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Provide default values to prevent blank screen
const defaultUrl = supabaseUrl || 'https://dummy.supabase.co'
const defaultKey = supabaseKey || 'dummy-key'

export const supabase = createClient(defaultUrl, defaultKey)

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey)

export type Database = {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string
          video_id: string
          platform: 'youtube' | 'tiktok'
          title: string
          description: string
          country: string
          user_id: string
          user_email: string
          user_name: string
          user_avatar_url: string | null
          created_at: string
          position: number
        }
        Insert: {
          id?: string
          video_id: string
          platform: 'youtube' | 'tiktok'
          title: string
          description: string
          country: string
          user_id: string
          user_email: string
          user_name: string
          user_avatar_url?: string | null
          created_at?: string
          position?: number
        }
        Update: {
          id?: string
          video_id?: string
          platform?: 'youtube' | 'tiktok'
          title?: string
          description?: string
          country?: string
          user_id?: string
          user_email?: string
          user_name?: string
          user_avatar_url?: string | null
          created_at?: string
          position?: number
        }
      }
    }
  }
}