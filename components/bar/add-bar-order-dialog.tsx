"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Plus, Minus, Trash2 } from "lucide-react"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

interface BarItem {
  id: string
  name: string
  category: string
  price: number
  stock_quantity: number
  unit: string
}

interface Room {
  id: string
  room_number: string
  room_type: string
}

interface OrderItem {
  item_id: string
  quantity: number
  price: number
  name: string
  unit: string
}

const formSchema = z.object({
  customer_name: z.string().optional(),
  room_id: z.string().optional(),
  payment_method: z.enum(["cash", "card", "room_charge", "mobile_money"]),
  is_paid: z.boolean().default(false),
})

interface AddBarOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddBarOrderDialog({ open, onOpenChange, onSuccess }: AddBarOrderDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [barItems, setBarItems] = useState<BarItem[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string>("")
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      room_id: "",
      payment_method: "cash",
      is_paid: true,
    },
  })

  const watchPaymentMethod = form.watch("payment_method")

  useEffect(() => {
    // Reset room_id if payment method is not room_charge
    if (watchPaymentMethod !== "room_charge") {
      form.setValue("room_id", "")
    }
  }, [watchPaymentMethod, form])

  useEffect(() => {
    async function fetchBarItems() {
      try {
        const response = await fetch("/api/bar/items")
        if (!response.ok) throw new Error("Failed to fetch bar items")
        const data = await response.json()
        setBarItems(data.items.filter((item: BarItem) => item.stock_quantity > 0))
      } catch (error) {
        console.error("Error fetching bar items:", error)
        toast.error("Failed to load bar items")
      }
    }

    async function fetchRooms() {
      try {
        const response = await fetch("/api/rooms?occupied=true")
        if (!response.ok) throw new Error("Failed to fetch rooms")
        const data = await response.json()
        setRooms(data.rooms)
      } catch (error) {
        console.error("Error fetching rooms:", error)
        toast.error("Failed to load rooms")
      }
    }

    if (open) {
      fetchBarItems()
      fetchRooms()
    }
  }, [open])

  const addItemToOrder = () => {
    if (!selectedItemId) return

    const item = barItems.find((item) => item.id === selectedItemId)
    if (!item) return

    if (selectedQuantity > item.stock_quantity) {
      toast.error(`Only ${item.stock_quantity} ${item.unit}${item.stock_quantity !== 1 ? "s" : ""} available`)
      return
    }

    const existingItemIndex = orderItems.findIndex((orderItem) => orderItem.item_id === selectedItemId)

    if (existingItemIndex >= 0) {
      const updatedItems = [...orderItems]
      const newQuantity = updatedItems[existingItemIndex].quantity + selectedQuantity

      if (newQuantity > item.stock_quantity) {
        toast.error(`Only ${item.stock_quantity} ${item.unit}${item.stock_quantity !== 1 ? "s" : ""} available`)
        return
      }

      updatedItems[existingItemIndex].quantity = newQuantity
      setOrderItems(updatedItems)
    } else {
      setOrderItems([
        ...orderItems,
        {
          item_id: item.id,
          quantity: selectedQuantity,
          price: item.price,
          name: item.name,
          unit: item.unit,
        },
      ])
    }

    setSelectedItemId("")
    setSelectedQuantity(1)
  }

  const removeItemFromOrder = (index: number) => {
    const updatedItems = [...orderItems]
    updatedItems.splice(index, 1)
    setOrderItems(updatedItems)
  }

  const updateItemQuantity = (index: number, change: number) => {
    const updatedItems = [...orderItems]
    const newQuantity = updatedItems[index].quantity + change

    if (newQuantity <= 0) {
      removeItemFromOrder(index)
      return
    }

    const item = barItems.find((item) => item.id === updatedItems[index].item_id)
    if (!item) return

    if (newQuantity > item.stock_quantity) {
      toast.error(`Only ${item.stock_quantity} ${item.unit}${item.stock_quantity !== 1 ? "s" : ""} available`)
      return
    }

    updatedItems[index].quantity = newQuantity
    setOrderItems(updatedItems)
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (orderItems.length === 0) {
      toast.error("Please add at least one item to the order")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/bar/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          items: orderItems,
          total_amount: calculateTotal(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      toast.success("Order created successfully")
      onOpenChange(false)
      setOrderItems([])
      form.reset({
        customer_name: "",
        room_id: "",
        payment_method: "cash",
        is_paid: true,
      })
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Failed to create order")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Bar Order</DialogTitle>
          <DialogDescription>Create a new order for bar items.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Add Items</FormLabel>
              <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                  {barItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} - {formatCurrency(item.price)} ({item.stock_quantity} available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number.parseInt(e.target.value) || 1)}
                className="w-20"
              />
              <Button type="button" onClick={addItemToOrder} disabled={!selectedItemId}>
                Add
              </Button>
            </div>
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
            </form>
          </Form>
        </div>

        {orderItems.length > 0 && (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateItemQuantity(index, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateItemQuantity(index, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeItemFromOrder(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(calculateTotal())}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading || orderItems.length === 0}>
            {isLoading ? "Creating..." : "Create Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

