"use client";
import {useState} from "react";

export default function Page(){

const [buy,setBuy]=useState("")
const [sell,setSell]=useState("")

const profit=(Number(sell)||0)-(Number(buy)||0)

return(

<div style={{padding:40}}>
<h1>중고거래 수익 계산기</h1>

<p>구매가</p>
<input type="number" onChange={(e)=>setBuy(e.target.value)}/>

<p>판매가</p>
<input type="number" onChange={(e)=>setSell(e.target.value)}/>

<h2>순수익 : {profit.toLocaleString()}원</h2>

</div>

)

}