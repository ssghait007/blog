# Content Freshness Indicators Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dot + text freshness badges to BlogCard and blog detail pages so readers can see whether content is current.

**Architecture:** A single `FreshnessBadge.vue` component computes a freshness tier (Fresh/Recent/hidden) from a date prop using `date-fns`. It's consumed in two places: `BlogCard.vue` (compact) and `[slug].vue` (detailed with formatted date). The data source is an optional `updatedAt` frontmatter field that falls back to `createdAt`.

**Tech Stack:** Vue 3, Nuxt 4 compat, date-fns v4.1.0 (already installed), Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-10-content-freshness-indicators-design.md`

---

## Chunk 1: Schema + Component + Integration

### Task 1: Add `updatedAt` to content schema

**Files:**
- Modify: `content.config.ts:16` (after `createdAt` line)

- [ ] **Step 1: Add `updatedAt` field to blog schema**

In `content.config.ts`, add `updatedAt` after `createdAt` on line 16:

```typescript
createdAt: z.string(),
updatedAt: z.string().optional(),
```

- [ ] **Step 2: Verify the dev server starts without errors**

Run: `bun run dev`
Expected: Server starts cleanly. No schema validation errors (all existing posts lack `updatedAt`, which is fine since it's optional).

- [ ] **Step 3: Commit**

```bash
git add content.config.ts
git commit -m "schema: add optional updatedAt field to blog collection"
```

---

### Task 2: Create `FreshnessBadge.vue` component

**Files:**
- Create: `app/components/FreshnessBadge.vue`

- [ ] **Step 1: Create the component**

Create `app/components/FreshnessBadge.vue`:

```vue
<template>
  <span v-if="tier" class="inline-flex items-center gap-1.5 text-xs font-medium" :style="{ color: tier.color }">
    <span class="inline-block w-[7px] h-[7px] rounded-full" :style="{ backgroundColor: tier.color }" />
    <span>{{ tier.label }}</span>
    <template v-if="variant === 'detailed' && formattedDate">
      <span class="text-gray-400 dark:text-gray-500">&middot;</span>
      <span class="text-gray-500 dark:text-gray-400">Updated {{ formattedDate }}</span>
    </template>
  </span>
</template>

<script setup>
import { differenceInMonths, format } from 'date-fns'

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'compact',
    validator: (v) => ['compact', 'detailed'].includes(v),
  },
})

const TIERS = {
  fresh: { label: 'Fresh', color: '#22c55e' },
  recent: { label: 'Recent', color: '#3b82f6' },
}

const tier = computed(() => {
  if (!props.date) return null

  const parsed = new Date(props.date)
  if (Number.isNaN(parsed.getTime())) return null
  if (parsed > new Date()) return null

  const months = differenceInMonths(new Date(), parsed)

  if (months < 6) return TIERS.fresh
  if (months <= 18) return TIERS.recent
  return null
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  const parsed = new Date(props.date)
  if (Number.isNaN(parsed.getTime())) return ''
  return format(parsed, 'MMM d, yyyy')
})
</script>
```

- [ ] **Step 2: Verify component auto-imports in dev server**

Run: `bun run dev`
Open browser devtools, check for no errors. Component should be available as `<FreshnessBadge>` via Nuxt auto-import.

- [ ] **Step 3: Commit**

```bash
git add app/components/FreshnessBadge.vue
git commit -m "feat: add FreshnessBadge component with dot+text tier display"
```

---

### Task 3: Integrate into BlogCard.vue

**Files:**
- Modify: `app/components/BlogCard.vue:17-22` (header section)

- [ ] **Step 1: Wrap category and badge in flex row**

In `BlogCard.vue`, replace the category `<p>` block (lines 18-22) with a flex wrapper:

```vue
<!-- Before (lines 18-22): -->
<p
  class="tracking-widest text-xs title-font font-medium text-gray-500 dark:text-gray-400 mb-1"
>
  {{ post.category }}
</p>

<!-- After: -->
<div class="flex justify-between items-center mb-1">
  <p
    class="tracking-widest text-xs title-font font-medium text-gray-500 dark:text-gray-400"
  >
    {{ post.category }}
  </p>
  <FreshnessBadge :date="post.updatedAt || post.createdAt" />
