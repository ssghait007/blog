# Content Freshness Indicators — Design Spec

**Date:** 2026-03-10
**Status:** Approved
**Difficulty:** Trivial | **UX Impact:** 2/5

## Goal

Provide a trust signal so readers know whether technical content is current and maintained. Posts that have been recently created or updated display a colored dot indicator; older posts show nothing.

## Decisions

| Decision | Choice |
|----------|--------|
| Goal | Trust signal — readers know content is current |
| Placement | BlogCard + detail page |
| Data source | `updatedAt` frontmatter field, fallback to `createdAt` |
| Tiers | Fresh (< 6 months, green), Recent (6–18 months, blue), hidden for > 18 months |
| Badge style | Dot + text (minimal, like GitHub/Linear status indicators) |
| Detail page format | Dot + label + formatted date (e.g., "● Fresh · Updated Mar 10, 2025") |
| Classic tier | Hidden — no badge for posts older than 18 months |
| Implementation | Single `FreshnessBadge.vue` component with variant prop |

## Schema Change

Add optional `updatedAt` field to `content.config.ts`:

```typescript
updatedAt: z.string().optional()
```

- Effective date for freshness calculation = `updatedAt ?? createdAt`
- No backfill required — posts without `updatedAt` use `createdAt` and most will fall into the hidden Classic tier
- Authors manually add/update the `updatedAt` field when meaningfully revising a post

## Component: FreshnessBadge.vue

**Location:** `app/components/FreshnessBadge.vue`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `String` | required | ISO date string (the effective freshness date) |
| `variant` | `'compact' \| 'detailed'` | `'compact'` | compact = dot + label; detailed = dot + label + formatted date |

### Tier Logic

Uses `date-fns` `differenceInMonths()`:

| Months since date | Tier | Label | Dot color |
|-------------------|------|-------|-----------|
| 0–5 (< 6) | fresh | Fresh | `#22c55e` (green-500) |
| 6–18 (inclusive) | recent | Recent | `#3b82f6` (blue-500) |
| > 18 | classic | — | Renders nothing |

**Boundary:** `differenceInMonths` truncates, so exactly 6 months = 6 → Recent. Exactly 18 months = 18 → still Recent (use `months <= 18`). 19+ → hidden.

**Guards:** Before computing tiers, validate the date:
- If `date` prop is falsy or `new Date(date)` is invalid (`isNaN`), render nothing
- If the parsed date is in the future, render nothing

### Rendering

**compact variant** (BlogCard):
```
● Fresh
```
Dot (7px circle) + label text in tier color.

**detailed variant** (detail page):
```
● Fresh · Updated Mar 10, 2025
```
Dot + label + separator + formatted date using `date-fns` `format(date, 'MMM d, yyyy')`.

### Dark Mode

Green (#22c55e) and blue (#3b82f6) have sufficient contrast on both light and dark backgrounds. No dark-mode-specific overrides needed.

## Integration Points

### BlogCard.vue

The category `<p>` tag in the card header currently sits alone. Wrap it and the badge in a flex row:

```vue
<div class="flex justify-between items-center">
  <p class="...existing category classes...">{{ post.category }}</p>
  <FreshnessBadge :date="post.updatedAt || post.createdAt" />
</div>
```

This positions the category left and the freshness dot right.

### [slug].vue (detail page)

The detail page currently has no metadata section (no author, date, or reading time displayed). Create a metadata row below the hero image and above the TOC:

```vue
<div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6">
  <span>{{ data.author }}</span>
  <span>&middot;</span>
  <span>{{ formatDate(data.createdAt) }}</span>
  <span>&middot;</span>
  <span>{{ data.readingTime }}</span>
  <FreshnessBadge v-if="data.createdAt" :date="data.updatedAt || data.createdAt" variant="detailed" />
</div>
```

The `v-if` guard ensures the component only renders when a valid date exists.

## Dependencies

- `date-fns` v4.1.0 — already installed
- No new packages required

## What This Does NOT Include

- No automatic date detection from git history (unreliable on Netlify shallow clones)
- No backfill script for existing posts
- No "last updated" sorting on the listing page
- No freshness-based filtering or search
