"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Cpu, Database, Activity, Zap, BarChart3, Users, LinkIcon } from "lucide-react"

export function NetworkStats() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      name: "Latest Block",
      value: "12,345,678",
      icon: <Database className="h-5 w-5 text-purple-400" />,
      change: "+1 min ago",
      changeType: "neutral",
    },
    {
      name: "Hash Rate",
      value: "45.7 TH/s",
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
      change: "+2.3%",
      changeType: "positive",
    },
    {
      name: "Transactions",
      value: "1.2M",
      icon: <Activity className="h-5 w-5 text-purple-400" />,
      change: "+5.7%",
      changeType: "positive",
    },
    {
      name: "Block Time",
      value: "60s",
      icon: <Clock className="h-5 w-5 text-cyan-400" />,
      change: "Stable",
      changeType: "neutral",
    },
    {
      name: "LMT Price",
      value: "$0.0875",
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      change: "-1.2%",
      changeType: "negative",
    },
    {
      name: "Active Miners",
      value: "12,456",
      icon: <Zap className="h-5 w-5 text-cyan-400" />,
      change: "+124",
      changeType: "positive",
    },
    {
      name: "Active Addresses",
      value: "89,745",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      change: "+3.4%",
      changeType: "positive",
    },
    {
      name: "Cross-Chain Links",
      value: "5",
      icon: <LinkIcon className="h-5 w-5 text-cyan-400" />,
      change: "+1 new",
      changeType: "positive",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Network Overview
        </h2>
        <div className="text-sm text-gray-400">Last updated: {currentTime.toLocaleTimeString()}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  )
}

