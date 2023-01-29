---
title: Ad Blocker for Your Whole Network.
description: Stop annoying ads and protect your network with Pi-hole. This guide explains how to install Pi-hole on Raspberry-Pi, how it blocks ads, and how to make Pi-hole your DNS server.
category: Developer
published: true
createdAt: 2021-09-11T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/block-ads.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['developer']
proficiency: intermediate
# beginner intermediate advanced 
---

# Ad Blocker for Your Whole Network. 🛡️

The Online advertising market was valued at USD 304.0 billion in 2019 and is expected to reach USD 982.82 billion by 2025, at a CAGR of 21.6%. With increase in smartphone users these predictions look obvious.

Sometimes Ads can be a bit invasive and annoying. For mobile devices, there are different types of advertisements, including click to download, click to call, image text, banner ads and full screen ads.

## Why I needed this ? 🤷

There are some ads that simply advertise some content or product, which does not bother me. But there is also the other dangerous side to it. These ads show fake things or ask people to download something on their devices.

When there are non-tech savvy users (children or elderly parents) exposed to the ads, they can easily fall prey to these ads. They are more likely to click on anything.

These are few things you can do like installing ad-block-plus on browser, or other similar tools. But this handles it for just one device or rather browser. Doing this in all devices is a bit too much.

Recently I came across pi-hole a network-level advertisement and Internet tracker blocking application. Which makes it very easy to block ads on network-level.

## How Pi-hole works ?

Pi-hole acts as a DNS server in your router network. So whenever there is any query for a domain, pihole checks if it is an ad serving website, and blocks the query if it is.
It can also act as a DHCP server.

Let's take look at an example

1. open a Web browser.
2. type newswebsite.com into the address bar.
3. press Enter, query goes to pihole.
4. pihole detects the domain serves ads, pihole returns address of actual site, But instead of returning actual address of ad server pihole returns fake address.
5. So browser loads original website fully, buts ads are not present on the page.

NOTE: Since the ads were not downloaded in the first place, they do not need to be hidden from your view since they do not exist in the first place. Hence, no need for ad blocker extension.

## What all is required.

- Raspberry Pi device (I have used Raspberry Pi zero w)
- Access to your router

## How to set up pihole with raspberry-pi. 🔨

#### Setup Raspberry Pi

This is very easy setup just write raspbian OS to SD card.
Explained in detail in this video.
https://www.youtube.com/watch?v=Hdm26W9dHK0

#### Install pihole on Raspberry Pi

Installing pihole is quite easy, just run following command.
It will run the program and ask for some inputs like upstream DNS, ad-lists, and other configurations.

```bash{1,3-5}
$ curl -sSL https://install.pi-hole.net | bash
```

![image pihole install](https://raw.githubusercontent.com/ssghait007/blog/main/assets/pihole-install-window.webp)

I chose OpenDNS as upstream DNS, I will explain why OpenDNS in next section.

#### Make Pihole your DNS server

- **You can do this in two ways**

  1.  Update DNS settings in your router with your raspberry-pi local address.
      ![image pihole dns](https://raw.githubusercontent.com/ssghait007/blog/main/assets/router-dns-settings-pihole.webp)
  2.  Disable DHCP on your router and enable DHCP in raspberry-pi, This way you get more control with pi-hile.
      ![image pihole dhcp](https://raw.githubusercontent.com/ssghait007/blog/main/assets/pihole-dhcp.webp)

#### BONUS: Create openDNS account and set level of web content filtering.

This is bonus thing along with blocking ads, As in previous steps we have set upstream DNS as OpenDNS. With OpenDNS we get some more features,
Like blocking certain type of content on your network.

Categories are as below
![image opendns webfiltering](https://raw.githubusercontent.com/ssghait007/blog/main/assets/opendns-wen-content-filter.webp)

## Conclusion ✔️ - What I observed after 2 weeks of use.

Pihole is working seamlessly, No issues so far. It does not require much compute, works quite fine with 15% memory usage. Also, As I am using raspberry-pi zero w, It's not consuming much power.

On average 30% - 45% daily unique requested domains are ads or tracking. Knowing that other devices in my network are not served any ads or not tracked, gives a relaxing feeling.

![image pihole stats](https://raw.githubusercontent.com/ssghait007/blog/main/assets/pihole-stats-daily.webp)

And this is how you say no to Ads,
![image No to ads](https://media1.giphy.com/media/l4FGIgsVPdoRd2wbS/giphy.gif?cid=790b7611da37642de1a3e196dd373a47a5aa2632e723bb14&rid=giphy.gif&ct=g)

## Things to keep in mind 🤨

1. When you switch off pihole, make sure to revert DNS settings of your router. Otherwise, internet will not work on devices.
2. As with every software, pihole is not 100% accurate. Pihole only blocks ads which are in its adlist. So sometimes you will have to manually allow/disallow some domains

## References 🖊️

- https://pi-hole.net/
- https://www.opendns.com/
- https://www.mordorintelligence.com/industry-reports/online-advertising-market
- https://www.youtube.com/watch?v=Hdm26W9dHK0
