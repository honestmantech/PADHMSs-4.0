"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useSettings } from "@/contexts/settings-context"
import { saveData, fetchData } from "@/lib/utils"

export function HotelSettings() {
  const { settings, updateSettings, isLoading: settingsLoading } = useSettings()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    hotelName: settings.hotelName,
    email: "",
    phone: "",
    address: "",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    currency: settings.currency,
    currencySymbol: settings.currencySymbol,
    timezone: settings.timezone,
    autoConfirmBookings: settings.autoConfirmBookings,
    sendEmailNotifications: settings.sendEmailNotifications,
    maintenanceMode: settings.maintenanceMode,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save to database using the real-time data service
      const result = await saveData(
        "hotel_settings",
        {
          hotel_name: formData.hotelName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          check_in_time: formData.checkInTime,
          check_out_time: formData.checkOutTime,
          currency: formData.currency,
          currency_symbol: formData.currencySymbol,
          timezone: formData.timezone,
          auto_confirm_bookings: formData.autoConfirmBookings,
          send_email_notifications: formData.sendEmailNotifications,
          maintenance_mode: formData.maintenanceMode,
        },
        1,
      ) // Assuming there's only one hotel settings record with ID 1

      if (result.success) {
        toast({
          title: "Hotel settings updated",
          description: "Your hotel settings have been updated successfully.",
        })
      } else {
        throw new Error("Failed to update settings")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to update hotel settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add this useEffect to load the settings when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await fetchData("hotel_settings")
        if (result.success && result.data && result.data.length > 0) {
          const settings = result.data[0]
          setFormData({
            hotelName: settings.hotel_name || "Grand Hotel Ghana",
            email: settings.email || "",
            phone: settings.phone || "",
            address: settings.address || "",
            checkInTime: settings.check_in_time || "14:00",
            checkOutTime: settings.check_out_time || "11:00",
            currency: settings.currency || "GHS",
            currencySymbol: settings.currency_symbol || "₵",
            timezone: settings.timezone || "GMT",
            autoConfirmBookings: settings.auto_confirm_bookings || false,
            sendEmailNotifications: settings.send_email_notifications || true,
            maintenanceMode: settings.maintenance_mode || false,
          })
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }

    loadSettings()
  }, [])

  if (settingsLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Hotel Settings</CardTitle>
          <CardDescription>Manage your hotel information and operational settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name</Label>
              <Input
                id="hotelName"
                value={formData.hotelName}
                onChange={(e) => handleChange("hotelName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Operational Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Default Check-in Time</Label>
                <Select value={formData.checkInTime} onValueChange={(value) => handleChange("checkInTime", value)}>
                  <SelectTrigger id="checkInTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOutTime">Default Check-out Time</Label>
                <Select value={formData.checkOutTime} onValueChange={(value) => handleChange("checkOutTime", value)}>
                  <SelectTrigger id="checkOutTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => {
                  const symbol = value === "GHS" ? "₵" : value === "USD" ? "$" : value === "EUR" ? "€" : "£"
                  handleChange("currency", value)
                  handleChange("currencySymbol", symbol)
                }}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GHS">Ghana Cedis (₵)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleChange("timezone", value)}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GMT">GMT (Ghana Time)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                  <SelectItem value="CET">CET (Central European Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">System Settings</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoConfirm">Auto-confirm Bookings</Label>
                <p className="text-sm text-muted-foreground">Automatically confirm bookings when payment is received</p>
              </div>
              <Switch
                id="autoConfirm"
                checked={formData.autoConfirmBookings}
                onCheckedChange={(checked) => handleChange("autoConfirmBookings", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sendEmails">Send Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email notifications for bookings, check-ins, and check-outs
                </p>
              </div>
              <Switch
                id="sendEmails"
                checked={formData.sendEmailNotifications}
                onCheckedChange={(checked) => handleChange("sendEmailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Put the system in maintenance mode (only admins can access)
                </p>
              </div>
              <Switch
                id="maintenance"
                checked={formData.maintenanceMode}
                onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              setFormData({
                hotelName: settings.hotelName,
                email: "",
                phone: "",
                address: "",
                checkInTime: "14:00",
                checkOutTime: "11:00",
                currency: settings.currency,
                currencySymbol: settings.currencySymbol,
                timezone: settings.timezone,
                autoConfirmBookings: settings.autoConfirmBookings,
                sendEmailNotifications: settings.sendEmailNotifications,
                maintenanceMode: settings.maintenanceMode,
              })
            }
          >
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

