"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/#about", label: "소개" },
  { href: "/services", label: "서비스" },
  { href: "/portfolio", label: "포트폴리오" },
  { href: "/guide", label: "제작안내" },
];

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" strokeWidth={2}/>
      <path strokeLinecap="round" strokeWidth={2} d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
    </svg>
  );
}

export default function Nav() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 초기 테마 읽기
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
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
        <Link href="/" className="flex items-center gap-1.5">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <ellipse cx="17" cy="17" rx="11" ry="5" fill="#F5C842" transform="rotate(-45 17 17)"/>
            <ellipse cx="13" cy="13" rx="11" ry="5" fill="#111" transform="rotate(-45 13 13)"/>
          </svg>
          <span className="font-black text-xl tracking-tight" style={{ color: "var(--fg)" }}>muit</span>
        </Link>

        {/* Center — Links (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-7 text-sm">
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

        {/* Right — Theme toggle + Contact */}
        <div className="flex items-center justify-end gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: "var(--fg-muted)" }}
            aria-label="테마 전환"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
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
