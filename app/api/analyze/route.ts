import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { getSupplierData } from "@/lib/suppliers"
import { calculateSustainabilityScore } from "@/lib/sustainability"
import { analyzeCompetitors } from "@/lib/competitors"
import { calculateDynamicPricing } from "@/lib/pricing"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const businessType = formData.get("businessType") as string
  const location = formData.get("location") as string

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  // Read the file content
  const fileContent = await file.text()

  // Get supplier data
  const suppliers = await getSupplierData(businessType, location)
  
  // Get competitor analysis
  const competitors = await analyzeCompetitors(businessType, location)

  // Use AI to analyze the product list
  const analysis = await generateText({
    model: google("gemini-pro"),
    prompt: `Analyze the following product list and suggest cost-effective alternatives. Consider:
- Product quality
- Supplier reliability
- Shipping costs
- Compatibility with existing systems
- Competitor pricing (${JSON.stringify(competitors)})
- Sustainability factors

Product List:
${fileContent}

Provide your analysis in the following JSON format:
{
  "recommendations": [
    {
      "currentProduct": "Product Name",
      "alternativeProduct": "Alternative Product Name",
      "potentialSavings": 1000,
      "qualityScore": 0.9,
      "supplierReliability": 0.95,
      "shippingCost": 50,
      "compatibilityScore": 0.85,
      "sustainabilityScore": 0.8,
      "competitorPricing": {
        "lowest": 100,
        "average": 120,
        "highest": 150
      }
    }
  ],
  "businessInsights": [
    {
      "category": "Category Name",
      "recommendation": "Recommendation description",
      "potentialImpact": "Potential impact description",
      "dynamicPricing": {
        "optimalPrice": 110,
        "priceRange": [100, 120]
      }
    }
  ],
  "costSavings": {
    "totalPotentialSavings": 5000,
    "breakdown": [
      {
        "category": "Shipping",
        "savings": 1000
      },
      {
        "category": "Suppliers",
        "savings": 2000
      },
      {
        "category": "Inventory",
        "savings": 2000
      }
    ]
  }
}`,
  })

  // Parse the AI-generated analysis
  const parsedAnalysis = JSON.parse(analysis.text)

  // Add dynamic pricing recommendations
  parsedAnalysis.businessInsights = parsedAnalysis.businessInsights.map(
    (insight: any) => ({
      ...insight,
      dynamicPricing: calculateDynamicPricing(insight, competitors)
    })
  )

  // Add sustainability scores
  parsedAnalysis.recommendations = parsedAnalysis.recommendations.map(
    (rec: any) => ({
      ...rec,
      sustainabilityScore: calculateSustainabilityScore(rec)
    })
  )

  return NextResponse.json(parsedAnalysis)
}
