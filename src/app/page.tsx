import Link from "next/link";
import { Sparkles, ArrowRight, Wand2, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* Clean Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 dark:bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 backdrop-blur-md">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-white drop-shadow-sm">
              ResumeAI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/builder" 
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-indigo-700 hover:bg-white/90 hover:shadow-lg transition-all"
            >
              Go to Builder
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
            <Wand2 size={16} className="animate-pulse text-blue-300" />
            Powered by Gemini AI Next-Gen Models
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-xl">
            Build Your AI Resume in Seconds
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Stop struggling with formatting. Let our AI analyze your experience, refine your bullet points, and generate an ATS-optimized professional resume instantly.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/builder" 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-indigo-700 bg-white shadow-xl shadow-black/20 hover:shadow-2xl hover:bg-white/90 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="#features" 
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
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
              icon: <Wand2 size={24} className="text-white" />,
            },
            {
              title: "Live Resume Scoring",
              desc: "Get real-time feedback and an ATS score as you type. See exactly what hiring managers want to see.",
              icon: <CheckCircle2 size={24} className="text-white" />,
            },
            {
              title: "Beautiful Templates",
              desc: "Choose between Modern and Classic themes, optimized for readability and instant PDF compilation.",
              icon: <FileText size={24} className="text-white" />,
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-white/20 shadow-sm flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-blue-100 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
          
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-8 text-center text-blue-100 text-sm border-t border-white/20 mt-auto backdrop-blur-md bg-black/10">
        Designed with AI. Free to use forever.
      </footer>
    </div>
  );
}
