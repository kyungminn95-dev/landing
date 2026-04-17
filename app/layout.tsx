import type { Metadata } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
import "./globals.css";
import SparkWrapper from "@/components/SparkWrapper";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "뮤잇 — 브랜드의 음악을 설계합니다",
  description: "광고음악, 로고송, BGM부터 믹싱·마스터링까지. 10년 경력의 뮤잇이 함께합니다.",
  metadataBase: new URL("https://muit.kr"),
  openGraph: {
    title: "뮤잇 — 브랜드의 음악을 설계합니다",
    description: "광고음악, 로고송, BGM부터 믹싱·마스터링까지. 10년 경력의 뮤잇이 함께합니다.",
    url: "https://muit.kr",
    siteName: "muit",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "뮤잇 — 브랜드의 음악을 설계합니다",
    description: "광고음악, 로고송, BGM부터 믹싱·마스터링까지. 10년 경력의 뮤잇이 함께합니다.",
  },
  verification: {
    other: {
      "naver-site-verification": "abe037f88ba4b615ec2b9fa4f1ce80fd2339874a",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18097462656" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18097462656');
        `}} />
      </head>

      <body className="antialiased" style={{ fontFamily: "var(--font-noto), var(--font-inter), sans-serif" }}>
        <SparkWrapper>
        {children}
        </SparkWrapper>
        {/* 카카오 오픈채팅 플로팅 버튼 */}
        <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          {/* 말풍선 */}
          <div style={{
            background: "#FEE500",
            color: "#3C1E1E",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: "12px",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            position: "relative",
          }}>
            빠른 문의
            <span style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #FEE500",
            }} />
          </div>
          {/* 버튼 */}
          <a
            href="https://open.kakao.com/me/muit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 오픈채팅"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#FEE500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              textDecoration: "none",
            }}
          >
            <svg width="34" height="32" viewBox="0 0 26 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13 0C5.82 0 0 4.716 0 10.534c0 3.74 2.388 7.02 5.99 8.942L4.42 24l5.8-3.254A15.7 15.7 0 0013 21.07c7.18 0 13-4.718 13-10.536C26 4.716 20.18 0 13 0z" fill="#3C1E1E"/>
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
