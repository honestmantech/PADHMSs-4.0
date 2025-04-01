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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BedDouble,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react"

export function ViewBookingDialog({
  open,
  onOpenChange,
  booking,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: any
}) {
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
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "CONFIRMED":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "CHECKED_IN":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "CHECKED_OUT":
        return <XCircle className="h-5 w-5 text-gray-500" />
      case "CANCELLED":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
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

  // Sample payment history - in a real app, this would come from your API
  const paymentHistory = [
    {
      id: "P001",
      date: "2023-04-01",
      amount: 200,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "P002",
      date: "2023-04-05",
      amount: 250,
      method: "Bank Transfer",
      status: "Completed",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              Booking {booking?.id}
              <span className="ml-2">{getStatusBadge(booking?.status)}</span>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Print</span>
              </Button>
            </div>
          </div>
          <DialogDescription>Booking details and payment information</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3 h-10">
              <TabsTrigger value="details" className="rounded-md data-[state=active]:shadow-sm">
                Booking Details
              </TabsTrigger>
              <TabsTrigger value="guest" className="rounded-md data-[state=active]:shadow-sm">
                Guest Info
              </TabsTrigger>
              <TabsTrigger value="payments" className="rounded-md data-[state=active]:shadow-sm">
                Payments
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-0 mt-0">
            <div className="px-6 py-4 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                  {getStatusIcon(booking?.status)}
                </div>
                <div>
                  <h3 className="font-medium">Current Status</h3>
                  <p className="text-sm text-muted-foreground">
                    This booking is currently {booking?.status?.toLowerCase().replace("_", " ")}
                  </p>
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm" className="h-8">
                    Change Status
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-medium flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    {booking?.roomNumber} ({booking?.roomType})
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Guest</p>
                  <p className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {booking?.guestName}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Check-in Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {booking?.checkIn ? new Date(booking.checkIn).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Check-out Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {booking?.checkOut ? new Date(booking.checkOut).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />₵{booking?.totalAmount}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <p className="font-medium flex items-center gap-2">{getPaymentStatusBadge(booking?.paymentStatus)}</p>
                </div>
              </div>

              {booking?.specialRequests && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Special Requests</p>
                  <div className="p-4 bg-muted rounded-md border">
                    <p className="text-sm">{booking.specialRequests}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="guest" className="p-0 mt-0">
            <div className="px-6 py-4 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {booking?.guestName
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{booking?.guestName}</h3>
                  <p className="text-sm text-muted-foreground">{booking?.guestEmail}</p>
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm" className="h-8">
                    View Guest Profile
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Email</p>
                  </div>
                  <p className="text-sm">{booking?.guestEmail || "N/A"}</p>
                </div>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Phone</p>
                  </div>
                  <p className="text-sm">{booking?.guestPhone || "N/A"}</p>
                </div>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">Address</p>
                  </div>
                  <p className="text-sm">{booking?.guestAddress || "N/A"}</p>
                </div>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">ID Information</p>
                  </div>
                  <p className="text-sm">
                    {booking?.guestIdType ? `${booking.guestIdType}: ${booking.guestIdNumber}` : "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Previous Stays</h4>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <span>View All</span>
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-md border text-center">
                  <p className="text-sm text-muted-foreground">No previous stays found.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="p-0 mt-0">
            <div className="px-6 py-4 space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div>
                  <h3 className="font-medium">Payment Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Total Amount: ₵{booking?.totalAmount} • {getPaymentStatusBadge(booking?.paymentStatus)}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>Record Payment</span>
                </Button>
              </div>

              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-5 p-3 bg-muted/50 text-sm font-medium">
                  <div>Payment ID</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Method</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {paymentHistory.length > 0 ? (
                    paymentHistory.map((payment) => (
                      <div
                        key={payment.id}
                        className="grid grid-cols-5 p-3 text-sm hover:bg-muted/30 transition-colors"
                      >
                        <div className="font-medium">{payment.id}</div>
                        <div>{new Date(payment.date).toLocaleDateString()}</div>
                        <div>₵{payment.amount}</div>
                        <div>{payment.method}</div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-sm text-muted-foreground">No payment records found.</div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="px-6 py-4 bg-muted/50 border-t">
          <div className="flex items-center gap-2 mr-auto">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Edit className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-red-600 hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          </div>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

