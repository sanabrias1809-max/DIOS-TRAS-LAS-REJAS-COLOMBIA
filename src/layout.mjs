import { site, waLink } from './config.mjs';
import { programs, TBD } from './content.mjs';

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const tbd = (label = TBD) => `<span class="tbd">${esc(label)}</span>`;

// Flecha única del sistema
export const arrow = '<svg class="arr" viewBox="0 0 28 12" aria-hidden="true"><path d="M0 6h26M21 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
export const play = '<svg class="play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
export const waIcon = `<svg class="wa-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg>`;

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
<meta name="theme-color" content="#08141c">
<meta property="og:type" content="website"><meta property="og:locale" content="${site.locale}"><meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${ogImg}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(fullTitle)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${ogImg}">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${preload ? `<link rel="preload" as="image" href="/assets/img/${preload}-640.webp" media="(max-width: 700px)"><link rel="preload" as="image" href="/assets/img/${preload}-${(variants[preload] || [640, 1200]).at(-1)}.webp" media="(min-width: 701px)">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap">
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
