import { supabase } from "@/lib/supabase";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function SharePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !resume) {
    return notFound();
  }

  const { resume_data, template } = resume;

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center py-12 px-4">
      {/* Branding Header */}
      <div className="mb-8 flex items-center gap-2 animate-fade-in">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-zinc-900 dark:text-white">AI Resume Builder</span>
        </Link>
      </div>

      {/* Resume Container */}
      <div className="w-full max-w-[210mm] bg-white shadow-2xl rounded-sm overflow-hidden animate-slide-up">
        {template === "modern" ? (
          <ModernTemplate data={resume_data} />
        ) : (
          <ClassicTemplate data={resume_data} />
        )}
      </div>

      {/* Footer Branding */}
      <footer className="mt-12 text-zinc-500 text-sm flex flex-col items-center gap-4">
        <p>This resume was built using AI Resume Builder.</p>
        <Link 
          href="/"
          className="px-6 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold text-zinc-900 dark:text-white shadow-sm hover:shadow-md transition-all"
        >
          Create Your Own AI Resume
        </Link>
      </footer>
    </main>
  );
}
