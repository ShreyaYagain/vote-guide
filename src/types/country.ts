// src/types/country.ts
export interface ElectionPhase {
  phase: number;
  date: string; // YYYY-MM-DD
  states: string[];
}

export interface Deadline {
  label: string;
  date: string; // YYYY-MM-DD or "dynamic"
  done_by_default: boolean;
  url?: string;
}

export interface Eligibility {
  min_age: number;
  citizenship: string;
  id_required: string[];
}

export interface CountryData {
  code: string;
  name: string;
  election_name: string;
  ec_url: string;
  flag: string;
  phases: ElectionPhase[];
  deadlines: Deadline[];
  eligibility: Eligibility;
  ai_context: string;
}
