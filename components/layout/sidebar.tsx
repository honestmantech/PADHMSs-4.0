"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BedDouble,
  CalendarRange,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  X,
  LogOut,
  HelpCircle,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        })
        window.location.href = "/login"
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Only render client-side
  if (!isMounted) {
    return null
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Rooms",
      href: "/dashboard/rooms",
      icon: <BedDouble className="h-5 w-5" />,
    },
    {
      title: "Bookings",
      href: "/dashboard/bookings",
      icon: <CalendarRange className="h-5 w-5" />,
    },
    {
      title: "Guests",
      href: "/dashboard/guests",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Documentation",
      href: "/dashboard/documentation",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0",
      )}
    >
      <div className="flex h-14 items-center px-4 border-b lg:h-[60px]">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M3 7V5c0-1.1.9-2 2-2h2" />
            <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
            <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
            <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            <rect width="7" height="5" x="7" y="7" rx="1" />
            <rect width="7" height="5" x="10" y="12" rx="1" />
          </svg>
          <span className="text-xl">PadHMS</span>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
            >
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {item.icon}
                {item.title}
              </Button>
            </Link>
          ))}
        </div>
        <Separator className="my-2" />
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
        <div className="p-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">Need Help?</h4>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Check our documentation or contact support for assistance.
            </p>
            <Button className="mt-3 w-full text-xs" size="sm" asChild>
              <Link href="/dashboard/documentation">View Documentation</Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

