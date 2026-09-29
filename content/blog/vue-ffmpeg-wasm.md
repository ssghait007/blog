---
title: Convert Video to GIF with FFmpeg
description: 'Convert video to GIF in the browser with FFmpeg WebAssembly: import ffmpeg.wasm into a Vue app, load the script and run the conversion command.'
category: Frontend
published: true
createdAt: 2021-02-06T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/ffmpeg-wasm.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['vue', 'ffmpeg', 'webassembly', 'video-to-gif']
proficiency: Intermediate
# beginner intermediate advanced 
---

> **TL;DR:** FFmpeg is a powerful multimedia processing tool, and thanks to WebAssembly, you can now run it entirely in the browser with no server-side processing needed. This post shows how to integrate `@ffmpeg/ffmpeg` (the WASM build) into a Vue.js app to convert video files to GIFs client-side. It covers importing the library, loading the WASM script, running native FFmpeg commands in the browser, and handling the file input/output flow.

# Convert Video to GIF with FFmpeg

This post describes how to use Ffmpeg directly in browser, and use native commands.
Ffmpeg loads web assembly script in browser, and gives APIs that we can consume.

## What is Ffmpeg ?

FFmpeg is a free and open-source software project consisting of a large suite of libraries and programs for handling video, audio, and other multimedia files and streams.

> "A complete, cross-platform solution to record, convert and stream audio and video." — [ffmpeg.org](https://ffmpeg.org/)

## How do I add ffmpeg.wasm to a Vue app?

```bash{1,3-5}
# Use npm
npm  install @ffmpeg/ffmpeg
# Use yarn
yarn  add @ffmpeg/ffmpeg
```

or you can use CDN directly, read more on the [ffmpeg.wasm site](https://ffmpegwasm.netlify.app/).

**Version note:** this post uses the 0.11 API (`createFFmpeg`, `ffmpeg.run`, `ffmpeg.FS`). Version 0.12 replaced it with `new FFmpeg()`, `ffmpeg.exec()` and `ffmpeg.writeFile()`. To follow this post as written, install `@ffmpeg/ffmpeg@0.11`.

## How do I convert a video to GIF in the browser?

1. Import ffmpeg as below

```js{1,3-5}
const { createFFmpeg, fetchFile } = FFmpeg
const ffmpeg = createFFmpeg({ log: true })
```

2. Load Load ffmpeg.wasm-core script in browser environment

```js{1,3-5}
await ffmpeg.load()
```

3. Use following file command to do file operations in browser, all data is bound to browser and will be lost on page refresh

```js{1,3-5}
// ffmpeg.FS(method, ...args)

// Write file using below command
ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(this.video))

// Read file (already available in FS memory)
ffmpeg.FS('readFile', 'out.gif')
```

4. Run ffmpeg command, as ffmpeg native cli.

```js{1,3-5}
await ffmpeg.run(
  '-i',
  'test.mp4',
  '-t',
  '5',
  '-ss',
  '5',
  '-f',
  'gif',
  'out.gif'
)
// -t ==> total time of gif
// -ss ⇒ starting seconds or offset
```

Read more on ffmpeg commands in the [FFmpeg documentation](https://ffmpeg.org/ffmpeg.html).

## What does the finished app look like?

![Vue app converting an MP4 video to a GIF with ffmpeg.wasm](/assets/ffmpeg-mp4-to-gif.webp)

## Conclusion

I found ffmpeg-wasm was really helpful, I have explored just one use case, that's like exploring tip of iceberg.
I will try out more use cases and keep updating in my [GitHub repo](https://github.com/ssghait007/ffmpeg-wasm-poc).

## Frequently Asked Questions

### Is my video uploaded to a server?

No. ffmpeg.wasm runs inside the browser tab. The file is written to an in-memory file system and never leaves the device.

### Why do I get a SharedArrayBuffer error?

ffmpeg.wasm 0.11 needs `SharedArrayBuffer`, which browsers only allow on cross-origin isolated pages. Serve your app with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`.

### What do the -t and -ss options do?

`-ss 5` starts reading the video at 5 seconds, and `-t 5` keeps 5 seconds of output. Together they make a 5-second GIF from seconds 5 to 10.

## References

- [FFmpeg official site](https://ffmpeg.org/)
- [ffmpeg.wasm on GitHub](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [MDN: SharedArrayBuffer security requirements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements)
