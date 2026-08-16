import { useLocation, useNavigate } from 'react-router-dom';
import { Award, ArrowLeft, RotateCcw } from 'lucide-react';
import { useMemo } from 'react';
import bgImage from '../../background.png';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default values just in case navigated directly
  const { score = 0, total = 0, answeredCount = 0 } = location.state || {};

  const memePath = useMemo(() => {
    let category;
    if (score >= 80) category = 'good';
    else if (score >= 50) category = 'average';
    else category = 'low';

    const memes = {
      good: ['good-score-meme-1.jpg', 'good-score-meme-2.jpg', 'good-score-meme-3.jpg'],
      average: ['average-score-meme-1.jpg', 'average-score-meme-2.jpg', 'average-score-meme-3.jpg'],
      low: ['low-score-meme-1.jpg', 'low-score-meme-2.jpg', 'low-score-meme-3.png']
    };
    
    const categoryMemes = memes[category];
    const randomIndex = Math.floor(Math.random() * categoryMemes.length);
    return `/memes/${categoryMemes[randomIndex]}`;
  }, [score]);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-6 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="glass-panel max-w-2xl w-full p-10 sm:p-14 rounded-[24px] flex flex-col items-center shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-nocturne-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-nocturne-success/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="bg-nocturne-surface p-4 rounded-2xl border border-nocturne-border mb-6 z-10 shadow-lg">
          <Award className={`w-16 h-16 ${score >= 70 ? 'text-nocturne-success' : 'text-nocturne-accent'}`} />
        </div>

        <h1 className="text-4xl md:text-5xl text-center text-nocturne-text font-[family-name:--font-serif] font-medium tracking-tight mb-2 z-10">
          Test Completed
        </h1>
        <p className="text-nocturne-text-secondary text-center text-base md:text-lg mb-8 z-10">
          You've successfully finished the coding assessment.
        </p>

        <div className="flex flex-col items-center justify-center mb-8 w-full z-10">
          <div className="text-7xl font-bold font-[family-name:--font-mono] tracking-tighter text-white mb-4">
            {score}%
          </div>
          <div className="flex gap-8 text-center text-nocturne-text-secondary">
            <div>
              <div className="text-xl font-medium text-nocturne-text">{answeredCount}</div>
              <div className="text-sm uppercase tracking-wide opacity-80">Correct</div>
            </div>
            <div className="w-px bg-nocturne-border h-12"></div>
            <div>
              <div className="text-xl font-medium text-nocturne-text">{total}</div>
              <div className="text-sm uppercase tracking-wide opacity-80">Total</div>
            </div>
            <div className="w-px bg-nocturne-border h-12"></div>
            <div>
              <div className="text-xl font-medium text-nocturne-text">{total - answeredCount}</div>
              <div className="text-sm uppercase tracking-wide opacity-80">Missed</div>
            </div>
          </div>
        </div>

        {/* Meme Section */}
        <div className="mb-10 z-10 flex flex-col items-center">
          <p className="text-nocturne-text-secondary mb-4 font-medium uppercase tracking-widest text-sm opacity-80">Performance Reaction</p>
          <div className="relative group rounded-xl overflow-hidden border border-nocturne-border/50 bg-nocturne-surface-alt/50 p-2 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
            <img src={memePath} alt="Score reaction meme" className="w-full max-w-[280px] sm:max-w-[320px] rounded-lg h-auto object-contain" />
          </div>
        </div>

        <div className="flex gap-4 w-full z-10">
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-nocturne-surface/60 border border-nocturne-border hover:bg-nocturne-surface hover:border-nocturne-text-secondary transition-all duration-300 text-nocturne-text font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Home
          </button>
          
          <button
            onClick={() => navigate('/')} // Or specific test path if supported
            className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-nocturne-accent hover:bg-nocturne-accent/80 transition-all duration-300 text-white font-medium border border-nocturne-accent/50 shadow-lg shadow-nocturne-accent/20"
          >
            <RotateCcw className="w-5 h-5" />
            Try Another Set
          </button>
        </div>
      </div>
    </div>
  );
}
