"use client";

import Link from "next/link";
import { DollarSign } from "lucide-react";

const calculators = [
  {
    title: "중고거래 순수익 계산기",
    desc: "판매가에서 매입가, 수수료, 배송비를 제외한 실제 남는 돈 계산",
    href: "/calculators/resale-profit",
    icon: DollarSign,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          중고거래
          <br />
          <span className="text-cyan-400">수익 계산 서비스</span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-xl text-lg">
          중고거래 판매 시 실제 남는 수익을 계산할 수 있는 무료 계산기입니다.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/calculators/resale-profit"
            className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            계산 시작하기
          </Link>
        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-black mb-10">
          계산기
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {calculators.map((tool) => {
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

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        Resell Profit Calculator
      </footer>

    </main>
  );
}