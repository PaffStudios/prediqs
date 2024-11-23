'use client'

import { useEffect, useState } from 'react'

export default function CountdownTimer() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      // This is just demo data - you would normally calculate this from a proper end time
      setTime({
        days: 0,
        hours: 0,
        minutes: 43,
        seconds: 51,
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-gray-200 text-lg z-10">
      Ends in{' '}
      <span className="text-lg">
        {`${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`}
      </span>
    </div>
  )
}

