"use client"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { motion } from "motion/react"
import AvatarCircles from "@/components/ui/avatar-circles";

interface PollCardProps {
  id: number
  title: string
  image: string
  author: string
  timestamp: string
}

export function PollCard({ id, title, image, author, timestamp }: PollCardProps) {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x:-150 }}
      animate={{ opacity: 1, scale: 1, x:0 }}
      transition={{ duration: 0.3, delay: id * 0.05 }}
    >
      <Card className="overflow-hidden rounded-2xl bg-card hover:bg-accent/50 transition-colors">
        <Link href={`/prediction/${id}`} className="block">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{author}</span>
                  <span>•</span>
                  <span>{timestamp}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 pt-0">
            <div className="flex flex-row w-full gap-2">
              <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                Buy Long
              </Button>
              <Button variant="outline" className="w-full">
                Buy Short
              </Button>
            </div>
            <div className="w-full h-full relative">
              <AvatarCircles numPeople={99} avatarUrls={avatars}/>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  )
}

