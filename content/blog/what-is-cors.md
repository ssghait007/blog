
---
title: What is CORS and how to deal with issues related to it ?
description: CORS is an essential security component, yet it frequently annoys developers.
published: false
createdAt: 2021-02-02T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/http-security-headers.webp
author: Sachin Ghait
authorTitle: Senior Developer
readingTime: 5 min read
tags: ['developer', 'frontend']
proficiency: Beginner
# beginner intermediate advanced 
---

## What is CORS ?
Web pages are prohibited from sending requests to domains other than the one that delivered them thanks to the Cross-Origin Resource Sharing (CORS) security feature of web browsers. This stops malicious websites from submitting unauthorised requests to your website, perhaps revealing confidential information, or causing other security issues.

CORS adds HTTP headers to server responses to enable queries to other domains. If a web page served from example.com wants to send a request to api.example.com, for example, the server at api.example.com can add an Access-Control-Allow-Origin header in its response to signify that example.com is authorised to make queries to the API.

To further restrict access to resources, additional CORS headers may be utilised. To indicate which HTTP methods and HTTP headers are permitted for a certain resource, for example, use the Access-Control-Allow-Methods and Access-Control-Allow-Headers headers.

Despite being a crucial security component, CORS usually irritates developers. It's crucial to realise that the server is merely trying to defend itself and its users if you try to send a request to a different domain and encounter CORS problems. By configuring your server to provide the necessary headers with the request or by utilising a proxy, you can typically resolve CORS problems.

## Common issues with CORS faced by devs 
1. CORS issues when doing AJAX queries: CORS failures are most typically experienced when executing AJAX requests using JavaScript. If you send an AJAX request to another domain and that domain's server is not configured to allow requests from your domain, you may get a CORS error in your browser's console. To fix this issue, you must confirm that the server is configured to accept requests from your domain. This is typically accomplished via the server's responses including an Access-Control-Allow-Origin header.
2. CORS faults that are encountered when making requests from a local development environment: You could have CORS issues while working locally on a web application and sending requests to a distant server. This can happen if the server isn't configured to allow requests from your local development environment. To fix this issue, you might need to set up the server to accept requests from your local development environment or use a tool like ngrok to expose your local development environment to the internet.
3. CORS issues may arise when making calls to APIs that use rate restriction. To prevent users from making an excessive number of queries, certain APIs implement rate limiting. When making requests to an API that has rate limitation enabled and exceeding the allotted number of requests, you may receive a CORS error. To fix this issue, you will need to check that you are not making too many API calls, or you may need to employ caching or other methods to reduce the number of requests you are making.
