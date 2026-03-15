"use client";

import { useEffect, useMemo, useState } from "react";

type HistoryItem = {
  id: string;
  createdAt: string;
  memo: string;
  buyPrice: number;
  sellPrice: number;
  shippingFee: number;
  platformFee: number;
  otherCost: number;
  totalCost: number;
  profit: number;
  marginRate: number;
};

type Sheet = {
  id: string;
  name: string;
  items: HistoryItem[];
};

type SortType = "latest" | "profitDesc" | "marginDesc";

const STORAGE_KEY = "profit-calculator-sheets-v1";
const ACTIVE_SHEET_KEY = "profit-calculator-active-sheet-v1";

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function sanitizeNumberInput(value: string) {
  return value.replace(/[^\d]/g, "");
}

function displayNumberInput(value: string) {
  if (!value) return "";
  const numeric = sanitizeNumberInput(value);
  if (!numeric) return "";
  return formatNumber(Number(numeric));
}

function parseInputNumber(value: string) {
  const numeric = sanitizeNumberInput(value);
  return numeric ? Number(numeric) : 0;
}

function createDefaultSheets(): Sheet[] {
  return [
    { id: crypto.randomUUID(), name: "일반", items: [] },
    { id: crypto.randomUUID(), name: "번개장터", items: [] },
    { id: crypto.randomUUID(), name: "테스트", items: [] },
  ];
}

