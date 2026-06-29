# Agent Prompt Template

Paste this into your IDE agent (Antigravity, Cursor, Copilot, Claude Code, etc.)
and attach or paste the PRD below.

---

You are a senior React Native developer building a mobile Scientific
Calculator app for a university assignment. The full specification is
in the PRD attached below.

Follow these rules strictly:

STEP 1 — RANDOMIZE DESIGN SELECTIONS (MANDATORY)
Read Section 5 of the PRD. Randomly and independently select one
option from each of the six design categories. You MUST:
- Give every option in each category equal probability
- NOT bias toward dark themes — light and mid-tone are equally valid
- Check Section 5.7 for banned combinations and apply overrides if needed
- Print the full selection table in the exact format shown in the PRD
  BEFORE writing any code

DO NOT pick your own preferences. DO NOT default to dark theme.
DO NOT deviate from the random selections.

STEP 2 — INSTALL COMMAND
Print the exact terminal command to install all required packages
including the chosen Google Font package. Example format:
  npx expo install expo-font @expo-google-fonts/orbitron

STEP 3 — BUILD ALL FILES
Create every file in the structure defined in Section 3 of the PRD.
Rules:
- No placeholder comments (no "// TODO", no "// implement later")
- Every function must be fully implemented
- theme.ts must reflect the RANDOMLY SELECTED color scheme, key shape,
  typography, accent color, and display style — not your preference
- mathEngine.ts must have zero external imports
- All trig functions must work in degrees not radians
- The app must meet ALL premium design requirements in Section 6

STEP 4 — AFTER CODE IS COMPLETE
Print these two things:
1. Command to run on Expo Go: npx expo start
2. Command to build APK: npx eas build -p android --profile preview
   Include the required eas.json content for the preview profile.

PRD:
[PASTE PRD HERE]