import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();

    if (!resumeData) {
      return NextResponse.json({ error: "Missing resume data" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      You are a senior hiring manager and ATS expert.
      Evaluate the following resume data and provide a detailed critique in JSON format.
      
      Resume Data: ${JSON.stringify(resumeData)}
      
      Expected JSON Structure:
      {
        "score": number (0-100),
        "summary": "Overall impression of the resume.",
        "strengths": ["list of 2-3 key strengths"],
        "weaknesses": ["list of 2-3 major areas for improvement"],
        "atsTips": ["2-3 specific tips to improve ATS compatibility"],
        "suggestions": [
           { "field": "section name", "tip": "specific advice" }
        ]
      }
      
      Be honest, professional, and helpful.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini Critique Error:", error.message);
    return NextResponse.json({ error: "Failed to evaluate resume. Please try again." }, { status: 500 });
  }
}
