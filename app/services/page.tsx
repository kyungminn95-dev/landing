import Nav from "@/components/Nav";
import ServiceTabs from "@/components/ServiceTabs";
import Footer from "@/components/Footer";

export const metadata = {
  title: "뮤잇",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ServiceTabs />
      </main>
      <Footer />
    </>
  );
}
