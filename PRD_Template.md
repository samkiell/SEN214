# Product Requirements Document (PRD) Template
## Mobile Scientific Calculator (React Native & Expo)

---

## 1. Project Overview
The objective is to build a modern, high-performance, cross-platform mobile calculator using **React Native (Expo)** and **TypeScript**. The application must support two operational modes: **Basic** and **Scientific**. All mathematical computations must be performed locally using a custom mathematical evaluation engine built with JavaScript's native `Math` object—**no external math libraries** (such as `math.js`) are permitted.

### ⚠️ IMPORTANT: Unique Design Requirement
To ensure that each developer's project is visually and structurally distinct, the AI agent **must randomize or dynamically select** a unique design system and layout configuration prior to writing any UI code. No two implementations of this PRD should look or feel identical.

---

## 2. Technical Stack & Constraints
- **Framework**: React Native (via Expo SDK 54 or newer)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: React Native `StyleSheet` only (no TailwindCSS or third-party component libraries unless explicitly requested)
- **Dependencies**: 
  - `react-native-safe-area-context` (for safe area management)
  - `expo-status-bar` (for status bar styling)
  - `@expo-google-fonts/[ChosenFont]` (for custom typography)
- **Navigation**: Single-screen utility app (do not use `expo-router` or `react-navigation`)
- **Execution Environment**: Must run smoothly on iOS Simulator, Android APK, and Expo Go.

---

## 3. Mathematical Evaluation Engine Requirements
The core calculator logic must be self-contained in a helper module (e.g., `src/mathEngine.ts`) implementing an algebraic expression parser.

### 3.1 Parser Pipeline
The engine must parse strings via:
1. **Tokenizer**: Split the input string into numbers, operators, brackets, functions, constants, and factorials. It must correctly distinguish between binary subtraction (e.g., `5 - 3`) and unary minus (e.g., `-5` or `3 * -2`).
2. **Shunting-Yard Algorithm**: Convert the token stream to Reverse Polish Notation (RPN), respecting operator precedence and right-associativity for the power operator (`^`).
3. **RPN Evaluator**: Process the RPN queue using a stack and return a single numeric result.

