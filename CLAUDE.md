# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 blog application built with Tailwind CSS and deployed to Netlify. The blog focuses on developer learning content with a clean, responsive design and dark mode support.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm run generate` - Generate static site for deployment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

## Architecture

### Content Management
- Blog posts are stored as Markdown files in `content/blog/`
- Each post includes frontmatter with metadata (title, description, category, tags, author, etc.)
- Posts are organized by categories: backend, cloud, developer, frontend
- Uses @nuxt/content for content parsing and rendering

### Key Components
- **BlogCard.vue**: Displays blog post previews with parallax hover effects
- **BlogContent.vue**: Renders individual blog posts with syntax highlighting
- **BlogContentCategory.vue**: Handles category-based filtering
- **DarkModeToggle.vue**: Theme switcher with system preference detection
- **InteractiveTableOfContents.vue**: Auto-generated TOC for blog posts
- **ReadingProgress.vue**: Progress bar for reading blog posts

### State Management
- Uses Vue 3 Composition API throughout
- Dark mode managed via `useDarkMode.js` composable with localStorage persistence
- Responsive to system theme preferences

### Styling
- Tailwind CSS with custom configuration
- Typography plugin for blog content styling
- Dark mode support via class-based toggling
- Custom hover animations and transitions

### Content Structure
Blog posts require specific frontmatter:
```yaml
title: Post Title
description: Brief description
category: Frontend/Backend/Cloud/Developer
published: true
createdAt: ISO date
image: Featured image URL
author: Author name
authorTitle: Author title
readingTime: X min read
tags: ['tag1', 'tag2']
proficiency: beginner/intermediate/advanced
```

### Deployment
- Configured for Netlify static site generation
- Uses `netlify-static` preset
- Google Analytics integration via nuxt-gtag
- Automated deployments from main branch

## File Organization

- `components/` - Vue components
- `composables/` - Reusable composition functions
- `content/blog/` - Markdown blog posts
- `layouts/` - Page layout templates
- `pages/` - Route pages with nested structure
- `public/` - Static assets
- `assets/` - Build-time assets and images

## Adding New Content

Follow the guide in `HOW-TO-ADD-BLOG-POST.md`:
1. Create new .md file in `content/blog/`
2. Use the template from `BLOG-TEMPLATE.md`
3. Include all required frontmatter fields
4. Place images in `assets/` directory