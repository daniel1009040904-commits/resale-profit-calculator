export const metadata = {
title: "중고 판매 가격 계산기",
description: "목표 이익을 기준으로 중고 판매 가격을 계산하는 무료 계산기",
}

export default function Page(){

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-6">
중고 판매 가격 계산기
</h1>

<p className="text-slate-300 max-w-xl">

목표 이익을 기준으로 중고 판매 가격을 계산하는 무료 계산기

이 계산기를 사용하면 판매가, 비용, 수수료 등을 고려하여
실제 수익과 마진을 쉽게 계산할 수 있습니다.

</p>

</main>

)
}
