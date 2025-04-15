"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export function NetworkCharts() {
  const [period, setPeriod] = useState("week")

  // Mock data for charts
  const transactionData = {
    day: [
      { time: "00:00", value: 1200 },
      { time: "04:00", value: 800 },
      { time: "08:00", value: 1500 },
      { time: "12:00", value: 2200 },
      { time: "16:00", value: 2800 },
      { time: "20:00", value: 2000 },
      { time: "23:59", value: 1800 },
    ],
    week: [
      { time: "Mon", value: 12000 },
      { time: "Tue", value: 14000 },
      { time: "Wed", value: 16000 },
      { time: "Thu", value: 15000 },
      { time: "Fri", value: 18000 },
      { time: "Sat", value: 20000 },
      { time: "Sun", value: 22000 },
    ],
    month: [
      { time: "Week 1", value: 80000 },
      { time: "Week 2", value: 90000 },
      { time: "Week 3", value: 100000 },
      { time: "Week 4", value: 110000 },
    ],
  }

  const hashRateData = {
    day: [
      { time: "00:00", value: 40 },
      { time: "04:00", value: 42 },
      { time: "08:00", value: 44 },
      { time: "12:00", value: 45 },
      { time: "16:00", value: 47 },
      { time: "20:00", value: 46 },
      { time: "23:59", value: 45 },
    ],
    week: [
      { time: "Mon", value: 40 },
      { time: "Tue", value: 41 },
      { time: "Wed", value: 43 },
      { time: "Thu", value: 44 },
      { time: "Fri", value: 45 },
      { time: "Sat", value: 46 },
      { time: "Sun", value: 47 },
    ],
    month: [
      { time: "Week 1", value: 38 },
      { time: "Week 2", value: 40 },
      { time: "Week 3", value: 43 },
      { time: "Week 4", value: 47 },
    ],
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="transactions" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="hashrate">Hash Rate</TabsTrigger>
            </TabsList>

            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-xs rounded-md ${period === "day" ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-400"}`}
                onClick={() => setPeriod("day")}
              >
                24h
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md ${period === "week" ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-400"}`}
                onClick={() => setPeriod("week")}
              >
                7d
              </button>
              <button
                className={`px-3 py-1 text-xs rounded-md ${period === "month" ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-400"}`}
                onClick={() => setPeriod("month")}
              >
                30d
              </button>
            </div>
          </div>

          <TabsContent value="transactions" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionData[period as keyof typeof transactionData]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8B5CF6"
                    fill="url(#colorTransactions)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="hashrate" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hashRateData[period as keyof typeof hashRateData]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    labelStyle={{ color: "#F9FAFB" }}
                    formatter={(value: any) => [`${value} TH/s`, "Hash Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    dot={{ fill: "#06B6D4", r: 4 }}
                    activeDot={{ fill: "#06B6D4", r: 6, stroke: "#67E8F9", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

