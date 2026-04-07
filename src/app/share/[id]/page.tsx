import { supabase } from "@/lib/supabase";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import DemoShareClient from "@/components/builder/DemoShareClient";

export const revalidate = 60; // Revalidate every 60 seconds

// Next.js 16 — params is a Promise, must be awaited
export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !resume) {
    if (id === "demo") {
      return <DemoShareClient />;
    }
    return notFound();
  }

  const { resume_data, template } = resume;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-[#0a0a14] dark:via-[#0f0f1e] dark:to-[#0a0a14] flex flex-col items-center py-12 px-4">
      {/* Branding Header */}
      <div className="w-full max-w-[210mm] mb-6 flex items-center justify-between animate-fade-in">
        <Link
          href="/builder"
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm hover:shadow-md transition-all text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={14} />
          Back to Builder
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-black text-sm bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </div>
      </div>

      {/* Resume Container */}
      <div className="w-full max-w-[210mm] bg-white shadow-2xl rounded-lg overflow-hidden animate-slide-up ring-1 ring-zinc-200">
        {template === "modern" ? (
          <ModernTemplate data={resume_data} />
        ) : (
          <ClassicTemplate data={resume_data} />
        )}
      </div>

      {/* Footer Branding */}
      <footer className="mt-12 text-zinc-500 dark:text-zinc-400 text-sm flex flex-col items-center gap-4 animate-fade-in">
        <p>Built with ✨ AI Resume Builder</p>
        <Link
          href="/builder"
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-md shadow-indigo-200 dark:shadow-indigo-900 hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all active:scale-95"
        >
          Create Your Own AI Resume →
        </Link>
      </footer>
    </main>
  );
}
