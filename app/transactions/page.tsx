import { TransactionsTable } from "@/components/transactions-table"
import { Search } from "@/components/search"
import { Pagination } from "@/components/pagination"

export default function TransactionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Transactions
      </h1>

      <div className="mb-6">
        <Search />
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <TransactionsTable />
        <div className="mt-6">
          <Pagination totalPages={100} currentPage={1} />
        </div>
      </div>
    </div>
  )
}

