"use client";

import { useState } from "react";

export default function Page() {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [fee, setFee] = useState(0);
  const [feeType, setFeeType] = useState("won");
  const [shipping, setShipping] = useState(0);

  const feeValue = feeType === "percent" ? sell * (fee / 100) : fee;
  const profit = sell - buy - feeValue - shipping;
  const margin = sell ? ((profit / sell) * 100).toFixed(1) : "0.0";

  const copyResult = async () => {
    await navigator.clipboard.writeText(
      `순수익: ${Math.round(profit)}원 / 마진율: ${margin}%`
    );
    alert("결과가 복사되었습니다");
  };

  const shareResult = async () => {
    const data = {
      title: "중고거래 순수익 계산기",
      text: `순수익 ${Math.round(profit)}원 / 마진율 ${margin}%`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("공유 기능이 지원되지 않아 링크가 복사되었습니다");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black mb-8">
          중고거래 순수익 계산기
        </h1>

        <p className="text-slate-300 mb-10 text-lg leading-8">
          판매가, 매입가, 수수료, 배송비를 입력하면 실제 남는 순수익과 마진율을 계산할 수 있습니다.
        </p>

        <div className="grid gap-4 rounded-2xl bg-slate-900 border border-white/5 p-6">
          <input
            type="number"
            placeholder="매입가"
            className="p-3 rounded-xl bg-slate-800 outline-none"
            onChange={(e) => setBuy(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="판매가"
            className="p-3 rounded-xl bg-slate-800 outline-none"
            onChange={(e) => setSell(Number(e.target.value))}
          />

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="수수료"
              className="p-3 rounded-xl bg-slate-800 outline-none flex-1"
              onChange={(e) => setFee(Number(e.target.value))}
            />

            <select
              className="p-3 rounded-xl bg-slate-800 outline-none"
              onChange={(e) => setFeeType(e.target.value)}
              defaultValue="won"
            >
              <option value="won">원</option>
              <option value="percent">%</option>
            </select>
          </div>

          <input
            type="number"
            placeholder="배송비"
            className="p-3 rounded-xl bg-slate-800 outline-none"
            onChange={(e) => setShipping(Number(e.target.value))}
          />
        </div>

        <div className="mt-8 rounded-2xl bg-slate-900 border border-white/5 p-6">
          <p className="text-slate-400 mb-2">순수익</p>
          <p className="text-4xl font-black text-cyan-400">
            {Math.round(profit)}원
          </p>

          <p className="mt-4 text-lg">
            마진율: <b>{margin}%</b>
          </p>

          <div className="flex gap-3 mt-6">
            <button
              className="bg-slate-800 px-4 py-2 rounded-xl"
              onClick={copyResult}
            >
              결과 복사
            </button>

            <button
              className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold"
              onClick={shareResult}
            >
              공유
            </button>
          </div>
        </div>

        <section className="mt-14 text-slate-300 leading-8">
          <h2 className="text-2xl font-bold mb-4">계산 방법</h2>
          <p>
            순수익은 판매가에서 매입가, 수수료, 배송비를 모두 뺀 값입니다.
          </p>
          <p className="mt-2">
            수수료를 퍼센트로 선택하면 판매가 기준으로 자동 계산됩니다.
          </p>
        </section>
      </div>
    </main>
  );
}