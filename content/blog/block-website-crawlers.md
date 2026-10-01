---
title: Block Google search bots from indexing your website
description: 'How to keep your site out of Google results: use Search Console for a temporary removal, or robots.txt to block all bots, specific bots or specific pages.'
category: Frontend
published: true
createdAt: 2021-08-01T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/block-crawlers.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 3 min read
tags: ['seo', 'robots-txt', 'google-search-console', 'web-crawlers']
proficiency: Beginner
# beginner intermediate advanced 
---

> **TL;DR:** Need to remove your website from Google search results? There are two approaches. For a temporary 6-month block, use Google Search Console to submit URL removal requests. For a permanent solution, modify your `robots.txt` file to disallow crawlers from indexing specific pages or the entire site. The post covers both methods, explains the difference between blocking indexing vs blocking crawling, and shows how to target specific bots like Googlebot.

I recently come across a use case where I had to remove listing a website from google search. This was a rare use case so I looked for the ways we could achieve this.

There are 2 ways to do this task, listed below

## How do I temporarily remove my site from Google search?

You can use [google search console](https://search.google.com/) to temporarily block website from being listed in google search.

It is a very simple UI that accepts the requests for blocking URL paths from your website.

You have an option to block a single webpage or whole website.

Webpage block or website block request lasts only for about 6 months, After that your website will appear in google search.

Blocking a URL does not prevent Google from crawling your page, only from showing it in Search results.

![Google Search Console page for requesting temporary removal of a URL](/assets/google-console.webp)

## How do I block crawlers permanently with robots.txt?

You can disallow crawlers to a certain part website or whole website by modifying your `robots.txt` file.

`robots.txt` file is used to communicate with web crawlers. This file should be kept in root directory. You can configure this file to prevent crawlers from indexing webpages in your site.

> "A robots.txt file tells search engine crawlers which URLs the crawler can access on your site. This is used mainly to avoid overloading your site with requests; it is not a mechanism for keeping a web page out of Google." — [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

So if a page must never appear in search results, use a `noindex` tag or password-protect it. Don't block that page in `robots.txt` at the same time, because Google has to crawl the page to see the `noindex` tag.


Use cases for blocking crawlers can be,

- block indexing certain parts of your website that has private info
- block indexing a website which is in maintenance mode
- block indexing web pages intended for internal use or company use

To block all crawler bots from indexing all pages in your website, `robots.txt` will look like this,

```
User-agent: *
Disallow: /
```

In `User-agent` field you can add specific bots like Googlebot, Bingbot, etc.

In `Disallow` field you can add specific routes from your website like `/private/` or `/private/blocked-page.html`

## Frequently Asked Questions

### Does robots.txt remove my page from Google?

No. It stops crawling, not indexing. A blocked URL can still show up in results if other sites link to it. Use a `noindex` meta tag or password protection to keep a page out of Google.

### How long does a Search Console removal last?

About 6 months. After that the page can come back unless you also add `noindex`, remove the page, or password-protect it.

### How do I block only AI crawlers?

Add a separate group per bot in `robots.txt`, for example `User-agent: GPTBot` followed by `Disallow: /`. Common AI user agents include `GPTBot`, `ClaudeBot`, `CCBot` and `Google-Extended`. Blocking `Google-Extended` does not affect normal Google Search.

## References

- [Google: Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google: Remove your site info from Google](https://developers.google.com/search/docs/crawling-indexing/remove-information)
- [Google: Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
