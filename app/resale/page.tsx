"use client";
import { useState } from "react";

export default function Page(){

const [buy,setBuy]=useState(0)
const [sell,setSell]=useState(0)

const [fee,setFee]=useState(3.5)
const [feeType,setFeeType]=useState("percent")

const [shipping,setShipping]=useState(3500)

const feeValue =
feeType==="percent"
? sell*(fee/100)
: fee

const profit = sell-buy-feeValue-shipping

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


{/* 플랫폼 버튼 */}

<div className="flex gap-2 flex-wrap">

<button
className="bg-slate-800 px-3 py-2 rounded"
onClick={()=>{setFee(3.5);setFeeType("percent")}}
>
번개장터 3.5%
</button>

<button
className="bg-slate-800 px-3 py-2 rounded"
onClick={()=>{setFee(3);setFeeType("percent")}}
>
중고나라 3%
</button>

<button
className="bg-slate-800 px-3 py-2 rounded"
onClick={()=>{setFee(0);setFeeType("percent")}}
>
당근마켓 0%
</button>

</div>


<div className="flex gap-3">

<input
type="number"
placeholder="수수료"
className="p-3 rounded bg-slate-800 flex-1"
value={fee}
onChange={e=>setFee(+e.target.value)}
/>

<select
className="p-3 rounded bg-slate-800"
value={feeType}
onChange={e=>setFeeType(e.target.value)}
>

<option value="percent">%</option>
<option value="won">원</option>

</select>

</div>


<select
className="p-3 rounded bg-slate-800"
onChange={e=>setShipping(+e.target.value)}
>

<option value="1800">반값택배 (1800원)</option>
<option value="3500">편의점택배 (3500원)</option>
<option value="4000">일반택배 (4000원)</option>
<option value="0">직거래</option>

</select>

</div>


{/* 결과 */}

<div className="mt-12 bg-slate-900 p-6 rounded-2xl max-w-xl">

<p className="text-slate-400 mb-2">
순수익
</p>

<p className="text-4xl font-black text-cyan-400">
{Math.round(profit)}원
</p>

<p className="mt-4 text-lg">
마진율: <b>{margin}%</b>
</p>

</div>

</main>

)
}