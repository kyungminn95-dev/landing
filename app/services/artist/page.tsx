import Nav from "@/components/Nav";
import ServiceTabs from "@/components/ServiceTabs";
import ArtistDetails from "@/components/ArtistDetails";
import Footer from "@/components/Footer";

export const metadata = {
  title: "아티스트 서비스 — 뮤잇",
};

export default function ServicesArtistPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ServiceTabs filter="artist" />
        <ArtistDetails />
      </main>
      <Footer />
    </>
  );
}
