import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import bgImage from '../../background.png';

export default function HomePage() {
  const [questionSets, setQuestionSets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically import all JSON files from the questions directory
    const modules = import.meta.glob('../../questions/*.json', { eager: true });

    const sets = Object.keys(modules).map((path) => {
      // Extract filename without extension, e.g., 'question-set-1'
      const match = path.match(/\/([^/]+)\.json$/);
      const id = match ? match[1] : 'unknown';
      // Capitalize and format for display
      const title = id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { id, title };
    });

    // Sort by extracted ID for predictable order
    sets.sort((a, b) => a.id.localeCompare(b.id));
    setQuestionSets(sets);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="glass-panel max-w-4xl w-full p-10 sm:p-14 rounded-[24px] flex flex-col items-center shadow-2xl relative overflow-hidden">

        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-nocturne-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-nocturne-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-nocturne-text font-[family-name:--font-serif] font-medium tracking-tight mb-4 z-10">
          ATA TEST PYQ
        </h1>
        <p className="text-nocturne-text-secondary text-center text-base md:text-lg mb-12 max-w-2xl z-10">
          Welcome to the Python Practice Platform. Select a question set below to begin your coding assessment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full z-10">
          {questionSets.map((set) => (
            <button
              key={set.id}
              onClick={() => navigate(`/test/${set.id}`)}
              className="flex items-center gap-4 p-6 rounded-xl bg-nocturne-surface/40 border border-nocturne-border hover:bg-nocturne-surface/70 hover:border-nocturne-accent transition-all duration-300 group text-left"
            >
              <div className="bg-nocturne-surface p-3 rounded-lg border border-nocturne-border group-hover:bg-nocturne-accent group-hover:border-nocturne-accent group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6 text-nocturne-text-secondary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-nocturne-text group-hover:text-white transition-colors">
                  {set.title}
                </h3>
                <p className="text-sm text-nocturne-text-secondary mt-1">
                  Start Practice
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
