"use client";
import { useState } from "react";
import { useCountry } from "@/hooks/useCountry";
import { useUserStore } from "@/store/userStore";
import CountdownWidget from "@/components/countdown/CountdownWidget";
import Link from "next/link";
import { ArrowRight, CheckCircle, MessageSquare, ShieldAlert, Map as MapIcon, CircleDot } from "lucide-react";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import ElectionMap from "@/components/map/ElectionMap";

export default function HomePage() {
  const { countryData, loading } = useCountry();
  const { selectedState, setSelectedState } = useUserStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pollingDay = countryData?.phases.find(p => p.states.includes(selectedState || "Karnataka"))?.date || "2026-04-26";
  const activeState = selectedState || "Karnataka";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 gap-[60px] overflow-hidden"
        style={{
          backgroundColor: '#FAF7F0',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpattern id='mehndi' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='40' cy='40' r='3' fill='%23FF9933' opacity='0.07'/%3E%3Ccircle cx='40' cy='40' r='8' fill='none' stroke='%23FF9933' stroke-width='0.8' opacity='0.07'/%3E%3Ccircle cx='40' cy='40' r='14' fill='none' stroke='%23FF9933' stroke-width='0.5' opacity='0.07'/%3E%3Cellipse cx='40' cy='26' rx='2.5' ry='5' fill='%23FF9933' opacity='0.07'/%3E%3Cellipse cx='40' cy='54' rx='2.5' ry='5' fill='%23FF9933' opacity='0.07'/%3E%3Cellipse cx='26' cy='40' rx='5' ry='2.5' fill='%23FF9933' opacity='0.07'/%3E%3Cellipse cx='54' cy='40' rx='5' ry='2.5' fill='%23FF9933' opacity='0.07'/%3E%3Ccircle cx='29' cy='29' r='1.5' fill='%23FF9933' opacity='0.07'/%3E%3Ccircle cx='51' cy='29' r='1.5' fill='%23FF9933' opacity='0.07'/%3E%3Ccircle cx='29' cy='51' r='1.5' fill='%23FF9933' opacity='0.07'/%3E%3Ccircle cx='51' cy='51' r='1.5' fill='%23FF9933' opacity='0.07'/%3E%3Ccircle cx='0' cy='0' r='4' fill='none' stroke='%23FF9933' stroke-width='0.5' opacity='0.07'/%3E%3Ccircle cx='80' cy='0' r='4' fill='none' stroke='%23FF9933' stroke-width='0.5' opacity='0.07'/%3E%3Ccircle cx='0' cy='80' r='4' fill='none' stroke='%23FF9933' stroke-width='0.5' opacity='0.07'/%3E%3Ccircle cx='80' cy='80' r='4' fill='none' stroke='%23FF9933' stroke-width='0.5' opacity='0.07'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23mehndi)'/%3E%3C/svg%3E")`
        }}
      >
        <div className="max-w-[520px] w-full py-[60px] space-y-8 animate-in relative z-10 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF9933] block">
              Chunav 2026 • Your Vote Matters
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight text-[#000080]">
              Know Your <br />
              <span className="text-gradient-heritage">Vote.</span>
            </h1>
            <p className="text-[#6B6B6B] text-lg md:text-xl max-w-xl mx-auto md:mx-0 font-sans">
              India&apos;s election guide — simple, personal, and completely free.
            </p>
          </div>

          <div className="w-full max-w-lg">
            <CountdownWidget targetDate={pollingDay} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link href="/journey" className="btn-saffron px-10 py-4 text-base group">
              Start My Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/chat" className="btn-navy-outline px-10 py-4 text-base bg-white border-[#000080] text-[#000080]">
              Watch how it works
            </Link>
          </div>
        </div>

        {/* Right Map Block */}
        <div className="w-full md:w-[420px] flex-shrink-0 flex flex-col items-center justify-center relative z-10">
          <div className="h-[280px] md:h-[420px] w-full relative">
             <ElectionMap 
               highlightedState={selectedState}
               onStateClick={(code) => {
                 // Convert jVectorMap code to state name if possible
                 // For now just show onboarding
                 setShowOnboarding(true);
               }} 
             />
          </div>
          
          
          <div className="mt-4 text-center space-y-1">
             <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                <p className="text-[13px] font-bold text-[#000080] font-sans">
                  {activeState} • Phase 2 • April 26
                </p>
             </div>
             <button 
               onClick={() => setShowOnboarding(true)}
               className="text-[12px] font-bold text-[#FF9933] hover:underline block pt-1 mx-auto"
             >
                Change state →
             </button>
          </div>
        </div>
        {showOnboarding && (
          <OnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </section>

      {/* Feature Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-12 bg-white relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#000080]">Everything you need, in one place</h2>
          <div className="flex items-center justify-center gap-4 py-2 opacity-30">
             <div className="h-px w-20 bg-[#D4C4A0]" />
             <CircleDot size={16} className="text-[#FF9933]" />
             <div className="h-px w-20 bg-[#D4C4A0]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<CheckCircle size={32} className="text-[#FF9933]" />}
            title="My Journey"
            description="Personalised step-by-step voting guide tailored to your state."
            link="/journey"
          />
          <FeatureCard 
            icon={<MessageSquare size={32} className="text-[#138808]" />}
            title="Ask Anything"
            description="AI answers your election questions instantly with cited sources."
            link="/chat"
          />
          <FeatureCard 
            icon={<MapIcon size={32} className="text-[#000080]" />}
            title="Live Map"
            description="See India&apos;s election phases light up in real time across the nation."
            link="/map"
          />
        </div>
      </section>

      <div className="h-1 tricolour-stripe w-full" />
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: any; title: string; description: string; link: string }) {
  return (
    <Link href={link} className="card-heritage flex flex-col items-start text-left group hover:-translate-y-2 transition-all">
      <div className="w-full h-32 bg-[#FAF7F0] flex items-center justify-center mb-6 overflow-hidden rounded-lg">
         <div className="group-hover:scale-110 transition-transform duration-500">
            {icon}
         </div>
      </div>
      <h3 className="font-heading text-xl font-bold text-[#000080] mb-3">{title}</h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
        {description}
      </p>
      <span className="mt-auto text-xs font-bold text-[#FF9933] flex items-center gap-1 group-hover:gap-2 transition-all">
        EXPLORE NOW <ArrowRight size={14} />
      </span>
    </Link>
  );
}

