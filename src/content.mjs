// Contenido editable del sitio.
// Regla editorial: no se inventan cifras, nombres, testimonios ni resultados.
// Lo que falta se marca con TBD y se muestra como [CONTENIDO POR DEFINIR].
// Regla tipográfica: los titulares no llevan punto final.

export const TBD = '[CONTENIDO POR DEFINIR]';

export const verse = {
  ref: 'Lucas 4:18',
  version: 'Reina-Valera 1960',
  // El versículo dividido en frases: cada una se anota con lo que significa para nuestro trabajo.
  lines: [
    { t: 'El Espíritu del Señor está sobre mí,', note: 'Presencia', link: null },
    { t: 'por cuanto me ha ungido para dar buenas nuevas a los pobres;', note: 'Buenas nuevas · Nacer de Nuevo', link: 'nacer-de-nuevo' },
    { t: 'me ha enviado a sanar a los quebrantados de corazón;', note: 'Envío y sanidad · Discipulado uno a uno', link: 'discipulado-uno-a-uno' },
    { t: 'a pregonar libertad a los cautivos,', note: 'Libertad · Regreso a la libertad', link: 'regreso-a-la-libertad' },
    { t: 'y vista a los ciegos;', note: 'Identidad · La verdad de ser mujer', link: 'la-verdad-de-ser-mujer' },
    { t: 'a poner en libertad a los oprimidos.', note: 'Dignidad · Talleres productivos', link: 'talleres-productivos' },
  ],
  notice:
    'Texto bíblico: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso.',
};

// Cada programa tiene una variante editorial propia (`layout`) dentro del mismo sistema.
export const programs = [
  {
    slug: 'nacer-de-nuevo',
    n: '01',
    name: 'Nacer de Nuevo',
    word: 'Buenas nuevas',
    principle: 'Fe',
    layout: 'anuncio',
    img: 'muro-cielo',
    alt: 'Muro y pabellón de la cárcel El Buen Pastor bajo un cielo nublado, en blanco y negro.',
    short: 'Un encuentro con Dios y con la propia historia',
    statement: 'Ninguna historia está cerrada mientras alguien la siga escuchando',
    lead: 'Todo camino empieza con una noticia. Nacer de Nuevo es el espacio donde anunciamos, con respeto y sin imponer, que Dios no se quedó afuera de la cárcel.',
    what: 'Es la puerta de entrada al acompañamiento. Leemos la Palabra, oramos y conversamos sobre lo que significa empezar de nuevo desde adentro: con la culpa, con las preguntas y con la fe que cada mujer trae o que apenas está buscando.',
    seeks: ['Que cada mujer escuche una buena noticia sobre su propia vida', 'Abrir un espacio seguro para la fe, la pregunta y la oración', 'Sembrar esperanza con fundamento, no con frases hechas'],
  },
  {
    slug: 'la-verdad-de-ser-mujer',
    n: '02',
    name: 'La verdad de ser mujer',
    word: 'Vista a los ciegos',
    principle: 'Identidad',
    layout: 'identidad',
    img: 'encuentro-ancho',
    alt: 'Dos mujeres de la fundación acompañan en oración a una mujer sentada en una banca del patio.',
    short: 'Volver a verse con claridad, más allá de cualquier etiqueta',
    statement: 'Antes de la condena hubo un nombre',
    lead: 'La verdad de ser mujer acompaña el proceso de volver a mirarse con los ojos con que Dios mira: con valor, con historia y con futuro.',
    what: 'Un proceso formativo sobre identidad, valor propio y dignidad. Trabajamos la manera en que cada mujer se nombra a sí misma, las heridas que la definieron y la verdad que puede volver a definirla.',
    seeks: ['Que ninguna mujer se reduzca a su situación jurídica', 'Recuperar el nombre, la voz y la mirada sobre sí misma', 'Reconocer las capacidades y los sueños que siguen vivos'],
    words: ['Nombre', 'Historia', 'Capacidades', 'Sueños', 'Heridas', 'Fe', 'Futuro', 'Propósito'],
  },
  {
    slug: 'discipulado-uno-a-uno',
    n: '03',
    name: 'Discipulado uno a uno',
    word: 'Sanar a los quebrantados',
    principle: 'Acompañamiento',
    layout: 'encuentro',
    img: 'oracion-acompanamiento',
    alt: 'Dos mujeres de la fundación oran junto a una mujer sentada en una banca del patio de la cárcel.',
    detail: 'detalle-manos',
    detailAlt: 'Detalle de manos que sostienen hojas y una Biblia durante un encuentro.',
    short: 'Una persona que camina con otra, sin prisa y de cerca',
    statement: 'Sanar no ocurre en masa',
    lead: 'Ocurre cuando alguien se sienta al lado, escucha la historia completa y vuelve. Eso es el discipulado uno a uno.',
    what: 'Acompañamiento personal y constante: una persona de la fundación camina con una mujer privada de la libertad. Leen la Palabra, oran y sostienen el proceso en los días buenos y en los difíciles.',
    seeks: ['Acompañar de persona a persona, con fidelidad', 'Sanar heridas del corazón desde la fe y la escucha', 'Formar discípulas que un día acompañen a otras'],
  },
  {
    slug: 'talleres-productivos',
    n: '04',
    name: 'Talleres productivos',
    word: 'Libertad a los oprimidos',
    principle: 'Propósito',
    layout: 'oficio',
    img: null, // PENDIENTE: fotografía real de un taller (manos trabajando; sin rostros si no hay autorización)
    short: 'Manos que aprenden un oficio y preparan el sustento',
    statement: 'La dignidad también se construye con las manos',
    lead: 'En los talleres productivos cada mujer descubre lo que es capaz de hacer y empieza a preparar el sustento de su vida en libertad.',
    what: 'Espacios de formación práctica en oficios y emprendimiento. Aprender, producir y terminar algo con las propias manos devuelve confianza, disciplina y un horizonte concreto.',
    seeks: ['Desarrollar habilidades útiles para la vida en libertad', 'Fortalecer la confianza a través del trabajo bien hecho', 'Abrir posibilidades reales de sustento'],
    steps: [['Aprender', 'Un oficio, paso a paso'], ['Hacer', 'Con las propias manos'], ['Terminar', 'Y reconocer lo que se es capaz de lograr'], ['Sostener', 'Una vida con propósito afuera']],
  },
  {
    slug: 'regreso-a-la-libertad',
    n: '05',
    name: 'Regreso a la libertad',
    word: 'Pregonar libertad a los cautivos',
    principle: 'Libertad',
    layout: 'regreso',
    img: 'patio-panoramica',
    alt: 'Mujeres juegan fútbol en el patio de la cárcel El Buen Pastor, rodeado de pabellones.',
    short: 'Preparar la salida antes de que llegue',
    statement: 'La libertad no empieza el día en que se abre la puerta',
    lead: 'Empieza mucho antes, y necesita un camino. Regreso a la libertad acompaña el tránsito hacia la familia, la comunidad y la vida en sociedad.',
    what: 'Preparación y acompañamiento para el momento de la salida: proyecto de vida, vínculos familiares, comunidad de fe y conexión con oportunidades. Porque volver también se aprende.',
    seeks: ['Preparar el regreso con un proyecto de vida concreto', 'Reconstruir vínculos con la familia y la comunidad', 'Conectar con iglesias, aliados y oportunidades afuera'],
    stations: [['Adentro', 'Libertad interior, identidad y proyecto de vida'], ['La puerta', 'Acompañamiento en el momento de la salida'], ['Afuera', 'Familia, comunidad de fe, trabajo y propósito']],
  },
];

