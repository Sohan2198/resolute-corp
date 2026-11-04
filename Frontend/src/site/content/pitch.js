/* Page content for /pitch (from the design's pitch/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">Pitch us</li>
      </ol>
    </nav>
  </div>
</div>

<!-- ============================ CONNECT: PITCH US / CAREERS ============================ -->
<section class="section connect" id="connect" data-section="connect" aria-labelledby="connect-title">
  <div class="container">
    <div class="connect__card" data-reveal>
      <canvas class="connect__facets" data-facets="connect" aria-hidden="true"></canvas>
      <div class="connect__intro">
        <nav class="tabs" aria-label="Choose enquiry type">
          <a href="/pitch" class="is-active" aria-current="page">Pitch us</a>
          <a href="/career">Careers</a>
        </nav>
        <div class="connect__pane is-active">
          <h1 id="connect-title">Have an idea worth building?</h1>
          <p>Share your venture with us and let us explore what we could build together.</p>
          <p>The best way to reach us is through a personal introduction, either from a Resolute leader who knows you and can vouch for you, or from a mutual contact. If you do not have an introduction, please contact us directly.</p>
        </div>
        <div class="connect__contact">
          <a href="mailto:contact@resolutecorp.in"><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg>contact@resolutecorp.in</a>
          <a href="tel:+916353106274"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>+91 63531 06274</a>
          <a href="https://www.google.com/maps/place/Resolute+Corp/@22.9929562,72.496642,771m/data=!3m2!1e3!4b1!4m6!3m5!1s0xa670e4a7610b008f:0xb4d0c70b8f1752f8!8m2!3d22.9929562!4d72.4992223!16s%2Fg%2F11wx9xs5w5" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg>View our location on Google Maps</a>
        </div>
        <div class="connect__social">
          <div class="social-links">
            <a href="https://www.linkedin.com/company/resolutecorp/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on LinkedIn"><svg class="icon icon--solid" aria-hidden="true"><use href="#i-linkedin"/></svg></a>
            <a href="https://www.instagram.com/resolute.corp/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on Instagram"><svg class="icon" aria-hidden="true"><use href="#i-instagram"/></svg></a>
            <a href="https://www.facebook.com/people/Resolute-Corp/61559078189329/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on Facebook"><svg class="icon icon--solid" aria-hidden="true"><use href="#i-facebook"/></svg></a>
          </div>
        </div>
      </div>

      <div class="connect__form-wrap connect__form-wrap--embed" data-slot="pitch-form"></div>
    </div>
  </div>
</section>
`;

export default html;
