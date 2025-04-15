import Link from "next/link"
import { TransactionDetails } from "@/components/transaction-details"

export default function TransactionPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/transactions" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Transactions
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Transaction Details
      </h1>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <TransactionDetails transactionId={params.id} />
      </div>
    </div>
  )
}

