"use client"

import { useState } from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DeleteBarOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string | null
  onSuccess?: () => void
}

export function DeleteBarOrderDialog({ open, onOpenChange, orderId, onSuccess }: DeleteBarOrderDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    if (!orderId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bar/orders/${orderId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete order")
      }

      toast.success("Order deleted successfully")
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error("Failed to delete order")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the order and all associated items. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

