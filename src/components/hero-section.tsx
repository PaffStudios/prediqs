import React from 'react'
import { Card } from "@/components/ui/card"
import Image from 'next/image'

const HeroSection: React.FC = () => {
  return (
    <div className="container mx-auto px-6 my-6">
      <Card className="w-full">
        <Image
        src="https://s3-alpha-sig.figma.com/img/5010/b9a5/d11184096107177b9baf1c5789b97052?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXulqTyp0F6HzSNitRXXqXSnuMvOuHTViXQrKr8dHmSixEiChJv6wlPqdzf7WJabeHFx1QImcm6U5REsRZehqwJUidXNx3vem7vy3tK82N6vmhAZ6ouv9fYREvvly7guBnC04DRzWHU6iUEgroEWtHhkcQd3t4sLvhxW8BsM2TaX6O3BJeWiPyhihDCed4q~t5eSdMBw2utfylB94xPN3ok5CcywTOlfafluycu3h7GJkjFJpTshCtfGAe0N~ADNlo25dAfvxWWQeA6VuJ7gpkeXazPr7Td7v6Om4qNAP~2yU80sPlTaRn-5A6Ndlv4Ume4Ln27q5YDSrDmIrb2vQA__"
        alt=""
        width={1600}
        height={400}
        className='w-full aspect-[4/1] object-cover'
        />
      </Card>
    </div>
  )
}

export default HeroSection

