"use client"
import { useState } from "react"

export default function Page(){

const [weight,setWeight]=useState(0)

const post=4000+weight*500
const cvs=3500+weight*300
const half=1800

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-10">
택배비 비교 계산기
</h1>

<input
type="number"
placeholder="무게 kg"
className="p-3 rounded bg-slate-800"
onChange={e=>setWeight(+e.target.value)}
/>

<div className="mt-10 space-y-3 text-xl">

<div>우체국 예상: {post}원</div>

<div>편의점택배: {cvs}원</div>

<div>반값택배: {half}원</div>

</div>

</main>

)
}