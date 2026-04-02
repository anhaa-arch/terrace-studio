export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          user_id: string
          status: 'draft' | 'in_progress' | 'completed'
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          user_id: string
          status?: 'draft' | 'in_progress' | 'completed'
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          user_id?: string
          status?: 'draft' | 'in_progress' | 'completed'
        }
      }
      designs: {
        Row: {
          id: string
          created_at: string
          project_id: string
          prompt: string
          image_url: string | null
          status: 'pending' | 'processing' | 'succeeded' | 'failed'
        }
        Insert: {
          id?: string
          created_at?: string
          project_id: string
          prompt: string
          image_url?: string | null
          status?: 'pending' | 'processing' | 'succeeded' | 'failed'
        }
        Update: {
          id?: string
          created_at?: string
          project_id?: string
          prompt?: string
          image_url?: string | null
          status?: 'pending' | 'processing' | 'succeeded' | 'failed'
        }
      }
    }
  }
}

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Design = Database["public"]["Tables"]["designs"]["Row"];
export type ProjectStatus = Project["status"];
export type DesignStatus = Design["status"];
