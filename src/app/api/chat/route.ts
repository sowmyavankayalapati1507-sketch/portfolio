import { NextRequest, NextResponse } from "next/server";
import { knowledgeBase, systemPrompt } from "@/lib/knowledge-base";
import { retrieveChunks, generateAnswer } from "@/lib/embeddings";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // Retrieve relevant context chunks
    const context = await retrieveChunks(message, knowledgeBase, 3);

    // Generate answer using Mistral via HuggingFace
    const answer = await generateAnswer(message, context, systemPrompt);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("[Chat API Error]", err);
    return NextResponse.json(
      {
        answer:
          "Sorry, I'm having trouble connecting right now. Please try again shortly or contact Sowmya directly at hello@sowmya.dev",
      },
      { status: 200 } // Return 200 so the frontend can display the fallback message
    );
  }
}
