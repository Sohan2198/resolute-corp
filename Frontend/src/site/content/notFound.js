/* Page content for the not-found page (from the design's 404.html). Edit the HTML here. */
const html = `
<section class="section notfound" aria-labelledby="notfound-title">
  <span class="triangle notfound__triangle" aria-hidden="true"></span>
  <div class="container section--center">
    <span class="eyebrow">Error 404</span>
    <h1 class="section-title" id="notfound-title">This page could not be found</h1>
    <p class="section-lead">The page may have moved or the address may be mistyped. These links will get you back on track.</p>
    <div class="notfound__links">
      <a class="btn" href="/" data-magnetic>Go to the home page <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      <a class="btn btn--navy" href="/portfolio" data-magnetic>Our portfolio <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      <a class="btn btn--navy" href="/pitch" data-magnetic>Contact us <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
</section>
`;

export default html;
