import Hero from "@/components/Hero";
import TargetCursor from "@/components/ui/TargetCursor";

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
    </main>
  );
}
