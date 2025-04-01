"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Edit,
  MoreHorizontal,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Wifi,
  Tv,
  Coffee,
  Bath,
  Loader2,
} from "lucide-react"
import { EditRoomDialog } from "./edit-room-dialog"
import { DeleteRoomDialog } from "./delete-room-dialog"
import { ViewRoomDialog } from "./view-room-dialog"
import { useSettings } from "@/contexts/settings-context"
import { toast } from "@/components/ui/use-toast"

interface Room {
  id: string
  room_number: string
  type: string
  price: number
  status: string
  capacity: number
  amenities: string[]
}

export function RoomsTable() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const { settings } = useSettings()

  // Fetch rooms data
  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/rooms")

      if (!response.ok) {
        throw new Error("Failed to fetch rooms")
      }

      const data = await response.json()
      setRooms(data)
    } catch (err) {
      setError("Error loading rooms. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()

    // Set up real-time updates (e.g., with WebSockets or polling)
    const intervalId = setInterval(fetchRooms, 30000) // Poll every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

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

  const handleEdit = (room: Room) => {
    setSelectedRoom(room)
    setShowEditDialog(true)
  }

  const handleDelete = (room: Room) => {
    setSelectedRoom(room)
    setShowDeleteDialog(true)
  }

  const handleView = (room: Room) => {
    setSelectedRoom(room)
    setShowViewDialog(true)
  }

  const handleRoomUpdated = () => {
    fetchRooms()
    toast({
      title: "Room updated",
      description: "The room has been updated successfully.",
    })
  }

  const handleRoomDeleted = () => {
    fetchRooms()
    toast({
      title: "Room deleted",
      description: "The room has been deleted successfully.",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center p-6">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Loading rooms...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <Button variant="outline" onClick={fetchRooms} className="mt-4">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room #</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amenities</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No rooms found. Add a room to get started.
                </TableCell>
              </TableRow>
            ) : (
              rooms.map((room) => (
                <TableRow key={room.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleView(room)}>
                  <TableCell className="font-medium">{room.room_number}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{room.capacity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {settings.currencySymbol}
                    {room.price}/night
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(room.status)}
                      {getStatusBadge(room.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities &&
                        room.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {getAmenityIcon(amenity)}
                            <span className="text-xs">{amenity}</span>
                          </Badge>
                        ))}
                      {room.amenities && room.amenities.length > 3 && (
                        <Badge variant="secondary">+{room.amenities.length - 3}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleView(room)
                          }}
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(room)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(room)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {selectedRoom && (
        <>
          <EditRoomDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            room={selectedRoom}
            onRoomUpdated={handleRoomUpdated}
          />
          <DeleteRoomDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            room={selectedRoom}
            onRoomDeleted={handleRoomDeleted}
          />
          <ViewRoomDialog open={showViewDialog} onOpenChange={setShowViewDialog} room={selectedRoom} />
        </>
      )}
    </Card>
  )
}

