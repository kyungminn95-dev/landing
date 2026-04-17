"use client";

import Image from "next/image";
import { useState } from "react";

type YoutubeItem = { type: "youtube"; id: string; title: string; label: string; tags?: string[]; thumbnail?: string; views?: string };
type VideoItem   = { type: "video";   src: string; title: string; label: string; tags?: string[]; thumbnail?: string };
type Item = YoutubeItem | VideoItem;

const TABS = {
  "Brand": ["전체", "광고음악", "로고송", "BGM", "징글", "동요"],
  "Artist": ["전체", "작편곡", "스트링 편곡", "연주", "믹싱/마스터링"],
} as const;

type TabKey = keyof typeof TABS;

const CATEGORY_ORDER: Record<TabKey, string[]> = {
  "Brand": ["광고음악", "로고송", "BGM", "징글", "동요"],
  "Artist": ["작편곡", "스트링 편곡", "연주", "믹싱/마스터링"],
};

const ITEMS: Record<TabKey, Item[]> = {
  "Brand": [
    { type: "youtube", id: "Dz5KIa-opgE",  title: "농림축산식품부 — 축산물 PLS",          label: "광고음악", tags: ["광고음악", "징글"], views: "120만" },
    { type: "video",   src: "/videos/cj-ashora.mp4",  title: "CJ 온스타일 — 아쇼라 오프닝 곡", label: "광고음악", thumbnail: "/thumbnails/cj-ashora.jpg" },
    { type: "video",   src: "/videos/cj-gabi.mov",    title: "CJ 온스타일 — 가비",        label: "광고음악", thumbnail: "/thumbnails/cj-gabi.jpg" },
    { type: "video",   src: "/videos/cj-busters.mov", title: "CJ 온스타일 — 버스터즈",     label: "광고음악", thumbnail: "/thumbnails/cj-busters.jpg" },
    { type: "video",   src: "/videos/ihq-still-alive.mp4", title: "IHQ 'Still Alive' 오프닝 타이틀", label: "광고음악", thumbnail: "/thumbnails/ihq-still-alive.jpg" },
    { type: "youtube", id: "M2QoPbtMjHo",  title: "하남시 — 하남이와 방울이",             label: "로고송" },
    { type: "youtube", id: "YPf4RHtXxPo",  title: "포천시 — 고향사랑기부제 (이병찬)",      label: "로고송" },
    { type: "youtube", id: "87v1TerYBJk",  title: "안성시 — 안성바우덕이축제 플래시몹",    label: "로고송" },
    { type: "youtube", id: "FSU7rI38CC4",  title: "뽀싱TV — 똥을 만들어요",              label: "동요", views: "150만" },
    { type: "youtube", id: "4vo1Q1u33D4",  title: "뽀싱TV — 방귀송",                    label: "동요" },
    { type: "youtube", id: "aLYRzsPSZ74",  title: "뽀싱TV — 어디 있지? 내 방귀",         label: "동요" },
    { type: "youtube", id: "q5M9EzBbqQQ",  title: "뽀싱TV — 드래곤과 싸우자",            label: "동요" },
    { type: "youtube", id: "g3RWsppPZuY",  title: "뽀싱TV — 레스큐 삼총사",              label: "동요" },
    { type: "youtube", id: "HHKpz0JPfwA",  title: "뽀싱TV — 공룡이름의 알파벳을 노래해요!", label: "동요" },
    { type: "youtube", id: "a8U0Q25IiHQ",  title: "웹드라마 '백설공주와 수상한 여행사' OST", label: "BGM",  tags: ["BGM", "작편곡", "믹싱/마스터링"] },
    { type: "youtube", id: "UO39v_H74S0",  title: "티빙 — '브로앤마블' OST",                    label: "BGM", tags: ["BGM", "스트링 편곡"] },
    { type: "youtube", id: "FmSpFW45_lk",  title: "카나테일즈 — 검과 소녀의 이야기 (로비 OST)",              label: "BGM" },
    { type: "youtube", id: "ut_Hd92aGyc",  title: "카나테일즈 — 검과 소녀의 이야기 (프로필 & 드레스룸 OST)", label: "BGM" },
    { type: "youtube", id: "DTzZ11wzxqg",  title: "카나테일즈 — 검과 소녀의 이야기 (덱 & 카드목록 OST)", label: "BGM" },
    { type: "youtube", id: "UoRxZKOEsQg",  title: "카나테일즈 — 검과 소녀의 이야기 (앨범 OST)",  label: "BGM" },
    { type: "youtube", id: "T3ywSz41bxI",  title: "카나테일즈 — 검과 소녀의 이야기 (상점 OST)", label: "BGM" },
  ],
  "Artist": [
    { type: "youtube", id: "UO39v_H74S0", title: "티빙 — '브로앤마블' OST",               label: "스트링 편곡", tags: ["스트링 편곡", "BGM"] },
    { type: "youtube", id: "SQdzcK89-q4", title: "하민우 — 행복하자",                      label: "스트링 편곡" },
    { type: "youtube", id: "npJ6TSWsK7I", title: "주영 — 들리나요 (드라마 '리멤버')",       label: "연주" },
    { type: "youtube", id: "Mc3Nl-I1aiI", title: "조은세 — 동백꽃",                       label: "연주", tags: ["연주", "스트링 편곡"] },
    { type: "youtube", id: "NpjS0HrP7wk", title: "조은세 — 해바라기별",                   label: "연주", tags: ["연주", "스트링 편곡"] },
    { type: "youtube", id: "mDSE4FrpiBw", title: "조은세 — 하루의 정원",    label: "연주", tags: ["연주", "스트링 편곡"] },
    { type: "youtube", id: "SHw-94SCj1w", title: "조은세 — 벗, 꽃이 피면",                    label: "연주",      tags: ["연주", "스트링 편곡"] },
    { type: "youtube", id: "_EvjyXDGM5w", title: "Dept — Van Gogh (Feat. Ashley Alisha)",  label: "스트링 편곡" },
    { type: "youtube", id: "hPWlHnDeKqo", title: "Dept — Forget me (Feat. Sarah Kang)",                    label: "스트링 편곡" },
    { type: "youtube", id: "pdfYdQ_3wx4", title: "Dept — Tulip (Feat. Kelsey Kuan, Ashley Alisha)",              label: "스트링 편곡" },
    { type: "youtube", id: "fZX4nSawdfM", title: "Dept — Obliviate (Feat. Nobody likes you pat, Ashley Alisha)", label: "스트링 편곡" },
    { type: "youtube", id: "jfjaKzB_Ww8", title: "Dept — Merry go round (Feat. Kelsey Kuan)",  label: "스트링 편곡" },
    { type: "youtube", id: "Wl-QMK8Jk7I", title: "Dept — As It Is (Feat. Ashley Alisha)",   label: "스트링 편곡" },
    { type: "youtube", id: "x2yg3d12VrE", title: "Dept — Propose (Feat. Kelsey Kuan)",                       label: "스트링 편곡" },
    { type: "youtube", id: "ZSALeZghuDU", title: "Dept — Boyhood (Feat. Ashley Alisha, Heyden)", label: "스트링 편곡" },
    { type: "youtube", id: "etfRafYhra8", title: "Dept — This love (Feat. Kelsey Kuan)",     label: "스트링 편곡" },
    { type: "youtube", id: "Gv8yd4txLvY", title: "Dept — Better Alone (Feat. Kelsey Kuan)",                    label: "스트링 편곡" },
    { type: "youtube", id: "hJ9EJsZX_fU", title: "Dept — Ocean View (Feat. Kelsey Kuan, Julian Rose)", label: "스트링 편곡" },
    { type: "youtube", id: "GOLNRoR1rmU", title: "Dept — Pieces of Me (Feat. Ashley Alisha)", label: "스트링 편곡" },
    { type: "youtube", id: "6jV3-EByGmQ", title: "Dept — Into the Dream",    label: "작편곡", tags: ["작편곡", "스트링 편곡", "연주"] },
    { type: "youtube", id: "PuYH_7wFy1A", title: "박은별 — 예쁘다고 말해", label: "작편곡", tags: ["작편곡", "연주", "믹싱/마스터링"] },
    { type: "youtube", id: "a8U0Q25IiHQ", title: "웹드라마 '백설공주와 수상한 여행사' OST", label: "작편곡", tags: ["작편곡", "BGM", "믹싱/마스터링"] },
    { type: "youtube", id: "zOfwFiCPT7Q", title: "HEYA — SouLott", label: "작편곡", tags: ["작편곡", "믹싱/마스터링"] },
    { type: "youtube", id: "KmCrWH7FxcQ", title: "HEYA — ECHO",   label: "작편곡", tags: ["작편곡", "믹싱/마스터링"] },
  ],
};

