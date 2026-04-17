import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "뮤잇 — 브랜드의 음악을 설계합니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        {/* 로고 */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <svg width="60" height="60" viewBox="0 0 30 30" fill="none">
            <ellipse cx="17" cy="17" rx="11" ry="5" fill="#F5C842" transform="rotate(-45 17 17)" />
            <ellipse cx="13" cy="13" rx="11" ry="5" fill="#ffffff" transform="rotate(-45 13 13)" />
          </svg>
          <span style={{ fontSize: "52px", fontWeight: 900, color: "#ffffff", letterSpacing: "-2px" }}>
            muit
          </span>
        </div>

        {/* 태그라인 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#ffffff" }}>
            브랜드의 음악을 설계합니다
          </span>
          <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>
            광고음악 · 로고송 · BGM · 믹싱 · 마스터링
          </span>
        </div>

        {/* 하단 강조선 */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "6px",
            background: "#F5C842",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
