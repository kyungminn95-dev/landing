import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "문의하기 — 뮤잇",
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
