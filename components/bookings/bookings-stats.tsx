"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, DollarSign } from "lucide-react"

export function BookingsStats() {
  // In a real app, this data would come from your API
  const stats = {
    totalBookings: 125,
    pending: 15,
    confirmed: 45,
    checkedIn: 30,
    checkedOut: 25,
    cancelled: 10,
    revenue: 25000,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">All time bookings</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className="h-4 w-4 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.pending / stats.totalBookings) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.confirmed / stats.totalBookings) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Checked In</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.checkedIn}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.checkedIn / stats.totalBookings) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <XCircle className="h-4 w-4 text-gray-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">{stats.checkedOut}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.checkedOut / stats.totalBookings) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₵{stats.revenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total revenue from bookings</p>
        </CardContent>
      </Card>
    </div>
  )
}

