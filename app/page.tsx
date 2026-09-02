import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Timeline />
        <Services />
        <Gallery />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
