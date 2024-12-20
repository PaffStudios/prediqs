"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TradeForm: React.FC = () => {
  const [outcome, setOutcome] = useState(80)
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long')
  const [limitPrice, setLimitPrice] = useState(1)
  const [shares, setShares] = useState(652)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    // console.log({ outcome, tradeType, limitPrice, shares })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="outcome" className="text-white">Outcome</Label>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="text-white"
            onClick={() => setOutcome(prev => Math.max(0, prev - 1))}
          >
            -
          </Button>
          <Input
            id="outcome"
            type="number"
            value={outcome}
            onChange={(e) => setOutcome(Number(e.target.value))}
            className="mx-2 bg-transparent text-white text-center"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="text-white"
            onClick={() => setOutcome(prev => prev + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          type="button"
          variant={tradeType === 'long' ? 'default' : 'outline'}
          className={`flex-1 ${tradeType === 'long' ? 'bg-green-500 hover:bg-green-600' : ''}`}
          onClick={() => setTradeType('long')}
        >
          Long
        </Button>
        <Button
          type="button"
          variant={tradeType === 'short' ? 'default' : 'outline'}
          className={`flex-1 ${tradeType === 'short' ? 'bg-red-500 hover:bg-red-600' : ''}`}
          onClick={() => setTradeType('short')}
        >
          Short
        </Button>
      </div>

      <div>
        <Label htmlFor="limitPrice" className="text-white">Limit Price</Label>
        <Input
          id="limitPrice"
          type="number"
          value={limitPrice}
          onChange={(e) => setLimitPrice(Number(e.target.value))}
          className="bg-transparent text-white"
        />
      </div>

      <div>
        <Label htmlFor="shares" className="text-white">Shares</Label>
        <Input
          id="shares"
          type="number"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          className="bg-transparent text-white"
        />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        Buy
      </Button>

      <div className="flex justify-between text-gray-400">
        <span>Total</span>
        <span>${(outcome * shares).toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-400">
        <span>Potential return</span>
        <span>${((100 - outcome) * shares).toFixed(2)}</span>
      </div>
    </form>
  )
}

export default TradeForm

