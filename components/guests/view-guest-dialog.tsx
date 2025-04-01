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
import { Mail, Phone, MapPin, CreditCard, Calendar, Edit, Trash2, FileText, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ViewGuestDialog({
  open,
  onOpenChange,
  guest,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  guest: any
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Inactive
          </Badge>
        )
      case "vip":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            VIP
          </Badge>
        )
      default:
        return null
    }
  }

  // Sample booking history - in a real app, this would come from your API
  const bookingHistory = [
    {
      id: "B001",
      roomNumber: "101",
      checkIn: "2023-03-10",
      checkOut: "2023-03-15",
      status: "CHECKED_OUT",
      amount: 750,
    },
    {
      id: "B002",
      roomNumber: "205",
      checkIn: "2022-12-20",
      checkOut: "2022-12-27",
      status: "CHECKED_OUT",
      amount: 1050,
    },
    {
      id: "B003",
      roomNumber: "310",
      checkIn: "2022-08-05",
      checkOut: "2022-08-08",
      status: "CHECKED_OUT",
      amount: 450,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              Guest Profile
              <span className="ml-2">{getStatusBadge(guest?.status)}</span>
            </DialogTitle>
          </div>
          <DialogDescription>View guest details and booking history</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3 h-10">
              <TabsTrigger value="details" className="rounded-md data-[state=active]:shadow-sm">
                Guest Details
              </TabsTrigger>
              <TabsTrigger value="bookings" className="rounded-md data-[state=active]:shadow-sm">
                Booking History
              </TabsTrigger>
              <TabsTrigger value="notes" className="rounded-md data-[state=active]:shadow-sm">
                Notes & Preferences
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-0 mt-0">
            <div className="px-6 py-4 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {guest?.firstName?.charAt(0)}
                    {guest?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">
                    {guest?.firstName} {guest?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{guest?.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2 p-3 bg-muted/30 rounded-md border">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <p className="text-sm">{guest?.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <p className="text-sm">{guest?.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <p className="text-sm">{guest?.address}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">ID Information</h4>
                    <div className="space-y-2 p-3 bg-muted/30 rounded-md border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <p className="text-sm">
                          {guest?.idType}: {guest?.idNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Stay Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="shadow-sm">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Total Stays
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-2xl font-bold">{guest?.totalStays}</p>
                        </CardContent>
                      </Card>

                      <Card className="shadow-sm">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                            Total Spent
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-2xl font-bold">₵{guest?.totalSpent.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Last Stay</h4>
                    <div className="p-3 bg-muted/30 rounded-md border">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">{new Date(guest?.lastStay).toLocaleDateString()}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last checked out{" "}
                        {new Date(guest?.lastStay).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="p-0 mt-0">
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Booking History</h4>
                <Button variant="outline" size="sm">
                  View All Bookings
                </Button>
              </div>

              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-5 p-3 bg-muted/50 text-sm font-medium">
                  <div>Booking ID</div>
                  <div>Room</div>
                  <div>Check In</div>
                  <div>Check Out</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {bookingHistory.length > 0 ? (
                    bookingHistory.map((booking) => (
                      <div
                        key={booking.id}
                        className="grid grid-cols-5 p-3 text-sm hover:bg-muted/30 transition-colors"
                      >
                        <div className="font-medium">{booking.id}</div>
                        <div>Room {booking.roomNumber}</div>
                        <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                        <div>{new Date(booking.checkOut).toLocaleDateString()}</div>
                        <div className="text-right font-medium">₵{booking.amount}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-sm text-muted-foreground">No booking records found.</div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-md border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Booking Statistics</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Average Stay</p>
                    <p className="text-lg font-medium">3.5 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Preferred Room</p>
                    <p className="text-lg font-medium">Double</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Booking</p>
                    <p className="text-lg font-medium">{new Date(guest?.lastStay).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="p-0 mt-0">
            <div className="px-6 py-4 space-y-4">
              <div className="p-4 bg-muted/30 rounded-md border">
                <h4 className="text-sm font-medium mb-2">Guest Notes</h4>
                <p className="text-sm text-muted-foreground">No notes available for this guest.</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Preferences</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded-md border">
                    <p className="text-xs text-muted-foreground">Room Preference</p>
                    <p className="text-sm font-medium">Upper floor, away from elevator</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md border">
                    <p className="text-xs text-muted-foreground">Dietary Requirements</p>
                    <p className="text-sm font-medium">None specified</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md border">
                    <p className="text-xs text-muted-foreground">Special Requests</p>
                    <p className="text-sm font-medium">Extra pillows</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md border">
                    <p className="text-xs text-muted-foreground">Payment Method</p>
                    <p className="text-sm font-medium">Credit Card</p>
                  </div>
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

