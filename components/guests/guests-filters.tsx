"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, Download, Upload } from "lucide-react"

export function GuestsFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            className="w-full pl-8 md:w-[300px] lg:w-[400px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button variant="outline" size="sm" className="h-9">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px] transition-all duration-200 focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Guests</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="name_asc">
          <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="stays">Most Stays</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Download className="h-4 w-4" />
            <span className="sr-only">Export</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Upload className="h-4 w-4" />
            <span className="sr-only">Import</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

