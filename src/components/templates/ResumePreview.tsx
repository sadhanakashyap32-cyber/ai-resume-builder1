"use client";

import React from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";

export function ResumePreview() {
  const { data, template } = useResume();

  return (
    <div id="resume-content" className="w-full max-w-[210mm] min-h-[297mm] h-fit bg-white shadow-2xl relative overflow-hidden transition-all duration-300 ease-in-out">
      {template === "modern" ? (
        <ModernTemplate data={data} />
      ) : (
        <ClassicTemplate data={data} />
      )}
    </div>
  );
}
