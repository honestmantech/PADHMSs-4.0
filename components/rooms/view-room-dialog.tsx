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
import {
  BedDouble,
  Users,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  Wifi,
  Tv,
  Coffee,
  Bath,
  Wind,
  Mountain,
  Lock,
} from "lucide-react"

export function ViewRoomDialog({
  open,
  onOpenChange,
  room,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: any
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Available
          </Badge>
        )
      case "OCCUPIED":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Occupied
          </Badge>
        )
      case "MAINTENANCE":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Maintenance
          </Badge>
        )
      case "RESERVED":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Reserved
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "OCCUPIED":
        return <Users className="h-5 w-5 text-blue-500" />
      case "MAINTENANCE":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "RESERVED":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-4 w-4 text-blue-500" />
      case "TV":
        return <Tv className="h-4 w-4 text-gray-500" />
      case "Air Conditioning":
        return <Wind className="h-4 w-4 text-blue-300" />
      case "Mini Bar":
        return <Coffee className="h-4 w-4 text-brown-500" />
      case "Jacuzzi":
        return <Bath className="h-4 w-4 text-blue-400" />
      case "Ocean View":
        return <Mountain className="h-4 w-4 text-green-500" />
      case "Safe":
        return <Lock className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  // Sample booking history - in a real app, this would come from your API
  const bookingHistory = [
    {
      id: "BK001",
      guestName: "John Smith",
      checkIn: "2023-03-15",
      checkOut: "2023-03-18",
      status: "CHECKED_OUT",
    },
    {
      id: "BK002",
      guestName: "Sarah Johnson",
      checkIn: "2023-03-20",
      checkOut: "2023-03-25",
      status: "CHECKED_OUT",
    },
    {
      id: "BK003",
      guestName: "Michael Brown",
      checkIn: "2023-04-05",
      checkOut: "2023-04-10",
      status: "UPCOMING",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            Room {room?.roomNumber}
            <span className="ml-2">{getStatusBadge(room?.status)}</span>
          </DialogTitle>
          <DialogDescription>Room details and booking history</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Room Details</TabsTrigger>
            <TabsTrigger value="bookings">Booking History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Room Type</p>
                <p className="font-medium flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  {room?.type}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {room?.capacity} {room?.capacity > 1 ? "Persons" : "Person"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Price per Night</p>
                <p className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />${room?.price}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium flex items-center gap-2">
                  {getStatusIcon(room?.status)}
                  {room?.status}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {room?.amenities.map((amenity: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-muted p-4 mt-4">
              <h4 className="text-sm font-medium mb-2">Room Preview</h4>
              <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Room image would appear here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="py-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-3 bg-muted/50 text-sm font-medium">
                <div>Guest</div>
                <div>Check In</div>
                <div>Check Out</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="grid grid-cols-4 p-3 text-sm">
                    <div className="font-medium">{booking.guestName}</div>
                    <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                    <div>{new Date(booking.checkOut).toLocaleDateString()}</div>
                    <div>
                      {booking.status === "CHECKED_OUT" ? (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          Checked Out
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

