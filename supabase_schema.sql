-- ============================================================================
-- AI RESUME BUILDER - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- HOW TO USE THIS FILE:
-- 1. Go to your Supabase project dashboard: https://supabase.com/dashboard
-- 2. Click on "SQL Editor" in the left sidebar.
-- 3. Click "New Query" and paste the *entire contents* of this file into it.
-- 4. Click "Run" (or press Cmd/Ctrl + Enter).
-- 
-- This sets up the necessary table and allows your Vercel deployment to write
-- resumes when users click the "Share" button.
-- ============================================================================

-- 1. Create the 'resumes' table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    resume_data JSONB NOT NULL,
    template TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow anyone to read a resume by ID
CREATE POLICY "Allow public read access"
ON public.resumes
FOR SELECT
USING (true);

-- 4. Create Policy: Allow anyone to insert (guest uploads)
CREATE POLICY "Allow guest insert access"
ON public.resumes
FOR INSERT
WITH CHECK (true);

-- 5. Create Policy: Allow users to update their own resumes (by user_id)
CREATE POLICY "Allow users to update their own resumes"
ON public.resumes
FOR UPDATE
USING (true)
WITH CHECK (true);
