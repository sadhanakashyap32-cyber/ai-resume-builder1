import React from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, ExternalLink } from "lucide-react";

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="flex bg-white text-zinc-900 min-h-full font-sans">
      {/* Sidebar */}
      <aside className="w-1/3 bg-zinc-900 text-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{data.fullName}</h1>
          <p className="text-zinc-400 text-sm italic">Software Professional</p>
        </div>

        <div className="space-y-4 mb-10 overflow-hidden">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 pb-2 border-b border-zinc-700">Contact</h2>
          {data.email && (
            <div className="flex items-center gap-3 text-xs">
              <Mail size={14} className="text-zinc-500 shrink-0" />
              <span className="truncate">{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-3 text-xs">
              <Phone size={14} className="text-zinc-500 shrink-0" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-3 text-xs">
              <ExternalLink size={14} className="text-zinc-500 shrink-0" />
              <span className="truncate">{data.github}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-3 text-xs">
              <ExternalLink size={14} className="text-zinc-500 shrink-0" />
              <span className="truncate">{data.linkedin}</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 pb-2 border-b border-zinc-700">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-[10px] px-2 py-1 bg-zinc-800 rounded border border-zinc-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-zinc-900 uppercase border-b-2 border-blue-600 pb-1 mb-3">Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-600">{data.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-zinc-900 uppercase border-b-2 border-blue-600 pb-1 mb-4">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-zinc-900">{exp.role}</h3>
                    <p className="text-sm text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium italic">{exp.duration}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-zinc-600 space-y-1 mt-2">
                  {exp.description.map((bullet, j) => (
                    <li key={j} className="leading-normal">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-lg font-bold text-zinc-900 uppercase border-b-2 border-blue-600 pb-1 mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{edu.degree}</h3>
                  <p className="text-xs text-zinc-500">{edu.school}</p>
                </div>
                <span className="text-xs text-zinc-400 italic">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
