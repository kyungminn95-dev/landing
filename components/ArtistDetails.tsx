"use client";

import Image from "next/image";
import { useState } from "react";

const PRICES = [
  { service: "믹싱 Basic", desc: "~15트랙", price: "250,000원", inquiry: false },
  { service: "믹싱 Full", desc: "15트랙 이상", price: "400,000원", inquiry: false },
  { service: "마스터링", desc: null, price: "100,000원", inquiry: false },
  { service: "보컬 튠", desc: null, price: "50,000원 / 트랙", inquiry: false },
  { service: "스트링 편곡", desc: null, price: "400,000원", inquiry: false },
  { service: "데모·유튜브 커버 믹싱", desc: null, price: "별도 문의", inquiry: true },
  { service: "작편곡", desc: null, price: "별도 문의", inquiry: true },
];

const HARDWARE = [
  "Mac Studio 2024",
  "Neumann TLM103",
  "Telefunken TF51",
  "Teletronix LA-2A",
  "Chandler Limited TG2",
  "Heritage Audio 73 JR II",
  "SSL Fusion",
  "SSL G Comp",
  "Heritage Audio Successor",
  "Warm Audio WA76",
  "Universal Audio Apollo X8",
  "Genelec 8341A",
  "Sennheiser HD600",
];

const PLUGINS = ["UAD", "Waves", "FabFilter", "SSL"];

// 작업실 사진 슬롯 — /public/studio/ 폴더에 파일 교체하면 자동 반영
const STUDIO_PHOTOS = [
  { src: "/studio/photo-1.jpg", alt: "작업실 전경" },
  { src: "/studio/photo-2.jpg", alt: "마이크 & 프리앰프" },
  { src: "/studio/photo-3.jpg", alt: "모니터 스피커" },
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

          <p className="mt-6 text-xs" style={{ color: "var(--fg-subtle)" }}>
            * 트랙 수, 장르, 작업 복잡도에 따라 달라질 수 있습니다. 별도 문의 항목은 상담 후 안내드립니다.
          </p>
        </div>
      </section>

      {/* ── 스튜디오 & 장비 ── */}
      <section className="border-t" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--fg-subtle)" }}>Studio</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight" style={{ color: "var(--fg)" }}>
            스튜디오 & 장비
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* 작업실 사진 */}
            <div className="grid grid-cols-2 gap-3">
              {STUDIO_PHOTOS.map((photo) => (
                <StudioPhotoSlot key={photo.src} src={photo.src} alt={photo.alt} />
              ))}
            </div>

            {/* 장비 리스트 */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "var(--fg-subtle)" }}>Hardware</p>
                <ul className="space-y-3">
                  {HARDWARE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--fg-subtle)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "var(--fg-subtle)" }}>Plugins</p>
                <div className="flex flex-wrap gap-2">
                  {PLUGINS.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1.5 rounded-full border text-xs font-medium"
                      style={{ borderColor: "var(--border)", color: "var(--fg-muted)", background: "var(--bg)" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
