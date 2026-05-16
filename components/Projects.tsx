"use client";
import { useRef } from "react";
import { monitor } from "./ui/monitor";

export default function Projects() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  monitor(canvasRef, listRef, textRef);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center py-8">
      <h2 className="md:text-9xl text-6xl font-heading text-shadow-[0_0_12px_#e6ccff]">
        PROJECTS
      </h2>
      <div className="relative flex flex-col items-center justify-center w-full">
        <div ref={canvasRef} className="w-full h-180 -mt-16" />
        <div
          ref={textRef}
          className="absolute bottom-8 text-center w-80 text-sm opacity-0 transition-opacity duration-300"
        />
      </div>

      <ul
        ref={listRef}
        className="mt-8 flex flex-wrap justify-center gap-4 relative pointer-events-auto"
      >
        <li
          className="py-2 px-4 border-2 cursor-target hover:bg-primary hover:text-background transition-background duration-300"
          data-img="/projects/munch.png"
          data-text="A food discovery app with AI-powered meal recommendations"
        >
          Munch
        </li>
        <li
          className="py-2 px-4 border-2 cursor-target hover:bg-primary hover:text-background transition-background duration-300"
          data-img="/projects/resnet.png"
          data-text="Deep residual learning for image recognition"
        >
          ResNet
        </li>
        <li
          className="py-2 px-4 border-2 cursor-target hover:bg-primary hover:text-background transition-background duration-300"
          data-img="/projects/nala.png"
          data-text="An adaptive e-learning platform for personalised education"
        >
          NalaLearnscape
        </li>
        <li
          className="py-2 px-4 border-2 cursor-target hover:bg-primary hover:text-background transition-background duration-300"
          data-img="/projects/fitgram.png"
          data-text="Social fitness tracking with workout sharing and analytics"
        >
          FitGram
        </li>
      </ul>
    </div>
  );
}
