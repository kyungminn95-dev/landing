import Nav from "@/components/Nav";
import ServiceTabs from "@/components/ServiceTabs";
import Guide from "@/components/Guide";
import Footer from "@/components/Footer";

export const metadata = {
  title: "브랜드 서비스 — 뮤잇",
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
