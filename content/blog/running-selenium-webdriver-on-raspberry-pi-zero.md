---
title: Selenium Webdriver on Raspberry Pi Zero W.
description: The post describes how you can run selenium automations on raspberry-pi zero w.
category: Developer
published: true
createdAt: 2021-09-11T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/selenium-on-raspberry-pi.webp
author: Sachin Ghait
authorTitle: Senior Developer
readingTime: 7 min read
tags: ['developer']
proficiency: intermediate
# beginner intermediate advanced 
---

# Selenium Webdriver on Raspberry Pi Zero W.

I have earlier written a post on how selenium can be used to automate browser based tasks.

Find that post [here](https://onthegoalways.com/blog/selenium-automate-browser-tasks).

I recently bought a raspberry-pi, So wanted to add some tasks like making changes in router settings on raspberry-pi device.

## Raspberry Pi zero w overview.

Raspberry-pi's raspbian OS is Linux based and its hardware is arm based.
To check this on your raspberry-pi device run below command.

```bash{1,3-5}
$ uname -a

Linux raspber 5.10.17+ #1414 Fri Apr 30 13:16:27 IST 2021 armv6l GNU/Linux
```

## What challenges I faced ? 😞

I decided to go for firefox and geckodriver combination along with selenium. I thought this will be lightweight than chromium.

I did not find any suitable version of geckodriver for arm based machines. As geckodriver project has stopped supporting it since 2018.

I tried out some older versions of geckodriver shared online. But none of these work for me.

I also tried one geckodriver version built by someone following below process. And this as well didn't work.

https://firefox-source-docs.mozilla.org/testing/geckodriver/ARM.html

I was getting error for OS mismatch with all geckodriver executables I tried.

```bash{1,3-5}
Firefox - OSError: [Errno 8] Exec format error
```

## Solution ✔️

I thought I have stuck dead-end and was about to keep this thing on the side.
Then I found an article about chomium-chromedriver version supported by the Raspbian project.

https://ivanderevianko.com/2020/01/selenium-chromedriver-for-raspberrypi

Run below command to install chomium-chromedriver package

```bash{1,3-5}
$ sudo apt-get install chromium-chromedriver
```

This installs both chromium browser and chromedriver on raspberry-pi. Chromium is required for selenium to run a browser in headless mode and chromedriver to connect and control that browser.

This package works awesome on raspberry-pi, I was able to get the selenium tasks
installed, and run them from CLI commands.

Later on I used ngrok to access these from anywhere, more about that in below post

Find that post [here](https://onthegoalways.com/blog/using-ngrok-to-access-raspberry-pi-from-anywhere).

## References 🖊️

- https://ivanderevianko.com/2020/01/selenium-chromedriver-for-raspberrypi
- https://firefox-source-docs.mozilla.org/testing/geckodriver/ARM.html
- https://raspberrypi.stackexchange.com/questions/63258/selenium-firefox-oserror-errno-8-exec-format-error
- https://www.raspberrypi.org/forums/viewtopic.php?p=1076713
