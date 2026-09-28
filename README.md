# Dios Tras Las Rejas Colombia — sitio web oficial

Sitio estático, editorial y sin dependencias. Se genera con Node a partir de módulos de contenido y se publica como HTML/CSS/JS puros: carga rápida, sin base de datos, sin mantenimiento de servidor.

## Tecnología

| Pieza | Qué es |
|---|---|
| Generador | `build.mjs` (Node ≥ 18, sin paquetes externos) → carpeta `dist/` |
| HTML | Plantillas en `src/layout.mjs` y `src/pages.mjs` |
| Contenido | `src/content.mjs` (programas, Lucas 4:18, formas de participar, historias) |
| Configuración | `src/config.mjs` + variables de entorno (`.env.example`) |
| Estilos | `src/assets/css/site.css` (sistema editorial propio, sin framework) |
| Interacción | `src/assets/js/site.js` (vanilla, ~8 KB) |
| Tipografía | Instrument Serif (titulares), Newsreader (narrativa), Inter Tight (navegación e información) — Google Fonts |

## Uso

```bash
npm run build     # genera dist/ y verifica enlaces, imágenes y un <h1> por página
npm run dev       # build + servidor local en http://localhost:4321
npm run preview   # sirve dist/ sin recompilar
```

El build **falla** si detecta un enlace interno roto, una imagen inexistente o una página sin exactamente un `<h1>`.

## Publicación (dominio en Namecheap)

Recomendado: **Netlify**, **Vercel** o **Cloudflare Pages** (gratuitos, HTTPS automático). Ya están incluidos `netlify.toml` y `vercel.json`.

1. Sube este repositorio a GitHub y conéctalo al servicio elegido.
   - Comando de build: `npm run build` · Carpeta a publicar: `dist`
2. En el panel del servicio, agrega las variables de entorno (mínimo `SITE_URL=https://tudominio.com`).
3. Agrega tu dominio en el servicio (“Custom domain”). Te dará los registros DNS.
4. En **Namecheap → Domain List → Manage → Advanced DNS**:
   - Netlify: registro `A` para `@` → `75.2.60.5`, y `CNAME` para `www` → `tu-sitio.netlify.app`
   - Vercel: registro `A` para `@` → `76.76.21.21`, y `CNAME` para `www` → `cname.vercel-dns.com`
   - (Verifica los valores exactos en el panel del servicio: son los que mandan.)
   - Elimina los registros “URL Redirect” o “Parking” que Namecheap crea por defecto.
5. Espera la propagación (minutos a pocas horas). El certificado HTTPS se emite solo.

Cualquier hosting estático sirve: basta subir el contenido de `dist/`. Las rutas son carpetas con `index.html` (`/dona/index.html`), así que funcionan sin configuración especial. `404.html` ya está generado.

## Variables de entorno

Ver `.env.example`. Ninguna es secreta (todas terminan visibles en el sitio).

| Variable | Uso |
|---|---|
| `SITE_URL` | Dominio definitivo. Afecta canonical, Open Graph, Schema.org y sitemap. **Obligatoria antes de publicar.** |
| `WHATSAPP_NUMBER` | Número del botón y los mensajes de WhatsApp (por defecto `573002079151`) |
| `CONTACT_EMAIL` | Correo visible en contacto y pie |
| `SOCIAL_*` | Enlaces a redes (vacías = no se muestran) |
| `FORM_ENDPOINT` | Endpoint POST JSON para formularios |
| `DONATION_*` | Enlaces de pago de la pasarela |
| `BANK_*`, `ORG_NIT` | Datos oficiales para transferencia |

## Dónde cambiar las cosas

- **Textos de programas, Lucas 4:18, formas de participar:** `src/content.mjs`
- **Textos de cada página:** `src/pages.mjs` (cada página es una función: `home`, `historia`, `dona`…)
- **Menú, pie de página, SEO global, Schema.org:** `src/layout.mjs`
- **Colores, tipografía, espacios:** variables al inicio de `src/assets/css/site.css`
- **Imágenes:** `src/assets/img/`. Cada foto tiene variantes `-640.webp` y `-1200.webp` (algunas `-1400`/`-1080`). Si agregas una foto nueva con otras medidas, regístrala en `variants` dentro de `src/layout.mjs`.
- **Video:** `src/assets/video/hero.mp4` (+ `hero.webm`). Póster: `src/assets/img/hero-poster.webp`.

