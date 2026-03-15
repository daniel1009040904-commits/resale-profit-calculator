"use client";
import {useState} from "react";

export default function Page(){

const [cost,setCost]=useState("")
const [target,setTarget]=useState("")

const result=(Number(cost)||0)+(Number(target)||0)

return(

<div style={{padding:40}}>
<h1>손익분기 계산기</h1>

<p>총 비용</p>
<input type="number" onChange={(e)=>setCost(e.target.value)}/>

<p>목표 수익</p>
<input type="number" onChange={(e)=>setTarget(e.target.value)}/>

<h2>필요 판매가 : {result.toLocaleString()}원</h2>

</div>

)

}