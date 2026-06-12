import { KnowledgeChunk } from "./knowledge-base";

const HF_EMBEDDING_URL =
  "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction";
const HF_LLM_URL =
  "https://router.huggingface.co/v1/chat/completions";

export async function getEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) throw new Error("HF_API_KEY not set");

  const res = await fetch(HF_EMBEDDING_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
  });

  if (!res.ok) throw new Error(`Embedding API error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data[0]) ? data[0] : data;
}

function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const ma = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const mb = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return ma && mb ? dot / (ma * mb) : 0;
}

export async function retrieveChunks(
  query: string,
  chunks: KnowledgeChunk[],
  topK = 3
): Promise<string[]> {
  try {
    const embeddings = await Promise.all([
      getEmbedding(query),
      ...chunks.map((c) => getEmbedding(c.content)),
    ]);

    const [qEmb, ...cEmbs] = embeddings;
    return chunks
      .map((c, i) => ({ content: c.content, score: cosineSim(qEmb, cEmbs[i]) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((r) => r.content);
  } catch {
    // Keyword fallback
    const q = query.toLowerCase();
    return chunks
      .map((c) => ({
        content: c.content,
        score: q.split(/\s+/).filter((w) => c.content.toLowerCase().includes(w)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((r) => r.content);
  }
}

export async function generateAnswer(
  question: string,
  context: string[],
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) throw new Error("HF_API_KEY not set");

  const userContent = `Relevant information about Sowmya:
${context.join("\n\n---\n\n")}

Visitor's question: ${question}

Answer in 2-3 sentences, being professional, friendly, and specific.`;

  const res = await fetch(HF_LLM_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      max_tokens: 250,
      temperature: 0.65,
    }),
  });

  if (res.status === 503) {
    return "The AI model is warming up — please try again in about 20 seconds! 🔥";
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`LLM API error: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  const generated: string = data?.choices?.[0]?.message?.content ?? "";
  return generated.trim() || "I couldn't generate a response. Please ask again!";
}

