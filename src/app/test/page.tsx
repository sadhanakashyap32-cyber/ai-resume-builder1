"use client";

import { useState } from "react";
import { supabase, saveResume, fetchResumes } from "@/lib/supabase";

export default function TestPage() {
  const [aiResponse, setAiResponse] = useState("");
  const [dbStatus, setDbStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Test Gemini AI
  const testAI = async () => {
    setLoading(true);
    setAiResponse("Generating...");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "Experience",
          userInput: "I worked as a Junior Developer at TechCorp for 2 years, used React and Node.",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiResponse(data.content);
    } catch (err: any) {
      setAiResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Test Supabase Save
  const testSave = async () => {
    setLoading(true);
    setDbStatus("Saving...");
    try {
      // Note: This uses a dummy user_id. 
      // If you haven't set up Auth or RLS properly, this might fail unless RLS is off.
      const dummyUserId = "00000000-0000-0000-0000-000000000000"; 
      const dummyData = { fullName: "Test User", email: "test@example.com" };
      
      const result = await saveResume(dummyUserId, dummyData, "modern");
      setDbStatus("Success! Saved ID: " + result.id);
    } catch (err: any) {
      setDbStatus("Error: " + err.message + ". (Check if you ran the SQL schema in Supabase)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-8 font-sans">
      <h1 className="text-3xl font-bold">Integration Test Page</h1>
      
      <section className="p-6 border rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">1. Gemini AI Test</h2>
        <p className="text-sm text-gray-600">Sample input: "Junior Developer at TechCorp"</p>
        <button 
          onClick={testAI}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test AI Generation
        </button>
        <div className="p-4 bg-gray-50 rounded border text-sm whitespace-pre-wrap">
          {aiResponse || "Results will appear here..."}
        </div>
      </section>

      <section className="p-6 border rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">2. Supabase Integration Test</h2>
        <p className="text-sm text-gray-600">This will attempt to save a dummy resume to your database.</p>
        <button 
          onClick={testSave}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Test DB Save
        </button>
        <div className="p-4 bg-gray-50 rounded border text-sm">
          {dbStatus || "DB status will appear here..."}
        </div>
      </section>

      <p className="text-xs text-gray-400">
        Note: Ensure your .env.local has valid keys and you've run the SQL schema in Supabase.
      </p>
    </div>
  );
}
