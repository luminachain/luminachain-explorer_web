"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"

interface Block {
  id: number
  timestamp: Date
  miner: string
  transactions: number
  size: string
  reward: string
}

export function RecentBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    // Simulate fetching blocks
    const mockBlocks: Block[] = Array.from({ length: 5 }).map((_, i) => ({
      id: 12345678 - i,
      timestamp: new Date(Date.now() - i * 60000),
      miner: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
      transactions: Math.floor(Math.random() * 100) + 10,
      size: `${(Math.random() * 2 + 0.5).toFixed(2)} MB`,
      reward: `${(Math.random() * 0.5 + 9.5).toFixed(2)} LMT`,
    }))

    setBlocks(mockBlocks)

    // Simulate new blocks coming in
    const interval = setInterval(() => {
      setBlocks((prevBlocks) => {
        const newBlock: Block = {
          id: prevBlocks[0].id + 1,
          timestamp: new Date(),
          miner: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
          transactions: Math.floor(Math.random() * 100) + 10,
          size: `${(Math.random() * 2 + 0.5).toFixed(2)} MB`,
          reward: `${(Math.random() * 0.5 + 9.5).toFixed(2)} LMT`,
        }

        return [newBlock, ...prevBlocks.slice(0, -1)]
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-0">
        <div className="divide-y divide-gray-800">
          {blocks.map((block) => (
            <Link
              key={block.id}
              href={`/block/${block.id}`}
              className="flex items-center p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {block.id}
                  </Badge>
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center text-sm mb-1">
                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                  <span className="text-gray-400">{timeAgo(block.timestamp)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm truncate">
                    Miner: <span className="text-cyan-400">{block.miner}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end ml-4">
                <span className="text-sm text-gray-400">{block.transactions} txns</span>
                <span className="text-sm text-purple-400">{block.reward}</span>
              </div>

              <ArrowRight className="h-4 w-4 ml-2 text-gray-500" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

