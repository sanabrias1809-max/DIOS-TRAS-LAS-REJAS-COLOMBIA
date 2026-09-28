import { site, waLink } from './config.mjs';
import { programs, ways, verse, stories, TBD } from './content.mjs';
import { page, opener, closer, rh, more, pic, frame, tbd, esc, arrow } from './layout.mjs';

// ───────────────────────── Piezas del sistema ─────────────────────────

// Recorrido de programas: filas separadas por líneas, nombre en serif.
const pathRows = (items = programs) => `
<ol class="rows">
  ${items
    .map(
      (p) => `<li data-line><a href="/programas/${p.slug}" class="rows__a">
      <span class="rows__n">${p.n}</span>
      <span class="rows__t">${p.name}</span>
      <span class="rows__m">${p.principle} · ${p.word}</span>
      <span class="rows__d">${p.short}</span>
      ${arrow}
    </a></li>`,
    )
    .join('')}
</ol>`;

// Cadena narrativa del camino
const chain = () => `
<p class="chain" data-reveal aria-label="El camino: fe, formación, identidad, acompañamiento, propósito, libertad">
  ${['Fe', 'Formación', 'Identidad', 'Acompañamiento', 'Propósito', 'Libertad'].map((w, i, a) => `<span${i === a.length - 1 ? ' class="is-end"' : ''}>${w}</span>`).join('<i aria-hidden="true"></i>')}
</p>`;

// Lucas 4:18 anotado: el versículo como mapa del trabajo
const verseMap = (n = '07', label = 'Nuestro fundamento') => `
<section class="verse" aria-labelledby="verse-h">
  <div class="wrap">
    ${rh(n, label)}
    <h2 id="verse-h" class="verse__ref" data-reveal>${verse.ref}</h2>
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

// Formulario con líneas (sin cajas)
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

const donateForm = () => {
  const d = site.donate;
  return `
<form class="give" data-donate data-once="${esc(d.onceUrl)}" data-monthly="${esc(d.monthlyUrl)}" novalidate>
  <fieldset class="give__freq"><legend class="sr">Frecuencia del aporte</legend>
    <input type="radio" name="freq" id="fq1" value="única" checked><label for="fq1">Una vez</label>
    <input type="radio" name="freq" id="fq2" value="mensual"><label for="fq2">Cada mes</label>
  </fieldset>
  <fieldset class="give__amt"><legend>Monto en pesos colombianos</legend>
    ${[50000, 100000, 200000, 500000].map((v, i) => `<input type="radio" name="amount" id="a${v}" value="${v}"${i === 1 ? ' checked' : ''}><label for="a${v}">${v.toLocaleString('es-CO')}</label>`).join('')}
    <input type="radio" name="amount" id="a-otro" value="otro"><label for="a-otro">Otro</label>
  </fieldset>
  <div class="field give__other" hidden><label for="am-custom">Escribe el monto</label><input id="am-custom" name="custom" inputmode="numeric" autocomplete="off" aria-describedby="am-err"><p class="err" id="am-err" aria-live="polite"></p></div>
  <button class="btn btn--gold" type="submit"><span>Hacer posible el acompañamiento</span>${arrow}</button>
  <p class="form__note">${d.onceUrl || d.monthlyUrl ? `Pago seguro a través de ${esc(d.providerName || 'nuestra pasarela de pagos')}.` : 'Mientras habilitamos el pago en línea, coordinamos tu aporte contigo por WhatsApp, de forma personal y segura.'}</p>
</form>`;
};

// ───────────────────────── HOME ─────────────────────────

const home = () => ({
  path: '/',
  title: 'Dios Tras Las Rejas Colombia · Enviados a anunciar libertad',
  description: 'Acompañamos a mujeres privadas de la libertad en la Cárcel El Buen Pastor desde la fe, la formación y la preparación para volver a la vida en libertad. Lucas 4:18.',
  bodyClass: 'is-home',
  body: `
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__grid">
    <p class="hero__meta"><span>Fundación cristiana</span><span>Cárcel El Buen Pastor</span><span>Colombia</span></p>
    <h1 id="hero-h" class="hero__h"><span class="l">Enviados</span><span class="l">a anunciar</span><em class="l">libertad</em></h1>
    <div class="hero__txt">
      <p>Acompañamos a mujeres privadas de la libertad desde la fe, la formación y la preparación para volver a la vida en libertad.</p>
      <div class="hero__act">
        <a class="btn" href="/nuestro-trabajo"><span>Conoce el camino</span>${arrow}</a>
        ${more('/dona', 'Donar')}
      </div>
    </div>
    <figure class="hero__img">
      ${pic('oracion-acompanamiento', 'Dos mujeres de la fundación oran junto a una mujer sentada en una banca del patio de la cárcel El Buen Pastor.', { eager: true, sizes: '(min-width: 900px) 42vw, 100vw' })}
      <figcaption>Un encuentro de oración en el patio · El Buen Pastor</figcaption>
    </figure>
    <p class="hero__verse">Lucas 4:18</p>
  </div>
