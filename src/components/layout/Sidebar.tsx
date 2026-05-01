"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Map, 
  MessageSquare, 
  ShieldAlert, 
  CheckSquare, 
  CircleDot,
  X 
} from "lucide-react";
import { useUserStore } from "@/store/userStore";

export const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/journey", label: "My Journey", icon: CheckSquare },
  { href: "/map", label: "Election Map", icon: Map },
  { href: "/chat", label: "Ask Anything", icon: MessageSquare },
  { href: "/myths", label: "Myth Buster", icon: ShieldAlert },
  { href: "/quiz", label: "Civic Quiz", icon: CheckSquare },
];

interface Props {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: Props) {
  const pathname = usePathname();
  const { country } = useUserStore();

  return (
    <div className="flex flex-col h-full bg-[#FAF7F0] border-r border-[#D4C4A0] relative overflow-hidden">
      {/* Logo Area */}
      <div className="p-[20px_16px] border-bottom border-[#D4C4A0] flex items-center justify-between h-16 border-b border-[#D4C4A0]">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <CircleDot size={24} className="text-[#000080]" />
          <span className="text-xl font-heading font-bold tracking-tight text-[#000080]">
            VoteGuide
          </span>
        </Link>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-navy md:hidden hover:bg-cream-dark/50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 py-4 space-y-1">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
          
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all relative
                ${isActive 
                  ? "bg-[#FFF3E0] text-[#000080] font-semibold border-l-[3px] border-[#FF9933]" 
                  : "text-[#6B6B6B] hover:bg-[#F5F0E8] hover:text-[#000080]"}
              `}
            >
              <Icon size={18} className={isActive ? "text-[#FF9933]" : "text-[#D4C4A0]"} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Voter Location Section */}
      <div className="p-6 border-t border-[#D4C4A0]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
             Voter Location
          </span>
          <div className="bg-[#FF9933] text-white rounded-[99px] px-2 py-0.5 text-[11px] font-bold">
            {country}
          </div>
        </div>
      </div>
      
      {/* Mandala Watermark */}
      <div className="flex justify-center pb-8 opacity-[0.06] pointer-events-none">
         <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="10" stroke="#FF9933" strokeWidth="1.5"/>
            <circle cx="40" cy="40" r="20" stroke="#FF9933" strokeWidth="1"/>
            <circle cx="40" cy="40" r="30" stroke="#FF9933" strokeWidth="0.5"/>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <line 
                key={angle}
                x1="40" y1="40" 
                x2={40 + 35 * Math.cos(angle * Math.PI / 180)} 
                y2={40 + 35 * Math.sin(angle * Math.PI / 180)} 
                stroke="#FF9933" 
                strokeWidth="0.5"
              />
            ))}
         </svg>
      </div>
    </div>
  );
}
