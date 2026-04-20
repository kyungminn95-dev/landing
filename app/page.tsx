import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FeaturedPortfolio from "@/components/FeaturedPortfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "뮤잇 — 브랜드의 음악을 설계합니다",
  description: "광고음악, 로고송, BGM부터 믹싱·마스터링까지. CJ, 농림축산식품부 등 10년간 함께한 프로 뮤지션·엔지니어 전경민의 뮤잇.",
};

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Trust />
      <About />
      <Testimonials />
      <FeaturedPortfolio />
      <Contact />
      <Footer />
    </>
  );
}
