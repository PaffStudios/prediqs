import EmblaCarousel from "@/components/embla-carousel"
import { EmblaOptionsType } from "embla-carousel"

export default function DiscoverPage()
{
    const SLIDE_COUNT = 25
    const OPTIONS: EmblaOptionsType = { axis: 'y', align:'center', startIndex: Math.floor(SLIDE_COUNT/2)}
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    return(
        <>
            <div className="h-screen overflow-hidden grid place-items-center">
                <div className="grid place-items-center ">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
            </div>
        </>
    )
}