export const ways = [
  { id: 'donar', t: 'Donar', d: 'Sostener el acompañamiento con un aporte único o mensual', href: '/dona', cta: 'Ir a donaciones' },
  { id: 'voluntariado', t: 'Voluntariado', d: 'Presencia, tiempo y fidelidad en visitas, discipulado, talleres o acompañamiento al salir. Pedimos compromiso y formación previa', cta: 'Quiero ser voluntaria o voluntario' },
  { id: 'iglesias', t: 'Iglesias', d: 'Orar, enviar personas, adoptar un programa y recibir en comunidad a quienes regresan. La libertad necesita una familia de fe afuera', cta: 'Conectar mi iglesia' },
  { id: 'empresas', t: 'Empresas', d: 'Materiales para talleres, formación en oficios, empleo para quienes salen y alianzas con propósito', cta: 'Vincular mi empresa' },
  { id: 'organizaciones', t: 'Organizaciones', d: 'Trabajo conjunto con fundaciones, colectivos y entidades que acompañan procesos de restauración y reintegración', cta: 'Proponer un trabajo conjunto' },
  { id: 'profesionales', t: 'Profesionales', d: 'Psicología, derecho, salud, trabajo social, emprendimiento, arte. Tu conocimiento puede abrir caminos concretos', cta: 'Ofrecer mi saber' },
  { id: 'aliados', t: 'Aliados', d: 'Medios, instituciones y personas que amplifican la misión y abren puertas que solos no podríamos abrir', cta: 'Ser aliado' },
];

// Historias individuales. Cada historia genera /historias/<slug>.
// Solo se publica con autorización escrita de su protagonista (consent: true).
// Campos: slug, name (nombre o seudónimo), quote, program, img, alt, body: [párrafos], audio (url mp3), video (url mp4)
export const stories = [
  // {
  //   slug: 'nombre-o-seudonimo',
  //   consent: true,
  //   name: 'Nombre o seudónimo',
  //   quote: 'Una frase en sus propias palabras',
  //   program: 'regreso-a-la-libertad',
  //   img: 'nombre-de-la-imagen', alt: 'Descripción de la imagen',
  //   body: ['Párrafo 1', 'Párrafo 2'],
  //   audio: '/assets/audio/historia.mp3',
  //   video: '/assets/video/historia.mp4',
  // },
];
