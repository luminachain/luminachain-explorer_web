"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

interface SearchProps {
  minimal?: boolean
}

export function Search({ minimal = false }: SearchProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    // Determine what type of search it is (block, tx, address)
    if (/^\d+$/.test(query)) {
      router.push(`/block/${query}`)
    } else if (query.startsWith("0x") && query.length === 66) {
      router.push(`/transaction/${query}`)
    } else if (query.startsWith("0x") && query.length === 42) {
      router.push(`/address/${query}`)
    } else {
      // Default to address search
      router.push(`/address/${query}`)
    }
  }

  if (minimal) {
    return (
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search by block, tx, address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-900 border-gray-800 pr-10"
        />
        <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full px-3">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by block number, transaction hash, or address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-900 border-gray-800 h-12 pl-12 pr-4 rounded-lg"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Examples: Block 12345 | 0x1234...5678 (Transaction) | 0xabcd...ef01 (Address)
      </div>
    </form>
  )
}

