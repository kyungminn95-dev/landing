import Image from "next/image";

const LOGOS = [
  { src: "/logos/cj-enm.png",    alt: "CJ ENM" },
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

// 마르퀴용: 2배 복제
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS];

export default function Trust() {
  return (
    <section className="border-t py-8" style={{ borderColor: "var(--border)" }}>
      <p className="text-center text-xs tracking-widest uppercase mb-8" style={{ color: "var(--fg-subtle)" }}>
        함께한 클라이언트
      </p>

      {/* 데스크탑: 2줄, 각 행 가운데 정렬 */}
      <div className="hidden md:flex flex-col gap-8 items-center px-6">
        <div className="flex items-center justify-center gap-10">
          {LOGOS.slice(0, 5).map((logo) => (
            <div key={logo.alt} className="relative h-12 w-32 shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.12))" }}>
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10">
          {LOGOS.slice(5).map((logo) => (
            <div key={logo.alt} className="relative h-12 w-32 shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.12))" }}>
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* 모바일: 마르퀴 */}
      <div className="md:hidden overflow-hidden">
        <div className="marquee-inner">
          {MARQUEE_LOGOS.map((logo, i) => (
            <div key={i} className="relative h-7 w-24 mx-6 shrink-0 grayscale opacity-50">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
