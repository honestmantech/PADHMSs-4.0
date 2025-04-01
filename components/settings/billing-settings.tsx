"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CreditCard, Download } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Billing settings updated",
        description: "Your billing information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update billing settings. Please try again.",
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
          <CardTitle>Billing Settings</CardTitle>
          <CardDescription>Manage your billing information and subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Plan</h3>

            <div className="rounded-md border p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Premium Plan</p>
                  <p className="text-sm text-muted-foreground">₵499/month</p>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>
              <Separator className="my-4" />
              <div className="space-y-1">
                <p className="text-sm">
                  Your next billing date is <span className="font-medium">May 1, 2023</span>
                </p>
                <p className="text-sm text-muted-foreground">You can cancel or change your plan at any time</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>

            <RadioGroup defaultValue="card">
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit Card</span>
                  </div>
                </Label>
                <p className="text-sm font-medium">**** **** **** 4242</p>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="flex-1">
                  Mobile Money
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1">
                  Bank Transfer
                </Label>
              </div>
            </RadioGroup>

            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" defaultValue="Grand Hotel Ghana" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Billing Address</Label>
              <Input id="address" defaultValue="123 Main Street" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="Accra" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Region</Label>
                <Input id="state" defaultValue="Greater Accra" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Postal Code</Label>
                <Input id="zip" defaultValue="00233" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue="GH">
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GH">Ghana</SelectItem>
                  <SelectItem value="NG">Nigeria</SelectItem>
                  <SelectItem value="KE">Kenya</SelectItem>
                  <SelectItem value="ZA">South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing History</h3>

            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-3 bg-muted/50 text-sm font-medium">
                <div>Date</div>
                <div>Description</div>
                <div>Amount</div>
                <div className="text-right">Invoice</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-4 p-3 text-sm">
                  <div>Apr 1, 2023</div>
                  <div>Premium Plan - Monthly</div>
                  <div>₵499.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 p-3 text-sm">
                  <div>Mar 1, 2023</div>
                  <div>Premium Plan - Monthly</div>
                  <div>₵499.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 p-3 text-sm">
                  <div>Feb 1, 2023</div>
                  <div>Premium Plan - Monthly</div>
                  <div>₵499.00</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </Button>
                  </div>
                </div>
              </div>
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

