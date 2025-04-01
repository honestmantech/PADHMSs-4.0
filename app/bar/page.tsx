"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BarInventory from "@/components/bar/bar-inventory"
import BarSales from "@/components/bar/bar-sales"
import BarAnalytics from "@/components/bar/bar-analytics"
import BarHeader from "@/components/bar/bar-header"

export default function BarPage() {
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <BarHeader title={`Bar ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} />

      <Tabs defaultValue="inventory" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <BarInventory />
        </TabsContent>
        <TabsContent value="sales">
          <BarSales />
        </TabsContent>
        <TabsContent value="analytics">
          <BarAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

