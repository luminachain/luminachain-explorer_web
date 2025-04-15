"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MiningStats() {
  const [nextHalving, setNextHalving] = useState<number>(0)

  useEffect(() => {
    // Simulate countdown to next halving
    const interval = setInterval(() => {
      const now = new Date()
      const halvingDate = new Date(now.getFullYear(), now.getMonth() + 2, 1)
      const timeLeft = halvingDate.getTime() - now.getTime()
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

      setNextHalving(daysLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const miningStats = [
    {
      name: "Current Block Reward",
      value: "10 LMT",
      progress: 100,
      progressColor: "bg-purple-500",
    },
    {
      name: "Network Difficulty",
      value: "45.7 TH",
      progress: 78,
      progressColor: "bg-cyan-500",
    },
    {
      name: "Active Miners",
      value: "12,456",
      progress: 65,
      progressColor: "bg-blue-500",
    },
    {
      name: "Mining Pool Distribution",
      value: "32 pools",
      progress: 42,
      progressColor: "bg-pink-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Next Halving</h3>
          <span className="text-purple-400 font-bold">{nextHalving} days</span>
        </div>
        <Progress
          value={100 - (nextHalving / 60) * 100}
          className="h-2 bg-gray-700"
          indicatorClassName="bg-gradient-to-r from-purple-500 to-cyan-500"
        />
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Current: 10 LMT</span>
          <span>After: 5 LMT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miningStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm text-gray-400">{stat.name}</h4>
                <span className="font-bold">{stat.value}</span>
              </div>
              <Progress value={stat.progress} className="h-1 bg-gray-700" indicatorClassName={stat.progressColor} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Mining Algorithm</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Algorithm</span>
            <span className="font-medium">RandomX (Modified)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Block Time</span>
            <span className="font-medium">60 seconds</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">ASIC Resistance</span>
            <span className="font-medium text-green-400">High</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Privacy Features</span>
            <span className="font-medium text-red-400">Removed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

