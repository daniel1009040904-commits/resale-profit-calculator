"use client";
import {useState} from "react";

export default function Page(){

const [price,setPrice]=useState("")
const shipping=Number(price)>50000?0:3000

return(

<div style={{padding:40}}>
<h1>배송비 계산기</h1>

<p>상품 가격</p>
<input type="number" onChange={(e)=>setPrice(e.target.value)}/>

<h2>배송비 : {shipping.toLocaleString()}원</h2>

</div>

)

}