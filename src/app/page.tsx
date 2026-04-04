"use client";

import { ResumeBuilder } from "@/components/builder/ResumeBuilder";
import { ResumePreview } from "@/components/templates/ResumePreview";
import { useState } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { exportToPDF } from "@/lib/utils/export";
import { saveResume } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Share2, FileDown, Sparkles } from "lucide-react";
import { ShareModal } from "@/components/builder/ShareModal";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const { data, template, setTemplate } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    const toastId = toast.loading("Generating high-quality PDF...");
    try {
      await exportToPDF("resume-content", `resume-${data.fullName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      toast.success("Resume downloaded successfully!", { id: toastId });
    } catch (error: any) {
      toast.error("Failed to generate PDF. Please try again.", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    const toastId = toast.loading("Publishing your resume...");
    try {
      const savedResume = await saveResume("guest-user", data, template);
      const url = `${window.location.origin}/share/${savedResume.id}`;
      setShareUrl(url);
      setIsShareModalOpen(true);
      toast.success("Resume published successfully!", { id: toastId });
    } catch (error: any) {
      console.error("Sharing error:", error);
      toast.error("Failed to publish resume. Please check your Supabase setup.", { id: toastId });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9ff] dark:bg-[#0a0a14]">
      {/* ─── Premium Header ─── */}
      <header className="sticky top-0 z-50 w-full border-b border-indigo-100 dark:border-indigo-950 bg-white/80 dark:bg-[#0f0f1e]/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </h1>
              <p className="text-[10px] text-zinc-400 -mt-0.5 leading-none">Powered by Gemini</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as "modern" | "classic")}
              className="bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer text-zinc-700 dark:text-zinc-300 hover:border-indigo-300 transition-colors shadow-sm"
            >
              <option value="modern" className="text-black">✦ Modern</option>
              <option value="classic" className="text-black">📄 Classic</option>
            </select>

            <button
              onClick={handleShare}
              disabled={isSharing}
              className="px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200 hover:from-indigo-100 hover:to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 dark:text-indigo-400 dark:border-indigo-800 disabled:opacity-50 shadow-sm"
            >
              {isSharing ? <Loader2 size={15} className="animate-spin" /> : <Share2 size={15} />}
              Share
            </button>

            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-200 dark:shadow-indigo-900 disabled:opacity-50 active:scale-95"
            >
              {isExporting ? <Loader2 size={15} className="animate-spin" /> : <FileDown size={15} />}
              Download PDF
            </button>
          </div>
        </div>
      </header>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
      />

      {/* ─── Split Layout ─── */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Editor (Left) */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-white/60 dark:bg-[#0d0d1f]/60 border-r border-indigo-100 dark:border-indigo-950 backdrop-blur-sm">
          <ResumeBuilder />
        </div>

        {/* Live Preview (Right) */}
        <div className="w-full lg:w-1/2 p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-blue-950/30 flex justify-center items-start overflow-y-auto">
          <ResumePreview />
        </div>
      </div>
    </main>
  );
}
