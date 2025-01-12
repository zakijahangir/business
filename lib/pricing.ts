import { BusinessInsight, Competitor } from "@/types"

const PRICING_STRATEGIES = {
  competitive: {
    weight: 0.4,
    adjustment: -0.05 // 5% below average
  },
  premium: {
    weight: 0.3,
    adjustment: 0.1 // 10% above average
  },
  value: {
    weight: 0.3,
    adjustment: -0.1 // 10% below average
  }
}

export function calculateDynamicPricing(
  insight: BusinessInsight,
  competitors: { averagePricing: { low: number, average: number, high: number } }
) {
  const basePrice = competitors.averagePricing.average
  
  // Calculate optimal price based on strategy weights
  const competitivePrice = basePrice * (1 + PRICING_STRATEGIES.competitive.adjustment)
  const premiumPrice = basePrice * (1 + PRICING_STRATEGIES.premium.adjustment)
  const valuePrice = basePrice * (1 + PRICING_STRATEGIES.value.adjustment)

  // Determine optimal price based on category and market conditions
  const optimalPrice = calculateOptimalPrice(insight.category, {
    competitive: competitivePrice,
    premium: premiumPrice,
    value: valuePrice
  })

  // Calculate price range based on competitor pricing
  const priceRange: [number, number] = [
    Math.max(competitors.averagePricing.low * 0.9, optimalPrice * 0.9),
    Math.min(competitors.averagePricing.high * 1.1, optimalPrice * 1.1)
  ]

  return {
    optimalPrice: parseFloat(optimalPrice.toFixed(2)),
    priceRange: [
      parseFloat(priceRange[0].toFixed(2)),
      parseFloat(priceRange[1].toFixed(2))
    ]
  }
}

function calculateOptimalPrice(category: string, prices: { competitive: number, premium: number, value: number }) {
  // Category-specific pricing strategies
  switch (category.toLowerCase()) {
    case 'electronics':
      return prices.competitive * 0.6 + prices.premium * 0.4
    case 'office supplies':
      return prices.value * 0.7 + prices.competitive * 0.3
    default:
      return prices.competitive
  }
}