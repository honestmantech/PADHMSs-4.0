"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { AddBookingDialog } from "./add-booking-dialog"

export function BookingsHeader() {
  const [showAddBooking, setShowAddBooking] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground mt-1">Manage reservations, check-ins, and check-outs.</p>
      </div>
      <Button
        onClick={() => setShowAddBooking(true)}
        className="sm:self-start transition-all duration-200 hover:shadow-md"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Booking
      </Button>

      <AddBookingDialog open={showAddBooking} onOpenChange={setShowAddBooking} />
    </div>
  )
}

