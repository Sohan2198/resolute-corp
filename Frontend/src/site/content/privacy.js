/* Page content for /privacy-policy (from the design's privacy-policy/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">Privacy Policy</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ PRIVACY POLICY ============================ -->
<!-- Draft for review by the Group General Counsel before go-live. Keep it in step with what the site actually does:
     if the forms, analytics or cookies change, update "How our forms work", "Cookies and tracking" and the date. -->
<section class="section privacy" id="privacy" data-section="privacy" aria-labelledby="privacy-title">
  <div class="container">
    <div class="privacy__head">
      <span class="eyebrow" data-reveal>Legal</span>
      <h1 class="section-title" id="privacy-title" data-reveal data-delay="1">Privacy Policy</h1>
      <p class="privacy__meta" data-reveal data-delay="2">Last updated: <time datetime="2026-11-04">4 November 2026</time></p>
      <p class="section-lead" data-reveal data-delay="2">Resolute Corp Bharat Private Limited (“Resolute”, “we” or “us”) respects your privacy. This policy explains what personal data we collect through this website, how we use it and the choices you have. It applies to this website only. Our ventures, ShareSquare, Hair Drama Co., Delhi Toofans and Hyderabad Toofans, publish their own policies on their own sites.</p>
    </div>

    <div class="privacy__grid">
      <article class="policy" data-reveal>
        <h3>Who we are</h3>
        <p>Resolute Corp Bharat Private Limited, based in Ahmedabad, India, decides why and how personal data collected through this website is used. In the language of the Digital Personal Data Protection Act, 2023, we are the data fiduciary.</p>
      </article>
      <article class="policy" data-reveal data-delay="1">
        <h3>What we collect</h3>
        <p>Only what you choose to send us through the pitch and careers forms, or by email or telephone: your name, email address, phone number, organisation, areas of interest and the message you write.</p>
        <p>Please do not send passwords, bank details or government identity numbers. We will never ask for them.</p>
      </article>
      <article class="policy" data-reveal>
        <h3>How our forms work</h3>
        <p>The pitch form on this website is provided by Microsoft Forms, and job applications are handled through our careers portal on Keka. What you enter there is sent to and stored by those services on our behalf, under their own privacy terms. You can also write to us directly at contact@resolutecorp.in.</p>
      </article>
      <article class="policy" data-reveal data-delay="1">
        <h3>How we use it</h3>
        <ul>
          <li>To reply to your enquiry or pitch.</li>
          <li>To consider your application or interest in working with us.</li>
          <li>To meet legal and regulatory obligations.</li>
        </ul>
        <p>We do not sell personal data, and we do not use your details for marketing unrelated to your enquiry without your consent.</p>
      </article>
      <article class="policy" data-reveal>
        <h3>Cookies and tracking</h3>
        <p>This website uses Google Analytics to understand how visitors use it, for example which pages are viewed and how visitors arrive. Google Analytics sets cookies and receives technical data such as your browser, device and approximate location. We do not send your name, email address or phone number to Google Analytics. You can block these cookies in your browser settings or with Google’s opt-out browser add-on.</p>
        <p>The company that hosts this website may record standard technical data, such as IP address, browser type and pages requested, in its server logs.</p>
      </article>
      <article class="policy" data-reveal data-delay="1">
        <h3>Who we share it with</h3>
        <p>Within the Resolute Group, where relevant to your enquiry; with service providers who help us run this website and our email, under duties of confidentiality; and with authorities where the law requires. If we ever transfer personal data outside India, we will do so in line with applicable law.</p>
      </article>
      <article class="policy" data-reveal>
        <h3>How long we keep it</h3>
        <p>We keep your details only for as long as the purpose you provided them for requires, or as the law requires, and then delete or anonymise them.</p>
      </article>
      <article class="policy" data-reveal data-delay="1">
        <h3>How we protect it</h3>
        <p>We apply reasonable security safeguards to the personal data we hold. Ordinary email is not encrypted from end to end, so please keep sensitive details out of your message.</p>
      </article>
      <article class="policy policy--wide" data-reveal>
        <h3>Your rights</h3>
        <p>Under the Digital Personal Data Protection Act, 2023, you may:</p>
        <ul>
          <li>ask for a summary of the personal data we hold about you and how we process it;</li>
          <li>ask us to correct, complete, update or erase it;</li>
          <li>withdraw your consent at any time;</li>
          <li>have any grievance about our handling of your data addressed; and</li>
          <li>nominate another person to exercise these rights on your behalf if you die or become unable to do so.</li>
        </ul>
        <p>To exercise a right, write to <a href="mailto:contact@resolutecorp.in?subject=Privacy">contact@resolutecorp.in</a> with the subject “Privacy”. We may ask you to confirm your identity first.</p>
      </article>
      <article class="policy" data-reveal>
        <h3>Children</h3>
        <p>This website is not directed at children under 18, and we do not knowingly collect their personal data.</p>
      </article>
      <article class="policy" data-reveal data-delay="1">
        <h3>Links to other sites</h3>
        <p>This website links to our ventures, social media profiles, news publishers and Google Maps. Their own privacy policies apply once you leave this site.</p>
      </article>
      <article class="policy policy--wide" data-reveal>
        <h3>Changes to this policy</h3>
        <p>We may update this policy from time to time. The date at the top shows when it last changed. Continued use of this website after an update means you accept the revised policy.</p>
      </article>
    </div>

    <div class="privacy__contact" data-reveal>
      <div>
        <h3>Questions or complaints about your data</h3>
        <p>Resolute Corp Bharat Private Limited, Ahmedabad, India</p>
      </div>
      <div class="privacy__contact-links">
        <a href="mailto:contact@resolutecorp.in?subject=Privacy"><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg>contact@resolutecorp.in</a>
        <a href="tel:+916353106274"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>+91 63531 06274</a>
      </div>
    </div>
  </div>
</section>
`;

export default html;
