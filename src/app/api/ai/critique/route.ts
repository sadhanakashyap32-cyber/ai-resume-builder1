import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60; // Allow AI route to run longer on Vercel (Hobby limit is 60s)

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
    let text = result.response.text();
    
    // Strip possible markdown wrapping like ```json \n ... \n```
    text = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini Critique Error:", error.message || error);
    
    // Fallback Mock Response for Demo/Unconfigured state
    const mockResponse = {
      score: 85,
      summary: "This is a solid resume outline, though it currently uses fallback AI data. To get real personalized feedback, configure your Gemini API key.",
      strengths: [
        "Good structural flow and clean section breaks",
        "Clear professional details present"
      ],
      weaknesses: [
        "Lacks quantifiable metrics in experience descriptions",
        "Summary could be more impactful"
      ],
      atsTips: [
        "Ensure standard fonts are used for automated parsers",
        "Include more industry-specific keywords based on your target role"
      ],
      suggestions: [
        { field: "Experience", tip: "Start bullet points with strong action verbs (e.g., 'Spearheaded', 'Optimized')." }
      ]
    };
    
    return NextResponse.json(mockResponse, { status: 200 });
  }
}
