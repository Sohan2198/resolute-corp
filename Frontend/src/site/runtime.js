/*
 * Behaviour for the redesigned website, ported from the design's assets/js/main.js.
 *
 * The design's script ran once per static page load. In this single-page app the shared chrome (header, menu,
 * footer) stays mounted while pages change, so the script is split in two:
 *   initLayout(root)      header/progress/back-to-top, mobile menu, custom cursor, image fallback. Runs once.
 *   initPage(container)   hero, reveal, parallax, ventures deck, FAQ, news filters... Runs for every page and
 *                         returns a cleanup function that removes its listeners, observers and animation loops.
 * Behaviour is attached through data-* attributes in the page HTML, exactly as in the design.
 */

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const NEWS_PAGE_SIZE = 6;
const PRELOADER_MS = 1900;

/** Collects teardown work so a page can undo everything it set up. */
function createBag() {
  const tasks = [];
  return {
    add(fn) { tasks.push(fn); },
    on(target, type, fn, options) {
      target.addEventListener(type, fn, options);
      tasks.push(() => target.removeEventListener(type, fn, options));
    },
    timeout(fn, ms) { const id = setTimeout(fn, ms); tasks.push(() => clearTimeout(id)); return id; },
    observe(observer) { tasks.push(() => observer.disconnect()); return observer; },
    dispose() { tasks.splice(0).reverse().forEach((fn) => { try { fn(); } catch (e) { /* already gone */ } }); },
  };
}

/** Tiny element factory: el('li', { class: 'x' }, 'text' | Node, …) */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  children.forEach((child) => node.append(child));
  return node;
}

/* Scroll scheduler: runs scroll-driven tasks once per animation frame ---------------------------- */
const scrollTasks = new Set();
let scrollQueued = false;
function onScrollFrame(task, bag) {
  scrollTasks.add(task);
  bag.add(() => scrollTasks.delete(task));
}
export function requestScrollFrame() {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    const metrics = { y: window.pageYOffset, vh: window.innerHeight };
    scrollTasks.forEach((task) => task(metrics));
  });
}

