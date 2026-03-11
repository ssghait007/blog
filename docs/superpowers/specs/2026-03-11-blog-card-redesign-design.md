# Blog Card Redesign — Minimal Clean (A1)

## Summary

Restyle BlogCard.vue to a cleaner, muted aesthetic. Same content structure, reduced color noise. No layout/structural changes to the grid or page — only the card internals.

## Approved Design

Visual mockup approved via brainstorm companion session.

## Color Palette (replacing current)

| Element | Current | New |
|---------|---------|-----|
| Card border | `border-gray-200` | `#e8ecf1` (custom or `border-gray-200/60`) |
| Card shadow | `shadow-md` | `0 1px 3px rgba(0,0,0,0.04)` — much subtler |
| Card radius | `rounded-lg` | `rounded-xl` (12px) |
| Category text | `text-gray-500` | `text-indigo-500` (`#6366f1`) |
| Title | `text-gray-900` | `#1a1a2e` (keep `dark:text-gray-100`) |
| Description | `text-gray-700` | `text-slate-500` (`#64748b`) |
| Tags bg | `bg-green-500` (white text) | `bg-slate-100` (`#f1f5f9`) with `text-slate-600` |
| Proficiency tag | `bg-blue-500` (white text) | Same muted style as other tags |
| Tag separator | `border-b-2` | `border-b border-slate-100` (thinner) |
| Author name | default | `text-slate-700` (`#334155`), `font-semibold` |
| Author title | `text-gray-700` | `text-slate-400` (`#94a3b8`) |
| Reading time | `text-gray-900` | `text-slate-600` (`#475569`) |
| Date | `text-gray-700` | `text-slate-400` (`#94a3b8`) |
| Hover border | `border-purple-500` | `border-indigo-400` (softer) |

## Content Arrangement (unchanged)

1. Image (top, `object-cover`)
2. Category label (left) + FreshnessBadge (right)
3. Title
4. Description
5. #TAG pills row (with separator below)
6. Author avatar + name + title (left) | Reading time + date (right)

## Dark Mode

Retain existing `dark:` prefixes. Only adjust light-mode values. Dark mode already uses gray-100/200/300 which work well with the minimal aesthetic.

## Scope

- **Changed**: `app/components/BlogCard.vue` — Tailwind classes only
- **Not changed**: FreshnessBadge, grid layout, parallax hover, page structure

## What NOT to do

- Don't change the parallax hover effect
- Don't change the 3-column grid layout
- Don't add new components or files
- Don't modify FreshnessBadge styling
