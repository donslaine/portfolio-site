import Navbar from "~/components/Navbar";
import About from "~/components/sections/About";
import Contact from "~/components/sections/Contact";
import Hero from "~/components/sections/Hero";
import LiveSites from "~/components/sections/LiveSites";
import Projects from "~/components/sections/Projects";
import Skills from "~/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <LiveSites />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
