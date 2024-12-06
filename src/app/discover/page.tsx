"use client"
// import CardWallet from "@/components/card-slider"
import Ripple from "@/components/ui/ripple"
import CardWallet from "@/components/card-slider"
import { useCallback, useEffect, useRef, useState } from "react"
import ShimmerButton from "@/components/ui/shimmer-button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { EmblaCarouselType } from "embla-carousel"
import WalletComponent from "@/components/web3/wallet-component"
import { Logo } from "@/components/ui/logo"

export default function DiscoverPage()
{
    const { toast } = useToast()
    const [skipToNext, setSkipToNext] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isTrading, setIsTrading] = useState(false)
    const [disableInput, setDisableInput] = useState(false)
    const [maxTradePrice, setMaxTradePrice] = useState(0)
    const [minTradePrice, setMinTradePrice] = useState(0)
    const arrowEffectParent = useRef<HTMLDivElement>(null)
    const [animation, setAnimation] = useState<"yes" | "no" | null>(null)

    const onPollSelected = useCallback(
        (emblaApi: EmblaCarouselType) => {
            console.log(emblaApi)
        },
        []
    )

    const onPollClick = () => {
        setIsExpanded(!isExpanded)
    }

    let voteLoop:NodeJS.Timeout

    const handleTrade = () => {
        if(minTradePrice > maxTradePrice){
            toast({
                title: "Invalid Value",
                description: "Please enter a valid value for the max trade price",
              })
            return
        }
        setIsTrading(!isTrading)
    }

    useEffect(() => {
        if (isTrading) {
            voteLoop = setInterval(() => {
                console.log("Voting")
                const randomBoolean = Math.random() >= 0.5;
                handleVote(randomBoolean ? "yes" : "no")
            }, 3000);
        } else {
            setAnimation(null);
            if (voteLoop) {
                clearInterval(voteLoop);
            }
        }

        return () => {
            if (voteLoop) {
                clearInterval(voteLoop);
            }
        };
    }, [isTrading]);

    const handleMaxTradePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxTradePrice(parseInt(e.currentTarget.value, 10))
    }

    const handleMinTradePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinTradePrice(parseInt(e.currentTarget.value, 10))
    }

    const handleVote = async (vote: "yes" | "no") => {
        // setSelectedPoll(pollId)
        setDisableInput(true)
        setAnimation(vote)
        
        // Reset animation after 1 second
        await new Promise(resolve => setTimeout(resolve, 1000))
        setAnimation(null)
        setSkipToNext(!skipToNext)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setDisableInput(false)
    }

    return(
        <div className="flex flex-row">
            <div className="absolute top-4 right-4 z-40">
                <WalletComponent/>
            </div>
            <div className="absolute top-4 left-4 z-40">
                <Logo/>
            </div>
            <div className={`w-full transition-all duration-300 overflow-hidden grid place-items-center ${isExpanded ? "h-1/2" : "h-full"}`}>
                <Ripple rippleColor={animation == null ? "white" : animation == "yes" ? "green" : "red"}/>
                <AnimatePresence>
                    {animation && (
                        <motion.div
                            ref={arrowEffectParent}
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}} 
                            transition={{ duration: 1}}
                            className={`absolute top-0 left-0 w-screen h-screen z-0}`}>
                            {Array.from({ length: 50 }, (_, i) => (
                               <motion.div >
                                    {animation === "yes" ? (
                                        <motion.div
                                            initial={{ opacity: 0, translateY: 0, top: Math.random() * 100+"%", left: Math.random() * 100+"%", position: "absolute" }}
                                            animate={{ opacity: 1, translateY: -300 }}
                                            transition={{ duration: 1, delay: Math.min(0.9, Math.random())}}
                                        >
                                            <ArrowUpCircle className="text-green-500" size={Math.max(48, Math.random() * 72)} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, translateY: 0, top: Math.random() * 100+"%", left: Math.random() * 100+"%", position: "absolute" }}
                                            animate={{ opacity: 1, translateY: 300 }}
                                            transition={{ duration: 1, delay: Math.min(0.9, Math.random())}}
                                        >
                                            <ArrowDownCircle className="text-red-500"  size={Math.max(48, Math.random() * 72)} />
                                        </motion.div>
                                    )}
                               </motion.div> 
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className={`h-full transition-all duration-300 w-full overflow-hidden ${isTrading ? "pointer-events-none" : ""}`}>
                    <CardWallet isExpanded={isExpanded} skipToNext={skipToNext} autoplayIsPlaying={isTrading} onClick={onPollClick} onPollSelected={onPollSelected}/>
                </div>
            </div>
            <div className="absolute bottom-2 bg-background w-[90%] md:w-[60%] h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 rounded-xl p-4 flex gap-4 justify-between items-center">
                <AnimatePresence>
                    {animation && (
                        <motion.div
                        className={`absolute inset-0 z-10 flex items-center justify-center rounded-xl ${
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
                            {animation === "yes" ? <ArrowUpCircle size={32} /> : <ArrowDownCircle size={32} />}
                        </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex flex-row gap-3 w-full">
                    <motion.button
                        disabled={isTrading || disableInput}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-green-500 transition-colors ${isTrading ? 'bg-green-500/5 cursor-not-allowed' : 'bg-green-500/10 cursor-pointer hover:bg-green-500/20'}`}
                        whileTap={isTrading ? {} : { scale: 0.95 }}
                        onClick={() => handleVote("yes")}
                    >
                        <ArrowUpCircle className="h-4 w-4" />
                        Buy Yes
                    </motion.button>
                    <motion.button
                        disabled={isTrading || disableInput}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-red-500 transition-colors ${isTrading ? 'bg-red-500/5 cursor-not-allowed' : 'bg-red-500/10 cursor-pointer hover:bg-red-500/20'}`}
                        whileTap={isTrading ? {} : { scale: 0.95 }}
                        onClick={() => handleVote("no")}
                    >
                        <ArrowDownCircle className="h-4 w-4" />
                        Buy No
                    </motion.button>
                </div>
                <Popover>
                    <PopoverTrigger>
                        <ShimmerButton shimmerSize={isTrading ? "0.05em" : "-2em"} shimmerDuration={isTrading ? "1s" : "0s"} borderRadius="15px" className="w-10 h-10">
                            <h1 className="z-20 text-white font-gilroy">AI</h1>
                        </ShimmerButton>
                    </PopoverTrigger>
                    <PopoverContent>

                        <div className="flex flex-col gap-2">
                            <div className="space-y-2">
                                <h4 className="leading-none font-gilroy font-bold">AI Trade</h4>
                                <p className="text-sm text-muted-foreground font-gilroy">
                                Trade your coins automatically.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxPrice">Max. price</Label>
                                <Input
                                    disabled={isTrading}
                                    min={minTradePrice}
                                    defaultValue={2}
                                    type="number"
                                    id="maxPrice"
                                    value={maxTradePrice}
                                    className="col-span-2 h-8"
                                    onChange={handleMaxTradePrice}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="minPrice">Min. price</Label>
                                <Input
                                    disabled={isTrading}
                                    min={1}
                                    max={maxTradePrice}
                                    defaultValue={1}
                                    type="number"
                                    id="minPrice"
                                    value={minTradePrice}
                                    className="col-span-2 h-8"
                                    onChange={handleMinTradePrice}
                                />
                            </div>
                            <Button onClick={handleTrade}>
                                <span>{isTrading ? "Stop Trading" : "Start Trading"}</span>
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
