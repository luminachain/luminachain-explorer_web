"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function TokenomicsStats() {
  // Mock data for tokenomics
  const distributionData = [
    { name: "Mining Rewards", value: 72, color: "#8B5CF6" },
    { name: "Ecosystem Fund", value: 12, color: "#06B6D4" },
    { name: "Team & Advisors", value: 4, color: "#EC4899" },
    { name: "Strategic Reserve", value: 4, color: "#10B981" },
    { name: "Community Incentives", value: 8, color: "#F59E0B" },
  ]

  const tokenStats = [
    { name: "Circulating Supply", value: "12,456,789 LMT" },
    { name: "Current Inflation Rate", value: "8.2% annually" },
    { name: "Block Reward", value: "10 LMT" },
    { name: "Reward Halving", value: "Every 6 months" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Token Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                formatter={(value: any) => [`${value}%`, "Percentage"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tokenStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <p className="text-sm text-gray-400 mb-1">{stat.name}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Unlimited Supply Model</h3>
        <p className="text-sm text-gray-400 mb-4">
          LuminaChain uses an unlimited supply model with a controlled inflation rate through periodic halving.
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Initial Block Reward</span>
            <span className="font-medium">10 LMT</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Halving Schedule</span>
            <span className="font-medium">Every 6 months</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Inflation Control</span>
            <span className="font-medium">Dynamic adjustment based on network activity</span>
          </div>
        </div>
      </div>
    </div>
  )
}

