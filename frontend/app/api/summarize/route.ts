import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const result = await model.generateContent(
      `Summarize the following text in simple points:\n\n${text}`
    );

    const response = result.response.text();

    return NextResponse.json({
      success: true,
      summary: response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate summary",
      },
      { status: 500 }
    );
  }
}