Regla editorial: los titulares no llevan punto final. No se inventan cifras, testimonios ni datos; lo pendiente se escribe como `[CONTENIDO POR DEFINIR]` y el sitio lo marca visiblemente.

## Formularios

Formularios de contacto y participación con validación accesible, estados de envío, éxito y error, honeypot anti-spam y consentimiento de datos (Ley 1581 de 2012).

- **Sin configurar:** al enviar, se abre WhatsApp con el mensaje completo listo (funciona desde el día 1).
- **Con `FORM_ENDPOINT`:** se envía un POST JSON. Opciones sin servidor: [Formspree](https://formspree.io), Getform, Basin, o una función de Netlify/Vercel. Ejemplo: `FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`.

## Donaciones

`/dona` y el bloque de la home permiten elegir **una vez / cada mes** y un monto.

- **Sin pasarela:** abre WhatsApp con la frecuencia y el monto elegidos para coordinar personalmente.
- **Con pasarela:** crea enlaces de pago en Wompi, PayU, Mercado Pago o Stripe (uno para aporte único y otro para suscripción mensual) y configúralos en `DONATION_ONCE_URL` y `DONATION_MONTHLY_URL` (y `DONATION_PROVIDER_NAME`). Si la pasarela acepta el monto por parámetro en la URL, agrégalo en `src/assets/js/site.js` (bloque “Donaciones”).
- **Transferencia:** al definir `BANK_NAME` y `BANK_ACCOUNT_NUMBER` los datos aparecen en `/dona`. Nunca pongas datos no oficiales.

## Historias

Cada historia se agrega en `stories` dentro de `src/content.mjs` y genera `/historias/<slug>` con fotografía a sangre, cita, narrativa, audio y video opcionales. Solo se publica si `consent: true` (autorización escrita de su protagonista). Vista previa de la plantilla (no indexada): `/historias/plantilla`.

## SEO

Cada página tiene title y description únicos, canonical, Open Graph, Twitter/X, un solo H1 y jerarquía H2/H3. Schema.org: `NGO` (Organization), `WebSite` y `BreadcrumbList`. Se generan `sitemap.xml` y `robots.txt`. Imagen para compartir: `src/assets/img/og-default.jpg` (1200×630).

## Rendimiento y accesibilidad

- Sitio estático; imágenes WebP responsive con `srcset`/`sizes` y carga diferida; video ambiental que solo se reproduce en pantalla y se desactiva con ahorro de datos o movimiento reducido.
- Navegación instantánea: Speculation Rules (prerender al acercarse a un enlace) con precarga de respaldo en Safari/Firefox, y transiciones entre páginas (View Transitions).
- HTML semántico, navegación por teclado, foco visible, menú y video como diálogos accesibles, `prefers-reduced-motion`, contraste AA en textos.

## Rutas

```
/                               Inicio
/nuestra-historia               Historia, principios, manifiesto
/nuestro-trabajo                El camino y Lucas 4:18 como mapa
/programas                      Índice
/programas/nacer-de-nuevo
/programas/la-verdad-de-ser-mujer
/programas/discipulado-uno-a-uno
/programas/talleres-productivos
/programas/regreso-a-la-libertad
/historias                      Archivo de historias
/historias/<slug>               Historia individual
/participa                      Voluntariado, iglesias, empresas, organizaciones, profesionales, aliados
/dona                           Donación única, mensual y otras formas
/contacto
/transparencia                  Información institucional, informes, documentos, proyectos, datos
```

## Contenido pendiente

Buscar `CONTENIDO POR DEFINIR` en `src/`. Principalmente: dominio (`SITE_URL`), correo, redes, NIT y datos legales, cuenta bancaria, pasarela de pagos, historia de fundación, frecuencia/duración de programas, fotografía de talleres, historias autorizadas, documentos de transparencia.

El sistema de lenguaje de marca está en `docs/lenguaje-de-marca.md`.
