"use client";
import { useState } from "react";

export default function Shipping(){
const [price,setPrice]=useState(0)

const shipping=price>50000?0:3000

return(
<main style={{background:"#f4f6f8",minHeight:"100vh",padding:40,fontFamily:"sans-serif"}}>
<div style={{maxWidth:500,margin:"auto",background:"#fff",padding:30,borderRadius:16,boxShadow:"0 8px 25px rgba(0,0,0,0.08)"}}>

<h1 style={{fontSize:28}}>배송비 계산기</h1>
<hr style={{margin:"20px 0"}}/>

<input placeholder="상품가격" type="number" onChange={e=>setPrice(Number(e.target.value))}
style={{width:"100%",padding:12,marginBottom:20,borderRadius:8,border:"1px solid #ccc"}}/>

<div style={{background:"#eef2ff",padding:15,borderRadius:10,fontSize:20}}>
배송비 : {shipping}원
</div>

</div>
</main>
)
}