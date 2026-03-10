# 3D Raised Tactile Buttons Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace flat CTA buttons with 3D raised skeuomorphic buttons that press down on click, with a 0.5s navigation delay so the user sees the tactile feedback.

**Architecture:** Redefine the `.btn` CSS class with 3D box-shadow and press-down mechanics. Create a `useTactileNav` composable for delayed navigation. Convert 4 NuxtLink-wrapped buttons to use the composable. Leave the Submit button as visual-only (no delay).

**Tech Stack:** CSS box-shadow, Nuxt 3 composables, `navigateTo()`, `onBeforeUnmount()`

**Spec:** `docs/superpowers/specs/2026-03-10-3d-tactile-buttons-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `app/assets/css/tailwind.css` | Modify | `.btn` class: 3D raised style with press-down |
| `app/composables/useTactileNav.js` | Create | Delayed navigation with cleanup on unmount |
| `app/pages/index.vue` | Modify | "Explore" button: use composable |
| `app/pages/blog/[slug].vue` | Modify | "← Back" button: use composable |
| `app/components/BlogContent.vue` | Modify | "To Home" button: use composable |
| `app/components/BlogContentCategory.vue` | Modify | "← Back to All Posts" button: use composable |

---

## Chunk 1: Implementation

### Task 1: Redefine `.btn` CSS class with 3D raised style

**Files:**
- Modify: `app/assets/css/tailwind.css:7-9`

- [ ] **Step 1: Replace `.btn` class**

In `app/assets/css/tailwind.css`, replace lines 7-9:

```css
.btn {
  @apply bg-gradient-to-r from-purple-400 to-purple-700 hover:from-purple-600 hover:to-purple-900 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg;
}
```

with:

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

- [ ] **Step 2: Verify visually**

Run: `bun run dev`

Open browser → homepage → check that "Explore" button appears raised with a visible bottom shadow edge. Hover it — gradient should lighten. Click and hold — button should press down 6px.

- [ ] **Step 3: Commit**

```bash
git add app/assets/css/tailwind.css
git commit -m "style: replace flat .btn with 3D raised skeuomorphic style"
```

---

### Task 2: Create `useTactileNav` composable

**Files:**
- Create: `app/composables/useTactileNav.js`

- [ ] **Step 1: Create the composable**

Create `app/composables/useTactileNav.js` with:

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

`navigateTo` and `onBeforeUnmount` are Nuxt auto-imports — no explicit import needed.

- [ ] **Step 2: Commit**

```bash
git add app/composables/useTactileNav.js
git commit -m "feat: add useTactileNav composable for delayed navigation"
```

---

### Task 3: Convert "Explore" button on homepage

**Files:**
- Modify: `app/pages/index.vue:19-27` (template) and add `<script setup>`

- [ ] **Step 1: Replace NuxtLink wrapper with click handler**

In `app/pages/index.vue`, replace lines 19-27:

```html
        <div class="flex justify-center">
          <NuxtLink to="/blog">
            <button
              class="btn focus:outline-none"
              aria-label="Navigate to blog posts"
            >
              Explore
            </button>
          </NuxtLink>
        </div>
```

with:

```html
        <div class="flex justify-center">
          <button
            class="btn focus:outline-none"
            aria-label="Navigate to blog posts"
            @click="navigate('/blog')"
          >
            Explore
          </button>
        </div>
```

- [ ] **Step 2: Add script setup block**

The file currently has no `<script setup>`. Add before the `<style>` tag (before line 41):

```html
<script setup>
const { navigate } = useTactileNav()
</script>
```

- [ ] **Step 3: Verify**

Open browser → homepage → click "Explore". Button should press down, hold ~0.5s, then navigate to /blog.

- [ ] **Step 4: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat: add tactile nav delay to Explore button"
```

---

### Task 4: Convert "← Back" button on blog post page

**Files:**
- Modify: `app/pages/blog/[slug].vue:6-8`

