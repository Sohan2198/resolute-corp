/* Page content for /faq (from the design's faq/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">FAQ</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ FAQ ============================ -->
<section class="section" id="faq" data-section="faq" aria-labelledby="faq-title">
  <div class="container">
    <div class="faq__layout">
      <div class="faq__intro">
        <span class="eyebrow" data-reveal>FAQ</span>
        <h1 class="section-title" id="faq-title" data-reveal>Frequently asked questions</h1>
        <p class="section-lead" data-reveal>Answers to common questions about how Resolute Corp operates, invests and grows.</p>
        <div class="faq__cta" data-reveal><a class="btn btn--navy" href="/pitch" data-magnetic>Have another question? Get in touch <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></div>
      </div>
      <div data-faq>
        <div class="faq-item is-open" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="true">How does Resolute Corp operate?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Resolute Corp is a diversified investment and venture-building group. It invests in and builds businesses across real estate, fashion and sports, combining financial discipline, industry expertise and hands-on operational leadership to scale brands in India and international markets.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">Where does Resolute Corp operate and invest?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Resolute Corp was founded in Ahmedabad, India. Its ventures include ShareSquare in Dubai, sports franchises across India and lifestyle brands that reach global markets. This cross-border presence lets the Group pursue opportunities in both mature and developing economies.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">Who leads Resolute Corp?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Resolute Corp is led by Alok Sanghi, Managing Director, a finance and economics graduate of Indiana University with expertise in operational excellence, risk management and strategic diversification. Priyanka Sanghi, founder of Hair Drama Co., leads the Group’s lifestyle portfolio and has taken the brand to international markets.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">How is Resolute Corp involved in hockey and volleyball?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Through Resolute Sports, Resolute Corp owns and manages two professional teams: Delhi Toofans in the Prime Volleyball League and Hyderabad Toofans in the Hockey India League. These investments support its aim to promote sports culture, strengthen grassroots development and nurture athletic talent across India. Delhi Toofans have been award winners in every season since their 2024 debut.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">What distinguishes Resolute Corp’s portfolio?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Resolute Corp invests in high-growth, high-engagement sectors (sports, lifestyle and real estate), which offers the potential for both financial returns and strong brand visibility.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">How has Hair Drama Co. grown under Priyanka Sanghi’s leadership?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Hair Drama Co. has broadened its product range and entered international markets through influencer marketing, global trend forecasting and omnichannel retail, positioning itself as a premium lifestyle accessory brand.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">What is ShareSquare?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>ShareSquare is a Dubai-based fractional real estate investment platform for premium UAE properties. Investors can own shares in properties, diversify their portfolios and participate in potential appreciation and rental income. Returns are not guaranteed.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">Does Resolute Corp seek strategic partnerships?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Yes. Resolute Corp actively seeks collaborations with global brands, technology providers and event organisers to widen market reach, improve operational efficiency and open new revenue streams for each portfolio company.</p></div></div>
        </div>
        <div class="faq-item" data-faq-item>
          <h3><button class="faq-item__question" type="button" data-faq-trigger aria-expanded="false">What is Resolute Corp’s long-term investment philosophy?<span class="faq-item__toggle" aria-hidden="true"></span></button></h3>
          <div class="faq-item__answer"><div><p>Resolute Corp’s philosophy is rooted in strategic diversification, innovation-driven growth and responsible investing. Whether developing premium urban spaces, building sports franchises or scaling fashion brands, it focuses on creating financial value while fostering community development, sustainability and brand equity across its sectors.</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

export default html;
