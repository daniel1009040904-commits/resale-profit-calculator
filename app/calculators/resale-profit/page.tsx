"use client";
import { useState } from "react";

export default function Page(){

const [buy,setBuy]=useState(0)
const [sell,setSell]=useState(0)
const [fee,setFee]=useState(0)
const [feeType,setFeeType]=useState("won")
const [shipping,setShipping]=useState(0)

const feeValue =
feeType==="percent"
? sell*(fee/100)
: fee

const profit = sell-buy-feeValue-shipping

const margin =
sell
? ((profit/sell)*100).toFixed(1)
: 0


const copyResult = ()=>{
navigator.clipboard.writeText(
`순수익: ${Math.round(profit)}원 / 마진율: ${margin}%`
)
alert("결과가 복사되었습니다")
}


const shareResult = async ()=>{

const data = {
title:"중고거래 순수익 계산",
text:`순수익 ${Math.round(profit)}원 / 마진율 ${margin}%`,
url:window.location.href
}

if(navigator.share){
await navigator.share(data)
}else{
navigator.clipboard.writeText(data.url)
alert("공유 기능이 지원되지 않아 링크가 복사되었습니다")
}

}


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

<div className="flex gap-3 mt-6">

<button
className="bg-slate-800 px-4 py-2 rounded"
onClick={copyResult}
>
결과 복사
</button>

<button
className="bg-cyan-500 text-black px-4 py-2 rounded"
onClick={shareResult}
>
공유
</button>

</div>

</div>

</main>

)
}