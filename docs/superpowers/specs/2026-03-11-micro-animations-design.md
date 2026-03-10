# Purpose-Driven Micro-Animations — Design Spec

**Date:** 2026-03-11
**Status:** Approved
**Approach:** CSS-only scroll reveals + page fade transitions, zero dependencies

## Goal

Add subtle, professional motion to the blog that guides attention, smooths navigation, and makes the site feel crafted — without being distracting. Targets two specific pain points: static content (hero + blog cards appear instantly) and jarring page transitions.

## Constraints

- Zero new dependencies (pure CSS + IntersectionObserver + Vue built-in `<Transition>`)
- Subtle intensity — 8px movements, 0.5s durations, ease curves (Stripe/Linear vibe)
- Full `prefers-reduced-motion` respect via existing global media query
- GPU-composited properties only (opacity, transform) — no layout thrashing

## Component 1: `useScrollReveal` Composable

**File:** `app/composables/useScrollReveal.js`

Thin wrapper around `IntersectionObserver`:
- Accepts a template ref (single element or array)
- Options: `{ threshold: 0.1, rootMargin: '0px 0px -50px 0px', staggerDelay: 100 }`
- Adds CSS class `revealed` when element enters viewport
- One-shot: unobserves after reveal (no re-hiding on scroll up)
- Stagger: applies `transition-delay` based on element index × `staggerDelay`
- Under `prefers-reduced-motion`: adds `revealed` class immediately, no observer
- **SSR safety:** All observer logic runs inside `onMounted` (client-only in Nuxt). The `.scroll-reveal` class is NOT rendered in server HTML — it is added dynamically by the composable after mount. This prevents flash-of-invisible-content (FOIC) where SSR would emit `opacity: 0` elements before hydration.
- Disconnects observer on `onBeforeUnmount`

## Component 2: Animation CSS

**File:** `app/assets/css/animations.css` (loaded via `nuxt.config.ts` `css` array)

### Scroll Reveal
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s ease, transform 0.5s ease,
              background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
}
.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

**Note:** The `transition` shorthand on `.scroll-reveal` must include the global dark-mode transition properties (`background-color`, `color`, `border-color`) because it overrides the `*` rule in `default.vue`. Without these, dark-mode transitions would break on scroll-reveal elements.

### Page Transitions
```css
.page-enter-active { transition: opacity 0.3s ease; }
.page-leave-active { transition: opacity 0.2s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
```

No additional reduced-motion CSS needed — the existing global `prefers-reduced-motion` rule in `default.vue` sets `transition-duration: 0.01ms !important` on all elements.

## Component 3: Page Transition Config

**File:** `nuxt.config.ts`

Add to `app` config:
```ts
app: {
  pageTransition: { name: 'page', mode: 'out-in' }
}
```

This enables the global page transition using the CSS classes above. Only page content fades — Header and Footer persist without animation since they live in the layout, outside `<NuxtPage>`.

## Application Points

### Homepage (`app/pages/index.vue`)
- Hero headline: `.scroll-reveal` (fires immediately, already in viewport)
- Description paragraph: `.scroll-reveal` with 100ms stagger
- Explore button: `.scroll-reveal` with 200ms stagger
- Hero image: `.scroll-reveal` with 100ms stagger after text block

Creates a top-down cascade: headline → text → button → image, ~100ms apart. Total entrance ~0.8s.

**Implementation note:** The homepage hero elements are not siblings in a `v-for` loop — they're distinct elements at different DOM depths. The composable accepts an **array of individual template refs** (one per element), and applies stagger delay based on array index. Each element gets its own `ref` attribute.

### Blog listing (`app/components/BlogContent.vue`)
- Each `BlogCard` wrapper: `.scroll-reveal` with 80ms stagger between cards
- Stagger capped at 6 cards (cards 7+ use card 6's delay) to avoid slow reveals on long lists
- "To Home" button: `.scroll-reveal` after cards

### Category pages (`app/components/BlogContentCategory.vue`)
- Same pattern as blog listing

### Blog post (`app/pages/blog/[slug].vue`)
- "← Back" button: `.scroll-reveal`
- Hero image: `.scroll-reveal`
- Post content: NO scroll reveals (would be annoying while reading)

### Contact page (`app/pages/contact/index.vue`)
- No changes (Submit button already has 3D treatment, no entrance needed)

## Interaction with Existing Features

### Tactile Navigation (0.5s delay)
The 4 nav buttons have a 0.5s delay before `navigateTo()`. Sequence:
1. Button press animation (0.1s)
2. Hold delay (0.4s remaining)
3. Page fade-out begins (0.2s)
4. New page fade-in (0.3s) with scroll reveals firing

### Dark Mode Transitions (0.5s)
Scroll reveal uses `opacity` + `transform`, dark mode uses `background-color` + `color` + `border-color`. No conflicts — different properties.

### BlogCard Parallax
BlogCard already has `transform` on hover (3D rotateX/Y via inline style on the inner `<article ref="card">`). The `.scroll-reveal` class is applied to the **parent wrapper** `<article>` or `<div>` around `<BlogCard>`, not the BlogCard's internal element. These are different DOM nodes, so the transforms don't interact. The scroll reveal completes before user interaction anyway.

## Files Summary

| File | Action |
|------|--------|
| `app/composables/useScrollReveal.js` | NEW (~30 lines) |
| `app/assets/css/animations.css` | NEW (~20 lines) |
| `nuxt.config.ts` | ADD css entry + pageTransition config |
| `app/pages/index.vue` | ADD scroll-reveal classes + composable |
| `app/components/BlogContent.vue` | ADD scroll-reveal to card wrappers |
| `app/components/BlogContentCategory.vue` | ADD scroll-reveal to card wrappers |
| `app/pages/blog/[slug].vue` | ADD scroll-reveal to back button + image |

## Performance

- `IntersectionObserver` is non-blocking, off main thread
- `opacity` + `transform` are GPU-composited — no reflows
- One observer per page (elements batch-observed)
- Observer disconnects on unmount
- Negligible bundle size increase (~1KB for composable + CSS)
