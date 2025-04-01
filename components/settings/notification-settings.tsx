"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="bookingNotifications">Booking Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new bookings</p>
                </div>
                <Switch id="bookingNotifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="checkInNotifications">Check-in Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when guests check in</p>
                </div>
                <Switch id="checkInNotifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paymentNotifications">Payment Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for payments and refunds</p>
                </div>
                <Switch id="paymentNotifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemNotifications">System Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about system updates and maintenance
                  </p>
                </div>
                <Switch id="systemNotifications" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Frequency</h3>

            <RadioGroup defaultValue="realtime">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="realtime" id="realtime" />
                <div className="grid gap-1.5">
                  <Label htmlFor="realtime">Real-time</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications as events happen</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <div className="grid gap-1.5">
                  <Label htmlFor="daily">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">Receive a daily summary of all notifications</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <div className="grid gap-1.5">
                  <Label htmlFor="weekly">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary of all notifications</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mobile Notifications</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable push notifications on your mobile device</p>
              </div>
              <Switch id="pushNotifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive important notifications via SMS</p>
              </div>
              <Switch id="smsNotifications" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
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

