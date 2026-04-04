"use client";

import { ResumeBuilder } from "@/components/builder/ResumeBuilder";
import { ResumePreview } from "@/components/templates/ResumePreview";
import { useState } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { exportToPDF } from "@/lib/utils/export";
import { saveResume } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Share2 } from "lucide-react";
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
      // For now, using a guest user ID. In a real app, this would be the logged-in user.
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
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <h1 className="font-bold text-lg tracking-tight">ResumeBuilder</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value as "modern" | "classic")}
              className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 text-sm outline-none cursor-pointer"
            >
              <option value="modern" className="text-black">Modern Template</option>
              <option value="classic" className="text-black">Classic Template</option>
            </select>
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-blue-100 disabled:opacity-50 transition-colors"
            >
              {isSharing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
              Share
            </button>
            <button 
              onClick={handleDownload}
              disabled={isExporting}
              className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin" /> : null}
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

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Builder Side */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-zinc-50 dark:bg-black border-r border-zinc-200 dark:border-zinc-800">
           <ResumeBuilder />
        </div>

        {/* Live Preview Side */}
        <div className="w-full lg:w-1/2 p-8 bg-zinc-100 dark:bg-zinc-950 flex justify-center items-start overflow-y-auto">
          <ResumePreview />
        </div>
      </div>
    </main>
  );
}
