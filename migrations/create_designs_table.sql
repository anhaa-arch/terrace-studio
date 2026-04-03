-- Create designs table
CREATE TABLE IF NOT EXISTS public.designs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('TERRACE', 'BALCONY', 'RAILING', 'WINDOW_GUARD')),
  material text,
  width_cm integer,
  depth_cm integer,
  height_cm integer,
  notes text,
  generated_image_url text NOT NULL,
  ai_provider text DEFAULT 'OpenAI-DALL-E-3',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS (Row Level Security) - Enable if needed
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all access for now (assuming admin-only or authenticated)
CREATE POLICY "Allow all access to designs" ON public.designs FOR ALL USING (true);
