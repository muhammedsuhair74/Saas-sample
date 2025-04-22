// /app/api/ai-assistant/route.ts

import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({ response: chat.choices[0].message.content });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({ error: "AI Assistant failed" }, { status: 500 });
  }
}