- [ ] **Step 1: Replace NuxtLink wrapper with click handler**

In `app/pages/blog/[slug].vue`, replace lines 6-8:

```html
      <NuxtLink to="/blog">
        <button class="btn focus:outline-none" aria-label="Navigate to blog posts">&larr; Back</button>
      </NuxtLink>
```

with:

```html
      <button class="btn focus:outline-none" aria-label="Navigate to blog posts" @click="navigate('/blog')">&larr; Back</button>
```

- [ ] **Step 2: Add composable to existing script setup**

This file already has a `<script setup>` block. Add at the top of it:

```js
const { navigate } = useTactileNav()
```

- [ ] **Step 3: Commit**

```bash
git add app/pages/blog/[slug].vue
git commit -m "feat: add tactile nav delay to Back button on blog posts"
```

---

### Task 5: Convert "To Home" button on blog listing

**Files:**
- Modify: `app/components/BlogContent.vue:26-33`

- [ ] **Step 1: Replace NuxtLink wrapper with click handler**

In `app/components/BlogContent.vue`, replace lines 26-33:

```html
      <NuxtLink to="/">
        <button
          class="btn focus:outline-none"
          aria-label="Navigate to home page"
        >
          To Home
        </button>
      </NuxtLink>
```

with:

```html
      <button
        class="btn focus:outline-none"
        aria-label="Navigate to home page"
        @click="navigate('/')"
      >
        To Home
      </button>
```

- [ ] **Step 2: Add composable to existing script setup**

This file already has a `<script setup>` block. Add at the top of it:

```js
const { navigate } = useTactileNav()
```

- [ ] **Step 3: Commit**

```bash
git add app/components/BlogContent.vue
git commit -m "feat: add tactile nav delay to To Home button"
```

---

### Task 6: Convert "← Back to All Posts" button on category pages

**Files:**
- Modify: `app/components/BlogContentCategory.vue:27-34`

- [ ] **Step 1: Replace NuxtLink wrapper with click handler**

In `app/components/BlogContentCategory.vue`, replace lines 27-34:

```html
      <NuxtLink to="/blog">
        <button
          class="btn focus:outline-none"
          aria-label="Navigate to blog posts"
        >
          ← Back to All Posts
        </button>
      </NuxtLink>
```

with:

```html
      <button
        class="btn focus:outline-none"
        aria-label="Navigate to blog posts"
        @click="navigate('/blog')"
      >
        ← Back to All Posts
      </button>
```

- [ ] **Step 2: Add composable to existing script setup**

This file already has a `<script setup>` block. Add at the top of it:

```js
const { navigate } = useTactileNav()
```

- [ ] **Step 3: Commit**

```bash
git add app/components/BlogContentCategory.vue
git commit -m "feat: add tactile nav delay to Back to All Posts button"
```

---

### Task 7: Final verification

- [ ] **Step 1: Start dev server**

```bash
bun run dev
```

- [ ] **Step 2: Test all 5 buttons**

| Button | Page | Expected |
|--------|------|----------|
| Explore | Homepage `/` | Press down → 0.5s → navigate to `/blog` |
| ← Back | Any blog post `/blog/[slug]` | Press down → 0.5s → navigate to `/blog` |
| To Home | Blog listing `/blog` | Press down → 0.5s → navigate to `/` |
| ← Back to All Posts | Category page `/blog/frontend` | Press down → 0.5s → navigate to `/blog` |
| Submit | Contact `/contact` | Press down → immediate form submit (no delay) |

- [ ] **Step 3: Test dark mode**

Toggle dark mode → all 5 buttons should render correctly on dark background with no visual artifacts.

- [ ] **Step 4: Test hover states**

Hover each button — gradient should lighten, shadow should deepen slightly.

- [ ] **Step 5: Test reduced motion**

In DevTools → Rendering → enable "Emulate CSS media feature prefers-reduced-motion: reduce". Click buttons — press should be instant (no 0.1s animation).
