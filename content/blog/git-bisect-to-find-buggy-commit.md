---
title: Git bisect is here to save your day
description: 'Use git bisect to find the exact commit that introduced a bug: a step-by-step example with the commands, common gotchas and how to automate it.'
category: Developer
published: true
createdAt: 2021-03-10T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/git-bisect.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 6 min read
tags: ['git', 'git-bisect', 'debugging']
proficiency: Beginner
# beginner intermediate advanced 
---

> **TL;DR:** When a bug appears and you don't know which commit caused it, `git bisect` uses binary search to find the culprit in logarithmic time. You mark a known good commit and a known bad commit, and Git checks out the midpoint for you to test. After a few iterations, it identifies the exact breaking commit. This post walks through a practical example of finding a broken navigation link, including gotchas to watch out for.

This blog discusses how we can use git bisect command to find commit that has introduced bug recently.

## What is git bisect ?

> "Use binary search to find the commit that introduced a bug" — [Git documentation](https://git-scm.com/docs/git-bisect)

Binary search halves the list of suspect commits at every step. With 1,000 commits between a good and a bad version, bisect needs only about 10 steps, because 2^10 = 1,024.

## When to use git bisect ?

1. You can use git bisect to find out which commit caused the bug
2. You might be looking for the commit that introduced a particular fix/feature, I this caseyou can use the terms "old" and "new", respectively, in place of "good" and "bad". git bisect will report which commit introduced the feature/fix

## How to use git bisect ?

I will take very easy example of a button that is supposed to navigate user to `/blog` path.
But in recent commits this is broken.
Lets find out the commit which broke it.
Here is the recent commit history

![Git commit history with good and bad commits marked for git bisect](/assets/git-bisect-commits.webp)

1. You need to tell git you want to start bisect, then you need to provide which is the bad commit (recent one most times) and which was the good commit.

```bash{1,3-5}
$ git bisect start
$ git bisect bad
/* I have not provided any bad commit,
   So git will consider latest as bad commit
*/
$ git bisect good db32414
```

2. Git bisect will pick a commit between those two endpoints and ask you whether the selected commit is "good" or "bad". Test if the bug is present or not and update same with `git bisect bad` or `git bisect good` command.

3. Keep following step 2. Git bisect will continue narrowing down the range until it finds the exact commit that introduced the change.

![Terminal output of git bisect log](/assets/git-bisect-log.webp)

4. Now you can check files changed in this commit and easily find out what caused it.

```bash{1,3-5}
$ git show commitID
```

I can see this commit has changed the `to` path to incorrect value.

![git bisect output identifying the first bad commit](/assets/git-bisect-buggy-commit.webp)

5. When you are done you need to tell git to stop the bisect process

```bash{1,3-5}
$ git bisect reset
```

## What if I can't test a commit?

1. There can be a case in git bisect when your commit is faling build process and you are not able to test if commit is bad or good, But you know this commit is nothing to do with the bug, You can skip this commit and move to next one.

```bash{1,3-5}
$ git bisect skip
```

## Conclusion

If you use git bisect, you can save a lot of time (that you will spend into debugging).
and narrow down the code you need to check to resolve bug.

## Frequently Asked Questions

### Can git bisect run my tests automatically?

Yes. Run `git bisect run npm test` (or any script). Exit code 0 marks a commit good, 1 to 127 marks it bad, and 125 skips it.

### How many steps will git bisect take?

About log2(N) steps for N commits. 100 commits take about 7 steps, and 1,000 commits take about 10.

### How do I see what I've marked so far?

Run `git bisect log` to print every good, bad and skip decision. You can save it and replay it later with `git bisect replay`.

## References

- [Git: git-bisect documentation](https://git-scm.com/docs/git-bisect)
- [Pro Git book: Debugging with Git](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git)
