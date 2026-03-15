"use client";
import { useState } from "react";

export default function Page(){

const [buy,setBuy]=useState(0)
const [sell,setSell]=useState(0)
const [fee,setFee]=useState(0)
const [shipping,setShipping]=useState(0)

const profit = sell - buy - fee - shipping

const margin =
sell
? ((profit/sell)*100).toFixed(1)
: 0

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-10">
중고거래 순수익 계산기
</h1>

<div className="grid gap-4 max-w-xl">

<input
type="number"
placeholder="매입가"
className="p-3 rounded bg-slate-800"
onChange={e=>setBuy(+e.target.value)}
/>

<input
type="number"
placeholder="판매가"
className="p-3 rounded bg-slate-800"
onChange={e=>setSell(+e.target.value)}
/>

<input
type="number"
placeholder="수수료"
className="p-3 rounded bg-slate-800"
onChange={e=>setFee(+e.target.value)}
/>

<input
type="number"
placeholder="배송비"
className="p-3 rounded bg-slate-800"
onChange={e=>setShipping(+e.target.value)}
/>

</div>

<div className="mt-10 text-2xl">

순수익: <b>{profit}원</b>

<br/>

마진율: <b>{margin}%</b>

</div>

</main>

)
}