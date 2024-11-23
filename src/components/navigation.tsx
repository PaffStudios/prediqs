"use client"
import React from 'react'
import Link from 'next/link'
import { Trophy, Activity } from 'lucide-react'
import { usePathname } from 'next/navigation'
import WalletComponent from './web3/wallet-component'

const Navigation: React.FC = () => {
  const pathName = usePathname()
  if(pathName === "/discover") return null
  return (
    <nav className="bg-background flex flex-row place-items-center h-12 py-8 px-16 border-b">
      <div className="w-full mx-auto flex flex-row gap-5 items-center h-16">
        <Link href={'/'}>
          <div className="text-foreground text-3xl font-bold">PREDIQS</div>
        </Link>
        <Link href="/activity-feed" className='flex flex-row place-items-center align-center place-content-center bg-card'>
              <Activity className='h-4'/>
              <p className='text-md pt-0.5'>Activity</p>
          </Link>
          <Link href="/leaderboard" className='flex flex-row place-items-center align-center place-content-center bg-card'>
              <Trophy className='h-4'/>
              <p className='text-md pt-0.5'>Ranks</p>
          </Link>
      </div>
      <WalletComponent />
    </nav>
  )
}


export default Navigation

