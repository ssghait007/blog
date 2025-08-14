# Contributing Authors Guide

This guide explains how to add yourself as an author to the blog and contribute guest posts.

## Adding Yourself as an Author

To contribute as a guest author, you need to create an author profile first.

### Step 1: Create Your Author Profile

Create a new file in the `content/authors/` directory with your slug as the filename:

```
content/authors/your-name-slug.md
```

### Step 2: Author Profile Template

Use this template for your author profile:

```yaml
---
name: "Your Full Name"
slug: "your-name-slug"
avatar: "https://your-avatar-url.com/image.jpg"
title: "Your Professional Title"
bio: "A brief description about yourself and your expertise. Keep it concise but informative."
location: "Your Location (optional)"
website: "https://your-website.com (optional)"
social:
  github: "your-github-username (optional)"
  twitter: "@your-twitter-handle (optional)"
  linkedin: "your-linkedin-username (optional)"
  email: "your-email@example.com (optional)"
specialties:
  - "Your Specialty 1"
  - "Your Specialty 2"
  - "Your Specialty 3"
joinedDate: "YYYY-MM-DD"
---

# About [Your Name]

Write a detailed bio about yourself here. This content will be displayed on your author page.

## Your Expertise

Describe your areas of expertise and what you're passionate about.

## Your Background

Share your professional background, experience, and journey.

## Connect With You

Add any additional information about how people can connect with you or learn more about your work.
```

### Step 3: Author Profile Guidelines

#### Required Fields
- `name`: Your full name as you want it displayed
- `slug`: URL-friendly version of your name (lowercase, hyphens instead of spaces)
- `avatar`: URL to your profile image
- `title`: Your professional title or role
- `bio`: Brief description (1-2 sentences)
- `joinedDate`: Date you joined as a contributor

#### Optional Fields
- `location`: Your location
- `website`: Your personal website
- `social`: Social media profiles
- `specialties`: Array of your technical specialties

#### Avatar Guidelines
- Use a professional headshot or avatar
- Recommended size: 150x150px or larger
- Supported formats: JPG, PNG, WebP
- You can use services like:
  - GitHub avatar: `https://github.com/username.png`
  - Gravatar: `https://gravatar.com/avatar/hash`
  - Unsplash: `https://images.unsplash.com/photo-id?w=150&h=150&fit=crop&crop=face`
  - Your own hosted image

### Step 4: Writing Your First Post

Once your author profile is created, you can write blog posts. In your blog post frontmatter, make sure to use the exact same name as in your author profile:

```yaml
---
title: "Your Blog Post Title"
description: "Post description"
category: "Frontend" # or Backend, Cloud, Developer
published: true
createdAt: 2024-01-01T00:00:00.000Z
image: "https://your-featured-image-url.com/image.jpg"
author: "Your Full Name" # Must match your author profile name exactly
authorTitle: "Your Professional Title" # Optional, will use author profile if not provided
readingTime: "5 min read"
tags: ['tag1', 'tag2']
proficiency: beginner # beginner, intermediate, or advanced
---
```

## Example Author Profiles

Check out these example author profiles for reference:
- `content/authors/sachin-ghait.md` - Main blog author
- `content/authors/jane-doe.md` - Guest author example

## Submission Process

1. **Fork the repository**
2. **Create your author profile** following the template above
3. **Write your blog post** in the `content/blog/` directory
4. **Test locally** to ensure everything works
5. **Submit a Pull Request** with:
   - Your author profile
   - Your blog post
   - Clear description of your contribution

## Author Page Features

Once your author profile is created, you'll automatically get:
- A dedicated author page at `/authors/your-slug`
- Clickable avatar and name in blog cards
- Author bio and social links display
- List of all your published posts
- SEO optimization for your author page

## Tips for Success

### Writing Great Author Bios
- Keep your bio concise but informative
- Highlight your unique expertise
- Include your passion and interests
- Make it personal but professional

### Choosing Good Specialties
- Be specific (e.g., "Vue.js" instead of "Frontend")
- Limit to 3-5 specialties
- Focus on your strongest areas
- Use consistent terminology

### Avatar Best Practices
- Use a clear, professional photo
- Ensure good lighting and quality
- Square aspect ratio works best
- Keep file size reasonable

## Need Help?

If you have questions about contributing as an author:
1. Check existing author profiles for examples
2. Review the blog post template in `BLOG-TEMPLATE.md`
3. Open an issue for questions
4. Reach out to the maintainers

## Author System Benefits

This author system provides:
- **Extensibility**: Easy to add new authors
- **Rich Profiles**: Detailed author information and bios
- **SEO Friendly**: Dedicated author pages with proper meta tags
- **Social Integration**: Links to author social profiles
- **Content Attribution**: Clear author attribution on all posts
- **Guest Friendly**: Simple process for guest contributors

Welcome to the blog community! 🎉
