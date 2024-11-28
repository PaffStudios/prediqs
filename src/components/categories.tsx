"use client"

import React, { useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

const Categories = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const categories = [
    { name: "LIVE", isLive: true },
    { name: "All" },
    { name: "New" },
    { name: "Creators" },
    { name: "Sports" },
    { name: "Mentions" },
    { name: "Politics" },
    { name: "Crypto" },
    { name: "Pop Culture" },
    { name: "Business" },
    { name: "Science" }
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft)
    setScrollLeft(scrollContainerRef.current!.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current!.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="w-full bg-background py-4">
      <div className="w-full md:w-[95%] mx-auto px-3 md:px-6 flex items-center justify-between relative overflow-hidden md:overflow-auto">
        <div className='relative h-full flex flex-row w-screen md:w-[calc(100%-220px)]'>
          <div className="absolute -inset-x-1 top-0 w-6 md:w-24 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto w-full lg:w-full no-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex space-x-4 w-max p-2">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <Button
                      key={index}
                      variant={category.isLive ? "destructive" : "secondary"}
                      size="sm"
                      className="flex-shrink-0 rounded-full px-4 transition-all duration-200 hover:scale-105 bg-transparent backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] hover:[box-shadow:0_-20px_80px_-20px_#ffffff3f_inset]"
                    >
                      {category.isLive ? 
                        <motion.div 
                          className="mr-1 rounded-full w-2 h-2 bg-red-500 grid place-content-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}>
                            <div className='rounded-full w-4 aspect-square bg-red-500'></div> 
                        </motion.div> : <></>}
                      <span className='font-gilroy font-bold select-none'>{category.name}</span>
                    </Button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background to-transparent"></div>
        </div>
        <div className="relative hidden md:block ml-4 max-w-72 flex-shrink-0">
          <Input
            type="search"
            placeholder="Search"
            className="w-full pr-8"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground font-gilroy font-bold" />
        </div>
      </div>
    </div>
  )
}

export default Categories

