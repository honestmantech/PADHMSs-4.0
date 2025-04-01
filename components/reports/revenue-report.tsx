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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevenueReport() {
  // Sample data - in a real app, this would come from your API
  const monthlyData = [
    { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
    { name: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
    { name: "Mar", revenue: 2000, expenses: 1200, profit: 800 },
    { name: "Apr", revenue: 2780, expenses: 1908, profit: 872 },
    { name: "May", revenue: 1890, expenses: 1800, profit: 90 },
    { name: "Jun", revenue: 2390, expenses: 1800, profit: 590 },
    { name: "Jul", revenue: 3490, expenses: 2300, profit: 1190 },
    { name: "Aug", revenue: 4000, expenses: 2400, profit: 1600 },
    { name: "Sep", revenue: 3200, expenses: 2100, profit: 1100 },
    { name: "Oct", revenue: 2800, expenses: 2000, profit: 800 },
    { name: "Nov", revenue: 3300, expenses: 2200, profit: 1100 },
    { name: "Dec", revenue: 5000, expenses: 2800, profit: 2200 },
  ]

  const revenueSourceData = [
    { name: "Room Bookings", value: 65 },
    { name: "Restaurant", value: 15 },
    { name: "Events", value: 10 },
    { name: "Other Services", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ₵${entry.value.toLocaleString()}`}
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
  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = monthlyData.reduce((sum, item) => sum + item.profit, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalProfit.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bar">
        <TabsList>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="sources">Revenue Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Monthly Revenue vs Expenses</CardTitle>
              <CardDescription>Financial performance breakdown by month</CardDescription>
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
                    <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₵${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke="#22c55e" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Sources</CardTitle>
              <CardDescription>Breakdown of revenue by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueSourceData.map((entry, index) => (
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

