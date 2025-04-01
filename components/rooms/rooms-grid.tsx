"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditRoomDialog } from "./edit-room-dialog"
import { DeleteRoomDialog } from "./delete-room-dialog"
import { ViewRoomDialog } from "./view-room-dialog"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Wifi,
  Tv,
  Coffee,
  Bath,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data - in a real app, this would come from your API
const rooms = [
  {
    id: "1",
    roomNumber: "101",
    type: "SINGLE",
    price: 100,
    status: "AVAILABLE",
    capacity: 1,
    amenities: ["WiFi", "TV", "Air Conditioning"],
  },
  {
    id: "2",
    roomNumber: "102",
    type: "DOUBLE",
    price: 150,
    status: "OCCUPIED",
    capacity: 2,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar"],
  },
  {
    id: "3",
    roomNumber: "103",
    type: "TWIN",
    price: 150,
    status: "MAINTENANCE",
    capacity: 2,
    amenities: ["WiFi", "TV", "Air Conditioning"],
  },
  {
    id: "4",
    roomNumber: "201",
    type: "SUITE",
    price: 300,
    status: "AVAILABLE",
    capacity: 4,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi"],
  },
  {
    id: "5",
    roomNumber: "202",
    type: "DELUXE",
    price: 400,
    status: "RESERVED",
    capacity: 2,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Ocean View"],
  },
  {
    id: "6",
    roomNumber: "203",
    type: "DOUBLE",
    price: 150,
    status: "AVAILABLE",
    capacity: 2,
    amenities: ["WiFi", "TV", "Air Conditioning"],
  },
  {
    id: "7",
    roomNumber: "301",
    type: "SINGLE",
    price: 100,
    status: "AVAILABLE",
    capacity: 1,
    amenities: ["WiFi", "TV", "Air Conditioning"],
  },
  {
    id: "8",
    roomNumber: "302",
    type: "SUITE",
    price: 300,
    status: "OCCUPIED",
    capacity: 4,
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi"],
  },
]

export function RoomsGrid() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)

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
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "OCCUPIED":
        return <Users className="h-4 w-4 text-blue-500" />
      case "MAINTENANCE":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "RESERVED":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-3 w-3" />
      case "TV":
        return <Tv className="h-3 w-3" />
      case "Mini Bar":
        return <Coffee className="h-3 w-3" />
      case "Jacuzzi":
        return <Bath className="h-3 w-3" />
      default:
        return null
    }
  }

  const handleEdit = (room: any) => {
    setSelectedRoom(room)
    setShowEditDialog(true)
  }

  const handleDelete = (room: any) => {
    setSelectedRoom(room)
    setShowDeleteDialog(true)
  }

  const handleView = (room: any) => {
    setSelectedRoom(room)
    setShowViewDialog(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="shadow-sm hover:shadow transition-shadow overflow-hidden">
            <div
              className={`h-2 w-full ${
                room.status === "AVAILABLE"
                  ? "bg-green-500"
                  : room.status === "OCCUPIED"
                    ? "bg-blue-500"
                    : room.status === "MAINTENANCE"
                      ? "bg-red-500"
                      : "bg-yellow-500"
              }`}
            />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">Room {room.roomNumber}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleView(room)}>View details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEdit(room)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={() => handleDelete(room)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(room.status)}
                {getStatusBadge(room.status)}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium">{room.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="font-medium">
                      {room.capacity} {room.capacity > 1 ? "Persons" : "Person"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Price per Night</p>
                  <p className="font-medium">₵{room.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amenities</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                        <span className="text-xs">{amenity}</span>
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && <Badge variant="secondary">+{room.amenities.length - 3}</Badge>}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={room.status === "AVAILABLE" ? "default" : "outline"}
                onClick={() => handleView(room)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedRoom && (
        <>
          <EditRoomDialog open={showEditDialog} onOpenChange={setShowEditDialog} room={selectedRoom} />
          <DeleteRoomDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} room={selectedRoom} />
          <ViewRoomDialog open={showViewDialog} onOpenChange={setShowViewDialog} room={selectedRoom} />
        </>
      )}
    </>
  )
}

