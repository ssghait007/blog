# GEO (Generative Engine Optimization): onthegoalways.com

Audited 2026-09-29 (live site via Chrome + repo). Fixes applied the same day. Score estimate before: ~60/100. Qualitative, since no official GEO score exists.

GEO = how likely ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews are to find, trust and cite your pages.

## Done

| # | Item | What changed |
|---|---|---|
| 1 | Homepage/page meta | Real title and description on home, blog index, categories, about, contact, privacy, authors. Title template, default OG image, canonical URLs (`app/utils/schema.js`, `nuxt.config.ts`) |
| 2 | `llms.txt` | `/llms.txt` (index by category) and `/llms-full.txt` (all post text), generated at build (`server/routes/llms*.txt.ts`) |
| 3 | AI crawler policy | `public/robots.txt` explicitly allows OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, CCBot |
| 4 | Sitemap `lastmod` | Posts use their own date; authors use their latest post; about/contact/privacy have no `lastmod`. Dropped `changefreq`/`priority` |
| 5 | Duplicate JSON-LD | Stable keys via `useJsonLd`. The built HTML has each block exactly once |
| 6 | Site schema | `WebSite` + `Person` on the home page, `Blog` on `/blog`, `CollectionPage`/`ItemList` on categories, `AboutPage` on about |
| 7 | `BlogPosting` | Publisher is now an `Organization` with logo. Added `wordCount`, `timeRequired`, `abstract`, `proficiencyLevel`, author `sameAs`/`knowsAbout`/image |
| 8 | FAQ / breadcrumbs | `FAQPage` built from each post's FAQ section, `BreadcrumbList` on posts, categories, authors. (`HowTo` skipped on purpose: Google retired HowTo rich results) |
| 9 | Author entity | `ProfilePage` + `Person` schema, richer bio and topics, removed the unused `jane-doe` placeholder |
| 10 | Draft posts | Kept unpublished. They are now `noindex, nofollow` and excluded from sitemap/`llms.txt`. **Still to finish:** `api-tasks-automation`, `five-ai-tools-one-workflow`, `generic-product-price-monitor`, `my-hactoberfest-experience`, `mining-ai-history-smarter-workflow` |
| 12 | Author trust on posts | Byline links to the author page (`rel="author"`), author box with bio/GitHub/LinkedIn and "Last reviewed" date |
| 13 | Internal links | "Related posts" (shared tags/category) on each post. Fixed 3 posts in a non-existent `Development` category (now `Developer`) |
| 15 | Titles/descriptions | 22 descriptions cut to ≤160 chars, answer-first. Fixed `it ?` in the CORS title |
| 16 | Images | Descriptive alt text on 36 markdown images, post hero alt = post title. **Placeholder images in the draft posts are still to replace** |
| 17 | Headers | Removed the malformed `Link` header, added HSTS, `text/plain` for `llms*.txt` |

## Still needs you (can't be done honestly by code)

- [ ] **#11 Content depth.** Add first-hand evidence to thin sections: real command output, error text, versions, screenshots, costs, what failed. The CORS body is the weakest example. Use "I tested this on…".
- [ ] **#12 Author credentials.** `content/authors/sachin-ghait.md` has a `TODO(author)` comment. Add verifiable facts: employer/role, years of experience, certifications, talks, open-source projects.
- [ ] **#14 Refresh old posts.** Re-check commands/versions in 2021–2023 posts, then bump `updatedAt` only for real changes.
- [ ] **#10 Drafts.** Finish and publish the 5 drafts, or delete them.
- [ ] **#18 Off-site presence.** Cross-post to dev.to/Hashnode with a canonical link, post on Reddit/Hacker News, keep the same name/bio/photo on GitHub, LinkedIn and X.
- [ ] **#19 Measure.** Submit the sitemap to Google Search Console and Bing Webmaster Tools. Track AI referrers in GA (`chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`). Monthly, ask ChatGPT/Perplexity/Gemini your target questions and note whether you are cited.
- [ ] **Image dimensions.** Add `width`/`height` to in-post images and check header images are ≥1200px wide for social/AI previews.
- [ ] **CSP header.** Not added because it needs testing against GA and Giscus.

## Extra ideas: status

1. **IndexNow + Bing: done.** Key file in `public/`, `npm run indexnow` submits the sitemap URLs (or the URLs you pass). Run it after each deploy. Also verify the site in Bing Webmaster Tools.
2. **Markdown mirrors: done.** `scripts/postgenerate.mjs` (part of `npm run generate`) writes `dist/blog/<slug>.md` for every published post. Posts link to it with `rel="alternate" type="text/markdown"`. Your Cloudflare build command must run `npm run generate` (or `bun run generate`), not `nuxt generate` directly.
3. **Original data: started.** The Lambda post now has a NAT gateway vs VPC endpoint cost table, calculated from AWS list prices checked on 2026-09-29. Add your own measured benchmarks over time.
4. **Glossary: done.** `/glossary` has 15 terms linked to their posts, with `DefinedTermSet` schema.

## Post review (all 27 published posts)

- Added a real `<h1>` to every post (3 had none) and removed the duplicate body H1s.
- Removed emoji from headings, replaced "here" link text with descriptive text.
- Still open: posts under ~600 words (`adding-security-headers`, `easily-remove-node-modules`, `vscodium`, `vue-ffmpeg-wasm`, `running-selenium-webdriver-on-raspberry-pi-zero`) need more depth from your own experience.
- Still open: `build-personal-tools-solve-one-problem` and `how-to-create-nuxt-blog` have no References section.

## Caveats

- Alt text for images was written from filenames and surrounding text, not by viewing each image. Skim them.
- The score is a qualitative estimate, not from a standard tool.
