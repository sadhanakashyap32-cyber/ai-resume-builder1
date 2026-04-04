"use client";

import React, { useState } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { Plus, Trash2, Sparkles, Loader2, RotateCcw, BarChart3 } from "lucide-react";
import { refineContent } from "@/lib/services/ai";
import { toast } from "sonner";
import { initialResumeData } from "@/constants/initialData";
import { CritiqueModal } from "./CritiqueModal";
import { ResumeData } from "@/types/resume";

export function ResumeBuilder() {
  const { data, setData } = useResume();
  const [isRefiningSummary, setIsRefiningSummary] = useState(false);
  const [refiningExperience, setRefiningExperience] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<any>(null);
  const [isCritiqueOpen, setIsCritiqueOpen] = useState(false);

  const handleChange = (field: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setData(initialResumeData);
      toast.success("Data reset to sample!");
    }
  };

  const handleCritique = async () => {
    setIsAnalyzing(true);
    const toastId = toast.loading("AI is analyzing your resume...");
    try {
      const response = await fetch("/api/ai/critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data }),
      });
      
      if (!response.ok) throw new Error("Analysis failed");
      
      const result = await response.json();
      setCritiqueResult(result);
      setIsCritiqueOpen(true);
      toast.success("Analysis complete!", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleListChange = (section: 'experience' | 'education' | 'projects', index: number, field: string, value: any) => {
    const newList = [...(data[section] as any[])];
    if (field === 'description') {
        newList[index][field] = value.split('\n').filter((s: string) => s.trim() !== '');
    } else {
        newList[index][field] = value;
    }
    handleChange(section, newList);
  };

  const handleRefineSummary = async () => {
    if (!data.summary.trim()) {
       toast.error("Please enter a summary first");
       return;
    }
    setIsRefiningSummary(true);
    try {
      const refined = await refineContent("Summary", data.summary);
      handleChange("summary", refined);
      toast.success("Summary refined successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsRefiningSummary(false);
    }
  };

  const handleRefineExperience = async (index: number) => {
    const exp = data.experience[index];
    if (!exp.role || !exp.description.length) {
       toast.error("Please enter job role and description FIRST");
       return;
    }

    setRefiningExperience(prev => [...prev, index]);
    try {
      const userInput = `Role: ${exp.role}\nDescription: ${exp.description.join('\n')}`;
      const refined = await refineContent("Work Experience", userInput);
      
      const newExp = [...data.experience];
      newExp[index].description = refined.split('\n').map((s: string) => s.replace(/^[•\-\*]\s*/, '').trim()).filter((s: string) => s !== '');
      handleChange("experience", newExp);
      toast.success("Experience refined successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setRefiningExperience(prev => prev.filter(i => i !== index));
    }
  };

  const addItem = (section: 'experience' | 'education' | 'projects') => {
    const newItem = section === 'experience' 
        ? { company: '', role: '', duration: '', description: [] }
        : section === 'education'
        ? { degree: '', school: '', year: '' }
        : { name: '', description: [], link: '' };
    
    setData((prev: ResumeData) => ({ ...prev, [section]: [...(prev[section] as any[]), newItem] }));
  };

  const removeItem = (section: 'experience' | 'education' | 'projects', index: number) => {
    const newList = [...(data[section] as any[])];
    newList.splice(index, 1);
    handleChange(section, newList);
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">{title}</h2>
      {children}
    </div>
  );

  const InputGroup = ({ label, value, onChange, placeholder, type = "text" }: any) => (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
       <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
            AI Resume Builder
          </h1>
          <p className="text-zinc-500 mt-2 text-sm italic">Craft your professional identity with AI guidance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCritique}
            disabled={isAnalyzing}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <BarChart3 size={14} />}
            Analyze Score
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Full Name" value={data.fullName} onChange={(v: string) => handleChange("fullName", v)} />
          <InputGroup label="Email" value={data.email} onChange={(v: string) => handleChange("email", v)} type="email" />
          <InputGroup label="Phone" value={data.phone} onChange={(v: string) => handleChange("phone", v)} />
          <InputGroup label="GitHub" value={data.github} onChange={(v: string) => handleChange("github", v)} />
          <InputGroup label="LinkedIn" value={data.linkedin} onChange={(v: string) => handleChange("linkedin", v)} />
        </div>
      </Section>

      <Section title="Professional Summary">
        <div className="relative">
          <textarea
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="Tell us about your background..."
          />
          <button 
            onClick={handleRefineSummary}
            disabled={isRefiningSummary}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-md text-sm font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
          >
            {isRefiningSummary ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            AI Refine
          </button>
        </div>
      </Section>

      <Section title="Work Experience">
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="relative p-4 mb-4 border border-zinc-200 dark:border-zinc-800 rounded-lg group">
            <button onClick={() => removeItem('experience', index)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Company" value={exp.company} onChange={(v: string) => handleListChange('experience', index, 'company', v)} />
              <InputGroup label="Role" value={exp.role} onChange={(v: string) => handleListChange('experience', index, 'role', v)} />
            </div>
            <div className="relative mt-2">
              <textarea
                value={exp.description.join('\n')}
                onChange={(e) => handleListChange('experience', index, 'description', e.target.value)}
                placeholder="Job descriptions (one per line)"
                className="w-full h-32 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent outline-none resize-none"
              />
              <button 
                onClick={() => handleRefineExperience(index)}
                disabled={refiningExperience.includes(index)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-md text-xs font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {refiningExperience.includes(index) ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                AI Improve Bullets
              </button>
            </div>
          </div>
        ))}
        <button onClick={() => addItem('experience')} className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg w-full justify-center text-zinc-500 hover:border-zinc-400">
          <Plus size={18} /> Add Experience
        </button>
      </Section>

      <Section title="Education">
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="relative p-4 mb-4 border border-zinc-200 dark:border-zinc-800 rounded-lg group">
            <button onClick={() => removeItem('education', index)} className="absolute top-4 right-4 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputGroup label="Degree" value={edu.degree} onChange={(v: string) => handleListChange('education', index, 'degree', v)} />
              <InputGroup label="School" value={edu.school} onChange={(v: string) => handleListChange('education', index, 'school', v)} />
              <InputGroup label="Year" value={edu.year} onChange={(v: string) => handleListChange('education', index, 'year', v)} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('education')} className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg w-full justify-center text-zinc-500 hover:border-zinc-400 transition-colors">
          <Plus size={18} /> Add Education
        </button>
      </Section>

      <Section title="Skills">
        <textarea
          value={data.skills.join(", ")}
          onChange={(e) => handleChange("skills", e.target.value.split(",").map((s: string) => s.trim()).filter((s: string) => s !== ""))}
          className="w-full h-24 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="Enter skills separated by commas..."
        />
      </Section>

      <CritiqueModal 
        isOpen={isCritiqueOpen}
        onClose={() => setIsCritiqueOpen(false)}
        result={critiqueResult}
      />
    </div>
  );
}
