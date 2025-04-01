"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function BookingsFilters() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative w-full sm:w-auto flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search bookings..."
          className="w-full pl-9 h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[150px] h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
          <SelectItem value="CHECKED_IN">Checked In</SelectItem>
          <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-[200px] justify-start text-left font-normal h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Filter by date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="rounded-md border" />
        </PopoverContent>
      </Popover>
    </div>
  )
}

