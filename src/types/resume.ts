export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Project {
  name: string;
  description: string[];
  link?: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  github?: string;
  linkedin?: string;
  summary: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export interface Resume {
  id?: string;
  user_id: string;
  resume_data: ResumeData;
  template: 'modern' | 'classic';
  created_at?: string;
  updated_at?: string;
}
