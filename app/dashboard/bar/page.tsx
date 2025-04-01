"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarInventory } from "@/components/bar/bar-inventory"
import { BarSales } from "@/components/bar/bar-sales"
import { BarAnalytics } from "@/components/bar/bar-analytics"
import { BarHeader } from "@/components/bar/bar-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function BarPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <BarHeader />

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <BarInventory />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <BarSales />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <BarAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

