---
title: Say goodbye to unused node modules in your computer.
description: The post describes how npkill helps save time on deleting node_modules folders manually.
category: Developer
published: true
createdAt: 2021-05-05T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/node-modules-app-performance_.png
---

# Say goodbye to unused node modules in your computer.

This is not a `how-to` post, rather discussion on how NPKill is
useful for developers (NodeJs or Javacript).

## Problem

Every NodeJs or Javacript developer is aware that the node modules
takes up lot of space than actual code they write.

Number of projects you work on can easily increase if you are,

- Working on different projects in your org
- Trying out any new small POCs
- Cloning/forking some git repos to try it out
- Contributing to open source projects/repos
- Freelancer doing small repeatable projects

With time some projects can get stale, but they consume the
a lot of space due to node_modules.

It can get very tiring to find these folders and delete the
node_modules manually. It can easily take hours.

## Solution

To easily tackle above problem, I found a npm library `NPKill` that
automates this process

NPKill helps to list all node_module folders and you can easily navigate this list and delete the ones you dont need.

So your manual process that takes hours is reduced to just 5-10 minutes.

There is one thing to note, you have to run the command at root folder where your projects are, or in case of windows run at each drive level (ex C:/ or D:/).
It searches all child folders, does not search whole file system.

You can find out how to use it here.
It is very well documented.

- https://npkill.js.org/
