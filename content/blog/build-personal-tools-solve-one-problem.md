---
title: Why I Build Personal Tools That Solve ONE Problem
description: I built a stock exit validator, a media compression pipeline, and a cryptographic doom scroll blocker. Each solves one problem with zero scope creep.
category: Developer
published: false
createdAt: 2026-03-19T00:00:00.000Z
image: /assets/placeholder.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 7 min read
tags: ['productivity', 'side projects', 'developer']
proficiency: beginner
---

> **TL;DR:** Developers have the rare ability to build tools that solve their own problems — yet most of us tolerate daily annoyances we could fix in an evening. I built three personal tools: a stock exit validator (was selling the right call?), a media compression pipeline (813 photos compressed overnight), and a cryptographic doom scroll blocker (Shamir's Secret Sharing on my own passwords). Each solves exactly one problem, with zero feature creep. With AI coding assistants, the cost of doing this has dropped from a weekend to an evening.

Here's something that bothers me about developers, including myself.

We build complex distributed systems at work. We architect microservices, deploy to Kubernetes, handle millions of requests. We solve hard problems for other people every single day.

Then we go home and manually rename files. Or tolerate an app that annoys us. Or repeat the same task every week because "it's not worth automating."

We have a superpower that most people don't — we can build things. And we're not using it for ourselves.

## The Rule: One Problem, One Tool, Zero Scope Creep

Over the past year, I've been building small personal tools. Not side projects — tools. The difference matters.

A side project is something you want to grow. You add features, plan a roadmap, maybe even dream about launching it. Most side projects die because the ambition outgrows the motivation.

A personal tool solves one specific friction in your life. You build it, you use it, you're done. No landing page. No roadmap. No users.

The rule I follow: **if it takes more than two evenings to build, the scope is too big.** Cut features until it fits.

## Tool 1: The Exit Validator — "Was Selling That Stock the Right Call?"

I invest in stocks. And like most retail investors, I have a problem — after selling a stock, I keep checking the price. If it goes up, I feel regret. If it drops, I feel smart. Neither feeling is useful.

I wanted an objective answer to one question: **"Based on what happened after I sold, was it a good decision?"**

So I built a tool. It takes my sell date, the stock ticker, and shows me what happened in the weeks and months after. Price movement, percentage change, how it compared to the broader market.

No portfolio tracker. No buy recommendations. No charts with 50 indicators. Just one question, answered with data.

![placeholder: screenshot of exit validator showing post-sale price analysis for a stock](/assets/placeholder.webp)

> One question: was selling the right call? Answered with data, not feelings.

The result was interesting — I discovered that most of my exits were actually fine. The regret was unfounded. Just seeing the data in a clean format removed the emotional noise.

**Build cost:** One evening with Claude Code.

**Ongoing value:** Every time I sell a stock, I check. Takes 10 seconds. Saves hours of emotional second-guessing.

## Tool 2: Media Compression Pipeline — Overnight NAS Cleanup

I have a NAS (Network Attached Storage) at home where my phone backs up photos and videos automatically. After a couple of years, the storage was getting full. Thousands of photos across dozens of folders, many of them unnecessarily large.

I could have just bought a bigger drive. But the engineer in me saw this differently — it's not a storage problem, it's a compression problem.

I built a shell script that:
1. Connects to the NAS over SSH
2. Pulls files locally in batches
3. Compresses photos and videos (with quality settings I chose)
4. Pushes the compressed versions back
5. Removes the originals after verification

The first run processed 813 photos overnight while I slept. I added parallel processing to handle multiple folders simultaneously. Later I added PNG and WAV support when I found those formats eating space too.

![placeholder: terminal output showing compression pipeline processing folders in parallel](/assets/placeholder.webp)

> 813 photos compressed overnight. I woke up to 40% more free space.

The important thing: I didn't build a "media management platform." There's no UI, no web interface, no database. It's a script. I run it when storage gets low. That's it.

**Build cost:** One evening for V1, another hour to add parallel processing.

**Ongoing value:** I run it every few months. Each run reclaims significant storage without buying hardware.

## Tool 3: Shamir's Secret Sharing — Engineering a Doom Scroll Blocker

This one is my favorite because it's the most absurd application of serious cryptography to a silly human problem.

I was addicted to doom scrolling. Twitter, Reddit, YouTube shorts — the usual suspects. I tried app blockers, screen time limits, willpower. Nothing stuck because the workaround was always too easy. Just disable the blocker and you're back in.

Then I had an idea: what if the workaround was technically difficult?

I used Shamir's Secret Sharing — a cryptographic algorithm that splits a secret into multiple shares, where you need a minimum number of shares to reconstruct the original. It's used in enterprise key management and nuclear launch codes. I used it on my Instagram password.

I split my social media passwords into 3 shares and distributed them:
- One share on my phone
- One share on my laptop
- One share in a password manager I deliberately made inconvenient to access

To log in, I need to combine at least 2 shares. This means I can't impulsively open Instagram from my phone alone — I need to go get my laptop, find the other share, run the reconstruction script, and then log in.

By the time I've done all that, the impulse is gone.

![placeholder: diagram showing Shamir's Secret Sharing splitting a password into 3 shares](/assets/placeholder.webp)

> Cryptography designed for nuclear launch codes, applied to my Instagram password.

**Build cost:** A couple of hours, mostly understanding the cryptography.

**Ongoing value:** My screen time dropped significantly. Not because I can't access social media — but because the effort required is enough to break the automatic habit loop.

## The Pattern

Look at these three tools. They have nothing in common technically — one is a data analysis script, one is a shell pipeline, one is applied cryptography. But they share the same pattern:

1. **Identify a specific recurring friction** — not a vague problem, a specific one you can describe in one sentence
2. **Resist the urge to build a "full app"** — no UI unless absolutely necessary, no features nobody asked for, no database unless you need one
3. **Build the smallest thing that removes the friction** — if it works, stop
4. **Use it and move on** — this is a tool, not a project

The anti-pattern is turning every personal tool into a side project. The moment you think "maybe I should add user accounts" or "I could put this on Product Hunt" — you've crossed the line from solving your problem to creating a new one.

## Why This Matters Now More Than Ever

Here's the thing that changed in the last year: the cost of building personal tools dropped dramatically.

Before AI coding assistants, building the Exit Validator would have meant:
- Researching stock price APIs (30 min)
- Setting up the project, installing dependencies (20 min)
- Writing the data fetching logic (1 hour)
- Building some way to display the results (1 hour)
- Debugging (30 min)

That's a solid 3-hour investment for something you might use once a month. Hard to justify.

With Claude Code, the same tool took about 40 minutes. I described what I wanted, iterated on the approach, and had a working version. The AI handled the API research, the boilerplate, and most of the debugging.

The economic equation for personal tools has completely changed. The question is no longer "is it worth the time?" — it almost always is now.

![placeholder: before/after comparison showing time to build a personal tool with and without AI](/assets/placeholder.webp)

> The cost of building personal tools dropped from a weekend to an evening

## The Hidden Benefit: Better Product Instincts

There's a benefit to building personal tools that I didn't expect.

When you build something for yourself, you're the user and the developer. You feel every UX friction. You know instantly when a feature is unnecessary. You scope ruthlessly because your time is the cost.

These are exactly the skills that make you better at your day job:

- **Problem identification** — spotting the real friction, not the perceived one
- **Ruthless scoping** — cutting everything that doesn't directly solve the problem
- **Shipping over perfecting** — a working script beats a planned app
- **User empathy** — because you ARE the user

Every personal tool I've built has made me slightly better at building things for other people. It's practice, disguised as productivity.

## Your Turn

Here's a question for you: **what's one thing you do manually every week that annoys you?**

Not a big life problem. A small, specific friction. Something that takes 5 minutes of your time but irritates you every single time.

You have the skills to fix it. And with AI tools, you have the time. An evening — probably less.

Don't plan a product. Don't design a system. Open your terminal, describe the problem to your AI assistant, and build the smallest thing that makes the annoyance go away.

Then use it and move on. That's it.

💡 The best use of our skills isn't always at work. Sometimes it's building a compression script that runs overnight, or a stock checker that takes 10 seconds, or using nuclear-grade cryptography to stop yourself from scrolling Twitter at 2 AM. Small tools. Big quality of life improvements. No scope creep.
