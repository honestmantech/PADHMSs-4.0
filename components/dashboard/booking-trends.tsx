"use client"

import { useTheme } from "next-themes"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Jan", bookings: 65 },
  { name: "Feb", bookings: 59 },
  { name: "Mar", bookings: 80 },
  { name: "Apr", bookings: 81 },
  { name: "May", bookings: 56 },
  { name: "Jun", bookings: 55 },
  { name: "Jul", bookings: 40 },
  { name: "Aug", bookings: 70 },
  { name: "Sep", bookings: 90 },
  { name: "Oct", bookings: 75 },
  { name: "Nov", bookings: 60 },
  { name: "Dec", bookings: 85 },
]

export function BookingTrends() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} />
        <YAxis stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          formatter={(value) => [`${value} bookings`, "Bookings"]}
        />
        <Area type="monotone" dataKey="bookings" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

