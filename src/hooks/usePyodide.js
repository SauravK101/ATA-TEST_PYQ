import { useState, useEffect, useRef } from 'react';

export function usePyodide() {
  const [isReady, setIsReady] = useState(false);
  const workerRef = useRef(null);
  const callbackMap = useRef(new Map());
  const idCounter = useRef(0);

  useEffect(() => {
    // Initialize the worker
    workerRef.current = new Worker(new URL('../workers/pyodide.worker.js', import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const data = e.data;
      if (data.id && callbackMap.current.has(data.id)) {
        const { resolve, reject } = callbackMap.current.get(data.id);
        callbackMap.current.delete(data.id);
        if (data.success) {
          resolve({ output: data.output, error: data.error });
        } else {
          reject(new Error(data.error));
        }
      }
    };
    
    // We don't have a specific "ready" message from this simple worker,
    // but we know it's loading. We can just assume it takes a moment.
    // In a more robust setup, the worker would ping back when Pyodide is fully loaded.
    const timer = setTimeout(() => setIsReady(true), 1500);

    return () => {
      clearTimeout(timer);
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const runCode = (code, inputData) => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error("Worker not initialized"));
        return;
      }
      
      const id = ++idCounter.current;
      callbackMap.current.set(id, { resolve, reject });
      
      workerRef.current.postMessage({
        id,
        code,
        inputData
      });
    });
  };

  return { runCode, isReady };
}
