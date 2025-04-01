"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { AlertTriangle, Loader2 } from "lucide-react"

export function DeletePaymentDialog({
  open,
  onOpenChange,
  payment,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: any
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would submit this data to your API
      console.log("Deleting payment:", payment.id)

      toast({
        title: "Payment deleted",
        description: `Payment ${payment.id} has been deleted.`,
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting payment:", error)
      toast({
        title: "Error",
        description: "Failed to delete payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Payment
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this payment record? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md bg-muted/50">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment ID:</span>
              <span className="text-sm font-medium">{payment?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Guest:</span>
              <span className="text-sm font-medium">{payment?.guestName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Amount:</span>
              <span className="text-sm font-medium">₵{payment?.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="text-sm font-medium">{new Date(payment?.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

