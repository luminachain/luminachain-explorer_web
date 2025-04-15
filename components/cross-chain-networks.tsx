"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface Network {
  name: string
  status: "active" | "pending" | "inactive"
  connections: number
  lastSync: Date
}

export function CrossChainNetworks() {
  const [networks, setNetworks] = useState<Network[]>([])

  useEffect(() => {
    // Simulate fetching networks
    const mockNetworks: Network[] = [
      {
        name: "Ethereum",
        status: "active",
        connections: 245,
        lastSync: new Date(Date.now() - 120000),
      },
      {
        name: "Solana",
        status: "active",
        connections: 187,
        lastSync: new Date(Date.now() - 180000),
      },
      {
        name: "Polkadot",
        status: "active",
        connections: 156,
        lastSync: new Date(Date.now() - 240000),
      },
      {
        name: "Avalanche",
        status: "pending",
        connections: 89,
        lastSync: new Date(Date.now() - 360000),
      },
      {
        name: "BNB Chain",
        status: "inactive",
        connections: 0,
        lastSync: new Date(Date.now() - 86400000),
      },
    ]

    setNetworks(mockNetworks)
  }, [])

  function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  function getStatusBadge(status: "active" | "pending" | "inactive") {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">Active</Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30">
            Pending
          </Badge>
        )
      case "inactive":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30">Inactive</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {networks.map((network, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
        >
          <div>
            <div className="flex items-center mb-1">
              <h4 className="font-medium mr-2">{network.name}</h4>
              {getStatusBadge(network.status)}
            </div>
            <p className="text-sm text-gray-400">Last synced {timeAgo(network.lastSync)}</p>
          </div>

          <div className="text-right">
            <p className="font-medium">{network.connections}</p>
            <p className="text-sm text-gray-400">connections</p>
          </div>
        </div>
      ))}
    </div>
  )
}

