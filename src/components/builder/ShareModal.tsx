"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Globe, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export function ShareModal({ isOpen, onClose, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={onClose}
           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
               <Share2 size={20} className="text-blue-600" />
               Share Resume
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <X size={20} className="text-zinc-400" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Globe size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your resume is now public!</h3>
                <p className="text-sm text-zinc-500 max-w-[250px] mx-auto mt-1">
                  Anyone with the link can view your professional resume online.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl group">
              <input 
                type="text" 
                readOnly 
                value={shareUrl}
                className="flex-1 bg-transparent border-none text-sm px-2 outline-none text-zinc-600 dark:text-zinc-400 font-mono overflow-ellipsis"
              />
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-lg hover:opacity-90 transition-all shrink-0 shadow-sm active:scale-95"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="px-8 pb-8">
             <button
                onClick={onClose}
                className="w-full py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
             >
                Close
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
