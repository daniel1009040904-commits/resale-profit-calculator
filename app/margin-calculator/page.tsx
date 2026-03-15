export const metadata = {
title: "마진율 계산기",
description: "판매가와 매입가를 입력하면 마진율과 순이익을 계산할 수 있는 무료 계산기",
}

export default function Page(){

return(

<main className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-4xl font-black mb-6">
마진율 계산기
</h1>

<p className="text-slate-300 max-w-xl">

판매가와 매입가를 입력하면 마진율과 순이익을 계산할 수 있는 무료 계산기

이 계산기를 사용하면 판매가, 비용, 수수료 등을 고려하여
실제 수익과 마진을 쉽게 계산할 수 있습니다.

</p>

</main>

)
}
