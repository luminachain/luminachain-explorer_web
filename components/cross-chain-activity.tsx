"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Database, LinkIcon, ExternalLink } from "lucide-react"

interface CrossChainData {
  id: string
  sourceChain: string
  targetChain: string
  type: "asset" | "data" | "clone"
  status: "completed" | "pending" | "failed"
  timestamp: Date
  value?: string
}

export function CrossChainActivity() {
  const [crossChainData, setCrossChainData] = useState<CrossChainData[]>([])

  useEffect(() => {
    // Simulate fetching cross-chain data
    const chains = ["Ethereum", "Solana", "Polkadot", "Avalanche", "BNB Chain"]
    const types: ("asset" | "data" | "clone")[] = ["asset", "data", "clone"]
    const statuses: ("completed" | "pending" | "failed")[] = ["completed", "pending", "failed"]

    const mockData: CrossChainData[] = Array.from({ length: 10 }).map((_, i) => {
      const sourceChain = chains[Math.floor(Math.random() * chains.length)]
      let targetChain
      do {
        targetChain = chains[Math.floor(Math.random() * chains.length)]
      } while (targetChain === sourceChain)

      const type = types[Math.floor(Math.random() * types.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      return {
        id: `0x${Math.random().toString(16).substring(2, 10)}`,
        sourceChain,
        targetChain,
        type,
        status,
        timestamp: new Date(Date.now() - i * 300000),
        value:
          type === "asset"
            ? `${(Math.random() * 100).toFixed(2)} ${sourceChain === "Ethereum" ? "ETH" : "Tokens"}`
            : undefined,
      }
    })

    setCrossChainData(mockData)
  }, [])

  function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  function getStatusBadge(status: "completed" | "pending" | "failed") {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">Completed</Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30">
            Pending
          </Badge>
        )
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30">Failed</Badge>
    }
  }

  function getTypeIcon(type: "asset" | "data" | "clone") {
    switch (type) {
      case "asset":
        return <ArrowLeftRight className="h-4 w-4 text-cyan-400" />
      case "data":
        return <Database className="h-4 w-4 text-purple-400" />
      case "clone":
        return <LinkIcon className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="clones">Clones</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {crossChainData.map((item) => (
                <div key={item.id} className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center text-sm mb-1">
                      <span className="text-gray-400 mr-2">{timeAgo(item.timestamp)}</span>
                      {getStatusBadge(item.status)}
                      <Badge variant="outline" className="ml-2 border-gray-700">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium text-cyan-400">{item.sourceChain}</span>
                      <ArrowLeftRight className="h-3 w-3 mx-2 text-gray-500" />
                      <span className="font-medium text-purple-400">{item.targetChain}</span>
                      {item.value && <span className="ml-2 text-gray-300">({item.value})</span>}
                    </div>
                  </div>

                  <ExternalLink className="h-4 w-4 ml-2 text-gray-500" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <div className="space-y-4">
              {crossChainData
                .filter((item) => item.type === "asset")
                .map((item) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <ArrowLeftRight className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center text-sm mb-1">
                        <span className="text-gray-400 mr-2">{timeAgo(item.timestamp)}</span>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-cyan-400">{item.sourceChain}</span>
                        <ArrowLeftRight className="h-3 w-3 mx-2 text-gray-500" />
                        <span className="font-medium text-purple-400">{item.targetChain}</span>
                        {item.value && <span className="ml-2 text-gray-300">({item.value})</span>}
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 ml-2 text-gray-500" />
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="data">
            <div className="space-y-4">
              {crossChainData
                .filter((item) => item.type === "data")
                .map((item) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <Database className="h-4 w-4 text-purple-400" />
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center text-sm mb-1">
                        <span className="text-gray-400 mr-2">{timeAgo(item.timestamp)}</span>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-cyan-400">{item.sourceChain}</span>
                        <ArrowLeftRight className="h-3 w-3 mx-2 text-gray-500" />
                        <span className="font-medium text-purple-400">{item.targetChain}</span>
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 ml-2 text-gray-500" />
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="clones">
            <div className="space-y-4">
              {crossChainData
                .filter((item) => item.type === "clone")
                .map((item) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <LinkIcon className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center text-sm mb-1">
                        <span className="text-gray-400 mr-2">{timeAgo(item.timestamp)}</span>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-cyan-400">{item.sourceChain}</span>
                        <ArrowLeftRight className="h-3 w-3 mx-2 text-gray-500" />
                        <span className="font-medium text-purple-400">{item.targetChain}</span>
                      </div>
                    </div>

                    <ExternalLink className="h-4 w-4 ml-2 text-gray-500" />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

