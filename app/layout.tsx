import type { Metadata } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  title: "뮤잇 — 브랜드의 소리를 설계합니다",
  description: "AI와 10년 경력이 만드는 광고음악 · BGM · 브랜드 사운드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${inter.variable} scroll-smooth`}>
      <head>
        {/* 테마 플래시 방지: hydration 전에 class 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-noto), var(--font-inter), sans-serif" }}>
        {children}
        <Script id="channel-io" strategy="afterInteractive">{`
          (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.")}var ch=function(){ch.c(arguments)};ch.q=[];ch.c=function(args){ch.q.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];x.parentNode.insertBefore(s,x)}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();
          var isMobile = window.innerWidth < 768;
          ChannelIO('boot', { pluginKey: '19e86945-2340-4493-9468-1bfbfe38615e', hidePopup: isMobile });
        `}</Script>
      </body>
    </html>
  );
}
