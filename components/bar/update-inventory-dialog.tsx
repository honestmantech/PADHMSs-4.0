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
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/utils"

const transactionTypes = [
  { value: "add", label: "Add Stock" },
  { value: "remove", label: "Remove Stock" },
  { value: "adjust", label: "Adjust Stock" },
]

const formSchema = z.object({
  transaction_type: z.enum(["add", "remove", "adjust"]),
  quantity: z.coerce.number().positive({ message: "Quantity must be positive" }),
  notes: z.string().optional(),
})

interface BarItem {
  id: string
  name: string
  category: string
  price: number
  cost: number
  stock_quantity: number
  unit: string
}

interface UpdateInventoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  barItem: BarItem | null
  onSuccess?: () => void
}

export function UpdateInventoryDialog({ open, onOpenChange, barItem, onSuccess }: UpdateInventoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transaction_type: "add",
      quantity: 1,
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!barItem) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bar/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: barItem.id,
          ...values,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update inventory")
      }

      toast.success("Inventory updated successfully")
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error updating inventory:", error)
      toast.error("Failed to update inventory")
    } finally {
      setIsLoading(false)
    }
  }

  if (!barItem) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Inventory</DialogTitle>
          <DialogDescription>Update the inventory for {barItem.name}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Current Stock</p>
            <p className="text-lg">
              {barItem.stock_quantity} {barItem.unit}
              {barItem.stock_quantity !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Unit Cost</p>
            <p className="text-lg">{formatCurrency(barItem.cost)}</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="transaction_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" step="1" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add notes about this transaction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Inventory"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

