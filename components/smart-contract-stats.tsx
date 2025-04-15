"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function SmartContractStats() {
  const [contractData, setContractData] = useState<any[]>([])

  useEffect(() => {
    // Simulate fetching smart contract statistics
    const mockData = [
      { name: "Tokens", deployed: 245, calls: 12567 },
      { name: "DeFi", deployed: 187, calls: 8932 },
      { name: "NFTs", deployed: 156, calls: 5678 },
      { name: "Games", deployed: 89, calls: 3421 },
      { name: "Other", deployed: 123, calls: 4532 },
    ]

    setContractData(mockData)
  }, [])

  const contractStats = [
    { name: "Total Contracts", value: "800+" },
    { name: "Daily Calls", value: "35,130" },
    { name: "Avg. Gas Used", value: "125,000" },
    { name: "Cross-Chain Contracts", value: "56" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {contractStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <p className="text-sm text-gray-400 mb-1">{stat.name}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Contract Activity by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contractData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                labelStyle={{ color: "#F9FAFB" }}
              />
              <Bar dataKey="deployed" name="Contracts Deployed" fill="#8B5CF6" />
              <Bar dataKey="calls" name="Contract Calls (x100)" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Custom Contract Platform</h3>
        <p className="text-sm text-gray-400 mb-4">
          LuminaChain features a custom smart contract platform with its own language and virtual machine.
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Contract Language</span>
            <span className="font-medium">LuminaScript</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Virtual Machine</span>
            <span className="font-medium">LuminaVM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Cross-Chain Support</span>
            <span className="font-medium text-green-400">Native</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Data Cloning</span>
            <span className="font-medium text-green-400">Supported</span>
          </div>
        </div>
      </div>
    </div>
  )
}

