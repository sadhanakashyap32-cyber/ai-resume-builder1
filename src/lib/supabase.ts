import { createClient } from '@supabase/supabase-js';
import { ResumeData } from '@/types/resume';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
