"use client";
import { useMemo, useState } from "react";

export default function Home() {
  const [buy, setBuy] = useState("");
  const [sell, setSell] = useState("");
  const [shipping, setShipping] = useState("");
  const [fee, setFee] = useState("");

  const buyNum = Number(buy) || 0;
  const sellNum = Number(sell) || 0;
  const shippingNum = Number(shipping) || 0;
  const feeNum = Number(fee) || 0;

  const totalCost = buyNum + shippingNum + feeNum;
  const profit = sellNum - totalCost;
  const rate = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  const breakEvenPrice = totalCost;

  const resultColor =
    profit > 0 ? "#16a34a" : profit < 0 ? "#dc2626" : "#111827";

  const formatted = useMemo(() => {
    const won = (num: number) => `${num.toLocaleString()}원`;
    return {
      totalCost: won(totalCost),
      profit: won(profit),
      breakEvenPrice: won(breakEvenPrice),
      rate: `${rate.toFixed(1)}%`,
    };
  }, [totalCost, profit, breakEvenPrice, rate]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "24px 16px",
        fontFamily: "sans-serif",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
          중고거래 수익 계산기
        </h1>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>
          당근, 번개장터, 중고나라 판매 전에 순수익을 바로 계산해보세요.
        </p>

        <InputBox
          label="구매가"
          value={buy}
          onChange={setBuy}
          placeholder="예: 30000"
        />

        <InputBox
          label="판매가"
          value={sell}
          onChange={setSell}
          placeholder="예: 50000"
        />

        <InputBox
          label="배송비"
          value={shipping}
          onChange={setShipping}
          placeholder="예: 3500"
        />

        <InputBox
          label="수수료 / 기타비용"
          value={fee}
          onChange={setFee}
          placeholder="예: 2000"
        />

        <div
          style={{
            marginTop: 28,
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <div style={{ marginBottom: 12, fontSize: 16 }}>
            총비용: <b>{formatted.totalCost}</b>
          </div>

          <div
            style={{
              marginBottom: 12,
              fontSize: 22,
              fontWeight: 800,
              color: resultColor,
            }}
          >
            순수익: {profit > 0 ? "+" : ""}
            {formatted.profit}
          </div>

          <div style={{ marginBottom: 12, fontSize: 16 }}>
            수익률: <b>{formatted.rate}</b>
          </div>

          <div style={{ fontSize: 16 }}>
            손익분기 판매가: <b>{formatted.breakEvenPrice}</b>
          </div>
        </div>
      </div>
    </main>
  );
}

function InputBox({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const MAX = 10000000;

  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        {label}
      </label>

      <input
        type="number"
        value={value}
        max={MAX}
        placeholder={placeholder}
        onChange={(e) => {
          const num = Number(e.target.value);
          if (num <= MAX) {
            onChange(e.target.value);
          }
        }}
        style={{
          width: "100%",
          padding: "14px 16px",
          fontSize: 16,
          borderRadius: 12,
          border: "1px solid #d1d5db",
          outline: "none",
        }}
      />
    </div>
  );
}