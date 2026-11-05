/* Page content for /events-highlights (built in the design's markup; the design package did not include this page). */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/media">Media</a></li>
        <li aria-current="page">Events and highlights</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ EVENTS AND HIGHLIGHTS ============================ -->
<section class="section section--tint media events" id="events" aria-labelledby="events-title">
  <div class="container">
    <div class="media__head">
      <div><span class="eyebrow" data-reveal>Media</span><h1 class="section-title" id="events-title" data-reveal>Events and highlights</h1></div>
      <div class="media__links" data-reveal>
        <a class="arrow-link" href="/press-releases">Press releases <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="arrow-link" href="/media">All media <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
    <p class="section-lead" data-reveal>Events, highlights, and what’s coming next.</p>
    <div class="coming-soon" data-reveal>
      <span class="eyebrow">Coming soon</span>
      <p>We are preparing this page. In the meantime, catch up on the latest from our ventures in Media.</p>
      <a class="btn btn--navy" href="/media" data-magnetic>Go to Media <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
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
