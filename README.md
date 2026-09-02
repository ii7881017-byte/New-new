# Atoolsmart — Cloudflare-ready scalable V4

Production domain: https://atoolsmart.com

## Core rule: ADD, DON'T EDIT

New tools, categories, sections, and locales are discovered from folders/files. The generated `.generated/content.ts` is rebuilt by the content generator and should not be edited manually.

## Cloudflare Workers

V4 is prepared for Cloudflare Workers using vinext and the Cloudflare Vite plugin.

Build:
`npm run build`

Vinext development:
`npm run dev:vinext`

Deploy:
`npm run deploy`

Cloudflare Workers Builds settings:
- Build command: `npm run build`
- Deploy command: `npx @vinext/cloudflare deploy`
- Root directory: `/`
- Production branch: `main`

The Cloudflare configuration is source-controlled in `wrangler.jsonc` and `vite.config.ts`, so automatic configuration should not rewrite the repository.

## SEO

Includes site-wide metadata, per-category/tool metadata, canonical URLs, Open Graph/Twitter metadata, JSON-LD, robots, sitemap, and manifest support.

## Content structure

Tool: `content/categories/<category>/tools/<tool>/tool.json` + `tool.tsx`

Category: create a category folder with `category.json`.

Section: create a folder under `content/sections/` with `section.json`.

Language: create a folder under `content/locales/` with `common.json`.
