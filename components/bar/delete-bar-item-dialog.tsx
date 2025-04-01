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

interface DeleteBarItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  barItemId: string | null
  barItemName: string | null
  onSuccess?: () => void
}

export function DeleteBarItemDialog({
  open,
  onOpenChange,
  barItemId,
  barItemName,
  onSuccess,
}: DeleteBarItemDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    if (!barItemId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bar/items/${barItemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete bar item")
      }

      toast.success("Bar item deleted successfully")
      onOpenChange(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error deleting bar item:", error)
      toast.error("Failed to delete bar item")
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
            This will permanently delete the bar item <span className="font-semibold">{barItemName}</span>. This action
            cannot be undone.
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

