"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function TokenMetrics() {
  // Mock data for charts
  const supplyData = [
    { name: "Jan", value: 10000000 },
    { name: "Feb", value: 10500000 },
    { name: "Mar", value: 11000000 },
    { name: "Apr", value: 11400000 },
    { name: "May", value: 11800000 },
    { name: "Jun", value: 12100000 },
    { name: "Jul", value: 12400000 },
  ]

  const priceData = [
    { name: "Jan", value: 0.05 },
    { name: "Feb", value: 0.07 },
    { name: "Mar", value: 0.09 },
    { name: "Apr", value: 0.08 },
    { name: "May", value: 0.1 },
    { name: "Jun", value: 0.09 },
    { name: "Jul", value: 0.0875 },
  ]

  const transactionData = [
    { name: "Jan", value: 25000 },
    { name: "Feb", value: 35000 },
    { name: "Mar", value: 45000 },
    { name: "Apr", value: 40000 },
    { name: "May", value: 55000 },
    { name: "Jun", value: 65000 },
    { name: "Jul", value: 75000 },
  ]

  const tokenStats = [
    { name: "Circulating Supply", value: "12,456,789 LMT" },
    { name: "Market Cap", value: "$1,089,969" },
    { name: "24h Volume", value: "$245,678" },
    { name: "Current Block Reward", value: "10 LMT" },
    { name: "Next Halving", value: "In 2 months" },
    { name: "Total Miners Reward", value: "8,765,432 LMT" },
  ]

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <Tabs defaultValue="supply">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="supply">Token Supply</TabsTrigger>
            <TabsTrigger value="price">Price History</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Volume</TabsTrigger>
          </TabsList>

          <TabsContent value="supply">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={supplyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6", r: 4 }}
                    activeDot={{ fill: "#8B5CF6", r: 6, stroke: "#C4B5FD", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {tokenStats.map((stat, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="price">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    labelStyle={{ color: "#F9FAFB" }}
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Current Price</p>
                <p className="text-lg font-bold">$0.0875</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">24h Change</p>
                <p className="text-lg font-bold text-red-400">-1.2%</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">All-Time High</p>
                <p className="text-lg font-bold">$0.12</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">All-Time Low</p>
                <p className="text-lg font-bold">$0.03</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">30d Change</p>
                <p className="text-lg font-bold text-green-400">+12.5%</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Trading Pairs</p>
                <p className="text-lg font-bold">5</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#EC4899"
                    strokeWidth={2}
                    dot={{ fill: "#EC4899", r: 4 }}
                    activeDot={{ fill: "#EC4899", r: 6, stroke: "#F9A8D4", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Daily Transactions</p>
                <p className="text-lg font-bold">75,432</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Monthly Growth</p>
                <p className="text-lg font-bold text-green-400">+15.4%</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Avg. Transaction Fee</p>
                <p className="text-lg font-bold">0.0025 LMT</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Avg. Transaction Value</p>
                <p className="text-lg font-bold">24.5 LMT</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Total Transactions</p>
                <p className="text-lg font-bold">12.4M</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Cross-Chain %</p>
                <p className="text-lg font-bold">8.2%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

