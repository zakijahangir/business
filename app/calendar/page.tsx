"use client"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Styled Calendar</h1>
      <div className="max-w-[400px] mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
    </div>
  )
}