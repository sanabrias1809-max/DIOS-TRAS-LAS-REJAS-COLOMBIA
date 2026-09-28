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

// Menú principal (con desplegables, como la referencia)
const nav = [
  ['/', 'Inicio'],
  ['/nuestra-historia', 'Nosotros', [['/nuestra-historia', 'Nuestra historia'], ['/nuestra-historia#manifiesto', 'Manifiesto'], ['/transparencia', 'Transparencia']]],
  ['/nuestro-trabajo', 'Nuestro trabajo', [['/programas', 'Todos los programas'], ...programs.map((p) => [`/programas/${p.slug}`, p.name]), ['/nuestro-trabajo#patio-2', 'Patio 2'], ['/nuestro-trabajo#reencuentros', 'Reencuentros familiares']]],
  ['/historias', 'Historias'],
  ['/participa', 'Participa', [['/participa#voluntariado', 'Voluntariado'], ['/participa#iglesias', 'Iglesias'], ['/participa#empresas', 'Empresas'], ['/participa#organizaciones', 'Organizaciones'], ['/participa#aliados', 'Aliados']]],
  ['/dona', 'Donaciones'],
  ['/contacto', 'Contacto'],
];
const chev = '<svg class="chev" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1.5 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const isCur = (path, h) => (h === '/' ? path === '/' : path.startsWith(h));

const header = (path) => `
<a class="skip" href="#main">Saltar al contenido</a>
<header class="nav" data-nav>
  <div class="nav__in">
    <a href="/" class="brand" aria-label="${site.name}, inicio">
      <img src="/assets/img/logo-mark.webp" alt="" width="58" height="47">
      <span class="brand__w"><small>Fundación</small>Dios Tras Las Rejas<em>Enviados a anunciar libertad · Colombia</em></span>
    </a>
    <nav aria-label="Principal" class="nav__links">
      <ul>
        ${nav
          .map(([h, t, sub]) =>
            sub
              ? `<li class="has-sub"><a href="${h}"${isCur(path, h) ? ' aria-current="page"' : ''}>${t}${chev}</a><ul class="sub">${sub.map(([sh, st]) => `<li><a href="${sh}">${st}</a></li>`).join('')}</ul></li>`
              : `<li><a href="${h}"${isCur(path, h) ? ' aria-current="page"' : ''}${h === '/dona' ? ' class="nav__give"' : ''}>${t}</a></li>`,
          )
          .join('')}
      </ul>
    </nav>
    <button class="nav__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu-open aria-label="Abrir menú"><i aria-hidden="true"></i></button>
  </div>
</header>
<div class="menu" id="menu" hidden data-drawer role="dialog" aria-modal="true" aria-label="Menú">
  <div class="menu__top">
    <a href="/" class="brand"><img src="/assets/img/logo-mark.webp" alt="" width="58" height="47"><span class="brand__w"><small>Fundación</small>Dios Tras Las Rejas<em>Enviados a anunciar libertad · Colombia</em></span></a>
    <button class="nav__menu is-x" type="button" data-menu-close aria-label="Cerrar menú"><i aria-hidden="true"></i></button>
  </div>
  <nav aria-label="Menú móvil" class="menu__nav">
    ${nav.map(([h, t, sub]) => `<a href="${h}">${t}</a>${sub ? `<div class="menu__sub">${sub.map(([sh, st]) => `<a href="${sh}">${st}</a>`).join('')}</div>` : ''}`).join('')}
  </nav>
  <a class="btn btn--gold menu__give" href="/dona"><span>Donar</span></a>
</div>`;

const socialIcons = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  facebook: '<path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  tiktok: '<path d="M14 3v12a4 4 0 1 1-4-4M14 3a5 5 0 0 0 5 5"/>',
};
const socials = () =>
  Object.entries(site.social)
    .filter(([, u]) => u)
    .map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${socialIcons[k]}</svg></a>`)
    .join('');

const footer = () => `
<footer class="foot">
  <div class="wrap foot__grid">
    <div class="foot__brand">
      <img src="/assets/img/logo-full-light-600.webp" alt="Fundación Dios Tras Las Rejas Colombia" width="190" height="178" loading="lazy">
      <div class="foot__social">${socials()}<a href="${waLink('Hola, quiero saber más sobre Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${waIcon}</a></div>
    </div>
    <div class="foot__contact">
      <h2>WhatsApp</h2><p><a href="${waLink('Hola, quiero saber más sobre Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener">${site.whatsappDisplay}</a></p>
      <h2>Dónde servimos</h2><p>Cárcel El Buen Pastor<br>Colombia</p>
      <h2>Correo electrónico</h2><p>${site.emails.map((e) => `<a href="mailto:${esc(e)}">${esc(e)}</a>`).join('<br>')}</p>
    </div>
    <div class="foot__sub">
      <h2 class="foot__subh">Suscríbete para recibir información de la Fundación</h2>
      <form class="subform" data-form="suscripcion" data-title="Suscripción a noticias" novalidate>
        <div class="field"><label for="sub-n">Nombre</label><input id="sub-n" name="nombre" autocomplete="name" required aria-required="true" aria-describedby="sub-ne"><p class="err" id="sub-ne" aria-live="polite"></p></div>
        <div class="field"><label for="sub-e">Email</label><input id="sub-e" name="email" type="email" autocomplete="email" required aria-required="true" aria-describedby="sub-ee"><p class="err" id="sub-ee" aria-live="polite"></p></div>
        <div class="hp" aria-hidden="true"><label>No llenar<input name="empresa_web" tabindex="-1" autocomplete="off"></label></div>
        <div class="field field--check"><input type="checkbox" id="c-sub" name="consentimiento" required aria-required="true" aria-describedby="c-sube"><label for="c-sub">Acepto la <a href="/transparencia#datos">política de datos</a></label><p class="err" id="c-sube" aria-live="polite"></p></div>
        <button class="btn btn--gold" type="submit"><span>Enviar</span></button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
  <div class="foot__legal"><p>Copyright ${new Date().getFullYear()} - ${site.legalName} · NIT ${esc(site.donate.bank.nit)} · <a href="/transparencia">Transparencia</a></p></div>
</footer>
<a class="totop" href="#main" aria-label="Volver arriba"><svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 6.5 5-5 5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a>
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500;600;700&family=Special+Elite&family=Roboto:wght@400;500;700&family=Instrument+Serif:ital@1&display=swap">
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

// Encabezado de página interna: foto a lo ancho, título fino centrado y separador con ícono
export const cover = ({ kicker: k, serif, caps, lead, img, alt, pos }) => `
<header class="pbanner">
  ${img ? `<figure class="pbanner__img">${pic(img, alt, { eager: true, pos })}</figure>` : '<div class="pbanner__space"></div>'}
  <div class="wrap pbanner__in">
    ${k ? `<p class="pbanner__k">${k}</p>` : ''}
    <h1 class="pbanner__h">${caps}</h1>
    ${serif ? `<p class="pbanner__s">${serif}</p>` : ''}
    ${lead ? `<p class="pbanner__lead">${lead}</p>` : ''}
  </div>
  <div class="divider" aria-hidden="true"><span>${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v18M7 8h10"/></svg>'}</span></div>
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
