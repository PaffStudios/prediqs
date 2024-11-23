'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

export default function FighterHero() {
  const [animate, setAnimate] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, times: [0, 0.5, 1] }
      })
    }, )

    return () => {
      clearTimeout(timer)
    }
  }, [controls])

  return (
    <section className="container mx-auto px-6 my-6 h-96 p-4 overflow-hidden">
      <div className="container mx-auto h-full px-4 bg-red-400">
        <div className="relative flex h-full items-center justify-center">
          <motion.div
            className="relative h-full w-1/2 overflow-visible"
            initial={{ x: '-75%', opacity:0}}
            animate={animate ? { x: '-20%', opacity:1} : {}}
            transition={{ duration: 0.8, ease:"easeOut" }}
          >
            <Image
              src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/V4YQVE3M2RHZXH32HKLLKQ37IE.png"
              alt="Fighter 1"
              layout="fill"
              objectFit="contain"
            />
          </motion.div>
          <AnimatePresence>
            {animate && (
              <div className="absolute z-10 flex flex-row">
                <motion.div
                    initial={{ scale: 3, opacity: 0}}
                    animate={{ scale:1, opacity:1}}
                    transition={{duration:0.2}}
                  className="text-center text-9xl font-bold text-white"
                  style={{
                    textShadow: '0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #FF0000, 0 0 40px #FF7F00, 0 0 70px #FF7F00, 0 0 80px #FF7F00, 0 0 100px #FF7F00, 0 0 150px #FF7F00'
                  }}
                >
                  V
                </motion.div>
                <motion.div
                    initial={{ scale: 3, opacity: 0}}
                    animate={{ scale:1, opacity:1}}
                    transition={{duration:0.2, delay:0.3}}
                  className="text-center text-9xl font-bold text-white"
                  style={{
                    textShadow: '0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #FF0000, 0 0 40px #FF7F00, 0 0 70px #FF7F00, 0 0 80px #FF7F00, 0 0 100px #FF7F00, 0 0 150px #FF7F00'
                  }}
                >
                  S
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <motion.div
            className="relative h-full w-1/2 overflow-visible"
            initial={{ x: '75%', opacity:0 }}
            animate={animate ? { x: '20%', opacity:1 } : {}}
            transition={{ duration: 0.8, ease:"easeOut" }}
          >
            <Image
              src="https://indianexpress.com/wp-content/uploads/2023/12/Joe_Biden-removebg-preview.png  "
              alt="Fighter 2"
              layout="fill"
              objectFit="contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

