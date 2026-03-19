---
title: Mining My AI History to Build a Smarter Workflow
description: I mined my Claude Code memory logs to discover recurring patterns, then turned them into custom rules and skills that make my AI tools smarter about me.
category: Developer
published: false
createdAt: 2026-03-19T00:00:00.000Z
image: /assets/placeholder.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 9 min read
tags: ['ai', 'productivity', 'workflow']
proficiency: intermediate
---

> **TL;DR:** After months of daily AI-assisted development, I realized my conversation history is a goldmine of data — about me. I used the claude-mem plugin and Claude Code's /insights command to mine my own work patterns, discovered recurring mistakes and preferences, and turned those into custom rules (CLAUDE.md) and skills that make Claude work like I do. Your AI usage data is the most personal dataset you'll ever have access to. Use it.

There's a phrase that gets thrown around a lot in tech: "data is the new oil." Usually it's about user data, market data, analytics dashboards.

But here's something I never considered — I've been generating data about my own work habits every single day, and I was throwing it away.

Every conversation I have with Claude Code, every correction I make, every decision I explain — that's data. Data about how I think, how I make decisions, what mistakes I keep making, and what approaches work best for me.

I decided to mine it.

## The Two Sources I Mined

I had two sources of data about my own AI usage.

### Source 1: The claude-mem Plugin

