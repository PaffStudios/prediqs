"use client"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "motion/react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
// import { useEffect, useState } from "react"s
import { faker } from '@faker-js/faker';
// import AvatarCircles from "@/components/ui/avatar-circles";

interface PollCardProps {
  id: number
  title: string
  image: string
  rewardRate: string
  earnings: string
  movement: string
  isPositive: boolean
}

export default function PollCard({ id, title, image, rewardRate, movement, isPositive }: PollCardProps) {
 

const data = Array.from({ length: 15 }, () => ({
  uv: faker.finance.amount({ min: 4000, max: 9000 }),
}));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x:-150 }}
      animate={{ opacity: 1, scale: 1, x:0 }}
      transition={{ duration: 0.3, delay: id * 0.05 }}
      className="w-[90vw] mx-auto sm:w-full"
    >
      <Card className="overflow-hidden w-full rounded-2xl bg-transparent backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] hover:[box-shadow:0_-20px_80px_-20px_#ffffff3f_inset] transition-colors p-4 relative">
        <div className="w-full h-[80%] absolute left-0 bottom-0 -z-10">
          <ResponsiveContainer width="120%">
            <AreaChart data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#43A047" stopOpacity={0.5} /> 
                  <stop offset="95%" stopColor="#43A047" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUvRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e53e3e" stopOpacity={0.5} /> 
                  <stop offset="95%" stopColor="#e53e3e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              {isPositive?
              <>
              <Area type="monotone" dataKey="uv" stroke="#43A047" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)"/>
              <Area type="monotone" dataKey="uv" stroke="#43A047" strokeWidth={3} className=" blur-2xl" fillOpacity={1} fill="url(#colorUv)" />
              </>
              :
              <>
              <Area type="monotone" dataKey="uv" stroke="#e53e3e" fillOpacity={1} strokeWidth={3} fill="url(#colorUvRed)"/>
              <Area type="monotone" dataKey="uv" stroke="#e53e3e" fillOpacity={1} strokeWidth={3} className=" blur-2xl" fill="url(#colorUvRed)"/></>}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Link href={`/prediction/${id}`} className="block">
          <CardHeader className="p-0 h-12 flex flex-row gap-2 z-20 bg-transparent">
            <div className="relative h-12 w-12 flex-shrink-0 rounded-xl z-20 overflow-hidden">
              <Image
                src={image}
                alt={"title"}
                fill
                className="object-cover select-none"
              />
            </div>
            <div className="flex flex-col h-full justify-center overflow-hidden">
              <span className="text-zinc-400 text-sm font-gilroy font-semibold">Title</span>
              <h3 className="font-gilroy font-bold text-ellipsis whitespace-nowrap overflow-hidden">{title}</h3>
            </div>
          </CardHeader>
          <CardContent className="py-4 px-0 h-40">
          <div className="mb-4">
            <div className="text-sm text-zinc-400 font-gilroy font-semibold">Reward Rate</div>
            <div className="text-3xl font-bold text-zinc-100">{rewardRate}%</div>
            <div className="flex items-center gap-1">
              <span className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>{isPositive ? "↑" : "↓"} {movement}%</span>
              {/* <span className="text-zinc-500 text-sm">+${earnings}</span> */}
            </div>
          </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-0 py-0 relative">
            <div className="flex flex-row w-full gap-2">
              <Button variant="outline" className="w-full bg-green-500 hover:bg-green-600 font-gilroy font-bold select-none">
                Buy Long
              </Button>
              <Button variant="outline" className="w-full bg-red-500 hover:bg-red-600 font-gilroy font-bold select-none">
                Buy Short
              </Button>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  )
}

