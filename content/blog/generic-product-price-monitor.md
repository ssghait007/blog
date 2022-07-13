---
title: Product price monitor for any website.
description: This post describes how to monitor price of product on any website.
category: Cloud
published: false
createdAt: 2021-09-17T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/placeholder.webp
author: Sachin Ghait
authorTitle: Senior Developer
readingTime: 9 min read
tags: ['developer', 'automate']
proficiency: Beginner
# beginner intermediate advanced 
---

# Monitor product price for any website.

In this post I am going to discuss the custom solution I built to monitor the product price of any website.

I was searching for a good laptop for my sister. I had shortlisted 2 options. When looking at price fluctuations using browser extenstion, It seemed that price has chances of coming down.

The browser plugin had an option of sending email, But keep checking email for just this seemed to be a bit too much.

So I decided to make a custom script that will do the monitoring every 30 mins and send slack alert.

If you look at any HTML webpage it follows a Document Object Model (DOM) structure. \
Head section contains scripts and links to other required assets. And body contains elements on page. Every element has an abosulte path. We need to look for path of product price element.

[BASIC DOM IMAGE HTML AND BODY]

To do that you can inspect that element by right clicking on it. Right click on element and copy Xpath.

[RIGHT CLICK ON PRICE IMAGE]

Now we know the Xpath of element, Its just matter of making the request and searching the element from it.

For fetching the webpage you can use `requests` module in python.

```python{1,3-5}
import requests

url = "https://www.amazon.in/replace-with-valid-link"
webpage = requests.get(url)
```

But if you save this webpage as html and look at this in any browser, It will not be the actual product page.

```python{1,3-5}
with open('product.html', 'w') as file:
    file.write(wepage.text)
```

[AMAZON CAPTCHA PAGE]

This shows how ecommerce websites or any other backend server analyse your requests. \
As we have not mentioned any headers in our request, Server is not sure if request is coming from human behind browser, or a bot running the script.

Browsers add `User-Agent` header in the request to let server know request has come from a browser.

So the trick is to add `User-Agent` in the request, to make serer believe request is from browser and get the webpage without any catpcha.

```python{1,3-5}
HEADERS = ({'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
            (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',\
            'Accept-Language': 'en-US, en;q=0.5'})

webpage = requests.get(url, headers=HEADERS)
```

Now we have the actual webpage with product price info. \
To parse the DOM structure, we can use `BeautifulSoup` and `lxml`,

```python{1,3-5}
soup = BeautifulSoup(webpage.content, "html.parser")
dom = etree.HTML(str(soup))
```

Now to find the product price element, we can use the XPATH that we copied previously. \
we can strip extra characters like `₹`.

```python{1,3-5}
price  = dom.xpath(xPath)[0].text.strip('₹')
```

Now we have the price we can compare it with threshold and send slack(I preffer this) or email.

```python{1,3-5}
Fprice = float(price)
FthresholdPrice = float(thresholdPrice)
if Fprice < FthresholdPrice:
    alert_me(url,price)
```

For alerting I have written helper functions for email and slack as below.
**Slack**

```python{1,3-5}
def slack_alert(URL,price):
    title =  f'Price fell down to {price}'
    message = 'Buy it now here: '+URL
    slack_msg = {
        "username": "BOT_NAME",
        "icon_emoji": ":tada:",
        "channel": "SLACK_CHANNEL_NAME",
        "attachments": [
                {
                    "color": "#75e403",
                    "fields": [
                        {
                            "title": title,
                            "value": message,
                            "short": "false",
                        }
                    ]}
        ]}
    byte_length = str(sys.getsizeof(slack_msg))
    headers = {"Content-Type": "application/json",
               "Content-Length":     byte_length}
    response = requests.post(webhook_url, data=json.dumps(
        slack_msg),    headers=headers)

```

**Email**

```python{1,3-5}
def email_alert(URL, price):
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login('your-email@gmail.com','GOOGLE_APP_PASSWORD')
    subject = f'Price fell down to {price}'
    body = 'Buy it now here: '+URL
    msg = f"Subject:{subject}\n\n{body}"
    server.sendmail('your-email@gmail.com','your-email@gmail.com',msg)
    print('Email alert sent')
    server.quit()
```

To learn more on how to get google app password, check this [link](https://www.youtube.com/watch?v=J4CtP1MBtOE) \
To learn more on how slack webhooks are generated, check this [link](https://www.youtube.com/watch?v=mCyf1gYkoMs).
