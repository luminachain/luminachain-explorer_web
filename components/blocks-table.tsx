"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Block {
  id: number
  timestamp: Date
  miner: string
  transactions: number
  size: string
  reward: string
  hash: string
}

export function BlocksTable({ limit = 10 }: { limit?: number }) {
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    // Simulate fetching blocks
    const mockBlocks: Block[] = Array.from({ length: limit }).map((_, i) => ({
      id: 12345678 - i,
      timestamp: new Date(Date.now() - i * 60000),
      miner: `0x${Math.random().toString(16).substring(2, 42)}`,
      transactions: Math.floor(Math.random() * 100) + 10,
      size: `${(Math.random() * 2 + 0.5).toFixed(2)} MB`,
      reward: `${(Math.random() * 0.5 + 9.5).toFixed(2)} LMT`,
      hash: `0x${Array.from({ length: 64 })
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`,
    }))

    setBlocks(mockBlocks)
  }, [limit])

  function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Block</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Txns</TableHead>
            <TableHead className="hidden md:table-cell">Miner</TableHead>
            <TableHead className="hidden lg:table-cell">Size</TableHead>
            <TableHead>Reward</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blocks.map((block) => (
            <TableRow key={block.id}>
              <TableCell>
                <Link href={`/block/${block.id}`} className="flex items-center">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {block.id}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell>{timeAgo(block.timestamp)}</TableCell>
              <TableCell>{block.transactions}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Link
                  href={`/address/${block.miner}`}
                  className="text-cyan-400 hover:underline truncate max-w-[200px] inline-block"
                >
                  {block.miner.substring(0, 6)}...{block.miner.substring(block.miner.length - 4)}
                </Link>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{block.size}</TableCell>
              <TableCell className="text-purple-400">{block.reward}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

