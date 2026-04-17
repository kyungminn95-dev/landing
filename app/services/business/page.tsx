import Nav from "@/components/Nav";
import ServiceTabs from "@/components/ServiceTabs";
import Guide from "@/components/Guide";
import Footer from "@/components/Footer";

export const metadata = {
  title: "비즈니스 서비스 — 뮤잇",
};

export default function ServicesBusinessPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ServiceTabs filter="business" />
        <Guide />
      </main>
      <Footer />
    </>
  );
}
