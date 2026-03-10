# 3D Raised Tactile Buttons

**Date:** 2026-03-10
**Status:** Approved
**Difficulty:** Easy | **Est. Time:** 1 hr | **UX Impact:** 3/5

## Problem

All CTA buttons use a flat purple gradient with basic shadow. Clicking them navigates instantly with no tactile feedback — the user gets no satisfying "I pressed something" confirmation.

## Solution

Apply a 3D raised skeuomorphic button style to the 5 existing `.btn`-class buttons with a physical 6px press-down on click. For the 4 navigation buttons, add a 0.5s delay after press so the user sees the tactile feedback before the page navigates. The Submit button gets only the visual treatment (no delay).

## Scope

**In scope (5 buttons):**
1. "Explore" — `app/pages/index.vue:21` → navigates to `/blog`
2. "← Back" — `app/pages/blog/[slug].vue:7` → navigates to `/blog`
3. "To Home" — `app/components/BlogContent.vue:27` → navigates to `/`
4. "← Back to All Posts" — `app/components/BlogContentCategory.vue:28` → navigates to `/blog`
5. "Submit" — `app/pages/contact/index.vue:64` → submits form (no delay)

**Out of scope:** Dark mode toggle, hamburger menu, nav links, footer links, blog card links, TOC links, search results.

## Changes

### Change 1: Redefine `.btn` CSS class

**File:** `app/assets/css/tailwind.css`

Replace the existing `.btn` `@apply` rule with a full CSS class that adds 3D depth:

```css
.btn {
  @apply text-white font-semibold py-3 px-8 rounded-xl
    inline-flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
    dark:focus:ring-offset-gray-900;
  background: linear-gradient(145deg, #a855f7, #7e22ce);
  border: none;
  cursor: pointer;
  position: relative;
  top: 0;
  box-shadow:
    0 6px 0 #6b21a8,
    0 10px 20px rgba(0, 0, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.1s ease;
}

.btn:hover {
  background: linear-gradient(145deg, #c084fc, #9333ea);
  box-shadow:
    0 6px 0 #6b21a8,
    0 12px 25px rgba(0, 0, 0, 0.35),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
}

.btn:active {
  top: 6px;
  box-shadow:
    0 0 0 #6b21a8,
    0 4px 10px rgba(0, 0, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
}
```

Color mapping to existing brand:
- `#a855f7` = Tailwind `purple-500` (gradient start)
- `#7e22ce` = Tailwind `purple-700` (gradient end)
- `#6b21a8` = Tailwind `purple-800` (bottom shadow / "depth")
- `#c084fc` = Tailwind `purple-400` (hover gradient start)
- `#9333ea` = Tailwind `purple-600` (hover gradient end)

Dark mode: no separate variant needed — purple gradient reads well on both light and dark backgrounds.

### Change 2: Navigation delay composable

**File:** `app/composables/useTactileNav.js` (new)

```js
export const useTactileNav = () => {
  let timeoutId = null

  const navigate = (path) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      navigateTo(path)
    }, 500)
  }

  onBeforeUnmount(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })

  return { navigate }
}
```

Uses `onBeforeUnmount` (Nuxt auto-import) to cancel pending navigation if the component unmounts before the timeout fires.

**Tradeoff — NuxtLink prefetch lost:** Removing `<NuxtLink>` wrappers means the target routes are no longer prefetched on hover. For a blog with lightweight pages, this is acceptable — the 0.5s delay masks most loading time. If needed later, `useRouter().prefetch(path)` can be called on `mouseenter`.

### Change 3: Convert 4 navigation buttons from NuxtLink-wrapped to click-handler

Replace `<NuxtLink to="..."><button class="btn">` with `<button class="btn" @click="navigate('...')">` using the composable.

**Files:**
- `app/pages/index.vue:20-27` — "Explore"
- `app/pages/blog/[slug].vue:6-8` — "← Back"
- `app/components/BlogContent.vue:26-33` — "To Home"
- `app/components/BlogContentCategory.vue:27-34` — "← Back to All Posts"

Each file adds `const { navigate } = useTactileNav()` in `<script setup>`.

### Not changed

- `app/pages/contact/index.vue` — Submit button gets visual 3D from `.btn` CSS automatically. No composable, no delay. Keeps `type="submit"`.
- `app/assets/css/tailwind.css` `.btn-secondary` and `.btn-outline` — left as-is (currently unused).
- All non-`.btn` interactive elements — no changes.

## Accessibility

- `prefers-reduced-motion: reduce` in `default.vue` already zeroes `transition-duration` on `*`, making the press-down instant.
- Focus ring styling preserved via `@apply` focus utilities.
- `aria-label` attributes remain on all buttons.

## Verification

1. Click "Explore" on homepage — button presses down 6px, holds 0.5s, then navigates to /blog
2. Click "← Back" on a blog post — same tactile press, navigates to /blog after 0.5s
3. Click "To Home" on blog listing — presses down, navigates to / after 0.5s
4. Click "← Back to All Posts" on category page — presses down, navigates to /blog after 0.5s
5. Click "Submit" on contact form — presses down, submits immediately (no delay)
6. Hover all 5 buttons — gradient lightens, shadow deepens slightly
7. Test in dark mode — buttons render correctly on dark background
8. Test with `prefers-reduced-motion: reduce` — press is instant, no animation
