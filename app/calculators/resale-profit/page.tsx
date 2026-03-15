"use client";
import { useState } from "react";

export default function Page(){

const [buy,setBuy]=useState(0)
const [sell,setSell]=useState(0)

const [fee,setFee]=useState(0)
const [feeType,setFeeType]=useState("won")

const [shipping,setShipping]=useState(0)

const feeValue =
feeType === "percent"
? sell*(fee/100)
: fee

const profit = sell - buy - feeValue - shipping

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

<div className="flex gap-3">

<input
type="number"
placeholder="수수료"
className="p-3 rounded bg-slate-800 flex-1"
onChange={e=>setFee(+e.target.value)}
/>

<select
className="p-3 rounded bg-slate-800"
onChange={e=>setFeeType(e.target.value)}
>

<option value="won">원</option>
<option value="percent">%</option>

</select>

</div>

<input
type="number"
placeholder="배송비"
className="p-3 rounded bg-slate-800"
onChange={e=>setShipping(+e.target.value)}
/>

</div>

<div className="mt-10 text-2xl">

순수익: <b>{Math.round(profit)}원</b>

<br/>

마진율: <b>{margin}%</b>

</div>

<div className="flex gap-3 mt-6">

<button
className="bg-slate-800 px-4 py-2 rounded"
onClick={()=>{
navigator.clipboard.writeText(
`순수익: ${Math.round(profit)}원 / 마진율: ${margin}%`
)
}}
>
결과 복사
</button>

<button
className="bg-cyan-500 text-black px-4 py-2 rounded"
onClick={()=>{
navigator.share({
title:"중고거래 순수익 계산",
text:`순수익 ${Math.round(profit)}원`,
url:window.location.href
})
}}
>
공유
</button>

</div>

export const metadata = {
title: "중고거래 순수익 계산기 | Resell Profit Calculator",
description:
"중고거래 판매가, 매입가, 수수료, 배송비를 입력하면 순수익과 마진율을 계산해주는 무료 계산기",
}

export default function Page(){

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-6">
중고거래 순수익 계산기
</h1>

<p className="text-slate-300 max-w-xl">

중고거래에서 실제로 남는 돈을 계산하려면
판매가에서 매입가, 수수료, 배송비를 모두 빼야 합니다.

이 계산기를 사용하면
중고거래 순수익과 마진율을 쉽게 계산할 수 있습니다.

</p>

</main>

)
}