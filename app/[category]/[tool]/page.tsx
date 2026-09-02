import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { tools, toolComponents } from "@/lib/content";
import { absoluteUrl, breadcrumbJsonLd, webApplicationJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return tools.map((t) => ({ category: t.categorySlug, tool: t.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; tool: string }> }
): Promise<Metadata> {
  const { category, tool } = await params;
  const m = tools.find((t) => t.categorySlug === category && t.slug === tool);
  if (!m) return { title: "Not Found", robots: { index: false, follow: false } };

  return {
    title: m.seo?.title ?? `${m.name} — Free Online Tool`,
    description: m.seo?.description ?? m.description,
    keywords: m.seo?.keywords ? [...m.seo.keywords] : undefined,
    alternates: { canonical: `/${m.categorySlug}/${m.slug}` },
    openGraph: {
      title: m.seo?.title ?? m.name,
      description: m.seo?.description ?? m.description,
      url: absoluteUrl(`/${m.categorySlug}/${m.slug}`),
      type: "website",
    },
    twitter: {
      title: m.seo?.title ?? m.name,
      description: m.seo?.description ?? m.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { category, tool } = await params;
  const m = tools.find((t) => t.categorySlug === category && t.slug === tool);
  const C = toolComponents[`${category}/${tool}` as keyof typeof toolComponents];
  if (!m || !C) notFound();

  const url = `/${m.categorySlug}/${m.slug}`;
  return (
    <main className="page">
      <div className="muted">
        <Link href="/">Home</Link> → <Link href={`/${m.categorySlug}`}>{m.categoryName}</Link> → {m.name}
      </div>
      <h1>{m.icon} {m.name}</h1>
      <p className="muted">{m.description}</p>
      <C />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: m.categoryName, url: `/${m.categorySlug}` },
        { name: m.name, url },
      ])} />
      <JsonLd data={webApplicationJsonLd(m.name, m.description, url)} />
    </main>
  );
}
