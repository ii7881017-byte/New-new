import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";
import { categories, tools } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Free Online Tools — Atoolsmart",
  description:
    "Use free online tools for images, PDFs, text, calculations and everyday tasks. Fast, simple and privacy-friendly.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const popular = tools.filter((x) => x.popular);
  const newest = tools.filter((x) => x.new);

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">100% FREE • NO SIGN UP</span>
        <h1>All-in-One<br />Online Tools</h1>
        <p>Simple, fast and privacy-friendly tools for everyday tasks. Everything you need, in one smart place.</p>
        <form className="search" action="/tools">
          <span>⌕</span>
          <input name="q" aria-label="Search tools" placeholder="Search for a tool..." />
          <button type="submit">Search</button>
        </form>
      </section>

      <div className="badges">
        <div className="badge"><b>⚡ Free & Unlimited</b>No hidden limits</div>
        <div className="badge"><b>✓ No Sign Up</b>Use instantly</div>
        <div className="badge"><b>🔒 Secure & Private</b>Your files stay yours</div>
        <div className="badge"><b>📱 Any Device</b>Mobile friendly</div>
      </div>

      <div className="head"><h2>Tool Categories</h2><Link href="/tools">View All</Link></div>
      <div className="grid">
        {categories.map((c) => (
          <Link className="category" href={`/${c.slug}`} key={c.slug}>
            <div className="ico">{c.icon}</div><h3>{c.name}</h3><p>{c.description}</p>
          </Link>
        ))}
      </div>

      <div className="head"><h2>Popular Tools</h2><Link href="/tools">View All</Link></div>
      <div className="grid">{popular.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>

      {newest.length > 0 && <>
        <div className="head"><h2>New Tools</h2><Link href="/new-tools">View All</Link></div>
        <div className="grid">{newest.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      </>}

      <div className="head"><h2>How It Works</h2></div>
      <div className="steps">
        <div className="step"><div className="num">1</div><div><b>Choose a tool</b><span>Pick what you need.</span></div></div>
        <div className="step"><div className="num">2</div><div><b>Upload or enter</b><span>Provide your file or data.</span></div></div>
        <div className="step"><div className="num">3</div><div><b>Get your result</b><span>Fast and simple.</span></div></div>
      </div>

      <footer className="footer">
        <div className="footer-row">
          <div><b>Atoolsmart</b><small>Smart online tools. Simple solutions.</small></div>
          <div className="links"><Link href="/articles">Articles</Link><Link href="/games">Games</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
        </div>
        <div className="lang"><select aria-label="Language"><option>English</option><option>العربية</option><option>Español</option><option>Türkçe</option><option>Français</option></select></div>
      </footer>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }])} />
    </main>
  );
}