</section>

<section class="truth" aria-label="Una verdad">
  <div class="wrap">
    ${rh('01', 'Una verdad')}
    <p class="truth__p" data-split>Una reja puede limitar un espacio <em>No puede encerrar a Dios, ni una historia, ni un nombre</em></p>
  </div>
</section>

<section class="story" aria-labelledby="story-h">
  <div class="wrap story__grid">
    ${rh('02', 'Nuestra historia')}
    <div class="story__head">
      <h2 id="story-h" class="d2" data-reveal>Vamos donde la esperanza <em>necesita presencia</em></h2>
      <figure class="story__detail" data-reveal>${pic('detalle-manos', 'Detalle de manos que sostienen hojas y una Biblia durante un encuentro.', { sizes: '(min-width: 900px) 22vw, 60vw' })}</figure>
    </div>
    <ol class="chapters">
      <li data-line><h3>Quiénes somos</h3><p>Una fundación cristiana que acompaña a mujeres privadas de la libertad en la Cárcel El Buen Pastor.</p></li>
      <li data-line><h3>Por qué existimos</h3><p>Porque fuimos enviados. No nacimos de una estrategia, sino de un llamado a ir donde la esperanza necesita hacerse presente.</p></li>
      <li data-line><h3>Qué creemos</h3><p>Que la persona está antes que su condena. Que cada mujer tiene un nombre, una historia, capacidades, heridas, fe y futuro.</p></li>
      <li data-line><h3>Qué significa acompañar</h3><p>Escuchar antes de hablar, leer la Palabra lado a lado, formar, orar y volver. La protagonista es ella y su proceso.</p></li>
    </ol>
    <div class="story__more">${more('/nuestra-historia', 'Nuestra historia completa')}</div>
  </div>
</section>

<section class="place" aria-labelledby="place-h">
  <div class="wrap">${rh('03', 'El Buen Pastor')}</div>
  <figure class="place__film" data-reveal>
    <video autoplay loop muted playsinline preload="metadata" poster="/assets/img/hero-poster.webp" data-ambient aria-hidden="true">
      <source src="/assets/video/hero.webm" type="video/webm"><source src="/assets/video/hero.mp4" type="video/mp4">
    </video>
    <button class="place__play" type="button" data-video-open><span>Ver el video</span>${arrow}</button>
  </figure>
  <div class="wrap place__grid">
    <h2 id="place-h" class="d2" data-reveal>El lugar donde <em>ocurre el encuentro</em></h2>
    <div class="place__txt" data-reveal>
      <p>Corredores, patios, muros y bancas. No mostramos la cárcel para impresionar. La mostramos porque es el lugar donde nos encontramos con cada mujer.</p>
      <p>Aquí la arquitectura limita el espacio. La presencia, no.</p>
    </div>
  </div>
</section>

<div class="modal" hidden data-video-modal role="dialog" aria-modal="true" aria-label="Video: corredor de la cárcel El Buen Pastor">
  <div class="modal__bg" data-video-close></div>
  <div class="modal__box">
    <button class="modal__close" type="button" data-video-close>Cerrar</button>
    <video controls playsinline preload="none" poster="/assets/img/hero-poster.webp" data-modal-video><source src="/assets/video/hero.mp4" type="video/mp4"><source src="/assets/video/hero.webm" type="video/webm"></video>
  </div>
</div>

<section class="work" aria-labelledby="work-h">
  <div class="wrap">
    ${rh('04', 'Nuestro trabajo')}
    <div class="work__head">
      <h2 id="work-h" class="d2" data-reveal>Cinco programas <em>Un solo camino</em></h2>
      <p class="lede" data-reveal>Cada programa es un tramo del mismo recorrido. Nadie avanza sola y nadie avanza igual.</p>
    </div>
    ${chain()}
    ${pathRows()}
  </div>
</section>

<section class="stories" aria-labelledby="stories-h">
  <div class="wrap stories__grid">
    ${rh('05', 'Historias')}
    <figure class="stories__img" data-reveal>
      ${pic('yo-soy-testimonio', 'Tres mujeres de la fundación sonríen con prendas de la campaña “Yo soy testimonio”, con la ciudad al fondo.', { sizes: '(min-width: 900px) 45vw, 100vw' })}
      <figcaption>Campaña “Yo soy testimonio”</figcaption>
    </figure>
    <div class="stories__txt">
      <h2 id="stories-h" class="d2" data-reveal>Escuchar antes <em>de contar</em></h2>
      <p class="lede" data-reveal>Contamos historias porque escucharlas nos cambió la mirada. Cada una se publica con el consentimiento de su protagonista y a su propio ritmo.</p>
      <ol class="steps" data-reveal><li>Escuchar</li><li>Conocer</li><li>Reconocer</li><li>Acompañar</li></ol>
      ${more('/historias', 'Leer historias')}
    </div>
  </div>
