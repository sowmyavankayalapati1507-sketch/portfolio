import { KnowledgeChunk } from "./knowledge-base";

const HF_EMBEDDING_URL =
  "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction";

// Using a more reliable, smaller model that stays warm on HF free tier
const HF_LLM_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

// Fetch with a timeout helper
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 20000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function getEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) throw new Error("HF_API_KEY not set");

  const res = await fetchWithTimeout(
    HF_EMBEDDING_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    },
    15000 // 15s timeout for embeddings
  );

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

// Keyword-based fallback retrieval (no API needed)
function keywordRetrieve(query: string, chunks: KnowledgeChunk[], topK: number): string[] {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  return chunks
    .map((c) => ({
      content: c.content,
      score: words.filter((w) => c.content.toLowerCase().includes(w)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.content);
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
    // Always fall back to keyword search if embeddings fail
    return keywordRetrieve(query, chunks, topK);
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

  let res: Response;
  try {
    res = await fetchWithTimeout(
      HF_LLM_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: HF_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent },
          ],
          max_tokens: 250,
          temperature: 0.65,
        }),
      },
      25000 // 25s timeout for LLM
    );
  } catch (err: unknown) {
    // Timeout or network error — fall back to keyword answer
    const isAbort = err instanceof Error && err.name === "AbortError";
    if (isAbort) {
      return buildFallbackAnswer(question, context);
    }
    throw err;
  }

  if (res.status === 503 || res.status === 429) {
    // Model warming up or rate limited — use intelligent fallback
    return buildFallbackAnswer(question, context);
  }

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[LLM] API error ${res.status}:`, errText);
    return buildFallbackAnswer(question, context);
  }

  const data = await res.json();
  const generated: string = data?.choices?.[0]?.message?.content ?? "";
  const trimmed = generated.trim();

  return trimmed || buildFallbackAnswer(question, context);
}

/**
 * Builds a readable answer directly from the retrieved knowledge chunks
 * when the LLM is unavailable. Uses the first relevant chunk as a response.
 */
function buildFallbackAnswer(question: string, context: string[]): string {
  if (!context.length) {
    return "I couldn't find specific information about that. Please contact Sowmya directly at sowmyavankayalapati.1507@gmail.com — she responds within 24 hours! 😊";
  }

  const q = question.toLowerCase();

  // Pick the most relevant chunk for a direct answer
  const best = context[0];

  // Trim to a reasonable length for display
  const summary = best.length > 400 ? best.substring(0, 400).replace(/\s\S*$/, "") + "…" : best;

  // Add contextual suffix based on question type
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return `${summary} Feel free to reach out at sowmyavankayalapati.1507@gmail.com — she replies within 24 hours!`;
  }
  if (q.includes("available") || q.includes("hire") || q.includes("internship")) {
    return `${summary} You can reach Sowmya at sowmyavankayalapati.1507@gmail.com to discuss opportunities!`;
  }

  return summary;
}
