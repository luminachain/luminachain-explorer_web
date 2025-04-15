import Link from "next/link"
import { BlockDetails } from "@/components/block-details"
import { TransactionsTable } from "@/components/transactions-table"

export default function BlockPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/blocks" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Blocks
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Block #{params.id}
      </h1>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-8">
        <BlockDetails blockId={params.id} />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Transactions in Block
      </h2>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <TransactionsTable blockId={params.id} />
      </div>
    </div>
  )
}

