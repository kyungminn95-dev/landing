export default function Contact() {
  return (
    <section id="contact" className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-widest uppercase mb-10" style={{ color: "var(--fg-subtle)" }}>Contact</p>

        {/* 지도 */}
        <a
          href="https://map.naver.com/v5/search/서울시+마포구+독막로6길+6"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden mb-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/map"
            alt="스튜디오 위치 지도"
            width="800"
            height="400"
            style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }}
          />
        </a>

        {/* 정보 */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-8 text-sm" style={{ color: "var(--fg-muted)" }}>
            <span>서울시 마포구 독막로6길 6, B1</span>
            <a href="mailto:muit@muit.kr" style={{ color: "var(--fg-muted)" }}>muit@muit.kr</a>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            지금 문의하기 →
          </a>
        </div>
      </div>
    </section>
  );
}
