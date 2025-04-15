"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Database, LinkIcon, Zap } from "lucide-react"

export function CrossChainStats() {
  const stats = [
    {
      name: "Cross-Chain Transactions",
      value: "24,567",
      icon: <ArrowLeftRight className="h-5 w-5 text-cyan-400" />,
      change: "+12.3%",
      changeType: "positive",
    },
    {
      name: "Data Transfers",
      value: "156.8 GB",
      icon: <Database className="h-5 w-5 text-purple-400" />,
      change: "+8.7%",
      changeType: "positive",
    },
    {
      name: "Active Bridges",
      value: "5",
      icon: <LinkIcon className="h-5 w-5 text-blue-400" />,
      change: "+1 new",
      changeType: "positive",
    },
    {
      name: "Bridge Throughput",
      value: "1.2K tx/h",
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      change: "+5.4%",
      changeType: "positive",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === "positive"
                      ? "text-green-400"
                      : stat.changeType === "negative"
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div className="p-2 rounded-full bg-gray-800">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

