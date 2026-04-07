"use client";

import React, { useEffect, useState } from "react";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import Link from "next/link";
import { Sparkles, ArrowLeft, AlertCircle } from "lucide-react";
import { initialResumeData } from "@/constants/initialData";
import { ResumeData } from "@/types/resume";

export default function DemoShareClient() {
  const [data, setData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<string>("modern");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("demo_share_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.data) setData(parsed.data);
        if (parsed.template) setTemplate(parsed.template);
      }
    } catch (e) {
      console.error("Failed to load demo share data", e);
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-[#0a0a14] dark:via-[#0f0f1e] dark:to-[#0a0a14] flex flex-col items-center py-12 px-4">
      {/* Demo Warning Banner */}
      <div className="w-full max-w-[210mm] mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-xl flex items-center justify-between text-orange-800 dark:text-orange-300 animate-slide-up">
        <div className="flex items-center gap-2">
          <AlertCircle size={18} />
          <p className="text-sm font-medium">
             This is a local demo link. To create permanent shareable links, configure your Supabase API keys in <code className="px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/50 rounded text-xs">.env.local</code>.
          </p>
        </div>
      </div>

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

      <div className="w-full max-w-[210mm] bg-white shadow-2xl rounded-lg overflow-hidden animate-slide-up ring-1 ring-zinc-200">
        {template === "modern" ? (
          <ModernTemplate data={data} />
        ) : (
          <ClassicTemplate data={data} />
        )}
      </div>

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
