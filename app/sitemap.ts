import type { MetadataRoute } from "next";
import { categories, tools, sections } from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const sectionPages = sections
    .filter((s) => s.href && s.href !== "/")
    .map((s) => ({
      url: absoluteUrl(s.href),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/tools"), lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...sectionPages,
    ...categories.map((c) => ({
      url: absoluteUrl(`/${c.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...tools.map((t) => ({
      url: absoluteUrl(`/${t.categorySlug}/${t.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
