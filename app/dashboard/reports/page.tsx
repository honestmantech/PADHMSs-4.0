import { Suspense } from "react"
import { ReportsHeader } from "@/components/reports/reports-header"
import { ReportsFilters } from "@/components/reports/reports-filters"
import { RevenueReport } from "@/components/reports/revenue-report"
import { OccupancyReport } from "@/components/reports/occupancy-report"
import { GuestReport } from "@/components/reports/guest-report"
import { ReportsSkeleton } from "@/components/reports/reports-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <ReportsHeader />

      <ReportsFilters />

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="guests">Guest Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-0 mt-0">
          <Suspense fallback={<ReportsSkeleton />}>
            <RevenueReport />
          </Suspense>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-0 mt-0">
          <Suspense fallback={<ReportsSkeleton />}>
            <OccupancyReport />
          </Suspense>
        </TabsContent>

        <TabsContent value="guests" className="space-y-0 mt-0">
          <Suspense fallback={<ReportsSkeleton />}>
            <GuestReport />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

