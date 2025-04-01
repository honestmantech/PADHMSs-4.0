import { Suspense } from "react"
import { GuestsHeader } from "@/components/guests/guests-header"
import { GuestsFilters } from "@/components/guests/guests-filters"
import { GuestsTable } from "@/components/guests/guests-table"
import { GuestsTableSkeleton } from "@/components/guests/guests-table-skeleton"
import { GuestsStats } from "@/components/guests/guests-stats"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GuestsGrid } from "@/components/guests/guests-grid"
import { GuestsGridSkeleton } from "@/components/guests/guests-grid-skeleton"

export default function GuestsPage() {
  return (
    <div className="space-y-6">
      <GuestsHeader />

      <GuestsStats />

      <GuestsFilters />

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-0 mt-0">
          <Card className="border shadow-sm overflow-hidden">
            <Suspense fallback={<GuestsTableSkeleton />}>
              <GuestsTable />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="space-y-0 mt-0">
          <Suspense fallback={<GuestsGridSkeleton />}>
            <GuestsGrid />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

