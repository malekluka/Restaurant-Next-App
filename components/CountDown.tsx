"use client"

import dynamic from "next/dynamic"
import type { CountdownProps } from "react-countdown"

const Countdown = dynamic<CountdownProps>(
  () => import("react-countdown").then(mod => mod.default as never),
  { ssr: false }
)

const endingDate = new Date("2025-12-24")

const CountDown = () => {
  return (
    <div className="font-bold text-5xl text-yellow-300">
      <Countdown date={endingDate} />
    </div>
  )
}

export default CountDown
