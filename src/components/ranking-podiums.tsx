"use client"
import Image from 'next/image'
import { TopUser } from '@/types/ranking'
import CountdownTimer from './countdown-timer'
import { motion } from 'framer-motion'
import podiumStyle from '@/components/styles/podium.module.css'
import { Trophy, Gem } from 'lucide-react'
import { Separator } from './ui/separator'

interface PodiumProps {
  topUsers: TopUser[]
}

export default function Podiums({ topUsers }: PodiumProps) {
  const [second, first, third] = topUsers

  return (
    <div className="flex justify-center items-end mb-8">
      {/* Second Place */}
      <motion.div
        className="flex flex-col items-center mb-8 mx-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        aria-live="polite"
      >
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={second.avatar}
            alt={second.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <h3 className="text-white font-semibold mb-2 text-xl">{second.name}</h3>
        <Podium pointsToEarn={second.pointsToEarn} prize={second.prize || 0}/>
      </motion.div>

      {/* First Place */}
      <motion.div
        className="flex flex-col items-center mb-16 mx-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        aria-live="polite"
      >
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={first.avatar}
            alt={first.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <h3 className="text-white font-semibold mb-2 text-xl">{first.name}</h3>
        <Podium pointsToEarn={first.pointsToEarn} prize={first.prize || 0}/>
        <CountdownTimer/>
      </motion.div>

      {/* Third Place */}
      <motion.div
        className="flex flex-col items-center mb-4 mx-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        aria-live="polite"
      >
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={third.avatar}
            alt={third.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <h3 className="text-white font-semibold mb-2 text-xl">{third.name}</h3>
        <Podium pointsToEarn={third.pointsToEarn} prize={third.prize || 0}/>
      </motion.div>
    </div>
  )
}

function Podium({pointsToEarn, prize}:{pointsToEarn:number, prize:number})
{
    return(
        <>
            <div className={podiumStyle.box}>
                <div className="flex flex-col items-center justify-center gap-2 -translate-y-6">
                    <Trophy className='p-2 w-12 h-12 bg-red-200 rounded-xl' size={'xl'}/>
                    <span className="text-gray-400 text-sm">Earn {pointsToEarn} points</span>
                </div>
                <Separator/>
                <div className="flex items-center justify-center pt-8 gap-2">
                    <Gem className='text-blue-400'/>
                    <span className="text-blue-400 text-2xl">{prize}</span>
                </div>
                <div className="bg-gradient-to-t from-background to-transparent z-10 h-24 -mx-4"></div>
            </div>
        </>
    )
}
