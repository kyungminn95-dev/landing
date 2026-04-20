import Nav from "@/components/Nav";
import ServiceTabs from "@/components/ServiceTabs";
import Guide from "@/components/Guide";
import Footer from "@/components/Footer";

export const metadata = {
  title: "뮤잇",
  description: "CJ, 농림축산식품부 등 국내 주요 브랜드와 10년간 함께한 뮤잇. 광고음악, 로고송, CM송, BGM, 징글을 레퍼런스 하나로 빠르고 정확하게 제작합니다.",
};

export default function ServicesBrandPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ServiceTabs filter="brand" />
        <Guide />
      </main>
      <Footer />
    </>
  );
}
