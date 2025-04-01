"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase-client"

export function BarAnalytics() {
  const [salesData, setSalesData] = useState<any[]>([])
  const [topItems, setTopItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true)

        // Fetch sales data
        const { data: salesData, error: salesError } = await supabase
          .from("bar_sales_daily")
          .select("*")
          .order("date")
          .limit(30)

        if (salesError) {
          console.error("Error fetching sales data:", salesError)
        } else {
          setSalesData(salesData || [])
        }

        // Fetch top selling items
        const { data: itemsData, error: itemsError } = await supabase
          .from("bar_top_items")
          .select("*")
          .order("quantity", { ascending: false })
          .limit(5)

        if (itemsError) {
          console.error("Error fetching top items:", itemsError)
        } else {
          setTopItems(itemsData || [])
        }
      } catch (error) {
        console.error("Failed to fetch analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const formatCurrency = (value: number) => `₵${value.toFixed(2)}`

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sales">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Trends</TabsTrigger>
          <TabsTrigger value="items">Top Items</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="total" name="Total Sales" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topItems}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [value, name === "revenue" ? "Revenue" : "Quantity"]} />
                    <Legend />
                    <Bar dataKey="quantity" name="Quantity Sold" fill="#8884d8" />
                    <Bar dataKey="revenue" name="Revenue (₵)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[300px] w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Cash", value: 40 },
                        { name: "Mobile Money", value: 30 },
                        { name: "Card", value: 20 },
                        { name: "Room Charge", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Cash", value: 40 },
                        { name: "Mobile Money", value: 30 },
                        { name: "Card", value: 20 },
                        { name: "Room Charge", value: 10 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
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

export default BarAnalytics

