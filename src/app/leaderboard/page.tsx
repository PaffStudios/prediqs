"use client"
import Leaderboard from "@/components/leaderboard";
import Podiums from "@/components/ranking-podiums";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Gem } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function LeaderboardPage()
{
    const topUsers = [
        {
          id: '2',
          name: 'Skulldugger',
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7nmvPuHivliG0y_2glZDqMW3aZ4pbd8pzw&s",
          points: 5000,
          prize: 5000,
          pointsToEarn: 500
        },
        {
          id: '1',
          name: 'Klaxxon',
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7nmvPuHivliG0y_2glZDqMW3aZ4pbd8pzw&s",
          points: 10000,
          prize: 10000,
          pointsToEarn: 1500
        },
        {
          id: '3',
          name: 'Ultralex',
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7nmvPuHivliG0y_2glZDqMW3aZ4pbd8pzw&s",
          points: 2500,
          prize: 2500,
          pointsToEarn: 250
        }
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
        {
            id: 6,
            user: "mitchell-tenetur",
            action: "bought",
            price: "72¢",
            amount: "$10.55",
            type: "pink"
        },
        {
            id: 7,
            user: "mitchell-tenetur",
            action: "bought",
            price: "72¢",
            amount: "$10.55",
            type: "pink"
        },
      ]

    type TimeFilter = "Day" | "Week" | "Month" | "All"
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("Month")
    return(
        <>
            <div>
                <div className="w-full h-20 overflow-hidden bg-background p-4 relative">
                    <div className="flex whitespace-nowrap h-full">
                        {purchases.map((purchase, index) => (
                        <Badge  
                            key={`${purchase.id}-${index}`}
                            className={`flex flex-row text-white font-normal gap-1 p-2 mr-3 bg-zinc-900 rounded-md`}
                        >
                            <span className="mr-1 h-full aspect-square rounded-md bg-white"></span>
                            <div className="flex flex-col">
                                <span>{purchase.user}</span>
                                <span className="text-gray-600">{purchase.type}</span>
                            </div>
                            <div className="rounded-md px-4 h-full bg-zinc-800 ml-4 flex flex-row place-items-center gap-1">
                                <Gem className="w-4 h-4 text-blue-400"/>
                                <span>{purchase.amount}</span>
                            </div>
                        </Badge>
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent"></div>
                </div>
            </div>
            <div className="flex justify-center gap-2 py-12">
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
            <Podiums topUsers={topUsers}/>
            <CardContent className="flex flex-col gap-4">
                {profitData.map((entry, index) => (
                <LeaderboardEntry key={entry.rank} index={index} {...entry} />
                ))}
            </CardContent>
        </>
    )
}

function LeaderboardEntry({ index, rank, username, value, avatar }: {
    index: number
    rank: number
    username: string
    value: number
    avatar: string
  }) {
    return (
      <motion.div 
        initial={{ opacity: 0, y:-20}}
        animate={{ opacity:1, y:0 }}
        transition={{duration:0.4, delay:index * 0.05 +0.6}}
        className="flex items-center justify-between py-3 mx-auto w-full px-4 md:w-[75%] p-4 rounded-md bg-zinc-900 bg-opacity-50">
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
      </motion.div>
    )
  }