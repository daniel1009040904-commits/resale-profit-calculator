"use client";
import { useState } from "react";

export default function ROI(){
const [invest,setInvest]=useState(0)
const [profit,setProfit]=useState(0)

const roi=(profit/invest*100)||0

return(
<main style={{background:"#f4f6f8",minHeight:"100vh",padding:40,fontFamily:"sans-serif"}}>
<div style={{maxWidth:500,margin:"auto",background:"#fff",padding:30,borderRadius:16,boxShadow:"0 8px 25px rgba(0,0,0,0.08)"}}>

<h1 style={{fontSize:28}}>수익률 계산기</h1>
<hr style={{margin:"20px 0"}}/>

<input placeholder="투자금" type="number" onChange={e=>setInvest(Number(e.target.value))}
style={{width:"100%",padding:12,marginBottom:10,borderRadius:8,border:"1px solid #ccc"}}/>

<input placeholder="수익" type="number" onChange={e=>setProfit(Number(e.target.value))}
style={{width:"100%",padding:12,marginBottom:20,borderRadius:8,border:"1px solid #ccc"}}/>

<div style={{background:"#eef2ff",padding:15,borderRadius:10,fontSize:20}}>
ROI : {roi.toFixed(2)}%
</div>

</div>
</main>
)
}