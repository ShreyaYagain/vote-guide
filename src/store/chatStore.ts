"use client";
import { create } from "zustand";
import { ChatMessage } from "@/types/chat";

interface ChatStore {
  messages: ChatMessage[];
  isStreaming: boolean;
  addMessage: (msg: ChatMessage) => void;
  appendToLastMessage: (text: string) => void;
  setStreaming: (val: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  appendToLastMessage: (text) =>
    set((s) => {
      const msgs = [...s.messages];
      if (msgs.length === 0) return s;
      const last = { ...msgs[msgs.length - 1] };
      last.content += text;
      msgs[msgs.length - 1] = last;
      return { messages: msgs };
    }),
  setStreaming: (val) => set({ isStreaming: val }),
  clearMessages: () => set({ messages: [] }),
}));
