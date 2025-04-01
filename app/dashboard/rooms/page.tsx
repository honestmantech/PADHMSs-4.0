import { Suspense } from "react"
import { RoomsTable } from "@/components/rooms/rooms-table"
import { RoomsTableSkeleton } from "@/components/rooms/rooms-table-skeleton"
import { RoomsHeader } from "@/components/rooms/rooms-header"
import { RoomsFilters } from "@/components/rooms/rooms-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomsGrid } from "@/components/rooms/rooms-grid"
import { RoomsGridSkeleton } from "@/components/rooms/rooms-grid-skeleton"
import { RoomsStats } from "@/components/rooms/rooms-stats"
import { Card } from "@/components/ui/card"

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <RoomsHeader />

      <RoomsStats />

      <RoomsFilters />

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-0 mt-0">
          <Card className="border shadow-sm overflow-hidden">
            <Suspense fallback={<RoomsTableSkeleton />}>
              <RoomsTable />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="space-y-0 mt-0">
          <Suspense fallback={<RoomsGridSkeleton />}>
            <RoomsGrid />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

