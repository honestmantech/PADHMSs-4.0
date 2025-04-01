"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function BarHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bar Management</h1>
        <p className="text-muted-foreground">Manage your hotel's bar inventory, sales, and analytics</p>
      </div>
      <Button className="flex items-center gap-1">
        <PlusCircle className="h-4 w-4" />
        <span>Add Item</span>
      </Button>
    </div>
  )
}

// Add default export that points to the same component
export default BarHeader

