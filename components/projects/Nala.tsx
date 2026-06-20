import Image from "next/image";

export default function Nala({ onClose }: { onClose: () => void }) {
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
            NALA LearnScape
          </h1>
          <a
            href="https://github.com/yjjunnie/NALA-LearnScape"
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
            3rd Place in Reimagine Learning Analytics Hackathon 2025 <br />
            Presented at AI for Education Conference 2025
          </i>
        </p>
        <div className="flex flex-wrap gap-2 mt-4 mb-12">
          {[
            "React.js",
            "TypeScript",
            "Python",
            "Django",
            "MySQL",
            "Gemini API",
            "Docker",
            "Machine Learning",
          ].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <h2 className="md:text-5xl text-4xl mb-4">About</h2>
        <ul className="list-disc pl-8 space-y-2 mb-12">
          <li>
            NTU&apos;s NALA chatbot is widely used by students for coursework
            help, but it creates over-reliance on its answers instead of
            building independent problem-solving skills
          </li>
          <li>
            NALA Learnscape counters this by using learning analytics and
            evidence-based pedagogy to nudge students toward active,
            self-directed learning rather than passive answer-retrieval
          </li>
          <li>
            Grounded in Bloom&apos;s Taxonomy — six increasingly complex
            cognitive stages (remembering → understanding → applying → analysing
            → evaluating → creating)
          </li>
          <li>
            Used as the framework for quantifying a student&apos;s mastery of a
            topic, and for shaping what kind of support they&apos;re nudged
            toward next
          </li>
        </ul>

        <h2 className="md:text-5xl text-4xl mb-4">Features</h2>
        <h3 className="md:text-4xl text-3xl mb-4">Main Dashboard</h3>
        <Image
          src="/nala/dashboard.png"
          alt="NALA Learnscape main dashboard with study scheduler, learning strategy chart, concept map widget, and personalised guidance"
          width={1280}
          height={800}
        />

        <div className="mt-6 space-y-8">
          <div>
            <h4 className="md:text-2xl text-xl mb-2 italic">
              Automatic Daily Study Scheduler
            </h4>
            <ul className="list-disc pl-8 space-y-1">
              <li>
                A prediction model estimates hours needed per topic using the
                student&apos;s grade history, current Bloom&apos;s level for the
                topic, and the topic difficulty
              </li>
              <li>
                Trained and compared seven regression approaches — Random
                Forest, XGBoost, CatBoost, Gradient Boosting, Decision Tree,
                AdaBoost, and Linear Regression — and selected Random Forest
                based on performance
              </li>
              <li>
                Predicted study blocks are arranged around the student&apos;s
                preferred start time, session length, and break duration
              </li>
              <li>Refreshes daily and supports drag-and-drop adjustment</li>
            </ul>
          </div>

          <div>
            <h4 className="md:text-2xl text-xl mb-2 italic">
              Learning Strategy Chart
            </h4>
            <ul className="list-disc pl-8 space-y-1">
              <li>
                Student&apos;s preferred learning strategies are inferred by
                calling the Gemini API to classify each chatbot response against
                common learning strategies
              </li>
              <li>
                Implemented via prompt engineering against the Gemini model
              </li>
            </ul>
          </div>

          <div>
            <h4 className="md:text-2xl text-xl mb-2 italic">
              Concept Map Widget
            </h4>
            <ul className="list-disc pl-8 space-y-1">
              <li>
                Quick access to the concept map of the student&apos;s weakest
                module, toggleable to view other modules
              </li>
            </ul>
          </div>

          <div>
            <h4 className="md:text-2xl text-xl mb-2 italic">
              Personalised Guidance
            </h4>
            <ul className="list-disc pl-8 space-y-1">
              <li>
                Recommends whether to change or stick to their learning
                preference based on grade history
              </li>
              <li>
                Showcases the module with the most improvement and what they did
                for the module in terms of method, hours, and number of
                questions
              </li>
              <li>
                Highlights the student&apos;s weakest module and recommends
                practice questions and reviewing of notes
              </li>
            </ul>
          </div>
        </div>

        <h3 className="md:text-4xl text-3xl mt-12 mb-4">Modules Catalogue</h3>
        <Image
          src="/nala/modules.png"
          alt="NALA Learnscape modules catalogue showing each module with the student's Bloom's mastery level"
          width={1280}
          height={800}
        />
        <ul className="list-disc pl-8 space-y-2 mt-4">
          <li>
            Gives access to each module the student is studying, with their
            overall Bloom&apos;s mastery indicated
          </li>
          <li>
            Student mastery is inferred by calling the Gemini API to classify
            each chatbot response against Bloom&apos;s Taxonomy (1–6)
          </li>
          <li>
            Per-topic scores are averaged into a running mastery level, which
            updates incrementally as the student generates new chatbot responses
          </li>
          <li>Implemented via prompt engineering against Gemini</li>
        </ul>

        <h3 className="md:text-4xl text-3xl mt-12 mb-4">Concept Maps</h3>
        <Image
          src="/nala/conceptmap.png"
          alt="NALA Learnscape concept map showing major topics, sub-concepts, and their relationships"
          width={1280}
          height={800}
        />
        <ul className="list-disc pl-8 space-y-2 mt-4">
          <li>
            Each module has a concept map that displays all important concepts
            and how they are linked to each other, to help students understand
            the relationships between concepts for better learning
          </li>
          <li>
            Each large node represents a major topic, and smaller nodes
            represent concepts within the topic
          </li>
          <li>
            The number on the large node indicates the student&apos;s level of
            mastery on the topic, ranging from 1–5 (follows Bloom&apos;s
            Taxonomy)
          </li>
        </ul>

        <h3 className="md:text-4xl text-3xl mt-12 mb-4">Knowledge Capsules</h3>
        <Image
          src="/nala/notes.png"
          alt="NALA Learnscape AI-generated notes for a topic, editable by students"
          width={1280}
          height={800}
        />
        <ul className="list-disc pl-8 space-y-2 mt-4">
          <li>Each topic comes with AI-generated notes</li>
          <li>Notes are editable by students for their own personalisation</li>
        </ul>

        <h2 className="md:text-5xl text-4xl mb-2 mt-12">Conference Poster</h2>
        <p className="mb-2">Presented at AI For Education Conference 2025</p>
        <Image
          src="/nalaposter.png"
          alt="NALA Learnscape conference poster presented at AI For Education Conference 2025"
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}
