"use client";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { detectCountry } from "@/lib/geo";
import { CountryData } from "@/types/country";

export function useCountry() {
  const { country: selectedCode, setCountry } = useUserStore();
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-detect country on first load if not already set
  useEffect(() => {
    async function autoDetect() {
      const stored = localStorage.getItem("voteguide-user");
      if (!stored) {
        const detected = await detectCountry();
        if (detected && ["IN", "US", "UK", "AU"].includes(detected.country)) {
          setCountry(detected.country);
        }
      }
    }
    autoDetect();
  }, [setCountry]);

  // Load country data whenever selectedCode changes
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // In a real Next.js app, you'd probably fetch this from an API 
        // or import it directly if it's small.
        // For simplicity, we'll use dynamic imports.
        const data = await import(`@/data/countries/${selectedCode}.json`);
        setCountryData(data.default);
        setError(null);
      } catch (err) {
        console.error("Failed to load country data:", err);
        setError("Country data not found");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCode]);

  return { countryData, loading, error, selectedCode };
}
