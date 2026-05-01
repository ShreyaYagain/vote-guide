"use client";
import { useUserStore } from "@/store/userStore";

const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];

export default function CountrySelector() {
  const { country, setCountry } = useUserStore();

  return (
    <select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="bg-surface-card border border-surface-border rounded-component px-3 py-1.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors cursor-pointer"
      aria-label="Select Country"
    >
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.code}
        </option>
      ))}
    </select>
  );
}
