import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export const metadata = {
  title: "포트폴리오 | 뮤잇 — 광고음악·믹싱·마스터링 작업물",
  description: "CJ, 농림축산식품부, SPC 등 국내 주요 브랜드 광고음악부터 아티스트 믹싱·마스터링까지. 뮤잇의 실제 작업물을 확인하세요.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
