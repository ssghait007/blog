---
title: Three Lessons From Giving My AI a Voice
description: 'I gave my AI a voice with Kokoro TTS on my Mac. Along the way I learned three things: start rough, benchmark before you decide, and steal good ideas from the software you use.'
category: Developer
published: true
createdAt: 2026-10-01T00:00:00.000Z
image: /assets/placeholder.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 6 min read
tags: ['text-to-speech', 'kokoro', 'apple-silicon', 'benchmarking', 'ai-tools']
proficiency: beginner
---

> **TL;DR:** I already talk to my AI with [Handy](https://handy.computer). I wanted it to talk back, so I gave it a voice: Kokoro, a tiny local text-to-speech model that reads its answers out loud. It crackled once in a while (mostly on low battery), it was slow to start, and new models launch every week. So I benchmarked 8 of them, moved to MLX, and borrowed a "keep the model warm" trick from Handy. Now my AI starts speaking in 0.2 seconds. Three lessons came out of it: start rough, measure before you decide, and steal good ideas from the software you use.

![placeholder: a laptop with a speech bubble coming out of the screen](/assets/placeholder.webp)

My AI already had ears.

I gave it a mouth.

And it taught me three things I want to share with you.

## Why did I want to listen instead of read?

I use [Handy](https://handy.computer) every day.

And I really love it ❤️

I press a key, I speak, and my words appear as text.

It's free, open source, and runs fully on my machine. Nothing leaves my laptop.

Honestly, it's one of those rare tools that just works, every single time.

It's the fastest way I know to give an LLM a long, messy prompt.

But the other direction was still slow.

The AI writes back. A lot.

Paragraphs. Lists. More paragraphs.

And I have to sit there and read all of it with tired eyes.

Some moments I want to read fast. That's fine.

But other moments I'm relaxed. I'm leaning back.

I don't want to read.

I want to **listen and think.**

So I went looking for a voice.

## Lesson 1: Why start with something imperfect?

This search started a long time ago.

I tried a few text-to-speech models and settled on [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M).

It's tiny. Only 82 million parameters.

And it sounds surprisingly human.

I ran its ONNX version on my M3 MacBook, on the CPU.

And once in a while… it crackled 🎧

Not always. Rarely, in fact.

Mostly when my battery was running low and the Mac started saving power.

Rare enough to live with. Just enough to be annoying.

Here's the thing though.

**I used it anyway.**

For months.

A slightly cracky voice that reads to me beats a perfect setup that only exists in my head.

Using it every day taught me what I actually needed.

Fast. Natural. Light on my machine.

I would never have known those requirements if I had waited for the perfect tool.

## Lesson 2: Why benchmark before you decide?

Then I got a new MacBook.

I wanted the same setup. Without the crackle.

And I had a nagging question.

New text-to-speech models come out every week.

**Is Kokoro still the best?**

I could have guessed.

I could have trusted a blog post.

Instead, I measured.

I ran 8 models on the same sentence, on the same machine:

| Model | Peak RAM | Speed vs real time | What it's good at |
|---|---|---|---|
| **Kokoro** 82M | 0.8 GB | 34× faster | Fast, natural, 54 voices |
| Kitten nano | 0.2 GB | 86× faster | Smallest and fastest |
| Kitten micro | 0.3 GB | 34× faster | |
| Kitten mini | 0.5 GB | 24× faster | |
| Soprano 1.1 | 1.0 GB | 34× faster | Fast |
| Pocket TTS | 0.4 GB | 9× faster | 8 built-in voices |
| Chatterbox | 3.4 GB | ~2.5× faster | Voice cloning |
| Orpheus 3B | 7.4 GB | 2× *slower* | Emotion, `<sigh>` and `<laugh>` |

A few things surprised me.

Soprano advertises "2000× real time".

On my Mac? 34×.

Orpheus sounds amazing with its little sighs and laughs.

It's also slower than real time. Great for audiobooks. Useless for a quick answer.

And Kokoro?

It didn't win any single row.

It won on **balance.** Fast enough. Small enough. Natural enough.

So I stayed with it.

Measuring also fixed the crackle.

I moved Kokoro from the CPU to [MLX](https://github.com/Blaizzy/mlx-audio), Apple's framework for its own chips.

I added a few safety nets too: split long text into sentences, blend the joins, render the whole file before playing.

No crackle since. Not on the new Mac. Not on the old one either ✅

But the best finding was hiding in the timings.

Every time I asked for speech, I waited about **2.5 seconds.**

I assumed Kokoro was slow to generate.

It wasn't.

Generating the sentence took **0.19 seconds.**

The rest was loading the model and warming it up.

Every. Single. Time.

My gut said "the model is slow".

The numbers said "the *startup* is slow".

Without measuring, I would have fixed the wrong thing.

## Lesson 3: Why steal ideas from the software you use?

So how do you skip the startup?

I already knew the answer.

I had seen it in [Handy](https://handy.computer).

Handy has a setting called **Unload Model.**

It keeps the speech model in memory for a while after you use it, then frees it after a set time.

So the next time you press the key, it's instant.

I had scrolled past that setting many times as a user.

This time I looked at it as a developer.

*That's exactly my problem.*

So I built the same thing for Kokoro.

A small background server loads the model once and keeps it warm.

After 10 quiet minutes, it shuts down and gives the memory back.

Next request? It starts itself again.

| | Time to first sound | Memory |
|---|---|---|
| Before | ~2.85 s, every time | 0.8 GB, only while running |
| After (warm) | **~0.22 s** | ~0.7 GB, released after 10 idle minutes |

13× faster to start talking.

For about 1% of my RAM.

And it's not just Handy. [Ollama](https://docs.ollama.com/faq) keeps models warm for 5 minutes by default. [LM Studio](https://lmstudio.ai/docs/app/api/ttl-and-auto-evict) keeps them for 60.

Same idea, everywhere.

I just had to notice it.

## What does it look like now?

Meet `ksay`.

```bash
ksay "Hello there"                 # Bella, my default voice
ksay -v af_nicole "Hello there"    # Nicole
echo "a long AI answer" | ksay     # pipe anything into it
```

Quick note for any K-pop fans who found this through a search: sorry 🙇

`ksay` has nothing to do with K-pop.

No idols. No lightsticks. No comeback schedule.

The K is for Kokoro.

Though in fairness, Bella does have a great voice. Debut-worthy, even.

Now when an AI answer is long, I don't read it.

I lean back.

I listen.

I think.

The code is open source if you want to try it: [ssghait007/tts-kokoro](https://github.com/ssghait007/tts-kokoro).

## Three takeaways for developers

Start with something imperfect, because a rough tool you use beats a perfect tool you are still waiting for.

Benchmark before you decide, because numbers find the problems your instincts miss.

Study how the software you use is built, because good ideas move easily from one product to another.

## Frequently Asked Questions

### What is the best local text-to-speech model for a Mac?

For everyday use, Kokoro-82M. In my tests on an M5 Pro it generated speech 34× faster than real time using under 1 GB of RAM. For voice cloning, Chatterbox. For emotional narration, Orpheus.

### Why does Kokoro crackle?

In my case it was rare and mostly happened on low battery, when the Mac throttles to save power and generation can fall behind playback. Common causes are very long input text, clicks where audio chunks join, playback running ahead of generation, and GPU glitches with PyTorch on Macs. Running it on MLX, splitting text into sentences and rendering the whole file before playing removed the crackle for me.

### How much memory does keeping a TTS model warm cost?

For Kokoro, about 0.7 GB while idle, with zero CPU. On a 64 GB machine that's around 1%, and it's released after 10 minutes of no use.

## References

- [Kokoro-82M on Hugging Face](https://huggingface.co/hexgrad/Kokoro-82M)
- [mlx-audio](https://github.com/Blaizzy/mlx-audio)
- [Handy: advanced settings](https://handy.computer/docs/advanced)
- [Ollama FAQ: keeping a model loaded](https://docs.ollama.com/faq)
- [LM Studio: TTL and auto-evict](https://lmstudio.ai/docs/app/api/ttl-and-auto-evict)
- [tts-kokoro: the code from this post](https://github.com/ssghait007/tts-kokoro)
