"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface SettingsContextType {
  settings: SystemSettings
  updateSettings: (newSettings: Partial<SystemSettings>) => Promise<void>
  isLoading: boolean
}

export interface SystemSettings {
  theme: "light" | "dark" | "system"
  currency: string
  dateFormat: string
  language: string
  notifications: {
    email: boolean
    browser: boolean
    mobile: boolean
  }
  appearance: {
    colorScheme: string
    fontSize: string
    sidebarCompact: boolean
  }
}

const defaultSettings: SystemSettings = {
  theme: "system",
  currency: "GHS",
  dateFormat: "MM/DD/YYYY",
  language: "en",
  notifications: {
    email: true,
    browser: true,
    mobile: false,
  },
  appearance: {
    colorScheme: "blue",
    fontSize: "medium",
    sidebarCompact: false,
  },
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: async () => {},
  isLoading: true,
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load settings from API on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/settings")

        if (!response.ok) {
          throw new Error("Failed to load settings")
        }

        const data = await response.json()

        if (data && data.settings) {
          setSettings(data.settings)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
        // Use default settings if loading fails
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Update settings
  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      setIsLoading(true)

      // Merge new settings with existing settings
      const updatedSettings = {
        ...settings,
        ...newSettings,
        // Handle nested objects
        notifications: {
          ...settings.notifications,
          ...(newSettings.notifications || {}),
        },
        appearance: {
          ...settings.appearance,
          ...(newSettings.appearance || {}),
        },
      }

      // Update local state immediately for responsive UI
      setSettings(updatedSettings)

      // Save to API
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings: updatedSettings }),
      })

      if (!response.ok) {
        throw new Error("Failed to save settings")
      }

      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })

      // Apply theme change if needed
      if (newSettings.theme) {
        document.documentElement.classList.remove("light", "dark")
        if (newSettings.theme !== "system") {
          document.documentElement.classList.add(newSettings.theme)
        } else {
          // Check system preference
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
          document.documentElement.classList.add(prefersDark ? "dark" : "light")
        }
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })

      // Revert to previous settings on error
      const response = await fetch("/api/settings")
      if (response.ok) {
        const data = await response.json()
        if (data && data.settings) {
          setSettings(data.settings)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)

