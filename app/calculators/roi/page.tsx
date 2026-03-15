"use client"
import { useState } from "react"

export default function Page(){

const [cost,setCost]=useState(0)
const [profit,setProfit]=useState(0)

const roi = cost ? ((profit/cost)*100).toFixed(1) : 0

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-10">
ROI 계산기
</h1>

<input
type="number"
placeholder="투자 비용"
className="p-3 rounded bg-slate-800"
onChange={e=>setCost(+e.target.value)}
/>

<input
type="number"
placeholder="순이익"
className="p-3 rounded bg-slate-800 mt-3"
onChange={e=>setProfit(+e.target.value)}
/>

<div className="mt-10 text-2xl">

ROI: <b>{roi}%</b>

</div>

</main>

)
}