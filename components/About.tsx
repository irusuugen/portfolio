"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [svgProps, setSvgProps] = useState<{
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    path: string;
  } | null>(null);

  const recalculate = useCallback(() => {
    if (!containerRef.current || !squareRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const squareRect = squareRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    const fromX = squareRect.right - containerRect.left;
    const fromY = squareRect.top + squareRect.height / 2 - containerRect.top;

    const textLeft = textRect.left - containerRect.left;
    const textRight = textRect.right - containerRect.left;
    const textTop = textRect.top - containerRect.top;
    const textBottom = textRect.bottom - containerRect.top;

    const dropY = Math.max(fromY + 40, textBottom - 10);

    const pad = 30;
    const minX = Math.min(fromX, textLeft) - pad;
    const minY = textTop - 40;
    const maxX = textRight + pad;
    const maxY = dropY + pad;

    const svgWidth = maxX - minX;
    const svgHeight = maxY - minY;

    const x1 = fromX - minX;
    const y1 = fromY - minY;
    const xLeft = textLeft - minX;
    const xRight = textRight - minX;
    const yTop = textTop - minY;
    const yDrop = dropY - minY;

    const peakOffsetX = 10;

    const path = [
      `M${x1} ${y1}`,
      `H${x1 + 60}`,
      `L${xLeft - 80} ${yDrop}`,
      `H${xLeft - 30}`,
      `V${yTop - 20}`,
      `L${xLeft + peakOffsetX} ${yTop - 40}`,
      `H${xRight}`,
    ].join(" ");

    setSvgProps({
      width: svgWidth,
      height: svgHeight,
      offsetX: minX,
      offsetY: minY,
      path,
    });
  }, []);

  useEffect(() => {
    recalculate();
    const ro = new ResizeObserver(recalculate);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", recalculate);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalculate);
    };
  }, [recalculate]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-16 py-24 px-4">
      <div className="flex xl:flex-row flex-col items-center justify-center gap-8 xl:gap-0 w-full max-w-7xl mx-auto">
        <h2 className="md:text-9xl text-7xl font-heading xl:-rotate-90 xl:-ml-64 xl:shrink-0 text-shadow-[0_0_12px_#e6ccff]">
          ABOUT ME
        </h2>

        <div
          ref={containerRef}
          className="flex flex-row flex-wrap justify-center"
          style={{ position: "relative", overflow: "visible" }}
        >
          <div
            className="xl:-ml-32 xl:w-92 md:w-70 w-56 h-auto"
            style={{ position: "relative", overflow: "visible" }}
          >
            <Image
              src="/portrait.png"
              alt="Picture of me (michelle)!"
              width={371}
              height={541}
              className="w-full h-auto"
            />
            <div
              ref={squareRef}
              className="absolute md:block hidden"
              style={{ bottom: "24%", left: "56%", width: 43, height: 43 }}
            >
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="sq_glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                </defs>
                <g filter="url(#sq_glow)" stroke="#E6CCFF" strokeWidth="2">
                  <rect x="7" y="8" width="29" height="27" />
                  <rect x="0" y="1" width="43" height="41" />
                </g>
              </svg>
            </div>
          </div>

          {svgProps && (
            <svg
              className="absolute pointer-events-none md:block hidden"
              style={{
                left: svgProps.offsetX,
                top: svgProps.offsetY,
                overflow: "visible",
                zIndex: 10,
              }}
              width={svgProps.width}
              height={svgProps.height}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter
                  id="line_glow"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.68 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
              <path
                d={svgProps.path}
                stroke="#E6CCFF"
                strokeWidth="2"
                filter="url(#line_glow)"
              />
            </svg>
          )}

          <div
            ref={textRef}
            className="flex md:ml-20 md:mt-0 mt-6 px-6 md:px-0 flex-col gap-4 md:self-end md:translate-x-4"
          >
            <p className="xl:max-w-[23vw] lg:max-w-[30vw] md:max-w-[40vw] max-w-[80vw] text-justify">
              Hello, I'm Michelle Aye, a multidisciplinary full-stack software
              developer based in Singapore, with a background in design and AI
              research. I love turning ideas into meaningful and visually
              engaging digital experiences that drive social good.
            </p>
            <div className="flex flex-row flex-wrap gap-2">
              <a
                href="/MichelleAye_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="-ml-2 cursor-target p-2 hover:cursor-none underline"
              >
                RESUME
              </a>
              <a
                href="mailto:michlaye@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target p-2 hover:cursor-none underline"
              >
                EMAIL
              </a>
              <a
                href="https://www.linkedin.com/in/michelleaye/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target p-2 hover:cursor-none underline"
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/irusuugen"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target p-2 hover:cursor-none underline"
              >
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-12 items-center justify-center w-full max-w-7xl mx-auto">
        <div className="relative w-full max-w-lg aspect-130/135">
          <Image src="/box.svg" alt="box" fill className="object-fill" />
          <div className="h-full flex flex-col gap-2 px-10 py-10 justify-between">
            <div className="mt-4">
              <p className="text-2xl">
                Nanyang Technological University, Singapore
              </p>
              <p className="text-sm mt-1">Aug 2025 - May 2028</p>
              <p className="mt-4">
                Bachelor's Degree in Computer Science (Highest Distinction)
              </p>
            </div>
            <h2 className="font-heading md:text-7xl text-6xl text-shadow-[0_0_12px_#e6ccff]">
              EDUCATION
            </h2>
          </div>
        </div>

        <div className="relative w-full max-w-lg aspect-130/135">
          <Image
            src="/box.svg"
            alt="box"
            fill
            className="object-fill -scale-x-100"
          />
          <div className="h-full flex flex-col gap-2 px-10 py-10 justify-between">
            <h2 className="font-heading md:text-7xl text-6xl mt-4 self-end text-shadow-[0_0_12px_#e6ccff]">
              SKILLS
            </h2>
            <div className="flex flex-col gap-2">
              <p>
                <b>Languages:</b> Python, JavaScript, TypeScript, SQL, HTML, CSS
              </p>
              <p>
                <b>Frameworks & Libraries:</b> React, Django, React Native,
                Three.js, GSAP, PyTorch, NumPy, Pandas
              </p>
              <p>
                <b>Tools:</b> Git, Supabase, Expo, Figma, Canva, Adobe
                Photoshop, Adobe After Effects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
