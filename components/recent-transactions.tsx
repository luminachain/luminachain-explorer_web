"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react"

interface Transaction {
  id: string
  timestamp: Date
  from: string
  to: string
  value: string
  fee: string
  type: "transfer" | "contract" | "cross-chain"
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Simulate fetching transactions
    const types: ("transfer" | "contract" | "cross-chain")[] = ["transfer", "contract", "cross-chain"]

    const mockTransactions: Transaction[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `0x${Math.random().toString(16).substring(2, 66)}`,
      timestamp: new Date(Date.now() - i * 15000),
      from: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
      to: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
      value: `${(Math.random() * 100).toFixed(2)} LMT`,
      fee: `${(Math.random() * 0.01).toFixed(4)} LMT`,
      type: types[Math.floor(Math.random() * types.length)],
    }))

    setTransactions(mockTransactions)

    // Simulate new transactions coming in
    const interval = setInterval(() => {
      setTransactions((prevTxs) => {
        const newTx: Transaction = {
          id: `0x${Math.random().toString(16).substring(2, 66)}`,
          timestamp: new Date(),
          from: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
          to: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
          value: `${(Math.random() * 100).toFixed(2)} LMT`,
          fee: `${(Math.random() * 0.01).toFixed(4)} LMT`,
          type: types[Math.floor(Math.random() * types.length)],
        }

        return [newTx, ...prevTxs.slice(0, -1)]
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  function getTypeBadge(type: "transfer" | "contract" | "cross-chain") {
    switch (type) {
      case "transfer":
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30">Transfer</Badge>
      case "contract":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/30">
            Contract
          </Badge>
        )
      case "cross-chain":
        return (
          <Badge className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/30">Cross-Chain</Badge>
        )
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-0">
        <div className="divide-y divide-gray-800">
          {transactions.map((tx) => (
            <Link
              key={tx.id}
              href={`/transaction/${tx.id}`}
              className="flex items-center p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-cyan-400" />
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center text-sm mb-1">
                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                  <span className="text-gray-400 mr-2">{timeAgo(tx.timestamp)}</span>
                  {getTypeBadge(tx.type)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                  <span className="truncate">
                    From: <span className="text-cyan-400">{tx.from}</span>
                  </span>
                  <span className="hidden sm:inline mx-2">→</span>
                  <span className="truncate">
                    To: <span className="text-purple-400">{tx.to}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end ml-4">
                <span className="text-sm font-medium">{tx.value}</span>
                <span className="text-xs text-gray-400">Fee: {tx.fee}</span>
              </div>

              <ArrowRight className="h-4 w-4 ml-2 text-gray-500" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

