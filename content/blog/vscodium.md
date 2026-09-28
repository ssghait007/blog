---
title: Meet VSCodium. A Visual Studio Code Alternative.
description: Discover VSCodium, a community-driven alternative to Visual Studio Code. Learn why I switched from VSCode and how to install VSCodium on Windows
category: Developer
published: true
createdAt: 2021-02-16T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/vscodium.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 6 min read
tags: ['vscodium', 'vscode', 'open-source', 'privacy']
proficiency: intermediate
# beginner intermediate advanced 
---

> **TL;DR:** When Microsoft builds VS Code, it adds telemetry and tracking to the binary. VSCodium is a community-driven project that takes the same open-source VS Code codebase, builds it without telemetry, and distributes it under the MIT license. You get the same editor, same extension support, and same features -- just without the tracking. This post explains why VSCodium exists and walks through installation on Windows using Chocolatey.

# Meet VSCodium. A Visual Studio Code Alternative.

This post describes how and why I switched to VSCodium from VSCode.

## What is VSCodium ?

VSCodium is a community-driven, freely-licensed binary distribution of Microsoft’s editor VSCode.
In simple words you can download VSCode binary open source build, instead of downloading from Microsoft.

## Why choose VSCodium over VS Code?

When Microsoft build VSCOde binary, some telemetry and tracking is added,
Read more in detail on [vscodium.com](https://vscodium.com/#why).

VSCodium project exists so that you dont have to download from Microsofts VSCode download page.
VSCodium project has build scripts, that clone the VSCode repo and create build.
These binaries are licensed under the MIT license. **Telemetry is disabled.**
These builds can be downloaded from [GitHub releases](https://github.com/VSCodium/vscodium/releases).

## How do I install VSCodium on Windows?

1. Install chocolatey
   Head over to the [Chocolatey install page](https://chocolatey.org/install)

   Copy below command and run in powershell (run as admin)

```bash{1,3-5}
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

2. Run below command to install VSCodium with chocolatey

```bash{1,3-5}
choco install vscodium
```

3. Or you can download the exe file directly from [GitHub releases](https://github.com/VSCodium/vscodium/releases)

## How do I move my VS Code settings to VSCodium?

See the [official migration guide](https://github.com/VSCodium/vscodium/blob/master/DOCS.md#migrating).

Your settings are stored in json file `settings.json` in location `%APPDATA%\Code\User`

Keep a backup of this file and Copy this file to `%APPDATA%\VSCodium\User`

Same can be done for `keybindings.json`

## Conclusion

I liked the performace of VSCodium. Noticed some performace boost than VSCode.

After Checking in control panel found the size of installation for VSCode is 3MB more than VSCodium.
So some extra things must be there in VSCode package.

There are some caveats with VSCodium like some extensions might not be directly installed from VSCodium,
But those can be install using vsix files. Downloading directly from marketplace and then install by command

```
codium --install-extension myextension.vsix
```

## Frequently Asked Questions

### Where does VSCodium get extensions from?

From the [Open VSX Registry](https://open-vsx.org/) by default, not the Microsoft Marketplace. If an extension is missing, download its `.vsix` file and install it with `codium --install-extension`.

### Is VSCodium completely free of telemetry?

VSCodium's builds turn off Microsoft's telemetry by default. Some extensions collect their own telemetry, so check each extension's settings too.

### How do I install VSCodium on macOS or Linux?

On macOS run `brew install --cask vscodium`. On Linux, use the packages or instructions on [vscodium.com](https://vscodium.com/).

## References

- [VSCodium website](https://vscodium.com/)
- [VSCodium on GitHub](https://github.com/VSCodium/vscodium)
- [Open VSX Registry](https://open-vsx.org/)
