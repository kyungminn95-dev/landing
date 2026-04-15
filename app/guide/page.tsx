import Nav from "@/components/Nav";
import Guide from "@/components/Guide";
import Footer from "@/components/Footer";

export const metadata = {
  title: "제작안내 — 뮤잇",
};

export default function GuidePage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Guide />
      </main>
      <Footer />
    </>
  );
}
