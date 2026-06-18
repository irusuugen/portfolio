import TargetCursor from "@/components/ui/TargetCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="flex flex-col">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.6}
      />
      <Hero />
      <About />
      <Projects />
      <Experience />
    </main>
  );
}
