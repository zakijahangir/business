import { Supplier, ProductAnalysis } from "@/types"

const SUSTAINABILITY_FACTORS = {
  materials: {
    weight: 0.4,
    scores: {
      recycled: 0.9,
      renewable: 0.8,
      conventional: 0.5
    }
  },
  transportation: {
    weight: 0.3,
    scores: {
      local: 0.9,
      regional: 0.7,
      international: 0.5
    }
  },
  packaging: {
    weight: 0.2,
    scores: {
      biodegradable: 0.9,
      recyclable: 0.7,
      conventional: 0.4
    }
  },
  energyUse: {
    weight: 0.1,
    scores: {
      renewable: 0.9,
      mixed: 0.6,
      conventional: 0.3
    }
  }
}

export function calculateSustainabilityScore(product: ProductAnalysis): number {
  // Get supplier data (simplified for example)
  const supplier = getSupplierById(product.alternativeProduct)
  
  // Calculate individual scores
  const materialScore = SUSTAINABILITY_FACTORS.materials.scores.recycled // Example
  const transportScore = calculateTransportScore(product)
  const packagingScore = SUSTAINABILITY_FACTORS.packaging.scores.recyclable // Example
  const energyScore = SUSTAINABILITY_FACTORS.energyUse.scores.mixed // Example

  // Calculate weighted score
  return (
    materialScore * SUSTAINABILITY_FACTORS.materials.weight +
    transportScore * SUSTAINABILITY_FACTORS.transportation.weight +
    packagingScore * SUSTAINABILITY_FACTORS.packaging.weight +
    energyScore * SUSTAINABILITY_FACTORS.energyUse.weight
  )
}

function calculateTransportScore(product: ProductAnalysis): number {
  // Simplified transport score calculation
  const shippingDistance = product.shippingCost > 75 ? 'international' :
                          product.shippingCost > 50 ? 'regional' : 'local'
  return SUSTAINABILITY_FACTORS.transportation.scores[shippingDistance]
}

function getSupplierById(productId: string): Supplier {
  // Simplified supplier lookup
  return {
    id: "supplier-001",
    name: "Eco Supplies Inc.",
    reliabilityScore: 0.95,
    shippingOptions: [],
    sustainabilityRating: 4.5,
    productCategories: [],
    locations: []
  }
}