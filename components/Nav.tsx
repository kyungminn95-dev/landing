"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const links = [
  { href: "/portfolio", label: "포트폴리오" },
];

const serviceLinks = [
  { href: "/services/brand", label: "Brand", sub: "광고 · 로고송 · BGM" },
  { href: "/services/artist", label: "Artist", sub: "믹싱 · 마스터링 · 편곡" },
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3">

        {/* Left — Logo */}
        <Link href="https://muit.kr" className="flex items-center gap-1.5">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <ellipse cx="17" cy="17" rx="11" ry="5" fill="#F5C842" transform="rotate(-45 17 17)"/>
            <ellipse cx="13" cy="13" rx="11" ry="5" fill="#111" transform="rotate(-45 13 13)"/>
          </svg>
          <span className="font-black text-xl tracking-tight" style={{ color: "var(--fg)" }}>muit</span>
        </Link>

        {/* Center — Links (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-7 text-sm">
          <Link
            href="/#about"
            className="transition-colors"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
          >
            About
          </Link>

          {/* 서비스 드롭다운 */}
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
            <button
              className="transition-colors"
              style={{ color: servicesOpen ? "var(--fg)" : "var(--fg-muted)" }}
            >
              서비스
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-xl border overflow-hidden"
                style={{ background: "var(--nav-bg)", borderColor: "var(--border)", minWidth: "180px", backdropFilter: "blur(20px)" }}
              >
                {serviceLinks.map((sl) => (
                  <Link
                    key={sl.href}
                    href={sl.href}
                    className="flex flex-col px-4 py-3 transition-colors"
                    style={{ color: "var(--fg-muted)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="font-semibold text-sm">{sl.label}</span>
                    <span className="text-xs mt-0.5" style={{ color: "var(--fg-subtle)" }}>{sl.sub}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right — Share + Contact */}
        <div className="flex items-center justify-end gap-3">
          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors relative"
            style={{ color: copied ? "var(--fg)" : "var(--fg-muted)" }}
            aria-label="공유하기"
          >
            {copied ? (
              <span className="text-xs font-medium" style={{ color: "var(--fg)" }}>✓</span>
            ) : (
              <ShareIcon />
            )}
          </button>

          {/* Contact — desktop */}
          <Link
            href="/contact"
            className="hidden md:inline-flex px-4 py-1.5 border rounded-full text-sm transition-all"
            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-muted)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            문의하기
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center"
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
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
        >
          <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>

          {/* 서비스 */}
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
            <div className="flex flex-col gap-3 pl-3 border-l" style={{ borderColor: "var(--border)" }}>
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
    </nav>
  );
}
