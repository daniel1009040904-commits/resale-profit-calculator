import Link from "next/link";

export default function Home() {
  return (
    <main style={{padding:40,fontFamily:"sans-serif"}}>
      <h1>온라인 계산기</h1>

      <ul style={{lineHeight:"2"}}>
        <li><Link href="/resale">중고거래 수익 계산기</Link></li>
        <li><Link href="/breakeven">손익분기 계산기</Link></li>
        <li><Link href="/margin">마진 계산기</Link></li>
        <li><Link href="/roi">수익률 계산기</Link></li>
        <li><Link href="/shipping">배송비 계산기</Link></li>
      </ul>

    </main>
  );
}