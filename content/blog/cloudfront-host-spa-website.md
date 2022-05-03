
---

title: Hosting a single page application on cloudfront

description: The post describes how to host a SPA website on cloudfront.

category: Frontend

published: true

createdAt: 2022-05-03T07:00:13.392Z

image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/template.webp

---

  

# Hosting a single page application on cloudfront

  

-  **What is Single Page Application ?** 

  

To understand Single Page Application we need to first understand what was the traditional way websites used to work. In older websites each page on website was requested separately.

This pattern is called as `Multiple-page app(MPA)`.

In Multiple-page app(MPA) every change displays the data or submits data back to server requests rendering a new page from the server in the browser

  

`Single page application(SPA)` is an app that doesn't need to reload the page during its use and works with the browser. Think of all the apps like Google Maps Gmail a Facebook event GitHub all these are the examples of single page application.

  

The main advantage of single-page applications is its speed. The benefit of using single page applications is the `user experience(UX)` where the user doesn't have to wait a lot for page reloads or navigation

  

From developers perspective is very easy to debug a single page applications you can use special tools for build for angular react view of you can use Chrome console and monitor Network operations

  

-  **What is cloudfront ?**

Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users.

  

In case of SPA this delivers all the html files and JS bundles(heavy in size) quickly to client devices.

  

-  **What are the challenges while hosting a SPA on Cloudfront ?**

When you request for a resource from cloudfront it returns a cached version of that file to your browser.
When you want to load an internal route/URL path on your website that only your SPA understands. Cloudfront can not return any response to that. Because it has no corresponding file for that resource

Ex. 
Steps in case of path matches file present in Cloudfront cache

 1. Broweser requests `hostname/index.html`
 2. Cloudfront has a `index.html` file in cache 
 3. Returns file back to browser.

Steps in case of path matches file `NOT` present in Cloudfront cache

 1. Broweser requests `hostname/home`
 2. Cloudfront has no file for `home.html`
 3. Cloudfront checks with base server 
 4. There is no file `home.html` 
 5. Cloudfront gets no content response from base server 
 6. Cloud front sends file not found or AccessDenied response to browser.

  

- **How to configure cloudfront to deal with above challenges**
Above issue arises due to the behaviour of SPA, The internal routing is handled in client side. 
But because the internal route/URL path is requested before the SPA has loaded in browser, cloudfront thinks that this is a unknown route and returns AccessDenied response.

The `solution` is to make browsers aware of the routing before requesting the internal routes. 
To achieve this we can redirect the unknown route paths to homepage( `index.html`). This makes sure we load the JS bundles necessary for internal routing.

![image alt text](https://raw.githubusercontent.com/ssghait007/blog/main/assets/cloudfront-err-page-config.png)

With this config, Cloudfront will not return error but will respond with `index.html` page. 
Now browser will load this page and handle the internal redirect in browser.
