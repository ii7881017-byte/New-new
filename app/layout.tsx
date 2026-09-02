import "./globals.css";
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { baseMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = baseMetadata();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="container">
            <Header />
            {children}
          </div>
          <JsonLd data={websiteJsonLd()} />
        </ThemeProvider>
      </body>
    </html>
  );
}