</section>

<section class="free" aria-labelledby="free-h">
  <div class="free__word" aria-hidden="true"><span data-drift>Libertad</span></div>
  <div class="wrap free__grid">
    ${rh('06', 'Libertad', 'rh--light')}
    <h2 id="free-h" class="free__q" data-split>¿Qué significa <em>realmente ser libre?</em></h2>
    <ol class="free__list">
      <li data-line><span>i</span>Libre de la culpa que repite el peor día</li>
      <li data-line><span>ii</span>Libre del miedo a lo que viene</li>
      <li data-line><span>iii</span>Libre para volver a llamarse por su nombre</li>
      <li data-line><span>iv</span>Libre para reconstruir lo que se rompió</li>
      <li data-line><span>v</span>Libre para volver a casa con un propósito</li>
    </ol>
    <figure class="free__img" data-reveal>${pic('muro-cielo', 'Muro de la cárcel bajo un cielo abierto, en blanco y negro.', { sizes: '(min-width: 900px) 40vw, 100vw' })}</figure>
    <div class="free__close" data-reveal>
      <p>Hay una libertad que empieza adentro, mucho antes de que se abra la puerta. Y hay otra que necesita un camino para llegar afuera. <em>Acompañamos las dos.</em></p>
      ${more('/programas/regreso-a-la-libertad', 'Regreso a la libertad')}
    </div>
  </div>
</section>

${verseMap('07')}

