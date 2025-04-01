"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, UserCheck, CalendarRange, Star } from "lucide-react"

export function GuestsStats() {
  // In a real app, this data would come from your API
  const stats = {
    totalGuests: 245,
    newGuestsThisMonth: 28,
    returningGuests: 87,
    averageStay: 3.5,
    topRatedGuests: 42,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGuests}</div>
          <p className="text-xs text-muted-foreground">All registered guests</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Guests</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <UserPlus className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.newGuestsThisMonth}</div>
          <p className="text-xs text-muted-foreground">New guests this month</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Returning Guests</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCheck className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.returningGuests}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.returningGuests / stats.totalGuests) * 100).toFixed(1)}% of total guests
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Stay</CardTitle>
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <CalendarRange className="h-4 w-4 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.averageStay} days</div>
          <p className="text-xs text-muted-foreground">Average length of stay</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Star className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{stats.topRatedGuests}</div>
          <p className="text-xs text-muted-foreground">Guests with 5-star ratings</p>
        </CardContent>
      </Card>
    </div>
  )
}

