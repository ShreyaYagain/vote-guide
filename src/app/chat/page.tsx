"use client";
import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import { useStreamChat } from "@/hooks/useStreamChat";
import { useCountry } from "@/hooks/useCountry";
import { Send, CircleDot } from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, isStreaming } = useChatStore();
  const { sendMessage, error } = useStreamChat();
  const { countryData } = useCountry();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input, countryData);
    setInput("");
  };

  const SUGGESTIONS = [
    "What ID do I need for polling day?",
    "How do I register to vote?",
    "Can I vote if I'm away from home?",
    "Lost my voter ID card",
    "Polling booth hours",
    "Is voting compulsory?"
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] md:h-screen bg-cream paisley-bg overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative z-10 shadow-xl border-r border-cream-border">
        {/* Header */}
        <div className="p-6 border-b border-cream-border bg-white sticky top-0 z-20">
          <h1 className="text-2xl font-heading font-black text-navy">Ask Anything</h1>
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Election AI Assistant</p>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#FAF7F0]/30"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-slow">
                 <CircleDot size={40} className="text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-navy italic">Namaste! Ask me anything.</h3>
                <p className="text-sm max-w-xs mx-auto text-secondary">
                  I&apos;m your election companion, ready to help you navigate the process in {countryData?.name}.
                </p>
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="animate-in">
                <MessageBubble role={m.role} content={m.content} />
              </div>
            ))
          )}
          {isStreaming && (
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse ml-12">
               Thinking...
            </div>
          )}
          {error && (
            <div className="p-4 rounded-lg bg-maroon/10 border border-maroon/20 text-maroon text-xs text-center font-bold">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-cream-border bg-white">
          <form onSubmit={handleSubmit} className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about registration, polling dates, or your rights..."
              className="w-full px-5 py-4 pr-16 rounded-xl bg-cream border border-cream-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm italic"
              disabled={isStreaming}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:brightness-90 disabled:opacity-30 transition-all shadow-md"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="flex justify-center items-center gap-4 mt-4">
             <div className="h-px flex-1 bg-cream-border" />
             <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter shrink-0">
                Powered by Groq • Llama 3.3
             </p>
             <div className="h-px flex-1 bg-cream-border" />
          </div>
        </div>
      </div>

      {/* Suggested Topics Panel (Desktop) */}
      <div className="hidden lg:flex w-80 flex-col p-8 space-y-10 overflow-y-auto relative z-0">
         <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-navy">Common Questions</h4>
            <div className="h-0.5 w-12 bg-primary" />
            <div className="flex flex-wrap gap-2">
               {SUGGESTIONS.map((s) => (
                 <button 
                   key={s} 
                   onClick={() => setInput(s)}
                   className="px-4 py-2 text-xs font-bold text-navy bg-white border border-cream-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all text-left shadow-sm"
                 >
                   {s}
                 </button>
               ))}
            </div>
         </div>

         <div className="card-heritage bg-primary/5 border-primary/20 p-6 space-y-4">
            <h4 className="font-heading text-sm font-bold text-navy">Today&apos;s Highlights</h4>
            <div className="space-y-4">
               <NewsItem title="Final voter list published" time="2h ago" />
               <NewsItem title="Voter awareness camps set" time="5h ago" />
            </div>
         </div>
         
         <div className="mt-auto pt-10 text-center opacity-30">
            <CircleDot size={80} className="text-primary/20 mx-auto" />
         </div>
      </div>
      
      <style jsx global>{`
        .bubble-user-heritage {
          @apply bg-primary rounded-2xl rounded-tr-none px-5 py-4 shadow-md;
        }
        .bubble-assistant-heritage {
          @apply bg-white rounded-2xl rounded-tl-none px-5 py-4 border-l-4 border-gold shadow-sm;
        }
      `}</style>
    </div>
  );
}

function NewsItem({ title, time }: { title: string, time: string }) {
  return (
    <div className="space-y-1 group cursor-pointer">
       <h5 className="text-xs font-bold text-navy group-hover:text-primary transition-colors leading-tight">{title}</h5>
       <p className="text-[10px] font-mono text-secondary">{time}</p>
    </div>
  );
}
