// src/lib/geo.ts
// Uses ip-api.com — no API key, no signup required.
// Free tier: 45 req/min.

export interface GeoResult {
  country: string; // ISO code e.g. "IN"
  countryName: string;
  regionName: string;
  city: string;
}

export async function detectCountry(): Promise<GeoResult | null> {
  try {
    const res = await fetch("http://ip-api.com/json/?fields=country,countryCode,regionName,city", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      country: data.countryCode ?? "IN",
      countryName: data.country ?? "India",
      regionName: data.regionName ?? "",
      city: data.city ?? "",
    };
  } catch {
    return null;
  }
}

/**
 * Detects the user's city/region on first load and maps it to an Indian state automatically.
 * Returns the region name (e.g., "Karnataka", "Maharashtra").
 */
export async function detectUserState(): Promise<string | null> {
  try {
    const res = await fetch('http://ip-api.com/json/?fields=status,regionName,city')
    const data = await res.json()
    console.log('GEO DETECTION RESULT:', data) // Debug log
    if (data.status === 'success' && data.regionName) {
      return data.regionName // returns "Karnataka", "Maharashtra" etc
    }
    return null
  } catch {
    return null
  }
}
