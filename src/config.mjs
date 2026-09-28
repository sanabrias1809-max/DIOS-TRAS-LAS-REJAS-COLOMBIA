// Configuración global del sitio.
// Los valores sensibles o que dependen del entorno se leen de variables de entorno
// en el momento del build (ver .env.example). Nunca guardes secretos aquí.

const env = (key, fallback = '') => (process.env[key] ?? fallback).trim();

export const site = {
  name: 'Dios Tras Las Rejas Colombia',
  legalName: 'Fundación Dios Tras Las Rejas Colombia',
  // Dominio definitivo. Configúralo con SITE_URL (sin "/" final).
  url: env('SITE_URL', 'https://www.diostraslasrejascolombia.org').replace(/\/$/, ''),
  locale: 'es_CO',
  lang: 'es-CO',
  defaultOg: '/assets/img/og-default.jpg',

  // Contacto
  whatsapp: env('WHATSAPP_NUMBER', '573002079151'), // formato internacional sin "+"
  whatsappDisplay: '+57 300 207 9151',
  email: env('CONTACT_EMAIL'), // vacío = no se muestra

  // Redes sociales: deja vacío lo que no exista todavía.
  social: {
    instagram: env('SOCIAL_INSTAGRAM'),
    facebook: env('SOCIAL_FACEBOOK'),
    youtube: env('SOCIAL_YOUTUBE'),
    tiktok: env('SOCIAL_TIKTOK'),
  },

  // Formularios: endpoint que acepte POST JSON (Formspree, Getform, Basin, función propia…).
  // Si está vacío, los formularios envían el mensaje por WhatsApp (funcional desde el día 1).
  formEndpoint: env('FORM_ENDPOINT'),

  // Donaciones: enlaces de pago de la pasarela elegida (Wompi, PayU, Mercado Pago, Stripe).
  // Si están vacíos, la donación se coordina por WhatsApp con el monto elegido.
  donate: {
    providerName: env('DONATION_PROVIDER_NAME'),
    onceUrl: env('DONATION_ONCE_URL'),
    monthlyUrl: env('DONATION_MONTHLY_URL'),
    bank: {
      bank: env('BANK_NAME'),
      type: env('BANK_ACCOUNT_TYPE'),
      number: env('BANK_ACCOUNT_NUMBER'),
      holder: env('BANK_ACCOUNT_HOLDER'),
      nit: env('ORG_NIT'),
    },
  },
};

export const waLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
