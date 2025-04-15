"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  timestamp: Date
  from: string
  to: string
  value: string
  fee: string
  type: "transfer" | "contract" | "cross-chain"
  blockId?: number
}

interface TransactionsTableProps {
  limit?: number
  blockId?: string
  addressId?: string
}

export function TransactionsTable({ limit = 10, blockId, addressId }: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Simulate fetching transactions
    const types: ("transfer" | "contract" | "cross-chain")[] = ["transfer", "contract", "cross-chain"]

    const mockTransactions: Transaction[] = Array.from({ length: limit }).map((_, i) => {
      const from = `0x${Math.random().toString(16).substring(2, 42)}`
      const to = `0x${Math.random().toString(16).substring(2, 42)}`

      return {
        id: `0x${Array.from({ length: 64 })
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")}`,
        timestamp: new Date(Date.now() - i * 15000),
        from: addressId ? addressId : from,
        to: addressId === from ? to : addressId === to ? from : to,
        value: `${(Math.random() * 100).toFixed(2)} LMT`,
        fee: `${(Math.random() * 0.01).toFixed(4)} LMT`,
        type: types[Math.floor(Math.random() * types.length)],
        blockId: blockId ? Number.parseInt(blockId) : 12345678 - Math.floor(Math.random() * 10),
      }
    })

    setTransactions(mockTransactions)
  }, [limit, blockId, addressId])

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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tx Hash</TableHead>
            {!blockId && <TableHead className="hidden md:table-cell">Block</TableHead>}
            <TableHead>Age</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="hidden lg:table-cell">Type</TableHead>
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
              {!blockId && (
                <TableCell className="hidden md:table-cell">
                  <Link href={`/block/${tx.blockId}`} className="flex items-center">
                    <Badge variant="outline" className="border-purple-500 text-purple-400">
                      {tx.blockId}
                    </Badge>
                  </Link>
                </TableCell>
              )}
              <TableCell>{timeAgo(tx.timestamp)}</TableCell>
              <TableCell>
                <Link
                  href={`/address/${tx.from}`}
                  className="text-cyan-400 hover:underline truncate max-w-[120px] inline-block"
                >
                  {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/address/${tx.to}`}
                  className="text-purple-400 hover:underline truncate max-w-[120px] inline-block"
                >
                  {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}
                </Link>
              </TableCell>
              <TableCell>{tx.value}</TableCell>
              <TableCell className="hidden lg:table-cell">{getTypeBadge(tx.type)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

