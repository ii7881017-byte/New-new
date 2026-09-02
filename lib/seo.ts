import type { Metadata } from "next";

export const SITE_NAME = "Atoolsmart";
export const SITE_URL = "https://atoolsmart.com";
export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "ar", "es", "tr", "fr"] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Free Online Tools`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Free, fast and privacy-friendly online tools for images, PDFs, text, calculations and everyday tasks.",
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    keywords: [
      "free online tools",
      "online tools",
      "image tools",
      "pdf tools",
      "text tools",
      "calculators",
      "utility tools",
    ],
    formatDetection: { telephone: false },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Free Online Tools`,
      description:
        "Free, fast and privacy-friendly online tools for everyday tasks.",
      url: SITE_URL,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Free Online Tools`,
      description:
        "Free, fast and privacy-friendly online tools for everyday tasks.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free, fast and privacy-friendly online tools for everyday tasks.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webApplicationJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(url),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
