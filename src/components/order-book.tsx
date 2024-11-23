import { Button } from "@/components/ui/button"

interface OrderRow {
  id: string
  price: number
  shares: string
}

const topOrders: OrderRow[] = Array(7).fill({
  id: "9895L0x",
  price: 71.42,
  shares: "85k"
})

const bottomOrders: OrderRow[] = Array(7).fill({
  id: "9895L0x",
  price: 71.42,
  shares: "85k"
})

function OrderRow({ order }: { order: OrderRow }) {
  return (
    <div className="flex items-center justify-between py-2 px-4 text-gray-300 hover:bg-gray-800/50">
      <span className="text-sm font-mono">{order.id}</span>
      <span className="text-sm">{order.shares}</span>
      <span className="text-sm">{order.price}</span>
    </div>
  )
}

export default function OrderBook() {
  return (
    <div className="w-full max-w-sm bg-[#1a1a1a] rounded-lg overflow-hidden mt-8">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white text-lg font-semibold">Order Book</h2>
      </div>
      
      <div className="flex justify-between px-4 py-2 text-sm text-gray-500 border-b border-gray-800">
        <span>Trading ID</span>
        <span>Price</span>
        <span>Shares</span>
      </div>

      <div className="divide-y divide-gray-800/50">
        {topOrders.map((order, index) => (
          <OrderRow key={`top-${index}`} order={order} />
        ))}
      </div>

      <Button className="w-full rounded-none h-12 bg-green-600 hover:bg-green-700">
        Long
      </Button>

      <div className="flex justify-between px-4 py-2 text-sm text-gray-500 border-b border-gray-800 mt-8">
        <span>Trading ID</span>
        <span>Price</span>
        <span>Shares</span>
      </div>

      <div className="divide-y divide-gray-800/50">
        {bottomOrders.map((order, index) => (
          <OrderRow key={`bottom-${index}`} order={order} />
        ))}
      </div>

      <Button className="w-full rounded-none h-12 bg-red-600 hover:bg-red-700">
        Short
      </Button>
    </div>
  )
}

