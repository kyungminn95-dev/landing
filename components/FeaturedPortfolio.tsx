"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type YoutubeItem = { type: "youtube"; id: string; title: string; label: string; thumbnail?: string; views?: string };
type VideoItem   = { type: "video";   src: string; title: string; label: string; thumbnail?: string };
type Item = YoutubeItem | VideoItem;

const ITEMS: Item[] = [
  { type: "youtube", id: "Dz5KIa-opgE",       title: "농림축산식품부 — 축산물 PLS", label: "광고음악", views: "120만" },
  { type: "video",   src: "/videos/cj-gabi.mov",    title: "CJ 온스타일 — 가비",    label: "광고음악", thumbnail: "/thumbnails/cj-gabi.jpg" },
  { type: "video",   src: "/videos/cj-busters.mov", title: "CJ 온스타일 — 버스터즈", label: "광고음악", thumbnail: "/thumbnails/cj-busters.jpg" },
  { type: "youtube", id: "FSU7rI38CC4", title: "뽀싱TV — 똥을 만들어요", label: "동요", views: "150만" },
  { type: "video",   src: "/videos/ihq-still-alive.mp4", title: "IHQ 'Still Alive' 오프닝 타이틀", label: "광고음악", thumbnail: "/thumbnails/ihq-still-alive.jpg" },
  { type: "youtube", id: "M2QoPbtMjHo", title: "하남시 — 하남이와 방울이", label: "로고송" },
];

/* ── 모달 ── */
function VideoModal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1"
        >
          닫기 ✕
        </button>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
          {item.type === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.id}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <video
              src={item.src}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
        <p className="mt-3 text-sm text-white/60">{item.label} · {item.title}</p>
      </div>
    </div>
  );
}

/* ── 카드 공통 썸네일 레이어 ── */
function CardThumbnail({ item, onClick }: { item: Item; onClick: () => void }) {
  const thumbnailSrc =
    item.thumbnail ??
    (item.type === "youtube" ? `https://img.youtube.com/vi/${item.id}/hqdefault.jpg` : undefined);

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-t-2xl cursor-pointer"
      style={{ background: "#000" }}
      onClick={onClick}
    >
      {thumbnailSrc ? (
        <Image
          src={thumbnailSrc}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      ) : item.type === "video" ? (
        <video
          src={item.src}
          className="w-full h-full object-cover opacity-70"
          muted
          preload="metadata"
        />
      ) : null}
      {item.type === "youtube" && item.views && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold pointer-events-none" style={{ background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}>
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          {item.views}
        </div>
      )}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
          <svg className="w-5 h-5 ml-1 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ── 공통 하단 정보 ── */
function CardInfo({ title, label }: { title: string; label: string }) {
  return (
    <div className="px-4 py-3 rounded-b-2xl" style={{ background: "var(--card-bg)" }}>
      <p className="text-xs mb-0.5" style={{ color: "var(--fg-subtle)" }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{title}</p>
    </div>
  );
}

export default function FeaturedPortfolio() {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--fg-subtle)" }}>Featured Work</p>
        </div>
        <Link
          href="/portfolio"
          className="hidden md:inline-flex items-center gap-1.5 text-sm pb-1 border-b transition-colors"
          style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
        >
          전체 보기 →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {ITEMS.map((item) => (
          <div
            key={item.type === "youtube" ? item.id : item.src}
            className="group relative rounded-2xl border transition-colors"
            style={{ borderColor: "var(--border)" }}
          >
            <CardThumbnail item={item} onClick={() => setActive(item)} />
            <CardInfo title={item.title} label={item.label} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex md:hidden justify-center">
        <Link href="/portfolio" className="text-sm px-6 py-3 border rounded-full" style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}>
          전체 포트폴리오 보기 →
        </Link>
      </div>

      {active && <VideoModal item={active} onClose={() => setActive(null)} />}
    </section>
  );
}
