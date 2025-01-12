export interface Supplier {
  id: string
  name: string
  reliabilityScore: number
  shippingOptions: ShippingOption[]
  sustainabilityRating: number
  productCategories: string[]
  locations: string[]
}

export interface ShippingOption {
  type: string
  cost: number
  days: number
}

export interface ProductAnalysis {
  currentProduct: string
  alternativeProduct: string
  potentialSavings: number
  qualityScore: number
  supplierReliability: number
  shippingCost: number
  compatibilityScore: number
  sustainabilityScore: number
  competitorPricing: {
    lowest: number
    average: number
    highest: number
  }
}

export interface BusinessInsight {
  category: string
  recommendation: string
  potentialImpact: string
  dynamicPricing: {
    optimalPrice: number
    priceRange: [number, number]
  }
}

export interface CostSavings {
  totalPotentialSavings: number
  breakdown: Array<{
    category: string
    savings: number
  }>
}

export interface Competitor {
  name: string
  pricing: {
    low: number
    average: number
    high: number
  }
  marketShare: number
}