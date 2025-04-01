import { Suspense } from "react"
import { BookingsCalendar } from "@/components/bookings/bookings-calendar"
import { BookingsTable } from "@/components/bookings/bookings-table"
import { BookingsHeader } from "@/components/bookings/bookings-header"
import { BookingsFilters } from "@/components/bookings/bookings-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BookingsTableSkeleton } from "@/components/bookings/bookings-table-skeleton"
import { BookingsCalendarSkeleton } from "@/components/bookings/bookings-calendar-skeleton"
import { BookingsStats } from "@/components/bookings/bookings-stats"
import { BookingsKanban } from "@/components/bookings/bookings-kanban"
import { BookingsKanbanSkeleton } from "@/components/bookings/bookings-kanban-skeleton"

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <BookingsHeader />

      <BookingsStats />

      <Tabs defaultValue="list" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="list" className="flex-1 sm:flex-initial">
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1 sm:flex-initial">
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex-1 sm:flex-initial">
              Kanban View
            </TabsTrigger>
          </TabsList>
          <BookingsFilters />
        </div>

        <TabsContent value="list" className="space-y-0 mt-0">
          <Card className="border shadow-sm overflow-hidden">
            <Suspense fallback={<BookingsTableSkeleton />}>
              <BookingsTable />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-0 mt-0">
          <Suspense fallback={<BookingsCalendarSkeleton />}>
            <BookingsCalendar />
          </Suspense>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-0 mt-0">
          <Suspense fallback={<BookingsKanbanSkeleton />}>
            <BookingsKanban />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

