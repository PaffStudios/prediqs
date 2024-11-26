"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  EmblaCarouselType,
  EmblaEventType,
} from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowDownCircle, ArrowUpCircle, BarChart3, CircleArrowLeft, Star, Users } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion"
import { Progress } from "./ui/progress"
import Image from "next/image"
import Link from "next/link"
import { faker } from "@faker-js/faker"

interface PollCard {
    id: string
    question: string
    image: string
    chance: number
    volume: number
    participants: number
    starred?: boolean
  }

  const polls: PollCard[] = Array.from({ length: 4 }).map((_, i) => ({
    id: String(i + 1),
    question: faker.lorem.sentence(),
    image: faker.image.avatar(),
    chance: faker.number.int({max:100}),
    volume: Number(faker.finance.amount({min:0, max:99})),
    participants: faker.number.int({max:1000}),
    starred: faker.datatype.boolean(),
  }))
  
  interface CardSliderProps {
    handleWalletDetails: () => void
  }
  

const TWEEN_FACTOR = 0.5

const CardWallet: React.FC<CardSliderProps> = (props:CardSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: true,
    skipSnaps: true,
    align: 'center',
  })
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null)
  const [animation, setAnimation] = useState<"yes" | "no" | null>(null)

  const handleVote = async (pollId: string, vote: "yes" | "no") => {
    setSelectedPoll(pollId)
    setAnimation(vote)
    
    // Reset animation after 1 second
    await new Promise(resolve => setTimeout(resolve, 1000))
    setAnimation(null)
    setSelectedPoll(null)
  }

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.card') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)
                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scale = Math.max(0.7, Math.min(tweenValue, 1))
          const tweenNode = tweenNodes.current[slideIndex]
          
          // Calculate rotation based on distance from center
          const rotate = Math.max(-5, Math.min((1 - tweenValue) * 10, 5))

          // Apply rotation only if not the center element
          if (Math.abs(diffToTarget) > 0.01) {
            tweenNode.style.transform = `scale(${scale}) rotate(${rotate}deg)`
          } else {
            tweenNode.style.transform = `scale(${scale})`
          }
          
          tweenNode.style.opacity = Math.max(0.5, tweenValue).toString()
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenScale)
        .off("scroll", tweenScale)
    }
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale])

  return (
    <div className="h-screen w-full px-4 grid place-items-center select-none">
      <div className="pb-4 absolute top-8 left-8 w-full">
        <div className="flex items-center gap-4">
            <Link href="/" className="z-10">
                <CircleArrowLeft className="w-12 h-12"/>
            </Link>
            <div>
                <h1 className="text-3xl font-bold">Dicover</h1>
                <h2 className="text-3xl text-gray-400">New Polls</h2>
            </div>
        </div>
      </div>

      <div className="relative h-[500px] w-full" ref={emblaRef}>
        <div className="h-full">
          {polls.map((poll, index) => (
            <div
              key={index}
              className="relative h-64 w-full shrink-0"
              onClick={props.handleWalletDetails}
            >
              <div className={`card absolute inset-x-0 mx-auto w-[65%] rounded-3xl p-6 bg-card shadow-lg backdrop-blur-sm transition-all duration-200`}>
                <AnimatePresence>
                    {selectedPoll === poll.id && animation && (
                        <motion.div
                        className={`absolute inset-0 z-10 flex items-center justify-center rounded-3xl ${
                            animation === "yes" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                            exit={{ scale: 0 }}
                            className={animation === "yes" ? "text-green-500" : "text-red-500"}
                        >
                            {animation === "yes" ? <ArrowUpCircle size={48} /> : <ArrowDownCircle size={48} />}
                        </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Image
                    src={poll.image}
                    alt="Crypto icon"
                    width={48}
                    height={48}
                    className="rounded-full bg-gray-700 p-2"
                    />
                    <h2 className="text-lg font-semibold text-white">{poll.question}</h2>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-white">{poll.chance}%</span>
                    <span className="text-sm text-gray-400">chance</span>
                </div>
                </div>

                <Progress 
                value={poll.chance} 
                className="my-4 bg-gray-700" 
                />

                <div className="mt-4 grid grid-cols-2 gap-3">
                <motion.button
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 py-2 text-green-500 transition-colors hover:bg-green-500/20"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(poll.id, "yes")}
                >
                    <ArrowUpCircle className="h-4 w-4" />
                    Buy Yes
                </motion.button>
                <motion.button
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 py-2 text-red-500 transition-colors hover:bg-red-500/20"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(poll.id, "no")}
                >
                    <ArrowDownCircle className="h-4 w-4" />
                    Buy No
                </motion.button>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        ${poll.volume}m Vol.
                        </div>
                        <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {poll.participants}
                        </div>
                    </div>
                    <button className="rounded-full p-1 hover:bg-gray-700">
                        <Star className={`h-4 w-4 ${poll.starred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardWallet

