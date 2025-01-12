import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  // Read the file content
  const fileContent = await file.text()

  // Use AI to analyze the product list
  const analysis = await generateText({
    model: openai("gpt-4o"),
    prompt: `Analyze the following product list and suggest cost-effective alternatives. Consider product quality, supplier reliability, shipping costs, and compatibility with existing systems. Also provide overall business expense insights.

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
      "compatibilityScore": 0.85
    }
  ],
  "businessInsights": [
    {
      "category": "Category Name",
      "recommendation": "Recommendation description",
      "potentialImpact": "Potential impact description"
    }
  ]
}`,
  })

  // Parse the AI-generated analysis
  const parsedAnalysis = JSON.parse(analysis.text)

  return NextResponse.json(parsedAnalysis)
}

