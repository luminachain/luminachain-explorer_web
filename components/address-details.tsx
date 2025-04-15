"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Code, Database } from "lucide-react"

interface AddressDetailsProps {
  addressId: string
}

interface AddressDetail {
  address: string
  balance: string
  transactions: number
  firstSeen: Date
  lastSeen: Date
  isContract: boolean
  tokenBalance?: string
  contractInfo?: {
    creator: string
    creationTx: string
    creationDate: Date
  }
}

export function AddressDetails({ addressId }: AddressDetailsProps) {
  const [address, setAddress] = useState<AddressDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching address details
    setTimeout(() => {
      const isContract = Math.random() > 0.7

      const mockAddress: AddressDetail = {
        address: addressId,
        balance: `${(Math.random() * 10000).toFixed(2)} LMT`,
        transactions: Math.floor(Math.random() * 1000) + 10,
        firstSeen: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        lastSeen: new Date(Date.now() - Math.floor(Math.random() * 1000000)),
        isContract,
        tokenBalance: `${(Math.random() * 1000).toFixed(2)} LMT`,
        contractInfo: isContract
          ? {
              creator: `0x${Math.random().toString(16).substring(2, 42)}`,
              creationTx: `0x${Array.from({ length: 64 })
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join("")}`,
              creationDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            }
          : undefined,
      }

      setAddress(mockAddress)
      setLoading(false)
    }, 500)
  }, [addressId])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Address not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold">Address</h3>
          {address.isContract ? (
            <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/30">
              Contract
            </Badge>
          ) : (
            <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30">EOA</Badge>
          )}
        </div>
        <p className="text-sm font-mono break-all">{address.address}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Overview</h4>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">Balance</span>
                <span className="font-bold">{address.balance}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">Transactions</span>
                <span className="font-bold">{address.transactions}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">First Seen</span>
                <span>{address.firstSeen.toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Seen</span>
                <span>{address.lastSeen.toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">{address.isContract ? "Contract Info" : "Transaction Summary"}</h4>
            </div>

            {address.isContract && address.contractInfo ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">Creator</span>
                  <span className="text-cyan-400 truncate max-w-[200px]">
                    {address.contractInfo.creator.substring(0, 6)}...
                    {address.contractInfo.creator.substring(address.contractInfo.creator.length - 4)}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                  <span className="text-gray-400">Creation Tx</span>
                  <span className="text-cyan-400 truncate max-w-[200px]">
                    {address.contractInfo.creationTx.substring(0, 6)}...
                    {address.contractInfo.creationTx.substring(address.contractInfo.creationTx.length - 4)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Created On</span>
                  <span>{address.contractInfo.creationDate.toLocaleDateString()}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-sm text-gray-400">Sent</span>
                  </div>
                  <p className="text-lg font-bold">{Math.floor(address.transactions * 0.4)} txns</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <ArrowDownRight className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-sm text-gray-400">Received</span>
                  </div>
                  <p className="text-lg font-bold">{Math.floor(address.transactions * 0.6)} txns</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Code className="h-4 w-4 text-cyan-400 mr-2" />
                    <span className="text-sm text-gray-400">Contracts</span>
                  </div>
                  <p className="text-lg font-bold">{Math.floor(Math.random() * 10)} calls</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Database className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-400">Cross-Chain</span>
                  </div>
                  <p className="text-lg font-bold">{Math.floor(Math.random() * 5)} txns</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

