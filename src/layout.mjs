import { site, waLink } from './config.mjs';
import { programs, TBD } from './content.mjs';

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const tbd = (label = TBD) => `<span class="tbd">${esc(label)}</span>`;

// Flecha tipográfica única del sistema (no se usa iconografía genérica).
export const arrow = '<svg class="arr" viewBox="0 0 28 12" aria-hidden="true"><path d="M0 6h26M21 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>';
export const waIcon = `<svg class="wa-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg>`;

// Imágenes responsive: variantes disponibles por nombre en /assets/img
const variants = { 'yo-soy-testimonio': [640, 1080], 'detalle-manos': [640], 'patio-panoramica': [640, 1400], 'muro-cielo': [640, 1400] };
export const pic = (name, alt, { cls = '', sizes = '100vw', eager = false } = {}) => {
  if (!name) return frame();
  const v = variants[name] || [640, 1200];
  const src = `/assets/img/${name}-${v.at(-1)}.webp`;
  return `<img class="${cls}" src="${src}" srcset="${v.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};
// Marco editorial para fotografías pendientes (se reemplaza al tener la imagen real).
export const frame = (note = 'Fotografía por definir') => `<div class="frame" role="img" aria-label="${esc(note)}"><span>${esc(note)}</span></div>`;

// Encabezado de sección tipo revista: número + etiqueta sobre una línea fina.
export const rh = (n, label, cls = '') => `<div class="rh ${cls}" data-line><span class="rh__n">${n}</span><span class="rh__l">${label}</span></div>`;
export const more = (href, text, ext = href.startsWith('http')) => `<a class="more" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${text}</span>${arrow}</a>`;

const nav = [
  ['/nuestra-historia', 'Nuestra historia'],
  ['/nuestro-trabajo', 'Nuestro trabajo'],
  ['/historias', 'Historias'],
  ['/participa', 'Participa'],
];

const header = (path) => `
<a class="skip" href="#main">Saltar al contenido</a>
<header class="nav" data-nav>
  <a href="/" class="brand" aria-label="${site.name}, inicio">
    <img src="/assets/img/logo-mark.webp" alt="" width="40" height="33">
    <span class="brand__w">Dios Tras Las Rejas <span>Colombia</span></span>
  </a>
  <nav aria-label="Principal" class="nav__links">
    ${nav.map(([h, t]) => `<a href="${h}"${path.startsWith(h) ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
    <a href="/dona" class="nav__give"${path.startsWith('/dona') ? ' aria-current="page"' : ''}>Donar</a>
  </nav>
  <button class="nav__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu-open><span>Menú</span><i aria-hidden="true"></i></button>
</header>
<div class="menu" id="menu" hidden data-drawer role="dialog" aria-modal="true" aria-label="Menú">
  <div class="menu__top">
    <a href="/" class="brand"><img src="/assets/img/logo-mark.webp" alt="" width="40" height="33"><span class="brand__w">Dios Tras Las Rejas <span>Colombia</span></span></a>
    <button class="nav__menu is-x" type="button" data-menu-close><span>Cerrar</span><i aria-hidden="true"></i></button>
  </div>
  <nav aria-label="Menú móvil" class="menu__nav">
    ${[['/', 'Inicio'], ...nav, ['/programas', 'Programas'], ['/dona', 'Donar'], ['/contacto', 'Contacto']]
      .map(([h, t], i) => `<a href="${h}"><span>${String(i + 1).padStart(2, '0')}</span>${t}</a>`)
      .join('')}
  </nav>
  <p class="menu__verse">“Me ha enviado… a pregonar libertad a los cautivos”<span>Lucas 4:18</span></p>
</div>`;

const socials = () =>
  Object.entries(site.social)
    .filter(([, u]) => u)
    .map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`)
    .join('');

const footer = () => `
<footer class="foot">
  <div class="wrap">
    <p class="foot__sign">Enviados a anunciar <em>libertad</em></p>
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="/assets/img/logo-full-light-600.webp" alt="Fundación Dios Tras Las Rejas Colombia" width="150" height="140" loading="lazy">
        <p>Acompañamos a mujeres privadas de la libertad en la Cárcel El Buen Pastor desde la fe, la formación y la preparación para volver a la vida en libertad.</p>
      </div>
      <nav aria-label="Conoce"><h2>Conoce</h2><a href="/nuestra-historia">Nuestra historia</a><a href="/nuestro-trabajo">Nuestro trabajo</a><a href="/historias">Historias</a><a href="/transparencia">Transparencia</a></nav>
      <nav aria-label="Programas"><h2>Programas</h2>${programs.map((p) => `<a href="/programas/${p.slug}">${p.name}</a>`).join('')}</nav>
      <div><h2>Haz parte</h2><a href="/participa">Participa</a><a href="/dona">Donar</a><a href="/contacto">Contacto</a>
        <a href="${waLink('Hola, quiero saber más sobre Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener">WhatsApp ${site.whatsappDisplay}</a>
        ${site.email ? `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}${socials()}
      </div>
    </div>
    <div class="foot__legal">
      <p>© ${new Date().getFullYear()} ${site.legalName}${site.donate.bank.nit ? ` · NIT ${esc(site.donate.bank.nit)}` : ''}</p>
      <p>Lucas 4:18 · Reina-Valera 1960</p>
      <p><a href="/transparencia#datos">Tratamiento de datos</a></p>
    </div>
  </div>
</footer>
<a class="wa" href="${waLink('Hola, quiero saber más sobre Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${waIcon}<span>WhatsApp</span></a>`;

const orgLd = () => ({
  '@type': 'NGO',
  '@id': `${site.url}/#org`,
  name: site.legalName,
  alternateName: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/assets/img/icon-512.png`,
  description: 'Fundación cristiana que acompaña a mujeres privadas de la libertad en la Cárcel El Buen Pastor desde la fe, la formación y la preparación para el regreso a la libertad.',
  areaServed: { '@type': 'Country', name: 'Colombia' },
  contactPoint: { '@type': 'ContactPoint', telephone: `+${site.whatsapp}`, contactType: 'customer support', availableLanguage: 'es' },
  ...(Object.values(site.social).some(Boolean) ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
});

export function page({ path, title, description, body, crumbs = [], og, bodyClass = '', noindex = false }) {
  const url = `${site.url}${path}`;
  const fullTitle = path === '/' ? title : `${title} · ${site.name}`;
  const ogImg = `${site.url}${og || site.defaultOg}`;
  const graph = [orgLd(), { '@type': 'WebSite', '@id': `${site.url}/#web`, url: `${site.url}/`, name: site.name, inLanguage: site.lang, publisher: { '@id': `${site.url}/#org` } }];
  if (crumbs.length)
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [['Inicio', '/'], ...crumbs].map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: `${site.url}${p}` })),
    });
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#F3EEE6">
<meta property="og:type" content="website"><meta property="og:locale" content="${site.locale}"><meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${ogImg}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(fullTitle)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${ogImg}">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap">
<link rel="stylesheet" href="/assets/css/site.css?v=__V__">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
<script src="/assets/js/site.js?v=__V__" defer></script>
<script type="speculationrules">{"prerender":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/assets/*"}}]},"eagerness":"moderate"}]}</script>
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>`;
}

// Apertura de páginas internas: meta + titular editorial + entrada, con fotografía opcional a sangre.
export const opener = ({ n, label, title, lead, img, alt, variant = '' }) => `
<header class="opener ${variant}${img === undefined ? ' opener--text' : ''}">
  <div class="wrap opener__grid">
    ${rh(n, label)}
    <h1 class="d1" data-split>${title}</h1>
    ${lead ? `<p class="opener__lead" data-reveal>${lead}</p>` : ''}
  </div>
  ${img !== undefined ? `<figure class="opener__img" data-reveal>${pic(img, alt, { eager: true, sizes: '(min-width: 900px) 70vw, 100vw' })}</figure>` : ''}
</header>`;

// Cierre de página: una frase y un solo gesto.
export const closer = (title, [text, href] = ['Encuentra tu lugar', '/participa'], alt = ['Donar', '/dona']) => `
<section class="closer">
  <div class="wrap closer__grid" data-line>
    <h2 class="d2" data-reveal>${title}</h2>
    <div class="closer__act" data-reveal>${more(href, text)}${alt ? more(alt[1], alt[0]) : ''}</div>
  </div>
</section>`;
