"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";

interface CritiqueResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  atsTips: string[];
  suggestions: { field: string; tip: string }[];
}

interface CritiqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CritiqueResult | null;
}

export function CritiqueModal({ isOpen, onClose, result }: CritiqueModalProps) {
  if (!isOpen || !result) return null;

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
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl shadow-sm flex items-center justify-center text-blue-600 font-black text-xl border border-blue-100 dark:border-zinc-700">
                {result.score}
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                   Resume Score
                   <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">AI Analysis</span>
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Based on industry standards & ATS compatibility</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-full transition-colors">
              <X size={20} className="text-zinc-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Overall Summary */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500" />
                Overall Impression
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
                &quot;{result.summary}&quot;
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <section className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                <h4 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
                   <CheckCircle2 size={16} /> Key Strengths
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((str, i) => (
                    <li key={i} className="text-sm text-green-800 dark:text-green-300/80">• {str}</li>
                  ))}
                </ul>
              </section>

              {/* Weaknesses */}
              <section className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
                <h4 className="font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-3">
                   <AlertCircle size={16} /> Areas to Improve
                </h4>
                <ul className="space-y-2">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-orange-800 dark:text-orange-300/80">• {w}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ATS Tips */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-indigo-500" />
                ATS Compatibility Tips
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {result.atsTips.map((tip, i) => (
                  <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                    {tip}
                  </div>
                ))}
              </div>
            </section>

            {/* Field Suggestions */}
            <section className="pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Section-Specific Suggestions</h3>
              <div className="space-y-3">
                {result.suggestions.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{item.field}:</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{item.tip}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <button
              onClick={onClose}
              className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Got it, thanks!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
