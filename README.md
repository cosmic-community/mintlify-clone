# DevDocs — API Documentation Platform

![App Preview](https://imgix.cosmicjs.com/066e9e50-1dcd-11f1-bc33-8fcc215f642c-autopilot-photo-1526374965328-7f61d4dc18c5-1773290183849.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, Mintlify-inspired API documentation site built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse documentation organized by sections, view rich content pages, track versions, and follow the changelog — all managed through your Cosmic CMS dashboard.

## Features

- 📚 **Section-organized Documentation** — Docs grouped into logical sections with icons, descriptions, and custom ordering
- 📄 **Rich Content Pages** — Full markdown/HTML rendering with badges, section links, and hierarchical navigation
- 🏷️ **Version Tracking** — Display the current API version and release date prominently
- 📋 **Changelog** — Categorized changelog entries with version tags, dates, and rich content
- 🔍 **Client-side Search** — Instant search across all documentation pages
- 📱 **Responsive Sidebar** — Collapsible sidebar navigation with mobile hamburger menu
- 🎨 **Mintlify-inspired Design** — Clean, modern aesthetic with dark sidebar and light content area
- ⚡ **Server-side Rendering** — Fast page loads with Next.js App Router and server components
- 🛡️ **TypeScript** — Fully typed with strict mode and pre-build type checking

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69b2426c62dcf6ad64d90fa0&clone_repository=69b2441362dcf6ad64d90fe2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a documentation site with documentation pages organized by section, version info, and a changelog. User instructions: Create a Mintlify clone for a SaaS API company."

### Code Generation Prompt

> "Build a Next.js application for a content management system called 'Mintlify Clone'. The content is managed in Cosmic CMS with the following object types: doc-sections, doc-pages, version, changelog-entries. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Create a Mintlify clone for a SaaS API company."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A [Cosmic](https://www.cosmicjs.com) account with the documentation content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd devdocs

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file with:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Documentation Sections

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: sections } = await cosmic.objects
  .find({ type: 'doc-sections' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

### Fetching a Single Doc Page

```typescript
const { object: page } = await cosmic.objects
  .findOne({ type: 'doc-pages', slug: 'getting-started' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 📚 Doc Sections | `doc-sections` | Organizational groupings for documentation |
| 📄 Doc Pages | `doc-pages` | Individual documentation pages with rich content |
| 🏷️ Version | `version` | Current API version and release date |
| 📋 Changelog Entries | `changelog-entries` | Version-tagged changelog items |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add your environment variables
5. Deploy!

<!-- README_END -->