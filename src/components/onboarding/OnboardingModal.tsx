"use client";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useCountry } from "@/hooks/useCountry";
import { X, Check, MapPin, Search } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function OnboardingModal({ onClose }: Props) {
  const { countryData } = useCountry();
  const { selectedState, setSelectedState } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");

  const states = countryData?.phases.flatMap(p => p.states)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort() || [];

  const filteredStates = states.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (state: string) => {
    setSelectedState(state);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="h-1 tricolour-stripe w-full" />
        
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-2xl font-heading font-black text-navy">Select your State</h2>
              <p className="text-sm text-secondary font-medium">We&apos;ll personalise your election journey based on your location.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-cream-dark/50 rounded-full text-secondary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input 
              type="text"
              placeholder="Search your state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-cream border border-cream-border rounded-xl focus:outline-none focus:border-primary transition-all font-medium text-sm"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto pr-2 scrollable space-y-1">
            {filteredStates.map((state) => (
              <button
                key={state}
                onClick={() => handleSelect(state)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left font-bold text-sm
                  ${selectedState === state 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "hover:bg-cream-dark/30 text-navy"}
                `}
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} className={selectedState === state ? "text-primary" : "text-secondary"} />
                  {state}
                </div>
                {selectedState === state && <Check size={18} />}
              </button>
            ))}
            {filteredStates.length === 0 && (
              <div className="py-8 text-center text-secondary text-sm italic">
                No states found matching &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </div>

        <div className="bg-cream p-6 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-secondary hover:text-navy transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            disabled={!selectedState}
            className="btn-saffron px-8 py-2.5 text-xs disabled:opacity-50"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}
