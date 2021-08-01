---
title: Block search engine crawler bots from indexing your website (In google search).
description: This post describes how to block search engine bots to index your website. 
category: Developer
published: true
createdAt: 2021-08-01T07:00:13.392Z
image: https://tse2.mm.bing.net/th?id=OIP._ZevpyXlLACAWbAa9bn36QHaF6&pid=Api
---

# Block search engine crawler bots from indexing your website (In google search).

I recently come across a use case where I had to remove listing a website from google search. This was a rare use case so I looked for the ways we could achieve this. 

There are 2 ways to do this task, listed below

## 1. **Temporary block method.**

You can use [google search console](https://search.google.com/) to temporarily block website from being listed in google search.

It is a very simple UI that accepts the requests for blocking URL paths from your website.

You have an option to block a single webpage or whole website.

Webpage block or website block request lasts only for 6 months, After that your website will appear in google search.

Blocking a URL does not prevent Google from crawling your page, only from showing it in Search results.

![google search console](https://www.suvaance.com/microblog/wp-content/uploads/2020/01/Outdated-Content.png)

## 2. **Permanent block method.**

You can disallow crawlers to a certain part website or whole website by modifying your `robots.txt` file.

`robots.txt` file is used to communicate with web crawlers. This file should be kept in root directory. You can configure this file to prevent crawlers from indexing webpages in your site.

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
