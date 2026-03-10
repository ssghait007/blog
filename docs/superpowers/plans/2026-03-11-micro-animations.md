# Micro-Animations Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle scroll-reveal animations and page fade transitions to the blog for a polished, professional feel.

**Architecture:** A `useScrollReveal` composable wraps `IntersectionObserver` to add a `.revealed` CSS class when elements enter the viewport. Animation is pure CSS (opacity + translateY). Page transitions use Nuxt's built-in `pageTransition` config with a simple cross-fade. Zero dependencies.

**Tech Stack:** Vue 3 Composition API, CSS transitions, IntersectionObserver, Nuxt `pageTransition`

**Spec:** `docs/superpowers/specs/2026-03-11-micro-animations-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `app/assets/css/animations.css` | CREATE | Scroll-reveal and page-transition CSS classes |
| `app/composables/useScrollReveal.js` | CREATE | IntersectionObserver composable, SSR-safe, stagger support |
| `nuxt.config.ts` | MODIFY | Add CSS file to `css` array, add `pageTransition` config |
| `app/pages/index.vue` | MODIFY | Add scroll-reveal refs to hero section elements |
| `app/components/BlogContent.vue` | MODIFY | Add scroll-reveal to blog card wrappers + nav button |
| `app/components/BlogContentCategory.vue` | MODIFY | Same pattern as BlogContent |
| `app/pages/blog/[slug].vue` | MODIFY | Add scroll-reveal to back button + hero image |

---

## Task 1: Create Animation CSS

**Files:**
- Create: `app/assets/css/animations.css`

- [ ] **Step 1: Create the CSS file**

```css
/* Scroll reveal — applied dynamically by useScrollReveal composable (not in SSR HTML) */
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

/* Page transitions — used by Nuxt pageTransition config */
.page-enter-active {
  transition: opacity 0.3s ease;
}

.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

**Why the extra transition properties?** The `.scroll-reveal` transition shorthand overrides the global `*` rule in `default.vue` that handles dark-mode color transitions. Including `background-color`, `color`, `border-color` preserves dark-mode transition behavior on scroll-reveal elements.

- [ ] **Step 2: Commit**

```bash
git add app/assets/css/animations.css
git commit -m "feat: add scroll-reveal and page-transition CSS"
```

---

## Task 2: Create `useScrollReveal` Composable

**Files:**
- Create: `app/composables/useScrollReveal.js`

- [ ] **Step 1: Write the composable**

```js
export const useScrollReveal = (refs, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 100,
    maxStagger = 6,
  } = options

  onMounted(() => {
    if (!refs) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const elements = Array.isArray(refs)
      ? refs.map((r) => r.value).filter(Boolean)
      : refs.value
        ? [refs.value]
        : []

    if (elements.length === 0) return

    for (const [i, el] of elements.entries()) {
      el.classList.add('scroll-reveal')
      const delay = Math.min(i, maxStagger) * staggerDelay
      if (delay > 0) {
        el.style.transitionDelay = `${delay}ms`
      }
    }

    if (prefersReducedMotion) {
      for (const el of elements) {
        el.classList.add('revealed')
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin }
    )

    for (const el of elements) {
      observer.observe(el)
    }

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })
}
```

**Key design decisions:**
- Classes added in `onMounted` (client-only) — SSR HTML has no `.scroll-reveal`, preventing flash-of-invisible-content
- `maxStagger` caps delay at 6 elements so long card lists don't take forever to reveal
- One-shot: `unobserve` after reveal — no re-hiding on scroll up
- `prefers-reduced-motion`: adds `revealed` immediately, skips observer entirely

- [ ] **Step 2: Commit**

```bash
git add app/composables/useScrollReveal.js
git commit -m "feat: add useScrollReveal composable with stagger and SSR safety"
```

---

## Task 3: Configure Nuxt

**Files:**
- Modify: `nuxt.config.ts:11` (app config) and `nuxt.config.ts:39` (css array)

- [ ] **Step 1: Add animations.css to the css array**

