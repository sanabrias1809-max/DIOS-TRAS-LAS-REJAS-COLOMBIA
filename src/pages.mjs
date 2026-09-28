import { site, waLink } from './config.mjs';
import { programs, ways, verse, stories, cycles, milestones, founders, allies, TBD } from './content.mjs';
import { page, cover, closer, T, kicker, more, btn, pic, frame, tbd, esc, arrow, play, ico } from './layout.mjs';

// ───────────────────────── Componentes ─────────────────────────

const chain = (light = false) => `
<p class="chain${light ? ' chain--light' : ''}" data-reveal aria-label="El camino: fe, formación, identidad, acompañamiento, propósito, libertad">
  ${['Fe', 'Formación', 'Identidad', 'Acompañamiento', 'Propósito', 'Libertad'].map((w, i, a) => `<span${i === a.length - 1 ? ' class="is-end"' : ''}>${w}</span>`).join('<i aria-hidden="true"></i>')}
</p>`;

// Programas como paneles fotográficos (acordeón en escritorio, carrusel en móvil)
const programStrip = () => `
<ol class="strip" data-strip>
  ${programs
    .map(
      (p) => `<li class="strip__i"><a href="/programas/${p.slug}">
      ${pic(p.hero, p.heroAlt, { sizes: '(min-width: 900px) 40vw, 82vw', pos: p.heroPos })}
      <span class="strip__n">${p.n}</span>
      <span class="strip__b">
        <span class="strip__w">${p.word}</span>
        <span class="strip__t">${p.name}</span>
        <span class="strip__d">${p.short}</span>
        <span class="strip__go">Conocer ${arrow}</span>
      </span>
    </a></li>`,
    )
    .join('')}
</ol>`;

// Filas de programas (páginas internas)
const pathRows = () => `
<ol class="rows">
  ${programs
    .map(
      (p) => `<li data-line><a href="/programas/${p.slug}" class="rows__a">
      <span class="rows__n">${p.n}</span>
      <span class="rows__img">${pic(p.hero, p.heroAlt, { sizes: '180px', pos: p.heroPos })}</span>
      <span class="rows__t">${p.name}</span>
      <span class="rows__d"><span class="rows__m">${p.principle} · ${p.word}</span>${p.short}</span>
      ${arrow}
    </a></li>`,
    )
    .join('')}
</ol>`;

// Hitos: cuando acompañar también significa transformar los espacios
const milestonesBlock = (n = '') => {
  const [patio, reen] = milestones;
  return `
<section class="deeds" aria-labelledby="deeds-h">
  <div class="wrap deeds__head">
    ${kicker(`${n}De acompañar a transformar`)}
    ${T('Cuando acompañar también significa', 'Transformar los espacios', { id: 'deeds-h' })}
    <p class="lede" data-reveal>No todo lo que transforma una vida ocurre dentro de un programa. A veces comienza con un lugar digno para encontrarse. Con un piso nuevo. Con una cuna. Con una familia que vuelve a abrazarse.</p>
  </div>
  <article class="deed" id="${patio.id}">
    <figure class="deed__img" data-reveal>${pic(patio.img, patio.alt, { sizes: '(min-width: 900px) 62vw, 100vw' })}</figure>
    <div class="deed__txt" data-reveal>
      <p class="deed__tag">${patio.tag}</p>
      <h3 class="deed__t">${patio.name}</h3>
      <p class="deed__l">${patio.line}</p>
      <p>${patio.text}</p>
    </div>
  </article>
  <article class="deed deed--dark" id="${reen.id}">
    <div class="wrap deed__in" data-reveal>
      <p class="deed__tag">${reen.tag}</p>
      <h3 class="deed__t">${reen.name}</h3>
      <p class="deed__l">${reen.line}</p>
      <p>${reen.text}</p>
    </div>
  </article>
  <div class="wrap">
    <blockquote class="deeds__q" data-split><p>Transformar un espacio también puede transformar la manera en que una familia se encuentra</p></blockquote>
  </div>
</section>`;
};

// Lucas 4:18 anotado
const verseMap = (n = '') => `
<section class="verse" aria-labelledby="verse-h">
  <div class="wrap">
    ${kicker(`${n}Nuestro fundamento`, 'k--light')}
    <h2 id="verse-h" class="verse__ref" data-split>${verse.ref}</h2>
    <ol class="verse__lines">
      ${verse.lines
        .map(
          (l) => `<li data-line>
        <p class="verse__t">${esc(l.t).replace('libertad', '<em>libertad</em>').replace('enviado', '<em>enviado</em>')}</p>
        <p class="verse__note">${l.link ? `<a href="/programas/${l.link}">${l.note}</a>` : l.note}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <p class="verse__notice">${verse.notice}</p>
  </div>
