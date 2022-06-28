---
title: How to use ngrok to access your raspberry pi from anywhere.
description: The post describes how you can access raspberry-pi from anywhere in two modes (web portal and ssh).
category: Developer
published: true
createdAt: 2021-09-11T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/ngrok.webp
---

# How to use ngrok to access your raspberry pi from anywhere.

I have posted some blog posts regarding setting up pihole on raspberry-pi, and running selenium based tasks on raspberry-pi.

Check these here in [blog posts section](https://onthegoalways.com/blog).

## What was my use case ? 🤷

After putting these tasks as CLI commands on raspberry-pi, I wanted more accessibility for these. Like running these even if I am not in local network (at home).

There are two things that I wanted to access.

1. Pihole web interface that runs on pihole's address at `http://192.168.0.X/admin/`
2. SSH into pihole device to run the CLI commands that I made for some automations.

## Challenges ✨

In many routers these are sections where you can configure `remote management` or do `port-forwarding`. But my browser did not have these settings available.

It had a section to configure `port-triggering`, which is similar to port-forwarding but just inside the WAN network. That meant I can not access these things from mobile network or outside WAN.

## Solution ✔️

Because of all these restrictions of my router I decided to use `ngrok`.

Ngrok is a useful utility to create secure tunnels to locally hosted applications using a reverse proxy. It is a utility to expose any locally hosted application over the web.

## Setting up ngrok 🔨

1. log on to your device

```bash{1,3-5}
$ ssh pi@192.168.0.X
```

It will prompt for password, Enter password and log into the device.

2. Download ngrok and unzip it.

```bash{1,3-5}
$ wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.tgz

$ tar -xvzf ngrok-stable-linux-arm.tgz
```

3. Create a ngrok account. Where you will get an authtoken.

```bash{1,3-5}
$ ./ngrok authtoken YOUR_NGROK_TOKEN
```

This token removes the 8-hour limit of ngrok tunnel.
In free version, you get 1 tunnel with unique URL to access local app.

Now you are all setup for using ngrok…!!

![GIF](https://media2.giphy.com/media/YPKFBSrq0EoqPJGqTn/giphy.gif?cid=ecf05e47h1aqkyltlm8m1s2b36679g2xmsjub98gaymgx2l4&rid=giphy.gif&ct=g)

## Using ngrok to access pihole web interface

Use below command to create a tunnel for port 80. On port 80 there is pihole web interface. We will be able to access this from a unique ngrok URL.

```bash{1,3-5}
$ /home/pi/ngrok/ngrok http 80 --log=stdout > /home/pi/ngrok.log &
```

Breakdown of command\
`/home/pi/ngrok/ngrok` --> this is absolute location ngrok executable\
`http` --> protocol to make tunnel for\
`80` --> port number of web app\
`--log=stdout > /home/pi/ngrok.log` --> Log output file\
`&` --> runs ngrok in background mode

Below is snapshot of how you can access web portal via ngrok tunnel.

![ngrok http example](https://raw.githubusercontent.com/ssghait007/blog/main/assets/ngrok-http-access.webp)

## Using ngrok to ssh into raspberry-pi

Use below command to create a tunnel for port 22. Using port 22 we can ssh into the device. Using unique URL provided by ngrok, we can ssh into raspberry-pi from anywhere.

```bash{1,3-5}
$ /home/pi/ngrok/ngrok tcp 22 --log=stdout > /home/pi/ngrok.log &
```

Breakdown of command\
`/home/pi/ngrok/ngrok` --> this is absolute location ngrok executable\
`tcp` --> protocol to make tunnel for\
`22` --> port number of ssh\
`--log=stdout > /home/pi/ngrok.log` --> Log output file\
`&` --> runs ngrok in background mode.

Any ssh app like putty(Windows) or juiceSSH(mobile) can be used to connect to raspberry-pi

Below is snapshot of how ssh access from juiceSSH.

![juiceSSH example](https://raw.githubusercontent.com/ssghait007/blog/main/assets/juicessh.webp)
