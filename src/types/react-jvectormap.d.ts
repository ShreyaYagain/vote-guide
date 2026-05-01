declare module 'react-jvectormap' {
  import * as React from 'react'

  export interface VectorMapProps {
    map: string
    backgroundColor?: string
    zoomOnScroll?: boolean
    zoomButtons?: boolean
    containerStyle?: React.CSSProperties
    containerClassName?: string
    regionStyle?: {
      initial?: Record<string, any>
      hover?: Record<string, any>
      selected?: Record<string, any>
      selectedHover?: Record<string, any>
    }
    series?: {
      regions?: Array<{
        values: Record<string, number>
        scale?: string[]
        normalizeFunction?: string
        min?: number
        max?: number
      }>
    }
    selectedRegions?: string[]
    onRegionClick?: (e: any, code: string) => void
    onRegionTipShow?: (e: any, el: any, code: string) => void
    onRegionOver?: (e: any, code: string) => void
    onRegionOut?: (e: any, code: string) => void
    [key: string]: any
  }

  export class VectorMap extends React.Component<VectorMapProps> {}
}
