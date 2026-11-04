/* Page content for /portfolio/hair-drama-co (from the design's portfolio/hair-drama-co/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li aria-current="page">Hair Drama Co.</li>
      </ol>
    </nav>
  </div>
</div>

<!-- ============================ VENTURE: HERO CARD ============================ -->
<section class="section venture-page" data-section="venture" aria-label="Hair Drama Co.">
  <div class="container">
    <article class="venture venture--hdc" id="venture-hdc" data-venture="hdc" aria-labelledby="venture-hdc-name">
  <span class="venture__shape venture__shape--a" aria-hidden="true"></span><span class="venture__shape venture__shape--b" aria-hidden="true"></span><span class="venture__shape venture__shape--c" aria-hidden="true"></span>
  <span class="venture__ghost" aria-hidden="true">Hair Drama</span>
  <div class="venture__text">
    <div class="venture__index" aria-hidden="true" data-reveal>02</div>
    <h1 class="venture__name" id="venture-hdc-name"><span data-reveal="mask"><span>Hair Drama Co.</span></span></h1>
    <ul class="venture__tags" data-reveal data-delay="1"><li>Fashion</li><li>Lifestyle</li><li>Since 2015</li></ul>
    <p class="venture__desc" data-reveal data-delay="2">Hair Drama Co. turns hair into a fashion statement. A holistic hair fashion brand, it creates luxurious, handmade accessories for women and girls. Since 2015, it has pioneered the category in India and was the first Indian hair fashion brand to secure licences from Disney India, Emily in Paris and Barbie.</p>
    <ul class="venture__facts" data-reveal data-delay="3"><li>Handmade, distinctive designs</li><li>Disney India licence</li><li>Emily in Paris and Barbie licences</li><li>Featured in Cosmopolitan and Elle</li></ul>
    <div class="venture__cta" data-reveal data-delay="4">
      <a class="btn btn--white" href="https://www.hairdramacompany.com/" target="_blank" rel="noopener" data-magnetic>Visit Hair Drama Co. <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
      <a class="btn btn--ghost" href="/portfolio" data-magnetic>All ventures <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
  <div class="venture__visual">
    <div class="venture__chip venture__chip--a" data-reveal="right" data-delay="3"><small>Established</small>2015</div>
    <div class="venture__logo" data-reveal="scale" data-delay="2" data-tilt><img src="/assets/img/hdc-logo.jpg" alt="Hair Drama Co. logo" width="500" height="500"><span class="venture__logo-fallback">Hair Drama Co.</span></div>
    <div class="venture__chip venture__chip--b" data-reveal="left" data-delay="5"><small>Licensing partners</small>Disney India · Barbie · Emily in Paris</div>
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
      <h2 class="section-title" id="glance-title">Hair Drama Co. at a glance</h2>
    </div>
    <dl class="glance__grid">
      <div class="glance__item" data-reveal data-delay="0"><dt>Sector</dt><dd>Fashion and lifestyle</dd></div>
      <div class="glance__item" data-reveal data-delay="1"><dt>Established</dt><dd>2015</dd></div>
      <div class="glance__item" data-reveal data-delay="2"><dt>Licensing partners</dt><dd>Disney India, Barbie, Emily in Paris</dd></div>
      <div class="glance__item" data-reveal data-delay="3"><dt>Website</dt><dd>hairdramacompany.com</dd></div>
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
      <li><a class="more-card more-card--delhi" href="/portfolio/delhi-toofans" data-reveal data-delay="1"><span class="more-card__index" aria-hidden="true">03</span><b class="more-card__name">Delhi Toofans</b><span class="more-card__meta">Volleyball · PVL</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
      <li><a class="more-card more-card--hyderabad" href="/portfolio/hyderabad-toofans" data-reveal data-delay="2"><span class="more-card__index" aria-hidden="true">04</span><b class="more-card__name">Hyderabad Toofans</b><span class="more-card__meta">Hockey · HIL</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
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
