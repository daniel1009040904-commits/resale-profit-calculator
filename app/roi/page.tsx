"use client";
import {useState} from "react";

export default function Page(){

const [buy,setBuy]=useState("")
const [sell,setSell]=useState("")

const roi=((Number(sell)-Number(buy))/Number(buy)*100)||0

return(

<div style={{padding:40}}>
<h1>수익률 계산기</h1>

<p>투자금</p>
<input type="number" onChange={(e)=>setBuy(e.target.value)}/>

<p>판매금</p>
<input type="number" onChange={(e)=>setSell(e.target.value)}/>

<h2>수익률 : {roi.toFixed(1)}%</h2>

</div>

)

}