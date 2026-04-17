"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SERVICES = [
  {
    number: "01",
    label: "광고음악 · 로고송 · CM송",
    tags: ["광고음악", "로고송", "CM송", "BGM", "징글"],
    badge: null,
    heading: "더 빠르게,\n더 합리적으로",
    body: "광고음악, 로고송, CM송 — 브랜드가 전달하고자 하는 메시지를 사운드로 구현합니다.\nCJ, 농림축산식품부 등 국내 주요 브랜드와 10년간 함께한 경험을 바탕으로, 레퍼런스 하나로 빠르고 정확하게 작업합니다.",
    features: ["상담부터 납품까지 원스톱 진행", "만족할 때까지 수정 보장", "저작권 걱정 없는 완전 양도"],
    image: "floating",
  },
  {
    number: "02",
    label: "작곡 · 편곡",
    tags: null,
    badge: null,
    heading: "아티스트의 음악을\n함께 만듭니다",
    body: "가요, 발라드, 팝, 어쿠스틱까지. 아티스트의 색깔을 살린 작편곡과 스트링 편곡을 제공합니다.\n단순한 반주를 넘어 곡의 감정을 설계합니다.",
    features: ["가요 · 발라드 · 팝 작편곡", "스트링 편곡 전문", "녹음실 · 보컬 디렉팅 연계 가능"],
    image: "albums",
  },
  {
    number: "03",
    label: "믹싱 · 마스터링",
    tags: null,
    badge: null,
    heading: "아티스트의 사운드를\n완성합니다",
    body: "곡의 감정을 살리는 믹싱, 어떤 플랫폼에서 들어도 흔들리지 않는 마스터링.\n음악의 완성은 사운드에 있습니다.",
    features: ["LUFS 맞춤 마스터링", "최고급 스튜디오 장비 보유", "스템 납품 가능"],
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
    }, 2000);
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
    }, 2000);
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
          <Image src={slide.src} alt={slide.alt} width={480} height={480} className="relative rounded-xl z-10" style={{ objectFit: "contain" }} />
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

export default function ServiceTabs({ filter }: { filter?: "brand" | "artist" }) {
  const filtered = filter === "brand"
    ? SERVICES.filter((s) => s.number === "01")
    : filter === "artist"
    ? SERVICES.filter((s) => s.number === "02" || s.number === "03")
    : SERVICES;

  return (
    <section id="services" className={`max-w-6xl mx-auto px-6 py-28 ${!!filter ? "text-center" : ""}`}>
      {!filter && (
        <>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--fg-subtle)" }}>Services</p>
          <h2 className="text-4xl md:text-5xl font-black mb-24 leading-tight whitespace-pre-line" style={{ color: "var(--fg)" }}>
            어떤 음악이 필요하세요?
          </h2>
        </>
      )}
      {filter === "brand" && (
        <>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--fg-subtle)" }}>Services</p>
          <h2 className="text-4xl md:text-5xl font-black mb-24 leading-tight whitespace-pre-line" style={{ color: "var(--fg)" }}>
            브랜드의 첫인상은{"\n"}
            <span style={{ background: "linear-gradient(transparent 65%, #F5C842 65%)" }}>
              음악으로 완성됩니다.
            </span>
          </h2>
        </>
      )}

      <div className="flex flex-col gap-32">
        {filtered.map((s, i) => {
          const displayNum = String(i + 1).padStart(2, "0");
          const imageEl = s.image === "floating" ? <Slideshow slides={SLIDES} /> : s.image === "albums" ? <AlbumSlideshow /> : s.image === "daw" ? (
            <div className="rounded-2xl aspect-video relative overflow-hidden">
              <Image src="/thumbnails/daw.png" alt="DAW 작업 화면" fill className="object-cover" />
            </div>
          ) : <PlaceholderImage />;

          const textEl = (
            <div>
              <div className={`flex items-center gap-3 mb-4 ${!!filter ? "justify-center" : ""}`}>
                {filter !== "brand" && <span className="text-xs font-mono tracking-widest" style={{ color: "var(--fg-subtle)" }}>{displayNum}</span>}
                {s.badge && (
                  <span
                    className="px-2.5 py-0.5 rounded-full border text-xs"
                    style={{ borderColor: "var(--border)", color: "var(--fg-subtle)", background: "var(--card-bg)" }}
                  >
                    {s.badge}
                  </span>
                )}
              </div>
              {s.tags ? (
                <div className={`flex flex-wrap gap-2 mb-4 ${!!filter ? "justify-center" : ""}`}>
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#F5C842", color: "#111" }}>{tag}</span>
                  ))}
                </div>
              ) : (
                <p className="inline-block text-sm font-bold mb-4 px-3 py-1 rounded-full" style={{ background: "#F5C842", color: "#111" }}>{s.label}</p>
              )}
              <h3 className="text-3xl md:text-4xl font-black mb-6 leading-snug whitespace-pre-line" style={{ color: "var(--fg)" }}>
                {s.heading}
              </h3>
              <p className="leading-relaxed mb-8 text-base whitespace-pre-line" style={{ color: "var(--fg-muted)" }}>{s.body}</p>
              <ul className={`space-y-3 ${!!filter ? "text-base inline-flex flex-col items-start" : "text-sm"}`} style={{ color: "var(--fg-subtle)" }}>
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span style={{ color: "var(--fg-muted)" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          );

          if (!!filter) {
            return (
              <div key={s.number} className="flex flex-col gap-10">
                <div className="w-full rounded-2xl overflow-hidden aspect-video relative">
                  {imageEl}
                </div>
                {textEl}
              </div>
            );
          }

          return (
            <div
              key={s.number}
              className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {textEl}
              {imageEl}
            </div>
          );
        })}
      </div>
    </section>
  );
}
