import { ImageResponse } from "next/og";

export const runtime = "edge";

const CLIENTS = [
  "CJ ENM", "CJ OnStyle", "TVING", "iHQ",
  "농림축산식품부", "하남시", "안성시", "포천시", "보령시",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const square = searchParams.get("square") === "1";
  const width = 1200;
  const height = square ? 1200 : 628;

  let fonts: { name: string; data: ArrayBuffer; weight: number }[] = [];
  try {
    const fontData = await fetch(
      "https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.woff2"
    ).then((r) => r.arrayBuffer());
    fonts = [{ name: "NotoKR", data: fontData, weight: 700 }];
  } catch {}

  const fontFamily = fonts.length ? "NotoKR" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          background: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: square ? "80px" : "60px 80px",
          fontFamily,
          gap: square ? "52px" : "36px",
        }}
      >
        {/* 로고 */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg width="44" height="44" viewBox="0 0 30 30" fill="none">
            <ellipse cx="17" cy="17" rx="11" ry="5" fill="#F5C842" transform="rotate(-45 17 17)" />
            <ellipse cx="13" cy="13" rx="11" ry="5" fill="#111" transform="rotate(-45 13 13)" />
          </svg>
          <span style={{ color: "#111", fontSize: "34px", fontWeight: 900, letterSpacing: "-1px" }}>
            muit
          </span>
        </div>

        {/* 헤드라인 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <div style={{ color: "#111", fontSize: square ? "62px" : "50px", fontWeight: 900, letterSpacing: "-1.5px" }}>
            함께한 클라이언트
          </div>
          <div style={{ color: "#888", fontSize: square ? "26px" : "21px" }}>
            10년간 주요 브랜드와 함께해온 음악 제작 파트너
          </div>
        </div>

        {/* 클라이언트 뱃지 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            maxWidth: "900px",
          }}
        >
          {CLIENTS.map((name) => (
            <div
              key={name}
              style={{
                background: "white",
                border: "1.5px solid #e0e0e0",
                borderRadius: "100px",
                padding: "12px 28px",
                fontSize: square ? "26px" : "21px",
                fontWeight: 700,
                color: "#333",
                display: "flex",
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* 서비스 */}
        <div style={{ color: "#aaa", fontSize: square ? "22px" : "19px", display: "flex" }}>
          광고음악 · 로고송 · BGM · 믹싱 · 마스터링 · 편곡
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            background: "#111",
            color: "white",
            fontSize: "20px",
            fontWeight: 700,
            padding: "14px 36px",
            borderRadius: "100px",
          }}
        >
          muit.kr
        </div>
      </div>
    ),
    { width, height, fonts }
  );
}
