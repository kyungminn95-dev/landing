"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SERVICES = [
  {
    number: "01",
    label: "광고음악 · 로고송 · CM송",
    badge: "AI 도입",
    heading: "더 빠르게,\n더 합리적으로",
    body: "AI를 작업 도구로 활용해 데모 납기와 비용을 대폭 줄였습니다. 광고음악, 로고송, CM송 — 브랜드가 원하는 사운드를 레퍼런스 하나로 빠르게 구현합니다.",
    features: ["24시간 내 데모 제공", "기존 대비 합리적인 단가", "상업용 라이선스 전량 이전"],
    image: "floating",
  },
  {
    number: "02",
    label: "작곡 · 편곡",
    badge: null,
    heading: "아티스트의 음악을\n함께 만듭니다",
    body: "가요, 발라드, 팝, 어쿠스틱까지. 아티스트의 색깔을 살린 작편곡과 스트링 편곡을 제공합니다. 단순한 반주를 넘어 곡의 감정을 설계합니다.",
    features: ["가요 · 발라드 · 팝 작편곡", "스트링 편곡 전문", "녹음실 · 보컬 디렉팅 연계 가능"],
    image: "albums",
  },
  {
    number: "03",
    label: "믹싱 · 마스터링",
    badge: null,
    heading: "어떤 플랫폼에서도\n최적의 사운드",
    body: "TV, 유튜브, 스트리밍 플랫폼별 라우드니스 규격에 맞는 믹싱·마스터링으로 어떤 환경에서도 의도한 사운드를 전달합니다.",
    features: ["LUFS 맞춤 마스터링", "최고급 스튜디오 장비 사용", "스템 납품 가능"],
    image: "daw",
  },
];


const SLIDES = [
  { src: "/thumbnails/slide-1.jpg", alt: "CJ 온스타일 — 가비" },
  { src: "/thumbnails/slide-2.jpg", alt: "CJ 온스타일 — 버스터즈" },
  { src: "/thumbnails/slide-3.jpg", alt: "포천시 고향사랑기부제" },
];

const ALBUM_SLIDES = [
  { src: "/thumbnails/album-1.png", alt: "하루의 정원" },
  { src: "/thumbnails/album-2.png", alt: "Van Gogh - Dept" },
  { src: "/thumbnails/album-3.png", alt: "조은세 - headphones" },
  { src: "/thumbnails/album-4.png", alt: "SouLott" },
  { src: "/thumbnails/album-5.png", alt: "브로앤마블 OST" },
  { src: "/thumbnails/album-6.png", alt: "Ha Min Woo 행복하자" },
];

function Slideshow({ slides }: { slides: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="rounded-2xl aspect-video relative overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
        </div>
      ))}
      {/* 도트 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{ background: i === current ? "#fff" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}

function AlbumSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % ALBUM_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl aspect-video relative overflow-hidden" style={{ background: "var(--card-bg)" }}>
      {ALBUM_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {/* 블러 배경 */}
          <Image src={slide.src} alt="" fill className="object-cover scale-110" style={{ filter: "blur(24px)", opacity: 0.6 }} />
          {/* 앨범 커버 */}
          <Image src={slide.src} alt={slide.alt} width={280} height={280} className="relative rounded-xl z-10" style={{ objectFit: "contain" }} />
        </div>
      ))}
      {/* 도트 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {ALBUM_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{ background: i === current ? "var(--fg)" : "var(--border)" }}
          />
        ))}
      </div>
    </div>
  );
}

function PlaceholderImage() {
  return (
    <div
      className="rounded-2xl aspect-video flex flex-col items-center justify-center gap-2"
      style={{ background: "var(--card-bg)", color: "var(--fg-subtle)" }}
    >
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
      <p className="text-xs">이미지 교체 예정</p>
    </div>
  );
}

export default function ServiceTabs() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-28">
      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--fg-subtle)" }}>Services</p>
      <h2 className="text-4xl md:text-5xl font-black mb-24 leading-tight" style={{ color: "var(--fg)" }}>
        어떤 음악이 필요하세요?
      </h2>

      <div className="flex flex-col gap-32">
        {SERVICES.map((s, i) => (
          <div
            key={s.number}
            className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono tracking-widest" style={{ color: "var(--fg-subtle)" }}>{s.number}</span>
                {s.badge && (
                  <span
                    className="px-2.5 py-0.5 rounded-full border text-xs"
                    style={{ borderColor: "var(--border)", color: "var(--fg-subtle)", background: "var(--card-bg)" }}
                  >
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="inline-block text-sm font-bold mb-4 px-3 py-1 rounded-full" style={{ background: "#F5C842", color: "#111" }}>{s.label}</p>
              <h3 className="text-3xl md:text-4xl font-black mb-6 leading-snug whitespace-pre-line" style={{ color: "var(--fg)" }}>
                {s.heading}
              </h3>
              <p className="leading-relaxed mb-8 text-base" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
              <ul className="space-y-3 text-sm" style={{ color: "var(--fg-subtle)" }}>
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span style={{ color: "var(--fg-muted)" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {s.image === "floating" ? <Slideshow slides={SLIDES} /> : s.image === "albums" ? <AlbumSlideshow /> : s.image === "daw" ? (
              <div className="rounded-2xl aspect-video relative overflow-hidden">
                <Image src="/thumbnails/daw.png" alt="DAW 작업 화면" fill className="object-cover" />
              </div>
            ) : <PlaceholderImage />}
          </div>
        ))}
      </div>
    </section>
  );
}
