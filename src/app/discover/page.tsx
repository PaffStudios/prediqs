"use client"
// import CardWallet from "@/components/card-slider"
import Ripple from "@/components/ui/ripple"
import dynamic from "next/dynamic"

export default function DiscoverPage()
{
    // const [isExpanded, setIsExpanded] = useState(false)
    const handleWalletDetails = () => {
        // setIsExpanded(!isExpanded)
    }

    const noSsrCardWallet = dynamic(() => import("@/components/card-slider"), { ssr: false })
    const NoSsrCardWallet = noSsrCardWallet as React.ComponentType<{ handleWalletDetails: () => void }>;
    return(
        <div className="flex flex-row">
            <div className={`h-screen "w-full" transition-all duration-300 overflow-hidden grid place-items-center`}>
                <Ripple/>
                <div className="w-screen overflow-hidden">
                    <NoSsrCardWallet handleWalletDetails={handleWalletDetails}/>
                </div>
            </div>
            {/* <div className={`h-screen ${isExpanded ? "w-1/2" : "w-0"} bg-background transition-all duration-300 grid place-items-center`}>
                <div className="w-2/3 min-w-[500px] h-2/3 bg-red-300 rounded-xl">
                    <span>HEY THERE</span>
                </div>
            </div> */}
        </div>
    )
}