import React from "react";
import { ResumeData } from "@/types/resume";

export function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-zinc-950 p-12 min-h-full font-serif leading-relaxed">
      {/* Header */}
      <header className="text-center mb-10 border-b-2 border-zinc-900 pb-6 uppercase tracking-wider">
        <h1 className="text-4xl font-extrabold mb-1 tracking-tight">{data.fullName}</h1>
        <div className="flex justify-center gap-4 text-xs font-semibold">
          <span>{data.email}</span>
          <span>&middot;</span>
          <span>{data.phone}</span>
          {data.linkedin && (
             <>
               <span>&middot;</span>
               <span>{data.linkedin}</span>
             </>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-10 text-center px-12">
        <h2 className="text-sm font-bold border-b border-zinc-200 mb-4 tracking-[0.2em] inline-block uppercase pb-1 mx-auto">Career Objective</h2>
        <p className="text-sm text-zinc-800 leading-normal italic">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-sm font-bold border-b-2 border-zinc-900 mb-6 tracking-[0.2em] uppercase pb-1">Professional Experience</h2>
        <div className="space-y-8">
          {data.experience.map((exp, i) => (
             <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                   <h3 className="font-bold text-base">{exp.company}</h3>
                   <span className="text-[11px] font-bold text-zinc-600 uppercase">{exp.duration}</span>
                </div>
                <p className="text-sm font-bold text-zinc-700 italic mb-3">{exp.role}</p>
                <ul className="list-disc list-outside ml-5 text-[13px] space-y-2 text-zinc-900">
                  {exp.description.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
             </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-sm font-bold border-b-2 border-zinc-900 mb-6 tracking-[0.2em] uppercase pb-1">Education</h2>
        <div className="space-y-6">
          {data.education.map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">{edu.school}</h3>
                <span className="text-[11px] font-bold text-zinc-600 uppercase">{edu.year}</span>
              </div>
              <p className="text-xs text-zinc-700 italic mt-1">{edu.degree}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-sm font-bold border-b-2 border-zinc-900 mb-4 tracking-[0.2em] uppercase pb-1">Technical Proficiency</h2>
        <p className="text-sm text-zinc-900 leading-relaxed tracking-tight underline-offset-4">
           {data.skills.join(", ")}
        </p>
      </section>
    </div>
  );
}
