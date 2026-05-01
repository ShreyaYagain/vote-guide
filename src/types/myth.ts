// src/types/myth.ts
export interface Myth {
  id: string;
  claim: string;
  verdict: boolean; // true = fact, false = myth
  explanation: string;
  source_url: string;
  country_code: string;
}
