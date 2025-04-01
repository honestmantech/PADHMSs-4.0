"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { saveData } from "@/lib/real-time-data"
import { useToast } from "@/components/ui/use-toast"

export function EditBookingDialog({
  open,
  onOpenChange,
  booking,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: any
}) {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    roomNumber: "",
    roomType: "",
    totalAmount: "",
    status: "",
    paymentStatus: "",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (booking) {
      setFormData({
        guestName: booking.guestName || "",
        guestEmail: booking.guestEmail || "",
        roomNumber: booking.roomNumber || "",
        roomType: booking.roomType || "",
        totalAmount: booking.totalAmount?.toString() || "",
        status: booking.status || "",
        paymentStatus: booking.paymentStatus || "",
        specialRequests: booking.specialRequests || "",
      })

      if (booking.checkIn) {
        setCheckInDate(new Date(booking.checkIn))
      }

      if (booking.checkOut) {
        setCheckOutDate(new Date(booking.checkOut))
      }
    }
  }, [booking])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format the data for the database
      const bookingData = {
        guest_name: formData.guestName,
        guest_email: formData.guestEmail,
        guest_phone: formData.guestPhone,
        room_number: formData.roomNumber,
        check_in: checkInDate?.toISOString(),
        check_out: checkOutDate?.toISOString(),
        adults: Number.parseInt(formData.adults),
        children: Number.parseInt(formData.children),
        special_requests: formData.specialRequests,
        status: formData.status,
        total_amount: Number.parseFloat(formData.totalAmount),
        payment_status: formData.paymentStatus,
      }

      // Save to database
      const result = await saveData("bookings", bookingData, booking.id)

      if (result.success) {
        toast({
          title: "Booking updated",
          description: `Booking for ${formData.guestName} has been updated successfully.`,
        })

        // Close dialog
        onOpenChange(false)
      } else {
        throw new Error("Failed to update booking")
      }
    } catch (error) {
      console.error("Error updating booking:", error)
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-semibold">Edit Booking {booking?.id}</DialogTitle>
            <DialogDescription>Update the details for this booking. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="guestName" className="text-sm font-medium">
                  Guest Name
                </Label>
                <Input
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestEmail" className="text-sm font-medium">
                  Guest Email
                </Label>
                <Input
                  id="guestEmail"
                  name="guestEmail"
                  type="email"
                  value={formData.guestEmail}
                  onChange={handleInputChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="roomNumber" className="text-sm font-medium">
                  Room Number
                </Label>
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType" className="text-sm font-medium">
                  Room Type
                </Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(value) => handleSelectChange("roomType", value)}
                  required
                >
                  <SelectTrigger
                    id="roomType"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="DOUBLE">Double</SelectItem>
                    <SelectItem value="TWIN">Twin</SelectItem>
                    <SelectItem value="SUITE">Suite</SelectItem>
                    <SelectItem value="DELUXE">Deluxe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                        !checkInDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                        !checkOutDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      initialFocus
                      className="rounded-md border"
                      disabled={(date) => (checkInDate ? date < checkInDate : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">
                  Booking Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
                  <SelectTrigger id="status" className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                    <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus" className="text-sm font-medium">
                  Payment Status
                </Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                  required
                >
                  <SelectTrigger
                    id="paymentStatus"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="PARTIALLY_PAID">Partially Paid</SelectItem>
                    <SelectItem value="UNPAID">Unpaid</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount" className="text-sm font-medium">
                Total Amount (₵)
              </Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                min="0"
                value={formData.totalAmount}
                onChange={handleInputChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-sm font-medium">
                Special Requests
              </Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requests or notes for this booking"
                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 bg-muted/50">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="transition-all duration-200 hover:shadow-md" disabled={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

