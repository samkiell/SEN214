# SEN 214 — Scientific Calculator App Templates

This repository contains the PRD and Agent Prompt templates for the
SEN 104 & SEN 214 Mobile App Development assignment at Obafemi Awolowo
University, Ile-Ife.

These templates help students build a unique Scientific Calculator
mobile app using React Native (Expo) and an AI coding agent like
Antigravity, Cursor, Copilot, or Claude Code.

---

## What's Inside

| File | Purpose |
|------|---------|
| `PRD_Template.md` | Full product requirements document defining what to build |
| `Agent_Prompt_Template.md` | The prompt to paste into your AI agent to start building |

---

## How to Use

### Step 1 — Set up your environment
- Install [Node.js](https://nodejs.org) (LTS version)
- Install [Antigravity IDE](https://antigravity.dev) or any AI coding agent
- Create an [Expo account](https://expo.dev) and download the Expo Go app on your phone
- Create a [GitHub account](https://github.com)

### Step 2 — Create your project
```bash
npx create-expo-app CalculatorApp
cd CalculatorApp
```

### Step 3 — Prepare the prompt
- Open `Agent_Prompt_Template.md`
- Replace `[YOUR FIRST NAME]` with your actual first name
- Replace `[LAST 2 DIGITS OF YOUR MATRIC NUMBER]` with the last 2 digits of your matric number
- Copy the full contents of `PRD_Template.md` and paste it where it says `[PASTE PRD HERE]`

### Step 4 — Run the agent
- Open the project in Antigravity (or your chosen AI agent)
- Paste the prepared prompt and send it
- Let the agent build — it will compute your unique design automatically

### Step 5 — Run on your phone
```bash
npx expo start
```
Scan the QR code with Expo Go on your phone.

### Step 6 — Push to GitHub
```bash
git init
git add .
git commit -m "first commit"
git remote add origin YOUR_REPO_URL
git branch -M main
git push -u origin main
```

### Step 7 — Build your APK
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

---

## How Uniqueness Works

Every student's app looks **different** because the design is
**deterministically selected** based on your name and matric number.

The algorithm uses your first name's first letter and your matric
number's last two digits to compute which color scheme, key shape,
layout, font, accent color, and display style your app gets.

**Total unique combinations: 12 × 6 × 6 × 8 × 5 × 4 = 69,120**

This means two students would need the same first letter AND same
last two matric digits to get an identical design — extremely unlikely.

- Do **not** copy another student's output
- Do **not** change the design selections the agent computes
- Submission deadline: **June 30, 2026**
- Submission form: [Click here](https://docs.google.com/forms/d/e/1FAIpQLSeXxGZ3zHR1wKc4WEew3Nv6hsToj27JhlmlSmdsFosPnj888g/viewform)

---

## Assignment Requirements

**Basic (Required)**
- Addition, Subtraction, Multiplication, Division

**Bonus (Extra marks)**
- Trigonometric functions
- Hyperbolic functions
- Logarithms and powers
- Permutations and Combinations
- Statistical computations (mean, variance, std dev)
- Constants π and e

---

## Credits

Templates designed by **SAMKIEL** (Samuel Ezekiel)
SWE — Software Engineering, OAU Ile-Ife
[samkiel.dev](https://samkiel.dev) · [@samkiel_dev](https://x.com/samkiel_dev)