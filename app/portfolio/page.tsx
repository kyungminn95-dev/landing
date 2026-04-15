import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export const metadata = {
  title: "포트폴리오 — 뮤잇",
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
