"use client"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  DollarSign,
  Hotel,
  BedDouble,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react"
import { getDashboardStats } from "@/lib/db-utils"
import { DashboardChart } from "@/components/dashboard/dashboard-chart"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { UpcomingCheckIns } from "@/components/dashboard/upcoming-check-ins"
import { RoomOccupancyChart } from "@/components/dashboard/room-occupancy-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { Button } from "@/components/ui/button"
import { RoomStatusPieChart } from "@/components/dashboard/room-status-pie-chart"
import { BookingTrends } from "@/components/dashboard/booking-trends"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function DashboardPage() {
  // Get dashboard stats
  let stats
  try {
    stats = await getDashboardStats()
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    stats = {
      totalRooms: 0,
      availableRooms: 0,
      occupiedRooms: 0,
      occupancyRate: 0,
      todayCheckIns: 0,
      todayCheckOuts: 0,
      totalGuests: 0,
      totalBookings: 0,
      revenueThisMonth: 0,
      revenueLastMonth: 0,
      bookingsThisMonth: 0,
      bookingsLastMonth: 0,
    }
  }

  const revenueChange = stats.revenueLastMonth
    ? ((stats.revenueThisMonth - stats.revenueLastMonth) / stats.revenueLastMonth) * 100
    : 0

  const bookingsChange = stats.bookingsLastMonth
    ? ((stats.bookingsThisMonth - stats.bookingsLastMonth) / stats.bookingsLastMonth) * 100
    : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
          <p className="text-muted-foreground">Here's what's happening with your hotel today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </Button>
          <Button className="gap-2" onClick={() => (window.location.href = "/dashboard/bookings?view=calendar")}>
            <CalendarDays className="h-4 w-4" />
            <span>View Calendar</span>
          </Button>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Room Status</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Hotel className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRooms}</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium">{stats.availableRooms} available</span> /{" "}
                      {stats.occupiedRooms} occupied
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 h-2 w-24 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${stats.occupancyRate}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BedDouble className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{stats.occupiedRooms} rooms occupied</span>
                    {stats.occupancyRate > 70 ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800 dark:text-green-100">
                        High
                      </span>
                    ) : stats.occupancyRate > 40 ? (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                        Medium
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full dark:bg-red-800 dark:text-red-100">
                        Low
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₵{stats.revenueThisMonth.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    {revenueChange >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(revenueChange).toFixed(1)}% from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.bookingsThisMonth}</div>
                  <div className="flex items-center mt-1">
                    {bookingsChange >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs ${bookingsChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {Math.abs(bookingsChange).toFixed(1)}% from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Daily revenue for the current month</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardChart />
                </CardContent>
              </Card>

              <Card className="col-span-3 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Today's Activity</CardTitle>
                  <CardDescription>
                    {stats.todayCheckIns} check-ins, {stats.todayCheckOuts} check-outs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                            <Users className="h-4 w-4 text-green-600 dark:text-green-300" />
                          </div>
                          <div>
                            <p className="text-xs text-green-600 dark:text-green-300">Check-ins</p>
                            <p className="text-lg font-bold text-green-700 dark:text-green-200">
                              {stats.todayCheckIns}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-600 dark:text-blue-300">Check-outs</p>
                            <p className="text-lg font-bold text-blue-700 dark:text-blue-200">{stats.todayCheckOuts}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <UpcomingCheckIns />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest bookings across all rooms</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentBookings />
                </CardContent>
              </Card>

              <Card className="col-span-3 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Room Status Distribution</CardTitle>
                  <CardDescription>Breakdown of room types and availability</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoomStatusPieChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Occupancy Rate</CardTitle>
                  <CardDescription>Room occupancy over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <RoomOccupancyChart />
                </CardContent>
              </Card>

              <Card className="col-span-3 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <RevenueChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Guest Demographics</CardTitle>
                  <CardDescription>Breakdown of guest demographics</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="h-full flex items-center justify-center">
                    <Alert>
                      <AlertTitle>Coming Soon</AlertTitle>
                      <AlertDescription>
                        Guest demographics visualization will be available in the next update.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Booking Sources</CardTitle>
                  <CardDescription>Where bookings are coming from</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="h-full flex items-center justify-center">
                    <Alert>
                      <AlertTitle>Coming Soon</AlertTitle>
                      <AlertDescription>
                        Booking sources visualization will be available in the next update.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Booking patterns over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <BookingTrends />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Generate and download reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: "Occupancy Report", description: "Room occupancy statistics" },
                      { name: "Revenue Report", description: "Financial performance analysis" },
                      { name: "Guest Report", description: "Guest statistics and demographics" },
                      { name: "Inventory Report", description: "Room and amenity inventory" },
                      { name: "Staff Performance", description: "Staff activity and performance" },
                    ].map((report) => (
                      <div
                        key={report.name}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-xs text-muted-foreground">{report.description}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Generate
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2 shadow-sm hover:shadow transition-shadow">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Previously generated reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 p-3 bg-muted/50 text-sm font-medium">
                      <div>Report Name</div>
                      <div>Generated</div>
                      <div>Format</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      { name: "Monthly Occupancy", date: "2023-04-01", format: "PDF" },
                      { name: "Q1 Revenue", date: "2023-04-01", format: "Excel" },
                      { name: "Guest Analysis", date: "2023-03-15", format: "PDF" },
                      { name: "Staff Performance", date: "2023-03-01", format: "PDF" },
                      { name: "Inventory Status", date: "2023-02-15", format: "Excel" },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-4 p-3 text-sm border-t">
                        <div>{report.name}</div>
                        <div>{new Date(report.date).toLocaleDateString()}</div>
                        <div>{report.format}</div>
                        <div className="text-right space-x-2">
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
                            View
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}

