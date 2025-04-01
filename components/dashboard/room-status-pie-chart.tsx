"use client"

import { useTheme } from "next-themes"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Single", value: 8, available: 5, color: "#3b82f6" },
  { name: "Double", value: 12, available: 7, color: "#10b981" },
  { name: "Twin", value: 6, available: 3, color: "#f59e0b" },
  { name: "Suite", value: 4, available: 2, color: "#8b5cf6" },
  { name: "Deluxe", value: 2, available: 1, color: "#ec4899" },
]

export function RoomStatusPieChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const COLORS = data.map((item) => item.color)

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
      <text
        x={x}
        y={y}
        fill={isDark ? "white" : "black"}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [`${value} rooms`, name]}
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value, entry, index) => (
              <span style={{ color: isDark ? "white" : "black" }}>
                {value} ({data[index].available} available)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

