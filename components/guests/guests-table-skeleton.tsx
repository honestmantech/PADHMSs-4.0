import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function GuestsTableSkeleton() {
  return (
    <Table className="border rounded-md overflow-hidden">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="font-medium">Guest</TableHead>
          <TableHead className="font-medium">Contact</TableHead>
          <TableHead className="font-medium">ID</TableHead>
          <TableHead className="font-medium">Status</TableHead>
          <TableHead className="font-medium">Stays</TableHead>
          <TableHead className="font-medium">Total Spent</TableHead>
          <TableHead className="font-medium">Last Stay</TableHead>
          <TableHead className="text-right font-medium">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
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

