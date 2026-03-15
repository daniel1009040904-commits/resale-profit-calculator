"use client";

import Link from "next/link";
import { Calculator, Truck, TrendingUp, Target, DollarSign } from "lucide-react";

const tools = [
  {
    title: "중고거래 순이익 계산기",
    desc: "판매가에서 수수료·택배비를 제외한 실제 남는 돈 계산",
    href: "/calculators/resale-profit",
    icon: DollarSign,
  },
  {
    title: "택배비 비교 계산기",
    desc: "우체국 / 편의점 / 반값택배 비용 비교",
    href: "/calculators/shipping",
    icon: Truck,
  },
  {
    title: "목표이익 판매가 계산기",
    desc: "원하는 이익을 기준으로 판매가 역산",
    href: "/calculators/target-profit",
    icon: Target,
  },
  {
    title: "마진율 계산기",
    desc: "판매가 대비 수익률 계산",
    href: "/calculators/margin-rate",
    icon: TrendingUp,
  },
  {
    title: "추천 판매가 계산기",
    desc: "원가와 목표 마진율로 추천 가격 계산",
    href: "/calculators/recommended-price",
    icon: Calculator,
  },
  {
    title: "ROI 계산기",
    desc: "투자 대비 수익률(Return On Investment) 계산",
    href: "/calculators/roi",
    icon: TrendingUp,
  },
  {
    title: "손익분기점 계산기",
    desc: "고정비 기준 몇 개 팔아야 이익이 나는지 계산",
    href: "/calculators/break-even",
    icon: DollarSign,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          중고거래
          <br />
          <span className="text-cyan-400">수익 계산 웹서비스</span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-xl text-lg">
          중고거래 할 때 헷갈리는 수익 계산을
          한 번에 정리해주는 계산 서비스.
          순이익, 마진율, 판매가까지 빠르게 확인할 수 있어.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/calculators/resale-profit"
            className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            계산 시작하기
          </Link>

          <a
            href="#tools"
            className="border border-white/20 px-6 py-3 rounded-xl"
          >
            계산기 보기
          </a>
        </div>
      </section>


      {/* TOOLS */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-black mb-10">계산기</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="p-6 rounded-2xl bg-slate-900 hover:bg-slate-800 transition border border-white/5"
              >
                <Icon className="mb-4 text-cyan-400" size={28} />

                <h3 className="text-xl font-bold mb-2">
                  {tool.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {tool.desc}
                </p>
              </Link>
            );
          })}
        </div>

      </section>


      {/* SIMPLE FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        Resell Profit Calculator
      </footer>

    </main>
  );
}

/* =============================
CALCULATOR PAGE 1
app/calculators/resale-profit/page.tsx
============================= */
"use client";
import { useState } from "react";

export default function ResaleProfitCalculator() {
  const [buy,setBuy]=useState(0);
  const [sell,setSell]=useState(0);
  const [fee,setFee]=useState(0);
  const [ship,setShip]=useState(0);

  const profit = sell - buy - fee - ship;
  const margin = sell ? ((profit/sell)*100).toFixed(1) : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-black mb-8">중고거래 순이익 계산기</h1>

      <div className="grid gap-4 max-w-xl">
        <input type="number" placeholder="매입가" className="p-3 rounded bg-slate-800" onChange={e=>setBuy(+e.target.value)}/>
        <input type="number" placeholder="판매가" className="p-3 rounded bg-slate-800" onChange={e=>setSell(+e.target.value)}/>
        <input type="number" placeholder="수수료" className="p-3 rounded bg-slate-800" onChange={e=>setFee(+e.target.value)}/>
        <input type="number" placeholder="택배비" className="p-3 rounded bg-slate-800" onChange={e=>setShip(+e.target.value)}/>
      </div>

      <div className="mt-10 text-2xl">
        순이익: <span className="font-bold">{profit}원</span>
        <br/>
        마진율: <span className="font-bold">{margin}%</span>
      </div>
    </main>
  );
}

/* =============================
CALCULATOR PAGE 2
app/calculators/shipping/page.tsx
============================= */
"use client";
import { useState } from "react";

export default function ShippingCompare() {
  const [weight,setWeight]=useState(0);

  const post=4000;
  const cvs=3500;
  const half=1800;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-black mb-8">택배비 비교 계산기</h1>

      <input
      type="number"
      placeholder="무게(kg)"
      className="p-3 rounded bg-slate-800"
      onChange={e=>setWeight(+e.target.value)}
      />

      <div className="mt-8 space-y-3 text-lg">
        <div>우체국 예상: {post + weight*500}원</div>
        <div>편의점택배: {cvs + weight*300}원</div>
        <div>반값택배: {half}원</div>
      </div>
    </main>
  );
}

/* =============================
CALCULATOR PAGE 3
app/calculators/target-profit/page.tsx
============================= */
"use client";
import { useState } from "react";

export default function TargetProfit(){

const [cost,setCost]=useState(0);
const [target,setTarget]=useState(0);

const price = cost + target;

return(
<main className="min-h-screen bg-slate-950 text-white p-10">
<h1 className="text-4xl font-black mb-8">목표이익 판매가 계산기</h1>

<input type="number" placeholder="매입가" className="p-3 rounded bg-slate-800" onChange={e=>setCost(+e.target.value)} />

<input type="number" placeholder="원하는 이익" className="p-3 rounded bg-slate-800 mt-3" onChange={e=>setTarget(+e.target.value)} />

<div className="mt-10 text-2xl">추천 판매가: <b>{price}원</b></div>
</main>
);
}

/* =============================
CALCULATOR PAGE 4
app/calculators/margin-rate/page.tsx
============================= */
"use client";
import { useState } from "react";

export default function MarginRate(){

const [buy,setBuy]=useState(0);
const [sell,setSell]=useState(0);

const profit=sell-buy;
const margin=sell?((profit/sell)*100).toFixed(1):0;

return(
<main className="min-h-screen bg-slate-950 text-white p-10">
<h1 className="text-4xl font-black mb-8">마진율 계산기</h1>

<input type="number" placeholder="매입가" className="p-3 rounded bg-slate-800" onChange={e=>setBuy(+e.target.value)} />
<input type="number" placeholder="판매가" className="p-3 rounded bg-slate-800 mt-3" onChange={e=>setSell(+e.target.value)} />

<div className="mt-10 text-2xl">
순이익: <b>{profit}원</b>
<br/>
마진율: <b>{margin}%</b>
</div>
</main>
);
}

/* =============================
CALCULATOR PAGE 5
app/calculators/recommended-price/page.tsx
============================= */
"use client";
import { useState } from "react";

export default function RecommendedPrice(){

const [cost,setCost]=useState(0);
const [margin,setMargin]=useState(30);

const price = cost/(1-margin/100);

return(
<main className="min-h-screen bg-slate-950 text-white p-10">
<h1 className="text-4xl font-black mb-8">추천 판매가 계산기</h1>

<input type="number" placeholder="원가" className="p-3 rounded bg-slate-800" onChange={e=>setCost(+e.target.value)} />

<input type="number" placeholder="목표 마진율 %" className="p-3 rounded bg-slate-800 mt-3" onChange={e=>setMargin(+e.target.value)} />

<div className="mt-10 text-2xl">
추천 판매가: <b>{Math.round(price)}원</b>
</div>
</main>
);
}

