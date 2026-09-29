---
title: Ignoring Files - A Guide to .gitignore, .dockerignore, and More
description: 'What .gitignore, .dockerignore and .npmignore do, when to use each, and how they keep repos clean, Docker images small and packages lean.'
category: Developer
published: true
createdAt: 2023-05-28T00:00:00.000Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/ignorefiles.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 6 min read
tags: ['git', 'gitignore', 'docker', 'dockerignore', 'npm']
proficiency: intermediate
---

> **TL;DR:** Ignore files are essential but often overlooked. This post covers the purpose and syntax of `.gitignore` (keep repos clean, protect secrets), `.dockerignore` (reduce image size, speed up builds), `.npmignore` (control what gets published to npm), `.eslintignore`, and `.prettierignore` (skip files from linting/formatting). Each section explains when and why to use them with practical examples.

In software development, various ignore files help in managing version control systems, optimizing Docker image builds, and enhancing development workflows. Let's explore some of the important ignore files and understand their significance.

## What does .gitignore do?

The `.gitignore` file is used in Git repositories to specify files and directories that should be ignored and not committed to the repository. It helps keep the repository clean, avoids clutter, and improves version control efficiency.

> "A gitignore file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected." — [Git documentation](https://git-scm.com/docs/gitignore)

That second sentence matters. Adding an already committed file to `.gitignore` does not untrack it. Run `git rm --cached <file>` first, then commit.


By using a well-defined `.gitignore` file, you can:

- **Exclude build artifacts:** Prevent generated files, such as compiled binaries, object files, or log files, from cluttering your repository and bloating its size.
- **Ignore dependencies:** Exclude third-party libraries or dependencies installed by package managers, as these can be easily installed again by other developers using dependency management tools.
- **Protect sensitive information:** Ensure that sensitive data, such as API keys, passwords, or configuration files containing sensitive information, are not accidentally committed to the repository and exposed to unauthorized users.
- **Improve collaboration:** By keeping unnecessary files out of the repository, you reduce merge conflicts and make collaboration with other developers smoother and more efficient.

## What does .dockerignore do?

Similar to `.gitignore`, the `.dockerignore` file is used in Docker projects to specify files and directories that should be excluded when building Docker images. It plays a crucial role in optimizing Docker image builds.

By using a well-structured `.dockerignore` file, you can:

- **Reduce image size:** Exclude files and directories that are not required during runtime, such as development-specific files, temporary files, or unnecessary build artifacts. This significantly reduces the size of the Docker image, resulting in faster image transfers and improved container startup times.
- **Improve build performance:** Ignoring irrelevant files and directories reduces the build context size, which speeds up the Docker image build process. Docker only needs to process and transfer the files specified in the build context, resulting in faster and more efficient builds.

## What does .npmignore do?

In Node.js projects, the `.npmignore` file specifies files and directories that should not be included when publishing a package to the npm registry. It allows you to exclude unnecessary files such as tests, documentation, or development-specific files from being distributed with the package.

By using a well-configured `.npmignore` file, you can:

- **Exclude development files:** Remove test files, documentation, or source files that are not necessary for the package consumers.
- **Reduce package size:** Exclude large or unnecessary files from being distributed with the package, resulting in a smaller package size and faster installation times.

## Which other ignore files should I know?

In addition to the aforementioned ignore files, there are other important ones used in various contexts:

- **.eslintignore:** Used in projects that utilize ESLint, a popular JavaScript linter. It lets you specify files and directories that should be ignored while linting.  
- **.prettierignore:** Used with Prettier, a code formatter that helps ensure consistent code style across a project. It allows you to specify files and directories that should not be formatted by Prettier.  
- **.gitkeep:** This file is used to preserve empty directories in a Git repository, as Git does not track empty directories by default. Adding a `.gitkeep` file to an otherwise empty directory allows it to be committed to the repository.

## Frequently Asked Questions

### Why is Git still tracking a file I added to .gitignore?

Because it was committed before you ignored it. `.gitignore` only affects untracked files. Run `git rm --cached <file>` and commit, and Git will ignore it from then on.

### What happens if I don't have an .npmignore file?

npm falls back to your `.gitignore`. A safer option is the `files` field in `package.json`, which lists exactly what gets published.

### Is .eslintignore still supported?

Not with ESLint's flat config (the default from ESLint v9). Put ignore patterns in the `ignores` property of `eslint.config.js` instead.

## References

- [Git: gitignore documentation](https://git-scm.com/docs/gitignore)
- [Docker: .dockerignore files](https://docs.docker.com/build/concepts/context/#dockerignore-files)
- [npm: the files field in package.json](https://docs.npmjs.com/cli/configuring-npm/package-json#files)
- [ESLint: ignore files](https://eslint.org/docs/latest/use/configure/ignore)
