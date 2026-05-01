"use client";
import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { CountryData } from "@/types/country";

export function useStreamChat() {
  const { messages, addMessage, appendToLastMessage, setStreaming } = useChatStore();
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string, countryData: CountryData | null) => {
    setError(null);
    const userMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      timestamp: Date.now(),
    };
    
    addMessage(userMsg);
    setStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages, userMsg],
          countryData,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to send message");
      }

      // Create assistant message placeholder
      addMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Now receiving raw text stream from Groq API
        appendToLastMessage(chunk);
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Streaming error:", err);
    } finally {
      setStreaming(false);
    }
  };

  return { sendMessage, error };
}
