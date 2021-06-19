---
title: Steganography - Hide text data inside image

description: The post discusses how to hide data inside image, and some methods in Steganography.

category: Developer

published: true

createdAt: 2021-06-19T07:00:13.392Z

image: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeAZp9JxxFgE3SHJBhlWA6ERAa-fWvPrrj6RqyfHQi9kom_zLuJ2zd7WQq8Y2LbtL2wE&usqp=CAU
---

# Steganography - Hide text data inside image

I was watching a web-show(`Mr-Robot`) on a weekend. It's a story of how a guy hacks into data servers of big conglomerate, and encrypts all data with a cryptographic keys. After the hack was successful he stores the RSA keys to decrypt this data `inside an image`.

This got me interested in the fact that we can store secret messages and keys. So I researched on this topic and got some basic methods of how it is practically achieved.

## What is Steganography

Steganography is a very ancient method, It is the practice of concealing a message within another message or a physical object.

The ancient form was like, sending messages on paper with invisible ink.

## Types of Steganography

Over years its evolved and now used digitally with various forms of media like

1. **Text** - hide data inside another text, ex. embed a word every 5th word of paragraph.

2. **Image** - hide data inside image, replace pixels info with secret data in such a way there is minimal/un-noticable changes to image.

3. **Audio** - hide data in audio file, ex. add hidden data by modify audio in imperceptible way.

4. **Video** - hide data in video file. As videos have large size, its is very easy to hide any data/file type inside it.

5. **Network** - hide data in network protocols ex. hide secret in header or payload or mixing it in both.

## Methods used in Image Steganography

There are many methods used in image steganography, I have listed very basic and simple ones.

**LSB** (Least significant bit)

It is a technique in which least significant bit of pixel data is replaced with data bit. It's very simple method and difference in images are undetected by naked eye.

**DCT**

This technique involves changing values of quantized DCT coefficients.

Read more on DCT [here](https://www.youtube.com/watch?v=Q2aEzeMDHMA).

**JSTEG**

It is a steganography algorithm based on LSB replacement method for hiding data in DCT coefficients of JPEG images. The algorithm replaces the LSB of DCT coefficients by bits of the secret message to be hidden

## Simple example in python

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

## Free available tools

- Openstego

- Steghide

- SSuite Piscel

- Xiao Steganography

- Hide’N’Send

## Uses

- embed copyright messages in media files

- send secret info to someone

- It's very popular in cyber crimes, Hence very important for white hat hackers.

## References

- https://www.youtube.com/watch?v=xepNoHgNj0w

- https://www.youtube.com/watch?v=TWEXCYQKyDc
