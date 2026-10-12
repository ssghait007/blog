# Code review issues (UX commits `1c2e22f`..`61be574`)

Each issue was reproduced on the local dev server (`npm run dev`, port 3111) in Chrome
using Claude in Chrome, fixed, then re-checked the same way. Status meanings:

- **Fixed** = reproduced, fixed, re-verified in the browser.
- **Unverified** = not reproducible or not testable by me; left unchanged for manual validation.

| # | Issue | Status | Evidence (before → after) |
|---|---|---|---|
| 1 | Duplicate `id="toc-heading"` and two `nav` landmarks labelled by it | **Fixed** | 2 elements with the same id → ids are now unique per instance (`toc-heading-<useId>`), every `aria-labelledby` points to an existing element, still unique after toggling Quick/Deep Read |
| 2 | Copy button scrolls away with long lines and overlaps the first line | **Fixed** (see note) | Overlap: button bottom at 32px and first code line at 16px → code now starts at 44px (`padding-top: 2.5rem`). Scroll: button moved -400px when the block scrolled 400px → stays 8px from the right edge |
| 3 | `MutationObserver` on `document.body` rescans on every page mutation | **Fixed** | 10 `pre` scans for 10 unrelated body mutations → 0; observer is scoped to `#article-body` and a code block added inside the article still gets a button |
| 4 | Copy handler copies the button label; reset timer not cleared | **Fixed** (see note) | Copied text was `echo hello\nCopy` → code only. Second click's "Copied" label was reset early (about 0.9s) → stays "Copied" |
| 5 | `?sort=` unvalidated; filter change drops other query params | **Fixed** | `?sort=foo&utm_source=x&category=Cloud` gave a blank `<select>` and removed `utm_source` after a chip click → select shows "Newest first", `sort` is validated, `utm_source` is kept |
| 6 | Sidebar TOC stays visible in Quick Read but links to hidden headings | **Fixed** | Clicking a TOC entry in Quick Read did nothing (target height 0, scroll unchanged) → TOC (sidebar and collapsible) is not rendered in Quick Read and returns in Deep Read |
| 7 | Scroll-reveal loop copy-pasted; watcher created inside `onMounted` | **Unverified** | Maintainability only, no failing behaviour to reproduce, so left unchanged |
| 8 | `tocLinks` comment says h2 only but does not filter by depth | **Fixed** (hardened) | Not a live bug: all current TOC entries are depth 2 (9 entries on `what-is-cors`). Added a `depth === 2` filter; entry count unchanged at 9 |
| 9 | Heading anchors lost their trailing dash (`#when-to-use-git-bisect-`) | **Fixed** | Old link did not scroll (scrollY 0, id missing) → old-style hash now scrolls to the heading, which sits 96px below the top (`scroll-margin-top` clears the fixed header) |
| 10 | Six eager card images, most below the fold on phones | **Fixed** | At 390px width: 6 eager, 4 below the fold → 3 eager, 1 below the fold. Desktop: 3 eager, all visible |

## Notes for manual validation

- **#2 scroll pinning:** the automation tab runs hidden (`document.hidden === true`), so real scroll events do not fire. I verified the handler by setting `scrollLeft` and dispatching a synthetic `scroll` event. Please scroll a long code line horizontally in a real browser to confirm the button stays in the corner.
- **#4 unmount cleanup:** pending reset timers are now cleared on unmount, but I could not observe that path directly.
- **#6 behaviour differed from the review text:** the click did nothing rather than jumping up; the fix is the same.
- **Viewport:** the window could not be resized below desktop width, so the 390px checks used a same-origin 390px iframe, and the 1500px+ sticky sidebar was checked by forcing it visible with CSS.
- **Dev warning:** opening an old anchor link logs Vue Router `R0042` (dev only), because the router looks for the old id before the alias handler runs.
