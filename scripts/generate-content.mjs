import fs from "node:fs";
import path from "node:path";

const R = process.cwd();
const C = path.join(R, "content/categories");
const S = path.join(R, "content/sections");
const L = path.join(R, "content/locales");
const O = path.join(R, ".generated");
fs.mkdirSync(O, { recursive: true });

const dirs = (p) =>
  fs.existsSync(p)
    ? fs.readdirSync(p, { withFileTypes: true }).filter((x) => x.isDirectory()).map((x) => x.name)
    : [];
const j = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

const categories = dirs(C)
  .map((slug) => j(path.join(C, slug, "category.json")))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

const tools = [];
let imports = "";
for (const c of categories) {
  const toolRoot = path.join(C, c.slug, "tools");
  for (const slug of dirs(toolRoot)) {
    const meta = j(path.join(toolRoot, slug, "tool.json"));
    const component = path.join(toolRoot, slug, "tool.tsx");
    if (fs.existsSync(component)) {
      const name = `Tool${tools.length}`;
      imports += `import ${name} from "../content/categories/${c.slug}/tools/${slug}/tool";\n`;
      tools.push({
        ...meta,
        categorySlug: c.slug,
        categoryName: c.name,
        component: name
      });
    }
  }
}

const sections = dirs(S)
  .map((slug) => j(path.join(S, slug, "section.json")))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

const locales = dirs(L).filter((slug) =>
  fs.existsSync(path.join(L, slug, "common.json"))
);

const cleanTools = tools.map(({ component, ...meta }) => meta);
const components = tools
  .map((t) => `"${t.categorySlug}/${t.slug}":${t.component}`)
  .join(",");

const output = `// AUTO-GENERATED. DO NOT EDIT.
${imports}
export const categories=${JSON.stringify(categories)} as const;
export const tools=${JSON.stringify(cleanTools)} as const;
export const sections=${JSON.stringify(sections)} as const;
export const locales=${JSON.stringify(locales)} as const;
export const toolComponents={${components}} as const;
`;

fs.writeFileSync(path.join(O, "content.ts"), output);
console.log(
  `Generated ${categories.length} categories, ${tools.length} tools, ${sections.length} sections, ${locales.length} locales.`
);
