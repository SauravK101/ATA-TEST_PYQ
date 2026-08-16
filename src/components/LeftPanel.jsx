import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeftPanel({
  question,
  questionsCount,
  currentQIndex,
  questionStatuses,
  onNavigate
}) {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-nocturne-bg text-nocturne-text">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-nocturne-border">
        <button
          onClick={() => navigate('/')}
          className="mr-4 p-2 rounded hover:bg-nocturne-surface transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-nocturne-text-secondary hover:text-white" />
        </button>
        <h2 className="text-xl font-medium font-[family-name:--font-serif]">
          Question {currentQIndex + 1} of {questionsCount}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Question Content */}
        <div>
          <h1 className="text-3xl font-[family-name:--font-serif] mb-4">{question?.title}</h1>

          <div className="text-base text-nocturne-text-secondary leading-relaxed space-y-4">
            {question?.given && (
              <p className="whitespace-pre-wrap"><strong className="text-nocturne-text">Problem Statement:</strong> {question.given}</p>
            )}
            {question?.ask && (
              <p className="whitespace-pre-wrap"><strong className="text-nocturne-text">Task:</strong> {question.ask}</p>
            )}
          </div>
        </div>

        {/* Requirements - Parameters */}
        {question?.requirements?.parameters && (
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-medium text-nocturne-text border-b border-nocturne-border pb-2">Parameters</h3>
            <ul className="list-disc list-inside text-nocturne-text-secondary space-y-2">
              {question.requirements.parameters.map((param, idx) => (
                <li key={idx} className="leading-relaxed">
                  <code className="text-nocturne-accent bg-nocturne-surface px-1.5 py-0.5 rounded text-sm font-[family-name:--font-mono]">{param.name}</code>
                  <span className="italic ml-1">({param.type})</span>: {param.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Edge Cases */}
        {question?.edge_cases && question.edge_cases.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-lg font-medium text-nocturne-text border-b border-nocturne-border pb-2">Edge Cases</h3>
            <ul className="list-disc list-inside text-nocturne-text-secondary space-y-2">
              {question.edge_cases.map((ec, idx) => (
                <li key={idx}>
                  If <em className="text-nocturne-text">{ec.condition}</em>, return <code className="text-nocturne-pink bg-nocturne-surface px-1.5 py-0.5 rounded text-sm font-[family-name:--font-mono]">"{ec.return}"</code>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6 bg-nocturne-surface-alt p-4 rounded-lg border border-nocturne-border">
          {question?.input_format && (
            <div>
              <h3 className="text-xs font-semibold text-nocturne-text-tertiary uppercase tracking-wider mb-1">Input Format</h3>
              <div className="text-nocturne-text-secondary text-sm">{question.input_format}</div>
            </div>
          )}
          {question?.output_format && (
            <div>
              <h3 className="text-xs font-semibold text-nocturne-text-tertiary uppercase tracking-wider mb-1">Output Format</h3>
              <div className="text-nocturne-text-secondary text-sm">{question.output_format}</div>
            </div>
          )}
        </div>

        {/* Sample Test Cases */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-medium text-nocturne-text border-b border-nocturne-border pb-2">Sample Test Cases</h3>
          {question?.sample_test_cases?.map((tc, idx) => (
            <div key={idx} className="bg-nocturne-surface border border-nocturne-border rounded-lg p-4 font-[family-name:--font-mono] text-sm shadow-sm">
              <div className="mb-3">
                <span className="text-xs font-semibold text-nocturne-text-tertiary uppercase tracking-wider">Input:</span>
                <pre className="mt-1 bg-nocturne-bg p-3 rounded border border-white/5 whitespace-pre-wrap">{tc.input}</pre>
              </div>
              <div>
                <span className="text-xs font-semibold text-nocturne-text-tertiary uppercase tracking-wider">Expected Output:</span>
                <pre className="mt-1 bg-nocturne-bg p-3 rounded border border-white/5 whitespace-pre-wrap">{tc.output}</pre>
              </div>
            </div>
          ))}
          {(!question?.sample_test_cases || question.sample_test_cases.length === 0) && (
            <div className="text-nocturne-text-secondary italic">No sample test cases provided.</div>
          )}
        </div>
      </div>

      {/* Navigation Grid Sidebar (Bottom area) */}
      <div className="p-4 border-t border-nocturne-border bg-nocturne-surface-alt">
        <h4 className="text-sm text-nocturne-text-secondary mb-3">Question Navigation</h4>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: questionsCount }).map((_, idx) => {
            const status = questionStatuses[idx];
            let bgClass = "bg-nocturne-surface border-nocturne-border text-nocturne-text-secondary";

            if (status === 'Answered') bgClass = "bg-nocturne-success text-white border-nocturne-success";
            else if (status === 'Skipped') bgClass = "bg-nocturne-pink text-nocturne-bg border-nocturne-pink font-medium";

            if (idx === currentQIndex) {
              bgClass += " ring-2 ring-nocturne-accent ring-offset-2 ring-offset-nocturne-bg";
            }

            return (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`w-10 h-10 flex items-center justify-center rounded border hover:opacity-80 transition-opacity ${bgClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-nocturne-text-tertiary">
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-nocturne-success"></span> Answered</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-nocturne-pink"></span> Skipped</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-nocturne-surface border border-nocturne-border"></span> Not Viewed</div>
        </div>
      </div>
    </div>
  );
}