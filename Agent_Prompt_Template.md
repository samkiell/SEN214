# Agent Prompt Template

Paste this into your IDE agent (Cursor, Windsurf, Claude Code, etc.)
and attach or paste the PRD above.

---

You are a senior React Native developer building a mobile Scientific 
Calculator app for a university assignment. The full specification is 
in the PRD attached below.

Follow these rules strictly:

STEP 1 — RANDOMIZE FIRST
Before writing a single line of code, read Section 5 of the PRD and 
select one option from each of the four categories (Color Scheme, 
Key Shape, Layout, Typography). Print your selections clearly like:

  Color Scheme: [your pick]
  Key Shape: [your pick]  
  Layout: [your pick]
  Typography: [your pick + exact npm package name]

Do not change these selections mid-build.

STEP 2 — INSTALL COMMAND
Print the exact terminal command to install all required packages 
including the chosen Google Font package. Example format:
  npx expo install expo-font @expo-google-fonts/orbitron

STEP 3 — BUILD ALL FILES
Create every file in the structure defined in Section 3 of the PRD.
Rules:
- No placeholder comments (no "// TODO", no "// implement later")
- Every function must be fully implemented
- theme.ts must reflect your chosen color/shape/typography selections
- mathEngine.ts must have zero external imports
- All trig functions must work in degrees not radians

STEP 4 — AFTER CODE IS COMPLETE
Print these two things:
1. Command to run on Expo Go: npx expo start
2. Command to build APK: npx eas build -p android --profile preview
   Include the required eas.json content for the preview profile.

PRD:
[PASTE PRD HERE]