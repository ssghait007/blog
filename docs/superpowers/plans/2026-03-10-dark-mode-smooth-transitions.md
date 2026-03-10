# Dark Mode Smooth Transitions Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate visual snapping on dark mode toggle and prevent flash-of-wrong-theme on page load.

**Architecture:** Add a global CSS transition rule for color properties on `*`, and inject a synchronous inline script in `<head>` that applies the `dark` class before first paint.

**Tech Stack:** CSS transitions, Nuxt `app.head` config, vanilla JS inline script.

**Spec:** `docs/superpowers/specs/2026-03-10-dark-mode-smooth-transitions-design.md`

---

## Chunk 1: Implementation

### Task 1: Add global CSS transition and remove redundant Tailwind utility

**Files:**
- Modify: `app/layouts/default.vue:2` (remove `transition-colors duration-300` from root div class)
- Modify: `app/layouts/default.vue:43-48` (add `transition` to existing `*` rule)

- [ ] **Step 1: Remove Tailwind transition utilities from root div**

In `app/layouts/default.vue` line 2, change:
```html
<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
```
to:
```html
<div class="min-h-screen bg-white dark:bg-gray-900">
```

- [ ] **Step 2: Add transition to global `*` CSS rule**

In `app/layouts/default.vue`, update the existing rule at lines 43-48 from:
```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
```
to:
```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
```

- [ ] **Step 3: Verify reduced-motion override still works**

Confirm the existing `@media (prefers-reduced-motion: reduce)` block at lines 111-120 includes `transition-duration: 0.01ms !important` on `*`. This already overrides the new transition for reduced-motion users. No change needed — just verify it's there.

- [ ] **Step 4: Commit**

```bash
git add app/layouts/default.vue
git commit -m "style: add global CSS transition for smooth dark mode toggle"
```

---

### Task 2: Add FWOT prevention inline script

**Files:**
- Modify: `nuxt.config.ts:30` (add `script` array to `app.head`, insert before closing `},` of `head`)

- [ ] **Step 1: Add inline script to nuxt.config.ts**

In `nuxt.config.ts`, inside the `app.head` object (after the existing `link` array at line 29), add:

```ts
script: [
  {
    innerHTML: `(function(){try{var d=document.documentElement,s=localStorage.getItem('darkMode');if(s==='true'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}}catch(e){}})()`,
  },
],
```

- [ ] **Step 2: Commit**

```bash
git add nuxt.config.ts
git commit -m "fix: prevent flash-of-wrong-theme with inline dark mode script"
```

---

### Task 3: Manual verification

- [ ] **Step 1: Start dev server**

```bash
bun run dev
```

- [ ] **Step 2: Verify smooth transitions**

Open browser, toggle dark mode — all elements (bg, text, borders) should transition smoothly over 0.2s, no snapping.

- [ ] **Step 3: Verify FWOT prevention**

Set dark mode on, hard refresh (Cmd+Shift+R) — page should render in dark mode immediately, no white flash.

- [ ] **Step 4: Verify system preference fallback**

In DevTools console: `localStorage.removeItem('darkMode')`. Set system theme to dark. Refresh — page should load in dark mode immediately with no flash (system preference fallback works).

- [ ] **Step 5: Verify explicit light preference overrides system**

In DevTools console: `localStorage.setItem('darkMode', 'false')`. Set system theme to dark. Refresh — page should load in light mode.

- [ ] **Step 6: Verify reduced motion**

In DevTools, enable "Prefers reduced motion" emulation. Toggle dark mode — transitions should be effectively instant.
