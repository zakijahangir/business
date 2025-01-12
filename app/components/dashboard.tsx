"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Recommendation = {
  id: string
  currentProduct: string
  alternativeProduct: string
  potentialSavings: number
  qualityScore: number
  supplierReliability: number
  shippingCost: number
  compatibilityScore: number
}

type BusinessInsight = {
  id: string
  category: string
  recommendation: string
  potentialImpact: string
}

export function Dashboard() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [businessInsights, setBusinessInsights] = useState<BusinessInsight[]>([])
  const [totalSavings, setTotalSavings] = useState(0)

  // Placeholder function to fetch recommendations and insights
  const fetchRecommendationsAndInsights = async () => {
    // In a real application, this would make an API call to get the data
    // For now, we'll use mock data
    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        currentProduct: "Product A",
        alternativeProduct: "Product X",
        potentialSavings: 1000,
        qualityScore: 0.9,
        supplierReliability: 0.95,
        shippingCost: 50,
        compatibilityScore: 0.85,
      },
      {
        id: "2",
        currentProduct: "Product B",
        alternativeProduct: "Product Y",
        potentialSavings: 750,
        qualityScore: 0.85,
        supplierReliability: 0.9,
        shippingCost: 75,
        compatibilityScore: 0.9,
      },
    ]

    const mockInsights: BusinessInsight[] = [
      {
        id: "1",
        category: "Supplier Management",
        recommendation: "Renegotiate contract with Supplier Z",
        potentialImpact: "10% cost reduction on raw materials",
      },
      {
        id: "2",
        category: "Energy Efficiency",
        recommendation: "Upgrade to energy-efficient lighting",
        potentialImpact: "15% reduction in energy costs",
      },
    ]

    setRecommendations(mockRecommendations)
    setBusinessInsights(mockInsights)
    setTotalSavings(
      mockRecommendations.reduce((sum, rec) => sum + rec.potentialSavings, 0)
    )
  }

  return (
    <div className="space-y-6">
      <Button onClick={fetchRecommendationsAndInsights}>
        Fetch Recommendations and Insights
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Cost Savings Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            Total Potential Savings: ${totalSavings.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Current Product</TableHead>
                <TableHead>Alternative Product</TableHead>
                <TableHead>Potential Savings</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>Supplier Reliability</TableHead>
                <TableHead>Shipping Cost</TableHead>
                <TableHead>Compatibility Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendations.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>{rec.currentProduct}</TableCell>
                  <TableCell>{rec.alternativeProduct}</TableCell>
                  <TableCell>${rec.potentialSavings.toLocaleString()}</TableCell>
                  <TableCell>{(rec.qualityScore * 100).toFixed(0)}%</TableCell>
                  <TableCell>{(rec.supplierReliability * 100).toFixed(0)}%</TableCell>
                  <TableCell>${rec.shippingCost.toLocaleString()}</TableCell>
                  <TableCell>{(rec.compatibilityScore * 100).toFixed(0)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Potential Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessInsights.map((insight) => (
                <TableRow key={insight.id}>
                  <TableCell>{insight.category}</TableCell>
                  <TableCell>{insight.recommendation}</TableCell>
                  <TableCell>{insight.potentialImpact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

