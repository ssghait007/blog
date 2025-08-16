---
title: Breaking Bad Habits with Shamir's Secret Sharing
description: How I used cryptography to break my doom scrolling addiction. Learn to split sensitive passwords into multiple shares, making it harder to give in to impulses while keeping recovery possible when truly needed.
category: Developer
published: true
createdAt: 2025-08-16T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/shamirs-secret-sharing.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 7 min read
tags: ["developer", "cryptography", "security"]
proficiency: intermediate
# beginner intermediate advanced
---

![You can see me](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdodGJiZXRrbWt6N2tvOGxsaDRmbDd4aXJuc205ZHhyNDhyZmk5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5x0XvhK2zDgKHt0D86/200.webp)

I had a problem. I kept turning off my PiHole's social media blocking to mindlessly scroll through feeds. It was too easy - just login to the admin panel, disable restrictions, and boom - instant access to my time-wasting websites.

After reading Atomic Habits, I realized I needed to make bad habits harder to do. That's when I discovered Shamir's Secret Sharing scheme - a cryptographic technique that lets you split a secret into multiple pieces where you only need some of them to reconstruct it.

My solution? Split my PiHole admin password into 8 chunks and hide them across different digital and physical locations. Now when I want to disable restrictions, I need to really think about whether it's worth the effort of collecting 4 pieces.

## What is Shamir's Secret Sharing

Shamir's Secret Sharing is a cryptographic algorithm that divides a secret into N shares, where any K shares can reconstruct the original secret, but K-1 or fewer shares reveal nothing about the secret.

The beauty is in the mathematics - it uses polynomial interpolation over finite fields. But you don't need to understand the math to use it effectively.

![Shamir Secret Sharing Concept](https://raw.githubusercontent.com/ssghait007/blog/main/assets/shamir-concept-diagram.webp)

## How It Works in Practice

Let's say you want to split your master password into 8 shares, requiring any 4 shares to reconstruct it:

1. **Split Phase**: Your password gets converted into shares like `1-abc123def456`
2. **Distribution**: You store each share in different locations or give them to different people
3. **Recovery**: When you need the password, collect any 4 shares and reconstruct the original

The key insight: each individual share is completely useless. Someone with 3 shares has exactly the same information as someone with 0 shares.

## Building a Practical Tool

I built a simple bash implementation that uses the `ssss` (Shamir's Secret Sharing Scheme) library. Here's how it works:

### Installation

```bash
# macOS
brew install ssss

# Linux
sudo apt install ssss
```

### Split a Password

```bash
# Use the unified CLI tool
./shamir.sh split
```

This prompts you to enter your password (hidden input) and generates 8 shares like:
```
1-abcd1234efgh5678
2-ijkl9012mnop3456  
3-qrst7890uvwx1234
4-yzab5678cdef9012
5-ghij3456klmn7890
6-opqr1234stuv5678
7-wxyz9012abcd3456
8-efgh7890ijkl1234
```

### Reconstruct the Password

```bash
# Use the unified CLI tool  
./shamir.sh reconstruct
```

The reconstruction script has a nice ritual-like interface:
```
🔐 Password Reconstruction Ritual 🔐
====================================

Preparing to unlock your secret...
I need exactly 4 shares to proceed.

🔑 Enter share 1/4: 2-ijkl9012mnop3456
   ✓ Share 1 accepted
🔑 Enter share 2/4: 5-ghij3456klmn7890
   ✓ Share 2 accepted
🔑 Enter share 3/4: 7-wxyz9012abcd3456
   ✓ Share 3 accepted
🔑 Enter share 4/4: 1-abcd1234efgh5678
   ✓ Share 4 accepted

🔮 Combining the fragments...
   Invoking ancient mathematics...
   Reconstructing the secret...

🎉 SUCCESS! 🎉
==============

Your password has been revealed:
🔓 [your original password] 🔓
```

## Real-World Use Cases

**Breaking Bad Habits (My Use Case)**
Split your PiHole admin password to make social media access harder. Store shares in different locations - some in password managers, others as physical notes. The friction of collecting shares makes you reconsider impulse decisions.

**Team Password Management**
Split critical system passwords among team leads. No single person can access production, but any 3 out of 5 leads can recover passwords during emergencies.

**Personal Backup Strategy**
Store shares in different locations: cloud storage, physical notes, trusted family members. Even if you lose access to some shares, you can still recover your passwords.

**Corporate Compliance**
Meet security requirements that mandate multiple approvals for sensitive access. The cryptographic guarantee means you can't cheat the system.

## Security Considerations

### Distribution Strategy

- **Never store all shares together** - defeats the entire purpose
- **Different storage methods** - mix digital and physical storage
- **Geographic distribution** - store shares in different locations
- **Access control** - limit who has access to each share

### Threat Model

- **Insider threats**: Even malicious insiders can't access secrets with insufficient shares
- **Data breaches**: Compromising one storage location doesn't reveal the secret
- **Key person risk**: System doesn't break if some people leave or become unavailable

## Advanced Features

You can customize the scheme for different security needs:

```bash
# High security: 10 shares, need 7 to reconstruct
echo "$PASSWORD" | ssss-split -t 7 -n 10

# Lower threshold: 6 shares, need 2 to reconstruct
echo "$PASSWORD" | ssss-split -t 2 -n 6

# Enterprise: 15 shares, need 8 to reconstruct
echo "$PASSWORD" | ssss-split -t 8 -n 15
```

## Common Mistakes to Avoid

**Storing shares together** - I've seen people save all shares in the same password manager. This completely defeats the purpose.

**Not testing reconstruction** - Always verify you can reconstruct your secret before relying on the shares.

**Ignoring share protection** - Each share should be stored securely. They're not the original secret, but they're still sensitive.

**Poor documentation** - Keep track of which shares you have and where they're stored, otherwise recovery becomes impossible.

## Implementation Tips

1. **Start simple** - Begin with a (4,8) scheme (4 needed, 8 total) for most use cases
2. **Test thoroughly** - Always verify reconstruction works before deploying
3. **Document everything** - Keep clear records of your sharing scheme
4. **Regular audits** - Periodically verify you can still access your shares
5. **Have a backup plan** - Consider multiple sharing schemes for critical secrets

## Conclusion

Shamir's Secret Sharing solves a fundamental problem in security: how to protect secrets while ensuring availability. It's not just theoretical cryptography - it's a practical tool that can improve your security posture immediately.

The beauty is in its simplicity once implemented. You get mathematical guarantees about security while solving real business problems around access control and availability.

Whether you're breaking bad habits like I did with social media, managing team passwords, backing up personal credentials, or meeting enterprise compliance requirements, Shamir's Secret Sharing provides an elegant solution that balances security with practicality.

![You can't see me](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdodGJiZXRrbWt6N2tvOGxsaDRmbDd4aXJuc205ZHhyNDhyZmk5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ZtjDNG2UXy7B3xK/200.webp)

## Resources

- [Complete Implementation](https://github.com/ssghait007/ssss) - Ready-to-use bash scripts
- [ssss in details](https://www.geeksforgeeks.org/computer-networks/shamirs-secret-sharing-algorithm-cryptography/) - Core implementation details
- [Technical Paper](https://cs.jhu.edu/~sdoshi/crypto/papers/shamirturing.pdf) - Original Shamir paper
