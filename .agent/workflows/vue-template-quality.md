---
description: This workflow initiates a strict code quality and accessibility audit for Vue.js templates. Trigger this when you want to inspect a component for potential issues or before finalizing a feature.
---

## Step 1: Audit & Analysis

1. **Read Target File**: Analyze the content of the specified `.vue` file.
2. **Static Inspection**: Scan the `<template>` section for the following specific violations:
   - **[A11y] Semantic Interaction**: Identify non-interactive elements (like `div` or `span`) that use `@click` listeners without proper roles or keyboard support.
   - **[A11y] Accessibility Attributes**: Check for missing `alt` attributes on images and missing `label` or `aria-label` on form inputs.
   - **[Vue] Logic Conflicts**: Detect if `v-if` and `v-for` are used on the same element.
   - **[Vue] List Rendering**: Check if `v-for` uses `index` as a key (recommend unique IDs instead).
   - **[UI] Library Usage**: Ensure Element UI components (e.g., Icons) use `aria-hidden="true"` where appropriate.
3. **Report Generation**:
   - Output a bulleted list of all detected issues ("Violations").
   - **STOP**: Ask the user: "Issues detected. Do you want to proceed with auto-fixing these items? (Y/n)"

## Step 2: Remediation (Fixing)

_(Execute only if the user confirms Step 1)_

1. **Apply Fixes**:
   - **Convert Elements**: Change clickable `div`/`span` tags to `<button type="button">`.
     - _Note_: Add inline styles or utility classes (e.g., `background: none; border: none; padding: 0;`) to reset default button styles and maintain the original look.
   - **Add Attributes**: Insert `alt=""` for decorative images or `:alt` placeholders for dynamic ones.
   - **Refactor Logic**: Separate `v-if` and `v-for` using a wrapper `<template>` tag.
2. **Code Consistency**: Ensure the new code follows the indentation and formatting of the original file.

## Step 3: Final Verification

1. **Self-Correction**: Briefly scan the modified code to ensure no syntax errors were introduced.
2. **Output**: Display the diff or the summary of changes.
3. **Completion**: Remind the user: "Refactoring complete. Please manually verify visual styles in the browser, as changing HTML tags (e.g., div to button) might affect CSS rendering."
