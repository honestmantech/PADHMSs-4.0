"use client"

import { format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

interface OrderItem {
  id: string
  order_id: string
  item_id: string
  item_name: string
  quantity: number
  unit_price: number
  created_at: string
}

interface BarOrder {
  id: string
  customer_name: string | null
  room_id: string | null
  room_number: string | null
  payment_method: string
  is_paid: boolean
  total_amount: number
  created_at: string
  updated_at: string
  items: OrderItem[]
}

interface ViewBarOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: BarOrder | null
}

export function ViewBarOrderDialog({ open, onOpenChange, order }: ViewBarOrderDialogProps) {
  if (!order) return null

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cash":
        return "Cash"
      case "card":
        return "Card"
      case "mobile_money":
        return "Mobile Money"
      case "room_charge":
        return "Room Charge"
      default:
        return method
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>View details for order #{order.id.slice(0, 8)}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
              <p className="text-sm text-muted-foreground">{format(new Date(order.created_at), "PPP 'at' p")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={order.is_paid ? "default" : "outline"}>{order.is_paid ? "Paid" : "Unpaid"}</Badge>
              <Badge variant="secondary">{getPaymentMethodLabel(order.payment_method)}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Customer Information</h4>
            <div className="rounded-md border p-4">
              {order.customer_name ? (
                <p>Customer: {order.customer_name}</p>
              ) : order.room_number ? (
                <p>Room: {order.room_number}</p>
              ) : (
                <p>Walk-in customer</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Order Items</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unit_price)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unit_price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(order.total_amount)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

