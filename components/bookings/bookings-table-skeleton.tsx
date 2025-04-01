import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function BookingsTableSkeleton() {
  return (
    <Table className="border rounded-md overflow-hidden">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="font-medium">Booking ID</TableHead>
          <TableHead className="font-medium">Guest</TableHead>
          <TableHead className="font-medium">Room</TableHead>
          <TableHead className="font-medium">Check In</TableHead>
          <TableHead className="font-medium">Check Out</TableHead>
          <TableHead className="font-medium">Status</TableHead>
          <TableHead className="font-medium">Payment</TableHead>
          <TableHead className="text-right font-medium">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12 mb-1" />
                <Skeleton className="h-3 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-8 rounded-full ml-auto" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

