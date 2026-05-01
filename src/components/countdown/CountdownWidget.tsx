"use client";
import { useCountdown } from "@/hooks/useCountdown";
import { Share2 } from "lucide-react";
import { isAfter, isBefore, parseISO } from "date-fns";

interface Props {
  targetDate: string;
}

export default function CountdownWidget({ targetDate }: Props) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  
  const now = new Date();
  const dateObj = targetDate ? parseISO(targetDate) : null;
  const isPollDay = dateObj && now.toDateString() === dateObj.toDateString();
  const isPollsOpen = isPollDay && now.getHours() >= 7 && now.getHours() < 18;
  const isPollsClosed = isExpired || (isPollDay && now.getHours() >= 18);

  return (
    <div className="bg-white border-[1.5px] border-[#D4C4A0] rounded-[16px] overflow-hidden shadow-sm transition-all duration-500">
      {/* Gold Top Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#C8960C] to-[#138808]" />
      
      <div className="p-6 space-y-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6B6B6B]">
          NEXT POLLING DAY IN YOUR AREA
        </div>

        {isPollsOpen ? (
          <div className="bg-[#FF9933] text-white p-4 rounded-lg flex items-center justify-center gap-2 animate-pulse font-bold text-sm">
             <span>🗳️</span> Polls are open in your area! Go vote now
          </div>
        ) : isPollsClosed ? (
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 bg-[#138808]/10 text-[#138808] px-3 py-1 rounded-full text-xs font-bold uppercase">
                <div className="w-2 h-2 rounded-full bg-[#138808]" />
                Polls Closed
             </div>
             <p className="text-[#138808] text-[13px] font-medium">
               Results being counted — check ECI website
             </p>
             <a 
               href="https://results.eci.gov.in" 
               target="_blank" 
               className="inline-block text-[13px] font-bold text-[#138808] border border-[#138808] px-4 py-2 rounded-lg hover:bg-[#138808] hover:text-white transition-all"
             >
               View Results →
             </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <CountdownSegment value={days} label="Days" />
              <CountdownSegment value={hours} label="Hours" />
              <CountdownSegment value={minutes} label="Mins" />
              <CountdownSegment value={seconds} label="Secs" />
            </div>
            {/* Animated Saffron Progress Bar */}
            <div className="h-[2px] bg-[#FAF7F0] w-full rounded-full overflow-hidden">
               <div className="h-full bg-[#FF9933] animate-progress-flow" style={{ width: '60%' }} />
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-[#FAF7F0]">
           <button className="flex items-center gap-2 text-[#25D366] hover:brightness-90 transition-all font-bold text-[13px] ml-auto">
              <Share2 size={14} />
              Share reminder
           </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progress-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-flow {
          animation: progress-flow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

function CountdownSegment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[36px] font-heading font-black text-[#000080] leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[11px] font-sans font-medium text-[#6B6B6B] mt-1">
        {label}
      </span>
    </div>
  );
}
