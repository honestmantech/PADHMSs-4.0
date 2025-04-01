"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if we're on a login/auth page
  const isAuthPage = pathname?.includes("/login") || pathname?.includes("/signup") || pathname === "/"

  // Handle responsive sidebar
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  if (isAuthPage) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          {children}
        </div>
        <Toaster />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} isMobile={isMobile} />
        <div
          className={cn(
            "flex flex-col flex-1 w-full overflow-hidden transition-all duration-300",
            sidebarOpen && !isMobile ? "lg:ml-72" : "",
          )}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-2">
            <div className="container mx-auto px-4 py-4">{children}</div>
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

