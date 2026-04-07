import Link from "next/link";
import { Sparkles, ArrowRight, Wand2, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-[#0a0a14] dark:via-[#0f0f1e] dark:to-[#13111c] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans overflow-x-hidden">
      
      {/* Clean Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a14]/80 backdrop-blur-xl border-b border-indigo-100/50 dark:border-indigo-900/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/builder" 
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              Go to Builder
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Wand2 size={16} className="animate-pulse" />
            Powered by Gemini AI Next-Gen Models
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.1]">
            Build a <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent">professional resume</span> in minutes
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stop struggling with formatting. Let our AI analyze your experience, refine your bullet points, and generate an ATS-optimized professional resume instantly.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/builder" 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/20 hover:shadow-2xl hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started for Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="#features" 
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              View Features
            </a>
          </div>

          <div className="pt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> ATS-Friendly</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> No signup required</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> PDF Export</span>
          </div>
        </div>

        {/* Fancy Features Grid */}
        <div id="features" className="w-full max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          
          {[
            {
              title: "AI Power Bullet Points",
              desc: "Gemini AI instantly transforms your rough job descriptions into hard-hitting, professional bullet points.",
              icon: <Wand2 size={24} className="text-purple-600 dark:text-purple-400" />,
              color: "bg-purple-50 border-purple-100 dark:bg-purple-900/10 dark:border-purple-900/30"
            },
            {
              title: "Live Resume Scoring",
              desc: "Get real-time feedback and an ATS score as you type. See exactly what hiring managers want to see.",
              icon: <CheckCircle2 size={24} className="text-indigo-600 dark:text-indigo-400" />,
              color: "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-900/30"
            },
            {
              title: "Beautiful Templates",
              desc: "Choose between Modern and Classic themes, optimized for readability and instant PDF compilation.",
              icon: <FileText size={24} className="text-blue-600 dark:text-blue-400" />,
              color: "bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30"
            }
          ].map((feature, i) => (
            <div key={i} className={`p-8 rounded-3xl border ${feature.color} hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl`}>
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
          
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-8 text-center text-zinc-500 dark:text-zinc-400 text-sm border-t border-indigo-50 dark:border-zinc-800/50 mt-auto">
        Designed with AI. Free to use forever.
      </footer>
    </div>
  );
}
