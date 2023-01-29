---
title: What is CORS and how to deal with issues related to it ?
description: CORS is a security feature that prevents malicious websites from accessing confidential information. CORS adds HTTP headers to server responses, enabling cross-domain queries. Common issues faced by developers include AJAX failures, problems with local development, and API rate restrictions.
category: Frontend
published: true
createdAt: 2021-02-02T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/http-security-headers.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['developer', 'frontend']
proficiency: Beginner
---

## What is CORS ?

### Introduction to Cross-Origin Resource Sharing:
CORS is a security feature in web browsers that prevents web pages from sending requests to domains other than the one that delivered them. It enables secure cross-domain data transfer and communication.

### Purpose of CORS in Web Browsers:
The purpose of CORS is to stop malicious websites from submitting unauthorized requests to a website and potentially revealing confidential information or causing other security issues.

### How CORS works: adding HTTP Headers:
CORS works by adding HTTP headers to server responses to enable queries to other domains. If a web page served from example.com wants to send a request to api.example.com, for example, the server at api.example.com can add an Access-Control-Allow-Origin header in its response to signify that example.com is authorized to make queries to the API.

## How CORS Protects Your Website?

### Malicious Websites and Unauthorized Requests:
By preventing web pages from sending requests to domains other than the one that delivered them, CORS protects your website from malicious websites attempting to submit unauthorized requests.

### Securing Confidential Information and Preventing Security Issues:
By stopping malicious websites from accessing confidential information or causing other security issues, CORS helps to keep your website and its users secure.

## CORS Headers for Restricted Access

### Utilizing Additional CORS Headers:
To further restrict access to resources, additional CORS headers can be utilized.

### Indicating Permitted HTTP Methods and HTTP Headers:
To indicate which HTTP methods and HTTP headers are permitted for a certain resource, headers such as Access-Control-Allow-Methods and Access-Control-Allow-Headers can be used.

### Using Access-Control-Allow-Methods and Access-Control-Allow-Headers:
By using these headers, the server can control which HTTP methods and headers are permitted, providing an additional layer of security for the website and its resources.

## CORS and Its Impact on Developers

### Irritation Caused by CORS:
Despite being a crucial security component, CORS can often irritate developers.

### Understanding the Server's Defense Mechanism:
It's important to understand that the server is simply trying to defend itself and its users when encountering CORS problems.

### Resolving CORS Problems through Server Configuration or Proxy Utilization:
CORS problems can typically be resolved by configuring the server to provide the necessary headers with the request or by utilizing a proxy. This allows developers to work around CORS restrictions while still maintaining the security provided by CORS.

## Common issues with CORS faced by devs 
1. CORS issues when doing AJAX queries: CORS failures are most typically experienced when executing AJAX requests using JavaScript. If you send an AJAX request to another domain and that domain's server is not configured to allow requests from your domain, you may get a CORS error in your browser's console. To fix this issue, you must confirm that the server is configured to accept requests from your domain. This is typically accomplished via the server's responses including an Access-Control-Allow-Origin header.
2. CORS faults that are encountered when making requests from a local development environment: You could have CORS issues while working locally on a web application and sending requests to a distant server. This can happen if the server isn't configured to allow requests from your local development environment. To fix this issue, you might need to set up the server to accept requests from your local development environment or use a tool like ngrok to expose your local development environment to the internet.
3. CORS issues may arise when making calls to APIs that use rate restriction. To prevent users from making an excessive number of queries, certain APIs implement rate limiting. When making requests to an API that has rate limitation enabled and exceeding the allotted number of requests, you may receive a CORS error. To fix this issue, you will need to check that you are not making too many API calls, or you may need to employ caching or other methods to reduce the number of requests you are making.

## Debugging CORS issues for frontend devs

- 🔎 Use browser dev tools to inspect network requests and responses
- 🚨 Check browser console for error messages related to CORS
- 💻 Try running the request from a different browser to see if it's a browser-specific issue
- 🔍 Check the server response headers for Access-Control-Allow-Origin header value
- 🔗 Use a CORS proxy to make the request and bypass CORS restrictions
- 💬 Verify that the request URL and parameters are correct.
- 🚨 Try CORS proxy: Try using a CORS proxy to bypass the same-origin policy and see if the CORS error persists.

## Debugging CORS issues for backend devs

- Check server response headers: Verify that the server is sending the correct CORS headers in its responses (e.g. Access-Control-Allow-Origin).
- Enable CORS logging: Enable logging in the server code to track the flow of CORS requests and debug any issues.
- Check API documentation: Review the API documentation to ensure that the API supports CORS and check the API's CORS configuration.
- Test API with cURL: Test the API with cURL from the command line to see if the server is correctly responding to CORS requests.