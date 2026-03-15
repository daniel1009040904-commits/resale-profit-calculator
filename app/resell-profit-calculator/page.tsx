export const metadata = {
title: "중고거래 순수익 계산기 | Resell Profit Calculator",
description: "중고거래 판매가, 매입가, 수수료, 배송비를 입력하면 순수익과 마진율을 계산해주는 무료 계산기",
}

export default function Page(){

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-6">
중고거래 순수익 계산기
</h1>

<p className="text-slate-300 max-w-xl">

중고거래에서 실제로 남는 돈을 계산하려면
판매가에서 매입가, 수수료, 배송비를 모두 빼야 합니다.

이 계산기를 사용하면
중고거래 순수익과 마진율을 쉽게 계산할 수 있습니다.

</p>

</main>

)
}
