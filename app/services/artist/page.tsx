import Nav from "@/components/Nav";
import ServiceTabs from "@/components/ServiceTabs";
import ArtistDetails from "@/components/ArtistDetails";
import Footer from "@/components/Footer";

export const metadata = {
  title: "믹싱 · 마스터링 · 작편곡 | 뮤잇",
  description: "프로 뮤지션 겸 엔지니어 전경민이 직접 작업합니다. 믹싱, 마스터링, 스트링 편곡, 보컬 튠, 작편곡 문의는 뮤잇으로 연락하세요.",
};

export default function ServicesArtistPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ArtistDetails />
        <ServiceTabs filter="artist" />
      </main>
      <Footer />
    </>
  );
}
