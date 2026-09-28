// Build estático: genera /dist con URLs limpias (/ruta/index.html), sitemap, robots y 404.
// Uso: node build.mjs   (lee variables de .env si existe)
import { readFileSync, existsSync, rmSync, mkdirSync, writeFileSync, cpSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

if (existsSync('.env'))
  for (const l of readFileSync('.env', 'utf8').split('\n')) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }

const { site } = await import('./src/config.mjs');
const { pages, render } = await import('./src/pages.mjs');
const OUT = 'dist';
const V = Date.now().toString(36);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('src/assets', join(OUT, 'assets'), { recursive: true });
cpSync('public', OUT, { recursive: true });

// Inyecta configuración pública en el JS
const js = join(OUT, 'assets/js/site.js');
writeFileSync(js, readFileSync(js, 'utf8').replace('__WA__', site.whatsapp).replace('__FORM_ENDPOINT__', site.formEndpoint));

for (const p of pages) {
  const file = p.path === '/' ? 'index.html' : p.path === '/404' ? '404.html' : join(p.path.slice(1), 'index.html');
  const html = render(p).replaceAll('__V__', V);
  mkdirSync(dirname(join(OUT, file)), { recursive: true });
  writeFileSync(join(OUT, file), html);
}

const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${site.url}${p.path}</loc></url>`);
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

// Verificación: todo enlace interno y recurso referenciado debe existir
const all = [];
const walk = (d) => readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.html') && all.push(join(d, e.name))));
walk(OUT);
let broken = 0;
for (const f of all) {
  const html = readFileSync(f, 'utf8');
  for (const [, u] of html.matchAll(/(?:href|src|poster)="(\/[^"#?]*)/g)) {
    const t = join(OUT, u);
    if (!existsSync(t) && !existsSync(join(t, 'index.html'))) { console.error(`✗ ${f}: enlace roto ${u}`); broken++; }
  }
  for (const [, s] of html.matchAll(/srcset="([^"]+)"/g))
    for (const u of s.split(',').map((x) => x.trim().split(' ')[0])) if (!existsSync(join(OUT, u))) { console.error(`✗ ${f}: imagen ${u}`); broken++; }
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) { console.error(`✗ ${f}: debe tener exactamente un <h1>`); broken++; }
}
if (broken) { console.error(`\n${broken} problema(s). Build fallido.`); process.exit(1); }
console.log(`✓ ${all.length} páginas generadas en /${OUT}`);
