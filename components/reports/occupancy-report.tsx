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
  LineChart,
  Line,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OccupancyReport() {
  // Sample data - in a real app, this would come from your API
  const monthlyData = [
    { name: "Jan", occupancyRate: 65, avgDailyRate: 120, revPAR: 78 },
    { name: "Feb", occupancyRate: 70, avgDailyRate: 125, revPAR: 87.5 },
    { name: "Mar", occupancyRate: 75, avgDailyRate: 130, revPAR: 97.5 },
    { name: "Apr", occupancyRate: 80, avgDailyRate: 135, revPAR: 108 },
    { name: "May", occupancyRate: 85, avgDailyRate: 140, revPAR: 119 },
    { name: "Jun", occupancyRate: 90, avgDailyRate: 145, revPAR: 130.5 },
    { name: "Jul", occupancyRate: 95, avgDailyRate: 150, revPAR: 142.5 },
    { name: "Aug", occupancyRate: 90, avgDailyRate: 155, revPAR: 139.5 },
    { name: "Sep", occupancyRate: 85, avgDailyRate: 150, revPAR: 127.5 },
    { name: "Oct", occupancyRate: 80, avgDailyRate: 145, revPAR: 116 },
    { name: "Nov", occupancyRate: 75, avgDailyRate: 140, revPAR: 105 },
    { name: "Dec", occupancyRate: 70, avgDailyRate: 135, revPAR: 94.5 },
  ]

  const roomTypeData = [
    { name: "Single", occupancyRate: 75 },
    { name: "Double", occupancyRate: 85 },
    { name: "Twin", occupancyRate: 70 },
    { name: "Suite", occupancyRate: 65 },
    { name: "Deluxe", occupancyRate: 90 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${
                entry.name === "Occupancy Rate"
                  ? `${entry.value}%`
                  : entry.name === "Avg Daily Rate"
                    ? `₵${entry.value}`
                    : `₵${entry.value}`
              }`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Calculate averages
  const avgOccupancy = monthlyData.reduce((sum, item) => sum + item.occupancyRate, 0) / monthlyData.length
  const avgDailyRate = monthlyData.reduce((sum, item) => sum + item.avgDailyRate, 0) / monthlyData.length
  const avgRevPAR = monthlyData.reduce((sum, item) => sum + item.revPAR, 0) / monthlyData.length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Occupancy Rate</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Rate</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{avgDailyRate.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
            <CardDescription>Revenue per available room</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{avgRevPAR.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="occupancy">
        <TabsList>
          <TabsTrigger value="occupancy">Occupancy Trends</TabsTrigger>
          <TabsTrigger value="rates">Rate Analysis</TabsTrigger>
          <TabsTrigger value="roomTypes">Room Type Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="occupancy">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Monthly Occupancy Rate</CardTitle>
              <CardDescription>Percentage of rooms occupied by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="occupancyRate"
                      name="Occupancy Rate"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Rate Analysis</CardTitle>
              <CardDescription>Average daily rate and RevPAR by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₵${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="avgDailyRate" name="Avg Daily Rate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="revPAR" name="RevPAR" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roomTypes">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Room Type Performance</CardTitle>
              <CardDescription>Occupancy rate by room type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roomTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="occupancyRate" name="Occupancy Rate" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

