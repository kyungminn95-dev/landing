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
          광고음악 · 로고송 · BGM · Mix/Mastering
          <br />
          올인원 스튜디오
        </p>

        <div className="fade-up delay-3 flex flex-wrap justify-center gap-3">
          <a
            href="/services"
            className="px-6 py-3 text-sm font-semibold rounded-full transition-colors"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            서비스 보기
          </a>
          <a
            href="/portfolio"
            className="px-6 py-3 border text-sm rounded-full transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
          >
            포트폴리오 듣기
          </a>
        </div>
      </div>
    </section>
  );
}
