import Link from "next/link"
import { Search } from "@/components/search"
import { NetworkStats } from "@/components/network-stats"
import { RecentBlocks } from "@/components/recent-blocks"
import { RecentTransactions } from "@/components/recent-transactions"
import { CrossChainActivity } from "@/components/cross-chain-activity"
import { TokenMetrics } from "@/components/token-metrics"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <Search />

        <div className="mt-8">
          <NetworkStats />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Recent Blocks
            </h2>
            <RecentBlocks />
            <div className="mt-4 text-right">
              <Link href="/blocks" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                View all blocks →
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Recent Transactions
            </h2>
            <RecentTransactions />
            <div className="mt-4 text-right">
              <Link href="/transactions" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                View all transactions →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Cross-Chain Activity
          </h2>
          <CrossChainActivity />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            LMT Token Metrics
          </h2>
          <TokenMetrics />
        </div>
      </div>
    </div>
  )
}

