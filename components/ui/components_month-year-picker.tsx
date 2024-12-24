'use client'

import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

// Add month number mapping
const months = [
  { name: 'January', number: '1' },
  { name: 'February', number: '2' },
  { name: 'March', number: '3' },
  { name: 'April', number: '4' },
  { name: 'May', number: '5' },
  { name: 'June', number: '6' },
  { name: 'July', number: '7' },
  { name: 'August', number: '8' },
  { name: 'September', number: '9' },
  { name: 'October', number: '10' },
  { name: 'November', number: '11' },
  { name: 'December', number: '12' }
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

interface MonthYearPickerProps {
  onChange: (month: string, year: string) => void
}

export function MonthYearPicker({ onChange }: MonthYearPickerProps) {
  const currentMonth = months[new Date().getMonth()]
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear.toString())

  useEffect(() => {
    // Pass the month number instead of the month name
    onChange(selectedMonth.number, year)
  }, [selectedMonth, year, onChange])

  return (
      <Card className="w-[300px]">
        <CardHeader className="flex text-center w-full flex-row items-center justify-center space-y-0 gap-4">
          <Calendar className="h-4 w-4 text-muted-foreground"/>
          <span className="text-lg font-semibold">{selectedMonth.name}</span>
          <span className="text-lg font-semibold">{year}</span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Select
                value={selectedMonth.name}
                onValueChange={(value) => {
                  const month = months.find(m => m.name === value)
                  if (month) setSelectedMonth(month)
                }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                    <SelectItem key={m.number} value={m.name}>
                      {m.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
  )
}