# AI Resume Builder

A professional, production-ready AI-powered Resume Builder built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

## ✨ Features

- **🤖 Gemini AI Integration**: 
  - Generate professional summaries instantly.
  - Refine work experience into high-impact, ATS-friendly bullet points.
  - **AI Resume Critique**: Get a professional score (0-100) and detailed feedback on how to improve your resume.
- **🎨 Real-time Preview & Templates**: 
  - Split-screen editor for instant visual feedback.
  - Choose between **Modern** (sleek sidebar) and **Classic** (traditional formal) templates.
- **🌐 Public Sharing**: 
  - Publish your resume to the cloud via **Supabase**.
  - Generate a unique, shareable public link (e.g., `/share/[id]`) for recruiters.
- **📄 PDF Export**: High-quality, scalable PDF generation using `html2canvas` and `jsPDF`.
- **💾 Auto-Save**: Local storage integration ensures your work is never lost.
- **✨ Premium UI/UX**: Built with **Framer Motion** for smooth transitions and **Sonner** for clean notifications.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A Google Gemini API Key
- A Supabase Project (URL and Anon Key)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-url]
    cd ai-resume-builder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup environment variables**:
    Create a `.env.local` file in the root and add:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to start building!

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI**: [Google Gemini Pro 1.5 Flash](https://aistudio.google.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Toasts**: [Sonner](https://sonner.stevenly.me/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