</section>`;

const waysIndex = () => `
<ul class="index">
  ${ways.map((w, i) => `<li data-line><a href="${w.href || `/participa#${w.id}`}"><span class="index__n">${String(i + 1).padStart(2, '0')}</span><span class="index__t">${w.t}</span><span class="index__d">${w.d}</span>${arrow}</a></li>`).join('')}
</ul>`;

// Formularios
let fid = 0;
const field = ({ name, label, type = 'text', required = true, auto = '', options, rows }) => {
  const id = `f${++fid}`;
  const req = required ? ' required aria-required="true"' : '';
  let input;
  if (options) input = `<select id="${id}" name="${name}"${req} aria-describedby="${id}e"><option value="">Selecciona</option>${options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  else if (rows) input = `<textarea id="${id}" name="${name}" rows="${rows}"${req} aria-describedby="${id}e" maxlength="2000"></textarea>`;
  else input = `<input id="${id}" name="${name}" type="${type}"${auto ? ` autocomplete="${auto}"` : ''}${req} aria-describedby="${id}e">`;
  return `<div class="field"><label for="${id}">${label}${required ? '' : ' <span>(opcional)</span>'}</label>${input}<p class="err" id="${id}e" aria-live="polite"></p></div>`;
};
const form = (kind, title, fields, submit) => `
<form class="form" data-form="${kind}" data-title="${esc(title)}" novalidate>
  ${fields.map(field).join('')}
  <div class="hp" aria-hidden="true"><label>No llenar<input name="empresa_web" tabindex="-1" autocomplete="off"></label></div>
  <div class="field field--check"><input type="checkbox" id="c-${kind}" name="consentimiento" required aria-required="true" aria-describedby="c-${kind}e"><label for="c-${kind}">Autorizo el tratamiento de mis datos para responder esta solicitud, según la <a href="/transparencia#datos">política de datos</a></label><p class="err" id="c-${kind}e" aria-live="polite"></p></div>
  <div class="form__foot">
    <button class="btn" type="submit"><span>${submit}</span>${arrow}</button>
    <p class="form__note">${site.formEndpoint ? 'Respondemos personalmente.' : 'Al enviar se abre WhatsApp con tu mensaje listo.'}</p>
  </div>
  <p class="form__status" role="status" aria-live="polite"></p>
</form>`;
const baseFields = [
  { name: 'nombre', label: 'Nombre completo', auto: 'name' },
  { name: 'email', label: 'Correo electrónico', type: 'email', auto: 'email' },
  { name: 'telefono', label: 'Teléfono o WhatsApp', type: 'tel', auto: 'tel', required: false },
];

const bank = site.donate.bank;
const bankLine = () => `<dl class="bank">
  <div><dt>Banco</dt><dd>${esc(bank.bank)}</dd></div>
  <div><dt>${esc(bank.type)}</dt><dd><span data-copy>${esc(bank.number)}</span> <button type="button" class="copy" data-copy-btn aria-label="Copiar número de cuenta">Copiar</button></dd></div>
  <div><dt>Titular</dt><dd>${esc(bank.holder)}</dd></div>
  <div><dt>NIT</dt><dd>${esc(bank.nit)}</dd></div>
</dl>`;

const donateForm = () => {
  const d = site.donate;
  return `
<form class="give" data-donate data-once="${esc(d.onceUrl)}" data-monthly="${esc(d.monthlyUrl)}" novalidate>
  <fieldset class="give__freq"><legend class="sr">Frecuencia del aporte</legend>
    <input type="radio" name="freq" id="fq1" value="única" checked><label for="fq1">Una vez</label>
    <input type="radio" name="freq" id="fq2" value="mensual"><label for="fq2">Cada mes</label>
  </fieldset>
  <fieldset class="give__amt"><legend>Monto en pesos colombianos</legend><div class="give__grid">
    ${[50000, 100000, 200000, 500000].map((v, i) => `<input type="radio" name="amount" id="a${v}" value="${v}"${i === 1 ? ' checked' : ''}><label for="a${v}">$${v.toLocaleString('es-CO')}</label>`).join('')}
    <input type="radio" name="amount" id="a-otro" value="otro"><label for="a-otro">Otro</label>
  </div></fieldset>
  <div class="field give__other" hidden><label for="am-custom">Escribe el monto</label><input id="am-custom" name="custom" inputmode="numeric" autocomplete="off" aria-describedby="am-err"><p class="err" id="am-err" aria-live="polite"></p></div>
  <button class="btn btn--gold" type="submit"><span>Aportar al siguiente ciclo</span>${arrow}</button>
  <p class="form__note">${d.onceUrl || d.monthlyUrl ? `Pago seguro a través de ${esc(d.providerName || 'nuestra pasarela de pagos')}.` : 'Coordinamos tu aporte contigo por WhatsApp, de forma personal y segura. También puedes transferir directamente a la cuenta de la fundación.'}</p>
</form>`;
};

// ───────────────────────── HOME ─────────────────────────

const tw = (a, b, id = '', tag = 'h2') => `<${tag}${id ? ` id="${id}"` : ''} class="tw">${a} <span>${b}</span></${tag}>`;
const col = ({ img, alt, pos, title, text, href, cta = 'Más información' }) => `
<li class="col" data-reveal>
  <figure class="col__img">${pic(img, alt, { sizes: '(min-width: 1100px) 20vw, (min-width: 700px) 45vw, 92vw', pos })}</figure>
  <h3 class="col__t">${title}</h3>
  <p class="col__p">${text}</p>
  <a class="btn btn--sm" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${cta}</a>
</li>`;

const home = () => ({
  path: '/',
  title: 'Dios Tras Las Rejas Colombia · Enviados a anunciar libertad',
  description: 'Acompañamos a mujeres privadas de la libertad en la Cárcel El Buen Pastor desde la fe, la formación y la preparación para volver a la vida en libertad. Lucas 4:18.',
  body: `
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__media" aria-hidden="true">
    <video autoplay loop muted playsinline preload="metadata" poster="/assets/img/hero-poster.webp" data-ambient><source src="/assets/video/hero.webm" type="video/webm"><source src="/assets/video/hero.mp4" type="video/mp4"></video>
  </div>
  <div class="wrap hero__in">
    <h1 id="hero-h" class="hero__h">Acompañamos a las mujeres de El Buen Pastor<br>en su camino hacia la libertad<br>desde la fe, la formación y la dignidad</h1>
    <div class="hero__act">
      <a class="btn" href="/participa#formulario">Quiero ser voluntario</a>
      <a class="btn" href="/programas">Conoce los programas</a>
      <a class="btn btn--gold" href="/dona">Donaciones</a>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="ruta-h">
  <div class="wrap">
    ${tw('Ruta de', 'acompañamiento', 'ruta-h')}
    <ul class="cols cols--5">
      ${programs.map((p) => col({ img: p.hero, alt: p.heroAlt, pos: p.heroPos, title: p.name, text: p.short + '.', href: `/programas/${p.slug}` })).join('')}
    </ul>
    <p class="note" data-reveal>${cycles.long}</p>
  </div>
</section>

<section class="sec sec--grey" aria-labelledby="transf-h">
  <div class="wrap">
    ${tw('De acompañar a', 'transformar', 'transf-h')}
    <div class="split">
      <figure class="split__img" data-reveal>${pic('obra-patio', milestones[0].alt, { sizes: '(min-width: 900px) 50vw, 100vw' })}<figcaption>Patio 2 · Realizado junto a God Behind Bars</figcaption></figure>
      <div class="split__txt" data-reveal>
        <h3 class="acc">${milestones[0].name}</h3>
        <p class="split__l">${milestones[0].line}. <strong>Realizado junto a God Behind Bars.</strong></p>
        <p>${milestones[0].text}</p>
        <h3 class="acc">${milestones[1].name}</h3>
        <p class="split__l">${milestones[1].tag}.</p>
        <p>${milestones[1].text}</p>
        <a class="btn btn--sm" href="/nuestro-trabajo#patio-2">Más información</a>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="hist-h">
  <div class="wrap">
    ${tw('Nuestra', 'historia', 'hist-h')}
    <div class="split split--rev">
      <figure class="split__img" data-reveal>${pic('oracion-acompanamiento', 'Dos mujeres de la fundación oran junto a una mujer sentada en una banca del patio.', { sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
      <div class="split__txt" data-reveal>
        <p class="big">Dios Tras Las Rejas nació de un encuentro.</p>
        <p>Lina y Liliana llegaron a El Buen Pastor y se encontraron con mujeres cuyas historias iban mucho más allá de una condena. Escucharon, conocieron sus vidas y descubrieron una comunidad llena de preguntas, capacidades, heridas, sueños, fe y ganas de seguir adelante. Y se enamoraron de ellas.</p>
        <blockquote class="bq"><p>“${founders.lina}”</p><footer>Lina, cofundadora</footer></blockquote>
        <blockquote class="bq"><p>“${founders.liliana}”</p><footer>Liliana, cofundadora</footer></blockquote>
        <a class="btn btn--sm" href="/nuestra-historia">Conoce nuestra historia</a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="lib-h">
  <div class="sec--dark__media" aria-hidden="true">${pic('capilla', '', { sizes: '100vw' })}</div>
  <div class="wrap sec--dark__in">
    ${tw('¿Qué significa ser', 'libre?', 'lib-h')}
    <ul class="checks">
      ${['Libre de la culpa que repite el peor día', 'Libre del miedo a lo que viene', 'Libre para volver a llamarse por su nombre', 'Libre para reconstruir lo que se rompió', 'Libre para volver a casa con un propósito'].map((t) => `<li data-reveal>${ico('check')}${t}</li>`).join('')}
    </ul>
    <p class="sec--dark__p" data-reveal>La libertad puede comenzar mucho antes de que una puerta se abra. Y también necesita un camino para llegar afuera. Acompañamos las dos.</p>
    <a class="btn btn--gold" href="/programas/regreso-a-la-libertad">Regreso a la libertad</a>
  </div>
</section>

<section class="sec" aria-labelledby="ayuda-h">
  <div class="wrap">
    ${tw('¿Cómo puedes', 'ayudar?', 'ayuda-h')}
    <ul class="cols cols--3">
      ${col({ img: 'taller-producto', alt: 'Pantuflas y prendas elaboradas en los talleres productivos.', title: 'Donaciones', text: 'Tu aporte hace posible el siguiente ciclo de acompañamiento: encuentros, formación, talleres y regreso a la libertad.', href: '/dona', cta: 'Donar' })}
      ${col({ img: 'oracion-noche', alt: 'Una mujer de la fundación ora de rodillas junto a otra mujer, de noche.', pos: '50% 35%', title: 'Voluntariado', text: 'Presencia, tiempo y fidelidad en visitas, discipulado, talleres o acompañamiento al salir.', href: '/participa#voluntariado', cta: 'Registro para voluntariado' })}
      ${col({ img: 'encuentro-institucional', alt: 'Mujeres de la fundación en un encuentro institucional.', pos: '50% 30%', title: 'Iglesias, empresas y aliados', text: 'Alianzas concretas que hacen posible el encuentro, como la transformación del Patio 2 junto a God Behind Bars.', href: '/participa#aliados', cta: 'Hacer una alianza' })}
    </ul>
  </div>
</section>

<section class="sec sec--grey" aria-labelledby="verso-h">
  <div class="wrap verso" data-reveal>
    ${tw('Nuestro', 'fundamento', 'verso-h')}
    <blockquote><p>“El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a sanar a los quebrantados de corazón; a pregonar libertad a los cautivos, y vista a los ciegos; a poner en libertad a los oprimidos.”</p><footer>Lucas 4:18 · Reina-Valera 1960</footer></blockquote>
  </div>
</section>

<section class="sec" aria-labelledby="don-h">
  <div class="wrap">
    ${tw('Haz posible', 'estar ahí', 'don-h')}
    <div class="donbox" data-reveal>
      <div>
        <p class="big">Tu aporte no rescata a nadie. Hace posible estar ahí.</p>
        <p>Sostiene los encuentros de acompañamiento, los materiales de formación, los insumos de los talleres productivos y el acompañamiento el día de la salida.</p>
        <div class="donbox__act"><a class="btn btn--gold" href="/dona">Donar en línea</a><a class="btn" href="${waLink('Hola, quiero donar a Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener">Donar por WhatsApp</a></div>
      </div>
      <div class="donbox__bank"><h3 class="acc">Transferencia bancaria</h3>${bankLine()}</div>
    </div>
  </div>
</section>`,
});

// ───────────────────────── Nuestra historia ─────────────────────────

const historia = () => ({
  path: '/nuestra-historia',
  title: 'Nuestra historia',
  description: 'Dios Tras Las Rejas nació de un encuentro: Lina y Liliana llegaron a El Buen Pastor y descubrieron mujeres cuyas historias iban mucho más allá de una condena.',
  crumbs: [['Nuestra historia', '/nuestra-historia']],
  preload: 'encuentro-ancho',
  body: `
${cover({ kicker: 'Nuestra historia', serif: 'Una historia que comenzó', caps: 'Detrás de unas rejas', lead: 'Dios Tras Las Rejas nació de un encuentro.', img: 'encuentro-ancho', alt: 'Dos mujeres de la fundación acompañan en oración a una mujer en el patio de la cárcel.' })}
<article class="wrap tale-o">
  <div class="tale-o__body">
    <p class="dropcap">Lina y Liliana llegaron a El Buen Pastor y se encontraron con mujeres cuyas historias iban mucho más allá de una condena. Escucharon, conocieron sus vidas y descubrieron una comunidad llena de preguntas, capacidades, heridas, sueños, fe y ganas de seguir adelante.</p>
    <p class="big">Y se enamoraron de ellas.</p>
    <p>No de una idea sobre ellas. De conocerlas. De escucharlas. De compartir con ellas. De descubrir todo lo que existe detrás de una historia que muchas veces la sociedad reduce a una palabra: <em>presa</em>.</p>
  </div>
  <blockquote class="pull" data-reveal><p>“${founders.lina}”</p><footer><span>Lina</span>Para Lina, aquel encuentro cambió la manera de mirar</footer></blockquote>
  <figure class="tale-o__img" data-reveal>${pic('oracion-acompanamiento', 'Dos mujeres de la fundación oran junto a una mujer sentada en una banca del patio.', { sizes: '(min-width: 900px) 40vw, 100vw' })}</figure>
  <blockquote class="pull pull--r" data-reveal><p>“${founders.liliana}”</p><footer><span>Liliana</span>Liliana lo vivió como una invitación a permanecer</footer></blockquote>
  <div class="tale-o__body">
    <p>Así comenzó a tomar forma Dios Tras Las Rejas. Una obra que entiende que la libertad puede comenzar mucho antes de que una puerta se abra: cuando una mujer vuelve a reconocer su identidad, descubre propósito, recupera capacidades, fortalece sus vínculos y empieza a imaginar nuevamente su futuro.</p>
    <p>Desde entonces, el trabajo ha crecido alrededor de una convicción: <strong>estar presentes</strong>. Acompañar. Escuchar. Formar. Restaurar. Caminar juntas.</p>
    <p class="big">Porque detrás de las rejas sigue habiendo vida. Y allí también está Dios.</p>
  </div>
</article>
<section class="arc">
  <div class="wrap">
    ${kicker('Cómo creció')}
    <ol class="arc__list">${['Encuentro', 'Vínculo', 'Misión', 'Acción', 'Transformación'].map((w, i) => `<li data-reveal><span>${String(i + 1).padStart(2, '0')}</span>${w}</li>`).join('')}</ol>
    <p class="lede" data-reveal>Con el tiempo, el trabajo fue creciendo y también las necesidades que encontraron en el camino. La misión empezó a traducirse en acciones concretas dentro de El Buen Pastor.</p>
  </div>
</section>
${milestonesBlock()}
<section class="wrap principles-s">
  ${kicker('Cómo actuamos')}
  <ol class="principles">
    <li data-line><strong>Acompañamos, no rescatamos</strong><span>La protagonista es ella y su proceso</span></li>
    <li data-line><strong>Escuchamos antes de hablar</strong><span>Y volvemos, aunque sea difícil</span></li>
    <li data-line><strong>Formamos para la vida</strong><span>No solo para el día de hoy</span></li>
    <li data-line><strong>Hablamos desde la fe</strong><span>Sin imponerla a nadie</span></li>
    <li data-line><strong>Cuidamos la dignidad</strong><span>Ninguna historia se usa sin consentimiento</span></li>
  </ol>
</section>
<section class="manifesto" id="manifiesto" aria-labelledby="man-h">
  <div class="wrap manifesto__in">
    ${kicker('Manifiesto', 'k--light')}
    <h2 id="man-h" class="sr">Manifiesto</h2>
    <div class="manifesto__txt">
      <p data-reveal>Hay lugares donde el tiempo se mide en días que no pasan. Donde una mujer deja de ser llamada por su nombre y empieza a ser llamada por su número, su delito, su pabellón.</p>
      <p data-reveal class="solo">Nosotros creemos otra cosa.</p>
      <p data-reveal>Creemos que Dios no se quedó en la puerta. Que ninguna reja es tan estrecha como para impedir la presencia, ni tan alta como para tapar el cielo. Creemos que la persona está antes que su condena, y que su historia no se detuvo el día de la sentencia.</p>
      <p data-reveal>Por eso vamos. No a rescatar, sino a acompañar. A sentarnos en la misma banca. A leer, lado a lado, una buena noticia. A enseñar un oficio. A orar cuando no hay palabras. A preparar el día en que la puerta se abra.</p>
      <p data-reveal class="solo">Fuimos enviados a anunciar libertad. <em>Y en este camino cabe más gente de la que imaginas.</em></p>
    </div>
  </div>
</section>
<section class="wrap allies">
  ${kicker('Aliados')}
  <ul>${allies.map((a) => `<li data-line><a href="${a.url}" target="_blank" rel="noopener"><strong>${a.name}</strong><span>${a.note}</span>${arrow}</a></li>`).join('')}</ul>
</section>
${closer({ serif: 'La historia sigue', caps: 'Escribiéndose', img: 'capilla', alt: 'Mujeres reunidas en la capilla de El Buen Pastor.' })}`,
});

// ───────────────────────── Nuestro trabajo / Programas ─────────────────────────

const trabajo = () => ({
  path: '/nuestro-trabajo',
  title: 'Nuestro trabajo',
  description: 'Cinco programas, un solo camino, y acciones concretas como la transformación del Patio 2 y los reencuentros familiares en El Buen Pastor.',
  crumbs: [['Nuestro trabajo', '/nuestro-trabajo']],
  preload: 'taller-costura',
  body: `
${cover({ kicker: 'Nuestro trabajo', serif: 'Un camino,', caps: 'No un evento', lead: 'Acompañar no es visitar una vez. Es caminar con cada mujer desde el primer encuentro hasta el día en que vuelve a casa, y un poco más allá.', img: 'taller-costura', alt: 'Mujeres en un taller productivo muestran las piezas que están elaborando.' })}
<section class="wrap programs-s">
  ${kicker('El recorrido')}
  ${chain()}
  ${pathRows()}
  <p class="cycles" data-reveal><strong>${cycles.short}.</strong> ${cycles.long}</p>
</section>
${milestonesBlock()}
${verseMap()}
${closer({ serif: 'Cada tramo', caps: 'Necesita manos', img: 'taller-producto', alt: 'Pantuflas y prendas elaboradas en los talleres productivos.', primary: ['Haz parte', '/participa'], secondary: ['Donar', '/dona'] })}`,
});

const programasIndex = () => ({
  path: '/programas',
  title: 'Programas',
  description: 'Nacer de Nuevo, La verdad de ser mujer, Discipulado uno a uno, Talleres productivos y Regreso a la libertad: los programas de Dios Tras Las Rejas Colombia.',
  crumbs: [['Programas', '/programas']],
  preload: 'capilla',
  body: `
${cover({ kicker: 'Programas', serif: 'Cinco programas,', caps: 'Una misma dirección', lead: 'Del primer encuentro con una buena noticia al día de la salida. Cada programa prepara el siguiente paso.', img: 'capilla', alt: 'Mujeres reunidas en la capilla de El Buen Pastor.', short: true })}
<section class="wrap programs-s">${chain()}${pathRows()}<p class="cycles" data-reveal><strong>${cycles.short}.</strong> ${cycles.long}</p></section>
${closer({ serif: '¿Quieres acompañar', caps: 'Uno de estos programas?', primary: ['Haz parte', '/participa'], secondary: ['Escríbenos', '/contacto'] })}`,
});

const facts = (p) => `
<dl class="facts">
  <div data-line><dt>Principio</dt><dd>${p.principle}</dd></div>
  <div data-line><dt>Lucas 4:18</dt><dd>${p.word}</dd></div>
  <div data-line><dt>Cómo se activa</dt><dd>${cycles.short}</dd></div>
  <div data-line><dt>Qué lo hace posible</dt><dd>Donantes, voluntariado, iglesias y aliados que sostienen cada ciclo</dd></div>
</dl>`;
const seeks = (p) => `<ol class="seeks">${p.seeks.map((s, i) => `<li data-line><span>${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>`;
const cols = (p, a = '01', b = '02') => `
<div class="wrap pg-cols">
  <div>${kicker(`${a} · Qué es`)}<p class="lede" data-reveal>${p.what}</p></div>
  <div>${kicker(`${b} · Qué buscamos`)}${seeks(p)}</div>
</div>`;

const programBody = {
  anuncio: (p) => `
<section class="pg">
  <div class="wrap"><p class="pg-s" data-split>${p.statement}</p></div>
  <figure class="bleed" data-reveal>${pic(p.img, p.alt)}</figure>
  ${cols(p)}
</section>`,
  identidad: (p) => `
<section class="pg">
  <div class="wrap pg-identidad">
    <div>${kicker('01 · Lo que una mujer es')}<p class="pg-s pg-s--m" data-reveal>${p.statement}</p>
      <figure class="pg-identidad__img" data-reveal>${pic(p.img, p.alt, { sizes: '(min-width: 900px) 36vw, 100vw' })}</figure></div>
    <ul class="words" aria-label="Lo que define a una mujer más allá de su condena">${p.words.map((w) => `<li data-line>${w}</li>`).join('')}</ul>
  </div>
  ${cols(p, '02', '03')}
</section>`,
  encuentro: (p) => `
<section class="pg">
  <div class="wrap pg-encuentro">
    <figure class="pg-encuentro__img" data-reveal>${pic(p.img, p.alt, { sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
    <div class="pg-encuentro__txt">
      ${kicker('01 · Uno a uno')}
      <p class="pg-s pg-s--m" data-reveal>${p.statement}</p>
      <p class="lede dropcap" data-reveal>${p.what}</p>
      <figure class="pg-encuentro__detail" data-reveal>${pic(p.detail, p.detailAlt, { sizes: '(min-width: 900px) 20vw, 50vw' })}</figure>
      ${kicker('02 · Qué buscamos')}${seeks(p)}
    </div>
  </div>
</section>`,
  oficio: (p) => `
<section class="pg">
  <div class="wrap">
    <p class="pg-s" data-split>${p.statement}</p>
    <ol class="craft">${p.steps.map(([t, d], i) => `<li data-line><span class="craft__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}</ol>
  </div>
  <div class="wrap pg-oficio">
    <figure data-reveal>${pic(p.img, p.alt, { sizes: '(min-width: 900px) 50vw, 100vw' })}<figcaption>Piezas elaboradas en los talleres</figcaption></figure>
    <div>${kicker('01 · Qué es')}<p class="lede" data-reveal>${p.what}</p>${kicker('02 · Qué buscamos')}${seeks(p)}</div>
  </div>
</section>`,
  regreso: (p) => `
<section class="pg">
  <div class="wrap">
    <p class="pg-s" data-split>${p.statement}</p>
    <ol class="stations">${p.stations.map(([t, d], i) => `<li data-reveal><span class="stations__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}</ol>
  </div>
  <figure class="bleed" data-reveal>${pic(p.img, p.alt)}</figure>
  ${cols(p)}
</section>`,
};

const programa = (p, i) => {
  const next = programs[(i + 1) % programs.length];
  return {
    path: `/programas/${p.slug}`,
    title: p.name,
    description: `${p.name}: ${p.short}. Programa de Dios Tras Las Rejas Colombia con mujeres privadas de la libertad en la Cárcel El Buen Pastor.`,
    crumbs: [['Programas', '/programas'], [p.name, `/programas/${p.slug}`]],
    preload: p.hero,
    body: `
${cover({ kicker: `Programa ${p.n} · ${p.word}`, serif: p.principle, caps: p.name, lead: p.lead, img: p.hero, alt: p.heroAlt, pos: p.heroPos })}
${programBody[p.layout](p)}
<section class="wrap pg-facts">${kicker('Cómo se vive')}${facts(p)}</section>
<nav class="nextp" aria-label="Siguiente programa"><a href="/programas/${next.slug}">
  <span class="nextp__media">${pic(next.hero, '', { sizes: '100vw', pos: next.heroPos })}</span>
  <span class="wrap nextp__in"><span class="k k--light">Siguiente tramo · ${next.n}</span><span class="nextp__t">${next.name}</span>${arrow}</span>
</a></nav>
${closer({ serif: `${p.name} es posible`, caps: 'Porque alguien decide estar', primary: ['Donar', '/dona'], secondary: ['Haz parte', '/participa'] })}`,
  };
};

// ───────────────────────── Historias ─────────────────────────

const published = stories.filter((s) => s.consent);

const historias = () => ({
  path: '/historias',
  title: 'Historias',
  description: 'Historias de mujeres que caminan procesos de fe, identidad y libertad, contadas con su consentimiento y a su propio ritmo.',
  crumbs: [['Historias', '/historias']],
  preload: 'oracion-noche',
  body: `
${cover({ kicker: 'Historias', serif: 'Escuchar, conocer,', caps: 'Reconocer, acompañar', lead: 'No contamos historias para mostrar lo que hicimos. Las contamos porque cada una nos enseñó a mirar a la persona antes que a su situación.', img: 'oracion-noche', alt: 'Una mujer de la fundación ora de rodillas junto a otra mujer, de noche.', pos: '50% 40%' })}
<section class="wrap archive">
  ${kicker('Archivo')}
  ${
    published.length
      ? `<ol class="archive__list">${published.map((s) => `<li><a href="/historias/${s.slug}"><figure>${pic(s.img, s.alt, { sizes: '(min-width: 900px) 30vw, 100vw' })}</figure><span class="archive__name">${esc(s.name)}</span><span class="archive__q">“${esc(s.quote)}”</span></a></li>`).join('')}</ol>`
      : `<div class="archive__empty">
    <figure data-reveal>${frame('Primera historia · por publicar')}</figure>
    <div data-reveal>
      <p class="big">Las primeras historias se publicarán aquí, en primera persona</p>
      <p>Cada historia puede incluir fotografía, texto, citas, audio y video. Se publica solo con autorización escrita de su protagonista, con su nombre o un seudónimo, como ella lo decida.</p>
    </div>
  </div>`
  }
</section>
<section class="voices voices--alt">
  <div class="wrap voices__grid">
    <figure class="voices__img" data-reveal>${pic('yo-soy-testimonio', 'Mujeres de la fundación con prendas de la campaña “Yo soy testimonio”.', { sizes: '(min-width: 900px) 42vw, 100vw' })}<figcaption>Campaña “Yo soy testimonio”</figcaption></figure>
    <div class="voices__txt">
      ${kicker('Cómo contamos')}
      <ol class="seeks">
        <li data-line><span>01</span>Escuchamos la historia completa antes de contar una parte</li>
        <li data-line><span>02</span>Ella decide qué se cuenta, cómo y cuándo</li>
        <li data-line><span>03</span>Nunca mostramos el dolor como espectáculo</li>
        <li data-line><span>04</span>La persona aparece antes que su situación jurídica</li>
      </ol>
    </div>
  </div>
</section>
${closer({ serif: '¿Tu historia', caps: 'Pasó por aquí?', primary: ['Compártela con nosotras', waLink('Hola, caminé con Dios Tras Las Rejas y quiero compartir mi historia.')], secondary: ['Contacto', '/contacto'] })}`,
});

const storyPage = (s, preview = false) => ({
  path: `/historias/${s.slug}`,
  title: s.name,
  description: s.quote,
  noindex: preview,
  crumbs: [['Historias', '/historias'], [s.name, `/historias/${s.slug}`]],
  body: `
<article class="story-p">
  ${cover({ kicker: `Historia · ${programs.find((p) => p.slug === s.program)?.name || 'Dios Tras Las Rejas'}`, serif: '', caps: esc(s.name), img: s.img, alt: s.alt })}
  <div class="wrap story-p__body">
    <blockquote class="pull"><p>“${esc(s.quote)}”</p></blockquote>
    ${s.body.map((b, i) => `<p${i === 0 ? ' class="dropcap"' : ''}>${esc(b)}</p>`).join('')}
    ${s.audio ? `<figure class="media"><figcaption>Escucha su voz</figcaption><audio controls preload="none" src="${esc(s.audio)}"></audio></figure>` : ''}
    ${s.video ? `<figure class="media"><video controls playsinline preload="none" src="${esc(s.video)}"></video></figure>` : ''}
  </div>
</article>
${closer({ serif: 'Su historia continúa', caps: '¿Cuál es tu lugar en ella?', primary: ['Encuentra tu lugar', '/participa'], secondary: ['Donar', '/dona'] })}`,
});
const previewStory = storyPage(
  { slug: 'plantilla', name: 'Nombre o seudónimo', quote: TBD, program: 'regreso-a-la-libertad', img: null, body: [`${TBD} Esta es la plantilla de una historia individual: fotografía a sangre, cita en sus propias palabras, narrativa y, cuando existan, audio y video.`] },
  true,
);

// ───────────────────────── Participa ─────────────────────────

const participa = () => ({
  path: '/participa',
  title: 'Participa',
  description: 'Voluntariado, iglesias, empresas, organizaciones, profesionales y aliados: hay muchas maneras de ser parte del acompañamiento a mujeres privadas de la libertad.',
  crumbs: [['Participa', '/participa']],
  preload: 'oracion-acompanamiento',
  body: `
${cover({ kicker: 'Participa', serif: 'Hay muchas maneras', caps: 'De ser enviado', lead: 'No todos entran a la cárcel. Pero todos pueden hacer que alguien entre, que alguien aprenda, que alguien encuentre una puerta abierta al salir.', img: 'oracion-acompanamiento', alt: 'Dos mujeres de la fundación oran junto a una mujer en una banca del patio.', pos: '50% 45%' })}
<section class="wrap paths">
  ${ways
    .map(
      (w, i) => `<article class="paths__i" id="${w.id}" data-line>
    <span class="paths__n">${String(i + 1).padStart(2, '0')}</span>
    <h2 class="paths__t">${w.t}</h2>
    <p>${w.d}</p>
    <div>${w.href ? more(w.href, w.cta) : `<a class="more" href="#formulario" data-prefill="${esc(w.t)}"><span>${w.cta}</span>${arrow}</a>`}</div>
  </article>`,
    )
    .join('')}
</section>
<section class="allies-s">
  <div class="wrap allies-s__grid">
    <figure data-reveal>${pic('encuentro-institucional', 'Mujeres de la fundación en un encuentro institucional.', { sizes: '(min-width: 900px) 34vw, 100vw' })}</figure>
    <div>
      ${kicker('Aliados')}
      ${T('Lo que solos no podríamos', 'Lo hacemos juntos')}
      <p class="lede" data-reveal>La transformación del Patio 2 se realizó junto a God Behind Bars. Así imaginamos cada alianza: una acción concreta que hace posible el encuentro.</p>
      <ul class="allies">${allies.map((a) => `<li data-line><a href="${a.url}" target="_blank" rel="noopener"><strong>${a.name}</strong><span>${a.note}</span>${arrow}</a></li>`).join('')}</ul>
    </div>
  </div>
</section>
<section class="formsec" id="formulario" aria-labelledby="fp-h">
  <div class="wrap formsec__grid">
    <div>
      ${kicker('Da el primer paso')}
      ${T('Cuéntanos', 'Quién eres', { id: 'fp-h' })}
      <p class="lede" data-reveal>Te respondemos personalmente para conocerte y encontrar juntos el lugar donde tu aporte tiene más sentido.</p>
      <p class="small" data-reveal>El ingreso a un establecimiento penitenciario requiere procesos de autorización. Te acompañamos en ellos.</p>
    </div>
    ${form('participa', 'Quiero participar', [...baseFields, { name: 'ciudad', label: 'Ciudad', auto: 'address-level2' }, { name: 'forma', label: '¿Cómo te gustaría participar?', options: ways.filter((w) => w.id !== 'donar').map((w) => w.t).concat('Otra forma') }, { name: 'mensaje', label: 'Cuéntanos un poco de ti', rows: 3 }], 'Enviar')}
  </div>
</section>`,
});

// ───────────────────────── Dona ─────────────────────────

const dona = () => ({
  path: '/dona',
  title: 'Donar',
  description: 'Tu aporte hace posible el siguiente ciclo de acompañamiento a mujeres privadas de la libertad. Donación única, mensual o transferencia a Davivienda.',
  crumbs: [['Donar', '/dona']],
  bodyClass: 'is-dark-top',
  body: `
<section class="give-sec give-sec--page">
  <div class="wrap give-sec__grid">
    <div class="give-sec__txt">
      ${kicker('Donar', 'k--light')}
      ${T('Hacer posible', 'Que alguien esté ahí', { tag: 'h1' })}
      <p class="lede" data-reveal>No te pedimos que salves a nadie. Te invitamos a sostener la presencia: el encuentro, el material de formación, el insumo del taller, el acompañamiento el día de la salida.</p>
      <dl class="facts facts--light" data-reveal>
        <div data-line><dt>Qué haces</dt><dd>Sostienes un acompañamiento continuo, que es lo que permite un proceso real</dd></div>
        <div data-line><dt>Por qué importa</dt><dd>${cycles.long}</dd></div>
        <div data-line><dt>Cómo lo cuidamos</dt><dd>Publicamos nuestra información institucional en <a href="/transparencia">Transparencia</a></dd></div>
      </dl>
    </div>
    <div class="give-sec__form" data-reveal>
      ${donateForm()}
      <div class="give-sec__bank"><p class="k k--light">Transferencia bancaria</p>${bankLine()}
        ${more(waLink('Hola, hice una donación por transferencia a Dios Tras Las Rejas Colombia. Adjunto el comprobante.'), 'Enviar comprobante por WhatsApp')}</div>
    </div>
  </div>
</section>
<section class="wrap paths">
  ${kicker('Otras formas de apoyar')}
  <article class="paths__i" data-line><span class="paths__n">01</span><h2 class="paths__t">Aportes en especie</h2><p>Materiales para talleres, Biblias, útiles de formación. Escríbenos antes: te contamos qué se necesita en este momento y qué puede ingresar al establecimiento.</p>
    <div>${more(waLink('Hola, quiero hacer un aporte en especie. ¿Qué necesitan en este momento?'), 'Consultar necesidades')}</div></article>
  <article class="paths__i" data-line><span class="paths__n">02</span><h2 class="paths__t">Empresas e iglesias</h2><p>Aportes institucionales o el patrocinio de un ciclo completo de un programa, con un acuerdo claro y un informe de lo que se hizo posible.</p>
    <div>${more('/participa#formulario', 'Hablemos')}</div></article>
  <article class="paths__i" data-line><span class="paths__n">03</span><h2 class="paths__t">Proyectos de espacios</h2><p>Como la transformación del Patio 2: intervenciones concretas que crean lugares dignos para el encuentro de las mujeres con sus familias.</p>
    <div>${more('/nuestro-trabajo#patio-2', 'Ver el Patio 2')}</div></article>
  <p class="small">Certificado de donación: ${tbd('[CONTENIDO POR DEFINIR: confirmar si la fundación emite certificados tributarios]')}</p>
</section>`,
});

// ───────────────────────── Contacto / Transparencia / 404 ─────────────────────────

const contacto = () => ({
  path: '/contacto',
  title: 'Contacto',
  description: 'Escríbenos por WhatsApp, por correo o por el formulario. Conversemos sobre cómo acompañar a mujeres privadas de la libertad con Dios Tras Las Rejas Colombia.',
  crumbs: [['Contacto', '/contacto']],
  body: `
<section class="formsec formsec--page">
  <div class="wrap formsec__grid">
    <div>
      ${kicker('Contacto')}
      ${T('Una pregunta, una idea,', 'Conversemos', { tag: 'h1' })}
      <p class="lede" data-reveal>Una historia, una alianza. Te respondemos personalmente.</p>
      <dl class="facts" data-reveal>
        <div data-line><dt>WhatsApp</dt><dd><a href="${waLink('Hola, quiero comunicarme con Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener">${site.whatsappDisplay}</a></dd></div>
        <div data-line><dt>Correo</dt><dd>${site.emails.map((e) => `<a href="mailto:${esc(e)}">${esc(e)}</a>`).join('<br>')}</dd></div>
        <div data-line><dt>Redes</dt><dd>${Object.entries(site.social).filter(([, u]) => u).map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`).join(' · ') || tbd()}</dd></div>
        <div data-line><dt>Dónde servimos</dt><dd>Cárcel El Buen Pastor, Colombia</dd></div>
        <div data-line><dt>Razón social</dt><dd>${site.legalName} · NIT ${esc(bank.nit)}</dd></div>
      </dl>
    </div>
    ${form('contacto', 'Contacto desde la web', [...baseFields, { name: 'asunto', label: 'Asunto', options: ['Quiero donar', 'Quiero participar', 'Alianza o empresa', 'Iglesia', 'Prensa', 'Otro'] }, { name: 'mensaje', label: 'Mensaje', rows: 4 }], 'Enviar mensaje')}
  </div>
</section>`,
});

const transparencia = () => ({
  path: '/transparencia',
  title: 'Transparencia',
  description: 'Información institucional, NIT, cuenta oficial, informes, documentos, proyectos y política de tratamiento de datos de la Fundación Dios Tras Las Rejas Colombia.',
  crumbs: [['Transparencia', '/transparencia']],
  body: `
${cover({ kicker: 'Transparencia', serif: 'La confianza también', caps: 'Se acompaña', lead: 'Publicamos aquí la información de la fundación a medida que está disponible.', short: true })}
<section class="wrap longform">
  <aside class="longform__side">${kicker('01 · Información institucional')}</aside>
  <dl class="longform__body facts">
    <div data-line><dt>Razón social</dt><dd>${site.legalName}</dd></div>
    <div data-line><dt>NIT</dt><dd>${esc(bank.nit)}</dd></div>
    <div data-line><dt>Cuenta oficial</dt><dd>${esc(bank.bank)} · ${esc(bank.type)} ${esc(bank.number)}</dd></div>
    <div data-line><dt>Correo</dt><dd>${site.emails.map((e) => `<a href="mailto:${esc(e)}">${esc(e)}</a>`).join('<br>')}</dd></div>
    <div data-line><dt>Representante legal</dt><dd>${tbd()}</dd></div>
    <div data-line><dt>Domicilio</dt><dd>${tbd()}</dd></div>
  </dl>
  <aside class="longform__side">${kicker('02 · Proyectos')}</aside>
  <div class="longform__body">
    <figure class="project" data-reveal>${pic('obra-patio', milestones[0].alt, { sizes: '(min-width: 900px) 60vw, 100vw' })}<figcaption><strong>Patio 2</strong> · ${milestones[0].tag}. ${milestones[0].text}</figcaption></figure>
    <p><strong>Reencuentros familiares.</strong> ${milestones[1].text}</p>
  </div>
  <aside class="longform__side">${kicker('03 · Informes')}</aside>
  <ul class="longform__body docs">${['Informe de gestión anual', 'Estados financieros'].map((d) => `<li data-line><span>${d}</span>${tbd('Por publicar')}</li>`).join('')}</ul>
  <aside class="longform__side">${kicker('04 · Documentos')}</aside>
  <ul class="longform__body docs">${['Certificado de existencia y representación legal', 'Estatutos', 'Registro como entidad sin ánimo de lucro (ESAL)'].map((d) => `<li data-line><span>${d}</span>${tbd('Por publicar')}</li>`).join('')}</ul>
  <aside class="longform__side">${kicker('05 · Resultados')}</aside>
  <div class="longform__body"><p>${tbd('[CONTENIDO POR DEFINIR: resultados verificables del acompañamiento]')}</p></div>
  <aside class="longform__side" id="datos">${kicker('06 · Datos personales')}</aside>
  <div class="longform__body">
    <p>Los datos que compartes en los formularios de este sitio se usan únicamente para responder tu solicitud y coordinar tu participación o donación. No los vendemos ni los compartimos con terceros con fines comerciales. Puedes pedir en cualquier momento que los consultemos, corrijamos o eliminemos escribiéndonos por WhatsApp o a ${esc(site.email)}, conforme a la Ley 1581 de 2012.</p>
    <p class="small">Política completa de tratamiento de datos: ${tbd()}</p>
  </div>
  <aside class="longform__side">${kicker('07 · Imágenes e historias')}</aside>
  <div class="longform__body"><p>Toda fotografía o historia de una mujer acompañada se publica con su autorización. Si ves una imagen que debe retirarse, escríbenos y la retiramos.</p><p class="small">${verse.notice}</p></div>
</section>`,
});

const notFound = () => ({
  path: '/404',
  title: 'Página no encontrada',
  description: 'La página que buscas no existe.',
  noindex: true,
  body: `
${cover({ kicker: '404', serif: 'Esta puerta', caps: 'No lleva a ningún lugar', lead: 'Pero la historia continúa en otra parte.', short: true })}
<div class="wrap nf">${btn('/', 'Volver al inicio')}${more('/contacto', 'Contacto')}</div>`,
});

export const pages = [home(), historia(), trabajo(), programasIndex(), ...programs.map(programa), historias(), ...published.map((s) => storyPage(s)), previewStory, participa(), dona(), contacto(), transparencia(), notFound()];
export const render = (p) => page(p);
