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
| Tipografía | Anton (mayúscula condensada de marca), Instrument Serif itálica (acento y narrativa), Inter Tight (texto e interfaz) — Google Fonts. Es el mismo sistema de la pieza “Yo soy TESTIMONIO” |

## Uso

```bash
npm run build     # genera dist/ y verifica enlaces, imágenes y un <h1> por página
npm run dev       # build + servidor local en http://localhost:4321
npm run preview   # sirve dist/ sin recompilar
```

El build **falla** si detecta un enlace interno roto, una imagen inexistente o una página sin exactamente un `<h1>`.

## Publicación paso a paso (Netlify + dominio de Namecheap)

Recomendado: **Netlify** (gratuito, HTTPS automático, se actualiza solo con cada cambio en GitHub). `netlify.toml` ya está incluido.

### A. Publicar el sitio en Netlify (10 minutos)
1. Entra a **app.netlify.com** y crea una cuenta con **“Sign up with GitHub”** (usa la cuenta dueña del repositorio).
2. Pulsa **Add new site → Import an existing project → GitHub** y autoriza el acceso.
3. Elige el repositorio **DIOS-TRAS-LAS-REJAS-COLOMBIA**.
4. En **Branch to deploy** elige la rama con el sitio (`main` después de fusionar, o `claude/creativax-studio-hero-d0xuj3`).
5. Netlify detecta la configuración: **Build command** `npm run build` · **Publish directory** `dist`. No cambies nada.
6. Antes de publicar, abre **Add environment variables** y crea `SITE_URL` = `https://www.tudominio.com` (tu dominio real, sin “/” al final).
7. Pulsa **Deploy**. En 1–2 minutos tendrás una dirección temporal tipo `https://algo.netlify.app` para revisar.

### B. Conectar el dominio en Netlify
1. En el sitio de Netlify: **Domain management → Add a domain** → escribe `tudominio.com` → **Verify** → **Add domain**.
2. Netlify mostrará los registros DNS que necesita (la IP del dominio raíz y el destino para `www`). Déjala abierta.

### C. Configurar el DNS en Namecheap
1. Entra a **namecheap.com → Sign In → Domain List**.
2. Junto a tu dominio pulsa **Manage**.
3. En la pestaña **Domain**, sección **Nameservers**, confirma que diga **Namecheap BasicDNS**.
4. Ve a la pestaña **Advanced DNS**.
5. En **Host Records**, **elimina** los registros que Namecheap crea por defecto (el `CNAME www → parkingpage.namecheap.com` y el `URL Redirect Record @`).
6. Pulsa **Add New Record** y crea:

| Tipo | Host | Valor | TTL |
|---|---|---|---|
| `A Record` | `@` | `75.2.60.5` | Automatic |
| `CNAME Record` | `www` | `tu-sitio.netlify.app` (la dirección temporal del paso A.7) | Automatic |

7. Guarda cada registro con el ✓ verde.
8. Vuelve a Netlify → **Domain management**: en unos minutos (hasta 24 h) aparecerá como verificado. En **HTTPS** pulsa **Verify DNS configuration** y luego **Provision certificate**. El candado se activa solo.
9. En Netlify marca `www.tudominio.com` como **Primary domain** para que la versión sin `www` redirija sola.

> Si Netlify muestra valores distintos a los de la tabla, usa siempre los de Netlify.
> Si el correo del dominio está en Namecheap (Private Email), **no borres** los registros `MX` ni `TXT`.

### Alternativa: Vercel
Igual que arriba (`vercel.json` incluido). DNS en Namecheap: `A @ → 76.76.21.21` y `CNAME www → cname.vercel-dns.com`.

Cualquier hosting estático sirve: basta subir el contenido de `dist/`. Las rutas son carpetas con `index.html`, y `404.html` ya está generado.

## Variables de entorno

Ver `.env.example`. Ninguna es secreta (todas terminan visibles en el sitio).

| Variable | Uso |
|---|---|
| `SITE_URL` | Dominio definitivo. Afecta canonical, Open Graph, Schema.org y sitemap. **Obligatoria antes de publicar.** |
| `WHATSAPP_NUMBER` | Número del botón y los mensajes de WhatsApp (por defecto `573002079151`) |
| `CONTACT_EMAIL` | Correo principal (por defecto lina.sanchez.diostraslasrejas@gmail.com) |
| `SOCIAL_*` | Enlaces a redes (vacías = no se muestran) |
| `FORM_ENDPOINT` | Endpoint POST JSON para formularios |
| `DONATION_*` | Enlaces de pago de la pasarela |
| `BANK_*`, `ORG_NIT` | Datos de transferencia. Ya vienen configurados: Davivienda, cuenta de ahorros 108900735565, NIT 902007213-6 |

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

Buscar `CONTENIDO POR DEFINIR` en `src/`. Falta: dominio (`SITE_URL`), redes sociales, representante legal y domicilio, pasarela de pagos, certificado de donación, fotografía de los reencuentros familiares, historias autorizadas y documentos de transparencia.

Los programas se describen como **“por ciclos, según los recursos disponibles”** (`cycles` en `src/content.mjs`): así se comunica que se realizan según los recursos, sin sonar a limitación.

El sistema de lenguaje de marca está en `docs/lenguaje-de-marca.md`.
