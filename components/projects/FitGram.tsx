import Image from "next/image";

export default function FitGram({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative w-full h-full bg-background text-primary flex flex-col overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 py-2 px-4 border-2 cursor-target hover:cursor-none hover:bg-primary hover:text-background transition-background duration-300"
      >
        CLOSE
      </button>
      <div className="text-justify w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="flex flex-row gap-8 items-center">
          <h1 className="md:text-7xl text-6xl font-heading text-shadow-[0_0_12px_#e6ccff]">
            FitGram
          </h1>
          <a
            href="https://github.com/irusuugen/Fitgram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex hover:cursor-none flex-row gap-2 justify-center items-center cursor-target bg-primary px-2 py-1 h-fit rounded-xs hover:opacity-70"
          >
            <Image src="/github.svg" alt="GitHub icon" width={20} height={20} />
            <p className="text-sm text-background">Github Link</p>
          </a>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 mb-12">
          {[
            "React.js",
            "TypeScript",
            "Supabase",
            "OneMap API",
            "Node.js",
            "Express.js",
            "Tailwind CSS",
          ].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <h2 className="md:text-5xl text-4xl mb-2">About</h2>
        <p className="mb-12">
          Fitgram is a social fitness app that helps people to stay active and
          connected through exercise. It makes fitness fun and interactive by
          allowing users to find new routes and facilities, track their
          workouts, share routes and achievements, and stay motivated within a
          supportive community of fitness enthusiasts.
        </p>

        <h2 className="md:text-5xl text-4xl mb-2">Demo Video</h2>
        <video width="620" height="240" controls preload="metadata">
          <source src="/fitgramdemo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