export default function Page() {
  const [mounted, setMounted] = useState(false);

  const [memo, setMemo] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [otherCost, setOtherCost] = useState("");

  const [lastResult, setLastResult] = useState<HistoryItem | null>(null);

  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [activeSheetId, setActiveSheetId] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState<SortType>("latest");

  useEffect(() => {
    setMounted(true);

    try {
      const savedSheets = localStorage.getItem(STORAGE_KEY);
      const savedActiveSheet = localStorage.getItem(ACTIVE_SHEET_KEY);

      if (savedSheets) {
        const parsedSheets: Sheet[] = JSON.parse(savedSheets);
        setSheets(parsedSheets);

        if (
          savedActiveSheet &&
          parsedSheets.some((sheet) => sheet.id === savedActiveSheet)
        ) {
          setActiveSheetId(savedActiveSheet);
        } else if (parsedSheets.length > 0) {
          setActiveSheetId(parsedSheets[0].id);
        }
      } else {
        const defaults = createDefaultSheets();
        setSheets(defaults);
        setActiveSheetId(defaults[0].id);
      }
    } catch {
      const defaults = createDefaultSheets();
      setSheets(defaults);
      setActiveSheetId(defaults[0].id);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
  }, [sheets, mounted]);

  useEffect(() => {
    if (!mounted || !activeSheetId) return;
    localStorage.setItem(ACTIVE_SHEET_KEY, activeSheetId);
  }, [activeSheetId, mounted]);

  const activeSheet = useMemo(() => {
    return sheets.find((sheet) => sheet.id === activeSheetId) || null;
  }, [sheets, activeSheetId]);

  const filteredItems = useMemo(() => {
    if (!activeSheet) return [];

    let items = [...activeSheet.items];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      items = items.filter((item) =>
        item.memo.toLowerCase().includes(keyword)
      );
    }

    if (sortType === "latest") {
      items.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortType === "profitDesc") {
      items.sort((a, b) => b.profit - a.profit);
    } else if (sortType === "marginDesc") {
      items.sort((a, b) => b.marginRate - a.marginRate);
    }

    return items;
  }, [activeSheet, searchKeyword, sortType]);

  const stats = useMemo(() => {
    if (!activeSheet) {
      return {
        count: 0,
        totalProfit: 0,
        averageMargin: 0,
      };
    }

    const count = activeSheet.items.length;
    const totalProfit = activeSheet.items.reduce(
      (sum, item) => sum + item.profit,
      0
    );
    const averageMargin =
      count === 0
        ? 0
        : activeSheet.items.reduce((sum, item) => sum + item.marginRate, 0) /
          count;

    return {
      count,
      totalProfit,
      averageMargin,
    };
  }, [activeSheet]);

  function clearInputs() {
    setMemo("");
    setBuyPrice("");
    setSellPrice("");
    setShippingFee("");
    setPlatformFee("");
    setOtherCost("");
  }

  function calculateAndSave() {
    if (!activeSheet) return;

    const buy = parseInputNumber(buyPrice);
    const sell = parseInputNumber(sellPrice);
    const shipping = parseInputNumber(shippingFee);
    const fee = parseInputNumber(platformFee);
    const other = parseInputNumber(otherCost);

    const totalCost = buy + shipping + fee + other;
    const profit = sell - totalCost;
    const marginRate = buy > 0 ? (profit / buy) * 100 : 0;

    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      memo: memo.trim() || "메모 없음",
      buyPrice: buy,
      sellPrice: sell,
      shippingFee: shipping,
      platformFee: fee,
      otherCost: other,
      totalCost,
      profit,
      marginRate,
    };

    setLastResult(newItem);

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === activeSheetId
          ? { ...sheet, items: [newItem, ...sheet.items] }
          : sheet
      )
    );
  }

  function loadItemToForm(item: HistoryItem) {
    setMemo(item.memo);
    setBuyPrice(String(item.buyPrice));
    setSellPrice(String(item.sellPrice));
    setShippingFee(String(item.shippingFee));
    setPlatformFee(String(item.platformFee));
    setOtherCost(String(item.otherCost));
    setLastResult(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteItem(itemId: string) {
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === activeSheetId
          ? {
              ...sheet,
              items: sheet.items.filter((item) => item.id !== itemId),
            }
          : sheet
      )
    );
  }

  function clearActiveSheet() {
    if (!activeSheet) return;
    const ok = window.confirm(
      `"${activeSheet.name}" 시트의 기록을 전부 삭제할까요?`
    );
    if (!ok) return;

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === activeSheetId ? { ...sheet, items: [] } : sheet
      )
    );
  }

  function addSheet() {
    const name = window.prompt("새 시트 이름을 입력하세요.", `시트 ${sheets.length + 1}`);
    if (!name) return;

    const newSheet: Sheet = {
      id: crypto.randomUUID(),
      name: name.trim() || `시트 ${sheets.length + 1}`,
      items: [],
    };

    setSheets((prev) => [...prev, newSheet]);
    setActiveSheetId(newSheet.id);
  }

  function renameSheet(sheetId: string) {
    const target = sheets.find((sheet) => sheet.id === sheetId);
    if (!target) return;

    const nextName = window.prompt("시트 이름을 수정하세요.", target.name);
    if (!nextName) return;

    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === sheetId ? { ...sheet, name: nextName.trim() || sheet.name } : sheet
      )
    );
  }

  function deleteSheet(sheetId: string) {
    if (sheets.length <= 1) {
      alert("시트는 최소 1개는 있어야 합니다.");
      return;
    }

    const target = sheets.find((sheet) => sheet.id === sheetId);
    if (!target) return;

    const ok = window.confirm(`"${target.name}" 시트를 삭제할까요?`);
    if (!ok) return;

    const nextSheets = sheets.filter((sheet) => sheet.id !== sheetId);
    setSheets(nextSheets);

    if (activeSheetId === sheetId) {
      setActiveSheetId(nextSheets[0].id);
    }
  }

  function downloadCSV() {
    if (!activeSheet || activeSheet.items.length === 0) {
      alert("다운로드할 기록이 없습니다.");
      return;
    }

    const header = [
      "날짜",
      "메모",
      "구매가",
      "판매가",
      "택배비",
      "수수료",
      "기타비용",
      "총비용",
      "순이익",
      "수익률(%)",
    ];

    const rows = activeSheet.items.map((item) => [
      new Date(item.createdAt).toLocaleString("ko-KR"),
      item.memo,
      item.buyPrice,
      item.sellPrice,
      item.shippingFee,
      item.platformFee,
      item.otherCost,
      item.totalCost,
      item.profit,
      item.marginRate.toFixed(2),
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeSheet.name}-수익기록.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!mounted) {
    return <main className="page-wrap">불러오는 중...</main>;
  }

  return (
    <main className="page-wrap">
      <section className="hero-card">
        <h1 className="title">중고거래 수익 계산기</h1>
        <p className="subtitle">
          계산 결과를 시트별로 저장하고, 이전 기록을 표로 관리할 수 있어요.
        </p>
      </section>

      <section className="card">
        <h2 className="section-title">계산 입력</h2>

        <div className="form-grid">
          <label className="field">
            <span>상품명 / 메모</span>
            <input
              type="text"
              placeholder="예: 에어팟 프로, 나이키 후드집업"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </label>

          <label className="field">
            <span>구매가</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={displayNumberInput(buyPrice)}
              onChange={(e) =>
                setBuyPrice(sanitizeNumberInput(e.target.value))
              }
            />
          </label>

          <label className="field">
            <span>판매가</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={displayNumberInput(sellPrice)}
              onChange={(e) =>
                setSellPrice(sanitizeNumberInput(e.target.value))
              }
            />
          </label>

          <label className="field">
            <span>택배비</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={displayNumberInput(shippingFee)}
              onChange={(e) =>
                setShippingFee(sanitizeNumberInput(e.target.value))
              }
            />
          </label>

          <label className="field">
            <span>플랫폼 수수료</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={displayNumberInput(platformFee)}
              onChange={(e) =>
                setPlatformFee(sanitizeNumberInput(e.target.value))
              }
            />
          </label>

          <label className="field">
            <span>기타 비용</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={displayNumberInput(otherCost)}
              onChange={(e) =>
                setOtherCost(sanitizeNumberInput(e.target.value))
              }
            />
          </label>
        </div>

        <div className="button-row">
          <button className="primary-btn" onClick={calculateAndSave}>
            계산하고 저장하기
          </button>
          <button className="secondary-btn" onClick={clearInputs}>
            입력 초기화
          </button>
        </div>
      </section>

      <section className="card result-card">
        <h2 className="section-title">최근 계산 결과</h2>

        {lastResult ? (
          <div className="result-grid">
            <div className="result-box">
              <span>순이익</span>
              <strong className={lastResult.profit >= 0 ? "profit" : "loss"}>
                {formatNumber(lastResult.profit)}원
              </strong>
            </div>

            <div className="result-box">
              <span>수익률</span>
              <strong className={lastResult.marginRate >= 0 ? "profit" : "loss"}>
                {lastResult.marginRate.toFixed(2)}%
              </strong>
            </div>

            <div className="result-box">
              <span>총비용</span>
              <strong>{formatNumber(lastResult.totalCost)}원</strong>
            </div>

            <div className="result-box">
              <span>판매가</span>
              <strong>{formatNumber(lastResult.sellPrice)}원</strong>
            </div>
          </div>
        ) : (
          <p className="empty-text">아직 계산한 기록이 없습니다.</p>
        )}
      </section>

      <section className="card">
        <div className="sheet-top">
          <h2 className="section-title">시트 관리</h2>
          <button className="secondary-btn" onClick={addSheet}>
            + 새 시트
          </button>
        </div>

        <div className="sheet-tabs">
          {sheets.map((sheet) => (
            <div
              key={sheet.id}
              className={`sheet-tab ${sheet.id === activeSheetId ? "active" : ""}`}
            >
              <button
                className="sheet-name-btn"
                onClick={() => setActiveSheetId(sheet.id)}
              >
                {sheet.name}
              </button>

              <div className="sheet-actions">
                <button
                  className="mini-btn"
                  onClick={() => renameSheet(sheet.id)}
                  title="이름 변경"
                >
                  수정
                </button>
                <button
                  className="mini-btn danger"
                  onClick={() => deleteSheet(sheet.id)}
                  title="시트 삭제"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-grid">
          <div className="stats-box">
            <span>총 계산 수</span>
            <strong>{formatNumber(stats.count)}</strong>
          </div>
          <div className="stats-box">
            <span>총 예상 이익</span>
            <strong className={stats.totalProfit >= 0 ? "profit" : "loss"}>
              {formatNumber(stats.totalProfit)}원
            </strong>
          </div>
          <div className="stats-box">
            <span>평균 수익률</span>
            <strong className={stats.averageMargin >= 0 ? "profit" : "loss"}>
              {stats.averageMargin.toFixed(2)}%
            </strong>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="history-top">
          <h2 className="section-title">저장된 기록</h2>

          <div className="toolbar">
            <input
              className="search-input"
              type="text"
              placeholder="메모 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <select
              className="sort-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value as SortType)}
            >
              <option value="latest">최신순</option>
              <option value="profitDesc">수익 높은순</option>
              <option value="marginDesc">수익률 높은순</option>
            </select>

            <button className="secondary-btn" onClick={downloadCSV}>
              CSV 다운로드
            </button>

            <button className="danger-btn" onClick={clearActiveSheet}>
              현재 시트 전체삭제
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="empty-text">현재 시트에 저장된 기록이 없습니다.</p>
        ) : (
          <div className="table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>메모</th>
                  <th>구매가</th>
                  <th>판매가</th>
                  <th>총비용</th>
                  <th>순이익</th>
                  <th>수익률</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.createdAt).toLocaleString("ko-KR")}</td>
                    <td>{item.memo}</td>
                    <td>{formatNumber(item.buyPrice)}원</td>
                    <td>{formatNumber(item.sellPrice)}원</td>
                    <td>{formatNumber(item.totalCost)}원</td>
                    <td className={item.profit >= 0 ? "profit" : "loss"}>
                      {formatNumber(item.profit)}원
                    </td>
                    <td className={item.marginRate >= 0 ? "profit" : "loss"}>
                      {item.marginRate.toFixed(2)}%
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="mini-btn"
                          onClick={() => loadItemToForm(item)}
                        >
                          불러오기
                        </button>
                        <button
                          className="mini-btn danger"
                          onClick={() => deleteItem(item.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}