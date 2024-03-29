---
title: How To Use Security Headers
description: Learn how to improve your website security with HTTP security headers. Discover how to get an A score for your website with the help of this beginner-friendly guide.
category: Frontend
published: true
createdAt: 2021-02-02T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/http-security-headers.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['developer']
proficiency: Beginner
# beginner intermediate advanced 
---

## How To Use Security Headers

With HTTP response headers, you can harden your website security and also prevent/mitigate attacks

Thanks to HTTP security headers, it is possible to be a few steps ahead, ensuring the security of our sites, our users and our data

HTTP security headers protect you against the types of attacks that your site is most likely to come across. These headers protect against XSS, code injection, clickjacking, etc.

You can check the score for your websites headers on below site. https://securityheaders.com/

If you have A in the score, then you are doing good.
For other scores securityheaders will suggest what things can be added.

## Example
For hosting my site on netlify I have added headers as below

```
[[headers]]
  for = "/*"

  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Content-Security-Policy = "script-src 'self'"
    Referrer-Policy = "same-origin"
    Permissions-Policy = "fullscreen=(), geolocation=()"
    X-Content-Type-Options = "nosniff"

    cache-control = '''
    max-age=0,
    no-cache,
    no-store,
    must-revalidate'''
```

Some important headers to set are `Content-Security-Policy, Permissions-Policy, Referrer-Policy, Strict-Transport-Security`
More explanation can `Additional Information` section at https://securityheaders.com/

## Result
This is the score after adding all required security headers

![image alt text](https://raw.githubusercontent.com/ssghait007/blog/main/assets/securityHeaders.webp)
