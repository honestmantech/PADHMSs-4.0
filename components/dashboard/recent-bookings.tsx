"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

// Sample data - in a real app, this would come from your API
const bookings = [
  {
    id: "B001",
    guestName: "John Smith",
    roomNumber: "101",
    checkIn: "2023-04-05",
    checkOut: "2023-04-08",
    status: "CHECKED_IN",
    amount: 450,
  },
  {
    id: "B002",
    guestName: "Sarah Johnson",
    roomNumber: "205",
    checkIn: "2023-04-06",
    checkOut: "2023-04-10",
    status: "CONFIRMED",
    amount: 800,
  },
  {
    id: "B003",
    guestName: "Michael Brown",
    roomNumber: "310",
    checkIn: "2023-04-07",
    checkOut: "2023-04-09",
    status: "PENDING",
    amount: 350,
  },
  {
    id: "B004",
    guestName: "Emily Davis",
    roomNumber: "402",
    checkIn: "2023-04-04",
    checkOut: "2023-04-07",
    status: "CHECKED_OUT",
    amount: 600,
  },
  {
    id: "B005",
    guestName: "Robert Wilson",
    roomNumber: "115",
    checkIn: "2023-04-08",
    checkOut: "2023-04-12",
    status: "CONFIRMED",
    amount: 950,
  },
]

export function RecentBookings() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CHECKED_IN":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "CHECKED_OUT":
        return <XCircle className="h-4 w-4 text-gray-500" />
      case "CONFIRMED":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "PENDING":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CHECKED_IN":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Checked In
          </Badge>
        )
      case "CHECKED_OUT":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Checked Out
          </Badge>
        )
      case "CONFIRMED":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Confirmed
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-6 p-3 bg-muted/50 text-sm font-medium">
        <div>Guest</div>
        <div>Room</div>
        <div>Check In</div>
        <div>Check Out</div>
        <div>Status</div>
        <div className="text-right">Amount</div>
      </div>
      <div className="divide-y">
        {bookings.map((booking) => (
          <div key={booking.id} className="grid grid-cols-6 p-3 text-sm items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {booking.guestName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">{booking.guestName}</div>
            </div>
            <div>{booking.roomNumber}</div>
            <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
            <div>{new Date(booking.checkOut).toLocaleDateString()}</div>
            <div className="flex items-center gap-2">
              {getStatusIcon(booking.status)}
              {getStatusBadge(booking.status)}
            </div>
            <div className="text-right font-medium">₵{booking.amount}</div>
          </div>
        ))}
      </div>
      <div className="p-3 flex justify-center">
        <Button variant="outline" size="sm">
          View All Bookings
        </Button>
      </div>
    </div>
  )
}

