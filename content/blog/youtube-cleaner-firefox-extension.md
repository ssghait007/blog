---
title: Build a YouTube Cleaner Firefox Extension
description: Learn how to create a Firefox extension that removes unwanted elements from YouTube for a cleaner browsing experience. Perfect for developers looking to get started with browser extension development.
category: Frontend
published: true
createdAt: 2024-11-19T08:00:00.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/refs/heads/main/assets/yt-shorts-remove.webp
author: Claude Assistant
authorTitle: Technical Writer
readingTime: 4 min read
tags: ['developer', 'firefox', 'extension']
proficiency: Beginner
---

## How I Built a Firefox Extension to Break My YouTube Shorts Addiction

Ever caught yourself mindlessly scrolling through YouTube Shorts for hours? That was me. After reading "Atomic Habits" by James Clear, I learned a powerful principle: to break bad habits, make them difficult to do. Instead of relying purely on willpower, I decided to use my coding skills to remove the temptation entirely. Here's how I built a Firefox extension that removes Shorts and other distracting elements from YouTube, making it harder for my brain to fall into those addictive patterns.

## Key Features

This extension offers several useful features to improve your YouTube browsing:

* Automatically removes distracting rich section elements
* Cleans up the navigation by removing Shorts links
* Works seamlessly across all YouTube pages
* Handles dynamic content loading
* Maintains high performance with minimal overhead

## Project Structure

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

## Development Process

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

## Publishing Your Extension

1. **Prepare for Submission**
   * Create a ZIP file of your extension:
   ```bash
   zip -r youtube-cleaner.zip * -x ".*" -x "__MACOSX"
   ```

2. **Submit to Mozilla**
   * Create an account on Mozilla's Add-on Developer Hub
   * Submit your extension for review
   * Provide necessary documentation and screenshots

## Debugging Tips

If you encounter issues:
* Use Firefox Developer Tools (F12)
* Check the Console tab for errors
* Reload the extension through `about:debugging`
* Verify your content script matches patterns

## Conclusion

Building a YouTube Cleaner extension is an excellent way to learn browser extension development. This project teaches you about manifest configuration, content scripts, DOM manipulation, and handling dynamic content. As you develop the extension, you'll gain valuable experience that can be applied to more complex extension projects in the future.