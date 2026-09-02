import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/content";
export const metadata: Metadata = {
  title: "All Online Tools",
  description: "Browse Atoolsmart's collection of free online tools.",
  alternates: { canonical: "/tools" },
};
export default async function Page({searchParams}:{searchParams?:Promise<{q?:string}>}) {
  const q=(await searchParams)?.q?.trim().toLowerCase() ?? "";
  const list=tools.filter(t=>!q || `${t.name} ${t.description} ${t.categoryName}`.toLowerCase().includes(q));
  return <main className="page"><span className="eyebrow">ATOOLSMART</span><h1>All Tools</h1><p className="muted">Browse every tool available on Atoolsmart.</p><div className="grid">{list.map(t=><ToolCard key={`${t.categorySlug}/${t.slug}`} tool={t}/>)}</div>{list.length===0&&<p className="muted">No tools found.</p>}</main>
}
