"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Share2, CircleDot, Info } from "lucide-react";

const QUESTIONS = [
  {
    id: "1",
    question: "What is the minimum age to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "The Constitution of India (Article 326) grants voting rights to all citizens aged 18 and above."
  },
  {
    id: "2",
    question: "Which body conducts general elections in India?",
    options: ["Parliament of India", "Supreme Court", "Election Commission of India", "UPSC"],
    correct: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering elections."
  },
  {
    id: "3",
    question: "What is an EVM?",
    options: ["Electronic Voter Machine", "Electronic Voting Machine", "Electoral Verification Module", "Election Validation Method"],
    correct: 1,
    explanation: "EVM stands for Electronic Voting Machine. India switched from paper ballots to EVMs to reduce fraud and speed up counting."
  },
  {
    id: "4",
    question: "What document is primarily used as Voter ID in India?",
    options: ["Passport", "EPIC Card", "Aadhaar Card", "PAN Card"],
    correct: 1,
    explanation: "EPIC (Electors Photo Identity Card) is the official voter ID. However, 12 alternative documents including Aadhaar are also accepted."
  },
  {
    id: "5",
    question: "How many phases does the 2026 Indian General Election have?",
    options: ["3 phases", "5 phases", "7 phases", "9 phases"],
    correct: 2,
    explanation: "The 2026 Indian General Election is conducted in 7 phases as per the current schedule."
  },
  {
    id: "6",
    question: "What is NOTA?",
    options: ["None of the Above", "Not on the Agenda", "National Option for Total Abstention", "No Other Than Approved"],
    correct: 0,
    explanation: "NOTA (None of the Above) was introduced by the Supreme Court in 2013, allowing voters to reject all candidates on the ballot."
  },
  {
    id: "7",
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "President of India", "Parliament", "Supreme Court"],
    correct: 1,
    explanation: "The Chief Election Commissioner is appointed by the President of India on the advice of a selection committee."
  },
  {
    id: "8",
    question: "What is the Model Code of Conduct?",
    options: ["A law passed by Parliament", "Guidelines for voter behaviour", "Rules political parties must follow during elections", "Code for EVM operation"],
    correct: 2,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the ECI that political parties and candidates must follow from the announcement of elections until results."
  },
  {
    id: "9",
    question: "Where do you register to vote in India?",
    options: ["District Collector office only", "NVSP portal or Voter Helpline App", "Aadhaar centre", "Post office"],
    correct: 1,
    explanation: "You can register online at voters.eci.gov.in (NVSP portal) or through the Voter Helpline App. Offline registration is also available at your local Electoral Registration Office."
  },
  {
    id: "10",
    question: "What is a constituency?",
    options: ["A polling booth", "A geographical area that elects one representative", "The list of registered voters", "The ballot counting centre"],
    correct: 1,
    explanation: "A constituency is a defined geographical area whose registered voters elect one representative to Parliament (Lok Sabha) or State Assembly (Vidhan Sabha)."
  }
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === QUESTIONS[current].correct) {
      setScore(score + 1);
    }
  };

  const handleShare = () => {
    const message = `I scored ${score}/${QUESTIONS.length} on the VoteGuide Civic Quiz! Test your knowledge: ${window.location.origin}/quiz`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-10 animate-in paisley-bg min-h-screen flex flex-col items-center justify-center">
        <div className="card-heritage border-2 border-gold/20 p-12 space-y-8 w-full max-w-lg">
          <div className="space-y-4">
             {/* Score Circle */}
             <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center mx-auto shadow-2xl border-4 border-white
                ${score >= 2 ? "bg-green-600" : "bg-maroon"}
             `}>
                <span className="text-4xl font-mono font-black text-white leading-none">{score}</span>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mt-1">out of {QUESTIONS.length}</span>
             </div>
             
             <h1 className="text-3xl font-heading font-black text-navy mt-8">
                {score === QUESTIONS.length ? "Namaste, Expert!" : "Well Done!" }
             </h1>
             <p className="text-secondary font-medium">
                {score === QUESTIONS.length 
                   ? "You're fully election-ready with a perfect score." 
                   : "Good effort! Keep learning about your civic rights."}
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={reset} className="btn-navy-outline w-full py-4 text-xs">
               <RotateCcw size={16} />
               Retake Quiz
            </button>
            <button onClick={handleShare} className="btn-saffron w-full py-4 text-xs">
               <Share2 size={16} />
               Share Score
            </button>
          </div>
        </div>
        
        <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.3em]">
           Test your friends • Empower Democracy
        </p>
      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 animate-in min-h-screen">
      <div className="max-w-xl mx-auto text-center space-y-2">
         <h1 className="text-3xl font-heading font-black text-navy">Civic Quiz</h1>
         <p className="text-xs font-bold text-secondary uppercase tracking-widest">Question {current + 1} of {QUESTIONS.length}</p>
      </div>

      <div className="max-w-2xl mx-auto card-heritage border-2 border-gold/10 p-0 overflow-hidden shadow-2xl">
        {/* Arch top and progress */}
        <div className="arch-frame scalloped-top h-16 bg-cream-dark/50 border-none relative overflow-hidden">
           <div 
             className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-1000 ease-out" 
             style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
           />
        </div>

        <div className="p-8 space-y-8">
          <h3 className="text-2xl font-heading font-bold text-navy leading-tight">
            {q.question}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = i === selected;
              const showFeedback = selected !== null;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`flex items-center justify-between px-6 py-4 rounded-xl border-2 transition-all text-left font-bold text-sm
                    ${!showFeedback ? "bg-white border-cream-border text-navy hover:border-primary hover:bg-cream/20" : ""}
                    ${showFeedback && isCorrect ? "bg-green-600 border-green-600 text-white shadow-lg scale-[1.02]" : ""}
                    ${showFeedback && isSelected && !isCorrect ? "bg-maroon border-maroon text-white" : ""}
                    ${showFeedback && !isSelected && !isCorrect ? "bg-white border-cream-border text-navy opacity-50" : ""}
                  `}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <CheckCircle2 size={20} />}
                  {showFeedback && isSelected && !isCorrect && <XCircle size={20} />}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="animate-slide-up space-y-8 pt-4">
              <div className="p-6 rounded-xl bg-primary/5 border-2 border-primary/10 relative">
                <div className="absolute -top-3 left-6 px-2 bg-white text-[10px] font-bold text-primary uppercase tracking-widest">
                   Why?
                </div>
                <div className="flex gap-4">
                   <Info size={20} className="text-primary shrink-0 mt-1" />
                   <p className="text-sm text-navy font-medium leading-relaxed">
                     {q.explanation}
                   </p>
                </div>
              </div>
              
              <button onClick={handleNext} className="btn-saffron w-full py-4 text-base">
                {current === QUESTIONS.length - 1 ? "See Final Score" : "Next Question"}
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
