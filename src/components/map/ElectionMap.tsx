'use client'
import React, { useMemo, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

// Load topojson directly
import topoData from '../../../public/maps/india.topo.json'

const phaseData: Record<string, { phase: number; date: string }> = {
  'KA': { phase: 2, date: 'Apr 26, 2026' },
  'KL': { phase: 2, date: 'Apr 26, 2026' },
  'AP': { phase: 2, date: 'Apr 26, 2026' },
  'TG': { phase: 2, date: 'Apr 26, 2026' },
  'MH': { phase: 3, date: 'May 7, 2026'  },
  'GA': { phase: 3, date: 'May 7, 2026'  },
  'RJ': { phase: 4, date: 'May 13, 2026' },
  'UP': { phase: 4, date: 'May 13, 2026' },
  'PB': { phase: 5, date: 'May 20, 2026' },
  'HP': { phase: 5, date: 'May 20, 2026' },
  'DL': { phase: 6, date: 'May 25, 2026' },
  'HR': { phase: 6, date: 'May 25, 2026' },
  'WB': { phase: 7, date: 'Jun 1, 2026'  },
  'TN': { phase: 7, date: 'Jun 1, 2026'  },
  'BR': { phase: 1, date: 'Apr 19, 2026' },
  'AS': { phase: 1, date: 'Apr 19, 2026' },
}

// Colour scale: phase 1–7 → deeper saffron
const phaseColors: Record<number, string> = {
  1: '#138808', // green  – phase 1
  2: '#FF9933', // saffron
  3: '#FFA94D',
  4: '#FFB870',
  5: '#FFCC99',
  6: '#FFE0B2',
  7: '#FFF3E0',
}

interface ElectionMapProps {
  onStateClick?: (code: string, name: string) => void
  highlightedState?: string | null
}

interface PathData {
  code: string;
  name: string;
  d: string;
  fillColor: string;
  phaseInfo?: { phase: number; date: string };
}

export default function ElectionMap({ onStateClick, highlightedState }: ElectionMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  
  const { paths, projection } = useMemo(() => {
    // @ts-ignore - The structure is known
    const features = feature(topoData, topoData.objects.india).features
    
    // Create a projection tailored for India's coordinates
    const projection = geoMercator()
      .center([82.8, 23.5]) // Center of India
      .scale(850)
      .translate([250, 260]) // Adjust to fit in a 500x520 box
      
    const pathGenerator = geoPath().projection(projection)
    
    const paths: PathData[] = features.map((f: any) => {
      const code = f.id // e.g. "KA", "MH"
      const name = f.properties.name
      const phaseInfo = phaseData[code]
      
      let fillColor = '#F0EAD6' // default color
      if (phaseInfo && phaseColors[phaseInfo.phase]) {
        fillColor = phaseColors[phaseInfo.phase]
      }
      
      return {
        code,
        name,
        d: pathGenerator(f) || '',
        fillColor,
        phaseInfo
      }
    })
    
    return { paths, projection }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '420px', position: 'relative' }}>
      <svg
        viewBox="0 0 500 520"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}
      >
        <g stroke="#D4C4A0" strokeWidth="0.5" strokeLinejoin="round" strokeLinecap="round">
          {paths.map((p: PathData) => {
            const isHovered = hoveredRegion === p.code
            const isHighlighted = highlightedState === p.name || highlightedState === p.code || highlightedState === `IN-${p.code}`
            return (
              <path
                key={p.code}
                d={p.d}
                fill={isHovered ? '#FF9933' : isHighlighted ? '#FF9933' : p.fillColor}
                stroke={isHighlighted ? '#FFFFFF' : '#D4C4A0'}
                strokeWidth={isHighlighted ? "1.5" : "0.5"}
                style={{
                  cursor: 'pointer',
                  transition: 'fill 0.2s ease, filter 0.2s ease',
                  opacity: isHovered || isHighlighted ? 0.95 : 1,
                  filter: isHovered || isHighlighted ? 'brightness(1.1) drop-shadow(0 0 4px rgba(255,153,51,0.5))' : 'none'
                }}
                onMouseEnter={() => setHoveredRegion(p.code)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => {
                  if (onStateClick) {
                    onStateClick('IN-' + p.code, p.name || p.code)
                  }
                }}
              />
            )
          })}
        </g>
      </svg>
      
      {/* Tooltip implementation */}
      {hoveredRegion && (
        <div 
          className="absolute bg-navy text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full"
          style={{
            // A simple fixed position or we could track mouse. For simplicity, placing near top right or bottom left.
            // Better yet, just display it at the bottom of the map container
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {(() => {
            const p = paths.find((x: PathData) => x.code === hoveredRegion)
            if (!p) return null
            return (
              <div className="text-center">
                <p className="font-bold">{p.name || p.code}</p>
                {p.phaseInfo ? (
                  <p className="text-cream">Phase {p.phaseInfo.phase} — {p.phaseInfo.date}</p>
                ) : (
                  <p className="text-cream/70">No phase data</p>
                )}
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

