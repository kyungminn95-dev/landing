"use client";

import Image from "next/image";
import { useState } from "react";

const PRICES = [
  { service: "믹싱 Basic", desc: "~20트랙", price: "250,000원", inquiry: false },
  { service: "믹싱 Full", desc: "20트랙~", price: "350,000원", inquiry: false },
  { service: "마스터링", desc: null, price: "80,000원", inquiry: false },
  { service: "보컬 튠", desc: null, price: "50,000원 / 트랙", inquiry: false },
  { service: "스트링 편곡", desc: null, price: "400,000원~", inquiry: false },
  { service: "데모·유튜브 커버 믹싱", desc: "투트랙", price: "100,000원", inquiry: false },
  { service: "작편곡", desc: null, price: "별도 문의", inquiry: true },
];

const GEAR = [
  {
    category: "Core System",
    items: [
      "Mac Studio 2024",
      "Logic Pro X",
      "AVID Protools Ultimate",
      "Universal Audio Apollo X8",
    ],
  },
  {
    category: "Microphone",
    items: [
      "Neumann TLM103",
      "Telefunken TF51",
    ],
  },
  {
    category: "Outboards",
    items: [
      "Teletronix LA-2A",
      "Chandler Limited TG2",
      "Heritage Audio 73 JR II",
      "SSL Fusion",
      "SSL G Comp",
      "Heritage Audio Successor",
      "Warm Audio WA76",
    ],
  },
  {
    category: "Monitor",
    items: [
      "Genelec 8341A",
      "Sennheiser HD600",
    ],
  },
  {
    category: "Plug-Ins",
    items: [
      "UAD",
      "Waves",
      "FabFilter",
      "SSL",
    ],
  },
];

// 작업실 사진 슬롯 — /public/studio/ 폴더에 파일 교체하면 자동 반영
const STUDIO_PHOTOS = [
  { src: "/studio/studio-main.jpg", alt: "작업실 전경" },
  { src: "/studio/photo-2.jpg", alt: "마이크 & 프리앰프" },
  { src: "/studio/vocal-booth.jpg", alt: "보컬 부스" },
  { src: "/studio/photo-4.jpg", alt: "하드웨어 랙" },
];

function StudioPhotoSlot({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="rounded-xl aspect-square flex flex-col items-center justify-center gap-2 border border-dashed"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)", color: "var(--fg-subtle)" }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <p className="text-xs">{alt}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl aspect-square relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function ArtistDetails() {
  return (
    <div>
      {/* ── 프로필 ── */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-24">

          <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
            {/* 사진 */}
            <div className="shrink-0">
              <div className="w-80 h-80 rounded-2xl overflow-hidden relative">
                <Image src="/profile.jpg" alt="전경민" fill className="object-cover" />
              </div>
            </div>

            {/* 설명 */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black mb-1" style={{ color: "var(--fg)" }}>전경민</h2>
              <p className="text-base mb-10" style={{ color: "var(--fg-subtle)" }}>Producer / Musician / Engineer</p>

              <ul className="flex flex-col gap-3 mb-10">
                {[
                  "프로시마 뮤직 소속 / 작곡가",
                  "CJ온스타일 음악감독",
                  "저작권·실연자 협회 200곡 이상 등록",
                  "야나두 AI 작곡 강의 공식 파트너",
                ].map((item) => (
                  <li key={item} className="text-base" style={{ color: "var(--fg-muted)" }}>{item}</li>
                ))}
              </ul>

              <a
                href="https://www.youtube.com/@muitmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all"
                style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube @muitmusic
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 스튜디오 & 장비 ── */}
      <section className="border-t" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--fg-subtle)" }}>Studio</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight" style={{ color: "var(--fg)" }}>
            스튜디오 & 장비
          </h2>

          {/* 작업실 사진 */}
          <div className="grid grid-cols-2 gap-3 mb-16">
            {STUDIO_PHOTOS.map((photo) => (
              <StudioPhotoSlot key={photo.src} src={photo.src} alt={photo.alt} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-12 text-center">
            {GEAR.map((group) => (
              <div key={group.category}>
                <p className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "var(--fg)" }}>{group.category}</p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm" style={{ color: "var(--fg-muted)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 가격 안내 ── */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--fg-subtle)" }}>Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight" style={{ color: "var(--fg)" }}>
            가격 안내
          </h2>

          <div className="border-t" style={{ borderColor: "var(--border)" }}>
            {PRICES.map((item) => (
              <div
                key={item.service}
                className="flex items-center justify-between py-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{item.service}</span>
                  {item.desc && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--card-bg)", color: "var(--fg-subtle)" }}>
                      {item.desc}
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: item.inquiry ? "var(--fg-subtle)" : "var(--fg)" }}
                >
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          {/* 구독자 할인 */}
          <div className="mt-6">
            <a
              href="https://open.kakao.com/me/muit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold"
              style={{ color: "var(--fg)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#F5C842" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#F5C842" }} />
              </span>
              유튜브 구독자 할인 중
              <span style={{ opacity: 0.3 }}>|</span>
              빠른 문의 →
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>* 트랙 수, 장르, 작업 복잡도에 따라 달라질 수 있습니다. 별도 문의 항목은 상담 후 안내드립니다.</p>
            <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>* 세트 작업시 할인됩니다. (별도 문의)</p>
            <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>* 세금 계산서 발행시 부가세 별도</p>
          </div>
        </div>
      </section>
    </div>
  );
}
