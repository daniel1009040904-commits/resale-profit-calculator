"use client";
import {useState} from "react";

export default function Page(){

const [cost,setCost]=useState("")
const [price,setPrice]=useState("")

const margin=((Number(price)-Number(cost))/Number(price)*100)||0

return(

<div style={{padding:40}}>
<h1>마진 계산기</h1>

<p>원가</p>
<input type="number" onChange={(e)=>setCost(e.target.value)}/>

<p>판매가</p>
<input type="number" onChange={(e)=>setPrice(e.target.value)}/>

<h2>마진율 : {margin.toFixed(1)}%</h2>

</div>

)

}