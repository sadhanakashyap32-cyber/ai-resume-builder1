import { ResumeData } from "@/types/resume";

export const initialResumeData: ResumeData = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
  summary: "Results-driven software engineer with 5+ years of experience...",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of Tech",
      year: "2018 - 2022",
    },
  ],
  experience: [
    {
      company: "Tech Corp",
      role: "Senior Developer",
      duration: "2022 - Present",
      description: ["Leading development of cloud-native applications.", "Optimized CI/CD pipelines boosting deployment speed by 40%."],
    },
  ],
  projects: [
    {
      name: "Resume Builder",
      description: ["AI-powered professional resume creation tool.", "Built with Next.js and Gemini API."],
      link: "#",
    },
  ],
};
