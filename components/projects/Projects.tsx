"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { monitor } from "../ui/monitor";
import Munch from "./Munch";
import ResNet from "./ResNet";
import Nala from "./Nala";
import FitGram from "./FitGram";

const projects = [
  {
    name: "Munch",
    img: "/projects/munch.png",
    text: "A food discovery app made social. Discover new eateries by swiping through cards solo or with your friends, and share your recent and favourite meals.",
    component: Munch,
  },
  {
    name: "ResNet",
    img: "/projects/resnet.png",
    text: "Gathers crucial information such as resource needs and damage severity throughout the nation after a crisis, based on first-person reports on social media sites.",
    component: ResNet,
  },
  {
    name: "NALALearnscape",
    img: "/projects/nala.png",
    text: "An adaptive e-learning platform for personalised education with AI-powered learning analytics. Built to accompany NTU's educational chatbot NALA.",
    component: Nala,
  },
  {
    name: "FitGram",
    img: "/projects/fitgram.png",
    text: "A social media platform where Singaporeans can find sports facilities, track their workouts, and share their fitness journey with their friends.",
    component: FitGram,
  },
];

function DesktopProjects() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const zoomOutRef = useRef<(() => void) | null>(null);
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeProject]);

  monitor(
    canvasRef,
    listRef,
    textRef,
    (zoomOut: any) => {
      zoomOutRef.current = zoomOut;
    },
    (p) =>
      setActiveProject(projects.find((proj) => proj.name === p.name) ?? null),
    undefined,
    () => setIsZooming(true),
  );

  function handleClose() {
    if (textRef.current) {
      textRef.current.style.transition = "opacity 200ms";
      textRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      setIsZooming(true);
      setIsClosing(true);
      zoomOutRef.current?.();
    }, 50);

    setTimeout(() => {
      setActiveProject(null);
      setIsClosing(false);
      setIsZooming(false);
    }, 550);
  }

  const ActiveComponent = activeProject?.component ?? null;

  return (
    <div ref={canvasRef} className="relative w-full h-screen">
      <h2
        className={`absolute top-8 2xl:top-20 left-1/2 -translate-x-1/2 md:text-9xl text-8xl font-heading text-shadow-[0_0_12px_#e6ccff] transition-opacity duration-200 pointer-events-none z-10 ${
          isZooming ? "opacity-0" : "opacity-100"
        }`}
      >
        PROJECTS
      </h2>

      <div
        className={`absolute left-1/2 -translate-x-1/2 text-center w-148 text-base transition-opacity duration-200 z-10 pointer-events-none bottom-[calc(2rem+44px+1.5rem)] 2xl:bottom-[calc(4rem+44px+1.5rem)] ${
          isZooming ? "opacity-0" : ""
        }`}
      >
        <div ref={textRef} />
      </div>

      <ul
        ref={listRef}
        className={`absolute bottom-8 2xl:bottom-16 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 z-10 transition-opacity duration-200 ${
          isZooming
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        {projects.map((p) => (
          <li
            key={p.name}
            className="py-2 px-4 border-2 cursor-target hover:bg-primary hover:text-background transition-background duration-300"
            data-img={p.img}
            data-text={p.text}
            data-name={p.name}
          >
            {p.name}
          </li>
        ))}
      </ul>

      <div
        className={`fixed inset-0 transition-opacity duration-500 ${
          activeProject && !isClosing
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {(activeProject || isClosing) && ActiveComponent && (
          <ActiveComponent onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

function MobileProjects() {
  const [current, setCurrent] = useState(0);
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isClosing, setIsClosing] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const ActiveComponent = activeProject?.component ?? null;

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeProject]);

  function prev() {
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % projects.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  }

  function handleOpen() {
    setActiveProject(projects[current]);
  }

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setActiveProject(null);
      setIsClosing(false);
    }, 500);
  }

  const p = projects[current];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 gap-8">
      <h2 className="text-7xl font-heading text-shadow-[0_0_12px_#e6ccff]">
        PROJECTS
      </h2>

      <div
        className="w-full max-w-sm flex flex-col items-center gap-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handleOpen}
          className="relative w-full aspect-video rounded-sm overflow-hidden border border-primary/30 hover:border-primary transition-colors duration-300 cursor-target"
          aria-label={`Open ${p.name}`}
        >
          <Image src={p.img} alt={p.name} fill className="object-cover" />
        </button>

        <div className="text-center flex flex-col gap-2">
          <h3 className="text-2xl text-shadow-[0_0_8px_#e6ccff]">{p.name}</h3>
          <p className="text-sm text-[#d0b7e8] leading-relaxed">{p.text}</p>
          <button
            onClick={handleOpen}
            className="mt-2 self-center py-2 px-5 border-2 text-sm hover:bg-primary hover:text-background transition-colors duration-300 cursor-target"
          >
            VIEW PROJECT
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={prev}
          className="p-2 border border-primary/40 hover:border-primary transition-colors duration-300 cursor-target"
          aria-label="Previous project"
        >
          ←
        </button>
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-target ${
                i === current ? "bg-primary" : "bg-primary/30"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 border border-primary/40 hover:border-primary transition-colors duration-300 cursor-target"
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          activeProject && !isClosing
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {(activeProject || isClosing) && ActiveComponent && (
          <ActiveComponent onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}
