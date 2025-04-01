import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BarInventory from "@/components/bar/bar-inventory"
import BarSales from "@/components/bar/bar-sales"
import BarAnalytics from "@/components/bar/bar-analytics"
import BarHeader from "@/components/bar/bar-header"

export const metadata: Metadata = {
  title: "Bar Management",
  description: "Manage your hotel's bar inventory, sales, and analytics",
}

export default function BarPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <BarHeader />
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="w-full">
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

