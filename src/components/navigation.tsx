"use client"

import * as React from "react"
import Link from "next/link"
import { Trophy, Activity, BookOpen, Menu } from 'lucide-react'
import { usePathname } from "next/navigation"
import { useMediaQuery } from "react-responsive"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import WalletComponent from "./web3/wallet-component"

const navItems = [
  { href: "/activity-feed", icon: Activity, label: "Activity" },
  { href: "/leaderboard", icon: Trophy, label: "Ranks" },
  { href: "/discover", icon: BookOpen, label: "Discover" },
]

const NavLink: React.FC<{
  href: string
  icon: React.ElementType
  label: string
  onClick?: () => void
}> = ({ href, icon: Icon, label, onClick }) => (
  <Link
    href={href}
    className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent"
    onClick={onClick}
  >
    <Icon className="h-4 w-4" />
    <span className="font-gilroy font-bold">{label}</span>
  </Link>
)

const Navigation: React.FC = () => {
  const pathName = usePathname()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  if (pathName === "/discover") return null

  return (
    <nav className="top-0 z-40 w-full border-b bg-background">
      <div className="px-4 max-w-[1400px] mx-auto flex h-16 items-center justify-between">
        <div className="flex flex-row gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-4xl font-gilroy font-bold">PREDIQS</span>
          </Link>

          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="lg" className="md:hidden p-0">
                  <Menu className="!h-8 !w-8"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-gilroy">Navigation</SheetTitle>
                </SheetHeader>
                <div className="h-[95%] my-auto flex justify-between flex-col">
                <div className="mt-4 flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <NavLink key={item.href} {...item} />
                  ))}
                </div>
                <div>

                  <WalletComponent />
                </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/activity-feed" className='flex flex-row place-items-center align-center place-content-center bg-card'> 
                <Activity className='h-4'/> 
                <p className='text-md pt-0.5 font-gilroy font-bold'>Activity</p> 
              </Link> <Link href="/leaderboard" className='flex flex-row place-items-center align-center place-content-center bg-card'> 
                <Trophy className='h-4'/> 
                <p className='text-md pt-0.5 font-gilroy font-bold'>Ranks</p> 
              </Link> <Link href="/discover" className='flex flex-row place-items-center align-center place-content-center bg-card'> 
                <BookOpen className='h-4 '/> 
                  <p className='text-md pt-0.5 font-gilroy font-bold'>Discover</p> 
                </Link>
            </div>
            
          )}
        </div>
        <div className="hidden md:block">
          <WalletComponent />
        </div>
      </div>
    </nav>
  )
}

export default Navigation

