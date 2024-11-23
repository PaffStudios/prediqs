"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, DollarSign } from 'lucide-react'

// Sample data
const volumeData = [
  { rank: 1, username: "0x971.929", value: 122580212, avatar: "/placeholder.svg" },
  { rank: 2, username: "kingfisher", value: 54711412, avatar: "/placeholder.svg" },
  { rank: 3, username: "fgtr", value: 40325021, avatar: "/placeholder.svg" },
  { rank: 4, username: "0xP", value: 37975425, avatar: "/placeholder.svg" },
  { rank: 5, username: "FB757", value: 37810642, avatar: "/placeholder.svg" },
  { rank: 6, username: "qrpenc", value: 35846072, avatar: "/placeholder.svg" },
  { rank: 7, username: "JustPunched", value: 33806442, avatar: "/placeholder.svg" },
  { rank: 8, username: "interstellaar", value: 32708758, avatar: "/placeholder.svg" },
  { rank: 9, username: "itsgg", value: 32253975, avatar: "/placeholder.svg" },
  { rank: 10, username: "Apsalar", value: 32248408, avatar: "/placeholder.svg" },
]

const profitData = [
  { rank: 1, username: "Theo4", value: 21877570, avatar: "/placeholder.svg" },
  { rank: 2, username: "Fredi9999", value: 14647260, avatar: "/placeholder.svg" },
  { rank: 3, username: "Len9311238", value: 9209808, avatar: "/placeholder.svg" },
  { rank: 4, username: "zxgngl", value: 8096622, avatar: "/placeholder.svg" },
  { rank: 5, username: "RepTrump", value: 7688190, avatar: "/placeholder.svg" },
  { rank: 6, username: "walletmobile", value: 5942685, avatar: "/placeholder.svg" },
  { rank: 7, username: "BetTom42", value: 5891814, avatar: "/placeholder.svg" },
  { rank: 8, username: "PrincessCaro", value: 5371210, avatar: "/placeholder.svg" },
  { rank: 9, username: "mikatrade77", value: 5305380, avatar: "/placeholder.svg" },
  { rank: 10, username: "GCottrell93", value: 5014066, avatar: "/placeholder.svg" },
]

type TimeFilter = "Day" | "Week" | "Month" | "All"

function LeaderboardEntry({ rank, username, value, avatar }: {
  rank: number
  username: string
  value: number
  avatar: string
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {rank}
          </div>
        </div>
        <span className="text-sm font-medium">{username}</span>
      </div>
      <span className="text-sm text-muted-foreground">
        ${value.toLocaleString()}
      </span>
    </div>
  )
}

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Month")
  
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Leaderboard</h1>
        <div className="flex justify-center gap-2">
          {(["Day", "Week", "Month", "All"] as const).map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? "default" : "secondary"}
              onClick={() => setTimeFilter(filter)}
              className="px-6"
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Resets in 7d 8h 21m 5s
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            {volumeData.map((entry) => (
              <LeaderboardEntry key={entry.rank} {...entry} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profitData.map((entry) => (
              <LeaderboardEntry key={entry.rank} {...entry} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

