export default function Contact() {
  return (
    <section id="contact" className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-widest uppercase mb-10" style={{ color: "var(--fg-subtle)" }}>Contact</p>

        {/* 지도 */}
        <div className="rounded-2xl overflow-hidden mb-10">
          <iframe
            src="https://maps.google.com/maps?q=서울시+마포구+독막로6길+6&output=embed&hl=ko"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

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