</div>
```

Note: `mb-1` moves from the `<p>` to the wrapper `<div>`.

Also update the `_formatDate` function in `BlogCard.vue` (line 115-117) to use the same format as `FreshnessBadge` for consistency:

```javascript
// Before:
const _formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy')
}

// After:
const _formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy')
}
```

- [ ] **Step 2: Verify in browser**

Run dev server, navigate to `/blog`. Check:
- Cards with `createdAt` older than 18 months show no badge (most posts)
- Category still displays on the left
- Layout is not broken — flex row doesn't push content around

- [ ] **Step 3: Commit**

```bash
git add app/components/BlogCard.vue
git commit -m "feat: add freshness badge to BlogCard header"
```

---

### Task 4: Integrate into blog detail page

**Files:**
- Modify: `app/pages/blog/[slug].vue:14-17` (after hero image, before TOC)

- [ ] **Step 1: Add metadata row with freshness badge**

In `[slug].vue`, add a metadata section after the `<img>` block (after line 17) and before the TOC `<div>` (line 19):

```vue
      <img
        v-if="data?.image"
        class="lg:w-4/6 md:w-5/6 w-6/6 mb-10 object-cover object-center rounded"
        alt="hero"
        :src="data.image"
      >

      <div v-if="data" class="lg:w-4/6 md:w-5/6 w-full flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6">
        <span>{{ data.author }}</span>
        <span>&middot;</span>
        <span>{{ _formatDate(data.createdAt) }}</span>
        <span>&middot;</span>
        <span>{{ data.readingTime }}</span>
        <FreshnessBadge v-if="data.createdAt" :date="data.updatedAt || data.createdAt" variant="detailed" />
      </div>

      <div v-if="data?.toc?.links?.length > 0" class="lg:mt-16 mb-8">
```

- [ ] **Step 2: Add date formatting function to script**

In the `<script setup>` section of `[slug].vue`, replace the commented-out import on line 38 (`// import { format } from 'date-fns' // Removed unused import`) with the active import plus a formatter function:

```javascript
import { format } from 'date-fns'

const _formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM d, yyyy')
}
```

- [ ] **Step 3: Verify in browser**

Navigate to any blog post (e.g., `/blog/how-to-create-nuxt-blog`). Check:
- Metadata row shows: author, date, reading time
- Freshness badge appears (or doesn't, depending on post age)
- Layout doesn't break the hero image or TOC spacing

- [ ] **Step 4: Commit**

```bash
git add app/pages/blog/[slug].vue
git commit -m "feat: add metadata row with freshness badge to blog detail page"
```

---

### Task 5: Add `updatedAt` to a test post and verify end-to-end

**Files:**
- Modify: `content/blog/how-to-create-nuxt-blog.md` (frontmatter only)

- [ ] **Step 1: Add `updatedAt` to one post for testing**

Add `updatedAt` to the frontmatter of `content/blog/how-to-create-nuxt-blog.md` (after the `createdAt` line):

```yaml
createdAt: 2021-02-01T07:00:13.392Z
updatedAt: 2026-03-10T00:00:00.000Z
```

- [ ] **Step 2: Verify badge appears on BlogCard**

Navigate to `/blog`. The "Build a blog using Nuxt and Tailwind CSS" card should now show a green dot with "Fresh" in the top-right of the header area.

- [ ] **Step 3: Verify badge appears on detail page**

Navigate to `/blog/how-to-create-nuxt-blog`. The metadata row should show:
`Sachin Ghait · Feb 1, 2021 · 10 min read ● Fresh · Updated Mar 10, 2026`

- [ ] **Step 4: Verify posts without `updatedAt` behave correctly**

Navigate to another post that does NOT have `updatedAt`. Confirm:
- If `createdAt` is older than 18 months → no badge shown
- Metadata row still renders (author, date, reading time) without a badge

- [ ] **Step 5: Commit**

```bash
git add content/blog/how-to-create-nuxt-blog.md
git commit -m "content: add updatedAt to nuxt blog post for freshness testing"
```

---

### Task 6: Build verification

- [ ] **Step 1: Run static site generation**

Run: `bun run generate`
Expected: Build completes without errors. No schema validation issues.

- [ ] **Step 2: Preview the build**

Run: `bun run preview`
Spot-check the blog listing and one detail page to confirm badges render in the static output.

- [ ] **Step 3: Final commit if any adjustments needed**

If the build revealed issues requiring fixes, commit those fixes. Otherwise, skip this step.
