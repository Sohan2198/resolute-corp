/* Page content for / (from the design's index.html). Edit the HTML here. */
const html = `
<div class="preloader" data-preloader aria-hidden="true">
  <div class="preloader__inner">
    <img class="preloader__logo" src="/assets/img/logo-resolute.png" alt="" width="600" height="200">
    <div class="preloader__bar"><i></i></div>
    <div class="preloader__tagline">Progress is vitality</div>
  </div>
</div>
<nav class="section-dots" data-dots aria-label="Page sections">
  <a href="#home" data-nav="home"><span>Home</span></a>
  <a href="#about" data-nav="about"><span>About</span></a>
  <a href="#portfolio" data-nav="portfolio"><span>Portfolio</span></a>
  <a href="#leadership" data-nav="leadership"><span>Leadership</span></a>
  <a href="#media" data-nav="media"><span>Media</span></a>
  <a href="#connect" data-nav="connect"><span>Contact</span></a>
</nav>
<!-- ============================ HERO ============================ -->
<section class="hero" id="home" data-section="home" data-hero aria-label="Introduction">
  <div class="hero__bg">
    <div class="hero__slide is-active" data-hero-slide><img src="/assets/img/banner-1.webp" alt="" width="1920" height="800" fetchpriority="high"></div>
    <div class="hero__slide" data-hero-slide><img src="/assets/img/banner-2.webp" alt="" width="1920" height="800" loading="lazy"></div>
    <div class="hero__slide" data-hero-slide><img src="/assets/img/banner-3.webp" alt="" width="1920" height="800" loading="lazy"></div>
    <div class="hero__slide" data-hero-slide><img src="/assets/img/hil_bronze.webp" alt="" width="1920" height="801" loading="lazy"></div>
  </div>
  <canvas class="hero__facets" data-facets="hero" aria-hidden="true"></canvas>
  <div class="hero__shapes" aria-hidden="true">
    <span class="triangle hero__shape--1" data-parallax="-0.12"></span>
    <span class="triangle hero__shape--2" data-parallax="0.08"></span>
    <span class="triangle hero__shape--3" data-parallax="-0.2"></span>
  </div>

  <div class="hero__captions">
    <div class="hero__caption is-active" data-hero-caption>
      <span class="eyebrow">Resolute Group</span>
      <h1 class="hero__title" data-hero-title="Fuelling innovation. Empowering *tomorrow.*">Fuelling innovation. Empowering tomorrow.</h1>
      <p class="hero__lead">Resolute Corp is a diversified investment and venture-building group, creating sustainable value across real estate, fashion and sports.</p>
      <div class="hero__actions">
        <a class="btn" href="/portfolio" data-magnetic>Explore our portfolio <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="btn btn--ghost" href="/about" data-magnetic>About Resolute</a>
      </div>
    </div>
    <div class="hero__caption" data-hero-caption inert aria-hidden="true">
      <span class="eyebrow">Investing with conviction</span>
      <p class="hero__title" data-hero-title="Progress is *vitality*" role="heading" aria-level="2">Progress is vitality</p>
      <p class="hero__lead">We back ambitious ventures and support them in building businesses that last.</p>
      <div class="hero__actions">
        <a class="btn" href="/portfolio" data-magnetic>Our ventures <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="btn btn--ghost" href="/pitch" data-magnetic>Pitch your idea</a>
      </div>
    </div>
    <div class="hero__caption" data-hero-caption inert aria-hidden="true">
      <span class="eyebrow">Real estate · Fashion · Sports</span>
      <p class="hero__title" data-hero-title="Diversified by design. Built for the *long* *term.*" role="heading" aria-level="2">Diversified by design. Built for the long term.</p>
      <p class="hero__lead">Our investments span assets and geographies, balancing sustainable growth with prudent risk management.</p>
      <div class="hero__actions">
        <a class="btn" href="/leadership" data-magnetic>Meet our leadership <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="btn btn--ghost" href="/about#values" data-magnetic>Our values</a>
      </div>
    </div>
    <div class="hero__caption" data-hero-caption inert aria-hidden="true">
      <span class="eyebrow">Resolute Sports · Hockey India League</span>
      <p class="hero__title" data-hero-title="Hyderabad Toofans bring home *bronze*" role="heading" aria-level="2">Hyderabad Toofans bring home bronze</p>
      <p class="hero__lead">Hyderabad Toofans clinched third place in the Men’s Hockey India League 2025–26, defeating HIL GC 4–3 at the Kalinga Hockey Stadium.</p>
      <div class="hero__actions">
        <a class="btn" href="https://hyderabadtoofans.net/" target="_blank" rel="noopener" data-magnetic>Visit Hyderabad Toofans <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
        <a class="btn btn--ghost" href="https://delhitoofans.com/" target="_blank" rel="noopener" data-magnetic>Visit Delhi Toofans</a>
      </div>
    </div>
  </div>

  <div class="hero__controls" data-hero-controls>
    <div class="hero__counter"><b data-hero-counter>01</b> / 04</div>
    <div class="hero__segments" data-hero-segments role="group" aria-label="Choose slide">
      <button class="hero__segment is-active" type="button" data-hero-segment aria-label="Slide 1"><span><i></i></span></button>
      <button class="hero__segment" type="button" data-hero-segment aria-label="Slide 2"><span><i></i></span></button>
      <button class="hero__segment" type="button" data-hero-segment aria-label="Slide 3"><span><i></i></span></button>
      <button class="hero__segment" type="button" data-hero-segment aria-label="Slide 4"><span><i></i></span></button>
    </div>
    <div class="hero__arrows">
      <button class="hero__arrow" type="button" data-hero-prev aria-label="Previous slide"><svg class="icon" aria-hidden="true"><use href="#i-arrow-left"/></svg></button>
      <button class="hero__arrow" type="button" data-hero-next aria-label="Next slide"><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></button>
    </div>
  </div>
  <div class="hero__scroll-cue" aria-hidden="true">Scroll</div>
  <div class="hero__cut" aria-hidden="true"></div>
</section>

<!-- ============================ STATS ============================ -->
<section class="stats" aria-label="Group at a glance">
  <div class="container">
    <div class="stats__grid">
      <div class="stat" data-reveal><span class="stat__value" data-count="4">4</span><p class="stat__label">Group ventures</p><p class="stat__text">ShareSquare, Hair Drama Co., Delhi Toofans and Hyderabad Toofans.</p></div>
      <div class="stat" data-reveal data-delay="1"><span class="stat__value" data-count="3">3</span><p class="stat__label">Sectors</p><p class="stat__text">Real estate, fashion and sports.</p></div>
      <div class="stat" data-reveal data-delay="2"><span class="stat__value" data-count="2">2</span><p class="stat__label">Countries</p><p class="stat__text">India and the UAE: based in Ahmedabad, with a presence in Dubai.</p></div>
      <div class="stat" data-reveal data-delay="3"><span class="stat__value" data-count="2">2</span><p class="stat__label">National leagues</p><p class="stat__text">Prime Volleyball League and Hockey India League.</p></div>
    </div>
  </div>
</section>

<!-- ============================ HOME: ABOUT TEASER ============================ -->
<section class="section about" id="about" data-section="about" aria-labelledby="about-title">
  <div class="container">
    <div class="about__layout">
      <div class="about__media" data-reveal="left">
        <div class="about__badge"><span>Founded in</span><b>Ahmedabad</b></div>
        <div class="about__frame"><img src="/assets/img/resolute-ui-about.webp" alt="Inside the Resolute Group office" width="700" height="600" loading="lazy" decoding="async" data-parallax-media></div>
        <span class="triangle" aria-hidden="true"></span><span class="triangle" aria-hidden="true"></span><span class="triangle" aria-hidden="true"></span>
      </div>
      <div>
        <span class="eyebrow" data-reveal>About us</span>
        <h2 class="sr-only" id="about-title">About Resolute Group</h2>
        <p class="about__statement" data-word-fill>A diversified investment group building and managing ventures across real estate, fashion and sports, in India and the UAE.</p>
        <div class="about__body">
          <p data-reveal>Welcome to <b>Resolute Group</b>. We invest in, build and manage businesses across sectors and geographies, with a long-term view.</p>
          <p data-reveal>Under the leadership of <b>Alok Sanghi</b>, Managing Director, Resolute Group, we combine industry knowledge with disciplined investment strategy to drive sustainable financial growth.</p>
        </div>
        <a class="btn btn--navy" href="/about" data-reveal data-magnetic>More about Resolute <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>

<!-- ============================ PORTFOLIO: GROUP MAP ============================ -->
<section class="section group-intro" id="portfolio" data-section="portfolio" aria-labelledby="portfolio-title">
  <div class="container section--center">
    <span class="eyebrow" data-reveal>Portfolio</span>
    <h2 class="section-title" id="portfolio-title" data-reveal>Investments with impact</h2>
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
    <div class="group-intro__cta" data-reveal><a class="btn btn--navy" href="/portfolio" data-magnetic>Explore all ventures <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></div>
  </div>
</section>

<!-- ============================ HOME: LEADERSHIP TEASER ============================ -->
<section class="section leadership" id="leadership" data-section="leadership" aria-labelledby="leadership-title">
  <div class="container">
    <div class="leadership__layout">
      <div class="leadership__photo leadership__photo--cutout" data-reveal="left">
        <div class="leadership__frame"><span class="monogram" aria-hidden="true">AS</span><img src="/assets/img/alok-sanghi.webp" data-fallback-src="/assets/img/resolute-ui-alok-sir.webp" alt="Alok Sanghi, Managing Director, Resolute Group" width="877" height="1180" decoding="async"></div>
        <span class="triangle" aria-hidden="true"></span><span class="triangle" aria-hidden="true"></span>
      </div>
      <div>
        <span class="eyebrow" data-reveal>Leadership</span>
        <h2 class="leadership__name" id="leadership-title"><span data-reveal="mask"><span>Alok</span></span><span data-reveal="mask" data-delay="2"><span class="is-outline">Sanghi</span></span></h2>
        <p class="leadership__role" data-reveal>Managing Director, Resolute Group</p>
        <div class="leadership__bio">
          <p data-reveal>Alok Sanghi leads Resolute Group. A graduate in Finance and Economics from Indiana University, Bloomington, USA, he previously worked with Merrill Lynch and Regency Securities. He is known for an innovative approach and for driving operational excellence and efficiency in every organisation he has been part of.</p>
        </div>
      </div>
    </div>

    <!-- Priyanka Sanghi: a leadership profile in her own right, placed below Alok (not in the team grid).
         Bio uses only facts already published on resolutecorp.in; she should review it before launch. -->
    <div class="leadership__layout leadership__layout--reverse" id="priyanka-sanghi">
      <div class="leadership__photo leadership__photo--cutout" data-reveal="right">
        <div class="leadership__frame"><span class="monogram" aria-hidden="true">PS</span><img src="/assets/img/priyanka-sanghi.webp" alt="Priyanka Sanghi, Founder, Hair Drama Co." width="877" height="1180" loading="lazy" decoding="async"></div>
        <span class="triangle" aria-hidden="true"></span><span class="triangle" aria-hidden="true"></span>
      </div>
      <div>
        <span class="eyebrow" data-reveal>Lifestyle portfolio</span>
        <h2 class="leadership__name"><span data-reveal="mask"><span>Priyanka</span></span><span data-reveal="mask" data-delay="2"><span class="is-outline">Sanghi</span></span></h2>
        <p class="leadership__role" data-reveal>Founder, Hair Drama Co.</p>
        <div class="leadership__bio">
          <p data-reveal>Priyanka Sanghi is the founder of Hair Drama Co., a holistic hair fashion brand established in 2015, and leads the Group’s lifestyle portfolio.</p>
        </div>
      </div>
    </div>
    <div class="leadership__more" data-reveal><a class="btn btn--navy" href="/leadership" data-magnetic>Meet our leadership team <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></div>
  </div>
</section>

<!-- ============================ HOME: MEDIA TEASER ============================ -->
<section class="section section--tint media" id="media" data-section="media" aria-labelledby="media-title">
  <div class="container">
    <div class="media__head">
      <div><span class="eyebrow" data-reveal>Insights</span><h2 class="section-title" id="media-title" data-reveal>Resolute in the news</h2></div>
      <div class="media__links" data-reveal>
        <a class="arrow-link" href="/media">All news and insights <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="arrow-link" href="/blog">Blog <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>

    <a class="featured-story" href="https://www.aninews.in/news/sports/hockey/hyderabad-toofans-bag-bronze-medal-in-the-mens-hockey-india-league-2025-2620260126203001/" target="_blank" rel="noopener noreferrer" data-reveal>
      <div class="featured-story__media"><img src="/assets/img/hil_bronze.webp" alt="Hyderabad Toofans celebrating their Hockey India League bronze medal" width="1920" height="801" loading="lazy" decoding="async"></div>
      <div class="featured-story__body">
        <span class="featured-story__meta">Latest · ANI News · <time datetime="2026-01-26">26 Jan 2026</time></span>
        <h3 class="featured-story__title">Hyderabad Toofans bag bronze medal in the men's Hockey India League 2025-26</h3>
        <p class="featured-story__text">Hyderabad Toofans clinched third place in the Men’s Hero Hockey India League, defeating HIL GC 4–3 in a high-scoring match at the Kalinga Hockey Stadium.</p>
        <span class="arrow-link">Read the full story <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></span>
      </div>
    </a>

    <div class="blog blog--teaser">
      <div class="blog__grid" data-slot="blog-cards"></div>
    </div>
    <div class="media__more"><a class="btn btn--navy" href="/media" data-magnetic>View all media <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></div>
  </div>
</section>

<section class="section cta-band" id="connect" data-section="connect" aria-labelledby="cta-title">
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
