import TargetCursor from "@/components/ui/TargetCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.6}
      />
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
