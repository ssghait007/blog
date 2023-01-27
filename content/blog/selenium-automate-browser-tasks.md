---
title: Selenium - Web automation made easy.
description: How you can use python selenium module to automate browser based tasks.
category: Backend
published: true
createdAt: 2021-04-13T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/selenium.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 7 min read
tags: ['developer', 'automate']
proficiency: advanced
# beginner intermediate advanced 
---

# Selenium - Web automation made easy.

I went through a course on udemy ( Automate boring stuff with python ) back in 2018, from there I got that we can automate many tasks from daily life.

## What is selenium ?

Selenium is widely used in writing automated tests for web-applications.
Selenium lets you run an automated instance of web browser( chrome, firefox ), and gives you APIs so you can control the browser and webpage.

## Lets use selenium to automate tasks !!

Lets take a simple example of reading an online epaper.
Steps to get to last point are,

1. Open the browser.
2. Go to the epaper website ( readwhere.com in my case ).
3. Search for the newspaper name.
4. Click on "Read Now".
5. Skip sign in.
6. Maximize/zoom for better reading.

Doing this could easily take 3-5 minutes.
With selenium we can sum it up to a single command.

## Code walkthrough

1. I have taken a link to the newspaper name directly so we do not have to search for the newspaper.

```py{1,3-5}
url = 'https://www.readwhere.com/newspaper/deshonnati/Akola-Main/557?refquery=deshonnati%20akola'
```

2. Below snippet opens up a browser instance, you need to pass corresponding driver ( chrome-chromedriver, firefox-gecodriver )

```py{1,3-5}
browser = webdriver.Firefox(
  executable_path=r'/usr/local/bin/geckodriver')
```

3. In next step, we provide this browser which url it should load.

```py{1,3-5}
browser.get(url) # URL of newspaper
browser.maximize_window()
```

4. Then we tell browser to perform certain clicks.
   With `WebDriverWait` we tell browser to wait until the element appears on the screen and is clickable(`EC.element_to_be_clickable`).
   We search the element by its DOM path called XPath (`By.XPATH`), and then perform a click.

```py{1,3-5}
# Click on "READ NOW"
WebDriverWait(browser, 6).until(EC.element_to_be_clickable(
        (By.XPATH, '/html/body/div[4]/div/div/div[3]/div/div[2]/div[1]/div[3]/a'))).click()
```

```py{1,3-5}
# Click on "Skip Sign in"
WebDriverWait(browser, 6).until(EC.element_to_be_clickable(
        (By.XPATH, '//*[@id="skip-area-id"]'))).click()
```

```py{1,3-5}
# Click on "Zoom + button"
WebDriverWait(browser, 6).until(EC.element_to_be_clickable(
        (By.XPATH, '/html/body/div[7]/div[1]/div[1]/div[4]/div/button[1]'))).click()
```

## Gotchas

### How to find xpath of the browser element.

1. Right click on the element, select `inspect element`.
2. In the elements tab right click on the element and select `copy`, then select `Copy XPath`

![image](https://raw.githubusercontent.com/ssghait007/blog/main/assets/find-xpath.webp)

### Run the browser in headless ( invisible ) mode.

```py{1,3-5}
options = Options()
options.headless = True
browser = webdriver.Firefox(options=options,
   executable_path=r'/usr/local/bin/geckodriver')
```

## End Result

![screengrab](https://raw.githubusercontent.com/ssghait007/pyclone/master/images/sg.gif)

Find the complete code [here](https://github.com/ssghait007/pyclone/blob/e967c5c72047f056c73f4ed129653145b9f4a720/pyclone/__main__.py#L31)

Some other ideas you can try out.

- Change config on router ( block/unblock certain domains, Limit speed on certain devices ). You will need to supply username and password for router in input boxes(`sendkeys()` can be used for that). Make sure you are not publishing these username and password in public repos.
- Clock in/out i.e. time booking for employees on company website. ( Again make sure to not disclose username and password on public repos, pass it from environment variables )
