// src/types/map.ts
export type PhaseStatus = "upcoming" | "soon" | "today" | "done";

export interface StatePhaseInfo {
  stateName: string;
  phase: number;
  date: string;
  status: PhaseStatus;
  registeredVoters?: string;
  eciUrl?: string;
}
