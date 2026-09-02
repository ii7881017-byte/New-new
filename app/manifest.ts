import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atoolsmart — Free Online Tools",
    short_name: "Atoolsmart",
    description: "Free, fast and privacy-friendly online tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fc",
    theme_color: "#6d5dfc",
    lang: "en",
  };
}
