/* Page content for /leadership (from the design's leadership/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">Leadership</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ LEADERSHIP ============================ -->
<!-- Portraits are background-free cut-outs standing on a gradient panel (head rises above its edge).
     Alok's slot loads assets/img/alok-sanghi.webp; until that file exists the script falls back to the original
     photograph (data-fallback-src) and the panel reverts to the plain framed-photo style (.is-photo). -->
<section class="section leadership" id="leadership" data-section="leadership" aria-labelledby="leadership-title">
  <div class="container">
    <h1 class="sr-only">Leadership at Resolute Group</h1>
    <div class="leadership__layout">
      <div class="leadership__photo leadership__photo--cutout" data-reveal="left">
        <div class="leadership__frame"><span class="monogram" aria-hidden="true">AS</span><img src="/assets/img/alok-sanghi.webp" data-fallback-src="/assets/img/resolute-ui-alok-sir.jpg" alt="Alok Sanghi, Managing Director, Resolute Group" width="877" height="1180" decoding="async"></div>
        <span class="triangle" aria-hidden="true"></span><span class="triangle" aria-hidden="true"></span>
      </div>
      <div>
        <span class="eyebrow" data-reveal>Leadership</span>
        <h2 class="leadership__name" id="leadership-title"><span data-reveal="mask"><span>Alok</span></span><span data-reveal="mask" data-delay="2"><span class="is-outline">Sanghi</span></span></h2>
        <p class="leadership__role" data-reveal>Managing Director, Resolute Group</p>
        <div class="leadership__bio">
          <p data-reveal>Alok Sanghi leads Resolute Group. A graduate in Finance and Economics from Indiana University, Bloomington, USA, he previously worked with Merrill Lynch and Regency Securities. He is known for an innovative approach and for driving operational excellence and efficiency in every organisation he has been part of.</p>
          <p data-reveal>Alok focuses on people, entrepreneurship and management quality. Through his businesses, he seeks to add value to people’s lives and to contribute to society through sustainability and skill-development initiatives.</p>
          <p data-reveal>Alok holds directorships across several companies, including Resolute Corp, Samruddhi, Sanghi Infrastructure Limited and Sanghi Energy Limited. His forward-looking, holistic approach to business underpins the long-term success of each venture.</p>
        </div>
        <ul class="leadership__facts" data-reveal><li>Indiana University, Bloomington</li><li>Formerly Merrill Lynch · Regency Securities</li><li>Sustainability and skill development</li></ul>
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
          <p data-reveal>Under her leadership, Hair Drama Co. has broadened its product range and entered international markets through influencer marketing, global trend forecasting and omnichannel retail, positioning itself as a premium lifestyle accessory brand.</p>
          <p data-reveal>The brand creates luxurious, handmade hair accessories for women and girls, has secured licences from Disney India, Emily in Paris and Barbie, and has been featured in Cosmopolitan and Elle.</p>
        </div>
        <ul class="leadership__facts" data-reveal><li>Founder, Hair Drama Co. · Since 2015</li><li>Disney India · Emily in Paris · Barbie licences</li><li>Featured in Cosmopolitan and Elle</li></ul>
      </div>
    </div>

    <div class="team-head" data-reveal><span class="eyebrow">Executive team</span><h2 class="section-title">Meet our executive team</h2></div>
    <ul class="team">
      <li><article class="team-card" data-reveal data-delay="1" data-tilt><span class="monogram" aria-hidden="true">VP</span><img src="/assets/img/vivek.jpg" alt="Vivek Pawar, CEO, Hair Drama Co." width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Vivek Pawar</b><span class="team-card__role">CEO, Hair Drama Co.</span></div></article></li>
      <li><article class="team-card" data-reveal data-delay="2" data-tilt><span class="monogram" aria-hidden="true">SP</span><img src="/assets/img/saiprakash.jpg" alt="Sai Prakash, CEO, Resolute Sports" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Sai Prakash</b><span class="team-card__role">CEO, Resolute Sports</span></div></article></li>
      <li><article class="team-card" data-reveal data-delay="3" data-tilt><span class="monogram" aria-hidden="true">NR</span><img src="/assets/img/nikhil.jpg" alt="Nikhil Rungta, Chief Investment Officer" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Nikhil Rungta</b><span class="team-card__role">Chief Investment Officer</span></div></article></li>
      <li><article class="team-card" data-reveal data-delay="4" data-tilt><span class="monogram" aria-hidden="true">MA</span><img src="/assets/img/muath.jpg" alt="Muath Abdel Jalil, CEO, ShareSquare" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Muath Abdel Jalil</b><span class="team-card__role">CEO, ShareSquare</span></div></article></li>
      <li><article class="team-card" data-reveal data-tilt><span class="monogram" aria-hidden="true">SL</span><img src="/assets/img/sanjeev.jpg" alt="Sanjeev Ludhani, Chief Digital Officer" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Sanjeev Ludhani</b><span class="team-card__role">Chief Digital Officer</span></div></article></li>
      <li><article class="team-card" data-reveal data-delay="1" data-tilt><span class="monogram" aria-hidden="true">MK</span><img src="/assets/img/manish.jpg" alt="Manish Kumar, Group General Counsel" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Manish Kumar</b><span class="team-card__role">Group General Counsel</span></div></article></li>
      <li><article class="team-card" data-reveal data-delay="2" data-tilt><span class="monogram" aria-hidden="true">DC</span><img src="/assets/img/dilip.jpg" alt="Dilip Chakraborty, Group Head, Accounts and Taxation" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Dilip Chakraborty</b><span class="team-card__role">Group Head, Accounts and Taxation</span></div></article></li>
      <li><article class="team-card" data-reveal data-delay="3" data-tilt><span class="monogram" aria-hidden="true">AD</span><img src="/assets/img/amrita.jpg" alt="Amrita Desai, Group Chief Human Resources Officer" width="500" height="500" loading="lazy" decoding="async"><div class="team-card__info"><b class="team-card__name">Amrita Desai</b><span class="team-card__role">Group Chief Human Resources Officer</span></div></article></li>
      <li><a class="team-card team-card--join" href="/career" data-reveal data-delay="4"><b>Join our team</b><span>Explore careers <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></span></a></li>
    </ul>
  </div>
</section>
`;

export default html;
