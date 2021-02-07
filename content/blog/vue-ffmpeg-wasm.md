---
title: ffmpeg wasm - convert video to gif
description: The post describes how I created this blog using nuxt and tailwind css. 
category: Frontend
image: https://blog.scottlogic.com/ceberhardt/assets/featured/ffmpeg-wasm.png
---



# How to convert video to gif using ffmpeg wasm

This post describes how to Ffmpeg directly in browser

## What is Ffmpeg ?
FFmpeg is a free and open-source software project consisting of a large suite of libraries and programs for handling video, audio, and other multimedia files and streams.

## How to add ffmpeg.wasm to vue app

```
# Use npm
$ npm  install @ffmpeg/ffmpeg
# Use yarn
$ yarn  add @ffmpeg/ffmpeg
```
or you can use CDN directly, read more on https://ffmpegwasm.github.io/#demo 
## Usage
1. Import ffmpeg as below
```
const  { createFFmpeg, fetchFile }  =  FFmpeg;
const ffmpeg =  createFFmpeg({ log:  true  });
  ```
2. Load Load ffmpeg.wasm-core script in browser environment
```
await ffmpeg.load();
```
3. Use following file command to do file operations in browser, all data is bound to browser and will be lost on page refresh
```
# ffmpeg.FS(method, ...args)

# write file using below command
ffmpeg.FS("writeFile", "test.mp4", await  fetchFile(this.video));

# read file (already available in FS memory)  
ffmpeg.FS("readFile", "out.gif");
```
4. Run ffmpeg command, as ffmpeg native cli.
```
await  ffmpeg.run("-i","test.mp4","-t","5",
	"-ss","5","-f","gif","out.gif");
# -t ==> total time of gif
# -ss ⇒ starting seconds or offset  
```
Read more on ffmpeg commands on https://ffmpeg.org/ffmpeg.html
## How app will look like
![image alt text](https://raw.githubusercontent.com/ssghait007/blog/main/assets/ffmpeg-mp4-to-gif.JPG)

## Conclusion
I found ffmpeg-wasm was really helpful, I have explored just one use case, that's like exploring tip of iceberg.
I will try out more use cases and keep updating in my GitHub repo.
https://github.com/ssghait007/ffmpeg-wasm-poc




