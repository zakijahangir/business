import { ProductAnalysis } from "@/types"

const COMPETITOR_DATA = [
  {
    productCategory: "electronics",
    competitors: [
      {
        name: "TechWorld",
        pricing: {
          low: 100,
          average: 120,
          high: 150
        },
        marketShare: 0.3
      },
      {
        name: "GadgetHub",
        pricing: {
          low: 90,
          average: 110,
          high: 130
        },
        marketShare: 0.25
      }
    ]
  },
  {
    productCategory: "office supplies",
    competitors: [
      {
        name: "OfficeMax",
        pricing: {
          low: 20,
          average: 25,
          high: 30
        },
        marketShare: 0.4
      },
      {
        name: "SupplyCo",
        pricing: {
          low: 18,
          average: 22,
          high: 28
        },
        marketShare: 0.35
      }
    ]
  }
]

export async function analyzeCompetitors(businessType: string, location: string) {
  // Find competitors for the business type
  const categoryData = COMPETITOR_DATA.find(
    data => data.productCategory === businessType.toLowerCase()
  )

  if (!categoryData) {
    return {
      averagePricing: {
        low: 0,
        average: 0,
        high: 0
      },
      marketTrends: []
    }
  }

  // Calculate average pricing across competitors
  const pricing = categoryData.competitors.reduce(
    (acc, competitor) => {
      acc.low += competitor.pricing.low
      acc.average += competitor.pricing.average
      acc.high += competitor.pricing.high
      return acc
    },
    { low: 0, average: 0, high: 0 }
  )

  const competitorCount = categoryData.competitors.length
  const averagePricing = {
    low: pricing.low / competitorCount,
    average: pricing.average / competitorCount,
    high: pricing.high / competitorCount
  }

  // Get market trends
  const marketTrends = categoryData.competitors.map(competitor => ({
    name: competitor.name,
    marketShare: competitor.marketShare,
    pricing: competitor.pricing
  }))

  return {
    averagePricing,
    marketTrends
  }
}
