import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { mode, formData } = await req.json();

    let systemPrompt = "";

    if (mode === "school") {
      systemPrompt = `
You are an expert school educator.
Create a structured lesson plan based on:
${JSON.stringify(formData)}

Provide:
1. Lesson Overview
2. Learning Outcomes
3. Step-by-step Teaching Plan
4. Activities
5. Assessment
6. Homework
`;
    }

    if (mode === "college") {
      systemPrompt = `
You are a university professor.
Create a structured lecture plan based on:
${JSON.stringify(formData)}

Provide:
1. Lecture Outline
2. Key Concepts
3. Examples
4. Discussion Questions
5. Assignment
`;
    }

    if (mode === "coach") {
      systemPrompt = `
You are a professional coach.
Create a structured coaching session based on:
${JSON.stringify(formData)}

Provide:
1. Session Flow
2. Core Framework
3. Interactive Activity
4. Reflection Questions
5. Action Steps
`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }],
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "AI generation failed" },
      { status: 500 }
    );
  }
}