### 3.2 Supported Mathematical Operations
#### Basic Operations:
- Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`)
- Parentheses for grouping `(` and `)`
- Postfix factorial (`!`) (e.g., `5! = 120`)
- Exponential power (`^`) (e.g., `2^3 = 8`)

#### Trigonometric (Performs computations in Degrees):
- Sine (`sin`), Cosine (`cos`), Tangent (`tan`)
- Inverse Sine (`asin` / `sin⁻¹`), Inverse Cosine (`acos` / `cos⁻¹`), Inverse Tangent (`atan` / `tan⁻¹`)
- Hyperbolic functions: `sinh`, `cosh`, `tanh`

#### Logarithmic & Power:
- Square root (`sqrt` / `√`)
- Natural logarithm (`ln`, base $e$)
- Logarithm base 10 (`log`)
- Squared operations (`x²`)

#### Mathematical Constants:
- Pi (`π`)
- Euler's number (`e`)

### 3.3 Combinatorics & Statistics Modals
For functions requiring multi-value or multi-step inputs, the app must present a modal/dialog with input fields rather than raw string entries:
- **nPr (Permutations)**: Modal with inputs for $n$ and $r$. Formula: $nPr = \frac{n!}{(n - r)!}$.
- **nCr (Combinations)**: Modal with inputs for $n$ and $r$. Formula: $nCr = \frac{n!}{r!(n - r)!}$.
- **Statistics Helpers**: Modal accepting a comma-separated list of numbers (e.g., `1, 2, 3, 4`) to compute:
  - **Mean ($\bar{x}$)**
  - **Variance ($\sigma^2$)** (Population variance, dividing by $N$)
  - **Standard Deviation ($\sigma$)** (Population standard deviation)

### 3.4 Formatting & Error Handling
- **Float Clean-up**: Strip floating-point rounding errors (e.g., `0.1 + 0.2` should display as `0.3`, not `0.30000000000000004`).
- **Resting state**: Display `0` when empty.
- **Error States**: Display a single, clear `Error` screen state on:
  - Division by zero.
  - Undefined operations (e.g., `sqrt(-1)` or `asin(2)`).
  - Malformed inputs (e.g., mismatched brackets `((5+3)`, sequential operators `5++3`, or empty calculations).
  - Negatives or non-integers for factorials (e.g., `(-3)!`).

---

## 4. UI/UX & Layout Specifications

### 4.1 Display Interface
The display area occupies the top portion of the screen and consists of two text regions:
1. **Expression Line (Secondary)**: 
   - Shows the equation currently being typed.
   - Must *prettify* math notation for readability (e.g., convert `*` to `×`, `/` to `÷`, `asin` to `sin⁻¹`, `sqrt` to `√`, `pi` to `π`).
   - Must be horizontally scrollable to prevent text clipping on long inputs.
2. **Result/Preview Line (Primary)**:
   - Displays the final calculated result in a large, prominent font size after `=` is pressed.
   - Shows a **muted live preview** of the running evaluation as the user types (if the expression is valid).
   - Must scroll horizontally or shrink to fit large numbers.

### 4.2 Keypad Structure & Mode Toggle
- A header control (segmented control, slider, or swipe-trigger) toggles the layout between **Basic Mode** and **Scientific Mode**.
- **Basic Mode**: Renders a grid containing numbers, decimal point, basic arithmetic operators (`+`, `-`, `×`, `÷`), parenthesis, clear (`AC`), delete last character (`DEL`), and equals (`=`).
- **Scientific Mode**: Renders the Basic Keypad alongside an additional keypad area containing the scientific keys (`sin`, `cos`, constants, exponents, combinatorics, statistics, etc.).

---

## 5. Dynamic Randomization Rules (How to build a UNIQUE app)
To make your version of the calculator look and layout differently from other submissions, your AI agent **must select one option from each category** below (or create a custom hybrid) before writing code:

### 5.1 Color Scheme Vibe (Select ONE)
- **Cyberpunk Neon**: Deep black/navy background (`#0A0A0F`), neon magenta (`#FF0055`) and neon cyan (`#00F0FF`) buttons, bright yellow accents.
- **Retro Terminal**: Dark slate grey (`#1C1E24`), amber/orange (`#FF9500`) operators, digital-green display text (`#39FF14`).
- **Nordic Pastel**: Light ash grey background (`#ECEFF1`), soft sage green, pastel lavender, and muted slate keys with white text.
- **Premium Minimalist (Dark)**: Charcoal background (`#121212`), elevated grey keys (`#2C2C2C`), gold accents (`#D4AF37`) for execution keys.
- **Forest & Earth**: Matte olive green (`#2D3A2E`), sand/cream operators (`#F5EBE6`), dark charcoal background, forest-green accents.

### 5.2 Key Shapes & Styling (Select ONE)
- **Perfect Circles**: Traditional floating circular keys with spacing gaps.
- **Rounded Squircles**: Square keys with medium border-radius (e.g., `12`–`18`px) forming a tight grid.
- **Pill / Capsule**: Wide, elongated capsule-style horizontal keys.
- **Bordered Wireframe**: Transparent key backgrounds with thin colored borders that glow/change color when pressed.

### 5.3 Keypad Layout & Position (Select ONE)
- **Classic Right-Hand Operators**: The standard grid where operators form a column on the far right.
- **Left-Hand Operators**: Relocate operators (`+`, `-`, `×`, `÷`, `=`) to a column on the left side of the screen.
- **Top-Heavy Sci Keypad**: Renders scientific keys directly *above* the basic layout.
- **Split Grid**: Renders numbers in the center, brackets/utilities on the left column, operators on the right column.

### 5.4 Typography & Brand (Select ONE)
- **LED Digital**: Import and use `@expo-google-fonts/orbitron` or `@expo-google-fonts/share-tech-mono` for a physical calculator display.
- **Modern Sans**: Use `@expo-google-fonts/poppins` or `@expo-google-fonts/inter` for a sleek, clean, modern app appearance.
- **Monospace Code**: Use `@expo-google-fonts/jetbrains-mono` or `@expo-google-fonts/fira-code` for a retro-coding style.

---

## 6. Functional Scenarios & Walkthrough Flow
1. **Fresh Start**: User opens the app. The display shows a resting primary value of `0`.
2. **Standard Calculation**: User types `2 + 3 × 4`. The preview line updates in real-time to show `14`. The user presses `=`, and the primary line displays `14` in a highlighted/bold state.
3. **Continuous Evaluation**: Immediately after pressing `=`, the user presses `+` followed by `5`. The calculation appends to the previous result, showing `14 + 5`.
4. **Fresh Calculation**: Immediately after pressing `=`, the user presses a digit key (e.g., `9`). The calculator clears the previous expression and starts fresh with `9`.
5. **Deleting Characters**: User presses `DEL`. If deleting a function like `sin(`, the entire token is deleted at once rather than character-by-character.
6. **Triggering Modals**: User clicks `nCr`. A modal opens requesting values for `n` and `r`. Once submitted, the modal computes the output, updates the expression string to `Combinations (nCr)`, and shows the computed result in the primary line.
7. **Error Recovery**: If the expression is malformed, pressing `=` displays `Error`. Pressing any key or `AC` clears the error state and recovers gracefully.
