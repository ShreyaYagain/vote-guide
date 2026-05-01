"use client";
import { useState } from "react";
import { ShieldAlert, CheckCircle2, XCircle, ChevronDown, ChevronUp, CircleDot, Info } from "lucide-react";

const MYTHS = [
  {
    id: "1",
    claim: "Not voting in the last election removes your registration automatically.",
    verdict: false,
    explanation: "Registration remains valid unless you move, pass away, or are disqualified by law. Not voting once doesn't delete your entry, but it's always good to check the voter list before every election.",
    source: "ECI FAQ — eci.gov.in"
  },
  {
    id: "2",
    claim: "You need a passport to vote if you don't have a Voter ID card.",
    verdict: false,
    explanation: "While a Voter ID (EPIC) is standard, you can use any of 12 government-approved IDs including Aadhaar, Driving License, PAN Card, or MGNREGA Job Card to vote if you are on the electoral roll.",
    source: "Voter ID alternatives — eci.gov.in"
  },
  {
    id: "3",
    claim: "You can vote even if you have recently moved to a new city.",
    verdict: true,
    explanation: "You can vote, but you must register in your new constituency by filing Form 8. You should not be registered in two places at once. Transfers are common and encouraged.",
    source: "Form 8 Guide — nvsp.in"
  },
  {
    id: "4",
    claim: "Your vote is traceable to you personally by election officials.",
    verdict: false,
    explanation: "The voting process is strictly secret. EVMs do not record who voted for whom, and there is no way for any official or candidate to know how an individual voted.",
    source: "EVM Security — eci.gov.in"
  }
];

export default function MythsPage() {
  const [expanded, setExpanded] = useState<string | null>("1");
  const [filter, setFilter] = useState<"all" | "myth" | "fact">("all");

  const filteredMyths = MYTHS.filter(m => {
     if (filter === 'myth') return !m.verdict;
     if (filter === 'fact') return m.verdict;
     return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 animate-in paisley-bg min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-navy leading-tight">
           Don&apos;t believe <br /> 
           <span className="text-gradient-heritage">everything you hear.</span>
        </h1>
        <p className="text-secondary max-w-lg mx-auto font-medium">
           We debunk the most common election myths with official data from the Election Commission.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex justify-center gap-3">
         <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
         <FilterBtn active={filter === 'myth'} onClick={() => setFilter('myth')} label="Myths (False)" />
         <FilterBtn active={filter === 'fact'} onClick={() => setFilter('fact')} label="Facts (True)" />
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredMyths.map((myth) => (
          <div 
            key={myth.id} 
            className="card-heritage p-0 overflow-hidden group border-2 border-gold/5"
          >
            <button 
              onClick={() => setExpanded(expanded === myth.id ? null : myth.id)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-dark/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-white shadow-sm
                  ${myth.verdict ? "bg-green-600" : "bg-maroon"}
                `}>
                  {myth.verdict ? "FACT" : "MYTH"}
                </div>
                <span className="font-heading text-lg font-bold text-navy leading-snug">{myth.claim}</span>
              </div>
              <div className={`text-primary transition-transform duration-300 ${expanded === myth.id ? 'rotate-180' : ''}`}>
                 <ChevronDown size={24} />
              </div>
            </button>
            
            {expanded === myth.id && (
              <div className="p-6 pt-0 bg-cream-dark/10 animate-slide-up">
                <div className="h-px bg-cream-border mb-6" />
                <div className="space-y-4">
                   <p className="text-navy font-medium leading-relaxed">{myth.explanation}</p>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                         <ShieldAlert size={14} className="text-gold" />
                         Source: {myth.source}
                      </div>
                      <a href="https://eci.gov.in" target="_blank" className="text-xs font-bold text-primary underline">
                         Check Official FAQ
                      </a>
                   </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card-heritage bg-white border-2 border-dashed border-gold/30 text-center py-12 max-w-2xl mx-auto mt-20 shadow-none">
         <CircleDot size={48} className="text-gold/20 mx-auto mb-4" />
         <h4 className="font-heading text-2xl font-bold text-navy mb-2">Think we missed one?</h4>
         <p className="text-sm text-secondary mb-8 max-w-md mx-auto">Help us keep the community informed. Submit a suspicious claim for verification.</p>
         <button className="btn-saffron px-10">Submit a Myth</button>
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all
        ${active ? 'bg-primary text-white shadow-md' : 'bg-white border border-cream-border text-secondary hover:border-primary'}
      `}
    >
      {label}
    </button>
  );
}
