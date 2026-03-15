"use client"
import { useState } from "react"

export default function Page(){

const [cost,setCost]=useState(0)
const [target,setTarget]=useState(0)

const price=cost+target

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-10">
목표이익 판매가 계산기
</h1>

<input
type="number"
placeholder="매입가"
className="p-3 rounded bg-slate-800"
onChange={e=>setCost(+e.target.value)}
/>

<input
type="number"
placeholder="원하는 이익"
className="p-3 rounded bg-slate-800 mt-3"
onChange={e=>setTarget(+e.target.value)}
/>

<div className="mt-10 text-2xl">

추천 판매가: <b>{price}원</b>

</div>

</main>

)
}