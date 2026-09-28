import { site, waLink } from './config.mjs';
import { programs, TBD } from './content.mjs';

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const tbd = (label = TBD) => `<span class="tbd">${esc(label)}</span>`;

// Flecha única del sistema
export const arrow = '<svg class="arr" viewBox="0 0 28 12" aria-hidden="true"><path d="M0 6h26M21 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
export const play = '<svg class="play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
export const waIcon = `<svg class="wa-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg>`;

// Íconos de línea (estilo Lucide, en línea, sin dependencias)
const icons = {
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  hands: '<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  church: '<path d="M10 9h4M12 7v5M14 22v-4a2 2 0 0 0-4 0v4M18 22V5.6a1 1 0 0 0-.4-.8l-5-3.6a1 1 0 0 0-1.2 0l-5 3.6a1 1 0 0 0-.4.8V22M18 11l3.6 2.2a1 1 0 0 1 .4.8V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 .4-.8L6 11"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7 .9l.2.2a3 3 0 0 0 2.1.9H22v7h-2M2 12v7h2l6.5 6.5"/><path d="M2 5h8l1 1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  sparkle: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  door: '<path d="M13 4h3a2 2 0 0 1 2 2v14M2 20h3M13 20h9M10 12v.01M13 4.6v16.8a.6.6 0 0 1-.8.6L5 20V5.6a1 1 0 0 1 .7-1l6-1.5a1 1 0 0 1 1.3 1.5z"/>',
};
export const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]}</svg>`;

// Titular de marca: línea serif itálica + línea en mayúscula condensada (como “Yo soy / TESTIMONIO”)
export const T = (serif, caps, { tag = 'h2', id = '', cls = '' } = {}) =>
  `<${tag}${id ? ` id="${id}"` : ''} class="t ${cls}" data-split>${serif ? `<span class="t__s">${serif}</span>` : ''}<span class="t__c">${caps}</span></${tag}>`;

// Imágenes responsive: variantes disponibles por nombre en /assets/img
const variants = {
  'yo-soy-testimonio': [640, 1080], 'detalle-manos': [640], 'patio-panoramica': [640, 1400], 'muro-cielo': [640, 1400],
  capilla: [640, 1600], 'taller-costura': [640, 1600], 'oracion-noche': [640, 960], 'encuentro-institucional': [640, 960], 'taller-producto': [640, 960], 'retrato-taller': [640],
};
export const pic = (name, alt, { cls = '', sizes = '100vw', eager = false, pos = '' } = {}) => {
  if (!name) return frame();
  const v = variants[name] || [640, 1200];
  return `<img class="${cls}" src="/assets/img/${name}-${v.at(-1)}.webp" srcset="${v.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}" alt="${esc(alt)}"${pos ? ` style="object-position:${pos}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};
export const frame = (note = 'Fotografía por definir') => `<div class="frame" role="img" aria-label="${esc(note)}"><span>${esc(note)}</span></div>`;

export const kicker = (text, cls = '') => `<p class="k ${cls}">${text}</p>`;
export const more = (href, text, ext = href.startsWith('http')) => `<a class="more" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${text}</span>${arrow}</a>`;
export const btn = (href, text, cls = '', ext = href.startsWith('http')) => `<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${text}</span>${arrow}</a>`;

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
    <img src="/assets/img/logo-mark.webp" alt="" width="42" height="34">
    <span class="brand__w">Dios Tras Las Rejas<span>Colombia</span></span>
  </a>
  <nav aria-label="Principal" class="nav__links">
    ${nav.map(([h, t]) => `<a href="${h}"${path.startsWith(h) ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
  </nav>
  <a href="/dona" class="nav__give">Donar</a>
  <button class="nav__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu-open aria-label="Abrir menú"><i aria-hidden="true"></i></button>
</header>
<div class="menu" id="menu" hidden data-drawer role="dialog" aria-modal="true" aria-label="Menú">
  <div class="menu__top">
    <a href="/" class="brand"><img src="/assets/img/logo-mark.webp" alt="" width="42" height="34"><span class="brand__w">Dios Tras Las Rejas<span>Colombia</span></span></a>
    <button class="nav__menu is-x" type="button" data-menu-close aria-label="Cerrar menú"><i aria-hidden="true"></i></button>
  </div>
  <nav aria-label="Menú móvil" class="menu__nav">
    ${[['/', 'Inicio'], ...nav, ['/programas', 'Programas'], ['/contacto', 'Contacto']].map(([h, t], i) => `<a href="${h}"><span>${String(i + 1).padStart(2, '0')}</span>${t}</a>`).join('')}
  </nav>
  <a class="btn btn--gold menu__give" href="/dona"><span>Donar</span>${arrow}</a>
  <p class="menu__verse"><em>“Me ha enviado… a pregonar libertad a los cautivos”</em><span>Lucas 4:18</span></p>
</div>`;

const socials = () =>
  Object.entries(site.social)
    .filter(([, u]) => u)
    .map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`)
    .join('');

const footer = () => `
<footer class="foot">
  <div class="wrap">
    <div class="foot__top">
      ${T('Enviados a anunciar', 'Libertad', { tag: 'p', cls: 't--xl' })}
      <div class="foot__cta">${btn('/dona', 'Donar', 'btn--gold')}${btn('/participa', 'Haz parte', 'btn--line')}</div>
    </div>
    <div class="foot__grid">
      <div class="foot__brand">
        <img src="/assets/img/logo-full-light-600.webp" alt="Fundación Dios Tras Las Rejas Colombia" width="140" height="131" loading="lazy">
        <p>Acompañamos a mujeres privadas de la libertad en la Cárcel El Buen Pastor desde la fe, la formación y la preparación para volver a la vida en libertad.</p>
      </div>
      <nav aria-label="Conoce"><h2>Conoce</h2><a href="/nuestra-historia">Nuestra historia</a><a href="/nuestro-trabajo">Nuestro trabajo</a><a href="/historias">Historias</a><a href="/transparencia">Transparencia</a></nav>
      <nav aria-label="Programas"><h2>Programas</h2>${programs.map((p) => `<a href="/programas/${p.slug}">${p.name}</a>`).join('')}</nav>
      <div><h2>Contacto</h2>
        <a href="${waLink('Hola, quiero saber más sobre Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener">WhatsApp ${site.whatsappDisplay}</a>
        ${site.emails.map((e) => `<a href="mailto:${esc(e)}">${esc(e)}</a>`).join('')}${socials()}
      </div>
    </div>
    <div class="foot__legal">
      <p>© ${new Date().getFullYear()} ${site.legalName} · NIT ${esc(site.donate.bank.nit)}</p>
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
  taxID: site.donate.bank.nit,
  email: site.email,
  description: 'Fundación cristiana que acompaña a mujeres privadas de la libertad en la Cárcel El Buen Pastor desde la fe, la formación y la preparación para el regreso a la libertad.',
  areaServed: { '@type': 'Country', name: 'Colombia' },
  founder: [{ '@type': 'Person', name: 'Lina' }, { '@type': 'Person', name: 'Liliana' }],
  contactPoint: { '@type': 'ContactPoint', telephone: `+${site.whatsapp}`, email: site.email, contactType: 'customer support', availableLanguage: 'es' },
  ...(Object.values(site.social).some(Boolean) ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
});

export function page({ path, title, description, body, crumbs = [], og, bodyClass = '', noindex = false, preload }) {
  const url = `${site.url}${path}`;
  const darkTop = /^\s*(<header class="cover|<section class="hero|<section class="give-sec|<article class="story-p">)/.test(body);
  bodyClass = `${bodyClass.replace('is-dark-top', '')} ${darkTop ? 'is-dark-top' : ''}`.trim();
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
<meta name="theme-color" content="#023857">
<meta property="og:type" content="website"><meta property="og:locale" content="${site.locale}"><meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${ogImg}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(fullTitle)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${ogImg}">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${preload ? `<link rel="preload" as="image" href="/assets/img/${preload}-640.webp" media="(max-width: 700px)"><link rel="preload" as="image" href="/assets/img/${preload}-${(variants[preload] || [640, 1200]).at(-1)}.webp" media="(min-width: 701px)">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600&display=swap">
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

// Portada cinematográfica de página interna: fotografía a sangre + titular de marca
export const cover = ({ kicker: k, serif, caps, lead, img, alt, pos, short = false }) => `
<header class="cover${short ? ' cover--short' : ''}${img ? '' : ' cover--plain'}">
  ${img ? `<div class="cover__media">${pic(img, alt, { eager: true, pos })}</div>` : ''}
  <div class="wrap cover__in">
    ${kicker(k, 'k--light')}
    ${T(serif, caps, { tag: 'h1' })}
    ${lead ? `<p class="cover__lead" data-reveal>${lead}</p>` : ''}
  </div>
</header>`;

// Banda de cierre sobre fotografía
export const closer = ({ serif, caps, img, alt, pos, primary = ['Donar', '/dona'], secondary = ['Haz parte', '/participa'] }) => `
<section class="band${img ? '' : ' band--plain'}">
  ${img ? `<div class="band__media">${pic(img, alt, { pos })}</div>` : ''}
  <div class="wrap band__in">
    ${T(serif, caps)}
    <div class="band__act" data-reveal>${btn(primary[1], primary[0], 'btn--gold')}${secondary ? btn(secondary[1], secondary[0], 'btn--line') : ''}</div>
  </div>
</section>`;
