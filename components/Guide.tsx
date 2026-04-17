"use client";

import { useState } from "react";

const STEPS = [
  {
    num: "1",
    title: "음악컨셉 상담진행",
    desc: "충분한 상담을 통해 고객이 전달하고자 하는\n메세지, 키워드, 분위기등을 파악",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    ),
  },
  {
    num: "2",
    title: "초안전달",
    desc: "상담한 내용을 기반으로 50% 완성된\n가이드보컬 녹음본 전달 (반주편곡, 멜로디, 가사 포함)",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    ),
  },
  {
    num: "3",
    title: "수정 및 보완",
    desc: "고객의 피드백을 적극 반영하여\n100% 만족할 때까지 수정 작업 진행",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    ),
  },
  {
    num: "4",
    title: "빌드업 진행",
    desc: "수정 작업을 통해 완성된 가사 및 멜로디를\n확정짓고 정식녹음 및 빌드업",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
    ),
  },
  {
    num: "5",
    title: "가믹스본 전달",
    desc: "정식보컬 녹음과 편곡이 완료된 음원 전달\n최종확인",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
      </svg>
    ),
  },
  {
    num: "6",
    title: "최종본 전달",
    desc: "MIX&MASTERING 과정을 통한\n최종 완성본 전달",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/>
      </svg>
    ),
  },
];

const CHECKLIST = [
  {
    title: "원하는 분위기의 참고곡",
    content: "유사한 스타일, 분위기, 장르의 레퍼런스 트랙을 공유해주시면 방향 설정에 큰 도움이 됩니다. 유튜브, 멜론, 스포티파이 링크 모두 환영합니다.",
  },
  {
    title: "제작하려는 브랜드나 내용에 대한 설명",
    content: "브랜드 이름, 슬로건, 주요 타깃, 사용 채널(TV 광고, 유튜브, SNS 등)을 알려주세요. 브랜드 가이드라인이나 기존 광고물이 있다면 함께 공유해주시면 좋습니다.",
  },
  {
    title: "중요한 키워드, 강조하고 싶은 내용",
    content: "음악에서 반드시 전달되어야 하는 키워드나 감정(예: 신뢰감, 활기참, 따뜻함)을 알려주세요. 가사에 포함되길 원하는 문구가 있다면 함께 적어주세요.",
  },
  {
    title: "러닝타임과 곡의 용도",
    content: "15초, 30초, 60초, 풀버전 등 필요한 길이와 TV 광고, 유튜브 인트로, 행사 배경음악 등 사용 목적을 알려주세요.",
  },
  {
    title: "보컬, 성우의 성별과 톤",
    content: "남성/여성/어린이, 밝고 경쾌한 톤/차분하고 중후한 톤 등 원하시는 보컬 스타일을 알려주세요. 참고할 만한 보컬 레퍼런스가 있다면 공유해주세요.",
  },
];

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left text-sm font-medium transition-colors"
        style={{ color: "var(--fg)" }}
      >
        <span>{title}</span>
        <span
          className="text-lg leading-none transition-transform duration-200 shrink-0 ml-4"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", color: "var(--fg-subtle)" }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--fg-muted)" }}>
          {content}
        </p>
      )}
    </div>
  );
}

export default function Guide() {
  return (
    <div>
      {/* ── 제작 과정 ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--fg-subtle)" }}>Process</p>
        <h1 className="text-4xl md:text-5xl font-black mb-16 leading-tight" style={{ color: "var(--fg)" }}>
          음원 제작과정
        </h1>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-14">
          {STEPS.map((step) => (
            <div key={step.num}>
              <div className="mb-4" style={{ color: "var(--fg-muted)" }}>
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>
                <span style={{ color: "var(--fg-subtle)" }}>{step.num}.</span>{step.title}
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--fg-muted)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 준비물 ── */}
      <section className="border-t" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--fg-subtle)" }}>Checklist</p>
          <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight" style={{ color: "var(--fg)" }}>
            음악 제작 준비물
          </h2>
          <p className="text-sm mb-14" style={{ color: "var(--fg-muted)" }}>
            자세할수록 마음에 꼭 드는 노래를 더 빨리 만나보실 수 있습니다.
          </p>

          <div className="border-t" style={{ borderColor: "var(--border)" }}>
            {CHECKLIST.map((item) => (
              <AccordionItem key={item.title} title={item.title} content={item.content} />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href="/contact"
              className="px-10 py-4 text-base font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
              style={{ background: "var(--fg)", color: "var(--bg)" }}
            >
              문의하기 →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
