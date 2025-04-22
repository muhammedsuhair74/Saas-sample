// src/app/api/ai-assistant/route.ts
import { genAI } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json(); 

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });
    const response = await result.response;
    const text = response.text();

    console.log('text to ', text)

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Gemini AI Error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
