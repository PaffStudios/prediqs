"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"

const purchases = [
  {
    id: 1,
    user: "mitchell-tenetur",
    action: "bought",
    price: "72¢",
    amount: "$10.55",
    type: "pink"
  },
  {
    id: 2,
    user: "mitchell-tenetur",
    action: "bought",
    price: "72¢",
    amount: "$10.55",
    type: "blue"
  },
  {
    id: 3,
    user: "mitchell-tenetur",
    action: "bought",
    price: "72¢",
    amount: "$10.55",
    type: "pink"
  },
  {
    id: 4,
    user: "mitchell-tenetur",
    action: "bought",
    price: "72¢",
    amount: "$10.55",
    type: "blue"
  },
  {
    id: 5,
    user: "mitchell-tenetur",
    action: "bought",
    price: "72¢",
    amount: "$10.55",
    type: "pink"
  },
]

export function RecentPurchases() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollContent = scrollContainer.firstElementChild as HTMLElement
    if (!scrollContent) return

    const scrollWidth = scrollContent.scrollWidth
    const animationDuration = scrollWidth / 50 // Adjust this value to change scroll speed

    const keyframes = `
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `

    const styleElement = document.createElement('style')
    styleElement.innerHTML = keyframes
    document.head.appendChild(styleElement)

    scrollContent.style.animation = `scroll ${animationDuration}s linear infinite`

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const allPurchases = [...purchases, ...purchases]

  return (
    <div className="w-full overflow-hidden bg-background p-4" ref={scrollRef}>
      <div className="flex whitespace-nowrap">
        {allPurchases.map((purchase, index) => (
          <Badge
            key={`${purchase.id}-${index}`}
            className={`text-white font-normal px-3 py-1 mr-3 ${
              purchase.type === "pink" 
                ? "bg-[#be185d] hover:bg-[#be185d]" 
                : "bg-[#2563eb] hover:bg-[#2563eb]"
            }`}
          >
            <span className="mr-1">👤</span>
            {purchase.user} {purchase.action} No at {purchase.price} ({purchase.amount})
          </Badge>
        ))}
      </div>
    </div>
  )
}

