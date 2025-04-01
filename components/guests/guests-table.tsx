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
import { Edit, MoreHorizontal, Trash2, Eye, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ViewGuestDialog } from "./view-guest-dialog"
import { EditGuestDialog } from "./edit-guest-dialog"
import { DeleteGuestDialog } from "./delete-guest-dialog"

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
]

export function GuestsTable() {
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

  const handleEdit = (guest: any) => {
    setSelectedGuest(guest)
    setShowEditDialog(true)
  }

  const handleDelete = (guest: any) => {
    setSelectedGuest(guest)
    setShowDeleteDialog(true)
  }

  return (
    <>
      <Table className="border rounded-md overflow-hidden">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="font-medium">Guest</TableHead>
            <TableHead className="font-medium">Contact</TableHead>
            <TableHead className="font-medium">ID</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Stays</TableHead>
            <TableHead className="font-medium">Total Spent</TableHead>
            <TableHead className="font-medium">Last Stay</TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow
              key={guest.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleView(guest)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {guest.firstName.charAt(0)}
                      {guest.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {guest.firstName} {guest.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">{guest.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{guest.email}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{guest.phone}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{guest.idType}</div>
                <div className="text-xs text-muted-foreground">{guest.idNumber}</div>
              </TableCell>
              <TableCell>{getStatusBadge(guest.status)}</TableCell>
              <TableCell>
                <div className="font-medium">{guest.totalStays}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">₵{guest.totalSpent.toLocaleString()}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{new Date(guest.lastStay).toLocaleDateString()}</div>
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
                        handleView(guest)
                      }}
                      className="cursor-pointer"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(guest)
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
                        handleDelete(guest)
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

