"use client";

import { useState, useEffect } from "react";

const WORDS = [
  { text: "브랜드",  gradient: "linear-gradient(135deg, #6366f1, #ec4899)" },
  { text: "콘텐츠",  gradient: "linear-gradient(135deg, #06b6d4, #67e8f9)" },
  { text: "아티스트", gradient: "linear-gradient(135deg, #f59e0b, #fde047)" },
];
const FLIP_DURATION = 400; // ms
const INTERVAL = 2400; // ms

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % WORDS.length;
      });
      setTimeout(() => setPrev(null), FLIP_DURATION);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center overflow-hidden pt-48 pb-72 md:pt-64 md:pb-64">
      {/* 노이즈 텍스처 배경 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* 하단 페이드 */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center flex flex-col items-center">
        <div
          className="fade-up inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border text-xs tracking-wider uppercase"
          style={{ borderColor: "var(--border)", color: "var(--fg-subtle)", background: "var(--card-bg)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          프로젝트 진행 중
        </div>

        <h1
          className="fade-up delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-5"
          style={{ color: "var(--fg)" }}
        >
          <span
            style={{
              display: "inline-block",
              position: "relative",
              perspective: "500px",
              verticalAlign: "top",
            }}
          >
            {/* 너비 고정용 invisible placeholder (가장 긴 단어) */}
            <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>아티스트</span>

            {/* 나가는 단어 */}
            {prev !== null && (
              <span
                key={`out-${prev}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  background: WORDS[prev].gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: `flipOut ${FLIP_DURATION}ms ease-in forwards`,
                  transformOrigin: "50% 50%",
                }}
              >
                {WORDS[prev].text}
              </span>
            )}
            {/* 들어오는 단어 */}
            <span
              key={`in-${current}`}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
                background: WORDS[current].gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: prev !== null ? `flipIn ${FLIP_DURATION}ms ease-out forwards` : undefined,
                transformOrigin: "50% 50%",
              }}
            >
              {WORDS[current].text}
            </span>
          </span>
          의 음악을
          <br />
          설계합니다
        </h1>

        <p
          className="fade-up delay-2 text-lg md:text-xl font-light max-w-lg leading-relaxed mb-8"
          style={{ color: "var(--fg-muted)" }}
        >
          기업의 브랜딩부터 아티스트의 감성까지,
          <br />
          소리의 가치를 완성합니다.
        </p>

        <div className="fade-up delay-3 flex flex-wrap justify-center gap-3">
          <a
            href="/services/brand"
            className="w-64 text-center px-10 py-4 text-base font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            브랜드 사운드 →
          </a>
          <a
            href="/services/artist"
            className="w-64 text-center px-10 py-4 border text-base rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95"
            style={{ borderColor: "#000", color: "#000", borderWidth: "2px" }}
          >
            아티스트 서비스 →
          </a>
        </div>
      </div>
    </section>
  );
}
