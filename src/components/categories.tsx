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
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        <div className='relative h-full flex flex-row w-[calc(100%-220px)]'>
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background to-transparent"></div>
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto lg:w-full no-scrollbar"
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
                      className="flex-shrink-0 rounded-full px-4 transition-all duration-200 hover:scale-105"
                    >
                      {category.isLive ? 
                        <motion.div 
                          className="mr-1 rounded-full w-2 h-2 bg-red-500 grid place-content-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}>
                            <div className='rounded-full w-4 aspect-square bg-red-500'></div> 
                        </motion.div> : <></>}
                      {category.name}
                    </Button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background to-transparent"></div>
        </div>
        <div className="relative ml-4 w-52 flex-shrink-0">
          <Input
            type="search"
            placeholder="Search"
            className="w-full pr-8"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}

export default Categories

