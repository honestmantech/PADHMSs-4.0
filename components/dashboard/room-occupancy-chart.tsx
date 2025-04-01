"use client"

import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { date: "Apr 01", occupancyRate: 65, avgRate: 120 },
  { date: "Apr 02", occupancyRate: 70, avgRate: 125 },
  { date: "Apr 03", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 04", occupancyRate: 80, avgRate: 135 },
  { date: "Apr 05", occupancyRate: 85, avgRate: 140 },
  { date: "Apr 06", occupancyRate: 80, avgRate: 135 },
  { date: "Apr 07", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 08", occupancyRate: 70, avgRate: 125 },
  { date: "Apr 09", occupancyRate: 65, avgRate: 120 },
  { date: "Apr 10", occupancyRate: 60, avgRate: 115 },
  { date: "Apr 11", occupancyRate: 65, avgRate: 120 },
  { date: "Apr 12", occupancyRate: 70, avgRate: 125 },
  { date: "Apr 13", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 14", occupancyRate: 80, avgRate: 135 },
  { date: "Apr 15", occupancyRate: 85, avgRate: 140 },
  { date: "Apr 16", occupancyRate: 90, avgRate: 145 },
  { date: "Apr 17", occupancyRate: 85, avgRate: 140 },
  { date: "Apr 18", occupancyRate: 80, avgRate: 135 },
  { date: "Apr 19", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 20", occupancyRate: 70, avgRate: 125 },
  { date: "Apr 21", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 22", occupancyRate: 80, avgRate: 135 },
  { date: "Apr 23", occupancyRate: 85, avgRate: 140 },
  { date: "Apr 24", occupancyRate: 90, avgRate: 145 },
  { date: "Apr 25", occupancyRate: 85, avgRate: 140 },
  { date: "Apr 26", occupancyRate: 80, avgRate: 135 },
  { date: "Apr 27", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 28", occupancyRate: 70, avgRate: 125 },
  { date: "Apr 29", occupancyRate: 75, avgRate: 130 },
  { date: "Apr 30", occupancyRate: 80, avgRate: 135 },
]

export function RoomOccupancyChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="date" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} />
        <YAxis
          yAxisId="left"
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `₵${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          formatter={(value, name) => {
            if (name === "occupancyRate") return [`${value}%`, "Occupancy Rate"]
            if (name === "avgRate") return [`₵${value}`, "Average Rate"]
            return [value, name]
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="occupancyRate"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="avgRate"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

