"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface SmartContractInfoProps {
  addressId: string
}

export function SmartContractInfo({ addressId }: SmartContractInfoProps) {
  const [isContract, setIsContract] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking if address is a contract
    setTimeout(() => {
      setIsContract(Math.random() > 0.3)
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

  if (!isContract) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400">This address is not a smart contract</p>
      </div>
    )
  }

  // Mock contract code
  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuminaToken {
    string public name = "Lumina Token";
    string public symbol = "LMT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance too low");
        
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}`

  // Mock contract ABI
  const contractABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "initialSupply",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]

  return (
    <Tabs defaultValue="code">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="code">Contract Code</TabsTrigger>
        <TabsTrigger value="abi">ABI</TabsTrigger>
        <TabsTrigger value="read">Read Contract</TabsTrigger>
      </TabsList>

      <TabsContent value="code">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 z-10"
            onClick={() => navigator.clipboard.writeText(contractCode)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-gray-300">{contractCode}</code>
          </pre>
        </div>
      </TabsContent>

      <TabsContent value="abi">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 z-10"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(contractABI, null, 2))}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-gray-300">{JSON.stringify(contractABI, null, 2)}</code>
          </pre>
        </div>
      </TabsContent>

      <TabsContent value="read">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Read Contract</h3>
          <div className="space-y-4">
            <div className="p-4 border border-gray-700 rounded-lg">
              <h4 className="text-sm font-medium mb-2">name()</h4>
              <p className="text-sm text-gray-400">Returns: string</p>
              <div className="mt-2 p-2 bg-gray-900 rounded">
                <p className="text-sm">Lumina Token</p>
              </div>
            </div>

            <div className="p-4 border border-gray-700 rounded-lg">
              <h4 className="text-sm font-medium mb-2">symbol()</h4>
              <p className="text-sm text-gray-400">Returns: string</p>
              <div className="mt-2 p-2 bg-gray-900 rounded">
                <p className="text-sm">LMT</p>
              </div>
            </div>

            <div className="p-4 border border-gray-700 rounded-lg">
              <h4 className="text-sm font-medium mb-2">decimals()</h4>
              <p className="text-sm text-gray-400">Returns: uint8</p>
              <div className="mt-2 p-2 bg-gray-900 rounded">
                <p className="text-sm">18</p>
              </div>
            </div>

            <div className="p-4 border border-gray-700 rounded-lg">
              <h4 className="text-sm font-medium mb-2">totalSupply()</h4>
              <p className="text-sm text-gray-400">Returns: uint256</p>
              <div className="mt-2 p-2 bg-gray-900 rounded">
                <p className="text-sm">12456789000000000000000000</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

