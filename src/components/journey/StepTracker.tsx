"use client";
import { useUserStore } from "@/store/userStore";
import { CheckCircle2, Circle, ArrowRight, ExternalLink } from "lucide-react";

interface Step {
  id?: number;
  label: string;
  date: string;
  description?: string;
  instructions?: string[];
  done_by_default: boolean;
  url?: string;
}

interface Props {
  steps: Step[];
}

export default function StepTracker({ steps }: Props) {
  const { completedSteps, markStepComplete, markStepIncomplete } = useUserStore();

  return (
    <div className="space-y-0 relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-cream-border" />

      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index) || step.done_by_default;
        const isActive = !isCompleted && (index === 0 || completedSteps.includes(index - 1));

        return (
          <div key={index} className="relative pb-10 last:pb-0">
            <div className="flex items-start gap-6 group">
              {/* Step Indicator */}
              <div className="relative z-10 flex items-center justify-center">
                <button 
                  onClick={() => isCompleted ? markStepIncomplete(index) : markStepComplete(index)}
                  disabled={step.done_by_default}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? "bg-green-600 text-white shadow-lg" : 
                      isActive ? "bg-primary text-white shadow-primary/30 shadow-xl ring-4 ring-primary/20 scale-110" : 
                      "bg-white border-2 border-cream-border text-secondary"}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <span className="text-sm font-bold font-mono">{index + 1}</span>
                  )}
                </button>
              </div>
              
              {/* Content */}
              <div className={`flex-1 transition-all duration-300
                ${isCompleted ? "opacity-50" : ""}
              `}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className={`text-lg font-heading font-bold transition-colors
                    ${isActive ? "text-navy" : "text-secondary"}
                    ${isCompleted ? "line-through" : ""}
                  `}>
                    {step.label}
                  </h4>
                  {step.date !== "dynamic" && (
                    <span className="text-[10px] font-mono font-bold text-secondary bg-cream-dark px-2 py-0.5 rounded uppercase tracking-widest w-fit">
                      {step.date}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-secondary mt-1 max-w-lg">
                   {step.description || getStepDescription(index, step.label)}
                </p>

                {isActive && (
                  <div className="mt-6 animate-slide-up">
                    <div className="card-heritage bg-cream-dark/20 p-6 border-gold/10 overflow-hidden">
                       <div className="arch-frame h-1 bg-primary/20 -mt-6 -mx-6 mb-6 border-none scalloped-top" />
                       
                       <p className="text-xs text-navy font-bold uppercase tracking-widest mb-4">Instructions</p>
                       <ul className="text-sm space-y-2 text-secondary font-medium mb-6">
                          {step.instructions ? (
                            step.instructions.map((ins, i) => (
                              <li key={i} className="flex gap-2"><span>•</span> {ins}</li>
                            ))
                          ) : (
                            <>
                              <li className="flex gap-2"><span>•</span> Verify your name on the latest electoral roll.</li>
                              <li className="flex gap-2"><span>•</span> Keep your Aadhaar or Voter ID ready.</li>
                            </>
                          )}
                       </ul>

                       <div className="flex gap-3">
                          <button 
                             onClick={() => markStepComplete(index)}
                             className="btn-saffron py-2 px-6 text-xs flex-1"
                          >
                             Mark as Done
                          </button>
                          {step.url && (
                            <a 
                              href={step.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn-navy-outline py-2 px-4 text-xs flex-1"
                            >
                              Official Link <ExternalLink size={12} />
                            </a>
                          )}
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getStepDescription(index: number, label: string) {
   const descriptions = [
      "Confirm you meet the age and residency requirements for your area.",
      "Submit your application via the NVSP portal or Voters' Helpline App.",
      "Ensure you have your Electronic Photo Identity Card (EPIC) ready.",
      "Check your assigned booth location using the ECI Booth Locator.",
      "Visit your polling station on election day and cast your secret ballot.",
      "Stay tuned to the official ECI results portal for the outcome."
   ];
   return descriptions[index] || "Complete this step to progress in your journey.";
}
