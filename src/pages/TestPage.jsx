import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';

export default function TestPage() {
  const { setId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState({}); // { 0: 'Answered', 1: 'Skipped', 2: 'Not Viewed' }
  const [userCodes, setUserCodes] = useState({}); // { 0: 'def my_func():...' }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import of the question set
    import(`../../questions/${setId}.json`)
      .then((module) => {
        const qList = module.default;
        setQuestions(qList);

        // Initialize statuses and code stubs
        const initialStatuses = {};
        const initialCodes = {};

        qList.forEach((q, idx) => {
          initialStatuses[idx] = 'Not Viewed';
          // Fixed: changed q.codeStub to q.code_stub to match JSON
          initialCodes[idx] = q.code_stub || '';
        });

        setQuestionStatuses(initialStatuses);
        setUserCodes(initialCodes);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load question set:', err);
        navigate('/');
      });
  }, [setId, navigate]);

  const handleEndTest = useCallback(() => {
    // We calculate based on the latest state by using a state updater callback,
    // or since this is just redirecting, we can use the latest questionStatuses value.
    setQuestionStatuses(currentStatuses => {
      let answeredCount = 0;
      Object.values(currentStatuses).forEach(status => {
        if (status === 'Answered') answeredCount++;
      });

      const total = questions.length;
      const score = Math.round((answeredCount / total) * 100) || 0;

      navigate('/results', { state: { score, total, answeredCount } });
      return currentStatuses;
    });
  }, [navigate, questions.length]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-nocturne-bg">
        <div className="text-xl text-nocturne-text">Loading Question Bank...</div>
      </div>
    );
  }

  const handleNavigateQuestion = (index) => {
    if (questionStatuses[currentQIndex] === 'Not Viewed') {
      setQuestionStatuses(prev => ({ ...prev, [currentQIndex]: 'Skipped' }));
    }
    setCurrentQIndex(index);
  };

  const currentQuestion = questions[currentQIndex];
  const activeCode = userCodes[currentQIndex] || '';

  const handleCodeChange = (newCode) => {
    setUserCodes(prev => ({ ...prev, [currentQIndex]: newCode }));
  };

  const markAnsweredAndAdvance = () => {
    setQuestionStatuses(prev => ({ ...prev, [currentQIndex]: 'Answered' }));

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const isLastQuestion = currentQIndex === questions.length - 1;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-nocturne-bg font-[family-name:--font-sans] text-nocturne-text">
      {/* Split Pane - 50% / 50% roughly on desktop */}
      <div className="flex h-full w-1/2 flex-col border-r border-nocturne-border">
        <LeftPanel
          question={currentQuestion}
          questionsCount={questions.length}
          currentQIndex={currentQIndex}
          questionStatuses={questionStatuses}
          onNavigate={handleNavigateQuestion}
        />
      </div>

      <div className="flex h-full w-1/2 flex-col bg-nocturne-surface">
        <RightPanel
          question={currentQuestion}
          code={activeCode}
          onCodeChange={handleCodeChange}
          onSubmitSuccess={markAnsweredAndAdvance}
          isLastQuestion={isLastQuestion}
          onEndTest={handleEndTest}
          timeLimit={setId === 'question-set-2' ? 120 * 60 : 90 * 60}
        />
      </div>
    </div>
  );
}