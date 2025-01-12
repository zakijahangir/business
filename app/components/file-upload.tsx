"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      console.log(data)
      // Handle the response data (e.g., update state to show recommendations)
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".csv,.xlsx"
          className="w-full"
        />
        <Button type="submit" disabled={!file}>
          <Upload className="w-4 h-4 mr-2" />
          Upload and Analyze
        </Button>
      </div>
    </form>
  )
}

