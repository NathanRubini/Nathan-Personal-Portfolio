import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { Stats } from "@/sections/Stats";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Awards } from "@/sections/Awards";
import { Contact } from "@/sections/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Experience />
      <Projects />
      <Skills />
      <Awards />
      <Contact />
    </>
  );
}
