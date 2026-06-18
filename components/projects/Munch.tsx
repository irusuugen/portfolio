export default function Munch({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative w-full h-full bg-background text-primary flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 py-2 px-4 border-2 cursor-target hover:bg-primary hover:text-background transition-background duration-300"
      >
        CLOSE
      </button>

      <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
        <h3 className="text-8xl font-heading">Munch</h3>
        <p className="max-w-lg text-center">
          A food discovery app with AI-powered meal recommendations. Built with
          React Native, Node.js, and OpenAI.
        </p>
      </div>
    </div>
  );
}
