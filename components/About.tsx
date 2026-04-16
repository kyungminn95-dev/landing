"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2014, suffix: "",  label: "Since" },
  { value: 200,  suffix: "+", label: "납품 트랙" },
  { value: 50,   suffix: "+", label: "브랜드" },
];

const TAGS = ["광고음악", "BGM", "로고송", "스트링 편곡", "동요", "믹싱 / 마스터링"];

function useCountUp(target: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function StatItem({ value, suffix, label, active, delay }: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) {
  const count = useCountUp(value, 1400, active);
  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="text-5xl sm:text-6xl md:text-7xl font-black leading-none" style={{ color: "var(--fg)" }}>
        {count}<span className="text-3xl md:text-4xl" style={{ color: "var(--fg-subtle)" }}>{suffix}</span>
      </p>
      <p className="text-sm mt-3 tracking-wide" style={{ color: "var(--fg-subtle)" }}>{label}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-4xl mx-auto px-6 py-28 text-center">

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 mb-16">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} active={active} delay={i * 120} />
          ))}
        </div>

        {/* Description */}
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-700"
          style={{
            color: "var(--fg-muted)",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "420ms",
          }}
        >
          CJ, 농림축산식품부 등 국내 주요 브랜드와 함께해온 10년.<br />
          브랜드의 음악을 설계합니다.
        </p>

        {/* Tags */}
        <div
          className="flex flex-wrap justify-center gap-2 transition-all duration-700"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "540ms",
          }}
        >
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm border"
              style={{ borderColor: "var(--border)", color: "var(--fg-subtle)" }}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
