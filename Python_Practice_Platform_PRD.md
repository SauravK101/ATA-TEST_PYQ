# Product Requirements Document (PRD)
## Client-Side Python Practice Platform

**Project Initiative:** OneIncs Connect  
**Document Purpose:** To serve as a step-by-step implementation guide for an AI coding agent to build a browser-based Python practice application.

---

## 1. Product Vision & Objective
To build a fully client-side, browser-based Python coding assessment and practice platform. Expanding on prior concepts in interactive educational tools—such as quiz applications and learning management systems—this platform provides a seamless, zero-latency coding environment. By leveraging WebAssembly (Pyodide), the platform requires no backend servers for code execution, ensuring 100% free hosting and unlimited scalability.

## 2. Target Audience
- Students and candidates practicing for Python coding interviews or academic exams.
- Educators needing a free, reliable platform to administer timed coding tests.

## 3. Core Features & Requirements

### 3.1. User Interface (Split-Screen Layout)
- **Left Panel (Question & Context):**
  - Displays the current question number, title, description, and rules.
  - Shows sample test cases (Input / Expected Output).
  - Contains a question navigation grid/sidebar displaying statuses: *Answered, Bookmarked, Skipped, Not Viewed*.
- **Right Panel (Code Editor):**
  - Features a syntax-highlighted code editor (Monaco Editor) customized for Python.
  - A top status bar showing "Internet Status: Online" and a countdown Timer.
  - Action buttons: "Compile & Run" and "Submit Code".
  - A bottom output console to display test case results, compilation errors, or standard output.

### 3.2. Code Execution Engine (Pyodide)
- Must execute Python code entirely in the user's browser.
- Must capture `sys.stdout` (print statements) and mock `sys.stdin` (input statements) to pass test case data dynamically into the user's script.
- Support standard Python libraries available in Pyodide.

### 3.3. Assessment Logic
- **Compile & Run:** Executes the code against visible *Sample Test Cases*. Does not advance the question. Displays actual vs. expected output.
- **Submit Code:** Executes the code against *Hidden Test Cases*. Marks the question as "Answered", records the score (if applicable), and automatically transitions to the next question.
- **Time Limit:** A configurable global timer (e.g., 60 minutes) that auto-submits the entire exam when it reaches 00:00.

### 3.4. Data Ingestion (.md and Design Docs)
- Since questions exist in `.md` format, the platform will utilize a parser (like `gray-matter` or `marked`) to convert markdown files into the `QUESTION_BANK` state upon build or load.
- Metadata (time limits, test cases) should be extractable from the markdown frontmatter or structured JSON alongside the `.md` files.

---

## 4. Technical Specifications & Stack

- **Frontend Framework:** React (via Vite) or Next.js (Static Export).
- **Styling:** Tailwind CSS for rapid UI replication of the design docs, plus `react-resizable-panels` for the drag-to-resize split screen.
- **Code Editor:** `@monaco-editor/react` (VS Code's underlying editor).
- **Execution Engine:** `pyodide` (WebAssembly Python runtime).
- **Hosting / Deployment:** Vercel, Netlify, or GitHub Pages (Free Tier).
- **State Management:** React Context API or Zustand (to manage question statuses, timer, and user code buffers).

---

## 5. AI Agent Implementation Plan (Step-by-Step)

To effectively prompt an AI agent (like Cursor, GitHub Copilot Workspace, or a standalone CLI agent), execute the following phases in order:

### Phase 1: Scaffold & Split-Screen Layout
1. Initialize a React+Vite project with Tailwind CSS.
2. Build the core layout using a split-pane structure (50% left, 50% right).
3. Implement the top header (Question info, Timer component).
4. Implement the bottom action bar (Compile & Run, Submit Code).

### Phase 2: Data Parsing & Navigation
1. Create a script or utility to parse the existing `.md` question files.
2. Load the parsed data into a global state array.
3. Build the Question Navigation sidebar (Number buttons, Next/Prev logic).
4. Map the left panel UI to display the current question's `title`, `description`, and `sampleTestCases`.

### Phase 3: Monaco Editor Integration
1. Install `@monaco-editor/react`.
2. Render the editor in the right panel.
3. Bind the editor's value to the current question's `codeStub`.
4. Ensure code changes are saved in the state when the user navigates between questions (so they don't lose their work).

### Phase 4: Pyodide WebWorker & Execution
1. Install and initialize Pyodide in a separate Web Worker (to prevent UI freezing during infinite loops).
2. Write a Python wrapper script inside Pyodide that overrides `sys.stdin` with test case inputs and captures `sys.stdout`.
3. Connect the "Compile & Run" button to pass the Monaco editor text to Pyodide, evaluate against sample test cases, and render the output in the console UI.

### Phase 5: Submission & Timer Logic
1. Implement the "Submit Code" button to run hidden test cases.
2. Update the question status (Answered/Failed) and auto-advance `currentQIndex`.
3. Implement the Timer logic. Add an event listener to trigger a final submission sequence when time expires.
4. Add final polish, error handling (syntax errors, timeouts), and responsiveness based on the provided design document.
