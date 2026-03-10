# Dark Mode with Smooth Transitions

**Date:** 2026-03-10
**Status:** Approved
**Difficulty:** Trivial | **Est. Time:** 30 min | **UX Impact:** 3/5

## Problem

1. Dark/light mode toggle snaps instantly on child elements (text, borders, icons) — only the root layout div transitions smoothly.
2. Users with dark mode preference see a flash of light theme (FWOT) on page load because the `dark` class is applied after Vue hydration.

## Solution

Three targeted changes across two files.

### Change 1: Global CSS Transition Rule

**File:** `app/layouts/default.vue`

Add `transition` to the existing `*, *::before, *::after` rule:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
```

**Design decisions:**
- 0.2s duration — fast enough to feel instant, smooth enough to avoid snapping
- Only `background-color`, `color`, `border-color` — not `all` (avoids interfering with transforms, opacity, hover effects)
- Accessibility: existing `prefers-reduced-motion: reduce` block (line 111-120) already zeroes `transition-duration` on `*`, so reduced-motion users are covered

### Change 1b: Remove redundant Tailwind transition on root div

**File:** `app/layouts/default.vue`

Remove `transition-colors duration-300` from the root `<div>` class (line 2). The global `*` rule now handles this at 0.2s. Keeping the Tailwind utility would create an inconsistency (root div at 300ms, everything else at 200ms).

**Known limitation:** Components with their own Tailwind `transition-colors` or `transition-all` utilities (e.g., Header buttons with `duration-200`) will use their per-component duration instead of the global 0.2s. This is acceptable — those are intentional per-component overrides for hover/focus effects, not dark mode transitions.

### Change 2: FWOT Prevention via Inline Head Script

**File:** `nuxt.config.ts`

Add synchronous inline script to `app.head.script`:

```js
script: [
  {
    innerHTML: `(function(){try{var d=document.documentElement,s=localStorage.getItem('darkMode');if(s==='true'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}}catch(e){}})()`,
  },
],
```

**Design decisions:**
- Runs synchronously in `<head>` before first paint — no flash
- Mirrors `useDarkMode.js` `loadFromStorage()` logic: checks localStorage first, falls back to `prefers-color-scheme`
- try/catch for environments where localStorage is unavailable
- No changes needed to `useDarkMode.js` — it will find the `dark` class already applied and sync its `isDark` ref on hydration

## Files Changed

| File | Change |
|------|--------|
| `app/layouts/default.vue` | Add transition to `*` CSS rule; remove `transition-colors duration-300` from root div |
| `nuxt.config.ts` | Add inline script to `app.head.script` array |

## Not Changed

- `useDarkMode.js` — no modifications needed, hydration picks up pre-applied class
- `DarkModeToggle.vue` — already has its own fadeIn animation, unaffected
- `tailwind.config.js` — no changes needed

## Verification

1. Toggle dark mode — all elements (bg, text, borders) transition smoothly over 0.2s
2. Set dark mode, hard refresh — no white flash before dark theme appears
3. Clear localStorage, set system to dark, refresh — no flash (system preference fallback works)
4. Set localStorage `darkMode` to `"false"`, system theme to dark, refresh — page loads in light mode (explicit preference overrides system)
5. Test with `prefers-reduced-motion: reduce` — transitions are instant (0.01ms)
