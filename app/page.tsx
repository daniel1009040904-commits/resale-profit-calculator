"use client";
import { useState } from "react";

export default function Home() {

  const [buy,setBuy] = useState("")
  const [sell,setSell] = useState("")
  const [shipping,setShipping] = useState("")
  const [fee,setFee] = useState("")
  const [targetProfit,setTargetProfit] = useState("")

  const buyNum = Number(buy) || 0
  const sellNum = Number(sell) || 0
  const shippingNum = Number(shipping) || 0
  const feeNum = Number(fee) || 0
  const targetNum = Number(targetProfit) || 0

  const totalCost = buyNum + shippingNum + feeNum
  const profit = sellNum - totalCost
  const rate = totalCost > 0 ? ((profit / totalCost) * 100).toFixed(1) : 0

  const neededPrice = totalCost + targetNum

  return (

<main style={{
minHeight:"100vh",
background:"#f3f4f6",
padding:"24px",
fontFamily:"sans-serif"
}}>

<div style={{
maxWidth:500,
margin:"0 auto",
background:"#fff",
padding:24,
borderRadius:16
}}>

<h1 style={{fontSize:28,fontWeight:700}}>
중고거래 수익 계산기
</h1>

<p style={{color:"#666"}}>
당근·번개장터 판매 전 수익 계산
</p>

<br/>

<p>구매가</p>
<input type="number"
value={buy}
onChange={(e)=>setBuy(e.target.value)}
style={{width:"100%",padding:10}}/>

<p>판매가</p>
<input type="number"
value={sell}
onChange={(e)=>setSell(e.target.value)}
style={{width:"100%",padding:10}}/>

<p>배송비</p>
<input type="number"
value={shipping}
onChange={(e)=>setShipping(e.target.value)}
style={{width:"100%",padding:10}}/>

<p>수수료 / 기타비용</p>
<input type="number"
value={fee}
onChange={(e)=>setFee(e.target.value)}
style={{width:"100%",padding:10}}/>

<p>목표 수익</p>
<input type="number"
value={targetProfit}
onChange={(e)=>setTargetProfit(e.target.value)}
style={{width:"100%",padding:10}}/>

<br/>

<div style={{
background:"#f9fafb",
padding:20,
borderRadius:12
}}>

<p>총비용 : <b>{totalCost.toLocaleString()}원</b></p>

<p style={{
fontSize:22,
fontWeight:700
}}>
순수익 : {profit.toLocaleString()}원
</p>

<p>수익률 : {rate}%</p>

<p>
목표 수익을 내려면 판매가 :
<b> {neededPrice.toLocaleString()}원</b>
</p>

</div>

</div>

</main>

  );
}