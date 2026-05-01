"use client";
import Link from "next/link";
import CountrySelector from "@/components/ui/CountrySelector";
import { CircleDot, Menu } from "lucide-react";

interface Props {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: Props) {
  return (
    <>
      <div className="h-[3px] tricolour-stripe w-full fixed top-0 z-[60]" />
      <div className="h-16 flex items-center justify-between px-4 border-b-2 border-primary bg-white sticky top-[3px] z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="p-2 -ml-2 text-navy md:hidden hover:bg-cream-dark/50 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <CircleDot size={20} className="text-navy" />
            <span className="text-lg font-heading font-bold text-navy">
              VoteGuide
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <CountrySelector />
        </div>
      </div>
    </>
  );
}