In `nuxt.config.ts`, change line 39:
```
css: ['~/assets/css/fonts.css', '~/assets/css/buttons.css'],
```
to:
```
css: ['~/assets/css/fonts.css', '~/assets/css/buttons.css', '~/assets/css/animations.css'],
```

- [ ] **Step 2: Add pageTransition config**

In `nuxt.config.ts`, inside the `app:` object (after the closing `},` of `head:` on line 35), add:
```ts
    pageTransition: { name: 'page', mode: 'out-in' },
```

The result should look like:
```ts
  app: {
    head: {
      // ... existing head config ...
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
```

- [ ] **Step 3: Commit**

```bash
git add nuxt.config.ts
git commit -m "feat: register animations CSS and enable page transitions"
```

---

## Task 4: Add Scroll Reveals to Homepage

**Files:**
- Modify: `app/pages/index.vue`

- [ ] **Step 1: Add ref attributes to template elements**

Add `ref` attributes to the 4 hero elements. The template changes:

Line 9 `<h1>` — add `ref="heroHeadline"`:
```html
        <h1
          ref="heroHeadline"
          class="headline sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-100"
        >
```

Line 15 `<p>` — add `ref="heroText"`:
```html
        <p ref="heroText" class="descriptive-text mb-8 leading-relaxed dark:text-gray-300">
```

Line 19 `<div>` (button wrapper) — add `ref="heroButton"`:
```html
        <div ref="heroButton" class="flex justify-center">
```

Line 29 `<div>` (image wrapper) — add `ref="heroImage"`:
```html
      <div ref="heroImage" class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
```

- [ ] **Step 2: Wire up the composable in script**

Replace the entire `<script setup>` block:
```js
<script setup>
const { navigate } = useTactileNav()

const heroHeadline = ref(null)
const heroText = ref(null)
const heroButton = ref(null)
const heroImage = ref(null)

useScrollReveal([heroHeadline, heroText, heroButton, heroImage], {
  staggerDelay: 100,
})
</script>
```

- [ ] **Step 3: Start dev server and verify**

Run: `bun run dev`

Open `http://localhost:3000`. Expected behavior:
- Hero headline fades up first
- Description text 100ms later
- Explore button 200ms later
- Image 300ms later
- Total cascade ~0.8s

- [ ] **Step 4: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat: add scroll-reveal cascade to homepage hero"
```

---

## Task 5: Add Scroll Reveals to Blog Listing

**Files:**
- Modify: `app/components/BlogContent.vue`

- [ ] **Step 1: Add ref to card wrappers and nav button**

In the template, add `ref="cardRefs"` to the `<article>` in the v-for (line 8), and `ref="navButton"` to the `<nav>` (line 25):

```html
        <article
          v-for="post in _filteredPosts"
          ref="cardRefs"
          :key="post.path"
          class="p-4 md:w-1/3"
          role="listitem"
        >
```

```html
    <nav ref="navButton" class="flex justify-center mb-8" aria-label="Site navigation">
```

**Note:** In Vue 3, `ref` on a v-for element automatically collects into an array at `cardRefs.value`.

- [ ] **Step 2: Update useScrollReveal to handle v-for array refs**

In `app/composables/useScrollReveal.js`, replace the element resolution block inside `onMounted`:

Change:
```js
    const elements = Array.isArray(refs)
      ? refs.map((r) => r.value).filter(Boolean)
      : refs.value
        ? [refs.value]
        : []
```

To:
```js
    let elements = []
    if (Array.isArray(refs)) {
      elements = refs.map((r) => r.value).filter(Boolean)
    } else if (Array.isArray(refs.value)) {
      elements = refs.value.filter(Boolean)
    } else if (refs.value) {
      elements = [refs.value]
    }
```

This handles three cases:
1. Array of individual refs: `[ref1, ref2, ref3]` (homepage hero)
2. Single ref whose value is an array: v-for `ref="cardRefs"` → `cardRefs.value = [el, el, el]`
3. Single ref to one element: `ref="navButton"` → `navButton.value = <button>`

- [ ] **Step 3: Wire up composable in BlogContent.vue script**

Add after `const { navigate } = useTactileNav()`:

```js
const cardRefs = ref([])
const navButton = ref(null)

