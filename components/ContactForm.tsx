"use client";

import { useState } from "react";
import { sendEmail } from "@/app/actions/sendEmail";

const CATEGORIES = {
  "Brand": ["광고음악", "로고송", "BGM", "징글", "동요"],
  "Artist": ["작편곡", "스트링 편곡", "연주", "믹싱/마스터링"],
} as const;

type MainCat = keyof typeof CATEGORIES;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length < 11) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mainCat, setMainCat] = useState<MainCat | "">("");
  const [subCat, setSubCat] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "phone") {
      setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleMainCat = (cat: MainCat) => {
    setMainCat(cat);
    setSubCat("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setError("");
    try {
      await sendEmail({ ...form, category: mainCat ? `${mainCat}${subCat ? " > " + subCat : ""}` : "미선택" });
      setSubmitted(true);
    } catch {
      setError("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-lg border text-sm outline-none transition-colors";
  const inputStyle = { background: "var(--bg)", borderColor: "var(--border)", color: "var(--fg)" };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="text-5xl mb-6">✓</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--fg)" }}>문의가 접수되었습니다</h2>
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>48시간 내 답변 드리겠습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: "var(--fg)" }}>
        어떤 음악을<br />제작하고 싶으세요?
      </h1>
      <p className="text-sm leading-relaxed mb-12" style={{ color: "var(--fg-muted)" }}>
        궁금하신 사항을 상세하게 알려주세요<br />
        빠르게 회신드리겠습니다
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* 카테고리 */}
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--fg-subtle)" }}>카테고리</p>
          {/* 대분류 */}
          <div className="flex gap-2">
            {(Object.keys(CATEGORIES) as MainCat[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleMainCat(cat)}
                className="px-4 py-2 rounded-full text-sm border transition-all"
                style={{
                  background: mainCat === cat ? "var(--fg)" : "var(--bg)",
                  color: mainCat === cat ? "var(--bg)" : "var(--fg-muted)",
                  borderColor: mainCat === cat ? "var(--fg)" : "var(--border)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* 소분류 */}
          {mainCat && (
            <div className="flex flex-wrap gap-2">
              {CATEGORIES[mainCat].map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSubCat(sub === subCat ? "" : sub)}
                  className="px-3 py-1.5 rounded-full text-sm border transition-all"
                  style={{
                    background: subCat === sub ? "var(--fg)" : "var(--bg)",
                    color: subCat === sub ? "var(--bg)" : "var(--fg-muted)",
                    borderColor: subCat === sub ? "var(--fg)" : "var(--border)",
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          required name="name" placeholder="이름*"
          value={form.name} onChange={handleChange}
          className={inputClass} style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--fg-muted)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <input
          required name="phone" placeholder="전화번호*"
          value={form.phone} onChange={handleChange}
          inputMode="numeric"
          className={inputClass} style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--fg-muted)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <input
          required type="email" name="email" placeholder="이메일*"
          value={form.email} onChange={handleChange}
          className={inputClass} style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--fg-muted)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <textarea
          required name="message"
          placeholder={"문의내용*        제작하시려는 곡의 분위기나 장르, 러닝타임, 사용용도 등 최대한 많은 정보를 알려주시면 신속하게 회신드리겠습니다."}
          value={form.message} onChange={handleChange}
          rows={8} className={`${inputClass} resize-none`} style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--fg-muted)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
        />

        <label className="flex items-center gap-3 cursor-pointer text-sm" style={{ color: "var(--fg-muted)" }}>
          <input
            type="checkbox" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          개인정보처리방침에 동의합니다
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!agreed || loading}
          className="mt-2 w-full py-4 rounded-lg text-sm font-bold transition-all"
          style={{
            background: agreed && !loading ? "var(--fg)" : "var(--border)",
            color: agreed && !loading ? "var(--bg)" : "var(--fg-subtle)",
            cursor: agreed && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "전송 중..." : "문의보내기"}
        </button>
      </form>
    </div>
  );
}
