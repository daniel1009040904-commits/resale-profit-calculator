"use client";

import Link from "next/link";
import { Calculator, TrendingUp, Target, DollarSign, Percent } from "lucide-react";

const calculators = [
  {
    title: "중고거래 순수익 계산기",
    desc: "판매가에서 수수료와 배송비를 제외한 실제 남는 돈 계산",
    href: "/calculators/resale-profit",
    icon: DollarSign,
  },
  {
    title: "목표이익 판매가 계산기",
    desc: "원하는 이익 기준으로 판매가 계산",
    href: "/calculators/target-profit",
    icon: Target,
  },
  {
    title: "마진율 계산기",
    desc: "판매가 대비 수익률 계산",
    href: "/calculators/margin-rate",
    icon: Percent,
  },
  {
    title: "추천 판매가 계산기",
    desc: "원가와 목표 마진율로 판매가 계산",
    href: "/calculators/recommended-price",
    icon: Calculator,
  },
  {
    title: "ROI 계산기",
    desc: "투자 대비 수익률 계산",
    href: "/calculators/roi",
    icon: TrendingUp,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          중고거래
          <br/>
          <span className="text-cyan-400">수익 계산 서비스</span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-xl text-lg">
          중고거래와 재판매에 필요한 계산기를
          한 곳에 모은 웹 서비스
        </p>

        <Link
          href="/calculators/resale-profit"
          className="inline-block mt-8 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
        >
          계산 시작하기
        </Link>

      </section>


      {/* CALCULATORS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-black mb-10">
          계산기 목록
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {calculators.map((tool)=>{

            const Icon = tool.icon

            return(

              <Link
                key={tool.title}
                href={tool.href}
                className="p-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/5"
              >

                <Icon className="text-cyan-400 mb-4" size={28}/>

                <h3 className="text-xl font-bold mb-2">
                  {tool.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {tool.desc}
                </p>

              </Link>

            )

          })}

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        Resell Profit Calculator
      </footer>

    </main>
  );
}