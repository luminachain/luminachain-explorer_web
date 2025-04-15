import Link from "next/link"
import { AddressDetails } from "@/components/address-details"
import { TransactionsTable } from "@/components/transactions-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartContractInfo } from "@/components/smart-contract-info"

export default function AddressPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        Address
      </h1>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-8">
        <AddressDetails addressId={params.id} />
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="cross-chain">Cross-Chain Data</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <TransactionsTable addressId={params.id} />
        </TabsContent>

        <TabsContent value="contract" className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <SmartContractInfo addressId={params.id} />
        </TabsContent>

        <TabsContent value="cross-chain" className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="p-4 text-center">
            <h3 className="text-xl font-medium mb-2">Cross-Chain Data</h3>
            <p className="text-gray-400">Showing cross-chain interactions and cloned data from other blockchains</p>
            {/* Cross-chain data would be displayed here */}
            <div className="mt-4 p-8 border border-dashed border-gray-700 rounded-lg">
              <p className="text-gray-500">No cross-chain data available for this address</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

