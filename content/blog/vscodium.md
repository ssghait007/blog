---
title: Switching to VSCodium from VSCode
description: This post describes how and why I switched to VSCodium from VSCode.
category: Developer
createdAt: 2021-02-16T07:00:13.392Z
image: https://github.com/ssghait007/blog/blob/main/assets/vscodium.png
---



# Switching to VSCodium from VSCode

This post describes how and why I switched to VSCodium from VSCode.

## What is VSCodium ?
VSCodium is a community-driven, freely-licensed binary distribution of Microsoft’s editor VSCode.
In simple words you can download VSCode binary open source build, instead of downloading from Microsoft.

## Why I chose VSCodium over VSCode
When Microsoft build VSCOde binary, some telemetry and tracking is added, 
Read more in detail on below link
https://vscodium.com/#why 

VSCodium project exists so that you dont have to download from Microsofts VSCode download page.
VSCodium project has build scripts, that clone the VSCode repo and create build.
These binaries are licensed under the MIT license. **Telemetry is disabled.**
These builds can be downloaded from Github releases

https://github.com/VSCodium/vscodium/releases  

## Steps to install VSCodium (Windows)
1. Install chocolatey
Head over to chocolatey website https://chocolatey.org/install
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
3. Or you can download exe file directly from link below 
https://github.com/VSCodium/vscodium/releases

## Migrating settings from VSCode to VSCodium 
https://github.com/VSCodium/vscodium/blob/master/DOCS.md#migrating
Your settings are stored in json file `settings.josn` in location `%APPDATA%\Code\User`
Keep a backup of this file and Copy this file to `%APPDATA%\VSCodium\User`
Same can be done for `keybindings.json`

## Conclusion
I liked the performace of VSCodium. Noticed minor performace boost than VSCodium.
There are some caveats like some extensions might not be directly installed from VSCodium, 
But those can be install using vsix files. Downloading directly from marketplace and then install by command
```
code --install-extension myextension.vsix
```