/* ── 모달 ── */
function VideoModal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
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
            <video src={item.src} controls autoPlay className="absolute inset-0 w-full h-full" />
          )}
        </div>
        <p className="mt-3 text-sm text-white/60">{item.label} · {item.title}</p>
      </div>
    </div>
  );
}

/* ── 카드 ── */
function Card({ item, onClick }: { item: Item; onClick: () => void }) {
  const thumbnailSrc =
    item.thumbnail ??
    (item.type === "youtube" ? `https://img.youtube.com/vi/${item.id}/hqdefault.jpg` : undefined);

  return (
    <div
      className="group rounded-2xl border transition-colors cursor-pointer"
      style={{ borderColor: "var(--border)" }}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl" style={{ background: "#000" }}>
        {thumbnailSrc ? (
          <Image src={thumbnailSrc} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
        ) : item.type === "video" ? (
          <video src={item.src} className="w-full h-full object-cover opacity-70" muted preload="metadata" />
        ) : null}

        {item.type === "youtube" && item.views && (
          <div
            className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold pointer-events-none"
            style={{ background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}
          >
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
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

      <div className="px-4 py-3 rounded-b-2xl" style={{ background: "var(--card-bg)" }}>
        <p className="text-xs mb-0.5" style={{ color: "var(--fg-subtle)" }}>
          {(item.tags ?? [item.label]).map((t) => `#${t}`).join(" ")}
        </p>
        <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{item.title}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<Item | null>(null);
  const [tab, setTab] = useState<TabKey>("Brand");
  const [filter, setFilter] = useState<string>("전체");

  const handleTabChange = (t: TabKey) => {
    setTab(t);
    setFilter("전체");
  };

  const order = CATEGORY_ORDER[tab];
  const items = ITEMS[tab];
  const filtered = filter === "전체"
    ? [...items].sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label))
    : items.filter((i) => (i.tags ?? [i.label]).includes(filter));

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <p className="text-xs tracking-widest uppercase mb-10" style={{ color: "var(--fg-subtle)" }}>Portfolio</p>

      {/* 상위 탭 — 카드형 */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        {(
          [
            { key: "Brand",  sub: "광고음악 · BGM · 로고송" },
            { key: "Artist", sub: "믹싱 · 마스터링 · 편곡" },
          ] as { key: TabKey; sub: string }[]
        ).map(({ key, sub }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className="text-left px-6 py-5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95"
            style={{
              borderColor: tab === key ? "var(--fg)" : "var(--border)",
              background: tab === key ? "var(--fg)" : "var(--card-bg)",
              boxShadow: tab === key ? "0 4px 20px rgba(0,0,0,0.15)" : undefined,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-black mb-1" style={{ color: tab === key ? "var(--bg)" : "var(--fg)" }}>{key}</p>
                <p className="text-xs" style={{ color: tab === key ? "var(--bg)" : "var(--fg-subtle)", opacity: tab === key ? 0.7 : 1 }}>{sub}</p>
              </div>
              <span className="text-lg" style={{ color: tab === key ? "var(--bg)" : "var(--fg-subtle)", opacity: 0.5 }}>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* 그리드 */}
      <div className="grid md:grid-cols-2 gap-5">
        {[...items].sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label)).map((item) => (
          <Card
            key={item.type === "youtube" ? item.id : item.src}
            item={item}
            onClick={() => setActive(item)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-20 text-sm" style={{ color: "var(--fg-subtle)" }}>
          작업물을 준비 중입니다.
        </p>
      )}

      {active && <VideoModal item={active} onClose={() => setActive(null)} />}
    </section>
  );
}
