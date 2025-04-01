import { Suspense } from "react"
import { PaymentsHeader } from "@/components/payments/payments-header"
import { PaymentsFilters } from "@/components/payments/payments-filters"
import { PaymentsTable } from "@/components/payments/payments-table"
import { PaymentsTableSkeleton } from "@/components/payments/payments-table-skeleton"
import { PaymentsStats } from "@/components/payments/payments-stats"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsChart } from "@/components/payments/payments-chart"
import { PaymentsChartSkeleton } from "@/components/payments/payments-chart-skeleton"

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PaymentsHeader />

      <PaymentsStats />

      <PaymentsFilters />

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-0 mt-0">
          <Card className="border shadow-sm overflow-hidden">
            <Suspense fallback={<PaymentsTableSkeleton />}>
              <PaymentsTable />
            </Suspense>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-0 mt-0">
          <Suspense fallback={<PaymentsChartSkeleton />}>
            <PaymentsChart />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

