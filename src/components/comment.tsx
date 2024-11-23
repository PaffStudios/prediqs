import { Heart } from "lucide-react"
import Image from "next/image"

export default function Comment()
{
    return(
        <div className="flex items-start justify-between gap-3 group p-4">
          <div className="flex gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Secondary Avatar"
                width={20}
                height={20}
                className="absolute -bottom-1 -right-1 rounded-full border-2 border-[#1a1a1a]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">{"comment.user"}</span>
              <span className="text-gray-400 text-sm">{"comment.text"}</span>
            </div>
          </div>
          <button className="text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
    )
}