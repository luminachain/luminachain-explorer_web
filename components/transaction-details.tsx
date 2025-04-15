"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

interface TransactionDetailsProps {
  transactionId: string
}

interface TransactionDetail {
  id: string
  blockId: number
  timestamp: Date
  from: string
  to: string
  value: string
  fee: string
  gasPrice: string
  gasLimit: string
  gasUsed: string
  nonce: number
  status: "success" | "failed" | "pending"
  type: "transfer" | "contract" | "cross-chain"
  data?: string
  crossChainInfo?: {
    sourceChain?: string
    targetChain?: string
  }
}

export function TransactionDetails({ transactionId }: TransactionDetailsProps) {
  const [transaction, setTransaction] = useState<TransactionDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching transaction details
    setTimeout(() => {
      const types: ("transfer" | "contract" | "cross-chain")[] = ["transfer", "contract", "cross-chain"]
      const statuses: ("success" | "failed" | "pending")[] = ["success", "failed", "pending"]
      const type = types[Math.floor(Math.random() * types.length)]

      const mockTransaction: TransactionDetail = {
        id: transactionId,
        blockId: 12345678 - Math.floor(Math.random() * 10),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000)),
        from: `0x${Math.random().toString(16).substring(2, 42)}`,
        to: `0x${Math.random().toString(16).substring(2, 42)}`,
        value: `${(Math.random() * 100).toFixed(2)} LMT`,
        fee: `${(Math.random() * 0.01).toFixed(4)} LMT`,
        gasPrice: `${(Math.random() * 10).toFixed(2)} Gwei`,
        gasLimit: `${Math.floor(Math.random() * 100000) + 21000}`,
        gasUsed: `${Math.floor(Math.random() * 100000) + 21000}`,
        nonce: Math.floor(Math.random() * 100),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        type,
        data:
          type === "contract"
            ? `0x${Array.from({ length: 64 })
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join("")}`
            : undefined,
        crossChainInfo:
          type === "cross-chain"
            ? {
                sourceChain: Math.random() > 0.5 ? "Ethereum" : "LuminaChain",
                targetChain: Math.random() > 0.5 ? "Solana" : "Polkadot",
              }
            : undefined,
      }

      setTransaction(mockTransaction)
      setLoading(false)
    }, 500)
  }, [transactionId])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Transaction not found</p>
      </div>
    )
  }

  function getStatusBadge(status: "success" | "failed" | "pending") {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">Success</Badge>
        )
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30">Failed</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30">
            Pending
          </Badge>
        )
    }
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
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold">Transaction</h3>
          {getStatusBadge(transaction.status)}
          {getTypeBadge(transaction.type)}
        </div>
        <p className="text-sm text-gray-400">{transaction.timestamp.toLocaleString()}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
        <p className="text-sm font-mono break-all">{transaction.id}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-sm text-gray-400 mb-1">Block</p>
        <Link href={`/block/${transaction.blockId}`} className="flex items-center">
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            {transaction.blockId}
          </Badge>
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full bg-gray-900 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">From</p>
            <Link href={`/address/${transaction.from}`} className="text-cyan-400 hover:underline break-all">
              {transaction.from}
            </Link>
          </div>

          <ArrowDown className="h-6 w-6 text-gray-500" />

          <div className="w-full bg-gray-900 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">To</p>
            <Link href={`/address/${transaction.to}`} className="text-purple-400 hover:underline break-all">
              {transaction.to}
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Value</p>
          <p className="text-lg font-bold">{transaction.value}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Transaction Fee</p>
          <p className="text-lg font-bold">{transaction.fee}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Gas Price</p>
          <p className="text-lg font-bold">{transaction.gasPrice}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Gas Limit</p>
          <p className="text-lg font-bold">{transaction.gasLimit}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Gas Used</p>
          <p className="text-lg font-bold">{transaction.gasUsed}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Nonce</p>
          <p className="text-lg font-bold">{transaction.nonce}</p>
        </div>
      </div>

      {transaction.data && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Data</p>
          <p className="text-sm font-mono break-all">{transaction.data}</p>
        </div>
      )}

      {transaction.crossChainInfo && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Cross-Chain Information</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-xs text-gray-400">Source Chain</p>
              <p className="text-sm font-medium">{transaction.crossChainInfo.sourceChain}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Target Chain</p>
              <p className="text-sm font-medium">{transaction.crossChainInfo.targetChain}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