useScrollReveal(cardRefs, { staggerDelay: 80, maxStagger: 6 })
useScrollReveal(navButton)
```

Two separate calls — one for the staggered card array, one for the nav button (no stagger needed).

- [ ] **Step 4: Verify**

Open `http://localhost:3000/blog`. Expected:
- Blog cards fade in with 80ms stagger as they enter viewport
- Cards beyond the 6th share the same delay (no infinite stagger)
- "To Home" button fades in when scrolled to

- [ ] **Step 5: Commit**

```bash
git add app/composables/useScrollReveal.js app/components/BlogContent.vue
git commit -m "feat: add scroll-reveal to blog listing cards and nav button"
```

---

## Task 6: Add Scroll Reveals to Category Pages

**Files:**
- Modify: `app/components/BlogContentCategory.vue`

- [ ] **Step 1: Add refs to template**

On the `<div>` in the v-for (line 5), add `ref="cardRefs"`:
```html
        <div
          v-for="post in _filteredPosts"
          ref="cardRefs"
          :key="post.path"
          class="p-4 md:w-1/3"
        >
```

On the button wrapper `<div>` (line 26), add `ref="navButton"`:
```html
    <div ref="navButton" class="flex justify-center mb-8">
```

- [ ] **Step 2: Wire up composable**

Add after `const { navigate } = useTactileNav()`:

```js
const cardRefs = ref([])
const navButton = ref(null)

useScrollReveal(cardRefs, { staggerDelay: 80, maxStagger: 6 })
useScrollReveal(navButton)
```

- [ ] **Step 3: Verify**

Open `http://localhost:3000/blog/frontend` (or any category). Same behavior as blog listing.

- [ ] **Step 4: Commit**

```bash
git add app/components/BlogContentCategory.vue
git commit -m "feat: add scroll-reveal to category page cards"
```

---

## Task 7: Add Scroll Reveals to Blog Post Page

**Files:**
- Modify: `app/pages/blog/[slug].vue`

- [ ] **Step 1: Add refs to template**

On the back button `<button>` (line 6), wrap it — actually, add `ref="backButton"` to the containing `<div>` (line 5):
```html
    <div ref="backButton" class="flex justify-center md:ml-10 p-5 sm:ml-0">
```

On the `<img>` (line 12), add `ref="heroImage"`:
```html
      <img
        v-if="data?.image"
        ref="heroImage"
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="data.image"
      >
```

- [ ] **Step 2: Wire up composable**

Add after `const { navigate } = useTactileNav()`:

```js
const backButton = ref(null)
const heroImage = ref(null)

useScrollReveal([backButton, heroImage], { staggerDelay: 100 })
```

- [ ] **Step 3: Verify**

Open any blog post (e.g., `http://localhost:3000/blog/how-to-create-nuxt-blog`). Expected:
- Back button fades in
- Hero image fades in 100ms after
- Post content renders immediately (no animation)

- [ ] **Step 4: Commit**

```bash
git add app/pages/blog/[slug].vue
git commit -m "feat: add scroll-reveal to blog post back button and hero image"
```

---

## Task 8: Final Verification

- [ ] **Step 1: Test page transitions**

Navigate between pages using the 3D buttons. Expected sequence:
1. Button presses down (0.1s)
2. Hold delay (0.4s)
3. Current page fades out (0.2s)
4. New page fades in (0.3s)
5. Scroll reveals fire on new page content

Also test browser back/forward — page fade should still apply.

- [ ] **Step 2: Test dark mode**

Toggle dark mode while on `/blog`. Expected:
- Blog cards that have `.scroll-reveal` class still transition their background/text colors smoothly (0.5s)
- No flash or instant color change on any element

- [ ] **Step 3: Test reduced motion**

In browser DevTools → Rendering → Emulate CSS media: `prefers-reduced-motion: reduce`.

Expected:
- All scroll reveals show content immediately (no fade/slide)
- Page transitions are instant (no fade)
- Dark mode toggle is also instant

- [ ] **Step 4: Kill dev server**

```bash
pkill -f "nuxt dev"
```
