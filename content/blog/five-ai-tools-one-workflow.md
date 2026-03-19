---
title: Five AI Tools, One Workflow - My Multi-Brain Development Stack
description: I mapped five AI tools to five cognitive phases of development — research, ideation, design, implementation, and discipline.
category: Developer
published: false
createdAt: 2026-03-19T00:00:00.000Z
image: /assets/placeholder.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 8 min read
tags: ['ai', 'workflow', 'productivity']
proficiency: intermediate
---

> **TL;DR:** Using one AI tool for everything is like using a hammer for every job. I use five AI tools — NotebookLM for research, ChatGPT for brainstorming, Google Stitch for UI design, Claude Code for implementation, and the Superpowers plugin for quality gates. Each tool maps to a different phase of how I think and build. The workflow is the product, not any single tool.

I used to do everything in one AI tool. Research a library? ChatGPT. Write the code? ChatGPT. Debug it? ChatGPT. Design the UI? Also ChatGPT.

It worked, but it felt like I was asking a Swiss Army knife to be a power drill. The tool was decent at everything but great at nothing.

Over the past few months, I started mapping different AI tools to different phases of my work. Not because I wanted to use more tools — but because I noticed each tool has a sweet spot, a specific type of thinking it handles better than others.

Here's the workflow I landed on.

![placeholder: diagram showing 5 phases - Research → Ideation → Design → Implementation → Discipline](/assets/placeholder.webp)

> The five phases mapped to five tools

## Phase 1: NotebookLM — The Research Brain

Before I write a single line of code, I need to understand the problem space. Not just "what API do I call" but the deeper context — what has been tried before, what are the tradeoffs, what does the documentation actually say.

NotebookLM is perfect for this. I load up documentation, technical papers, or even existing codebases as sources. Then I have a conversation with that specific context.

The key difference from other AI tools: NotebookLM doesn't hallucinate as much because it's grounded in the sources you provide. When I ask "how does this authentication flow work?", it points me to the exact section in the docs.

I spend 15-20 minutes here before touching any other tool. This sounds slow, but it prevents the much more expensive mistake of building the wrong thing.

![placeholder: screenshot of NotebookLM with loaded sources and a research conversation](/assets/placeholder.webp)

> NotebookLM grounded in actual documentation, not general knowledge

## Phase 2: ChatGPT — The Rubber Duck

Once I understand the problem, I need to validate my approach. This is where ChatGPT shines — fast, low-friction, back-and-forth conversation.

I use it like a rubber duck that talks back. "I'm thinking of structuring this as a pipeline with three stages — does that make sense?" or "What are the downsides of using WebSockets here instead of SSE?"

ChatGPT is great for this because the conversation is lightweight. I'm not loading a codebase, I'm not setting up context. I'm just thinking out loud and getting quick pushback.

The goal of this phase isn't code — it's confidence. By the time I leave ChatGPT, I know what I'm going to build and roughly how.

![placeholder: screenshot of a ChatGPT conversation exploring architectural tradeoffs](/assets/placeholder.webp)

> Quick back-and-forth to validate an approach before committing

## Phase 3: Google Stitch — The Design Eye

This is the phase most developers skip entirely. They go straight from "I know what to build" to writing components. The result is UI that works but doesn't feel right.

Google Stitch lets me generate multiple visual variants of a UI concept in minutes. I describe what I want, and it produces real, styled designs — not wireframes, actual visual mockups.

The trick I use: I ask for 3-5 variations of the same screen. Different layouts, different color approaches, different information hierarchy. Then I pick the best elements from each.

This "generate broadly, curate narrowly" approach means my final UI is always better than what I would have designed in one shot. The cost of exploring 5 options is minutes, not days.

![placeholder: screenshot showing multiple Stitch UI variants side by side](/assets/placeholder.webp)

> Five variants of the same screen — the best design comes from having options

## Phase 4: Claude Code — The Builder

Now it's time to actually build. This is where Claude Code takes over — full codebase context, subagent delegation, plan documents, git worktrees.

What makes Claude Code different from using AI in a chat window is that it operates inside your project. It reads your files, understands your patterns, and writes code that fits your codebase — not generic snippets you have to adapt.

I use a few specific patterns here:

