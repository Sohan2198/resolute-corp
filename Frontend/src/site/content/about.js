/* Page content for /about (from the design's about/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">About</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ ABOUT ============================ -->
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
        <h1 class="sr-only" id="about-title">About Resolute Group</h1>
        <p class="about__statement" data-word-fill>A diversified investment group building and managing ventures across real estate, fashion and sports, in India and the UAE.</p>
        <div class="about__body">
          <p data-reveal>Welcome to <b>Resolute Group</b>. We invest in, build and manage businesses across sectors and geographies, with a long-term view.</p>
          <p data-reveal>Under the leadership of <b>Alok Sanghi</b>, Managing Director, Resolute Group, we combine industry knowledge with disciplined investment strategy to drive sustainable financial growth.</p>
          <p data-reveal>Resolute Corp creates opportunities by backing innovation and applying sound investment strategy. Our investments span <b>real estate, fashion and sports</b>, and each venture reflects our commitment to excellence and growth.</p>
          <p data-reveal>We diversify across assets and geographies to support sustainable growth and manage risk, which helps the Group stay resilient as markets change.</p>
        </div>
        <dl class="about__facts" data-reveal>
          <div><dt>Legal name</dt><dd>Resolute Corp Bharat Private Limited</dd></div>
          <div><dt>Also known as</dt><dd>Resolute Group, Resolute Corp</dd></div>
          <div><dt>Based in</dt><dd>Ahmedabad, India, with a presence in Dubai, UAE</dd></div>
          <div><dt>Sectors</dt><dd>Real estate, fashion and sports</dd></div>
          <div><dt>Ventures</dt><dd>ShareSquare, Hair Drama Co., Delhi Toofans and Hyderabad Toofans</dd></div>
        </dl>
        <a class="btn btn--navy" href="/portfolio" data-reveal data-magnetic>Explore our portfolio <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>

    <div class="mission-vision">
      <article class="mv-card mv-card--dark" data-reveal="left">
        <span class="triangle" aria-hidden="true"></span><span class="mv-card__index" aria-hidden="true">01</span>
        <h3><svg class="icon" aria-hidden="true"><use href="#i-target"/></svg>Mission</h3>
        <p>Our mission is to create investment opportunities of lasting value. We invest in technology and innovation, attract enterprising asset managers and diversify across assets and geographies to deliver sustainable growth while managing risk.</p>
      </article>
      <article class="mv-card mv-card--light" data-reveal="right">
        <span class="triangle" aria-hidden="true"></span><span class="mv-card__index" aria-hidden="true">02</span>
        <h3><svg class="icon" aria-hidden="true"><use href="#i-eye"/></svg>Vision</h3>
        <p>To be a leading global investment platform, delivering exceptional and sustainable returns through diversified asset classes, powered by technology, talent and disciplined capital allocation.</p>
      </article>
    </div>

    <div class="pillars-head" data-reveal>
      <span class="eyebrow">What sets us apart</span>
      <h2 class="section-title">Disciplined investing,<br>grounded in expertise and integrity</h2>
    </div>
    <div class="pillars">
      <article class="pillar" data-reveal><span class="pillar__index" aria-hidden="true">01</span><div class="pillar__icon"><svg class="icon" aria-hidden="true"><use href="#i-layers"/></svg></div><h3>Strategic diversification</h3><p>Resolute Corp invests across a range of industries to build a balanced, resilient portfolio that manages risk and supports returns.</p></article>
      <article class="pillar" data-reveal data-delay="2"><span class="pillar__index" aria-hidden="true">02</span><div class="pillar__icon"><svg class="icon" aria-hidden="true"><use href="#i-bulb"/></svg></div><h3>Innovative investment strategies</h3><p>We combine modern investment techniques with close attention to market trends, so that each investment is well positioned for sustained growth.</p></article>
      <article class="pillar" data-reveal data-delay="4"><span class="pillar__index" aria-hidden="true">03</span><div class="pillar__icon"><svg class="icon" aria-hidden="true"><use href="#i-chart"/></svg></div><h3>A record of building ventures</h3><p>Our partnerships and investments in ShareSquare, Hair Drama Co., Delhi Toofans and Hyderabad Toofans reflect a consistent record of identifying and nurturing high-potential ventures.</p></article>
    </div>
  </div>
</section>

<!-- ============================ VALUES ============================ -->
<section class="section section--dark values" id="values" data-section="values" aria-labelledby="values-title">
  <div class="marquee" aria-hidden="true"><div class="marquee__track"><span>Embrace Empathy</span><span>Stay Results-Oriented</span><span>Evolve with Curiosity</span><span>Strive for Excellence</span><span>Embrace Empathy</span><span>Stay Results-Oriented</span><span>Evolve with Curiosity</span><span>Strive for Excellence</span></div></div>
  <div class="marquee marquee--reverse" aria-hidden="true"><div class="marquee__track"><span>Honour Our Commitments</span><span>Cultivate a Growth Mindset</span><span>Uphold Integrity</span><span>Thrive Through Collaboration</span><span>Honour Our Commitments</span><span>Cultivate a Growth Mindset</span><span>Uphold Integrity</span><span>Thrive Through Collaboration</span></div></div>
  <div class="container">
    <div class="values__head" data-reveal><span class="eyebrow">Core values</span><h2 class="section-title" id="values-title">What we stand for</h2></div>
    <ul class="values__grid">
      <li class="value-card" data-reveal><span class="value-card__index">01</span><h3 class="value-card__title">Embrace Empathy</h3></li>
      <li class="value-card" data-reveal data-delay="1"><span class="value-card__index">02</span><h3 class="value-card__title">Stay Results-Oriented</h3></li>
      <li class="value-card" data-reveal data-delay="2"><span class="value-card__index">03</span><h3 class="value-card__title">Evolve with Curiosity</h3></li>
      <li class="value-card" data-reveal data-delay="3"><span class="value-card__index">04</span><h3 class="value-card__title">Strive for Excellence</h3></li>
      <li class="value-card" data-reveal><span class="value-card__index">05</span><h3 class="value-card__title">Honour Our Commitments</h3></li>
      <li class="value-card" data-reveal data-delay="1"><span class="value-card__index">06</span><h3 class="value-card__title">Cultivate a Growth Mindset</h3></li>
      <li class="value-card" data-reveal data-delay="2"><span class="value-card__index">07</span><h3 class="value-card__title">Uphold Integrity</h3></li>
      <li class="value-card" data-reveal data-delay="3"><span class="value-card__index">08</span><h3 class="value-card__title">Thrive Through Collaboration</h3></li>
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
