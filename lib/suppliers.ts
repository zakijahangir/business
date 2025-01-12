import { Supplier, ShippingOption } from "@/types"

const SUPPLIER_DATA: Supplier[] = [
  {
    id: "supplier-001",
    name: "Global Supplies Inc.",
    reliabilityScore: 0.95,
    shippingOptions: [
      {
        type: "standard",
        cost: 50,
        days: 5
      },
      {
        type: "express",
        cost: 100,
        days: 2
      }
    ],
    sustainabilityRating: 4.5,
    productCategories: ["electronics", "office supplies"],
    locations: ["US", "CA", "MX"]
  },
  // Additional supplier data...
]

export async function getSupplierData(businessType: string, location: string): Promise<Supplier[]> {
  // Filter suppliers by business type and location
  const filteredSuppliers = SUPPLIER_DATA.filter(supplier =>
    supplier.productCategories.includes(businessType.toLowerCase()) &&
    supplier.locations.includes(location.toUpperCase())
  )

  // Add dynamic reliability score based on location
  return filteredSuppliers.map(supplier => ({
    ...supplier,
    reliabilityScore: calculateLocationReliability(supplier, location)
  }))
}

function calculateLocationReliability(supplier: Supplier, location: string): number {
  // Calculate reliability based on location-specific factors
  const baseScore = supplier.reliabilityScore
  const locationFactor = location === "US" ? 1.0 : 0.9
  return baseScore * locationFactor
}