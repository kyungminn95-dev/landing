import { ImageResponse } from "next/og";

export const runtime = "edge";

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
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: square ? "80px" : "64px 80px",
          fontFamily,
        }}
      >
        {/* 로고 */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <svg width="48" height="48" viewBox="0 0 30 30" fill="none">
            <ellipse cx="17" cy="17" rx="11" ry="5" fill="#F5C842" transform="rotate(-45 17 17)" />
            <ellipse cx="13" cy="13" rx="11" ry="5" fill="white" transform="rotate(-45 13 13)" />
          </svg>
          <span style={{ color: "white", fontSize: "36px", fontWeight: 900, letterSpacing: "-1px" }}>
            muit
          </span>
        </div>

        {/* 메인 카피 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              background: "#F5C842",
              color: "#111",
              fontSize: square ? "28px" : "22px",
              fontWeight: 700,
              padding: "8px 24px",
              borderRadius: "100px",
              width: "fit-content",
            }}
          >
            10년 경력 브랜드 음악 전문
          </div>
          <div
            style={{
              color: "white",
              fontSize: square ? "86px" : "70px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            광고음악
            <br />
            제작 전문
          </div>
          <div style={{ color: "#ffffff88", fontSize: square ? "30px" : "24px", marginTop: "8px" }}>
            로고송 · BGM · 믹싱 · 마스터링
          </div>
        </div>

        {/* 하단 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <span style={{ color: "#ffffff44", fontSize: "22px" }}>muit.kr</span>
          <div
            style={{
              display: "flex",
              background: "white",
              color: "#111",
              fontSize: "22px",
              fontWeight: 700,
              padding: "14px 36px",
              borderRadius: "100px",
            }}
          >
            무료 상담 문의하기 →
          </div>
        </div>
      </div>
    ),
    { width, height, fonts }
  );
}
