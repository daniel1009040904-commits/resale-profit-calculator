"use client"

import { useState,useEffect } from "react"

function addComma(value:string){

const cleaned=value.replace(/,/g,"")

if(cleaned==="") return ""

if(isNaN(Number(cleaned))) return value

return Number(cleaned).toLocaleString("ko-KR")

}

function removeComma(v:string){
return v.replace(/,/g,"")
}

function isNumber(v:string){
return !isNaN(Number(removeComma(v)))
}

function format(n:number){
return new Intl.NumberFormat("ko-KR").format(n)
}

export default function Page(){

const [memo,setMemo]=useState("")

const [buy,setBuy]=useState("")
const [sell,setSell]=useState("")
const [shipping,setShipping]=useState("")
const [etc,setEtc]=useState("")
const [platform,setPlatform]=useState("")

const [feeType,setFeeType]=useState("percent")

const [history,setHistory]=useState<any[]>([])

useEffect(()=>{

const saved=localStorage.getItem("profit-history")

if(saved){
setHistory(JSON.parse(saved))
}

},[])

useEffect(()=>{
localStorage.setItem("profit-history",JSON.stringify(history))
},[history])

function calculate(){

if(
!isNumber(buy)||
!isNumber(sell)||
!isNumber(shipping)||
!isNumber(etc)||
!isNumber(platform)
){

alert("숫자가 아닌 값이 포함되었습니다")

return

}

const buyPrice=Number(removeComma(buy))
const sellPrice=Number(removeComma(sell))
const shippingFee=Number(removeComma(shipping))
const etcCost=Number(removeComma(etc))

let fee=Number(removeComma(platform))

if(feeType==="percent"){
fee=Math.floor((sellPrice*fee)/100)
}

const totalCost=buyPrice+shippingFee+etcCost+fee

const profit=sellPrice-totalCost

const margin=buyPrice>0?(profit/buyPrice)*100:0

const item={

id:Date.now(),

memo,

buyPrice,

sellPrice,

totalCost,

profit,

margin

}

setHistory([item,...history])

}

function downloadExcel(){

const header=["메모","구매가","판매가","총비용","순이익","수익률"]

const rows=history.map(h=>[
h.memo,
h.buyPrice,
h.sellPrice,
h.totalCost,
h.profit,
h.margin.toFixed(2)
])

const csv=[header,...rows].map(r=>r.join(",")).join("\n")

const blob=new Blob(["\ufeff"+csv],{type:"text/csv"})

const url=URL.createObjectURL(blob)

const a=document.createElement("a")

a.href=url

a.download="수익기록-엑셀.csv"

a.click()

}

return(

<main className="page">

<h1>중고거래 수익 계산기</h1>

<div className="card">

<input
placeholder="상품 메모"
value={memo}
onChange={e=>setMemo(e.target.value)}
/>

<input
placeholder="구매가"
value={buy}
onChange={e=>setBuy(addComma(e.target.value))}
/>

<input
placeholder="판매가"
value={sell}
onChange={e=>setSell(addComma(e.target.value))}
/>

<input
placeholder="택배비"
value={shipping}
onChange={e=>setShipping(addComma(e.target.value))}
/>

<div className="feeBox">

<select
value={feeType}
onChange={e=>setFeeType(e.target.value)}
>

<option value="percent">
수수료 %
</option>

<option value="won">
수수료 원
</option>

</select>

<input
placeholder="플랫폼 수수료"
value={platform}
onChange={e=>setPlatform(addComma(e.target.value))}
/>

</div>

<input
placeholder="기타 비용"
value={etc}
onChange={e=>setEtc(addComma(e.target.value))}
/>

<button onClick={calculate}>
계산하고 저장
</button>

</div>

<div className="card">

<button onClick={downloadExcel}>
엑셀 다운로드
</button>

</div>

<div className="card">

<table>

<thead>

<tr>
<th>메모</th>
<th>구매가</th>
<th>판매가</th>
<th>총비용</th>
<th>순이익</th>
<th>수익률</th>
</tr>

</thead>

<tbody>

{history.map(item=>(
<tr key={item.id}>

<td>{item.memo}</td>

<td>{format(item.buyPrice)}</td>

<td>{format(item.sellPrice)}</td>

<td>{format(item.totalCost)}</td>

<td>{format(item.profit)}</td>

<td>{item.margin.toFixed(2)}%</td>

</tr>
))}

</tbody>

</table>

</div>

</main>

)

}