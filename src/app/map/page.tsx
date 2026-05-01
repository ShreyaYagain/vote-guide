"use client";
import { useState, useMemo } from "react";
import { useCountry } from "@/hooks/useCountry";
import { Map as MapIcon, Info, Calendar, ExternalLink, Share2, CircleDot, X } from "lucide-react";
import { isAfter, isBefore, parseISO, differenceInDays } from "date-fns";
import ElectionMap from "@/components/map/ElectionMap";

export default function MapPage() {
  const { countryData, loading } = useCountry();
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateInfo = useMemo(() => {
    if (!countryData || !selectedState) return null;
    
    // Find which phase this state belongs to
    const phase = countryData.phases.find(p => p.states.includes(selectedState));
    if (!phase) return null;

    const date = parseISO(phase.date);
    const now = new Date();
    const diff = differenceInDays(date, now);

    let status: "upcoming" | "soon" | "today" | "done" = "upcoming";
    if (diff < 0) status = "done";
    else if (diff === 0) status = "today";
    else if (diff <= 7) status = "soon";

    return {
      name: selectedState,
      phase: phase.phase,
      date: phase.date,
      status,
    };
  }, [countryData, selectedState]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] md:h-screen overflow-hidden bg-cream">
      {/* Map Area */}
      <div className="flex-1 p-6 lg:p-12 relative flex flex-col items-center justify-center paisley-bg overflow-hidden">
         {/* Large Mandala Backdrop */}
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <CircleDot size={800} className="text-primary" />
         </div>

         <div className="absolute top-6 left-6 lg:top-12 lg:left-12 z-10 space-y-2">
            <h1 className="text-3xl lg:text-4xl font-heading font-black text-navy">Live Map</h1>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{countryData?.election_name}</span>
            </div>
         </div>

         {/* Map Canvas */}
         <div className="w-full max-w-4xl relative z-10">
            <ElectionMap 
              onStateClick={(code) => {
                // For now, map jVectorMap code back to state name
                // This is a simple mock mapping
                const states: Record<string, string> = {
                  'IN-KA': 'Karnataka', 'IN-KL': 'Kerala', 'IN-MH': 'Maharashtra', 
                  'IN-GA': 'Goa', 'IN-RJ': 'Rajasthan', 'IN-UP': 'Uttar Pradesh',
                  'IN-PB': 'Punjab', 'IN-HP': 'Himachal Pradesh', 'IN-DL': 'Delhi',
                  'IN-HR': 'Haryana', 'IN-WB': 'West Bengal', 'IN-TN': 'Tamil Nadu',
                  'IN-BR': 'Bihar', 'IN-AS': 'Assam', 'IN-AP': 'Andhra Pradesh'
                };
                if (states[code]) setSelectedState(states[code]);
              }} 
            />
         </div>

         {/* Legend Card */}
         <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 z-20 card-heritage p-4 space-y-4 border-2 border-gold/10 shadow-xl bg-white/95">
            <div className="flex items-center gap-2 mb-2">
               <CircleDot size={14} className="text-gold" />
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy">Phase Status</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
               <LegendItem color="bg-cream-border" label="Upcoming" />
               <LegendItem color="bg-warning" label="Soon (<7d)" />
               <LegendItem color="bg-primary" label="Voting Today" />
               <LegendItem color="bg-green-600" label="Completed" />
            </div>
         </div>
      </div>

      {/* Detail Panel */}
      <div className={`w-full lg:w-96 bg-white border-l-2 border-gold/10 shadow-2xl transition-transform duration-500 fixed lg:relative inset-y-0 right-0 z-50
        ${selectedState ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}>
        {selectedState ? (
          <div className="h-full flex flex-col animate-slide-in-right">
            {/* Panel Arch Header */}
            <div className="arch-frame scalloped-top h-24 bg-primary/10 border-none relative flex flex-col items-center justify-end pb-4">
               <button 
                 onClick={() => setSelectedState(null)}
                 className="absolute top-4 right-4 p-2 bg-white rounded-full text-secondary hover:text-maroon transition-colors shadow-sm"
               >
                 <X size={16} />
               </button>
               <div className="badge-primary bg-primary text-white font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                  Phase {stateInfo?.phase}
               </div>
            </div>

            <div className="p-8 space-y-10 flex-1 overflow-y-auto scrollable">
              <div className="space-y-4">
                <h2 className="text-3xl font-heading font-black text-navy">{stateInfo?.name}</h2>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                  ${stateInfo?.status === 'today' ? 'bg-primary text-white animate-pulse' : 
                    stateInfo?.status === 'done' ? 'bg-green-600 text-white' : 
                    stateInfo?.status === 'soon' ? 'bg-warning text-white' : 'bg-cream-dark text-secondary'}
                `}>
                  {stateInfo?.status === 'today' ? '🗳️ Voting Today' : stateInfo?.status}
                </div>
              </div>

              <div className="space-y-8">
                 <div className="grid grid-cols-1 gap-6">
                    <DetailItem icon={<Calendar size={20} />} label="Polling Date" value={stateInfo?.date || ""} />
                    <DetailItem icon={<Info size={20} />} label="Constituencies" value="38 Districts" />
                    <DetailItem icon={<MapIcon size={20} />} label="ECI Booth Locator" value="Active" />
                 </div>
              </div>

              <div className="h-px bg-cream-border" />

              <div className="space-y-4">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Actions</h4>
                 <div className="space-y-3">
                    <a href={countryData?.ec_url} target="_blank" className="btn-navy-outline w-full text-xs font-bold py-3.5">
                       <ExternalLink size={16} />
                       Official ECI Website
                    </a>
                    <button className="btn-saffron w-full text-xs font-bold py-3.5">
                       <Share2 size={16} />
                       Share Phase Info
                    </button>
                 </div>
              </div>
            </div>
            
            {/* Bottom Tricolour */}
            <div className="h-1 tricolour-stripe w-full" />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6 opacity-30">
             <CircleDot size={64} className="text-gold" />
             <p className="text-sm font-heading font-bold text-navy italic">Select a state on the map to see local election details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
       <div className={`w-3 h-3 rounded-full ${color}`} />
       <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter whitespace-nowrap">{label}</span>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 group">
       <div className="p-3 bg-cream-dark rounded-xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          {icon}
       </div>
       <div className="space-y-1">
          <p className="text-[10px] uppercase font-bold text-secondary tracking-widest leading-none">{label}</p>
          <p className="text-lg font-bold text-navy">{value}</p>
       </div>
    </div>
  );
}
