import { CrossChainNetworks } from "@/components/cross-chain-networks"
import { CrossChainStats } from "@/components/cross-chain-stats"
import { CrossChainTransactions } from "@/components/cross-chain-transactions"
import { DataCloneStats } from "@/components/data-clone-stats"

export default function CrossChainPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Cross-Chain Explorer
      </h1>

      <div className="mb-8">
        <CrossChainStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Connected Networks
          </h2>
          <CrossChainNetworks />
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Data Clone Statistics
          </h2>
          <DataCloneStats />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Recent Cross-Chain Transactions
        </h2>
        <CrossChainTransactions />
      </div>
    </div>
  )
}

