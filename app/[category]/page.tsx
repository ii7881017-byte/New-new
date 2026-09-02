import Link from "next/link";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";
import { categories, tools } from "@/lib/content";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const c = categories.find((x) => x.slug === category);
  if (!c) return { title: "Not Found", robots: { index: false, follow: false } };

  return {
    title: c.seo?.title ?? `${c.name} — Free Online Tools`,
    description: c.seo?.description ?? c.description,
    keywords: c.seo?.keywords ? [...c.seo.keywords] : undefined,
    alternates: { canonical: `/${c.slug}` },
    openGraph: {
      title: c.seo?.title ?? c.name,
      description: c.seo?.description ?? c.description,
      url: absoluteUrl(`/${c.slug}`),
      type: "website",
    },
    twitter: {
      title: c.seo?.title ?? c.name,
      description: c.seo?.description ?? c.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categories.find((x) => x.slug === category);
  if (!c) return <main className="page"><h1>Not found</h1></main>;

  const list = tools.filter((t) => t.categorySlug === category);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: c.name, url: `/${c.slug}` },
  ]);

  return (
    <main className="page">
      <Link className="muted" href="/tools">← All Tools</Link>
      <h1>{c.icon} {c.name}</h1>
      <p className="muted">{c.description}</p>
      <div className="grid">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      <JsonLd data={crumbs} />
    </main>
  );
}
