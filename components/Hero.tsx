import FaultyTerminal from "./ui/FaultyTerminal";

export default function Hero() {
  return (
    <div className="w-full h-[70vh] md:h-[80vh] lg:h-screen relative flex flex-col items-center justify-center">
      <div className="absolute z-10 text-center px-4">
        <h1
          className="font-dreamer header-glow-smaller lg:header-glow
                     text-[clamp(4rem,15vw,15rem)]
                     leading-none mb-[0.15em] lg:mb-[0.3em]"
          data-text="MICHELLE AYE"
        >
          MICHELLE AYE
        </h1>
        <p className="text-[clamp(1rem,2.5vw,2.25rem)] text-[#d0b7e8] text-shadow-[0_0_20px_#ffffff] tracking-widest">
          FULL STACK DEVELOPER
        </p>
      </div>

      <video
        className="lg:hidden absolute inset-0 w-full h-full object-cover"
        src="/hero-terminal.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hidden lg:block w-full h-full">
        <FaultyTerminal
          scale={2}
          digitSize={2.3}
          scanlineIntensity={0.2}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={0.9}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#E6CCFF"
          mouseReact
          mouseStrength={0.5}
          brightness={0.6}
        />
      </div>
    </div>
  );
}
