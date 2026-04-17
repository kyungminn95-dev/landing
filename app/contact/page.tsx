import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "문의하기 | 뮤잇 — 광고음악·믹싱 제작 문의",
  description: "광고음악, 로고송, BGM, 믹싱·마스터링, 작편곡 등 음악 제작 문의는 뮤잇으로. 레퍼런스 하나로 빠르고 정확하게 안내해드립니다.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
