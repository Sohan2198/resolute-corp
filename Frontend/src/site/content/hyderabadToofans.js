/* Page content for /portfolio/hyderabad-toofans (from the design's portfolio/hyderabad-toofans/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li aria-current="page">Hyderabad Toofans</li>
      </ol>
    </nav>
  </div>
</div>

<!-- ============================ VENTURE: HERO CARD ============================ -->
<section class="section venture-page" data-section="venture" aria-label="Hyderabad Toofans">
  <div class="container">
    <article class="venture venture--hyderabad" id="venture-hyderabad" data-venture="hyderabad" aria-labelledby="venture-hyderabad-name">
  <span class="venture__shape venture__shape--a" aria-hidden="true"></span><span class="venture__shape venture__shape--b" aria-hidden="true"></span><span class="venture__shape venture__shape--c" aria-hidden="true"></span>
  <span class="venture__ghost" aria-hidden="true">Hyderabad</span>
  <div class="venture__text">
    <div class="venture__index" aria-hidden="true" data-reveal>04</div>
    <h1 class="venture__name" id="venture-hyderabad-name"><span data-reveal="mask"><span>Hyderabad Toofans</span></span></h1>
    <ul class="venture__tags" data-reveal data-delay="1"><li>Hockey</li><li>Hockey India League</li><li>Resolute Sports</li></ul>
    <p class="venture__desc" data-reveal data-delay="2">Hyderabad Toofans compete in the Hockey India League, which returned after a seven-year hiatus. The team blends traditional flair with modern strategy, driven by a determination to elevate the sport and develop homegrown talent into world-class athletes.</p>
    <ul class="venture__facts" data-reveal data-delay="3"><li>Bronze at Hockey India League 2025–26</li><li>One of eight Hockey India League franchises</li><li>Homegrown to world-class</li><li>Reigniting India’s hockey passion</li></ul>
    <div class="venture__cta" data-reveal data-delay="4">
      <a class="btn btn--white" href="https://hyderabadtoofans.net/" target="_blank" rel="noopener" data-magnetic>Visit Hyderabad Toofans <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
      <a class="btn btn--ghost" href="/portfolio" data-magnetic>All ventures <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
  <div class="venture__visual">
    <div class="venture__chip venture__chip--a" data-reveal="right" data-delay="3"><small>HIL 2025–26</small>Bronze medal</div>
    <div class="venture__logo" data-reveal="scale" data-delay="2" data-tilt><img src="/assets/img/ht-logo.webp" alt="Hyderabad Toofans logo" width="500" height="500"><span class="venture__logo-fallback">Hyderabad Toofans</span></div>
    <div class="venture__chip venture__chip--b" data-reveal="left" data-delay="5"><small>Owned by</small>Resolute Sports</div>
  </div>
  <span class="venture__veil" aria-hidden="true"></span>
</article>
  </div>
</section>

<!-- ============================ VENTURE: AT A GLANCE ============================ -->
<section class="section glance" aria-labelledby="glance-title">
  <div class="container">
    <div class="glance__head" data-reveal>
      <span class="eyebrow">At a glance</span>
      <h2 class="section-title" id="glance-title">Hyderabad Toofans at a glance</h2>
    </div>
    <dl class="glance__grid">
      <div class="glance__item" data-reveal data-delay="0"><dt>Sport</dt><dd>Hockey</dd></div>
      <div class="glance__item" data-reveal data-delay="1"><dt>League</dt><dd>Hockey India League</dd></div>
      <div class="glance__item" data-reveal data-delay="2"><dt>Owned by</dt><dd>Resolute Sports</dd></div>
      <div class="glance__item" data-reveal data-delay="3"><dt>Highlight</dt><dd>Bronze medal, Hockey India League 2025–26</dd></div>
    </dl>
  </div>
</section>

<!-- ============================ VENTURE: OTHER VENTURES ============================ -->
<section class="section section--tint" aria-labelledby="more-title">
  <div class="container">
    <div class="more-ventures__head" data-reveal>
      <span class="eyebrow">Resolute Group</span>
      <h2 class="section-title" id="more-title">More from the Group</h2>
    </div>
    <ul class="more-ventures__grid">
      <li><a class="more-card more-card--sharesquare" href="/portfolio/sharesquare" data-reveal data-delay="0"><span class="more-card__index" aria-hidden="true">01</span><b class="more-card__name">ShareSquare</b><span class="more-card__meta">Real estate · UAE</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
      <li><a class="more-card more-card--hdc" href="/portfolio/hair-drama-co" data-reveal data-delay="1"><span class="more-card__index" aria-hidden="true">02</span><b class="more-card__name">Hair Drama Co.</b><span class="more-card__meta">Fashion · Lifestyle</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
      <li><a class="more-card more-card--delhi" href="/portfolio/delhi-toofans" data-reveal data-delay="2"><span class="more-card__index" aria-hidden="true">03</span><b class="more-card__name">Delhi Toofans</b><span class="more-card__meta">Volleyball · PVL</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
    </ul>
  </div>
</section>
<section class="section cta-band" aria-labelledby="cta-title">
  <span class="triangle cta-band__triangle" aria-hidden="true"></span>
  <div class="container">
    <div class="cta-band__inner">
      <div>
        <span class="eyebrow" data-reveal>Get in touch</span>
        <h2 class="cta-band__title" id="cta-title" data-reveal data-delay="1">Have an idea worth building?</h2>
        <p class="cta-band__text" data-reveal data-delay="2">Share your venture with us, or join a team of innovators making a difference.</p>
      </div>
      <div class="cta-band__actions" data-reveal data-delay="3">
        <a class="btn" href="/pitch" data-magnetic>Pitch us <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="btn btn--ghost" href="/career" data-magnetic>Careers <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>
`;

export default html;
