---
title: Steganography - The Art of Hiding Data in Plain Sight
description: 'What steganography is, its types (text, image, audio, video, network), a Python image example with cryptosteganography and free tools to try.'
category: Developer
published: true
createdAt: 2021-06-19T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/stegano.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 8 min read
tags: ['steganography', 'python', 'security', 'cryptography']
proficiency: Beginner
# beginner intermediate advanced 
---

> **TL;DR:** Inspired by a Mr. Robot episode where RSA keys are hidden inside an image, this post explores steganography -- the practice of concealing messages within ordinary-looking media. It covers five types: text, image, audio, video, and network steganography, explaining how each works at a high level. Includes a hands-on Python example using the `cryptosteganography` library to hide and extract secret messages from images, plus a list of free steganography tools.

I was watching a web-show(`Mr-Robot`) on a weekend. It's a story of how a guy hacks into data servers of big conglomerate, and encrypts all data with a cryptographic keys. After the hack was successful he stores the RSA keys to decrypt this data `inside an image`.

This got me interested in the fact that we can store secret messages and keys. So I researched on this topic and got some basic methods of how it is practically achieved.

## What is steganography?

Steganography is a very ancient method, It is the practice of concealing a message within another message or a physical object.

The ancient form was like, sending messages on paper with invisible ink.

## What types of steganography are there?

Over years its evolved and now used digitally with various forms of media like

1. **Text** - hide data inside another text, ex. embed a word every 5th word of paragraph.

2. **Image** - hide data inside image, replace pixels info with secret data in such a way there is minimal/un-noticable changes to image.

3. **Audio** - hide data in audio file, ex. add hidden data by modify audio in imperceptible way.

4. **Video** - hide data in video file. As videos have large size, its is very easy to hide any data/file type inside it.

5. **Network** - hide data in network protocols ex. hide secret in header or payload or mixing it in both.

## How is data hidden inside an image?

There are many methods used in image steganography, I have listed very basic and simple ones.

**LSB** (Least significant bit)

It is a technique in which least significant bit of pixel data is replaced with data bit. It's very simple method and difference in images are undetected by naked eye.

Here is why the change is invisible. Each colour channel is a number from 0 to 255, and changing the last bit moves it by at most 1. That's less than 0.4% of the range.

It also holds a lot of data. A 1920 x 1080 RGB image has 1920 x 1080 x 3 = 6,220,800 channel values. Using 1 bit from each gives 6,220,800 bits, about 760 KB of hidden data.


**DCT**

This technique involves changing values of quantized DCT coefficients.

Read more in this [video explanation of the discrete cosine transform (DCT)](https://www.youtube.com/watch?v=Q2aEzeMDHMA).

**JSTEG**

It is a steganography algorithm based on LSB replacement method for hiding data in DCT coefficients of JPEG images. The algorithm replaces the LSB of DCT coefficients by bits of the secret message to be hidden

## How do I hide a message in an image with Python?

I am using python library ([cryptosteganography](https://pypi.org/project/cryptosteganography/)) for demonstrating this.

#### Install the package

```bash{1,3-5}

pip3 install cryptosteganography

```

#### Hide data inside cover image

```py{1,3-5}

from cryptosteganography import CryptoSteganography



# Initialise package with password key

crypto_steganography = CryptoSteganography('password key')





message = 'Super secret message. That I want to send secretly to someone. No one  in middle should be able to read this'



# Hide message inside output image(`output_stego_image.png`).

crypto_steganography.hide(

    'cover_image.png', 'output_stego_image.png', message)

```

#### Extract data from stego image

```py{1,3-5}

# retrieve_message.py

from cryptosteganography import CryptoSteganography



# Initialise package with password key

crypto_steganography = CryptoSteganography('password key')





# Extract the message from stego image.

secret = crypto_steganography.retrieve('output_stego_image.png')



print(secret)

```

```bash{1,3-5}

$ python3 retrieve_message.py

Super secret message. That I want to send secretly to someone. No one in middle should be able to read this

```

## Which free steganography tools can I use?

- Openstego

- Steghide

- SSuite Piscel

- Xiao Steganography

- Hide’N’Send

## What is steganography used for?

- embed copyright messages in media files

- send secret info to someone

- It's very popular in cyber crimes, Hence very important for white hat hackers.

## Frequently Asked Questions

### Is steganography the same as encryption?

No. Encryption makes a message unreadable. Steganography hides the fact that there is a message at all. The library in this post does both: it encrypts the message with a password, then hides it.

### Why use PNG instead of JPEG for LSB steganography?

PNG is lossless, so every bit you change stays exactly as you set it. JPEG compression changes pixel values, which destroys data hidden in the least significant bits.

### Can hidden data be detected?

Yes. Steganalysis tools look for statistical patterns that LSB changes leave behind. Hiding data makes it harder to notice, but not impossible to find.

## References

- [Video: Steganography explained (YouTube)](https://www.youtube.com/watch?v=xepNoHgNj0w)

- [Video: Image steganography (YouTube)](https://www.youtube.com/watch?v=TWEXCYQKyDc)
- [cryptosteganography on PyPI](https://pypi.org/project/cryptosteganography/)
- [Steghide on SourceForge](https://steghide.sourceforge.net/)
