---
title: Bug introduced in recent commits ? Git bisect to rescue
description: How to use git bisect to find which commit introduced bug.
category: Developer
published: true
createdAt: 2021-03-10T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/git-bisect.webp
---

# Bug introduced in recent commits ? Git bisect to rescue

How to use git bisect to find which commit introduced bug.

## What is git bisect ?

Git command that uses binary search to find the commit that introduced a bug.

## When to use git bisect ?

1. You can use git bisect to find out which commit caused the bug
2. You might be looking for the commit that introduced a particular fix/feature, I this caseyou can use the terms "old" and "new", respectively, in place of "good" and "bad". git bisect will report which commit introduced the feature/fix

## How to use git bisect ?

I will take very easy example of a button that is supposed to navigate user to `/blog` path.
But in recent commits this is broken.
Lets find out the commit which broke it.
Here is the recent commit history

![image alt text](https://raw.githubusercontent.com/ssghait007/blog/main/assets/git-bisect-commits.JPG)

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

![image alt text](https://raw.githubusercontent.com/ssghait007/blog/main/assets/git-bisect-log.JPG)

4. Now you can check files changed in this commit and easily find out what caused it.

```bash{1,3-5}
$ git show commitID
```

I can see this commit has changed the `to` path to incorrect value.

![image alt text](https://raw.githubusercontent.com/ssghait007/blog/main/assets/git-bisect-buggy-commit.JPG)

5. When you are done you need to tell git to stop the bisect process

```bash{1,3-5}
$ git bisect reset
```

## Gotchas

1. There can be a case in git bisect when your commit is faling build process and you are not able to test if commit is bad or good, But you know this commit is nothing to do with the bug, You can skip this commit and move to next one.

```bash{1,3-5}
$ git bisect skip
```

## Conclusion

If you use git bisect, you can save a lot of time (that you will spend into debugging).
and narrow down the code you need to check to resolve bug.
