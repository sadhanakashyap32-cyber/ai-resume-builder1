import { createClient } from '@supabase/supabase-js';
import { ResumeData } from '@/types/resume';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Missing Supabase environment variables! Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
  );
}

// Fallback to placeholders to prevent the "supabaseUrl is required" crash
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export async function saveResume(user_id: string, resume_data: ResumeData, template: string) {
  const { data, error } = await supabase
    .from('resumes')
    .upsert({
      user_id,
      resume_data,
      template,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchResumes(user_id: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user_id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}