/* Reveal on scroll -------------------------------------------------------------------------------- */
function countUp(node) {
  const target = Number(node.dataset.count);
  const from = Number(node.dataset.from || 0);
  if (reducedMotion()) { node.textContent = target; return; }
  const start = performance.now();
  (function frame(now) {
    const progress = clamp((now - start) / 1900, 0, 1);
    node.textContent = Math.round(from + (target - from) * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(frame);
  })(start);
}

/** Adds .is-revealed to [data-reveal] elements as they enter the viewport. Returns a cleanup function. */
export function observeReveal(items) {
  if (!('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-revealed')); return () => {}; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const item = entry.target;
      item.classList.add('is-revealed');
      observer.unobserve(item);
      $$('[data-count]', item).forEach(countUp);
      if (item.hasAttribute('data-tilt')) setTimeout(() => item.classList.add('is-settled'), 1500);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  items.forEach((item) => observer.observe(item));
  return () => observer.disconnect();
}

/* Pointer effects for buttons and cards (magnetic / tilt) ----------------------------------------- */
function initPointerHover(scope, bag) {
  if (!finePointer() || reducedMotion()) return;
  $$('[data-magnetic]', scope).forEach((node) => {
    bag.on(node, 'mousemove', (event) => {
      const rect = node.getBoundingClientRect();
      node.style.transform = `translate(${((event.clientX - rect.left - rect.width / 2) * 0.2).toFixed(1)}px, ${((event.clientY - rect.top - rect.height / 2) * 0.3).toFixed(1)}px)`;
    });
    bag.on(node, 'mouseleave', () => { node.style.transform = ''; });
  });
  $$('[data-tilt]', scope).forEach((node) => {
    bag.on(node, 'mousemove', (event) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(900px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 11).toFixed(2)}deg)`;
    });
    bag.on(node, 'mouseleave', () => { node.style.transform = ''; });
  });
}

/* ================================================================================================ */
/* Layout: runs once while the redesigned site is mounted                                            */
/* ================================================================================================ */
export function initLayout(root) {
  const bag = createBag();
  const html = document.documentElement;

  // Image fallback: a failed photo is retried once from data-fallback-src, otherwise hidden (CSS shows a fallback).
  const handleFailure = (img) => {
    if (img.dataset.fallbackSrc && !img.dataset.fallbackUsed) {
      img.dataset.fallbackUsed = 'true';
      const photo = img.closest('.leadership__photo');
      if (photo) photo.classList.add('is-photo');
      img.src = img.dataset.fallbackSrc;
      return;
    }
    img.classList.add('is-broken');
  };
  bag.on(root, 'error', (event) => {
    if (event.target && event.target.tagName === 'IMG') handleFailure(event.target);
  }, true);

  // Header state, reading progress bar, back-to-top button
  const header = $('[data-header]', root);
  const progress = $('[data-progress]', root);
  const backToTop = $('[data-top]', root);
  bag.on(backToTop, 'click', () => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }));
  onScrollFrame(({ y, vh }) => {
    const scrollable = html.scrollHeight - vh;
    header.classList.toggle('is-scrolled', y > 30);
    progress.style.transform = `scaleX(${scrollable > 0 ? clamp(y / scrollable, 0, 1) : 0})`;
    backToTop.classList.toggle('is-visible', y > vh * 1.2);
  }, bag);

  // Mobile menu
  const toggle = $('[data-menu-toggle]', root);
  const menu = $('[data-menu]', root);
  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    html.style.overflow = open ? 'hidden' : '';
  };
  bag.on(toggle, 'click', () => setOpen(!menu.classList.contains('is-open')));
  $$('a', menu).forEach((link) => bag.on(link, 'click', () => setOpen(false)));
  bag.on(window, 'resize', () => { if (window.innerWidth >= 1200) setOpen(false); });
  bag.on(document, 'keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  bag.add(() => { html.style.overflow = ''; });

  // Custom cursor (fine pointers only)
  if (finePointer() && !reducedMotion()) {
    const cursor = $('[data-cursor]', root);
    let x = 0, y = 0, targetX = 0, targetY = 0, seen = false, running = true;
    bag.on(document, 'mousemove', (event) => {
      targetX = event.clientX; targetY = event.clientY;
      if (!seen) { seen = true; x = targetX; y = targetY; cursor.classList.add('is-visible'); }
    });
    bag.on(html, 'mouseleave', () => { seen = false; cursor.classList.remove('is-visible'); });
    bag.on(document, 'mouseover', (event) => {
      cursor.classList.toggle('is-hovering', Boolean(event.target.closest && event.target.closest('a, button, [data-tilt]')));
    });
    (function follow() {
      if (!running) return;
      x += (targetX - x) * 0.2; y += (targetY - y) * 0.2;
      cursor.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      requestAnimationFrame(follow);
    })();
    bag.add(() => { running = false; });
  }
  initPointerHover($('[data-header]', root), bag);

  bag.on(window, 'scroll', requestScrollFrame, { passive: true });
  bag.on(window, 'resize', requestScrollFrame);
  requestScrollFrame();
  return () => bag.dispose();
}

/** Marks the header link of the current section (the design did this on the server). */
export function setActiveNav(root, pathname) {
  const section = pathname === '/scheme-of-arrangement' ? 'investors' : pathname.split('/')[1] || '';
  $$('.primary-nav a, .mobile-menu__nav a', root).forEach((link) => {
    const linkSection = (link.getAttribute('href') || '').split('/')[1] || '';
    const target = linkSection === 'scheme-of-arrangement' ? 'investors' : linkSection;
    const active = Boolean(section) && target === section;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}

/* ================================================================================================ */
/* Page: runs for every page, returns cleanup                                                        */
/* ================================================================================================ */
export function initPage(container, { firstLoad = false } = {}) {
  const bag = createBag();
  const hero = initHero(container, bag);
  initPreloader(container, bag, firstLoad, hero.start);
  $$('canvas[data-facets]', container).forEach((canvas) => initFacets(canvas, bag));
  bag.add(observeReveal($$('[data-reveal]', container)));
  initActiveSection(container, bag);
  initParallax(container, bag);
  initWordFill(container, bag);
  initVentures(container, bag);
  initFaq(container, bag);
  initNews(container, bag);
  initPointerHover(container, bag);
  requestScrollFrame();
  return () => bag.dispose();
}

function initPreloader(container, bag, firstLoad, onDone) {
  const preloader = $('[data-preloader]', container);
  // The intro plays only when the visitor lands on the home page, not on every return to it.
  if (!preloader || !firstLoad || reducedMotion()) { if (preloader) preloader.remove(); onDone(); return; }
  bag.timeout(() => {
    preloader.classList.add('is-done');
    onDone();
    setTimeout(() => preloader.remove(), 1400);
  }, PRELOADER_MS);
}

function initHero(container, bag) {
  const hero = $('[data-hero]', container);
  if (!hero) return { start() {} };
  const slides = $$('[data-hero-slide]', hero);
  const captions = $$('[data-hero-caption]', hero);
  const segments = $$('[data-hero-segment]', hero);
  const counter = $('[data-hero-counter]', hero);
  let current = 0, isVisible = true, isHovering = false;

  // Split each title into words so they can animate in one by one.
  $$('[data-hero-title]', hero).forEach((title) => {
    const words = title.dataset.heroTitle.split(' ');
    title.textContent = '';
    words.forEach((token, index) => {
      const word = el('i', {}, token.replace(/\*/g, ''));
      word.style.setProperty('--index', index);
      title.append(el('span', { class: 'hero__word' + (token.includes('*') ? ' hero__word--outline' : '') }, word));
      if (index < words.length - 1) title.append(' ');
    });
  });
  captions[0].classList.remove('is-active');
  segments[0].classList.remove('is-active');

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    captions.forEach((caption, i) => {
      caption.classList.toggle('is-active', i === current);
      caption.toggleAttribute('inert', i !== current);
      caption.setAttribute('aria-hidden', String(i !== current));
    });
    segments.forEach((segment, i) => {
      segment.classList.remove('is-active');
      segment.classList.toggle('is-complete', i < current);
    });
    void segments[current].offsetWidth; // restart the progress animation
    if (!reducedMotion()) segments[current].classList.add('is-active');
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
  }
  const syncPause = () => hero.classList.toggle('is-paused', !isVisible || document.hidden || isHovering);

  segments.forEach((segment, i) => bag.on(segment, 'click', () => goTo(i)));
  bag.on($('[data-hero-prev]', hero), 'click', () => goTo(current - 1));
  bag.on($('[data-hero-next]', hero), 'click', () => goTo(current + 1));
  bag.on($('[data-hero-segments]', hero), 'animationend', (event) => {
    if (reducedMotion()) return;
    const segment = event.target.closest('[data-hero-segment]');
    if (segment && segment.classList.contains('is-active')) goTo(current + 1);
  });
  const controls = $('[data-hero-controls]', hero);
  bag.on(controls, 'mouseenter', () => { isHovering = true; syncPause(); });
  bag.on(controls, 'mouseleave', () => { isHovering = false; syncPause(); });
  bag.on(document, 'visibilitychange', syncPause);
  if ('IntersectionObserver' in window) {
    bag.observe(new IntersectionObserver((entries) => { isVisible = entries[0].isIntersecting; syncPause(); }, { threshold: 0.15 })).observe(hero);
  }
  let swipeStart = null;
  bag.on(hero, 'pointerdown', (event) => { if (!event.target.closest('a, button')) swipeStart = event.clientX; });
  bag.on(hero, 'pointerup', (event) => {
    if (swipeStart === null) return;
    const distance = event.clientX - swipeStart;
    swipeStart = null;
    if (Math.abs(distance) > 60) goTo(current + (distance < 0 ? 1 : -1));
  });
  bag.on(document, 'keydown', (event) => {
    if (!isVisible || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName || '')) return;
    if (event.key === 'ArrowRight') goTo(current + 1);
    if (event.key === 'ArrowLeft') goTo(current - 1);
  });
  return { start: () => goTo(0) };
}

// Drifting right-pointing triangles (the Resolute symbol's geometry); reacts gently to the pointer.
const FACET_PRESETS = {
  hero: { count: 34, min: 24, max: 120, drift: 0.14, colors: ['0,174,239', '99,219,245', '255,255,255', '168,224,255'] },
  connect: { count: 22, min: 20, max: 90, drift: 0.1, colors: ['0,174,239', '99,219,245', '255,255,255'] },
};

function initFacets(canvas, bag) {
  const preset = FACET_PRESETS[canvas.dataset.facets];
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!preset || !ctx) return;
  const host = canvas.parentNode;
  const still = reducedMotion();
  let width = 0, height = 0, triangles = [], pointerX = 0, pointerY = 0, easedX = 0, easedY = 0, running = false, alive = true;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width; height = rect.height;
    canvas.width = Math.max(1, width * ratio);
    canvas.height = Math.max(1, height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    triangles = Array.from({ length: preset.count }, (_, i) => ({
      x: Math.random() * width, y: Math.random() * height,
      size: preset.min + Math.random() * (preset.max - preset.min),
      angle: (Math.random() - 0.5) * 1.4 + (Math.random() < 0.25 ? Math.PI : 0),
      spin: (Math.random() - 0.5) * 0.003,
      vx: (Math.random() - 0.3) * 0.3 + preset.drift, vy: (Math.random() - 0.5) * 0.18,
      depth: 0.2 + Math.random() * 0.8, alpha: 0.06 + Math.random() * 0.2,
      color: preset.colors[i % preset.colors.length], outline: Math.random() < 0.3,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    easedX += (pointerX - easedX) * 0.05;
    easedY += (pointerY - easedY) * 0.05;
    triangles.forEach((t) => {
      if (!still) { t.x += t.vx; t.y += t.vy; t.angle += t.spin; }
      if (t.x > width + 140) t.x = -140; if (t.x < -140) t.x = width + 140;
      if (t.y > height + 140) t.y = -140; if (t.y < -140) t.y = height + 140;
      ctx.save();
      ctx.translate(t.x + easedX * t.depth * 60, t.y + easedY * t.depth * 60);
      ctx.rotate(t.angle);
      ctx.beginPath();
      ctx.moveTo(-t.size * 0.5, -t.size * 0.6); ctx.lineTo(t.size * 0.7, 0); ctx.lineTo(-t.size * 0.5, t.size * 0.6);
      ctx.closePath();
      if (t.outline) { ctx.strokeStyle = `rgba(${t.color},${Math.min(0.5, t.alpha * 2)})`; ctx.lineWidth = 1.2; ctx.stroke(); }
      else { ctx.fillStyle = `rgba(${t.color},${t.alpha})`; ctx.fill(); }
      ctx.restore();
    });
  }
  function loop() { if (running && alive) { draw(); requestAnimationFrame(loop); } }
  function start() { if (!running && !still) { running = true; loop(); } }

  resize(); draw();
  bag.on(host, 'mousemove', (event) => {
    const rect = host.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  });
  bag.on(window, 'resize', () => { resize(); draw(); });
  if ('IntersectionObserver' in window) {
    bag.observe(new IntersectionObserver((entries) => { if (entries[0].isIntersecting) start(); else running = false; })).observe(canvas);
  } else { start(); }
  bag.add(() => { alive = false; });
}

/** Home page only: highlights the nav link and side dot of the section in the middle of the screen. */
function initActiveSection(container, bag) {
  if (!$('[data-dots]', container)) return;
  const sections = $$('[data-section]', container);
  const links = $$('[data-nav]');
  let active = '';
  onScrollFrame(({ vh }) => {
    let next = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= vh * 0.42 && rect.bottom > vh * 0.42) next = section.dataset.section;
    });
    if (next === active) return;
    active = next;
    links.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === active));
  }, bag);
  bag.add(() => links.forEach((link) => link.classList.remove('is-active')));
}

function initParallax(container, bag) {
  if (reducedMotion()) return;
  const floaters = $$('[data-parallax]', container);
  const media = $$('[data-parallax-media]', container);
  if (!floaters.length && !media.length) return;
  onScrollFrame(({ vh }) => {
    floaters.forEach((node) => {
      const rect = node.getBoundingClientRect();
      node.style.transform = `translate3d(0, ${((rect.top + rect.height / 2 - vh / 2) * parseFloat(node.dataset.parallax)).toFixed(1)}px, 0)`;
    });
    media.forEach((img) => {
      const frame = img.parentNode.getBoundingClientRect();
      if (frame.bottom < -100 || frame.top > vh + 100) return;
      const progress = clamp((frame.top + frame.height / 2 - vh / 2) / (vh / 2 + frame.height / 2), -1, 1);
      img.style.transform = `translate3d(0, ${(progress * frame.height * 0.07).toFixed(1)}px, 0)`;
    });
  }, bag);
}

/** Statement whose words light up as the section scrolls into view. */
function initWordFill(container, bag) {
  const statement = $('[data-word-fill]', container);
  if (!statement) return;
  const words = statement.textContent.trim().split(/\s+/);
  statement.textContent = '';
  const nodes = words.map((word) => {
    const span = el('span', { class: 'about__word' }, word);
    statement.append(span, ' ');
    return span;
  });
  let lit = -1;
  onScrollFrame(({ vh }) => {
    const rect = statement.getBoundingClientRect();
    const progress = clamp((vh * 0.88 - rect.top) / (rect.height + vh * 0.32), 0, 1);
    const count = Math.ceil(progress * nodes.length * 1.12);
    if (count === lit) return;
    lit = count;
    nodes.forEach((node, i) => node.classList.toggle('is-lit', i < count));
  }, bag);
}

/**
 * Ventures: a scroll-driven deck. On wide, tall windows every card is position: sticky, so each one stays pinned
 * while the next slides over it. Writes --enter and --cover on each card; CSS does the rest. Falls back to ordinary
 * blocks (.is-flow) when the window is too small or a card would not fit.
 */
function initVentures(container, bag) {
  const section = $('[data-ventures]', container);
  const stack = section && $('[data-venture-stack]', section);
  if (!stack) return;
  const cards = $$('[data-venture]', stack);
  const navLinks = $$('[data-venture-nav]', section);
  const line = $('[data-venture-line]', section);
  const counter = $('[data-venture-current]', section);
  const stackable = window.matchMedia('(min-width: 1000px) and (min-height: 620px)');
  const cache = [];
  let mode = 'flow', tops = [], natural = [], total = 1, active = -1;

  function measure() {
    stack.classList.remove('is-flow');
    const gap = parseFloat(getComputedStyle(stack).rowGap) || 0;
    const base = stack.getBoundingClientRect().top + window.pageYOffset;
    let offset = 0;
    tops = cards.map((card) => parseFloat(getComputedStyle(card).top) || 0);
    natural = cards.map((card) => { const start = base + offset; offset += card.offsetHeight + gap; return start; });
    total = Math.max(1, offset - gap);
    const fits = stackable.matches && cards.every((card, i) => tops[i] + card.offsetHeight <= window.innerHeight - 8);
    mode = fits ? 'stack' : 'flow';
    stack.classList.toggle('is-flow', !fits);
    section.classList.toggle('is-stacked', fits);
    cache.length = 0;
  }
  function setVars(card, i, enter, cover) {
    const key = `${enter.toFixed(3)}|${cover.toFixed(3)}`;
    if (cache[i] === key) return;
    cache[i] = key;
    card.style.setProperty('--enter', enter.toFixed(3));
    card.style.setProperty('--cover', cover.toFixed(3));
  }
  function setActive(next) {
    if (next === active) return;
    active = next;
    navLinks.forEach((link, i) => {
      link.classList.toggle('is-active', i === active);
      if (i === active) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    });
    if (counter) {
      counter.textContent = String(active + 1).padStart(2, '0');
      if (!reducedMotion()) { counter.classList.remove('is-tick'); void counter.offsetWidth; counter.classList.add('is-tick'); }
    }
  }
  onScrollFrame(({ y, vh }) => {
    let current = 0;
    cards.forEach((card, i) => {
      const top = card.getBoundingClientRect().top;
      let enter = 1, cover = 0;
      if (!reducedMotion()) {
        if (mode === 'stack') {
          enter = 1 - clamp((top - tops[i]) / Math.max(1, vh - tops[i]), 0, 1);
          const next = cards[i + 1];
          if (next) cover = 1 - clamp((next.getBoundingClientRect().top - tops[i + 1]) / Math.max(1, card.offsetHeight), 0, 1);
        } else {
          enter = clamp((vh - top) / (vh * 0.85), 0, 1);
        }
      }
      setVars(card, i, enter, cover);
      if (top <= vh * 0.55) current = i;
    });
    setActive(current);
    if (line) line.style.setProperty('--stack-progress', clamp((y + vh * 0.5 - natural[0]) / total, 0, 1).toFixed(3));
  }, bag);

  function scrollToCard(index) {
    const target = mode === 'stack' ? natural[index] - tops[index] : cards[index].getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: Math.max(0, target), behavior: reducedMotion() ? 'auto' : 'smooth' });
  }
  navLinks.forEach((link, i) => bag.on(link, 'click', (event) => { event.preventDefault(); scrollToCard(i); }));
  $$('[data-venture-link]', container).forEach((link) => bag.on(link, 'click', (event) => {
    const index = cards.findIndex((card) => card.dataset.venture === link.dataset.ventureLink);
    if (index >= 0) { event.preventDefault(); scrollToCard(index); }
  }));
  if (finePointer() && !reducedMotion()) {
    bag.on(stack, 'pointermove', (event) => {
      const card = event.target.closest && event.target.closest('[data-venture]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${(event.clientX - rect.left).toFixed(0)}px`);
      card.style.setProperty('--my', `${(event.clientY - rect.top).toFixed(0)}px`);
    });
  }
  const remeasure = () => { measure(); requestScrollFrame(); };
  measure();
  bag.on(window, 'resize', remeasure);
  bag.on(window, 'load', remeasure);
  if (stackable.addEventListener) bag.on(stackable, 'change', remeasure);
  let alive = true;
  bag.add(() => { alive = false; });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) remeasure(); });
  // Images above the deck change its position once they load.
  $$('img', container).forEach((img) => { if (!img.complete) bag.on(img, 'load', remeasure); });
}

