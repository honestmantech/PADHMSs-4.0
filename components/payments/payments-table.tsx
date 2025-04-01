"use client"

import type React from "react"

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
import { Edit, MoreHorizontal, Trash2, Eye, FileText, CreditCard, Banknote, Smartphone, RefreshCw } from "lucide-react"
import { ViewPaymentDialog } from "./view-payment-dialog"
import { EditPaymentDialog } from "./edit-payment-dialog"
import { DeletePaymentDialog } from "./delete-payment-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample data - in a real app, this would come from your API
const payments = [
  {
    id: "PAY001",
    bookingId: "B001",
    guestName: "John Smith",
    amount: 450,
    paymentMethod: "CREDIT_CARD",
    status: "COMPLETED",
    date: "2023-04-05T14:30:00",
    reference: "REF123456",
  },
  {
    id: "PAY002",
    bookingId: "B002",
    guestName: "Sarah Johnson",
    amount: 350,
    paymentMethod: "MOBILE_MONEY",
    status: "PENDING",
    date: "2023-04-06T10:15:00",
    reference: "REF789012",
  },
  {
    id: "PAY003",
    bookingId: "B003",
    guestName: "Michael Brown",
    amount: 200,
    paymentMethod: "CASH",
    status: "COMPLETED",
    date: "2023-04-06T16:45:00",
    reference: "REF345678",
  },
  {
    id: "PAY004",
    bookingId: "B004",
    guestName: "Emily Davis",
    amount: 600,
    paymentMethod: "BANK_TRANSFER",
    status: "COMPLETED",
    date: "2023-04-04T11:20:00",
    reference: "REF901234",
  },
  {
    id: "PAY005",
    bookingId: "B005",
    guestName: "Robert Wilson",
    amount: 450,
    paymentMethod: "CREDIT_CARD",
    status: "FAILED",
    date: "2023-04-07T09:10:00",
    reference: "REF567890",
  },
  {
    id: "PAY006",
    bookingId: "B002",
    guestName: "Sarah Johnson",
    amount: 450,
    paymentMethod: "MOBILE_MONEY",
    status: "COMPLETED",
    date: "2023-04-07T14:30:00",
    reference: "REF234567",
  },
  {
    id: "PAY007",
    bookingId: "B006",
    guestName: "Jennifer Lee",
    amount: 750,
    paymentMethod: "CREDIT_CARD",
    status: "REFUNDED",
    date: "2023-04-09T15:45:00",
    reference: "REF678901",
  },
]

export function PaymentsTable() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "FAILED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "CREDIT_CARD":
        return <CreditCard className="h-4 w-4 text-blue-500" />
      case "CASH":
        return <Banknote className="h-4 w-4 text-green-500" />
      case "BANK_TRANSFER":
        return <FileText className="h-4 w-4 text-gray-500" />
      case "MOBILE_MONEY":
        return <Smartphone className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  const formatPaymentMethod = (method: string) => {
    return method
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const handleView = (payment: any) => {
    setSelectedPayment(payment)
    setShowViewDialog(true)
  }

  const handleEdit = (payment: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPayment(payment)
    setShowEditDialog(true)
  }

  const handleDelete = (payment: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPayment(payment)
    setShowDeleteDialog(true)
  }

  return (
    <>
      <Table className="border rounded-md overflow-hidden">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="font-medium">Payment ID</TableHead>
            <TableHead className="font-medium">Guest</TableHead>
            <TableHead className="font-medium">Booking</TableHead>
            <TableHead className="font-medium">Amount</TableHead>
            <TableHead className="font-medium">Method</TableHead>
            <TableHead className="font-medium">Date</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow
              key={payment.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleView(payment)}
            >
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {payment.guestName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{payment.guestName}</div>
                </div>
              </TableCell>
              <TableCell>{payment.bookingId}</TableCell>
              <TableCell className="font-medium">₵{payment.amount.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon(payment.paymentMethod)}
                  <span>{formatPaymentMethod(payment.paymentMethod)}</span>
                </div>
              </TableCell>
              <TableCell>{new Date(payment.date).toLocaleString()}</TableCell>
              <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                        handleView(payment)
                      }}
                      className="cursor-pointer"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleEdit(payment, e)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {payment.status === "COMPLETED" && (
                      <DropdownMenuItem
                        className="text-purple-600 cursor-pointer focus:text-purple-600 focus:bg-purple-50"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle refund logic
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refund
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                      onClick={(e) => handleDelete(payment, e)}
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

      {selectedPayment && (
        <>
          <ViewPaymentDialog open={showViewDialog} onOpenChange={setShowViewDialog} payment={selectedPayment} />
          <EditPaymentDialog open={showEditDialog} onOpenChange={setShowEditDialog} payment={selectedPayment} />
          <DeletePaymentDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} payment={selectedPayment} />
        </>
      )}
    </>
  )
}

