// "use client"

// import React from 'react'
// import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent
// } from "@/components/ui/chart"

// const data = [
//   { time: "08:00", open: 0.00662, high: 0.00664, low: 0.00661, close: 0.00663 },
//   { time: "09:00", open: 0.00663, high: 0.00665, low: 0.00662, close: 0.00664 },
//   { time: "10:00", open: 0.00664, high: 0.00666, low: 0.00663, close: 0.00665 },
//   { time: "11:00", open: 0.00665, high: 0.00667, low: 0.00664, close: 0.00666 },
//   { time: "12:00", open: 0.00666, high: 0.00668, low: 0.00665, close: 0.00667 },
//   { time: "13:00", open: 0.00667, high: 0.00669, low: 0.00666, close: 0.00668 },
//   { time: "14:00", open: 0.00668, high: 0.00670, low: 0.00667, close: 0.00669 },
//   { time: "15:00", open: 0.00669, high: 0.00671, low: 0.00668, close: 0.00670 },
// ]

// const CryptoChart: React.FC = () => {
//   return (
//     <ChartContainer
//       config={{
//         candlestick: {
//           label: "Price",
//           color: "hsl(var(--chart-1))",
//         },
//       }}
//       className="w-full h-full"
//     >
//       <BarChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
//       >
//         <XAxis dataKey="time" />
//         <YAxis />
//         <Tooltip
//           content={({ active, payload }) => {
//             if (active && payload && payload.length) {
//               const data = payload[0].payload
//               return (
//                 <ChartTooltipContent>
//                   <div className="text-sm font-medium">{data.time}</div>
//                   <div className="text-xs text-muted-foreground">
//                     Open: {data.open} Close: {data.close}
//                   </div>
//                   <div className="text-xs text-muted-foreground">
//                     High: {data.high} Low: {data.low}
//                   </div>
//                 </ChartTooltipContent>
//               )
//             }
//             return null
//           }}
//         />
//         <Bar
//           dataKey="low"
//           stackId="a"
//           fill="var(--color-candlestick)"
//           isAnimationActive={false}
//         />
//         <Bar
//           dataKey="open"
//           stackId="a"
//           fill="var(--color-candlestick)"
//           isAnimationActive={false}
//         />
//         <Bar
//           dataKey="close"
//           stackId="a"
//           fill="var(--color-candlestick)"
//           isAnimationActive={false}
//         />
//         <Bar
//           dataKey="high"
//           stackId="a"
//           fill="var(--color-candlestick)"
//           isAnimationActive={false}
//         />
//       </BarChart>
//     </ChartContainer>
//   )
// }

// export default CryptoChart