- **Plan documents** before implementation — a markdown file describing what we're building and why, so the AI and I are aligned
- **Subagent delegation** — I dispatch smaller models (like Sonnet) for broad exploration tasks (searching across files, understanding patterns) while keeping the main agent focused on architecture decisions
- **Git worktrees** — for parallel feature development, I create isolated worktrees so multiple agents can work on different features without stepping on each other

The research from Phase 1, the validated approach from Phase 2, and the design from Phase 3 all feed into this phase. Claude Code isn't starting from zero — it's executing a plan that's already been thought through.

![placeholder: screenshot of Claude Code working with plan document and subagents](/assets/placeholder.webp)

> Claude Code executing a plan, not guessing what to build

## Phase 5: Superpowers Plugin — The Discipline Layer

This is the phase I wish I had discovered earlier. Speed without discipline is how you ship bugs faster.

The Superpowers plugin for Claude Code adds quality gates to the workflow. It's a set of skills that enforce good engineering habits:

- **Brainstorming before code** — the plugin forces you to explore requirements and edge cases before implementation starts. No more "let me just start coding and figure it out"
- **Code review workflows** — automated review that checks your implementation against the original plan, not just syntax
- **Verification before completion** — before you can claim something is "done", the plugin requires you to run tests and confirm the output. Evidence before assertions

Without this layer, the speed of AI-assisted development becomes dangerous. You can write a feature in 20 minutes that has subtle bugs that take 2 hours to debug. The discipline layer catches those before they compound.

![placeholder: screenshot of Superpowers enforcing a brainstorming step before implementation](/assets/placeholder.webp)

> Superpowers forcing a brainstorm before I can start writing code

## Why the Workflow Matters More Than Any Single Tool

The real insight isn't about these five specific tools. It's about mapping different cognitive tasks to the right tool for each one.

Think about it this way:

| Phase | Cognitive Task | What You Need | Tool |
|-------|---------------|---------------|------|
| Research | Understanding | Grounded, source-based answers | NotebookLM |
| Ideation | Validating | Fast, low-friction conversation | ChatGPT |
| Design | Visualizing | Multiple visual options quickly | Google Stitch |
| Building | Implementing | Full codebase context | Claude Code |
| Quality | Disciplining | Enforced checkpoints | Superpowers |

If you use one tool for all five phases, you're asking it to be something it's not for at least three of them.

## What This Looks Like in Practice

Here's a recent example. I was building an ideas management feature for a personal project — a tab where I could capture thoughts, rate them with stars, and thread sub-thoughts underneath.

1. **NotebookLM** — I loaded documentation about state management patterns and existing note-taking app architectures. Spent 15 minutes understanding what works.
2. **ChatGPT** — I described my concept and asked "what's the simplest data model that supports nested threads with ratings?" Got pushback on my initial approach, iterated to something cleaner.
3. **Google Stitch** — Generated 4 variants: ranked list, kanban board, mind map, and sticky notes. Picked ranked list for V1 but saved the kanban concept for later.
4. **Claude Code** — Built the feature with a plan document, using subagents to scaffold the component structure while I focused on the data layer.
5. **Superpowers** — Ran the code review skill to verify the implementation matched the plan. Caught two edge cases I'd missed.

Total time: about 2 hours for a feature that would have taken a full day with a single-tool approach.

## Bonus: Obsidian as the Reflection Layer

I want to mention one more tool that doesn't fit neatly into the five phases but ties everything together: Obsidian.

At the end of each day, I spend 5-10 minutes in my "Mindful Dailies" template — a quick journal of what I built, what worked, what didn't, and what I want to tackle tomorrow. It's not AI-powered, it's just markdown and thinking.

This reflection habit is what keeps the five-tool workflow from becoming a mindless process. It's where I notice patterns like "I keep skipping Phase 2 and regretting it" or "the Stitch variants saved me from a bad design choice again."

The tools do the work. The reflection makes the work better over time.

## Try This

You don't need to adopt all five tools tomorrow. Start with this exercise:

1. Think about the last feature you built
2. Which cognitive phases did you go through? (research, ideation, design, building, review)
3. How many of those phases did you force through a single tool?
4. Where did you get stuck or produce subpar results?

That stuck point is where a specialized tool would have helped most. Start there.

💡 The best developers I know aren't the ones with the most powerful AI tool. They're the ones who know when to switch tools — because they understand that different types of thinking need different types of support.