The [claude-mem plugin](https://github.com/anthropics/claude-mem) is a persistent memory system for Claude Code. It records observations across sessions — discoveries, decisions, bug fixes, feature implementations — all searchable and timestamped.

After months of use, I had hundreds of observations spanning multiple projects. Bug fixes in my compliance platform, design decisions in my blog, architecture choices in my fitness app, infrastructure work across AWS, GCP, and Azure.

This wasn't just a log. It was a searchable database of how I work.

![placeholder: screenshot of claude-mem search results showing observations across projects](/assets/placeholder.webp)

> Months of work decisions, searchable by keyword and date

### Source 2: The /insights Command

Claude Code has a `/insights` command that surfaces patterns in how you use the tool — what you ask for most, where you spend time, what types of tasks dominate your sessions.

Combined with claude-mem, this gave me two views: what I **do** (insights) and what I **decide** (memory).

![placeholder: screenshot of /insights command output showing usage patterns](/assets/placeholder.webp)

> Usage patterns I never would have noticed without looking at the data

## What I Found: Three Types of Patterns

I spent an evening going through my history. Not reading every conversation — searching for patterns. Here's what jumped out.

### Pattern 1: Recurring Corrections

The most valuable discovery was the corrections I kept giving Claude. The same feedback, over and over, across different sessions:

- "Don't hardcode AWS account IDs — use dynamic references"
- "Don't use `gh pr edit` — it triggers deprecation errors. Use the REST API"
- "Dispatch subagents for broad exploration, don't do it in the main context"
- "Don't create files that weren't explicitly requested"

Each of these corrections cost me 30 seconds to type. But I was typing them multiple times a week. Across months, that's hours of repeating myself.

The pattern was clear: I had implicit rules in my head that I kept enforcing manually. Why not write them down once?

### Pattern 2: Consistent Approaches

My memory logs showed that I approach work in a consistent way, whether I'm building a UI feature, fixing infrastructure, or debugging a distributed system:

1. Research first (load docs, understand context)
2. Plan before code (write a plan document)
3. Mockup before component (create HTML mockups for UI work)
4. Evaluate before scale (test quality on small sample first)

I wasn't doing this consciously — it's just how I work. But seeing it spelled out in the data made me realize I could encode these patterns into tools that enforce them automatically.

### Pattern 3: Tool Switching Points

The data showed when I switch between tools and why. NotebookLM for research, ChatGPT for quick validation, Claude Code for implementation. Each switch happened at a predictable point in the workflow.

This pattern became the foundation for my [multi-tool workflow](/blog/five-ai-tools-one-workflow). Without mining the data, I wouldn't have seen the pattern clearly enough to formalize it.

![placeholder: diagram showing the three pattern types discovered from mining AI history](/assets/placeholder.webp)

> Three types of patterns hiding in plain sight

## Turning Patterns Into Rules: CLAUDE.md

The first actionable step was simple: write my recurring corrections into a file that Claude reads automatically.

Claude Code supports a `CLAUDE.md` file — a markdown file at the root of your project (or in your user home directory) that contains instructions Claude follows in every session. Think of it as your personal rulebook.

Here's a portion of what I added to my user-scope CLAUDE.md:

```markdown
## General Rules
- Do not create files that weren't explicitly requested
- Keep explanations concise. Prefer action over lengthy explanation
- For wide-level code exploration, dispatch a subagent with specific
  instructions. Do not perform broad codebase exploration inline.

## GitHub
- Never use `gh pr edit` or `gh issue edit` — they trigger deprecation
  errors. Use the REST API directly.

## AWS / Infrastructure
- Never hardcode AWS account IDs, regions, or credentials in code.
  Always use dynamic references.
```

This took 20 minutes to write. It saves me from repeating the same corrections every single day.

The important thing: I didn't invent these rules. I discovered them by looking at what I was already correcting. The data told me what the rules should be.

![placeholder: screenshot of CLAUDE.md file with custom rules](/assets/placeholder.webp)

> Rules I discovered from my own correction patterns

## Turning Patterns Into Skills: Custom Claude Skills

Rules handle the "don't do X" patterns. But what about the "always do Y" patterns — my consistent approaches?

For those, I built custom Claude Code skills. A skill is a reusable prompt template that Claude follows when invoked. It's like a checklist that enforces a specific workflow.

Here are a few I created based on the patterns I discovered:

### Skill: PR Autofix

From my memory logs, I noticed I follow the same pattern with every PR: create it, wait for CodeRabbit review, address comments, re-trigger review. I was doing this manually every time.

So I built a skill that automates the loop — it monitors the PR for review status, fixes issues, and re-triggers reviews until approved.

### Skill: Debugging Template

My debugging approach is consistent: reproduce the issue, check logs, form hypothesis, verify hypothesis, then fix. I kept explaining this process to Claude in different debugging sessions.

Now it's a skill. When I encounter a bug, I invoke the debugging skill and it follows my methodology automatically.

### Skill: Research-First Planning

My "research before code" pattern became a skill that enforces documentation discovery before writing an implementation plan. It won't let me skip straight to coding.

![placeholder: screenshot showing custom skills list in Claude Code](/assets/placeholder.webp)

> Skills built from my own work patterns, not generic templates

## The Feedback Loop

Here's where it gets interesting. The process of mining your AI history isn't a one-time thing. It's a loop:

1. **Work** — use AI tools normally across projects
2. **Capture** — claude-mem records observations automatically
3. **Mine** — periodically search for patterns (monthly works well)
4. **Extract** — turn patterns into CLAUDE.md rules or custom skills
5. **Improve** — the rules and skills make future work smoother
6. **Repeat** — new patterns emerge as your workflow evolves

Each cycle makes the AI a little smarter about you specifically. Not smarter in general — smarter about how you think, what you care about, and how you like to work.

After three cycles, the difference was noticeable. Fewer corrections per session. Less time explaining my preferences. More time building.

![placeholder: diagram showing the feedback loop - work, capture, mine, extract, improve](/assets/placeholder.webp)

> The self-improving feedback loop

## What AI Learns vs What You Learn

There's a deeper point here that goes beyond AI tools.

When you use an AI assistant, the AI learns about code — patterns, libraries, best practices. That's useful but generic. Every developer gets roughly the same code suggestions.

But when you mine your own AI history, **you** learn about yourself. You discover:

- What mistakes you keep making (and can prevent)
- What approaches consistently work for you (and can encode)
- Where you waste time (and can optimize)
- How your workflow actually works vs how you think it works

This is the most personal dataset you'll ever have access to. No one else has your exact combination of projects, decisions, preferences, and corrections. It's data about your thinking process, captured in real time, across months of real work.

The companies that win in tech are the ones that use their data well. The same applies to individual developers.

## Getting Started

You don't need months of history to start. Here's what I'd suggest:

1. **Install claude-mem** (or whatever persistent memory tool your AI supports) — start capturing observations now
2. **After 2-3 weeks**, search your memory for the word "don't" or "instead" or "not" — these are your correction patterns
3. **Write 5-10 rules** into your CLAUDE.md based on what you find
4. **After a month**, look for your consistent approaches — research-first? Plan-first? Test-first? Encode the strongest one as a custom skill
5. **Review quarterly** — your patterns evolve, your rules should too

The first time you start a session and Claude already knows your preferences without you explaining them — that's the moment it clicks.

💡 We talk about AI getting smarter. But the real unlock is when you use AI's memory of your work to get smarter about yourself. The data is already there. You just have to look at it.
