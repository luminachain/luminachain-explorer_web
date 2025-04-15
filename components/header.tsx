"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "@/components/search"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                
                <Image
                  src="/logo.png"
                  alt="LuminaChain Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                LuminaChain
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/blocks" className="text-gray-300 hover:text-white transition-colors">
              Blocks
            </Link>
            <Link href="/transactions" className="text-gray-300 hover:text-white transition-colors">
              Transactions
            </Link>
            <Link href="/cross-chain" className="text-gray-300 hover:text-white transition-colors">
              Cross-Chain
            </Link>
            <Link href="/stats" className="text-gray-300 hover:text-white transition-colors">
              Stats
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="w-64">
              <Search minimal />
            </div>
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              Connect Wallet
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="mb-4">
              <Search />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/blocks"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blocks
              </Link>
              <Link
                href="/transactions"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Transactions
              </Link>
              <Link
                href="/cross-chain"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cross-Chain
              </Link>
              <Link
                href="/stats"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Stats
              </Link>
            </nav>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
              Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

