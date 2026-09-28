---
title: How To Use Security Headers
description: Learn how to improve your website security with HTTP security headers. Discover how to get an A score for your website with the help of this beginner-friendly guide.
category: Frontend
published: true
createdAt: 2021-02-02T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/http-security-headers.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['security', 'http-headers', 'netlify', 'web-security']
proficiency: Beginner
# beginner intermediate advanced 
---

> **TL;DR:** HTTP security headers are a simple but effective way to harden your website against common attacks like XSS, clickjacking, and code injection. This post explains the key headers -- X-Frame-Options, X-XSS-Protection, Content-Security-Policy, Referrer-Policy, and more -- with a practical example of configuring them in a Netlify `_headers` file. You can check your current score at securityheaders.com and aim for an A rating.

## How To Use Security Headers

With HTTP response headers, you can harden your website security and also prevent/mitigate attacks

Thanks to HTTP security headers, it is possible to be a few steps ahead, ensuring the security of our sites, our users and our data

HTTP security headers protect you against the types of attacks that your site is most likely to come across. These headers protect against XSS, code injection, clickjacking, etc.

You can check the score for your website's headers on [securityheaders.com](https://securityheaders.com/).

If you have A in the score, then you are doing good.
For other scores securityheaders will suggest what things can be added.

## How do I add security headers on Netlify?
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

> "Content Security Policy (CSP) is a feature that helps to prevent or minimize the risk of certain types of security threats." — [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)

More explanation can be found in the `Additional Information` section at [securityheaders.com](https://securityheaders.com/).

## What score did I get after adding the headers?
This is the score after adding all required security headers

![image alt text](/assets/securityHeaders.webp)

## Frequently Asked Questions

### What do HTTP security headers protect against?

They tell the browser to block risky behaviour. `X-Frame-Options: DENY` stops your page loading inside an iframe (clickjacking). `Content-Security-Policy` limits where scripts can load from (XSS). `X-Content-Type-Options: nosniff` stops the browser guessing file types.

### Do I still need X-XSS-Protection?

Mostly no. MDN marks it as non-standard, and modern browsers no longer ship the XSS filter it controlled. A strong `Content-Security-Policy` is the recommended replacement.

### What value should I use for Strict-Transport-Security?

A common value is `max-age=31536000; includeSubDomains`. 31,536,000 seconds is one year. Only add it once every page and subdomain works over HTTPS, because browsers will refuse plain HTTP for that whole period.

## References

- [securityheaders.com](https://securityheaders.com/) - free header scanner
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [MDN: HTTP headers reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
