"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  EmblaCarouselType,
} from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { BarChart3, CircleArrowLeft, Star, Users } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay"
import { useAutoplay } from "./ui/embla-carousel-autoplay"
import { Progress } from "./ui/progress"
import Image from "next/image"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"
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

  const titles = ['Will OpenAI release GPT-5 to the public before January 2025?', 
    'Will Lionel Messi announce his retirement from professional football by the end of 2024??', 
    'Will the conflict in Gaza see a ceasefire agreement by December 31, 2024?',
    'Will Novak Djokovic win the Australian Open 2025?',
    'Will the 2025 World Cup be held in Qatar?',
    'Will Beyoncé win Album of the Year at the 2025 Grammy Awards?',
    'Will Apple announce a new AR/VR headset during their 2025 spring event?',
    'Will the global inflation rate drop below 5% by December 2024?',
    'Will the Los Angeles Lakers win the NBA Championship in 2025?',
    'Will Max Verstappen win the 2025 Formula 1 World Championship?',
    'Will England win the 2025 Ashes series in cricket?',
    'Will Elon Musk announce a new cryptocurrency by 2025?',
    'Will an AI-generated song win a major music award by 2025?',
    'Will a new social media platform surpass TikTok in daily users by 2025?',
    'Will a major central bank launch its own cryptocurrency by 2025?',
    'Will Solana become one of the top 3 cryptocurrencies by market cap by 2025?',
    'Will the total cryptocurrency market cap exceed $5 trillion by 2025?'];
  const polls: PollCard[] = Array.from({ length: 4 }).map((_, i) => ({
    id: String(i + 1),
    question: titles[Math.floor(Math.random() * titles.length)],
    image: faker.image.avatar(),
    chance: faker.number.int({max:100}),
    volume: Number(faker.finance.amount({min:0, max:99})),
    participants: faker.number.int({max:1000}),
    starred: faker.datatype.boolean(),

  }))
  
  interface CardSliderProps {
    onClick: () => void
    skipToNext: boolean
    onPollSelected: (element:EmblaCarouselType) => void
    autoplayIsPlaying: boolean
    isExpanded: boolean
  }
  

const TWEEN_FACTOR = 1

const CardWallet: React.FC<CardSliderProps> = (props:CardSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: true,
    skipSnaps: true,
    align: 'center',
  }, [Autoplay({playOnInit:false, delay: 3000})])
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  useEffect(() => {
    toggleAutoplay(props.autoplayIsPlaying)
  }, [props.autoplayIsPlaying])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [props.skipToNext])


  useEffect(() => {
    if (!emblaApi) return;

    const updateSlideVisibility = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      emblaApi.slideNodes().forEach((node, index) => {
        const card = node.querySelector('.card') as HTMLElement;
        if (card) {
          if (props.isExpanded) {
            card.style.opacity = index === selectedIndex ? '1' : '0';
          } else {
            card.style.opacity = '1';
          }
        }
      });
    };

    // Initial update
    updateSlideVisibility();

    // Update on scroll
    emblaApi.on('scroll', updateSlideVisibility);

    // Update when expansion state changes
    updateSlideVisibility();

    return () => {
      emblaApi.off('scroll', updateSlideVisibility);
    };
  }, [emblaApi, props.isExpanded]);

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
          const rotate = Math.max(-5, Math.min((1 - tweenValue) * 12, 5))

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
      .on("settle", props.onPollSelected)

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenScale)
        .off("scroll", tweenScale)
    }
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale])

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#48bb78",
    },
    mobile: {
      label: "Mobile",
      color: "#f56565",
    },
  } satisfies ChartConfig

  return (
    <div className="h-screen w-full px-4 grid place-items-center select-none">
      <div className="relative h-[500px] w-full" ref={emblaRef}>
        <div className="h-full">
          {polls.map((poll, index) => (
            <div
              key={index}
              className="relative h-64 w-full shrink-0"
              onClick={props.onClick}
            >
              <div className={`${props.isExpanded ? "top-[80%]" : "top-0"} card absolute inset-x-0 mx-auto max-w-screen w-[90%] md:w-[65%] rounded-3xl p-6 bg-card shadow-lg backdrop-blur-sm transition-all duration-200`}>
                <div className={`absolute left-0 bottom-full w-full h-96 rounded-xl transition-all duration-200 ${props.isExpanded ? "opacity-100" : "opacity-0"}`}>
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart accessibilityLayer data={chartData}>
                      <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                      <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-grow w-[60%]">
                      <Image
                      src={poll.image}
                      alt="Crypto icon"
                      width={48}
                      height={48}
                      className="rounded-xl bg-gray-700 p-2"
                      />
                      <h2 className="text-sm md:text-lg font-semibold text-white md:text-nowrap text-ellipsis w-full overflow-hidden">{poll.question}</h2>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-2xl font-bold text-white">{poll.chance}%</span>
                      <span className="text-sm text-gray-400">chance</span>
                  </div>
                </div>

                <Progress 
                value={poll.chance} 
                className="my-4 bg-gray-700" 
                />

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

