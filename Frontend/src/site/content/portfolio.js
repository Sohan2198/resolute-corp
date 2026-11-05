/* Page content for /portfolio (from the design's portfolio/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">Portfolio</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ PORTFOLIO: GROUP MAP ============================ -->
<section class="section group-intro" data-section="portfolio" aria-labelledby="portfolio-title">
  <div class="container section--center">
    <span class="eyebrow" data-reveal>Portfolio</span>
    <h1 class="section-title" id="portfolio-title" data-reveal>Investments with impact</h1>
    <p class="section-lead" data-reveal>One group, four ventures. Select a venture to explore it.</p>
    <div class="group-map" data-reveal aria-label="Group structure: Resolute Group with ShareSquare, Hair Drama Co. and Resolute Sports, which owns Delhi Toofans and Hyderabad Toofans">
      <svg viewBox="0 0 1100 420" preserveAspectRatio="none" aria-hidden="true">
        <path d="M550 90 V135 H183 V160"/>
        <path d="M550 90 V160"/>
        <path d="M550 90 V135 H917 V160"/>
        <path d="M917 230 V270 H814 V310"/>
        <path d="M917 230 V270 H1012 V310"/>
      </svg>
      <div class="group-map__node group-map__node--root"><b>Resolute Group</b><span>Ahmedabad · Dubai</span></div>
      <a class="group-map__node group-map__node--sharesquare" href="/portfolio/sharesquare" data-venture-link="sharesquare" aria-label="Explore ShareSquare"><b>ShareSquare</b><span>Real estate · UAE</span></a>
      <a class="group-map__node group-map__node--hdc" href="/portfolio/hair-drama-co" data-venture-link="hdc" aria-label="Explore Hair Drama Co."><b>Hair Drama Co.</b><span>Fashion · Lifestyle</span></a>
      <div class="group-map__node group-map__node--sports"><b>Resolute Sports</b><span>Sports</span></div>
      <a class="group-map__node group-map__node--delhi" href="/portfolio/delhi-toofans" data-venture-link="delhi" aria-label="Explore Delhi Toofans"><b>Delhi Toofans</b><span>Volleyball · PVL</span></a>
      <a class="group-map__node group-map__node--hyderabad" href="/portfolio/hyderabad-toofans" data-venture-link="hyderabad" aria-label="Explore Hyderabad Toofans"><b>Hyderabad Toofans</b><span>Hockey · HIL</span></a>
    </div>
  </div>
</section>

<!-- ============================ PORTFOLIO: VENTURE STACK ============================ -->
<!-- Scroll-driven deck: each venture is a full card that sticks while the next one slides over it (the covered card scales
     back and dims). Cards are plain stacked blocks on small screens or short windows, and main.js falls back to that
     layout (.is-flow) whenever a card would not fit the window. Entrances use the site-wide data-reveal system.
     Card content comes from src/data/ventures.json; each card links to its own page at /portfolio/<slug>/. -->
<section class="section ventures" id="portfolio" data-section="portfolio" data-ventures aria-labelledby="ventures-title">
  <div class="container">
    <div class="ventures__head">
      <div>
        <span class="eyebrow" data-reveal>Ventures</span>
        <h2 class="section-title" id="ventures-title" data-reveal data-delay="1">Explore our ventures</h2>
        <p class="section-lead" data-reveal data-delay="2">Four businesses across real estate, fashion and sports. Scroll to move through them.</p>
      </div>
      <div class="ventures__count" data-reveal data-delay="2"><b data-venture-current>01</b><span>/ 04</span></div>
    </div>
    <div class="ventures__layout">
      <nav class="ventures__nav" aria-label="Ventures">
        <div class="ventures__nav-rail">
        <ol>
          <li><a class="ventures__nav-link" href="#venture-sharesquare" data-venture-nav="sharesquare"><b>01</b><span>ShareSquare</span></a></li>
          <li><a class="ventures__nav-link" href="#venture-hdc" data-venture-nav="hdc"><b>02</b><span>Hair Drama Co.</span></a></li>
          <li><a class="ventures__nav-link" href="#venture-delhi" data-venture-nav="delhi"><b>03</b><span>Delhi Toofans</span></a></li>
          <li><a class="ventures__nav-link" href="#venture-hyderabad" data-venture-nav="hyderabad"><b>04</b><span>Hyderabad Toofans</span></a></li>
        </ol>
        <i class="ventures__nav-line" aria-hidden="true"><i data-venture-line></i></i>
        </div>
      </nav>
      <div class="ventures__stack" data-venture-stack>
      <article class="venture venture--sharesquare" id="venture-sharesquare" data-venture="sharesquare" aria-labelledby="venture-sharesquare-name">
  <span class="venture__shape venture__shape--a" aria-hidden="true"></span><span class="venture__shape venture__shape--b" aria-hidden="true"></span><span class="venture__shape venture__shape--c" aria-hidden="true"></span>
  <span class="venture__ghost" aria-hidden="true">ShareSquare</span>
  <div class="venture__text">
    <div class="venture__index" aria-hidden="true" data-reveal>01</div>
    <h3 class="venture__name" id="venture-sharesquare-name"><span data-reveal="mask"><span>ShareSquare</span></span></h3>
    <ul class="venture__tags" data-reveal data-delay="1"><li>Real estate</li><li>UAE</li><li>Fractional ownership</li></ul>
    <p class="venture__desc" data-reveal data-delay="2">ShareSquare is a fractional real estate investment platform for premium properties in the UAE. It opens property ownership to a wider range of investors through a seamless, transparent and secure process.</p>
    <ul class="venture__facts" data-reveal data-delay="3"><li>Portfolio diversification</li><li>Potential capital appreciation</li><li>Potential rental income</li><li>Seamless, transparent and secure</li></ul>
    <div class="venture__cta" data-reveal data-delay="4">
      <a class="btn btn--white" href="https://sharesquare.ae/" target="_blank" rel="noopener" data-magnetic>Visit ShareSquare <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
      <a class="btn btn--ghost" href="/portfolio/sharesquare" data-magnetic>View details <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
  <div class="venture__visual">
    <div class="venture__chip venture__chip--a" data-reveal="right" data-delay="3"><small>Premium properties</small>UAE</div>
    <div class="venture__logo" data-reveal="scale" data-delay="2" data-tilt><img src="/assets/img/sharesquare.webp" alt="ShareSquare logo" width="500" height="500"><span class="venture__logo-fallback">ShareSquare</span></div>
    <div class="venture__chip venture__chip--b" data-reveal="left" data-delay="5"><small>Own a share of</small>premium real estate</div>
  </div>
  <span class="venture__veil" aria-hidden="true"></span>
</article>
      <article class="venture venture--hdc" id="venture-hdc" data-venture="hdc" aria-labelledby="venture-hdc-name">
  <span class="venture__shape venture__shape--a" aria-hidden="true"></span><span class="venture__shape venture__shape--b" aria-hidden="true"></span><span class="venture__shape venture__shape--c" aria-hidden="true"></span>
  <span class="venture__ghost" aria-hidden="true">Hair Drama</span>
  <div class="venture__text">
    <div class="venture__index" aria-hidden="true" data-reveal>02</div>
    <h3 class="venture__name" id="venture-hdc-name"><span data-reveal="mask"><span>Hair Drama Co.</span></span></h3>
    <ul class="venture__tags" data-reveal data-delay="1"><li>Fashion</li><li>Lifestyle</li><li>Since 2015</li></ul>
    <p class="venture__desc" data-reveal data-delay="2">Hair Drama Co. turns hair into a fashion statement. A holistic hair fashion brand, it creates luxurious, handmade accessories for women and girls. Since 2015, it has pioneered the category in India and was the first Indian hair fashion brand to secure licences from Disney India, Emily in Paris and Barbie.</p>
    <ul class="venture__facts" data-reveal data-delay="3"><li>Handmade, distinctive designs</li><li>Disney India licence</li><li>Emily in Paris and Barbie licences</li><li>Featured in Cosmopolitan and Elle</li></ul>
    <div class="venture__cta" data-reveal data-delay="4">
      <a class="btn btn--white" href="https://www.hairdramacompany.com/" target="_blank" rel="noopener" data-magnetic>Visit Hair Drama Co. <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
      <a class="btn btn--ghost" href="/portfolio/hair-drama-co" data-magnetic>View details <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
  <div class="venture__visual">
    <div class="venture__chip venture__chip--a" data-reveal="right" data-delay="3"><small>Established</small>2015</div>
    <div class="venture__logo" data-reveal="scale" data-delay="2" data-tilt><img src="/assets/img/hdc-logo.webp" alt="Hair Drama Co. logo" width="500" height="500"><span class="venture__logo-fallback">Hair Drama Co.</span></div>
    <div class="venture__chip venture__chip--b" data-reveal="left" data-delay="5"><small>Licensing partners</small>Disney India · Barbie · Emily in Paris</div>
  </div>
  <span class="venture__veil" aria-hidden="true"></span>
</article>
      <article class="venture venture--delhi" id="venture-delhi" data-venture="delhi" aria-labelledby="venture-delhi-name">
  <span class="venture__shape venture__shape--a" aria-hidden="true"></span><span class="venture__shape venture__shape--b" aria-hidden="true"></span><span class="venture__shape venture__shape--c" aria-hidden="true"></span>
  <span class="venture__ghost" aria-hidden="true">Delhi</span>
  <div class="venture__text">
    <div class="venture__index" aria-hidden="true" data-reveal>03</div>
    <h3 class="venture__name" id="venture-delhi-name"><span data-reveal="mask"><span>Delhi Toofans</span></span></h3>
    <p class="venture__award" data-reveal data-delay="1"><svg class="icon" aria-hidden="true"><use href="#i-trophy"/></svg><span>Award winners in every season since the 2024 debut</span></p>
    <ul class="venture__tags" data-reveal data-delay="1"><li>Volleyball</li><li>Prime Volleyball League</li><li>Resolute Sports</li></ul>
    <p class="venture__desc" data-reveal data-delay="2">Delhi Toofans bring a storm to the court in the Prime Volleyball League. More than a team, they are building a movement to raise the sport’s profile across India, nurturing homegrown talent and inspiring a new generation of athletes.</p>
    <ul class="venture__facts" data-reveal data-delay="3"><li>Prime Volleyball League finalists in the 2024 debut season</li><li>Homegrown talent pipeline</li><li>Teamwork, perseverance and excellence</li><li>Building India’s sports culture</li></ul>
    <div class="venture__cta" data-reveal data-delay="4">
      <a class="btn btn--white" href="https://delhitoofans.com/" target="_blank" rel="noopener" data-magnetic>Visit Delhi Toofans <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
      <a class="btn btn--ghost" href="/portfolio/delhi-toofans" data-magnetic>View details <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
  <div class="venture__visual">
    <div class="venture__chip venture__chip--a" data-reveal="right" data-delay="3"><small>PVL 2024</small>Finalists</div>
    <div class="venture__logo" data-reveal="scale" data-delay="2" data-tilt><img src="/assets/img/dt-logo.webp" alt="Delhi Toofans logo" width="500" height="500"><span class="venture__logo-fallback">Delhi Toofans</span></div>
    <div class="venture__chip venture__chip--b" data-reveal="left" data-delay="5"><small>Owned by</small>Resolute Sports</div>
  </div>
  <span class="venture__veil" aria-hidden="true"></span>
</article>
      <article class="venture venture--hyderabad" id="venture-hyderabad" data-venture="hyderabad" aria-labelledby="venture-hyderabad-name">
  <span class="venture__shape venture__shape--a" aria-hidden="true"></span><span class="venture__shape venture__shape--b" aria-hidden="true"></span><span class="venture__shape venture__shape--c" aria-hidden="true"></span>
  <span class="venture__ghost" aria-hidden="true">Hyderabad</span>
  <div class="venture__text">
    <div class="venture__index" aria-hidden="true" data-reveal>04</div>
    <h3 class="venture__name" id="venture-hyderabad-name"><span data-reveal="mask"><span>Hyderabad Toofans</span></span></h3>
    <ul class="venture__tags" data-reveal data-delay="1"><li>Hockey</li><li>Hockey India League</li><li>Resolute Sports</li></ul>
    <p class="venture__desc" data-reveal data-delay="2">Hyderabad Toofans compete in the Hockey India League, which returned after a seven-year hiatus. The team blends traditional flair with modern strategy, driven by a determination to elevate the sport and develop homegrown talent into world-class athletes.</p>
    <ul class="venture__facts" data-reveal data-delay="3"><li>Bronze at Hockey India League 2025–26</li><li>One of eight Hockey India League franchises</li><li>Homegrown to world-class</li><li>Reigniting India’s hockey passion</li></ul>
    <div class="venture__cta" data-reveal data-delay="4">
      <a class="btn btn--white" href="https://hyderabadtoofans.net/" target="_blank" rel="noopener" data-magnetic>Visit Hyderabad Toofans <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
      <a class="btn btn--ghost" href="/portfolio/hyderabad-toofans" data-magnetic>View details <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
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
    </div>
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
