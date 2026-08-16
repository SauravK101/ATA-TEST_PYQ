import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Check, Clock, Globe, AlertTriangle } from 'lucide-react';
import { usePyodide } from '../hooks/usePyodide';

export default function RightPanel({ question, code, onCodeChange, onSubmitSuccess, isLastQuestion, onEndTest, timeLimit = 90 * 60 }) {
  const { runCode, isReady } = usePyodide();
  const [outputConsole, setOutputConsole] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showEndModal, setShowEndModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onEndTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onEndTest]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCompileAndRun = async () => {
    if (!isReady || !question?.sample_test_cases) return;
    setIsRunning(true);
    setOutputConsole('Compiling and running sample test cases...\n');

    let allPassed = true;
    let newOutput = '';

    for (let i = 0; i < question.sample_test_cases.length; i++) {
      const tc = question.sample_test_cases[i];
      try {
        const res = await runCode(code, tc.input);
        const actualOutput = res.output;
        const err = res.error;

        newOutput += `\n--- Test Case ${i + 1} ---\n`;
        if (err) {
          newOutput += `Error:\n${err}\n`;
          allPassed = false;
        } else {
          newOutput += `Input:\n${tc.input}\n`;
          newOutput += `Expected Output:\n${tc.output}\n`;
          newOutput += `Actual Output:\n${actualOutput}\n`;
          if (actualOutput.trim() === tc.output.trim()) {
            newOutput += 'Result: PASSED ✅\n';
          } else {
            newOutput += 'Result: FAILED ❌\n';
            allPassed = false;
          }
        }
      } catch (e) {
        newOutput += `\n--- Test Case ${i + 1} ---\nExecution Error: ${e.message}\n`;
        allPassed = false;
      }
    }

    setOutputConsole(prev => prev + newOutput);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!isReady) return;
    setIsRunning(true);
    setOutputConsole('Submitting code and running test cases...\n');

    let allPassed = true;

    // Combining sample and hidden tests safely based on JSON structure
    const allTests = [...(question?.sample_test_cases || []), ...(question?.hidden_test_cases || [])];

    if (allTests.length === 0) {
      setOutputConsole(prev => prev + '\nNo test cases found to evaluate.');
      setIsRunning(false);
      return;
    }

    for (let i = 0; i < allTests.length; i++) {
      const tc = allTests[i];
      try {
        const res = await runCode(code, tc.input);
        if (res.error || res.output.trim() !== tc.output.trim()) {
          allPassed = false;
          break;
        }
      } catch (e) {
        allPassed = false;
        break;
      }
    }

    if (allPassed) {
      setOutputConsole(prev => prev + '\nAll test cases PASSED! ✅\nMoving to next step...');
      setTimeout(() => {
        onSubmitSuccess();
        setOutputConsole('');
      }, 1500);
    } else {
      setOutputConsole(prev => prev + '\nSome test cases FAILED. ❌\nPlease check your logic and try again.');
    }
    setIsRunning(false);
  };

  return (
    <>
      <div className="h-full flex flex-col bg-nocturne-bg text-nocturne-text relative z-0">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-nocturne-border bg-nocturne-surface-alt">
          <div className="flex items-center gap-2 text-sm text-nocturne-success">
            <Globe className="w-4 h-4" />
            <span>Internet Status: Online</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-nocturne-text font-[family-name:--font-mono] bg-nocturne-bg px-3 py-1.5 rounded border border-nocturne-border">
              <Clock className="w-4 h-4 text-nocturne-accent" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => setShowEndModal(true)}
              className="text-sm px-3 py-1.5 rounded-lg border border-nocturne-pink text-nocturne-pink hover:bg-nocturne-pink hover:text-nocturne-bg transition-colors font-medium"
            >
              End Test
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative border-b border-nocturne-border min-h-[40%]">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={onCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "JetBrains Mono, monospace",
              padding: { top: 16 },
              scrollBeyondLastLine: false,
            }}
          />
          {!isReady && (
            <div className="absolute inset-0 bg-nocturne-bg/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="w-8 h-8 border-4 border-nocturne-border border-t-nocturne-accent rounded-full animate-spin mb-4"></div>
              <span className="text-nocturne-text font-medium">Initializing Pyodide Environment...</span>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center p-3 bg-nocturne-surface-alt border-b border-nocturne-border">
          <div className="text-xs text-nocturne-text-secondary">Python 3.11 (Pyodide)</div>
          <div className="flex gap-3">
            <button
              onClick={handleCompileAndRun}
              disabled={!isReady || isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-nocturne-border bg-nocturne-surface hover:bg-nocturne-border text-nocturne-text transition-colors disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>Compile & Run</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isReady || isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nocturne-accent hover:bg-nocturne-accent/80 text-white transition-colors disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Submit Code</span>
            </button>
          </div>
        </div>

        {/* Output Console */}
        <div className="h-64 bg-nocturne-bg p-4 overflow-y-auto font-[family-name:--font-mono] text-sm flex flex-col">
          <div className="text-nocturne-text-tertiary mb-2 border-b border-nocturne-border pb-1">Output Console</div>
          <pre className="whitespace-pre-wrap text-nocturne-text">
            {outputConsole || 'Run your code to see the output here...'}
          </pre>
        </div>
      </div>

      {/* End Test Modal (Glassmorphism) */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <div className="bg-nocturne-surface/80 border border-nocturne-border rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            {/* Subtle red glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-nocturne-pink/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-nocturne-pink/10 rounded-full text-nocturne-pink">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-[family-name:--font-serif] text-white">End Test Early?</h2>
            </div>

            <p className="text-nocturne-text-secondary mb-8 leading-relaxed">
              Are you sure you want to end the test early? Any unsubmitted questions will be scored as 0.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowEndModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-nocturne-border bg-transparent hover:bg-nocturne-surface-alt transition-colors text-nocturne-text"
              >
                Cancel
              </button>
              <button
                onClick={onEndTest}
                className="flex-1 px-4 py-3 rounded-xl bg-nocturne-pink hover:bg-nocturne-pink/80 transition-colors text-nocturne-bg font-medium shadow-lg shadow-nocturne-pink/20"
              >
                Confirm & End Test
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}