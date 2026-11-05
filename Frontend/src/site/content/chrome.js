/* Shared header, mobile menu, footer and icons (from the design's index.html). Edit the HTML here. */
export const sprite = `
<svg class="icon-sprite" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>
    <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M20 12H5M11 6l-6 6 6 6"/></symbol>
    <symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></symbol>
    <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></symbol>
    <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/></symbol>
    <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H4v2a3 3 0 003 3M16 6h4v2a3 3 0 01-3 3M12 13v4M9 20h6M10 17h4v3h-4z"/></symbol>
    <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></symbol>
    <symbol id="i-facebook" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></symbol>
    <symbol id="i-linkedin" viewBox="0 0 24 24"><path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0v6.57H22v-7.9c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".9"/></symbol>
  </defs>
</svg>
`;

export const header = `
<div class="scroll-progress" data-progress></div>
<div class="cursor" data-cursor></div>

<header class="site-header" data-header>
  <a class="site-header__logo" href="/" aria-label="Resolute Group — home"><img src="/assets/img/logo-resolute.png" alt="Resolute" width="138" height="46"></a>
  <nav class="primary-nav" aria-label="Primary">
    <a href="/about" data-nav="about">About</a>
    <a href="/portfolio" data-nav="portfolio">Portfolio</a>
    <a href="/leadership" data-nav="leadership">Leadership</a>
    <a href="/media" data-nav="media">Media</a>
    <a href="/blog">Blog</a>
    <a href="/scheme-of-arrangement" data-nav="investors">Investors</a>
    <a href="/career" data-nav="career">Careers</a>
  </nav>
  <div class="site-header__actions">
    <a class="btn btn--small" href="/pitch" data-magnetic>Pitch us <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu">
      <span>Menu</span><span class="menu-toggle__icon" aria-hidden="true"></span>
    </button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-menu aria-hidden="true">
  <nav class="mobile-menu__nav" aria-label="Mobile">
    <ul>
      <li><a href="/"><em>01</em>Home</a></li>
      <li><a href="/about"><em>02</em>About</a></li>
      <li><a href="/portfolio"><em>03</em>Portfolio</a></li>
      <li><a href="/leadership"><em>04</em>Leadership</a></li>
      <li><a href="/media"><em>05</em>Media</a></li>
      <li><a href="/blog"><em>06</em>Blog</a></li>
      <li><a href="/scheme-of-arrangement"><em>07</em>Investors</a></li>
      <li><a href="/career"><em>08</em>Careers</a></li>
      <li><a href="/pitch"><em>09</em>Pitch us</a></li>
    </ul>
  </nav>
  <div class="mobile-menu__info">
    <span>For enquiries</span>
    <a href="tel:+916353106274">+91 63531 06274</a>
    <a href="mailto:contact@resolutecorp.in">contact@resolutecorp.in</a>
  </div>
</div>
`;

export const footer = `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div>
        <img class="site-footer__logo" src="/assets/img/logo-resolute-white.png" alt="Resolute" width="200" height="67" loading="lazy">
        <p class="site-footer__about">Resolute Corp is a diversified investment and venture-building group creating sustainable value across real estate, fashion and sports. We back ambitious ventures and support them in building businesses that last.</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/company/resolutecorp/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on LinkedIn"><svg class="icon icon--solid" aria-hidden="true"><use href="#i-linkedin"/></svg></a>
          <a href="https://www.instagram.com/resolute.corp/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on Instagram"><svg class="icon" aria-hidden="true"><use href="#i-instagram"/></svg></a>
          <a href="https://www.facebook.com/people/Resolute-Corp/61559078189329/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on Facebook"><svg class="icon icon--solid" aria-hidden="true"><use href="#i-facebook"/></svg></a>
        </div>
      </div>
      <nav aria-label="Footer">
        <p class="site-footer__heading">Explore</p>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/leadership">Leadership</a></li>
          <li><a href="/media">Media</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/scheme-of-arrangement">Investors</a></li>
          <li><a href="/career">Careers</a></li>
          <li><a href="/pitch">Pitch us</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </nav>
      <div>
        <p class="site-footer__heading"><a href="/portfolio">Portfolio</a></p>
        <ul>
          <li><a href="/portfolio/sharesquare">ShareSquare</a></li>
          <li><a href="/portfolio/hair-drama-co">Hair Drama Co.</a></li>
          <li><a href="/portfolio/delhi-toofans">Delhi Toofans</a></li>
          <li><a href="/portfolio/hyderabad-toofans">Hyderabad Toofans</a></li>
        </ul>
        <p class="site-footer__heading site-footer__heading--spaced">For enquiries</p>
        <ul>
          <li><a href="tel:+916353106274">+91 63531 06274</a></li>
          <li><a href="mailto:contact@resolutecorp.in">contact@resolutecorp.in</a></li>
        </ul>
      </div>
      <div>
        <p class="site-footer__heading">Latest from our blog</p>
        <ul class="site-footer__posts" data-slot="footer-posts"></ul>
      </div>
    </div>
    <div class="site-footer__bottom"><span>© 2026 Resolute Corp Bharat Private Limited. All rights reserved.</span><a class="site-footer__legal" href="/privacy-policy">Privacy Policy</a><span>Progress is vitality.</span></div>
  </div>
</footer>
<button class="back-to-top" type="button" data-top aria-label="Back to top"><svg class="icon" aria-hidden="true"><use href="#i-arrow-up"/></svg></button>
`;
