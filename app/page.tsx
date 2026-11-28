import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import LifeStages from "@/components/LifeStages";
import Procedures from "@/components/Procedures";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
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
        <LifeStages />
        <Gallery />
        <Procedures />
        <Faq />
        {/* "Contatos" in the menu lands on the call to action, followed by the channels. */}
        <div id="contato">
          <CtaBand />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
