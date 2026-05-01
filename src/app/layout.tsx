"use client";
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google';
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm-sans' 
});

const dmMono = DM_Mono({ 
  subsets: ['latin'], 
  weight: ['400'], 
  variable: '--font-dm-mono' 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedState, setSelectedState } = useUserStore();

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
      </head>
      <body className="font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-[100] w-[220px] transform transition-transform duration-300 ease-in-out bg-white md:relative md:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Backdrop for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-[90] md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 relative h-full">
            <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-y-auto bg-cream pb-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
