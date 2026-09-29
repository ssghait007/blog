---
title: Selenium Webdriver on Raspberry Pi Zero W.
description: 'Run Selenium WebDriver on a Raspberry Pi Zero W with the chromium-chromedriver package to automate browser tasks on a tiny device.'
category: Developer
published: true
createdAt: 2021-09-11T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/selenium-on-raspberry-pi.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 7 min read
tags: ['raspberry-pi', 'selenium', 'chromedriver', 'arm']
proficiency: intermediate
# beginner intermediate advanced 
---

> **TL;DR:** Want to run Selenium-based browser automation on a Raspberry Pi Zero W? Firefox's geckodriver dropped ARM support in 2018, so it's a dead end. The solution is using the `chromium-chromedriver` package that comes pre-built for ARM on Raspbian. This post covers the challenges of running browser automation on ARM hardware, the geckodriver vs chromedriver decision, and the full setup for headless Chromium with Selenium on Pi Zero W.

# Selenium Webdriver on Raspberry Pi Zero W.

I have earlier written a post on how selenium can be used to automate browser based tasks.

Find that post [here](https://onthegoalways.com/blog/selenium-automate-browser-tasks).

I recently bought a raspberry-pi, So wanted to add some tasks like making changes in router settings on raspberry-pi device.

## What hardware does the Raspberry Pi Zero W use?

Raspberry-pi's raspbian OS is Linux based and its hardware is arm based.
The Pi Zero W has a 1 GHz single-core ARMv6 CPU and 512 MB of RAM. That's small, so a headless browser is the only practical choice.

To check this on your raspberry-pi device run below command.

```bash{1,3-5}
$ uname -a

Linux raspber 5.10.17+ #1414 Fri Apr 30 13:16:27 IST 2021 armv6l GNU/Linux
```

## Why didn't geckodriver work on the Raspberry Pi? 😞

I decided to go for firefox and geckodriver combination along with selenium. I thought this will be lightweight than chromium.

I did not find any suitable version of geckodriver for arm based machines. As geckodriver project has stopped supporting it since 2018.

I tried out some older versions of geckodriver shared online. But none of these work for me.

I also tried one geckodriver version built by someone following [Mozilla's ARM build guide](https://firefox-source-docs.mozilla.org/testing/geckodriver/ARM.html). And this as well didn't work.

I was getting error for OS mismatch with all geckodriver executables I tried.

```bash{1,3-5}
Firefox - OSError: [Errno 8] Exec format error
```

## How do I run Selenium on a Raspberry Pi Zero W? ✔️

I thought I have stuck dead-end and was about to keep this thing on the side.
Then I found [an article about the chromium-chromedriver package](https://ivanderevianko.com/2020/01/selenium-chromedriver-for-raspberrypi) supported by the Raspbian project.

Run below command to install chromium-chromedriver package

```bash{1,3-5}
$ sudo apt-get install chromium-chromedriver
```

This installs both chromium browser and chromedriver on raspberry-pi. Chromium is required for selenium to run a browser in headless mode and chromedriver to connect and control that browser.

> "Selenium automates browsers. That's it!" — [selenium.dev](https://www.selenium.dev/)


This package works awesome on raspberry-pi, I was able to get the selenium tasks
installed, and run them from CLI commands.

Later on I used ngrok to access these from anywhere, more about that in below post

Find that post [here](https://onthegoalways.com/blog/using-ngrok-to-access-raspberry-pi-from-anywhere).

## Frequently Asked Questions

### Why do I get "Exec format error" on a Raspberry Pi?

The binary was built for a different CPU architecture. Many prebuilt ARM binaries target ARMv7 or ARM64, but the Pi Zero W runs ARMv6, so they won't start.

### Do Chromium and chromedriver versions need to match?

Yes. chromedriver only works with the matching major Chromium version. Installing both from the same `chromium-chromedriver` package keeps them in sync.

### How do I run Chromium headless from Python?

Create `webdriver.ChromeOptions()`, call `options.add_argument('--headless')`, and pass the options to `webdriver.Chrome(options=options)`.

## References 🖊️

- [Selenium chromedriver for Raspberry Pi (Ivan Derevianko)](https://ivanderevianko.com/2020/01/selenium-chromedriver-for-raspberrypi)
- [Mozilla: Building geckodriver for ARM](https://firefox-source-docs.mozilla.org/testing/geckodriver/ARM.html)
- [Raspberry Pi Stack Exchange: Exec format error](https://raspberrypi.stackexchange.com/questions/63258/selenium-firefox-oserror-errno-8-exec-format-error)
- [Raspberry Pi forums thread](https://www.raspberrypi.org/forums/viewtopic.php?p=1076713)
- [Selenium documentation](https://www.selenium.dev/documentation/)
- [Raspberry Pi Zero W product page](https://www.raspberrypi.com/products/raspberry-pi-zero-w/)
