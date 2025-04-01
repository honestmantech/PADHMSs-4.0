"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BedDouble, CheckCircle, Clock, Wrench } from "lucide-react"

export function RoomsStats() {
  // In a real app, this data would come from your API
  const stats = {
    totalRooms: 32,
    available: 15,
    occupied: 12,
    reserved: 3,
    maintenance: 2,
    occupancyRate: 37.5, // (12/32) * 100
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          <BedDouble className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRooms}</div>
          <p className="text-xs text-muted-foreground">{stats.occupancyRate.toFixed(1)}% occupancy rate</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.available / stats.totalRooms) * 100).toFixed(1)}% of total rooms
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupied</CardTitle>
          <BedDouble className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.occupied}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.occupied / stats.totalRooms) * 100).toFixed(1)}% of total rooms
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reserved</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.reserved}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.reserved / stats.totalRooms) * 100).toFixed(1)}% of total rooms
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          <Wrench className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.maintenance}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.maintenance / stats.totalRooms) * 100).toFixed(1)}% of total rooms
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

