---
title: Understanding Port Sharing and SO_REUSEADDR in Docker
description: Learn about the problem of port sharing in Docker and how the SO_REUSEADDR option relates to it. Gain insights into network concepts and how they impact running multiple instances of an application on the same port. Find solutions to overcome port conflicts in Docker.
category: Developer
published: true
createdAt: 2023-07-09
image: https://medium.com/swlh/docker-caching-introduction-to-docker-layers-84f20c48060a
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['docker', 'networking']
proficiency: Intermediate
---

# Understanding Port Sharing and SO_REUSEADDR in Docker

## Incident: Running Multiple Instances of an Application in Docker

Recently I went through a weird incident that exposed me to some interesting networking concepts. I was running an application on my machine(host operating system), and it was listening on port 8080. Everything seemed to be working fine until I decided to run another instance of the same application inside a Docker container, exposing it on the same port (8080) as on my host machine.

To my surprise, Docker didn't throw any error or warning. Both instances of the application were seemingly running without any issues. However, when I tried to access the application through my browser, it didn't behave as expected. It seemed that the requests were not being handled by the application inside docker.

## Understanding the Problem: Port Sharing and Network Concepts

As I started doing some research about this issue, I found about `SO_REUSEADDR` and `SO_REUSEPORT`. They are Port sharing and network concepts in the context of Docker. When you run Docker containers, they create their own isolated network stack, including their own network interfaces, IP addresses, and port mappings. However, Docker provides a bridge network by default, enabling containers to communicate with each other and the host machine.

In the incident described above, both instances of the application were running (one on OS and one inside docker exposed on the same port), but they were sharing the same port (8080) on the host machine. This was an issue as they were trying to listen on the same port.

## The Role of SO_REUSEADDR

Now, you might be wondering how the socket options `SO_REUSEADDR` and `SO_REUSEPORT` come into play. These options allow multiple sockets to bind to the same address and port combination. 

The `SO_REUSEADDR` option, when enabled, allows the reuse of local addresses and ports. It allows a socket to bind to an address that is in the `TIME_WAIT` state, which is a state a socket enters after closing. By default, Docker containers use the `SO_REUSEADDR` option when binding to ports on the host machine.

## Finding a Solution

To resolve my issue I had to manually kill the process running on port(running on os), and then restart the docker application
```
kill -9 $(lsof -ti:8080)
```

One solution is to configure the Docker container to listen on different host port while mapping them to the corresponding container ports. 

Here's an example of how you can achieve this using the Docker command-line interface:

```bash
docker run -p 8081:8080 [image_name]
```



Conclusion
Port sharing can lead to conflicts when running multiple instances of an application on the same port. The incident highlights the importance of understanding network concepts and the role of socket options like SO_REUSEADDR.

💡 This also got me thinking when we are developing a web application and we restart the process while debugging we are using this same concept. By default, the ListenAndServe(golang) method will use the SO_REUSEADDR option on the underlying socket, allowing the server to bind to the same address and port again, even if it's in the TIME-WAIT state.
