"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { initialResumeData } from "@/constants/initialData";

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  template: "modern" | "classic";
  setTemplate: React.Dispatch<React.SetStateAction<"modern" | "classic">>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<"modern" | "classic">("modern");

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resume-builder-data");
    const savedTemplate = localStorage.getItem("resume-builder-template");
    
    if (savedData) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(JSON.parse(savedData));
      } catch {
        console.error("Failed to parse saved resume data");
      }
    }
    
    if (savedTemplate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTemplate(savedTemplate as "modern" | "classic");
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("resume-builder-data", JSON.stringify(data));
    localStorage.setItem("resume-builder-template", template);
  }, [data, template]);

  return (
    <ResumeContext.Provider value={{ data, setData, template, setTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
