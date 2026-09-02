# Atoolsmart — Scalable SEO Foundation v3

Production domain: **https://atoolsmart.com**

## Core rule: ADD, DON'T EDIT

The core navigation, header, routing, SEO helpers and sitemap are designed to discover content from folders.

### Add a tool

Create:

```text
content/categories/<category>/tools/<tool>/
  tool.json
  tool.tsx
```

Include SEO directly in `tool.json`:

```json
{
  "slug": "json-formatter",
  "name": "JSON Formatter",
  "description": "Format and validate JSON online.",
  "icon": "{ }",
  "popular": false,
  "new": true,
  "seo": {
    "title": "JSON Formatter Online Free | Atoolsmart",
    "description": "Format and validate JSON online for free.",
    "keywords": ["json formatter", "format json", "json validator"]
  }
}
```

Run:

```bash
npm install
npm run dev
```

The generator discovers the new tool and the dynamic route automatically. Its metadata, canonical URL, Open Graph/Twitter metadata, WebApplication schema, breadcrumbs and sitemap entry are generated from the tool data.

### Add a category

Create:

```text
content/categories/developer-tools/category.json
content/categories/developer-tools/tools/...
```

Do not edit Header, Sidebar, Home, routing, SEO or sitemap files.

### Add a top-level section

Create:

```text
content/sections/ai/section.json
```

Use `group: "primary"` or `group: "more"`.

### Add a language

Create:

```text
content/locales/de/common.json
```

The locale is auto-discovered. Keep locale data separate from tool/category data so future locale routes can be added without rewriting the content model.

**Important SEO rule:** do not publish `hreflang` entries for language URLs until those localized URLs actually exist. When localized routes are introduced, each language page should have a self-canonical URL plus `hreflang` links and an `x-default` entry.

## SEO included in v3

- Site-wide title template and description
- Canonical URLs
- Per-category and per-tool SEO metadata
- Open Graph
- Twitter cards
- Robots directives
- Dynamic sitemap
- Robots file
- BreadcrumbList JSON-LD
- WebSite JSON-LD with SearchAction
- WebApplication JSON-LD for tools
- Mobile web manifest
- Search-friendly `/tools?q=` route
- Static generation params for categories and tools
- Add-only metadata-driven architecture
- Production domain set to `https://atoolsmart.com`

`.generated/content.ts` is generated automatically. Do not edit it manually.
