import Link from"next/link";import type{Tool}from"@/lib/types";
export default function ToolCard({tool}:{tool:Tool}){return <Link className="card" href={`/${tool.categorySlug}/${tool.slug}`}><div><div className="ico">{tool.icon}</div><h3>{tool.name}</h3><p>{tool.description}</p></div><div className="arrow">→</div></Link>}
