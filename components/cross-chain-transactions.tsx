"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CrossChainTx {
  id: string
  timestamp: Date
  sourceChain: string
  targetChain: string
  from: string
  to: string
  value?: string
  type: "asset" | "data" | "clone"
  status: "completed" | "pending" | "failed"
}

export function CrossChainTransactions() {
  const [transactions, setTransactions] = useState<CrossChainTx[]>([])

  useEffect(() => {
    // Simulate fetching cross-chain transactions
    const chains = ["Ethereum", "Solana", "Polkadot", "Avalanche", "BNB Chain", "LuminaChain"]
    const types: ("asset" | "data" | "clone")[] = ["asset", "data", "clone"]
    const statuses: ("completed" | "pending" | "failed")[] = ["completed", "pending", "failed"]

    const mockTransactions: CrossChainTx[] = Array.from({ length: 10 }).map((_, i) => {
      const sourceChain = chains[Math.floor(Math.random() * chains.length)]
      let targetChain
      do {
        targetChain = chains[Math.floor(Math.random() * chains.length)]
      } while (targetChain === sourceChain)

      const type = types[Math.floor(Math.random() * types.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      return {
        id: `0x${Math.random().toString(16).substring(2, 66)}`,
        timestamp: new Date(Date.now() - i * 300000),
        sourceChain,
        targetChain,
        from: `0x${Math.random().toString(16).substring(2, 42)}`,
        to: `0x${Math.random().toString(16).substring(2, 42)}`,
        value:
          type === "asset"
            ? `${(Math.random() * 100).toFixed(2)} ${sourceChain === "Ethereum" ? "ETH" : "Tokens"}`
            : undefined,
        type,
        status,
      }
    })

    setTransactions(mockTransactions)
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

  function getTypeBadge(type: "asset" | "data" | "clone") {
    switch (type) {
      case "asset":
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30">Asset</Badge>
      case "data":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/30">Data</Badge>
        )
      case "clone":
        return <Badge className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/30">Clone</Badge>
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tx Hash</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Target</TableHead>
            <TableHead className="hidden md:table-cell">From</TableHead>
            <TableHead className="hidden md:table-cell">To</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>
                <Link
                  href={`/transaction/${tx.id}`}
                  className="text-cyan-400 hover:underline truncate max-w-[120px] inline-block"
                >
                  {tx.id.substring(0, 6)}...{tx.id.substring(tx.id.length - 4)}
                </Link>
              </TableCell>
              <TableCell>{timeAgo(tx.timestamp)}</TableCell>
              <TableCell>{tx.sourceChain}</TableCell>
              <TableCell>{tx.targetChain}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Link
                  href={`/address/${tx.from}`}
                  className="text-cyan-400 hover:underline truncate max-w-[120px] inline-block"
                >
                  {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Link
                  href={`/address/${tx.to}`}
                  className="text-purple-400 hover:underline truncate max-w-[120px] inline-block"
                >
                  {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}
                </Link>
              </TableCell>
              <TableCell>{getTypeBadge(tx.type)}</TableCell>
              <TableCell>{getStatusBadge(tx.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

