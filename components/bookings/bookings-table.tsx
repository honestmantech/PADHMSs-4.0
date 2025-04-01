"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, MoreHorizontal, Trash2, CheckCircle, XCircle, AlertTriangle, Clock, DollarSign } from "lucide-react"
import { EditBookingDialog } from "./edit-booking-dialog"
import { DeleteBookingDialog } from "./delete-booking-dialog"
import { ViewBookingDialog } from "./view-booking-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
]

export function BookingsTable() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "CONFIRMED":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Confirmed
          </Badge>
        )
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
      case "CANCELLED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "CONFIRMED":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "CHECKED_IN":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "CHECKED_OUT":
        return <XCircle className="h-4 w-4 text-gray-500" />
      case "CANCELLED":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "PARTIALLY_PAID":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Partially Paid
          </Badge>
        )
      case "UNPAID":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Unpaid
          </Badge>
        )
      case "REFUNDED":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Refunded
          </Badge>
        )
      default:
        return null
    }
  }

  const handleEdit = (booking: any) => {
    setSelectedBooking(booking)
    setShowEditDialog(true)
  }

  const handleDelete = (booking: any) => {
    setSelectedBooking(booking)
    setShowDeleteDialog(true)
  }

  const handleView = (booking: any) => {
    setSelectedBooking(booking)
    setShowViewDialog(true)
  }

  return (
    <>
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
          {bookings.map((booking) => (
            <TableRow
              key={booking.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleView(booking)}
            >
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {booking.guestName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{booking.guestName}</div>
                    <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{booking.roomNumber}</div>
                  <div className="text-xs text-muted-foreground">{booking.roomType}</div>
                </div>
              </TableCell>
              <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(booking.status)}
                  {getStatusBadge(booking.status)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">₵{booking.totalAmount}</span>
                  </div>
                  {getPaymentStatusBadge(booking.paymentStatus)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted transition-colors">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleView(booking)
                      }}
                      className="cursor-pointer"
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(booking)
                      }}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(booking)
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedBooking && (
        <>
          <EditBookingDialog open={showEditDialog} onOpenChange={setShowEditDialog} booking={selectedBooking} />
          <DeleteBookingDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} booking={selectedBooking} />
          <ViewBookingDialog open={showViewDialog} onOpenChange={setShowViewDialog} booking={selectedBooking} />
        </>
      )}
    </>
  )
}

