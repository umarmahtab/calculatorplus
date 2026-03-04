## Calculator+ v1.5

This update introduces several new features, major calculator logic improvements, UI refinements, and important bug fixes to make the application more stable and user-friendly.

---

### Bug Fixes

• Fixed **backspace button not working**
• Fixed operations calculating immediately instead of waiting for `=`
• Fixed display not resetting after pressing an operator
• Fixed **"backspace" and "clear" text appearing in the expression display**
• Fixed layout shifting when the display was empty
• Fixed `formatNumber` breaking expressions containing operators

---

### New Feature — Expression Evaluation (BODMAS)

The calculator now properly evaluates expressions using correct mathematical order.

• Full expression is built and shown on screen
• Evaluation only occurs when `=` is pressed
• Supports correct **BODMAS / PEMDAS order of operations**

---

### New Feature — History Panel

A new history panel allows users to view and reuse previous calculations.

• Stores the **last 5 calculations**
• Toggle history using the **clock icon in the header**
• Click a history item to load its result
• Frosted glass overlay panel with smooth animations

---

### New Feature — Theme System

Calculator+ now includes **4 visual themes**:

• **Dark** — Purple gradient with glassmorphism (default)
• **Light** — Light purple and white clean interface
• **AMOLED** — Pure black background with cyan accents
• **Glass** — Translucent interface with heavy blur and gold accents

Theme toggle cycles through all four themes with unique icons.

---

### UI / UX Improvements

• Button press animation improved (smooth opacity fade `1 → 0.4 → 1`)
• Font size optimized (`3rem → 2.2rem`) for better layout fit
• Long expressions scroll horizontally instead of wrapping
• Expression now appears in the **main display area**
• Removed automatic **"0" display after pressing operators**
• Maximum **20 characters per number**
• Maximum **50 characters per expression**

---

### Layout Stability

• Fixed display area height (`min-height / max-height: 5rem`)
• Prevents layout jumps during calculations

---

### Technology

Built using:

• HTML
• CSS
• JavaScript

---

### Screenshots
<img width="1919" height="854" alt="Screenshot 2026-03-04 224311" src="https://github.com/user-attachments/assets/13dcbc90-7838-4f81-8108-dbc5e1bd040b" />
<img width="1919" height="850" alt="Screenshot 2026-03-04 224238" src="https://github.com/user-attachments/assets/a8cad5df-545e-4bdc-8513-156f04c95963" />
<img width="1919" height="861" alt="Screenshot 2026-03-04 224229" src="https://github.com/user-attachments/assets/363aee4c-b959-459d-9e93-540e9bec9e7b" />
<img width="1917" height="858" alt="Screenshot 2026-03-04 224217" src="https://github.com/user-attachments/assets/4497cc5d-a473-4d42-b689-476ee67dffcd" />

---

### Installation

1. Download the APK from the release assets below
2. Enable **Install from Unknown Sources** in Android settings
3. Open the APK and install the application

---

### Developer

Umar Mahtab
GitHub: https://github.com/umarmahtab



