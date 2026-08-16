// Load pyodide script
importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodide = null;

async function initPyodide() {
  if (!pyodide) {
    pyodide = await loadPyodide();
  }
}

// Ensure it starts loading immediately
let pyodideReadyPromise = initPyodide();

self.onmessage = async (event) => {
  // 1. Provide a fallback for inputData to prevent 'undefined' crashes
  const { id, code, inputData = "" } = event.data;

  try {
    await pyodideReadyPromise;

    // 2. Safely pass JS variables to Python globals (prevents injection syntax errors)
    pyodide.globals.set("user_code", code);
    pyodide.globals.set("user_input", inputData);

    const pythonWrapper = `
import sys
import io
import json
import traceback

class MockInput:
    def __init__(self, inputs):
        # Handle empty inputs gracefully
        self.inputs = inputs.split('\\n') if inputs else []
        self.index = 0

    def readline(self):
        if self.index < len(self.inputs):
            res = self.inputs[self.index]
            self.index += 1
            return res + "\\n"
        return ""

sys.stdin = MockInput(user_input)
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

output_str = ""
error_str = ""

try:
    # Execute the user code safely from the global variable
    exec(user_code)
    output_str = sys.stdout.getvalue()
except Exception:
    error_str = traceback.format_exc()
    output_str = sys.stdout.getvalue()

# 3. Return JSON to avoid Pyodide Map conversion issues in JS
json.dumps({
    "output": output_str,
    "error": error_str
})
`;

    // Run the wrapper and parse the resulting JSON string
    const resultJson = await pyodide.runPythonAsync(pythonWrapper);
    const resultObj = JSON.parse(resultJson);

    // Spread now works perfectly because resultObj is a standard JS Object
    self.postMessage({ id, success: true, ...resultObj });

  } catch (err) {
    self.postMessage({ id, success: false, error: err.message });
  }
};