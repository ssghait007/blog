---
title: Build a YouTube Cleaner Firefox Extension
description: 'Build a Firefox extension that removes distracting elements from YouTube, a hands-on starting point for browser extension development.'
category: Frontend
published: true
createdAt: 2024-11-19T08:00:00.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/yt-shorts-remove.webp
author: Claude Assistant
authorTitle: Technical Writer
readingTime: 4 min read
tags: ['firefox-extension', 'javascript', 'mutationobserver', 'digital-wellbeing']
proficiency: Beginner
---

> **TL;DR:** Inspired by Atomic Habits' principle of making bad habits harder, this post walks through building a Firefox extension that removes YouTube Shorts and other distracting elements from the page. It uses a MutationObserver to handle dynamically loaded content, ensuring elements are removed even as YouTube loads new sections. The tutorial covers the full project structure including manifest.json, the content script, and how to test and install the extension locally.

## How I Built a Firefox Extension to Break My YouTube Shorts Addiction

Ever caught yourself mindlessly scrolling through YouTube Shorts for hours? That was me. After reading ["Atomic Habits"](https://jamesclear.com/atomic-habits) by James Clear, I learned a powerful principle: to break bad habits, make them difficult to do. Instead of relying purely on willpower, I decided to use my coding skills to remove the temptation entirely. Here's how I built a Firefox extension that removes Shorts and other distracting elements from YouTube, making it harder for my brain to fall into those addictive patterns.

## What does the extension remove?

This extension offers several useful features to improve your YouTube browsing:

* Automatically removes distracting rich section elements
* Cleans up the navigation by removing Shorts links
* Works seamlessly across all YouTube pages
* Handles dynamic content loading
* Maintains high performance with minimal overhead

## How is the extension structured?

Let's start by setting up our project structure. Create a new directory with these files:

```
youtube-cleaner/
├── manifest.json    # Extension configuration
├── cleaner.js      # Main cleaning script
├── icon48.png      # Extension icon (48x48)
├── icon96.png      # Extension icon (96x96)
└── README.md       # Documentation
```

The `manifest.json` file is crucial - it defines your extension's properties:

```json
{
    "manifest_version": 2,
    "name": "YouTube Cleaner",
    "version": "1.0",
    "description": "Removes unwanted elements from YouTube",
    "icons": {
        "48": "icon48.png",
        "96": "icon96.png"
    },
    "content_scripts": [{
        "matches": ["*://*.youtube.com/*"],
        "js": ["cleaner.js"]
    }]
}
```

## How do I build and test the extension?

1. **Local Testing**
   * Navigate to `about:debugging` in Firefox
   * Click "This Firefox" > "Load Temporary Add-on"
   * Select your `manifest.json` file

2. **Creating the Cleaner Script**
   The `cleaner.js` file handles the main functionality:
   ```javascript
   const removeUnwantedElements = () => {
     // Remove rich section renderers
     document.querySelectorAll('ytd-rich-section-renderer')
       .forEach(el => el.remove());
     
     // Remove Shorts links
     document.querySelectorAll('a[href^="/shorts"]')
       .forEach(el => el.parentElement.remove());
   };

   // Handle dynamic content
   const observer = new MutationObserver(removeUnwantedElements);
   observer.observe(document.body, {
     childList: true,
     subtree: true
   });
   ```

3. **Testing**
   * Visit YouTube.com
   * Verify that rich sections and Shorts links are removed
   * Check that the cleaning persists while browsing
   * Monitor console for any errors

The `MutationObserver` is what makes this work on YouTube, which loads content without full page reloads:

> "The MutationObserver interface provides the ability to watch for changes being made to the DOM tree." — [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## How do I publish a Firefox extension?

1. **Prepare for Submission**
   * Create a ZIP file of your extension:
   ```bash
   zip -r youtube-cleaner.zip * -x ".*" -x "__MACOSX"
   ```

2. **Submit to Mozilla**
   * Create an account on Mozilla's Add-on Developer Hub
   * Submit your extension for review
   * Provide necessary documentation and screenshots

## How do I debug the extension?

If you encounter issues:
* Use Firefox Developer Tools (F12)
* Check the Console tab for errors
* Reload the extension through `about:debugging`
* Verify your content script matches patterns

## Conclusion

Building a YouTube Cleaner extension is an excellent way to learn browser extension development. This project teaches you about manifest configuration, content scripts, DOM manipulation, and handling dynamic content. As you develop the extension, you'll gain valuable experience that can be applied to more complex extension projects in the future.

## Frequently Asked Questions

### Why use a MutationObserver instead of running the script once?

YouTube loads new content as you scroll and navigate without full page reloads. A MutationObserver runs the cleaner every time the page changes, so new Shorts get removed too.

### Does a temporary add-on stay installed?

No. Add-ons loaded from `about:debugging` are removed when Firefox restarts. To keep it, sign and install it through Mozilla's Add-on Developer Hub.

### Will this extension work in Chrome?

The content script works as it is, but Chrome needs Manifest V3. Change `manifest_version` to 3 and load it from `chrome://extensions` in developer mode.

## References

- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [MDN: Browser extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Firefox Extension Workshop](https://extensionworkshop.com/)
- [Atomic Habits by James Clear](https://jamesclear.com/atomic-habits)
