"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { saveData } from "@/lib/real-time-data"
import { useTheme } from "next-themes"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    theme: theme || "system",
    primaryColor: "blue",
    accentColor: "teal",
    borderRadius: "medium",
    fontFamily: "inter",
  })

  const handleThemeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, theme: value }))
    setTheme(value)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save to database
      const result = await saveData(
        "appearance_settings",
        {
          theme: formData.theme,
          primary_color: formData.primaryColor,
          accent_color: formData.accentColor,
          border_radius: formData.borderRadius,
          font_family: formData.fontFamily,
        },
        1,
      ) // Assuming there's only one appearance settings record with ID 1

      if (result.success) {
        // Apply theme changes immediately
        document.documentElement.style.setProperty(
          "--radius",
          formData.borderRadius === "small" ? "0.3rem" : formData.borderRadius === "medium" ? "0.5rem" : "0.7rem",
        )

        toast({
          title: "Appearance updated",
          description: "Your appearance settings have been updated successfully.",
        })
      } else {
        throw new Error("Failed to update appearance settings")
      }
    } catch (error) {
      console.error("Error saving appearance settings:", error)
      toast({
        title: "Error",
        description: "Failed to update appearance settings. Please try again.",
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
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your hotel management system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme Mode</Label>
              <RadioGroup value={formData.theme} onValueChange={handleThemeChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">System</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="grid grid-cols-6 gap-2">
                {["slate", "blue", "green", "red", "purple", "orange"].map((color) => (
                  <div
                    key={color}
                    className={`h-10 rounded-md cursor-pointer border-2 ${
                      formData.primaryColor === color ? "border-black dark:border-white" : "border-transparent"
                    }`}
                    style={{ backgroundColor: `var(--${color}-500)` }}
                    onClick={() => handleChange("primaryColor", color)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Border Radius</Label>
              <RadioGroup
                value={formData.borderRadius}
                onValueChange={(value) => handleChange("borderRadius", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select value={formData.fontFamily} onValueChange={(value) => handleChange("fontFamily", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setFormData({
                theme: theme || "system",
                primaryColor: "blue",
                accentColor: "teal",
                borderRadius: "medium",
                fontFamily: "inter",
              })
              setTheme("system")
            }}
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

