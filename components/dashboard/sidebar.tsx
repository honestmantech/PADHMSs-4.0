"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Bed, CalendarDays, CreditCard, Home, LogOut, Menu, Settings, Users, X, Wine } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Bookings",
      icon: CalendarDays,
      href: "/dashboard/bookings",
      active: pathname === "/dashboard/bookings",
    },
    {
      label: "Rooms",
      icon: Bed,
      href: "/dashboard/rooms",
      active: pathname === "/dashboard/rooms",
    },
    {
      label: "Guests",
      icon: Users,
      href: "/dashboard/guests",
      active: pathname === "/dashboard/guests",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/dashboard/payments",
      active: pathname === "/dashboard/payments",
    },
    {
      label: "Bar",
      icon: Wine,
      href: "/dashboard/bar",
      active: pathname === "/dashboard/bar",
    },
    {
      label: "Reports",
      icon: BarChart,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-background shadow-md"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </div>

      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 border-r bg-card shadow-sm transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bed className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">PadHMS</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <div className="space-y-1">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    route.active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
                  )}
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-5 w-5" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t mt-6">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}

