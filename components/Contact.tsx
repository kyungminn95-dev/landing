export default function Contact() {
  return (
    <section id="contact" className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-widest uppercase mb-10" style={{ color: "var(--fg-subtle)" }}>Contact</p>

        {/* 지도 */}
        <div className="rounded-2xl overflow-hidden mb-10" style={{ width: "100%", color: "#333", position: "relative" }}>
          <a href="https://map.kakao.com/?urlX=481763.0000000028&urlY=1124518.999999999&name=%EC%84%9C%EC%9A%B8%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EB%8F%85%EB%A7%89%EB%A1%9C6%EA%B8%B8%206&map_type=TYPE_MAP&from=roughmap" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="http://t1.daumcdn.net/roughmap/imgmap/b8b9518135ef0340dce48dbc0a915fcc8bff52275b38081cfde8b33fe9599637"
              alt="서울 마포구 독막로6길 6 지도"
              width="638"
              height="358"
              style={{ width: "100%", height: "360px", objectFit: "cover", border: "1px solid #ccc", display: "block" }}
            />
          </a>
          <div style={{ overflow: "hidden", padding: "7px 11px", border: "1px solid rgba(0,0,0,0.1)", borderTop: 0, background: "#f9f9f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://map.kakao.com" target="_blank" rel="noopener noreferrer">
              <img src="//t1.kakaocdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png" width="72" height="16" alt="카카오맵" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://map.kakao.com/?from=roughmap&eName=%EC%84%9C%EC%9A%B8%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EB%8F%85%EB%A7%89%EB%A1%9C6%EA%B8%B8%206&eX=481763.0000000028&eY=1124518.999999999" style={{ fontSize: "11px", color: "#000", textDecoration: "none" }}>길찾기</a>
          </div>
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
