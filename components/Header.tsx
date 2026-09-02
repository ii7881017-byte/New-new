import Link from"next/link";import Sidebar from"./Sidebar";import{categories,sections}from"@/lib/content";
export default function Header(){return <header className="header"><Link className="brand" href="/"><span className="mark">A</span>Atoolsmart</Link><Sidebar sections={sections} categories={categories}/></header>}
