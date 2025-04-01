import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BookingsKanbanSkeleton() {
  const renderColumn = (title: string, count: number) => (
    <div>
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            {title}
            <Badge variant="outline" className="ml-auto">
              {count}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {Array(count)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-md shadow-sm border p-3 mb-3">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>

                <Skeleton className="h-3 w-full mb-2" />

                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {renderColumn("Pending", 2)}
      {renderColumn("Confirmed", 2)}
      {renderColumn("Checked In", 1)}
      {renderColumn("Checked Out", 1)}
    </div>
  )
}