<section class="join" aria-labelledby="join-h">
  <div class="wrap join__grid">
    ${rh('08', 'Participa')}
    <h2 id="join-h" class="d2" data-reveal>Hay muchas maneras <em>de ser enviado</em></h2>
    <p class="lede join__lede" data-reveal>Nadie acompaña solo. Detrás de cada encuentro hay personas que oran, que dan, que enseñan un oficio o que abren una puerta afuera.</p>
    <ul class="index">
      ${ways.map((w, i) => `<li data-line><a href="${w.href || `/participa#${w.id}`}"><span class="index__n">${String(i + 1).padStart(2, '0')}</span><span class="index__t">${w.t}</span><span class="index__d">${w.d}</span>${arrow}</a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="donate" aria-labelledby="donate-h">
  <div class="wrap donate__grid">
    ${rh('09', 'Donar')}
    <div class="donate__txt">
      <h2 id="donate-h" class="d2" data-reveal>Tu aporte no rescata a nadie <em>Hace posible estar ahí</em></h2>
      <ul class="plain" data-reveal>
        <li>Encuentros de acompañamiento y discipulado</li>
        <li>Materiales de formación</li>
        <li>Insumos para los talleres productivos</li>
        <li>Acompañamiento en el regreso a la libertad</li>
      </ul>
      <p class="small" data-reveal>Publicamos nuestra información institucional en <a href="/transparencia">Transparencia</a>.</p>
    </div>
    <div data-reveal>${donateForm()}</div>
  </div>
</section>

<section class="end" aria-labelledby="end-h">
  <div class="wrap">
    ${rh('10', 'La historia continúa')}
    <h2 id="end-h" class="end__h" data-split>¿Cuál puede ser <em>tu lugar</em> en esta historia?</h2>
    <div class="end__act" data-reveal>
      <a class="btn" href="/participa"><span>Encuentra tu lugar</span>${arrow}</a>
      ${more(waLink('Hola, quiero conocer más sobre Dios Tras Las Rejas Colombia.'), 'Conversemos por WhatsApp', true)}
    </div>
  </div>
</section>`,
});

// ───────────────────────── Nuestra historia ─────────────────────────

const historia = () => ({
  path: '/nuestra-historia',
  title: 'Nuestra historia',
  description: 'Por qué existe Dios Tras Las Rejas Colombia: un envío a acompañar a mujeres privadas de la libertad desde la fe, la dignidad y la esperanza.',
  crumbs: [['Nuestra historia', '/nuestra-historia']],
  body: `
${opener({ n: '—', label: 'Nuestra historia', title: 'No nacimos de una idea <em>Nacimos de un envío</em>', lead: 'Dios Tras Las Rejas Colombia existe porque alguien escuchó un llamado a entrar donde pocos entran y a quedarse el tiempo suficiente.', img: 'encuentro-ancho', alt: 'Dos mujeres de la fundación acompañan en oración a una mujer en el patio de la cárcel.' })}
<section class="wrap longform">
  <aside class="longform__side">${rh('01', 'Cómo empezó')}</aside>
  <div class="longform__body" data-reveal><p>${tbd('[CONTENIDO POR DEFINIR: año de inicio, fundadoras y fundadores, primera visita a El Buen Pastor y cómo se formó el equipo]')}</p></div>
  <aside class="longform__side">${rh('02', 'Lo que creemos')}</aside>
  <div class="longform__body" data-reveal>
    <p class="big">Creemos que Dios no se quedó afuera de la cárcel</p>
    <p>Creemos que una mujer es mucho más que la sentencia que la trajo aquí: tiene un nombre, una historia, heridas, fe, capacidades y un futuro. Creemos que la libertad empieza adentro y que también necesita un camino para llegar afuera.</p>
  </div>
  <aside class="longform__side">${rh('03', 'Cómo actuamos')}</aside>
  <ol class="longform__body principles" data-reveal>
    <li data-line><strong>Acompañamos, no rescatamos</strong><span>La protagonista es ella y su proceso</span></li>
    <li data-line><strong>Escuchamos antes de hablar</strong><span>Y volvemos, aunque sea difícil</span></li>
    <li data-line><strong>Formamos para la vida</strong><span>No solo para el día de hoy</span></li>
    <li data-line><strong>Hablamos desde la fe</strong><span>Sin imponerla a nadie</span></li>
    <li data-line><strong>Cuidamos la dignidad</strong><span>Ninguna historia se usa sin consentimiento</span></li>
  </ol>
</section>
<section class="manifesto" aria-labelledby="man-h">
  <div class="wrap manifesto__grid">
    ${rh('04', 'Manifiesto', 'rh--light')}
    <h2 id="man-h" class="sr">Manifiesto</h2>
    <div class="manifesto__txt">
      <p data-reveal>Hay lugares donde el tiempo se mide en días que no pasan. Donde una mujer deja de ser llamada por su nombre y empieza a ser llamada por su número, su delito, su pabellón.</p>
      <p data-reveal class="solo">Nosotros creemos otra cosa.</p>
      <p data-reveal>Creemos que Dios no se quedó en la puerta. Que ninguna reja es tan estrecha como para impedir la presencia, ni tan alta como para tapar el cielo. Creemos que la persona está antes que su condena, y que su historia no se detuvo el día de la sentencia.</p>
      <p data-reveal>Por eso vamos. No a rescatar, sino a acompañar. A sentarnos en la misma banca. A leer, lado a lado, una buena noticia. A enseñar un oficio. A orar cuando no hay palabras. A preparar el día en que la puerta se abra.</p>
      <p data-reveal>Para nosotros, libertad es dejar de cargar la culpa que no deja avanzar, volver a mirarse con dignidad, reconstruir lo que se rompió y regresar a casa con un propósito.</p>
      <p data-reveal class="solo">Fuimos enviados a anunciar libertad. <em>Y en este camino cabe más gente de la que imaginas.</em></p>
    </div>
  </div>
</section>
${closer('La historia sigue <em>escribiéndose</em>')}`,
});

// ───────────────────────── Nuestro trabajo / Programas ─────────────────────────

const trabajo = () => ({
  path: '/nuestro-trabajo',
  title: 'Nuestro trabajo',
  description: 'Un camino de acompañamiento en cinco tramos: fe, identidad, acompañamiento, propósito y libertad. Así acompañamos a mujeres en la Cárcel El Buen Pastor.',
  crumbs: [['Nuestro trabajo', '/nuestro-trabajo']],
  body: `
${opener({ n: '—', label: 'Nuestro trabajo', title: 'Un camino <em>no un evento</em>', lead: 'Acompañar no es visitar una vez. Es caminar con cada mujer desde el primer encuentro hasta el día en que vuelve a casa, y un poco más allá.', img: 'patio-panoramica', alt: 'Mujeres juegan fútbol en el patio de la cárcel El Buen Pastor, rodeado de pabellones.' })}
<section class="work work--page"><div class="wrap">
  ${rh('01', 'El recorrido')}
  ${chain()}
  ${pathRows()}
</div></section>
${verseMap('02', 'Lucas 4:18 como mapa')}
${closer('Cada tramo <em>necesita manos</em>', ['Haz parte', '/participa'])}`,
});

const programasIndex = () => ({
  path: '/programas',
  title: 'Programas',
  description: 'Nacer de Nuevo, La verdad de ser mujer, Discipulado uno a uno, Talleres productivos y Regreso a la libertad: los programas de Dios Tras Las Rejas Colombia.',
  crumbs: [['Programas', '/programas']],
  body: `
${opener({ n: '—', label: 'Programas', title: 'Cinco programas <em>una misma dirección</em>', lead: 'Del primer encuentro con una buena noticia al día de la salida. Cada programa prepara el siguiente paso.' })}
<section class="work work--page"><div class="wrap">${chain()}${pathRows()}</div></section>
${closer('¿Quieres acompañar <em>uno de estos programas?</em>', ['Haz parte', '/participa'], ['Escríbenos', '/contacto'])}`,
});

const facts = (p) => `
<dl class="facts">
  <div data-line><dt>Principio</dt><dd>${p.principle}</dd></div>
  <div data-line><dt>Lucas 4:18</dt><dd>${p.word}</dd></div>
  <div data-line><dt>Frecuencia</dt><dd>${tbd()}</dd></div>
  <div data-line><dt>Duración</dt><dd>${tbd()}</dd></div>
  <div data-line><dt>Quiénes acompañan</dt><dd>${tbd()}</dd></div>
</dl>`;

const seeks = (p) => `<ol class="seeks">${p.seeks.map((s, i) => `<li data-line><span>${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>`;

// Cuerpo específico por programa: cinco composiciones distintas en el mismo sistema.
const programBody = {
  anuncio: (p) => `
<section class="pg-anuncio">
  <div class="wrap"><p class="pg-s" data-split>${p.statement}</p></div>
  <figure class="bleed" data-reveal>${pic(p.img, p.alt)}</figure>
  <div class="wrap pg-cols">
    <div>${rh('01', 'Qué es')}<p class="lede" data-reveal>${p.what}</p></div>
    <div>${rh('02', 'Qué buscamos')}${seeks(p)}</div>
  </div>
</section>`,
  identidad: (p) => `
<section class="pg-identidad">
  <div class="wrap pg-identidad__grid">
    <div>${rh('01', 'Lo que una mujer es')}<p class="pg-s" data-reveal>${p.statement}</p></div>
    <ul class="words" aria-label="Lo que define a una mujer más allá de su condena">${p.words.map((w) => `<li data-line>${w}</li>`).join('')}</ul>
  </div>
  <figure class="wrap inset" data-reveal>${pic(p.img, p.alt, { sizes: '(min-width: 900px) 80vw, 100vw' })}</figure>
  <div class="wrap pg-cols">
    <div>${rh('02', 'Qué es')}<p class="lede" data-reveal>${p.what}</p></div>
    <div>${rh('03', 'Qué buscamos')}${seeks(p)}</div>
  </div>
</section>`,
  encuentro: (p) => `
<section class="pg-encuentro">
  <div class="wrap pg-encuentro__grid">
    <figure class="pg-encuentro__img" data-reveal>${pic(p.img, p.alt, { sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
    <div class="pg-encuentro__txt">
      ${rh('01', 'Uno a uno')}
      <p class="pg-s" data-reveal>${p.statement}</p>
      <p class="lede dropcap" data-reveal>${p.what}</p>
      <figure class="pg-encuentro__detail" data-reveal>${pic(p.detail, p.detailAlt, { sizes: '(min-width: 900px) 20vw, 50vw' })}</figure>
      ${rh('02', 'Qué buscamos')}${seeks(p)}
    </div>
  </div>
</section>`,
  oficio: (p) => `
<section class="pg-oficio">
  <div class="wrap">
    <p class="pg-s" data-split>${p.statement}</p>
    <ol class="craft">${p.steps.map(([t, d], i) => `<li data-line><span class="craft__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}</ol>
  </div>
  <div class="wrap pg-cols">
    <div>${rh('01', 'Qué es')}<p class="lede" data-reveal>${p.what}</p>${frame('Fotografía por definir · manos en un taller')}</div>
    <div>${rh('02', 'Qué buscamos')}${seeks(p)}</div>
  </div>
</section>`,
  regreso: (p) => `
<section class="pg-regreso">
  <div class="wrap">
    <p class="pg-s" data-split>${p.statement}</p>
    <ol class="stations">${p.stations.map(([t, d], i) => `<li data-reveal><span class="stations__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}</ol>
  </div>
  <figure class="bleed" data-reveal>${pic(p.img, p.alt)}</figure>
  <div class="wrap pg-cols">
    <div>${rh('01', 'Qué es')}<p class="lede" data-reveal>${p.what}</p></div>
    <div>${rh('02', 'Qué buscamos')}${seeks(p)}</div>
  </div>
</section>`,
};

const programa = (p, i) => {
  const next = programs[(i + 1) % programs.length];
  return {
    path: `/programas/${p.slug}`,
    title: p.name,
    description: `${p.name}: ${p.short}. Programa de Dios Tras Las Rejas Colombia con mujeres privadas de la libertad en la Cárcel El Buen Pastor.`,
    crumbs: [['Programas', '/programas'], [p.name, `/programas/${p.slug}`]],
    body: `
${opener({ n: p.n, label: `Programa · ${p.principle}`, title: p.name, lead: p.lead, variant: `opener--${p.layout}` })}
${programBody[p.layout](p)}
<section class="wrap pg-facts">${rh('—', 'Cómo se vive')}${facts(p)}</section>
<nav class="nextp" aria-label="Siguiente programa"><a class="wrap" href="/programas/${next.slug}">
  <span class="nextp__l">Siguiente tramo · ${next.n}</span><span class="nextp__t">${next.name}</span>${arrow}
</a></nav>
${closer(`${p.name} es posible <em>porque alguien decide estar</em>`, ['Haz parte', '/participa'])}`,
  };
};

// ───────────────────────── Historias ─────────────────────────

const published = stories.filter((s) => s.consent);

const historias = () => ({
  path: '/historias',
  title: 'Historias',
  description: 'Historias de mujeres que caminan procesos de fe, identidad y libertad, contadas con su consentimiento y a su propio ritmo.',
  crumbs: [['Historias', '/historias']],
  body: `
${opener({ n: '—', label: 'Historias', title: 'Escuchar, conocer <em>reconocer, acompañar</em>', lead: 'No contamos historias para mostrar lo que hicimos. Las contamos porque cada una nos enseñó a mirar a la persona antes que a su situación.' })}
<section class="wrap archive">
  ${rh('01', 'Archivo')}
  ${
    published.length
      ? `<ol class="archive__list">${published
          .map((s) => `<li data-line><a href="/historias/${s.slug}"><figure>${pic(s.img, s.alt, { sizes: '(min-width: 900px) 30vw, 100vw' })}</figure><span class="archive__name">${esc(s.name)}</span><span class="archive__q">“${esc(s.quote)}”</span></a></li>`)
          .join('')}</ol>`
      : `<div class="archive__empty">
    <figure data-reveal>${frame('Primera historia · por publicar')}</figure>
    <div data-reveal>
      <p class="big">Las primeras historias se publicarán aquí, en primera persona</p>
      <p>Cada historia puede incluir fotografía, texto, citas, audio y video. Se publica solo con autorización escrita de su protagonista, con su nombre o un seudónimo, como ella lo decida.</p>
    </div>
  </div>`
  }
</section>
<section class="campaign">
  <div class="wrap campaign__grid">
    <figure data-reveal>${pic('yo-soy-testimonio', 'Tres mujeres de la fundación con prendas de la campaña “Yo soy testimonio”.', { sizes: '(min-width: 900px) 40vw, 100vw' })}<figcaption>Campaña “Yo soy testimonio”</figcaption></figure>
    <div>
      ${rh('02', 'Cómo contamos')}
      <ol class="seeks">
        <li data-line><span>01</span>Escuchamos la historia completa antes de contar una parte</li>
        <li data-line><span>02</span>Ella decide qué se cuenta, cómo y cuándo</li>
        <li data-line><span>03</span>Nunca mostramos el dolor como espectáculo</li>
        <li data-line><span>04</span>La persona aparece antes que su situación jurídica</li>
      </ol>
    </div>
  </div>
</section>
${closer('¿Tu historia <em>pasó por aquí?</em>', ['Compartir mi historia', '/contacto'], ['WhatsApp', waLink('Hola, caminé con Dios Tras Las Rejas y quiero compartir mi historia.')])}`,
});

// Plantilla de historia individual (fotografía, cita, narrativa, audio, video)
const storyPage = (s, preview = false) => ({
  path: `/historias/${s.slug}`,
  title: s.name,
  description: s.quote,
  noindex: preview,
  crumbs: [['Historias', '/historias'], [s.name, `/historias/${s.slug}`]],
  body: `
<article class="tale">
  <header class="wrap tale__head">
    ${rh('Historia', programs.find((p) => p.slug === s.program)?.name || 'Dios Tras Las Rejas')}
    <h1 class="d1">${esc(s.name)}</h1>
    <blockquote class="tale__q"><p>“${esc(s.quote)}”</p></blockquote>
  </header>
  <figure class="bleed">${s.img ? pic(s.img, s.alt, { eager: true }) : frame('Fotografía por definir')}</figure>
  <div class="wrap tale__body">
    ${s.body.map((b, i) => `<p${i === 0 ? ' class="dropcap"' : ''}>${esc(b)}</p>`).join('')}
    ${s.audio ? `<figure class="tale__media"><figcaption>Escucha su voz</figcaption><audio controls preload="none" src="${esc(s.audio)}"></audio></figure>` : ''}
    ${s.video ? `<figure class="tale__media"><video controls playsinline preload="none" src="${esc(s.video)}"></video></figure>` : ''}
  </div>
</article>
${closer('Su historia continúa <em>¿Cuál es tu lugar en ella?</em>')}`,
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
  body: `
${opener({ n: '—', label: 'Participa', title: 'Hay muchas maneras <em>de ser enviado</em>', lead: 'No todos entran a la cárcel. Pero todos pueden hacer que alguien entre, que alguien aprenda, que alguien encuentre una puerta abierta al salir.' })}
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
<section class="formsec" id="formulario" aria-labelledby="fp-h">
  <div class="wrap formsec__grid">
    <div>
      ${rh('—', 'Da el primer paso')}
      <h2 id="fp-h" class="d2" data-reveal>Cuéntanos <em>quién eres</em></h2>
      <p class="lede" data-reveal>Te respondemos personalmente para conocerte y encontrar juntos el lugar donde tu aporte tiene más sentido.</p>
      <p class="small" data-reveal>El ingreso a un establecimiento penitenciario requiere procesos de autorización. Te acompañamos en ellos.</p>
    </div>
    ${form('participa', 'Quiero participar', [...baseFields, { name: 'ciudad', label: 'Ciudad', auto: 'address-level2' }, { name: 'forma', label: '¿Cómo te gustaría participar?', options: ways.filter((w) => w.id !== 'donar').map((w) => w.t).concat('Otra forma') }, { name: 'mensaje', label: 'Cuéntanos un poco de ti', rows: 3 }], 'Enviar')}
  </div>
</section>`,
});

// ───────────────────────── Dona ─────────────────────────

const dona = () => {
  const b = site.donate.bank;
  const bankReady = b.bank && b.number;
  return {
    path: '/dona',
    title: 'Donar',
    description: 'Tu aporte hace posible el acompañamiento a mujeres privadas de la libertad: encuentros, formación, talleres y preparación para el regreso. Donación única o mensual.',
    crumbs: [['Donar', '/dona']],
    body: `
<section class="donate donate--page">
  <div class="wrap donate__grid">
    ${rh('—', 'Donar')}
    <div class="donate__txt">
      <h1 class="d1" data-split>Hacer posible <em>que alguien esté ahí</em></h1>
      <p class="lede" data-reveal>No te pedimos que salves a nadie. Te invitamos a sostener la presencia: el encuentro, el material de formación, el insumo del taller, el acompañamiento el día de la salida.</p>
      <dl class="facts" data-reveal>
        <div data-line><dt>Qué haces</dt><dd>Sostienes un acompañamiento continuo, que es lo que permite un proceso real</dd></div>
        <div data-line><dt>Por qué importa</dt><dd>La transformación toma tiempo, y ninguna mujer debería caminarla sola</dd></div>
        <div data-line><dt>Cómo lo cuidamos</dt><dd>Publicamos nuestra información institucional en <a href="/transparencia">Transparencia</a></dd></div>
      </dl>
    </div>
    <div class="donate__form" data-reveal>${donateForm()}</div>
  </div>
</section>
<section class="wrap paths">
  ${rh('—', 'Otras formas de apoyar')}
  <article class="paths__i" data-line><span class="paths__n">01</span><h2 class="paths__t">Transferencia bancaria</h2>
    ${bankReady ? `<dl class="facts">${[['Banco', b.bank], ['Tipo de cuenta', b.type], ['Número', b.number], ['Titular', b.holder], ['NIT', b.nit]].filter(([, v]) => v).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : `<p>Solicita los datos bancarios oficiales por WhatsApp y te los enviamos directamente. ${tbd('[CONTENIDO POR DEFINIR: cuenta bancaria oficial]')}</p>`}
    <div>${more(waLink('Hola, quiero donar por transferencia bancaria. ¿Me comparten los datos oficiales?'), 'Pedir datos y enviar comprobante', true)}</div></article>
  <article class="paths__i" data-line><span class="paths__n">02</span><h2 class="paths__t">Aportes en especie</h2><p>Materiales para talleres, Biblias, útiles de formación. Escríbenos antes: te contamos qué se necesita en este momento y qué puede ingresar al establecimiento.</p>
    <div>${more(waLink('Hola, quiero hacer un aporte en especie. ¿Qué necesitan en este momento?'), 'Consultar necesidades', true)}</div></article>
  <article class="paths__i" data-line><span class="paths__n">03</span><h2 class="paths__t">Empresas e iglesias</h2><p>Aportes institucionales o el patrocinio de un programa o de un taller, con un acuerdo claro y un informe de lo que se hizo posible.</p>
    <div>${more('/participa#formulario', 'Hablemos')}</div></article>
  <p class="small">Certificado de donación: ${tbd('[CONTENIDO POR DEFINIR: confirmar si la fundación emite certificados tributarios]')}</p>
</section>`,
  };
};

// ───────────────────────── Contacto / Transparencia / 404 ─────────────────────────

const contacto = () => ({
  path: '/contacto',
  title: 'Contacto',
  description: 'Escríbenos por WhatsApp o por el formulario. Conversemos sobre cómo acompañar a mujeres privadas de la libertad con Dios Tras Las Rejas Colombia.',
  crumbs: [['Contacto', '/contacto']],
  body: `
<section class="formsec formsec--page">
  <div class="wrap formsec__grid">
    <div>
      ${rh('—', 'Contacto')}
      <h1 class="d1" data-split>Conversemos</h1>
      <p class="lede" data-reveal>Una pregunta, una idea, una historia, una alianza. Te respondemos personalmente.</p>
      <dl class="facts" data-reveal>
        <div data-line><dt>WhatsApp</dt><dd><a href="${waLink('Hola, quiero comunicarme con Dios Tras Las Rejas Colombia.')}" target="_blank" rel="noopener">${site.whatsappDisplay}</a></dd></div>
        <div data-line><dt>Correo</dt><dd>${site.email ? `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : tbd()}</dd></div>
        <div data-line><dt>Redes</dt><dd>${Object.entries(site.social).filter(([, u]) => u).map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${k[0].toUpperCase() + k.slice(1)}</a>`).join(' · ') || tbd()}</dd></div>
        <div data-line><dt>Dónde servimos</dt><dd>Cárcel El Buen Pastor, Colombia</dd></div>
        <div data-line><dt>Razón social</dt><dd>${site.legalName}</dd></div>
      </dl>
    </div>
    ${form('contacto', 'Contacto desde la web', [...baseFields, { name: 'asunto', label: 'Asunto', options: ['Quiero donar', 'Quiero participar', 'Alianza o empresa', 'Iglesia', 'Prensa', 'Otro'] }, { name: 'mensaje', label: 'Mensaje', rows: 4 }], 'Enviar mensaje')}
  </div>
</section>`,
});

const transparencia = () => ({
  path: '/transparencia',
  title: 'Transparencia',
  description: 'Información institucional, informes, documentos, proyectos y política de tratamiento de datos de la Fundación Dios Tras Las Rejas Colombia.',
  crumbs: [['Transparencia', '/transparencia']],
  body: `
${opener({ n: '—', label: 'Transparencia', title: 'La confianza también <em>se acompaña</em>', lead: 'Publicamos aquí la información de la fundación a medida que está disponible.' })}
<section class="wrap longform">
  <aside class="longform__side">${rh('01', 'Información institucional')}</aside>
  <dl class="longform__body facts">
    <div data-line><dt>Razón social</dt><dd>${site.legalName}</dd></div>
    <div data-line><dt>NIT</dt><dd>${site.donate.bank.nit ? esc(site.donate.bank.nit) : tbd()}</dd></div>
    <div data-line><dt>Representante legal</dt><dd>${tbd()}</dd></div>
    <div data-line><dt>Domicilio</dt><dd>${tbd()}</dd></div>
  </dl>
  <aside class="longform__side">${rh('02', 'Informes')}</aside>
  <ul class="longform__body docs">${['Informe de gestión anual', 'Estados financieros'].map((d) => `<li data-line><span>${d}</span>${tbd('Por publicar')}</li>`).join('')}</ul>
  <aside class="longform__side">${rh('03', 'Documentos')}</aside>
  <ul class="longform__body docs">${['Certificado de existencia y representación legal', 'Estatutos', 'Registro como entidad sin ánimo de lucro (ESAL)'].map((d) => `<li data-line><span>${d}</span>${tbd('Por publicar')}</li>`).join('')}</ul>
  <aside class="longform__side">${rh('04', 'Proyectos')}</aside>
  <div class="longform__body">
    <figure class="project" data-reveal>${pic('obra-patio', 'Patio interno de un establecimiento en obra, con una mezcladora y materiales de construcción.', { sizes: '(min-width: 900px) 50vw, 100vw' })}<figcaption>Adecuación de espacios · ${tbd('[CONTENIDO POR DEFINIR: nombre, lugar, fecha y alcance del proyecto]')}</figcaption></figure>
  </div>
  <aside class="longform__side">${rh('05', 'Resultados')}</aside>
  <div class="longform__body"><p>${tbd('[CONTENIDO POR DEFINIR: resultados verificables del acompañamiento]')}</p></div>
  <aside class="longform__side" id="datos">${rh('06', 'Datos personales')}</aside>
  <div class="longform__body">
    <p>Los datos que compartes en los formularios de este sitio se usan únicamente para responder tu solicitud y coordinar tu participación o donación. No los vendemos ni los compartimos con terceros con fines comerciales. Puedes pedir en cualquier momento que los consultemos, corrijamos o eliminemos escribiéndonos por WhatsApp${site.email ? ` o a ${esc(site.email)}` : ''}, conforme a la Ley 1581 de 2012.</p>
    <p class="small">Política completa de tratamiento de datos: ${tbd()}</p>
  </div>
  <aside class="longform__side">${rh('07', 'Imágenes e historias')}</aside>
  <div class="longform__body"><p>Toda fotografía o historia de una mujer acompañada se publica con su autorización. Si ves una imagen que debe retirarse, escríbenos y la retiramos.</p><p class="small">${verse.notice}</p></div>
</section>`,
});

const notFound = () => ({
  path: '/404',
  title: 'Página no encontrada',
  description: 'La página que buscas no existe.',
  noindex: true,
  body: `
<section class="wrap nf">
  ${rh('404', 'Página no encontrada')}
  <h1 class="d1">Esta puerta <em>no lleva a ningún lugar</em></h1>
  <p class="lede">Pero la historia continúa en otra parte.</p>
  <div class="end__act">${more('/', 'Volver al inicio')}${more('/contacto', 'Contacto')}</div>
</section>`,
});

export const pages = [home(), historia(), trabajo(), programasIndex(), ...programs.map(programa), historias(), ...published.map((s) => storyPage(s)), previewStory, participa(), dona(), contacto(), transparencia(), notFound()];
export const render = (p) => page(p);
