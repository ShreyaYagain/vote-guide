import { groq } from "@/lib/groq";
import { buildSystemPrompt } from "@/data/system-prompt";
import { checkRateLimit } from "@/lib/rateLimit";
import { CountryData } from "@/types/country";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return new Response("Rate limit exceeded", { 
        status: 429,
        headers: { "Retry-After": "3600" }
      });
    }

    const { messages, countryData } = await req.json();

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Best free model on Groq
      max_tokens: 512,
      temperature: 0.3,
      messages: [
        { role: "system", content: buildSystemPrompt(countryData as CountryData) },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        }))
      ],
      stream: true,
    });

    // Convert Groq stream to web ReadableStream
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Groq API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
