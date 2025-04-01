"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "01", revenue: 1200 },
  { name: "02", revenue: 900 },
  { name: "03", revenue: 1500 },
  { name: "04", revenue: 1800 },
  { name: "05", revenue: 2000 },
  { name: "06", revenue: 1600 },
  { name: "07", revenue: 1400 },
  { name: "08", revenue: 1900 },
  { name: "09", revenue: 2200 },
  { name: "10", revenue: 2100 },
  { name: "11", revenue: 1700 },
  { name: "12", revenue: 1300 },
  { name: "13", revenue: 1500 },
  { name: "14", revenue: 1800 },
  { name: "15", revenue: 2000 },
  { name: "16", revenue: 2200 },
  { name: "17", revenue: 1900 },
  { name: "18", revenue: 1600 },
  { name: "19", revenue: 1700 },
  { name: "20", revenue: 1400 },
  { name: "21", revenue: 1200 },
  { name: "22", revenue: 1300 },
  { name: "23", revenue: 1500 },
  { name: "24", revenue: 1800 },
  { name: "25", revenue: 2100 },
  { name: "26", revenue: 2400 },
  { name: "27", revenue: 2200 },
  { name: "28", revenue: 2000 },
  { name: "29", revenue: 1800 },
  { name: "30", revenue: 1600 },
]

export function DashboardChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₵${value}`}
        />
        <Tooltip
          cursor={{ fill: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)" }}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          formatter={(value) => [`₵${value}`, "Revenue"]}
        />
        <Bar dataKey="revenue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

