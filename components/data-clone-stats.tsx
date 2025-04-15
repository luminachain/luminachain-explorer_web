"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function DataCloneStats() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Simulate fetching data clone statistics
    const mockData = [
      { name: "Ethereum", value: 45, color: "#627EEA" },
      { name: "Solana", value: 25, color: "#00FFA3" },
      { name: "Polkadot", value: 15, color: "#E6007A" },
      { name: "Avalanche", value: 10, color: "#E84142" },
      { name: "BNB Chain", value: 5, color: "#F3BA2F" },
    ]

    setData(mockData)
  }, [])

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
            formatter={(value: any) => [`${value} GB`, "Data Cloned"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

