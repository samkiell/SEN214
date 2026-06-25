# Agent Prompt Template
Copy and paste the prompt below into your IDE coding agent (such as Antigravity, Gemini, or Cursor) to automatically spin up, design, and build your unique Mobile Scientific Calculator.

---

```text
You are a senior React Native developer. Your task is to build a complete Mobile Scientific Calculator app in React Native (Expo) and TypeScript, following the specifications in the attached PRD template.

Please read the PRD carefully. Before writing any code, you must execute the following requirements:

1. DYNAMIC BRANDING & STYLING RANDOMIZATION:
   To make my calculator submission unique, you MUST choose a styling combination that sets it apart from standard layouts. 
   Please randomly choose (or creatively combine) one option from each of the following categories, and write down your selection at the very beginning of your response:
   - Color Scheme Vibe (e.g., Cyberpunk Neon, Retro Terminal, Nordic Pastel, Premium Minimalist, Forest & Earth, or a unique combination of your own).
   - Key Shapes & Styling (e.g., Perfect Circles, Rounded Squircles, Pill/Capsule keys, or Bordered Wireframe outlines).
   - Keypad Layout & Position (e.g., standard operators on the right, or operators on the left, or a custom layout structure).
   - Typography (e.g., select an appropriate Google Font like Orbitron, Share Tech Mono, Poppins, Inter, or JetBrains Mono, and guide me on how to install it if needed).

2. MODULAR PROJECT STRUCTURE:
   Create a clean, scalable folder structure matching these components:
   - src/mathEngine.ts: Pure TypeScript module for expression parsing (Tokenizer -> Shunting-Yard -> RPN evaluator). Ensure it does not use ANY external math libraries (only JS Math object). Trigonometric functions must work in degrees.
   - src/theme.ts: Centralized style tokens (colors, margins, borders, radii, fonts) representing your chosen random styling vibe.
   - src/keyLayouts.ts: Key grid rows and columns mapping.
   - src/components/Display.tsx: Dual-line display showing the prettified expression on top and large result/preview on the bottom.
   - src/components/Keypad.tsx & CalcButton.tsx: Keypad container and button component with touch feedback/opacity transitions.
   - src/components/InputModal.tsx: Modal component for multi-value inputs (nPr, nCr, and statistics).
   - App.tsx: Core screen state holding mode toggles, expression text, history result, and event handlers.

3. FULL ROBUST IMPLEMENTATION:
   - Make sure all functions (sin, cos, tan, inverse/hyperbolic functions, power, root, constants, factorial) are mapped correctly.
   - Handle edge cases gracefully: division by zero, invalid equations, double decimal points, negative factorials. The screen should show "Error" and allow recovery.
   - Prettify equation display (replace '*' with '×', '/' with '÷', etc.).
   - Make sure fonts load asynchronously using Expo's `useFonts` hook and render a loading placeholder/empty background screen until fonts are ready to prevent UI flicker.

Let's begin! First, state your selected randomized layout/color choices, then create the implementation plan, and write the complete, clean code. Do not write placeholder comments like "// TODO: implement math logic" — write the fully operational code.
```
