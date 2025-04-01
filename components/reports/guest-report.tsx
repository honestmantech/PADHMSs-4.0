"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GuestReport() {
  // Sample data - in a real app, this would come from your API
  const monthlyData = [
    { name: "Jan", newGuests: 45, returningGuests: 20 },
    { name: "Feb", newGuests: 50, returningGuests: 25 },
    { name: "Mar", newGuests: 55, returningGuests: 30 },
    { name: "Apr", newGuests: 60, returningGuests: 35 },
    { name: "May", newGuests: 65, returningGuests: 40 },
    { name: "Jun", newGuests: 70, returningGuests: 45 },
    { name: "Jul", newGuests: 75, returningGuests: 50 },
    { name: "Aug", newGuests: 70, returningGuests: 55 },
    { name: "Sep", newGuests: 65, returningGuests: 50 },
    { name: "Oct", newGuests: 60, returningGuests: 45 },
    { name: "Nov", newGuests: 55, returningGuests: 40 },
    { name: "Dec", newGuests: 50, returningGuests: 35 },
  ]

  const stayDurationData = [
    { name: "1-2 Days", value: 35 },
    { name: "3-5 Days", value: 40 },
    { name: "6-10 Days", value: 15 },
    { name: "10+ Days", value: 10 },
  ]

  const bookingSourceData = [
    { name: "Direct", value: 40 },
    { name: "Online Travel Agencies", value: 35 },
    { name: "Corporate", value: 15 },
    { name: "Travel Agents", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const PieCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].name}`}</p>
          <p className="text-sm text-muted-foreground">{`${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  // Calculate totals
  const totalNewGuests = monthlyData.reduce((sum, item) => sum + item.newGuests, 0)
  const totalReturningGuests = monthlyData.reduce((sum, item) => sum + item.returningGuests, 0)
  const totalGuests = totalNewGuests + totalReturningGuests
  const returnRate = ((totalReturningGuests / totalGuests) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Guests</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNewGuests}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            <CardDescription>Percentage of returning guests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{returnRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guests">
        <TabsList>
          <TabsTrigger value="guests">Guest Trends</TabsTrigger>
          <TabsTrigger value="duration">Stay Duration</TabsTrigger>
          <TabsTrigger value="sources">Booking Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="guests">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Monthly Guest Distribution</CardTitle>
              <CardDescription>New vs returning guests by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="newGuests" name="New Guests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returningGuests" name="Returning Guests" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duration">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Stay Duration</CardTitle>
              <CardDescription>Distribution of guest stay durations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stayDurationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stayDurationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieCustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Booking Sources</CardTitle>
              <CardDescription>Distribution of booking channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieCustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

