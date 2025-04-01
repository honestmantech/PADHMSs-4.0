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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CreditCard,
  Banknote,
  FileText,
  Smartphone,
  Calendar,
  User,
  FileCheck,
  Edit,
  Trash2,
  RefreshCw,
  Printer,
} from "lucide-react"

export function ViewPaymentDialog({
  open,
  onOpenChange,
  payment,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: any
}) {
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
        return <CreditCard className="h-5 w-5 text-blue-500" />
      case "CASH":
        return <Banknote className="h-5 w-5 text-green-500" />
      case "BANK_TRANSFER":
        return <FileText className="h-5 w-5 text-gray-500" />
      case "MOBILE_MONEY":
        return <Smartphone className="h-5 w-5 text-orange-500" />
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              Payment Details
              <span className="ml-2">{getStatusBadge(payment?.status)}</span>
            </DialogTitle>
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
          </div>
          <DialogDescription>View payment transaction details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                {getPaymentMethodIcon(payment?.paymentMethod)}
              </div>
              <div>
                <h3 className="font-medium">{formatPaymentMethod(payment?.paymentMethod)}</h3>
                <p className="text-sm text-muted-foreground">{payment?.reference}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₵{payment?.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{new Date(payment?.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{payment?.guestName}</p>
                <p className="text-sm text-muted-foreground">Booking ID: {payment?.bookingId}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Payment Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{new Date(payment?.date).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">{new Date(payment?.date).toLocaleTimeString()}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Payment ID</span>
                <span className="font-medium">{payment?.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Reference Number</span>
                <span className="font-medium">{payment?.reference}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium flex items-center gap-2">
                  {getPaymentMethodIcon(payment?.paymentMethod)}
                  {formatPaymentMethod(payment?.paymentMethod)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Status</span>
                <span>{getStatusBadge(payment?.status)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">₵{payment?.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Processed By</span>
                <span className="font-medium">Admin User</span>
              </div>
            </div>
          </div>

          {payment?.status === "COMPLETED" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-green-700">Payment Successful</p>
                <p className="text-sm text-green-600">This payment has been successfully processed.</p>
              </div>
            </div>
          )}

          {payment?.status === "PENDING" && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-700">Payment Pending</p>
                <p className="text-sm text-yellow-600">This payment is still being processed.</p>
              </div>
            </div>
          )}

          {payment?.status === "FAILED" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-red-700">Payment Failed</p>
                <p className="text-sm text-red-600">This payment could not be processed.</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            {payment?.status === "COMPLETED" && (
              <Button variant="outline" size="sm" className="gap-1 text-purple-600 hover:bg-purple-50">
                <RefreshCw className="h-4 w-4" />
                <span>Refund</span>
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
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

