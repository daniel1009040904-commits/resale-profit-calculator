import Link from "next/link";

const calculators = [
  { title: "수익 계산기", href: "/resale", desc: "순수익 계산" },
  { title: "손익분기 계산기", href: "/breakeven", desc: "목표 수익 판매가 계산" },
  { title: "마진 계산기", href: "/margin", desc: "마진율 계산" },
  { title: "수익률 계산기", href: "/roi", desc: "수익률 계산" },
  { title: "배송비 계산기", href: "/shipping", desc: "배송비 계산" },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            fontWeight: 800,
          }}
        >
          온라인 계산기
        </h1>

        <p
          style={{
            fontSize: "30px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          필요한 계산기를 골라서 바로 사용하세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {calculators.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                color: "#111",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                display: "block",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}