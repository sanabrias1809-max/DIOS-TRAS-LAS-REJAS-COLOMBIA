// Dios Tras Las Rejas Colombia — interacciones (vanilla JS, sin dependencias)
(() => {
  const d = document;
  const WA = '__WA__';
  const ENDPOINT = '__FORM_ENDPOINT__';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.add('js');
  const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

  // Navegación: sólida al desplazarse; se oculta al bajar y vuelve al subir
  const nav = d.querySelector('[data-nav]');
  const home = d.body.classList.contains('is-dark-top');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-solid', y > 24);
    d.documentElement.classList.toggle('is-scrolled', y > 600);
    nav.classList.toggle('is-hidden', y > 320 && y > lastY + 4);
    if (y < lastY - 4 || y < 320) nav.classList.remove('is-hidden');
    lastY = y;
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // Diálogos accesibles (menú y video)
  let lastFocus;
  const trap = (el, e) => {
    if (e.key !== 'Tab') return;
    const f = [...el.querySelectorAll('a[href],button,video[controls]')].filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && d.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  };
  const openDialog = (el, onOpen) => {
    lastFocus = d.activeElement;
    el.hidden = false;
    d.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => { el.classList.add('is-open'); onOpen?.(); }));
    el._key = (e) => (e.key === 'Escape' ? el._close() : trap(el, e));
    d.addEventListener('keydown', el._key);
  };
  const closeDialog = (el, onClose) => {
    el.classList.remove('is-open');
    d.removeEventListener('keydown', el._key);
    d.documentElement.style.overflow = '';
    onClose?.();
    setTimeout(() => { el.hidden = true; }, reduce ? 0 : 350);
    lastFocus?.focus();
  };

  const menu = d.querySelector('[data-drawer]');
  const opener = d.querySelector('[data-menu-open]');
  if (menu && opener) {
    menu.querySelectorAll('.menu__nav a').forEach((a, i) => a.style.setProperty('transition-delay', `${60 + i * 35}ms`));
    menu._close = () => { opener.setAttribute('aria-expanded', 'false'); closeDialog(menu); };
    opener.addEventListener('click', () => {
      opener.setAttribute('aria-expanded', 'true');
      openDialog(menu, () => menu.querySelector('[data-menu-close]').focus());
    });
    menu.querySelectorAll('[data-menu-close], .menu__nav a').forEach((b) => b.addEventListener('click', menu._close));
  }

  // Video ambiental: ritmo lento, solo reproduce en pantalla; respeta movimiento reducido y ahorro de datos
  d.querySelectorAll('[data-ambient]').forEach((v) => {
    if (reduce || navigator.connection?.saveData) { v.removeAttribute('autoplay'); v.pause(); return; }
    const rate = () => { v.playbackRate = 0.7; };
    rate();
    v.addEventListener('loadedmetadata', rate);
    new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())).observe(v);
  });
  const modal = d.querySelector('[data-video-modal]');
  if (modal) {
    const mv = modal.querySelector('[data-modal-video]');
    modal._close = () => closeDialog(modal, () => mv.pause());
    d.querySelectorAll('[data-video-open]').forEach((b) =>
      b.addEventListener('click', () => openDialog(modal, () => { modal.querySelector('.modal__close').focus(); mv.play().catch(() => {}); })),
    );
    modal.querySelectorAll('[data-video-close]').forEach((b) => b.addEventListener('click', modal._close));
  }

  // Carrusel de la portada: fundido suave cada 6 s, con puntos navegables
  const slider = d.querySelector('[data-slider]');
  if (slider) {
    const slides = [...slider.children];
    const dots = [...d.querySelectorAll('[data-dot]')];
    let i = 0;
    let timer;
    const go = (n) => {
      slides[i].classList.remove('is-active');
      dots[i]?.setAttribute('aria-selected', 'false');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      dots[i]?.setAttribute('aria-selected', 'true');
      slides[i].querySelector('img')?.removeAttribute('loading');
    };
    const start = () => { if (!reduce) timer = setInterval(() => go(i + 1), 6000); };
    dots.forEach((b) => b.addEventListener('click', () => { clearInterval(timer); go(+b.dataset.dot); start(); }));
    start();
  }

  // Revelado: textos, titulares y líneas
  const items = d.querySelectorAll('[data-reveal], [data-split], [data-line]');
  if (reduce || !('IntersectionObserver' in window)) items.forEach((i) => i.classList.add('is-in'));
  else {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    items.forEach((i) => io.observe(i));
  }

  // LIBERTAD: la palabra se desplaza lentamente con el scroll
  const drift = d.querySelector('[data-drift]');
  if (drift && !reduce) {
    const sec = drift.closest('section');
    let ticking = false;
    const move = () => {
      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      drift.style.transform = `translate3d(${(-p * 28).toFixed(2)}%,0,0)`;
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }

  // Navegación rápida: precarga las páginas internas al acercarse a un enlace
  // (los navegadores con Speculation Rules ya las prerenderizan).
  if (!HTMLScriptElement.supports?.('speculationrules')) {
    const done = new Set();
    const pre = (e) => {
      const a = e.target.closest?.('a[href^="/"]');
      if (!a || done.has(a.pathname) || a.pathname === location.pathname) return;
      done.add(a.pathname);
      const l = d.createElement('link');
      l.rel = 'prefetch';
      l.href = a.pathname;
      d.head.append(l);
    };
    d.addEventListener('pointerover', pre, { passive: true });
    d.addEventListener('touchstart', pre, { passive: true });
    d.addEventListener('focusin', pre);
  }

  // Copiar número de cuenta
  d.querySelectorAll('[data-copy-btn]').forEach((b) =>
    b.addEventListener('click', async () => {
      const t = b.parentElement.querySelector('[data-copy]').textContent.trim();
      try { await navigator.clipboard.writeText(t); b.textContent = 'Copiado'; } catch { b.textContent = t; }
      setTimeout(() => { b.textContent = 'Copiar'; }, 2200);
    }),
  );

  // Prellenar la forma de participar
  d.querySelectorAll('[data-prefill]').forEach((a) =>
    a.addEventListener('click', () => {
      const sel = d.querySelector('[data-form="participa"] select[name="forma"]');
      if (sel) sel.value = a.dataset.prefill;
    }),
  );

  // Formularios: validación accesible, estados y envío (endpoint JSON o WhatsApp)
  const validate = (el) => {
    const err = d.getElementById(el.getAttribute('aria-describedby'));
    let m = '';
    if (el.type === 'checkbox' && el.required && !el.checked) m = 'Necesitamos tu autorización para responderte.';
    else if (!el.validity.valid) m = el.validity.valueMissing ? 'Este campo es obligatorio.' : 'Revisa el formato (ej. nombre@correo.com).';
    else if (el.type === 'tel' && el.value && !/^[+\d\s()-]{7,20}$/.test(el.value)) m = 'Escribe un número válido.';
    el.setAttribute('aria-invalid', m ? 'true' : 'false');
    if (err) err.textContent = m;
    return !m;
  };
  d.querySelectorAll('[data-form]').forEach((form) => {
    const fields = [...form.querySelectorAll('input:not([name=empresa_web]), select, textarea')];
    fields.forEach((f) => {
      f.addEventListener(f.type === 'checkbox' || f.tagName === 'SELECT' ? 'change' : 'input', () => f.getAttribute('aria-invalid') === 'true' && validate(f));
      f.addEventListener('blur', () => f.value && f.type !== 'checkbox' && validate(f));
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form__status');
      status.className = 'form__status';
      status.textContent = '';
      const bad = fields.filter((f) => !validate(f));
      if (bad.length) { bad[0].focus(); status.textContent = 'Revisa los campos marcados.'; status.classList.add('bad'); return; }
      if (form.empresa_web.value) return; // honeypot anti-spam
      const data = Object.fromEntries(new FormData(form));
      delete data.empresa_web;
      const btn = form.querySelector('button[type=submit]');
      const label = btn.firstElementChild.textContent;
      btn.setAttribute('aria-busy', 'true');
      btn.firstElementChild.textContent = 'Enviando…';
      const done = (ok, text) => {
        btn.removeAttribute('aria-busy');
        btn.firstElementChild.textContent = label;
        status.textContent = text;
        status.classList.add(ok ? 'ok' : 'bad');
        if (ok) form.reset();
      };
      if (ENDPOINT) {
        try {
          const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ formulario: form.dataset.title, ...data }) });
          if (!r.ok) throw new Error(r.status);
          done(true, 'Gracias. Recibimos tu mensaje y te responderemos personalmente.');
        } catch {
          done(false, 'No pudimos enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp.');
        }
      } else {
        const lines = [`*${form.dataset.title}*`, ...Object.entries(data).filter(([k, v]) => v && k !== 'consentimiento').map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`)];
        window.open(wa(lines.join('\n')), '_blank', 'noopener');
        done(true, 'Abrimos WhatsApp con tu mensaje listo. Solo presiona enviar.');
      }
    });
  });

  // Donaciones: pasarela configurada o coordinación por WhatsApp
  d.querySelectorAll('[data-donate]').forEach((f) => {
    const other = f.querySelector('.give__other');
    const custom = f.querySelector('[name=custom]');
    const err = f.querySelector('#am-err');
    f.addEventListener('change', (e) => {
      if (e.target.name !== 'amount') return;
      other.hidden = f.amount.value !== 'otro';
      if (!other.hidden) custom.focus();
    });
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const freq = f.freq.value;
      let amount = f.amount.value;
      if (amount === 'otro') {
        amount = custom.value.replace(/\D/g, '');
        if (!amount || +amount < 5000) { err.textContent = 'Escribe un monto desde $5.000.'; custom.setAttribute('aria-invalid', 'true'); custom.focus(); return; }
        err.textContent = '';
        custom.removeAttribute('aria-invalid');
      }
      const url = freq === 'mensual' ? f.dataset.monthly : f.dataset.once;
      // Si la pasarela acepta el monto por parámetro, agrégalo aquí (ver README › Donaciones).
      if (url) location.href = url;
      else window.open(wa(`Hola, quiero hacer una donación ${freq} de $${(+amount).toLocaleString('es-CO')} COP para Dios Tras Las Rejas Colombia. ¿Cómo puedo hacerla?`), '_blank', 'noopener');
    });
  });
})();
