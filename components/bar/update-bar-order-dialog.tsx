"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/utils"

interface Room {
  id: string
  room_number: string
  room_type: string
}

interface BarOrder {
  id: string
  customer_name: string | null
  room_id: string | null
  payment_method: string
  is_paid: boolean
  total_amount: number
}

const formSchema = z.object({
  customer_name: z.string().optional(),
  room_id: z.string().optional(),
  payment_method: z.enum(["cash", "card", "room_charge", "mobile_money"]),
  is_paid: z.boolean().default(false),
})

interface UpdateBarOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: BarOrder | null
  rooms: Room[]
  onSuccess?: () => void
}

export function UpdateBarOrderDialog({ open, onOpenChange, order, rooms, onSuccess }: UpdateBarOrderDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: order
      ? {
          customer_name: order.customer_name || "",
          room_id: order.room_id || "",
          payment_method: order.payment_method as any,
          is_paid: order.is_paid,
        }
      : {
          customer_name: "",
          room_id: "",
          payment_method: "cash",
          is_paid: false,
        },
  })

  const watchPaymentMethod = form.watch("payment_method")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!order) return

    // Validate room_id is provided if payment_method is room_charge
    if (values.payment_method === "room_charge" && !values.room_id) {
      form.setError("room_id", {
        type: "manual",
        message: "Room is required for room charge",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bar/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to update order")
      }

      toast.success("Order updated successfully")
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error updating order:", error)
      toast.error("Failed to update order")
    } finally {
      setIsLoading(false)
    }
  }

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order</DialogTitle>
          <DialogDescription>Update the details for order #{order.id.slice(0, 8)}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4 text-sm">
            <span className="font-medium">Order Total:</span> {formatCurrency(order.total_amount)}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="mobile_money">Mobile Money</SelectItem>
                        <SelectItem value="room_charge">Room Charge</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchPaymentMethod === "room_charge" && (
                <FormField
                  control={form.control}
                  name="room_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a room" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              Room {room.room_number} ({room.room_type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="is_paid"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mark as paid</FormLabel>
                      <p className="text-sm text-muted-foreground">Check if payment has been received</p>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Order"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

