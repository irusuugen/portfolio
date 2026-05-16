"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(643);
  const [textHeight, setTextHeight] = useState(204);

  useEffect(() => {
    if (!textRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setLineWidth(entry.contentRect.width + 270);
      setTextHeight(entry.contentRect.height);
    });
    observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  const riseTop = 254 - textHeight;
  const svgViewHeight = 254 + 30;

  return (
    <div className="w-screen md:h-[125vh] h-[200vh] flex flex-col items-center justify-center gap-16">
      <div className="flex xl:flex-row flex-col items-center justify-center">
        <h2 className="md:text-9xl text-6xl font-heading xl:-rotate-90 xl:-ml-64 text-shadow-[0_0_12px_#e6ccff]">
          ABOUT ME
        </h2>
        <div className="flex relative flex-row flex-wrap justify-center [overflow-y:clip]">
          <Image
            src="/portrait.png"
            alt="Picture of me (michelle)!"
            width={371}
            height={541}
            className="xl:-ml-32 xl:w-92.75 md:w-70 h-auto"
          />
          <div className="absolute xl:bottom-[-184%] xl:left-[10%] md:block hidden shrink-0 md:min-w-200 md:min-h-323 md:bottom-[-246%] md:left-[14%]">
            <svg
              width={lineWidth}
              height={svgViewHeight + 50}
              viewBox={`0 0 ${lineWidth} ${svgViewHeight}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter
                  id="filter0_d_252_8"
                  x="-5%"
                  y="-5%"
                  width="110%"
                  height="110%"
                  filterUnits="objectBoundingBox"
                  colorInterpolationFilters="sRGB"
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
                    result="effect1_dropShadow_252_8"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_252_8"
                    result="shape"
                  />
                </filter>
              </defs>
              <g
                filter="url(#filter0_d_252_8)"
                stroke="#E6CCFF"
                strokeWidth="2"
              >
                <path id="line-start" d="M61 139.5H130.5" />
                <path id="line-drop" d="M130.5 139.5L190 254" />
                <path id="line-base" d="M190 254H241" />
                <path id="line-rise" d={`M241 254V${riseTop}`} />
                <path
                  id="line-peak"
                  d={`M241 ${riseTop}L270 ${riseTop - 20}`}
                />
                <line
                  x1="270"
                  y1={riseTop - 20}
                  x2={lineWidth}
                  y2={riseTop - 20}
                />
                <path id="square-inner" d="M18 122H54V156H18V122Z" />
                <path id="square-outer" d="M11 114H61V164H11V114Z" />
              </g>
            </svg>
          </div>
          <div
            ref={textRef}
            className="flex md:px-0 md:mt-0 mt-6 px-20 md:ml-20 flex-col gap-4 md:translate-x-4 md:self-end"
          >
            <p className="xl:max-w-[23vw] lg:max-w-[30vw] md:max-w-[40vw] text-justify">
              Hello, I'm Michelle Aye, a multidisciplinary full-stack software
              developer based in Singapore, with a background in design and AI
              research. I love turning ideas into meaningful and visually
              engaging digital experiences that drive social good.
            </p>
            <div className="flex flex-row gap-2">
              <a
                href="https://drive.google.com/file/d/1oEZpR5kOT092rO_f2nE8IlClJ8swsq1q/view?usp=drive_link"
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

      <div className="flex md:flex-row flex-col gap-12 items-center justify-center">
        <div className="relative shrink xl:w-130 xl:h-135.25 lg:w-120 lg:h-138 md:w-100 md:h-138 w-100 h-120">
          <Image src="/box.svg" alt="box" fill className="object-fill" />
          <div className="h-full flex flex-col gap-2 px-12 xl:py-8 lg:py-12 lg:px-12 md:py-20 md:px-8 py-12 justify-between">
            <div className="mt-8">
              <p className="text-2xl">
                Nanyang Technological University, Singapore
              </p>
              <p className="text-sm">Aug 2025 - May 2028</p>
              <p className="mt-4">
                Bachelor's Degree in Computer Science (Highest Distinction)
              </p>
            </div>
            <h2 className="font-heading md:text-7xl text-6xl text-shadow-[0_0_12px_#e6ccff]">
              EDUCATION
            </h2>
          </div>
        </div>
        <div className="relative shrink xl:w-130 xl:h-135.25 lg:w-120 lg:h-138 md:w-100 md:h-138 w-100 h-120">
          <Image
            src="/box.svg"
            alt="box"
            fill
            className="object-fill -scale-x-100"
          />
          <div className="h-full flex flex-col gap-2 px-12 xl:py-8 lg:py-12 lg:px-12 md:py-20 md:px-8 py-12 justify-between">
            <h2 className="font-heading md:text-7xl text-6xl mt-5 self-end text-shadow-[0_0_12px_#e6ccff]">
              SKILLS
            </h2>
            <div className="flex flex-col gap-2 lg:mb-0 mb-2">
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
