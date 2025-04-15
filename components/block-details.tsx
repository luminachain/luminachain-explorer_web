"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface BlockDetailsProps {
  blockId: string
}

interface BlockDetail {
  id: number
  hash: string
  previousHash: string
  timestamp: Date
  miner: string
  transactions: number
  size: string
  reward: string
  difficulty: string
  nonce: string
  gasUsed: string
  gasLimit: string
}

export function BlockDetails({ blockId }: BlockDetailsProps) {
  const [block, setBlock] = useState<BlockDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching block details
    setTimeout(() => {
      const mockBlock: BlockDetail = {
        id: Number.parseInt(blockId),
        hash: `0x${Array.from({ length: 64 })
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")}`,
        previousHash: `0x${Array.from({ length: 64 })
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000)),
        miner: `0x${Math.random().toString(16).substring(2, 42)}`,
        transactions: Math.floor(Math.random() * 100) + 10,
        size: `${(Math.random() * 2 + 0.5).toFixed(2)} MB`,
        reward: `${(Math.random() * 0.5 + 9.5).toFixed(2)} LMT`,
        difficulty: `${(Math.random() * 1000 + 500).toFixed(2)} TH`,
        nonce: `${Math.floor(Math.random() * 1000000000)}`,
        gasUsed: `${Math.floor(Math.random() * 8000000)}`,
        gasLimit: `8000000`,
      }

      setBlock(mockBlock)
      setLoading(false)
    }, 500)
  }, [blockId])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!block) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Block not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <Badge variant="outline" className="mr-2 text-lg border-purple-500 text-purple-400">
              {block.id}
            </Badge>
            Block Details
          </h3>
          <p className="text-sm text-gray-400 mt-1">Mined on {block.timestamp.toLocaleString()}</p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/block/${block.id - 1}`}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
          >
            ← Previous Block
          </Link>
          <Link
            href={`/block/${block.id + 1}`}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
          >
            Next Block →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Block Hash</p>
            <p className="text-sm font-mono break-all">{block.hash}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Previous Block Hash</p>
            <p className="text-sm font-mono break-all">{block.previousHash}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Miner</p>
            <Link href={`/address/${block.miner}`} className="text-cyan-400 hover:underline break-all">
              {block.miner}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Transactions</p>
            <p className="text-lg font-bold">{block.transactions}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Size</p>
            <p className="text-lg font-bold">{block.size}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Block Reward</p>
            <p className="text-lg font-bold text-purple-400">{block.reward}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Difficulty</p>
            <p className="text-lg font-bold">{block.difficulty}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Nonce</p>
            <p className="text-lg font-bold">{block.nonce}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Gas Used</p>
            <p className="text-lg font-bold">{block.gasUsed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