function initFaq(container, bag) {
  const list = $('[data-faq]', container);
  if (!list) return;
  bag.on(list, 'click', (event) => {
    const trigger = event.target.closest('[data-faq-trigger]');
    if (!trigger) return;
    const item = trigger.closest('[data-faq-item]');
    const willOpen = !item.classList.contains('is-open');
    $$('[data-faq-item]', list).forEach((other) => {
      other.classList.remove('is-open');
      $('[data-faq-trigger]', other).setAttribute('aria-expanded', 'false');
    });
    if (willOpen) { item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
  });
}

function initNews(container, bag) {
  const filters = $('[data-news-filters]', container);
  const grid = $('[data-news-grid]', container);
  if (!filters || !grid) return;
  const cards = $$('[data-category]', grid);
  const featured = $('[data-news-featured]', container);
  const moreButton = $('[data-news-more]', container);
  const moreWrap = moreButton && moreButton.parentNode;
  const pageSize = Number(grid.dataset.pageSize) || NEWS_PAGE_SIZE;
  let filter = 'all';
  let expanded = false;

  function render() {
    let shown = 0, total = 0;
    cards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      if (matches) total += 1;
      const visible = matches && (expanded || shown < pageSize);
      if (matches) shown += 1;
      card.hidden = !visible;
      if (visible) {
        card.classList.remove('is-entering');
        void card.offsetWidth;
        card.style.setProperty('--index', Math.min(shown, 8));
        card.classList.add('is-entering');
      }
    });
    if (featured) featured.hidden = !(filter === 'all' || filter === 'hockey');
    if (moreWrap) moreWrap.hidden = expanded || total <= pageSize;
  }
  bag.on(filters, 'click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    $$('[data-filter]', filters).forEach((other) => other.classList.toggle('is-active', other === button));
    filter = button.dataset.filter;
    render();
  });
  if (moreButton) bag.on(moreButton, 'click', () => { expanded = true; render(); });
  render();
}
