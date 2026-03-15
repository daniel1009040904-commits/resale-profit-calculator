"use client"
import { useState } from "react"

export default function Page(){

const [buy,setBuy]=useState(0)
const [sell,setSell]=useState(0)

const profit=sell-buy
const margin=sell?((profit/sell)*100).toFixed(1):0

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-10">
마진율 계산기
</h1>

<input
type="number"
placeholder="매입가"
className="p-3 rounded bg-slate-800"
onChange={e=>setBuy(+e.target.value)}
/>

<input
type="number"
placeholder="판매가"
className="p-3 rounded bg-slate-800 mt-3"
onChange={e=>setSell(+e.target.value)}
/>

<div className="mt-10 text-2xl">

순이익: <b>{profit}원</b>

<br/>

마진율: <b>{margin}%</b>

</div>

</main>

)
}