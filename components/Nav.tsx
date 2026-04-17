"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const serviceLinks = [
  { href: "/services/brand", label: "Brand", sub: "광고 · 로고송 · BGM" },
  { href: "/services/artist", label: "Artist", sub: "믹싱 · 마스터링 · 편곡" },
];

const links = [
  { href: "/portfolio", label: "포트폴리오" },
];

function ShareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
    </svg>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleShare = async () => {
    const url = "https://muit.kr";
    const title = "뮤잇 — 브랜드의 음악을 설계합니다";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      {/* Floating nav card */}
      <nav
        className="max-w-5xl mx-auto rounded-2xl border px-5 h-14 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "rgba(0,0,0,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* Left — Logo */}
        <div className="flex items-center">
          <Link href="https://muit.kr" className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
              <ellipse cx="17" cy="17" rx="11" ry="5" fill="#F5C842" transform="rotate(-45 17 17)"/>
              <ellipse cx="13" cy="13" rx="11" ry="5" fill="#111" transform="rotate(-45 13 13)"/>
            </svg>
            <span className="font-black text-xl tracking-tight" style={{ color: "var(--fg)" }}>muit</span>
          </Link>
        </div>

        {/* Center — Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 text-sm absolute left-1/2 -translate-x-1/2" style={{ color: "var(--fg-muted)" }}>
          <Link href="/#about" className="px-3 py-1.5 rounded-xl transition-colors hover:bg-black/5 hover:text-[var(--fg)]">
            About
          </Link>

          {/* 서비스 dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
              setServicesOpen(true);
            }}
            onMouseLeave={() => {
              servicesTimeout.current = setTimeout(() => setServicesOpen(false), 150);
            }}
          >
            <button className="px-3 py-1.5 rounded-xl transition-colors hover:bg-black/5 hover:text-[var(--fg)] flex items-center gap-1">
              서비스
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 rounded-xl border min-w-[160px] shadow-lg"
                style={{ background: "rgba(255,255,255,0.96)", borderColor: "rgba(0,0,0,0.08)", backdropFilter: "blur(20px)" }}
              >
                {serviceLinks.map((sl) => (
                  <Link
                    key={sl.href}
                    href={sl.href}
                    className="flex flex-col px-4 py-2 hover:bg-black/5 transition-colors"
                  >
                    <span className="font-semibold text-sm" style={{ color: "var(--fg)" }}>{sl.label}</span>
                    <span className="text-xs" style={{ color: "var(--fg-subtle)" }}>{sl.sub}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/portfolio" className="px-3 py-1.5 rounded-xl transition-colors hover:bg-black/5 hover:text-[var(--fg)]">
            포트폴리오
          </Link>
        </div>

        {/* Right — Share + Contact + Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors hover:bg-black/5"
            style={{ color: copied ? "var(--fg)" : "var(--fg-muted)" }}
            aria-label="공유하기"
          >
            {copied ? (
              <span className="text-xs font-medium" style={{ color: "var(--fg)" }}>✓</span>
            ) : (
              <ShareIcon />
            )}
          </button>

          <Link
            href="/contact"
            className="hidden md:inline-flex px-4 py-1.5 rounded-xl text-sm font-medium transition-all"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            문의하기
          </Link>

          {/* Mobile hamburger — 맨 오른쪽 */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl transition-colors hover:bg-black/5"
            style={{ color: "var(--fg-muted)" }}
            aria-label="메뉴"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden max-w-5xl mx-auto mt-2 rounded-2xl border px-6 py-4 flex flex-col gap-4 text-sm"
          style={{
            background: "rgba(255,255,255,0.96)",
            borderColor: "rgba(0,0,0,0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            color: "var(--fg-muted)",
          }}
        >
          <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>

          <button
            className="flex items-center justify-between w-full text-left"
            onClick={() => setMobileServicesOpen((v) => !v)}
          >
            <span>서비스</span>
            <svg
              className="w-4 h-4 transition-transform"
              style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileServicesOpen && (
            <div className="flex flex-col gap-3 pl-3 border-l" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              {serviceLinks.map((sl) => (
                <Link
                  key={sl.href}
                  href={sl.href}
                  onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                >
                  <span className="font-semibold">{sl.label}</span>
                  <span className="ml-2 text-xs" style={{ color: "var(--fg-subtle)" }}>{sl.sub}</span>
                </Link>
              ))}
            </div>
          )}

          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}>문의하기</Link>
        </div>
      )}
    </div>
  );
}
