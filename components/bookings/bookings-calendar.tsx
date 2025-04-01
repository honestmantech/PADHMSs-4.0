"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { fetchData } from "@/lib/utils"
import { ViewBookingDialog } from "./view-booking-dialog"
import { EditBookingDialog } from "./edit-booking-dialog"
import { DeleteBookingDialog } from "./delete-booking-dialog"

// Setup the localizer
const localizer = momentLocalizer(moment)

export function BookingsCalendar() {
  const [bookings, setBookings] = useState([])
  const [rooms, setRooms] = useState([])
  const [guests, setGuests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  // Fetch bookings, rooms, and guests data
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setIsLoading(true)

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await fetchData("bookings")
        if (bookingsError) throw new Error("Failed to fetch bookings")

        // Fetch rooms
        const { data: roomsData, error: roomsError } = await fetchData("rooms")
        if (roomsError) throw new Error("Failed to fetch rooms")

        // Fetch guests
        const { data: guestsData, error: guestsError } = await fetchData("guests")
        if (guestsError) throw new Error("Failed to fetch guests")

        setBookings(bookingsData || [])
        setRooms(roomsData || [])
        setGuests(guestsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load bookings data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookingsData()
  }, [toast])

  // Format bookings for the calendar
  const calendarEvents = bookings.map((booking) => {
    const room = rooms.find((r) => r.id === booking.room_id) || {}
    const guest = guests.find((g) => g.id === booking.guest_id) || {}

    return {
      id: booking.id,
      title: `${guest.first_name || "Guest"} ${guest.last_name || ""} - Room ${room.room_number || "N/A"}`,
      start: new Date(booking.check_in_date),
      end: new Date(booking.check_out_date),
      resource: booking,
      status: booking.status,
    }
  })

  // Event style based on booking status
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad" // default blue

    switch (event.status) {
      case "confirmed":
        backgroundColor = "#10b981" // green
        break
      case "pending":
        backgroundColor = "#f59e0b" // amber
        break
      case "cancelled":
        backgroundColor = "#ef4444" // red
        break
      case "checked_in":
        backgroundColor = "#6366f1" // indigo
        break
      case "checked_out":
        backgroundColor = "#8b5cf6" // violet
        break
      default:
        backgroundColor = "#3174ad" // default blue
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  // Handle booking selection
  const handleSelectEvent = (event) => {
    setSelectedBooking(event.resource)
    setViewDialogOpen(true)
  }

  // Handle booking update
  const handleBookingUpdate = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await fetchData("bookings")
      if (error) throw new Error("Failed to refresh bookings")

      setBookings(data || [])
      toast({
        title: "Success",
        description: "Bookings updated successfully.",
      })
    } catch (error) {
      console.error("Error refreshing bookings:", error)
      toast({
        title: "Error",
        description: "Failed to refresh bookings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="col-span-3">
      <CardContent className="p-6">
        <div style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            views={["month", "week", "day"]}
            defaultView="month"
            defaultDate={new Date()}
          />
        </div>

        {selectedBooking && (
          <>
            <ViewBookingDialog
              isOpen={viewDialogOpen}
              onClose={() => setViewDialogOpen(false)}
              booking={selectedBooking}
              onEdit={() => {
                setViewDialogOpen(false)
                setEditDialogOpen(true)
              }}
              onDelete={() => {
                setViewDialogOpen(false)
                setDeleteDialogOpen(true)
              }}
              rooms={rooms}
              guests={guests}
            />

            <EditBookingDialog
              isOpen={editDialogOpen}
              onClose={() => setEditDialogOpen(false)}
              booking={selectedBooking}
              rooms={rooms}
              guests={guests}
              onSuccess={() => {
                setEditDialogOpen(false)
                handleBookingUpdate()
              }}
            />

            <DeleteBookingDialog
              isOpen={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              booking={selectedBooking}
              onSuccess={() => {
                setDeleteDialogOpen(false)
                handleBookingUpdate()
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}

