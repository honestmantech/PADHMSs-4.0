import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BookingsCalendarSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4 mr-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full md:hidden" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="md:col-span-5">
          <Card className="border shadow-sm overflow-hidden">
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-1">
                {/* Calendar header */}
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={`header-${i}`} className="h-8 w-full" />
                  ))}

                {/* Calendar days */}
                {Array(35)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={`day-${i}`} className="h-10 w-full rounded" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full border shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={`event-${i}`} className="h-20 w-full rounded-lg" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

