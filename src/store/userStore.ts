"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  country: string; // ISO code e.g. 'IN'
  selectedState: string | null; // state name for India
  completedSteps: number[];
  setCountry: (code: string) => void;
  setSelectedState: (state: string | null) => void;
  markStepComplete: (step: number) => void;
  markStepIncomplete: (step: number) => void;
  resetSteps: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      country: "IN",
      selectedState: "Karnataka", // Hardcoded default
      completedSteps: [],
      setCountry: (code) =>
        set({ country: code, selectedState: null, completedSteps: [] }),
      setSelectedState: (state) => set({ selectedState: state }),
      markStepComplete: (step) =>
        set((s) => ({
          completedSteps: s.completedSteps.includes(step)
            ? s.completedSteps
            : [...s.completedSteps, step],
        })),
      markStepIncomplete: (step) =>
        set((s) => ({
          completedSteps: s.completedSteps.filter((n) => n !== step),
        })),
      resetSteps: () => set({ completedSteps: [] }),
    }),
    { name: "voteguide-user-v3" }
  )
);
