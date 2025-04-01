"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ReportsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View and export hotel performance reports</p>
      </div>
      <Button className="sm:w-auto w-full">
        <Download className="mr-2 h-4 w-4" />
        Export Report
      </Button>
    </div>
  )
}

