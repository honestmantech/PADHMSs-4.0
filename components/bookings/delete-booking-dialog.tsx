"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { deleteData } from "@/lib/real-time-data"

export function DeleteBookingDialog({
  open,
  onOpenChange,
  booking,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: any
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Delete from database
      const result = await deleteData("bookings", booking.id)

      if (result.success) {
        toast({
          title: "Booking deleted",
          description: `Booking for ${booking.guestName} has been deleted successfully.`,
        })

        // Close dialog
        onOpenChange(false)
      } else {
        throw new Error("Failed to delete booking")
      }
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Booking {booking?.id}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this booking? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="rounded-md bg-red-50 p-4 border border-red-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Warning</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Deleting this booking will permanently remove it from the system. Any associated data, including
                    payment records, will also be deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-muted p-4">
            <div className="text-sm">
              <div className="font-medium">Booking details:</div>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>Guest: {booking?.guestName}</li>
                <li>Room: {booking?.roomNumber}</li>
                <li>
                  Dates: {booking?.checkIn && new Date(booking.checkIn).toLocaleDateString()} -{" "}
                  {booking?.checkOut && new Date(booking.checkOut).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 bg-muted/50">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="transition-all duration-200 hover:bg-red-600"
            disabled={isDeleting}
          >
            Delete Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

