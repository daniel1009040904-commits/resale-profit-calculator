"use client"
import { useState } from "react"

export default function Page(){

const [fixed,setFixed]=useState(0)
const [price,setPrice]=useState(0)
const [cost,setCost]=useState(0)

const breakEven = price-cost ? Math.ceil(fixed/(price-cost)) : 0

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-10">
손익분기점 계산기
</h1>

<input
type="number"
placeholder="고정비"
className="p-3 rounded bg-slate-800"
onChange={e=>setFixed(+e.target.value)}
/>

<input
type="number"
placeholder="판매가"
className="p-3 rounded bg-slate-800 mt-3"
onChange={e=>setPrice(+e.target.value)}
/>

<input
type="number"
placeholder="개당 비용"
className="p-3 rounded bg-slate-800 mt-3"
onChange={e=>setCost(+e.target.value)}
/>

<div className="mt-10 text-2xl">

손익분기 판매수량: <b>{breakEven}개</b>

</div>

</main>

)
}