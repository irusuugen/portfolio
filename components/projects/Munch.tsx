import Image from "next/image";

export default function Munch({ onClose }: { onClose: () => void }) {
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
            Munch
          </h1>
          <a
            href="https://github.com/WinterK0101/SigmaBites/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex hover:cursor-none flex-row gap-2 justify-center items-center cursor-target bg-primary px-2 py-1 h-fit rounded-xs hover:opacity-70"
          >
            <Image src="/github.svg" alt="GitHub icon" width={20} height={20} />
            <p className="text-sm text-background">Github Link</p>
          </a>
        </div>
        <p className="text-base opacity-80">
          <i>
            In Process of Launching & Winner of iLab's SummerBuild Hackathon
            2025
          </i>
        </p>
        <div className="flex flex-wrap gap-2 mt-4 mb-12">
          {[
            "React Native",
            "Expo",
            "TypeScript",
            "Supabase",
            "Google Places API",
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
          Munch is a mobile app that turns eating into a fun and social
          experience. Whether you’re alone and want to browse food options, or
          you’re with a group and craving a finger-snap decision, Sigma Bites
          has you covered! Using the Google Places API, it searches for eateries
          based on your location and preferences, and curates a list of places
          that you can swipe through by yourself, or with your friends (think
          Tinder, but for food). Besides swiping through your eateries, you’re
          also able to track your latest food adventures and favourite spots,
          and explore your friends’ latest munches.
        </p>

        <h2 className="md:text-5xl text-4xl mb-2">Demo Video</h2>
        <p className="mb-2">
          PS: We renamed the app from "Sigma Bites" to "Munch", but the features
          remain the same!
        </p>
        <iframe
          src="https://www.youtube.com/embed/YrRM_lAp6yI"
          className="w-full aspect-video"
          allowFullScreen
        />
      </div>
    </div>
  );
}
