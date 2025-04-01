"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ViewGuestDialog } from "./view-guest-dialog"
import { EditGuestDialog } from "./edit-guest-dialog"
import { DeleteGuestDialog } from "./delete-guest-dialog"
import { Mail, Phone, MapPin, CreditCard, Calendar, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data - in a real app, this would come from your API
const guests = [
  {
    id: "G001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+233 20 123 4567",
    address: "123 Main St, Accra, Ghana",
    idType: "Passport",
    idNumber: "AB123456",
    status: "active",
    totalStays: 5,
    totalSpent: 2500,
    lastStay: "2023-03-15",
  },
  {
    id: "G002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@example.com",
    phone: "+233 24 987 6543",
    address: "456 Park Ave, Kumasi, Ghana",
    idType: "National ID",
    idNumber: "GHA12345678",
    status: "vip",
    totalStays: 12,
    totalSpent: 8500,
    lastStay: "2023-04-02",
  },
  {
    id: "G003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.b@example.com",
    phone: "+233 27 456 7890",
    address: "789 Beach Rd, Cape Coast, Ghana",
    idType: "Driver's License",
    idNumber: "DL987654",
    status: "active",
    totalStays: 3,
    totalSpent: 1200,
    lastStay: "2023-02-20",
  },
  {
    id: "G004",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@example.com",
    phone: "+233 23 345 6789",
    address: "234 Lake St, Tamale, Ghana",
    idType: "Passport",
    idNumber: "CD654321",
    status: "inactive",
    totalStays: 1,
    totalSpent: 450,
    lastStay: "2022-11-10",
  },
  {
    id: "G005",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.w@example.com",
    phone: "+233 26 789 0123",
    address: "567 Mountain Rd, Ho, Ghana",
    idType: "National ID",
    idNumber: "GHA98765432",
    status: "active",
    totalStays: 7,
    totalSpent: 3800,
    lastStay: "2023-03-28",
  },
  {
    id: "G006",
    firstName: "Jennifer",
    lastName: "Lee",
    email: "jennifer.l@example.com",
    phone: "+233 20 234 5678",
    address: "890 River Rd, Takoradi, Ghana",
    idType: "Passport",
    idNumber: "EF987654",
    status: "vip",
    totalStays: 9,
    totalSpent: 6200,
    lastStay: "2023-04-10",
  },
]

export function GuestsGrid() {
  const [selectedGuest, setSelectedGuest] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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

  const handleView = (guest: any) => {
    setSelectedGuest(guest)
    setShowViewDialog(true)
  }

  const handleEdit = (guest: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedGuest(guest)
    setShowEditDialog(true)
  }

  const handleDelete = (guest: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedGuest(guest)
    setShowDeleteDialog(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {guests.map((guest) => (
          <Card
            key={guest.id}
            className="shadow-sm hover:shadow transition-shadow overflow-hidden cursor-pointer"
            onClick={() => handleView(guest)}
          >
            <div
              className={`h-2 w-full ${
                guest.status === "active" ? "bg-green-500" : guest.status === "vip" ? "bg-purple-500" : "bg-gray-500"
              }`}
            />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {guest.firstName.charAt(0)}
                      {guest.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {guest.firstName} {guest.lastName}
                    </h3>
                    <p className="text-xs text-muted-foreground">{guest.id}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleEdit(guest, e)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={(e) => handleDelete(guest, e)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 mt-1">{getStatusBadge(guest.status)}</div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-sm truncate">{guest.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-sm">{guest.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-sm truncate">{guest.address}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs">{guest.totalStays} stays</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs">₵{guest.totalSpent.toLocaleString()}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedGuest && (
        <>
          <ViewGuestDialog open={showViewDialog} onOpenChange={setShowViewDialog} guest={selectedGuest} />
          <EditGuestDialog open={showEditDialog} onOpenChange={setShowEditDialog} guest={selectedGuest} />
          <DeleteGuestDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} guest={selectedGuest} />
        </>
      )}
    </>
  )
}

