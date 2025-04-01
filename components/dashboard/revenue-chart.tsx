"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { month: "Jan", revenue: 12000, target: 10000 },
  { month: "Feb", revenue: 15000, target: 12000 },
  { month: "Mar", revenue: 18000, target: 15000 },
  { month: "Apr", revenue: 20000, target: 18000 },
  { month: "May", revenue: 22000, target: 20000 },
  { month: "Jun", revenue: 25000, target: 22000 },
  { month: "Jul", revenue: 24000, target: 23000 },
  { month: "Aug", revenue: 22000, target: 21000 },
  { month: "Sep", revenue: 20000, target: 19000 },
  { month: "Oct", revenue: 18000, target: 17000 },
  { month: "Nov", revenue: 16000, target: 15000 },
  { month: "Dec", revenue: 14000, target: 13000 },
]

export function RevenueChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="month" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `₵${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          formatter={(value) => [`₵${value.toLocaleString()}`, "Amount"]}
        />
        <Legend />
        <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="target" name="Target" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

