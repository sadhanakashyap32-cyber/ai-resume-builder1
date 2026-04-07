import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60; // Allow AI route to run longer on Vercel (Hobby limit is 60s)

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { section, userInput } = await req.json();

    if (!section || !userInput) {
      return NextResponse.json({ error: "Missing section or user input" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a professional resume writer and career expert.
      Your task is to rewrite or generate a professional, ATS-friendly ${section} for a resume.
      Use professional vocabulary and bullet points where appropriate.
      
      User Input: "${userInput}"
      
      Rules:
      - For Summary: Professional 2-3 sentences.
      - For Experience: Use active verbs and quantify results where possible.
      - Output MUST be plain text with proper formatting (e.g. bullet points starting with '•').
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ content: text.trim() });
  } catch (error: unknown) {
    console.error("Gemini API Error:", (error as Error).message);
    return NextResponse.json({ error: "Failed to generate content. Please try again later." }, { status: 500 });
  }
}
