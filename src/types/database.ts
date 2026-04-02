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
          title: string
          description: string | null
          original_image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          original_image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          original_image_url?: string
          created_at?: string
        }
      }
      designs: {
        Row: {
          id: string
          project_id: string
          type: 'TERRACE' | 'BALCONY' | 'RAILING' | 'WINDOW_GUARD'
          material: string | null
          width_cm: number | null
          depth_cm: number | null
          height_cm: number | null
          notes: string | null
          generated_image_url: string | null
          ai_provider: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          type: 'TERRACE' | 'BALCONY' | 'RAILING' | 'WINDOW_GUARD'
          material?: string | null
          width_cm?: number | null
          depth_cm?: number | null
          height_cm?: number | null
          notes?: string | null
          generated_image_url?: string | null
          ai_provider?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          type?: 'TERRACE' | 'BALCONY' | 'RAILING' | 'WINDOW_GUARD'
          material?: string | null
          width_cm?: number | null
          depth_cm?: number | null
          height_cm?: number | null
          notes?: string | null
          generated_image_url?: string | null
          ai_provider?: string | null
          created_at?: string
        }
      }
    }
  }
}

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Design = Database["public"]["Tables"]["designs"]["Row"];
export type DesignType = Database["public"]["Tables"]["designs"]["Row"]["type"];
