"use client";

import { useEffect, useRef, useState } from "react";
import BorderGlow from "./BorderGlow";

type Testimonial = { quote: string; name: string; logo?: string };

const testimonials: Testimonial[] = [
  {
    quote: "영상과 노래가 잘 어울린다는 반응이 많습니다. 아주 좋습니다!",
    name: "최OO PD",
  },
  {
    quote: "편곡 잘 해주신 덕분에 노래가 더 좋아졌어요. 같이 작업할 수 있어서 굉장히 영광입니다.",
    name: "아티스트 순O",
  },
  {
    quote: "피아노와 스트링을 이렇게 예쁘게 해주셔서 나머지 악기들도 예쁘게 쌓을 수 있었습니다. 진심으로 감사드립니다!",
    name: "아티스트 조OO",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ borderColor: "var(--border)" }} className="border-b border-t-0">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs tracking-widest uppercase mb-12 text-center" style={{ color: "var(--fg-subtle)" }}>Review</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <BorderGlow
                backgroundColor="#ffffff"
                colors={["#a5b4fc", "#f9a8d4", "#7dd3fc"]}
                glowColor="220 80 80"
                borderRadius={16}
                glowRadius={32}
                glowIntensity={0.8}
                className="h-full"
              >
                <div className="p-7 flex flex-col justify-between h-full">
                  {/* 별점 */}
                  <div>
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, s) => (
                        <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#facc15">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg)" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* 프로필 */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--border)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" fill="var(--fg-subtle)" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{t.name}</p>
                      {t.logo && (
                        <div className="mt-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t.logo} alt={t.name} className="h-5 w-auto object-contain opacity-80" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
