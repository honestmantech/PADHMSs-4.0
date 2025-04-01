"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ViewBookingDialog } from "./view-booking-dialog"
import { EditBookingDialog } from "./edit-booking-dialog"
import { DeleteBookingDialog } from "./delete-booking-dialog"
import { MoreHorizontal, Calendar, BedDouble, User, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data - in a real app, this would come from your API
const bookings = [
  {
    id: "B001",
    guestName: "John Smith",
    guestEmail: "john.smith@example.com",
    roomNumber: "101",
    roomType: "SINGLE",
    checkIn: "2023-04-05",
    checkOut: "2023-04-08",
    status: "CHECKED_IN",
    paymentStatus: "PAID",
    totalAmount: 450,
  },
  {
    id: "B002",
    guestName: "Sarah Johnson",
    guestEmail: "sarah.j@example.com",
    roomNumber: "205",
    roomType: "DOUBLE",
    checkIn: "2023-04-06",
    checkOut: "2023-04-10",
    status: "CONFIRMED",
    paymentStatus: "PARTIALLY_PAID",
    totalAmount: 800,
  },
  {
    id: "B003",
    guestName: "Michael Brown",
    guestEmail: "michael.b@example.com",
    roomNumber: "310",
    roomType: "TWIN",
    checkIn: "2023-04-07",
    checkOut: "2023-04-09",
    status: "PENDING",
    paymentStatus: "UNPAID",
    totalAmount: 350,
  },
  {
    id: "B004",
    guestName: "Emily Davis",
    guestEmail: "emily.d@example.com",
    roomNumber: "402",
    roomType: "SUITE",
    checkIn: "2023-04-04",
    checkOut: "2023-04-07",
    status: "CHECKED_OUT",
    paymentStatus: "PAID",
    totalAmount: 600,
  },
  {
    id: "B005",
    guestName: "Robert Wilson",
    guestEmail: "robert.w@example.com",
    roomNumber: "115",
    roomType: "DELUXE",
    checkIn: "2023-04-08",
    checkOut: "2023-04-12",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    totalAmount: 950,
  },
  {
    id: "B006",
    guestName: "Jennifer Lee",
    guestEmail: "jennifer.l@example.com",
    roomNumber: "203",
    roomType: "DOUBLE",
    checkIn: "2023-04-10",
    checkOut: "2023-04-15",
    status: "PENDING",
    paymentStatus: "UNPAID",
    totalAmount: 750,
  },
  {
    id: "B007",
    guestName: "David Miller",
    guestEmail: "david.m@example.com",
    roomNumber: "301",
    roomType: "SINGLE",
    checkIn: "2023-04-03",
    checkOut: "2023-04-06",
    status: "CHECKED_OUT",
    paymentStatus: "PAID",
    totalAmount: 300,
  },
]

export function BookingsKanban() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const pendingBookings = bookings.filter((booking) => booking.status === "PENDING")
  const confirmedBookings = bookings.filter((booking) => booking.status === "CONFIRMED")
  const checkedInBookings = bookings.filter((booking) => booking.status === "CHECKED_IN")
  const checkedOutBookings = bookings.filter((booking) => booking.status === "CHECKED_OUT")

  const handleView = (booking: any) => {
    setSelectedBooking(booking)
    setShowViewDialog(true)
  }

  const handleEdit = (booking: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedBooking(booking)
    setShowEditDialog(true)
  }

  const handleDelete = (booking: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedBooking(booking)
    setShowDeleteDialog(true)
  }

  const renderBookingCard = (booking: any) => (
    <div
      key={booking.id}
      className="bg-white dark:bg-gray-800 rounded-md shadow-sm border p-3 mb-3 cursor-pointer hover:shadow transition-shadow"
      onClick={() => handleView(booking)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium">{booking.id}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => handleEdit(booking, e)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={(e) => handleDelete(booking, e)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">
            {booking.guestName
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{booking.guestName}</div>
          <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div className="flex items-center gap-1">
          <BedDouble className="h-3 w-3 text-muted-foreground" />
          <span>Room {booking.roomNumber}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-3 w-3 text-muted-foreground" />
          <span>{booking.roomType}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs mb-2">
        <Calendar className="h-3 w-3 text-muted-foreground" />
        <span>
          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={
            booking.paymentStatus === "PAID"
              ? "bg-green-50 text-green-700 border-green-200"
              : booking.paymentStatus === "PARTIALLY_PAID"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-red-50 text-red-700 border-red-200"
          }
        >
          {booking.paymentStatus.replace("_", " ")}
        </Badge>
        <div className="text-sm font-medium">₵{booking.totalAmount}</div>
      </div>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <Card className="shadow-sm">
            <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                Pending
                <Badge variant="outline" className="ml-auto">
                  {pendingBookings.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {pendingBookings.map(renderBookingCard)}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                Confirmed
                <Badge variant="outline" className="ml-auto">
                  {confirmedBookings.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {confirmedBookings.map(renderBookingCard)}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm">
            <CardHeader className="bg-green-50 dark:bg-green-900/20 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                Checked In
                <Badge variant="outline" className="ml-auto">
                  {checkedInBookings.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {checkedInBookings.map(renderBookingCard)}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                Checked Out
                <Badge variant="outline" className="ml-auto">
                  {checkedOutBookings.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {checkedOutBookings.map(renderBookingCard)}
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedBooking && (
        <>
          <ViewBookingDialog open={showViewDialog} onOpenChange={setShowViewDialog} booking={selectedBooking} />
          <EditBookingDialog open={showEditDialog} onOpenChange={setShowEditDialog} booking={selectedBooking} />
          <DeleteBookingDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} booking={selectedBooking} />
        </>
      )}
    </>
  )
}

