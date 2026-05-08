import FaultyTerminal from "./ui/FaultyTerminal";

export default function Hero() {
  return (
    <div className="w-screen h-screen relative flex flex-col items-center justify-center">
      <div className="absolute z-10 text-center">
        <h1
          className="font-dreamer lg:header-glow header-glow-smaller lg:text-[15rem] md:text-[10rem] text-[8rem] leading-25 md:leading-45 lg:mb-20 md:mb-[-2] mb-8"
          data-text="MICHELLE AYE"
        >
          MICHELLE AYE
        </h1>
        <p className="text-2xl text-[#d0b7e8] lg:text-4xl text-shadow-[0_0_20px_#ffffff]">
          FULL STACK DEVELOPER
        </p>
      </div>

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
  );
}
