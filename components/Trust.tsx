"use client";

import LogoLoop from "./LogoLoop";

const logos = [
  { src: "/logos/cj-enm.png",    alt: "CJ ENM" },
  { src: "/logos/cj-onstyle.png", alt: "CJ OnStyle" },
  { src: "/logos/tving.png",      alt: "TVING" },
  { src: "/logos/ihq.png",        alt: "iHQ" },
  { src: "/logos/bbosing-tv.png", alt: "뽀싱 TV" },
  { src: "/logos/mafra.png",      alt: "농림축산식품부" },
  { src: "/logos/hanam.png",      alt: "하남시" },
  { src: "/logos/anseong.png",    alt: "안성시" },
  { src: "/logos/pocheon.png",    alt: "포천시" },
  { src: "/logos/boryeong.png",   alt: "보령시" },
  { src: "/logos/kanatales.png",  alt: "카나테일즈" },
];

export default function Trust() {
  return (
    <section className="py-8">
      <p className="text-center text-xs tracking-widest uppercase mb-8" style={{ color: "var(--fg-subtle)" }}>
        함께한 클라이언트
      </p>

      <div className="max-w-6xl mx-auto overflow-hidden">
        <LogoLoop
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={48}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#f2f2f2"
          ariaLabel="함께한 클라이언트"
          renderItem={(item, key) => (
            <div
              key={key}
              style={{
                filter: "grayscale(100%)",
                opacity: 0.45,
                transition: "opacity 0.3s, filter 0.3s",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0%)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = "0.45"; (e.currentTarget as HTMLDivElement).style.filter = "grayscale(100%)"; }}
            >
              {"src" in item && <img src={item.src} alt={item.alt ?? ""} style={{ height: "40px", width: "auto", objectFit: "contain" }} draggable={false} />}
            </div>
          )}
        />
      </div>
    </section>
  );
}
