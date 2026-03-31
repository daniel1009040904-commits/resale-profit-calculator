"use client"

import { useState, useEffect } from "react"

// ------------------ 유틸 ------------------

function addComma(value: string) {
  const cleaned = value.replace(/,/g, "")
  if (cleaned === "") return ""
  if (isNaN(Number(cleaned))) return value
  return Number(cleaned).toLocaleString("ko-KR")
}

function removeComma(v: string) {
  return v.replace(/,/g, "")
}

function isNumber(v: string) {
  return !isNaN(Number(removeComma(v)))
}

function format(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n)
}

function calculateDays(start: string, end: string) {
  if (!start || !end) return ""
  const s = new Date(start)
  const e = new Date(end)
  const diff = e.getTime() - s.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return ""
  return days + "일"
}

// ------------------ 메인 ------------------

export default function Page() {
  const [memo, setMemo] = useState("")

  const [buyDate, setBuyDate] = useState("")
  const [sellDate, setSellDate] = useState("")

  const [buy, setBuy] = useState("")
  const [sell, setSell] = useState("")
  const [shipping, setShipping] = useState("")
  const [etc, setEtc] = useState("")
  const [platform, setPlatform] = useState("")

  const [feeType, setFeeType] = useState("percent")
  const [live, setLive] = useState(true)

  const [history, setHistory] = useState<any[]>([])
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("profit-history")
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("profit-history", JSON.stringify(history))
  }, [history])

  function calculateCore() {
    if (
      !isNumber(buy) ||
      !isNumber(sell) ||
      !isNumber(shipping) ||
      !isNumber(etc) ||
      !isNumber(platform)
    ) {
      return null
    }

    const buyPrice = Number(removeComma(buy))
    const sellPrice = Number(removeComma(sell))
    const shippingFee = Number(removeComma(shipping))
    const etcCost = Number(removeComma(etc))

    let fee = Number(removeComma(platform))
    if (feeType === "percent") {
      fee = Math.floor((sellPrice * fee) / 100)
    }

    const totalCost = buyPrice + shippingFee + etcCost + fee
    const profit = sellPrice - totalCost
    const margin = buyPrice > 0 ? (profit / buyPrice) * 100 : 0

    return { buyPrice, sellPrice, totalCost, profit, margin }
  }

  useEffect(() => {
    if (!live) return
    const r = calculateCore()
    setResult(r)
  }, [buy, sell, shipping, etc, platform, feeType, live])

  function calculate() {
    const r = calculateCore()
    if (!r) {
      alert("숫자가 아닌 값이 포함되었습니다")
      return
    }

    const item = {
      id: Date.now(),
      memo,
      buyDate,
      sellDate,
      days: calculateDays(buyDate, sellDate),
      ...r,
    }

    setHistory([item, ...history])
    setResult(r)
  }

  function downloadExcel() {
    const header = [
      "메모",
      "구매날짜",
      "판매날짜",
      "보유기간",
      "구매가",
      "판매가",
      "총비용",
      "순이익",
      "수익률",
    ]

    const rows = history.map((h) => [
      h.memo,
      h.buyDate,
      h.sellDate,
      h.days,
      h.buyPrice,
      h.sellPrice,
      h.totalCost,
      h.profit,
      h.margin.toFixed(2),
    ])

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n")

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "수익기록.csv"
    a.click()
  }

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      
      {/* ✅ SEO용 설명 */}
      <h1>중고거래 수익 계산기</h1>

      <p>
        이 계산기는 중고거래 및 리셀 거래에서 실제 순이익을 계산할 수 있는 도구입니다.
        구매가, 판매가, 배송비, 플랫폼 수수료, 기타 비용을 입력하면 실제 남는 금액과 수익률을 확인할 수 있습니다.
      </p>

      <p>
        단순 가격 차이가 아니라 모든 비용을 포함한 순이익을 계산하는 것이 중요합니다.
        특히 전자기기나 한정판 상품 거래에서는 정확한 계산이 필수입니다.
      </p>

      {/* 계산기 */}
      <div className="card">

        <label>
          <input
            type="checkbox"
            checked={live}
            onChange={() => setLive(!live)}
          />
          실시간 계산
        </label>

        <input placeholder="상품 메모" value={memo} onChange={e => setMemo(e.target.value)} />

        <label>구매 날짜</label>
        <input type="date" value={buyDate} onChange={e => setBuyDate(e.target.value)} />

        <label>판매 날짜</label>
        <input type="date" value={sellDate} onChange={e => setSellDate(e.target.value)} />

        <p>보유기간 : {calculateDays(buyDate, sellDate)}</p>

        <input placeholder="구매가" value={buy} onChange={e => setBuy(addComma(e.target.value))} />
        <input placeholder="판매가" value={sell} onChange={e => setSell(addComma(e.target.value))} />
        <input placeholder="택배비" value={shipping} onChange={e => setShipping(addComma(e.target.value))} />

        <select value={feeType} onChange={e => setFeeType(e.target.value)}>
          <option value="percent">수수료 %</option>
          <option value="won">수수료 원</option>
        </select>

        <input placeholder="플랫폼 수수료" value={platform} onChange={e => setPlatform(addComma(e.target.value))} />
        <input placeholder="기타 비용" value={etc} onChange={e => setEtc(addComma(e.target.value))} />

        <button onClick={calculate}>계산하고 저장</button>
      </div>

      {/* 결과 */}
      {result && (
        <div className="card">
          <p>순이익 : {format(result.profit)} 원</p>
          <p>수익률 : {result.margin.toFixed(2)} %</p>
          <p>총비용 : {format(result.totalCost)} 원</p>
        </div>
      )}

      {/* 다운로드 */}
      <div className="card">
        <button onClick={downloadExcel}>엑셀 다운로드</button>
      </div>

      {/* ✅ 추가 콘텐츠 (애드센스 핵심) */}
      <div className="card">
        <h2>이 계산기로 알 수 있는 것</h2>
        <p>
          거래 1건당 순이익과 수익률을 빠르게 확인할 수 있으며,
          보유기간을 통해 회전율 분석도 가능합니다.
        </p>

        <h2>수익 계산 방법</h2>
        <p>
          순이익은 판매가에서 구매가, 배송비, 플랫폼 수수료,
          기타 비용을 제외하여 계산됩니다.
        </p>
      </div>

      {/* 내부 링크 */}
      <div className="card">
        <h2>관련 정보</h2>
        <ul>
          <li><a href="/guide">중고거래 수익 내는 방법</a></li>
          <li><a href="/pricing">가격 구조 이해하기</a></li>
          <li><a href="/one-side">한쪽 거래 이유</a></li>
        </ul>
      </div>

    </main>
  )
}
