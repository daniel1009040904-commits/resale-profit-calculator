"use client";

import { useState } from "react";

export default function ResaleCalculator() {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [fee, setFee] = useState(0);

  const profit = sell - buy - fee;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          padding: 30,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>
          중고거래 수익 계산기
        </h1>

        <hr style={{ marginBottom: 20 }} />

        <div style={{ marginBottom: 15 }}>
          <label>구매 가격</label>
          <input
            type="number"
            value={buy}
            onChange={(e) => setBuy(Number(e.target.value))}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 5,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>판매 가격</label>
          <input
            type="number"
            value={sell}
            onChange={(e) => setSell(Number(e.target.value))}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 5,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>수수료</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 5,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div
          style={{
            padding: 15,
            borderRadius: 10,
            background: "#f1f5f9",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          예상 수익: {profit} 원
        </div>
      </div>
    </main>
  );
}