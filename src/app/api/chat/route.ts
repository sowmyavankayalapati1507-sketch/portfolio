import { NextRequest, NextResponse } from "next/server";
import { knowledgeBase, systemPrompt } from "@/lib/knowledge-base";
import { retrieveChunks, generateAnswer } from "@/lib/embeddings";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (!process.env.HF_API_KEY) {
      console.error("[Chat API] HF_API_KEY is not set");
      return NextResponse.json(
        {
          answer:
            "The AI assistant isn't configured yet. Please contact Sowmya directly at sowmyavankayalapati.1507@gmail.com 😊",
        },
        { status: 200 }
      );
    }

    // Retrieve relevant context chunks (uses keyword fallback if embedding API fails)
    const context = await retrieveChunks(message, knowledgeBase, 3);

    // Generate answer using HuggingFace LLM
    const answer = await generateAnswer(message, context, systemPrompt);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("[Chat API Error]", err);
    return NextResponse.json(
      {
        answer:
          "I'm having a moment! 🤔 Please try again in a few seconds, or reach Sowmya directly at sowmyavankayalapati.1507@gmail.com",
      },
      { status: 200 }
    );
  }
}
