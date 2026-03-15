"use client";

import { useEffect, useState } from "react";

function formatNumber(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function Page() {

  const [memo,setMemo]=useState("")
  const [buy,setBuy]=useState("")
  const [sell,setSell]=useState("")
  const [shipping,setShipping]=useState("")
  const [platform,setPlatform]=useState("")
  const [etc,setEtc]=useState("")

  const [feeMode,setFeeMode]=useState<"percent"|"won">("percent")

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

    const buyPrice=Number(buy||0)
    const sellPrice=Number(sell||0)
    const shippingFee=Number(shipping||0)
    const etcCost=Number(etc||0)

    let fee=Number(platform||0)

    if(feeMode==="percent"){
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
      shippingFee,
      etcCost,
      fee,
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

        <input placeholder="메모" value={memo} onChange={e=>setMemo(e.target.value)}/>

        <input placeholder="구매가" value={buy} onChange={e=>setBuy(e.target.value)}/>

        <input placeholder="판매가" value={sell} onChange={e=>setSell(e.target.value)}/>

        <input placeholder="택배비" value={shipping} onChange={e=>setShipping(e.target.value)}/>

        <div>

          <button onClick={()=>setFeeMode("percent")}>%</button>

          <button onClick={()=>setFeeMode("won")}>원</button>

        </div>

        <input placeholder="플랫폼 수수료" value={platform} onChange={e=>setPlatform(e.target.value)}/>

        <input placeholder="기타 비용" value={etc} onChange={e=>setEtc(e.target.value)}/>

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
                <td>{formatNumber(item.buyPrice)}</td>
                <td>{formatNumber(item.sellPrice)}</td>
                <td>{formatNumber(item.totalCost)}</td>
                <td>{formatNumber(item.profit)}</td>
                <td>{item.margin.toFixed(2)}%</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>

  )

}