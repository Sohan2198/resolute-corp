/* Page content for /media (from the design's media/index.html). Edit the HTML here. */
const html = `
<div class="crumbbar">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">Media</li>
      </ol>
    </nav>
  </div>
</div>
<!-- ============================ MEDIA: NEWS, BLOG, SOCIAL ============================ -->
<section class="section section--tint media" id="media" data-section="media" aria-labelledby="media-title">
  <div class="container">
    <div class="media__head">
      <div><span class="eyebrow" data-reveal>Insights</span><h1 class="section-title" id="media-title" data-reveal>Resolute in the news</h1></div>
      <div class="media__links" data-reveal>
        <a class="arrow-link" href="/press-releases">Press releases <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        <a class="arrow-link" href="/events-highlights">Events and highlights <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>

    <div class="filter-chips" data-news-filters role="group" aria-label="Filter news by topic" data-reveal>
      <button class="is-active" type="button" data-filter="all">All</button>
      <button type="button" data-filter="hockey">Hockey</button>
      <button type="button" data-filter="volley">Volleyball</button>
      <button type="button" data-filter="fashion">Fashion</button>
      <button type="button" data-filter="group">Group</button>
    </div>

    <a class="featured-story" href="https://www.aninews.in/news/sports/hockey/hyderabad-toofans-bag-bronze-medal-in-the-mens-hockey-india-league-2025-2620260126203001/" target="_blank" rel="noopener noreferrer" data-news-featured data-reveal>
      <div class="featured-story__media"><img src="/assets/img/hil_bronze.jpg" alt="Hyderabad Toofans celebrating their Hockey India League bronze medal" width="1920" height="801" loading="lazy" decoding="async"></div>
      <div class="featured-story__body">
        <span class="featured-story__meta">Latest · ANI News · <time datetime="2026-01-26">26 Jan 2026</time></span>
        <h3 class="featured-story__title">Hyderabad Toofans bag bronze medal in the men's Hockey India League 2025-26</h3>
        <p class="featured-story__text">Hyderabad Toofans clinched third place in the Men’s Hero Hockey India League, defeating HIL GC 4–3 in a high-scoring match at the Kalinga Hockey Stadium.</p>
        <span class="arrow-link">Read the full story <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></span>
      </div>
    </a>

    <div class="story-grid" data-news-grid>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · Telangana Today</span><time datetime="2025-10-23">23 Oct 2025</time></div>
        <h3 class="story-card__title">Delhi Toofans stun Kolkata Thunderbolts; Goa Guardians seal semifinal spot</h3>
        <p class="story-card__text">Delhi Toofans beat Kolkata Thunderbolts 3–2 (18–16, 11–15, 12–15, 15–11, 15–12) in the Prime Volleyball League.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://telanganatoday.com/delhi-toofans-stun-kolkata-thunderbolts-goa-guardians-seal-semifinal-spot" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Delhi Toofans stun Kolkata Thunderbolts; Goa Guardians seal semifinal spot</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · ANI News</span><time datetime="2025-10-10">10 Oct 2025</time></div>
        <h3 class="story-card__title">PVL 2025: Delhi Toofans beat hosts Hyderabad Black Hawks in straight sets</h3>
        <p class="story-card__text">Delhi Toofans won their first game of the season, beating hosts Hyderabad Black Hawks 3–0 (15–10, 16–14, 17–15).</p>
        <div class="story-card__links"><a class="arrow-link" href="https://www.aninews.in/news/sports/others/pvl-2025-delhi-toofans-beat-hosts-hyderabad-black-hawks-in-straight-sets20251010231037/" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: PVL 2025: Delhi Toofans beat hosts Hyderabad Black Hawks in straight sets</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="hockey">
        <div class="story-card__meta"><span>Hockey · Sportstar</span><time datetime="2025-09-24">24 Sep 2025</time></div>
        <h3 class="story-card__title">Hyderabad Toofans updated squad after HIL auction: Full players list</h3>
        <p class="story-card__text">The Hockey India League mini auction concluded in New Delhi, with franchises finalising their squads.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://sportstar.thehindu.com/hockey/hyderabad-toofans-hil-2026-full-squad/article70088030.ece" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Hyderabad Toofans updated squad after HIL auction: Full players list</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="group">
        <div class="story-card__meta"><span>Group · Times of India</span><time datetime="2025-09-01">1 Sep 2025</time></div>
        <h3 class="story-card__title">Sanghi's push into non-cricket sports</h3>
        <p class="story-card__text">The Times of India reports on the Group’s push into non-cricket sports as Gujarat emerges as a frontrunner for global events such as the 2030 Commonwealth Games and the 2036 Olympics.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://timesofindia.indiatimes.com/city/ahmedabad/the-business-of-game-as-gujarat-eyes-olympic-glory-its-corporates-are-betting-big-on-leagues-athletes-and-infrastructure/articleshow/123627911.cms" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Sanghi's push into non-cricket sports</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="hockey">
        <div class="story-card__meta"><span>Hockey · Lokmat Times · Punjab News Express</span><time datetime="2024-10-06">6 Oct 2024</time></div>
        <h3 class="story-card__title">Hyderabad Toofans eye success in new era of Hockey India League</h3>
        <p class="story-card__text">Hyderabad Toofans, owned by Resolute Sports, is one of eight franchises in the Hockey India League.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://www.lokmattimes.com/other-sports/hyderabad-toofans-eye-success-in-new-era-of-hockey-india-league/" target="_blank" rel="noopener noreferrer">Read on Lokmat Times <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a><a class="arrow-link" href="https://www.punjabnewsexpress.com/news/news/hyderabad-toofans-eye-success-in-new-era-of-hockey-india-league-264945" target="_blank" rel="noopener noreferrer">Read on Punjab News Express <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · The Hindu</span><time datetime="2024-03-24">24 Mar 2024</time></div>
        <h3 class="story-card__title">Libero Anand — a game-changer with exceptional digs</h3>
        <p class="story-card__text">The Delhi Toofans player says the libero’s role has not been fully recognised, but this is slowly changing with the arrival of the Prime Volleyball League.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://www.thehindu.com/sport/other-sports/pvl-libero-anand-a-game-changer-with-exceptional-digs/article67988777.ece" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Libero Anand — a game-changer with exceptional digs</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · Sportstar</span><time datetime="2024-03-20">20 Mar 2024</time></div>
        <h3 class="story-card__title">Newcomers Delhi Toofans eyes title against table-toppers Calicut Heroes</h3>
        <p class="story-card__text">Led by the reliable Saqlain Tariq, Delhi Toofans defied expectations to defeat the reigning champions in the eliminator.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://sportstar.thehindu.com/volleyball/pro-volleyball-league-pvl-2024-final-delhi-toofans-vs-calicut-heroes-preview-news-squad-updates/article67972313.ece" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Newcomers Delhi Toofans eyes title against table-toppers Calicut Heroes</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · Sportstar</span><time datetime="2024-03-20">20 Mar 2024</time></div>
        <h3 class="story-card__title">Fresh-faced Delhi Toofans trumps odds to enter title clash</h3>
        <p class="story-card__text">Led by the seasoned Indian international Saqlain Tariq, who was also making his PVL debut, the team defied the odds to reach the final.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://sportstar.thehindu.com/volleyball/pvl-2024-delhi-toofans-pro-volleyball-league-calicut-heroes-final-maiden-season/article67971123.ece" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Fresh-faced Delhi Toofans trumps odds to enter title clash</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · Onmanorama</span><time datetime="2024-03-19">19 Mar 2024</time></div>
        <h3 class="story-card__title">Prime Volleyball League: Delhi Toofans eliminate Defenders</h3>
        <p class="story-card__text">Delhi Toofans reached the final with a dramatic five-set win over Ahmedabad Defenders in the eliminator in Chennai.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://www.onmanorama.com/sports/other-sports/2024/03/19/prime-volleyball-league-delhi-toofans-vs-ahmedabad-defenders.html" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Prime Volleyball League: Delhi Toofans eliminate Defenders</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · The Times of India</span><time datetime="2024-03-03">3 Mar 2024</time></div>
        <h3 class="story-card__title">Delhi Toofans end Kolkata Thunderbolts campaign</h3>
        <p class="story-card__text">Delhi Toofans won in straight sets (15–9, 16–14, 17–15) in the third season of the RuPay Prime Volleyball League.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://timesofindia.indiatimes.com/sports/more-sports/others/prime-volleyball-league-delhi-toofans-end-kolkata-thunderbolts-campaign-with-dominant-win/articleshow/108184196.cms" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Delhi Toofans end Kolkata Thunderbolts campaign</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="volley">
        <div class="story-card__meta"><span>Volleyball · The Times of India</span><time datetime="2024-02-18">18 Feb 2024</time></div>
        <h3 class="story-card__title">Prime Volleyball League: Delhi Toofans stun Bengaluru Torpedoes</h3>
        <p class="story-card__text">The newest franchise in the league upset the Bengaluru Torpedoes in the third season of the RuPay Prime Volleyball League.</p>
        <div class="story-card__links"><a class="arrow-link" href="https://timesofindia.indiatimes.com/sports/more-sports/others/prime-volleyball-league-delhi-toofans-stun-bengaluru-torpedoes-get-dominant-win-to-get-off-the-mark/articleshow/107800814.cms" target="_blank" rel="noopener noreferrer">Read the full story<span class="sr-only">: Prime Volleyball League: Delhi Toofans stun Bengaluru Torpedoes</span> <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a></div>
      </article>
      <article class="story-card" data-category="fashion">
        <div class="story-card__meta"><span>Fashion · Elle Magazine</span><time datetime="2021-10-01">1 Oct 2021</time></div>
        <h3 class="story-card__title">Hair Drama Co. x Disney Cruella featured in Elle</h3>
        <p class="story-card__text">Elle looked back at the 1990s and their return to fashion, featuring a collection from the Hair Drama Co. x Disney collaboration.</p>
        <div class="story-card__links"></div>
      </article>
      <article class="story-card" data-category="fashion">
        <div class="story-card__meta"><span>Fashion · Cosmopolitan</span><time datetime="2020-02-13">13 Feb 2020</time></div>
        <h3 class="story-card__title">Hair Drama Co. featured in Cosmopolitan India</h3>
        <p class="story-card__text">Cosmopolitan India named Hair Drama Co. among the best hair accessory brands to watch.</p>
        <div class="story-card__links"></div>
      </article>
    </div>
    <div class="media__more"><button class="btn btn--navy" type="button" data-news-more data-magnetic>View more stories <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></button></div>

    <div class="blog" id="blog">
      <div class="media__head">
        <div><span class="eyebrow" data-reveal>Blog</span><h2 class="section-title" data-reveal>Perspectives on investing, markets and growth</h2></div>
        <a class="arrow-link" href="/blog" data-reveal>Read all articles <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
      <div class="blog__grid" data-slot="blog-cards"></div>
    </div>

    <div class="social-follow" data-reveal>
      <p>Follow Resolute Corp for updates from across our ventures.</p>
      <div class="social-links">
        <a href="https://www.linkedin.com/company/resolutecorp/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on LinkedIn"><svg class="icon icon--solid" aria-hidden="true"><use href="#i-linkedin"/></svg></a>
        <a href="https://www.instagram.com/resolute.corp/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on Instagram"><svg class="icon" aria-hidden="true"><use href="#i-instagram"/></svg></a>
        <a href="https://www.facebook.com/people/Resolute-Corp/61559078189329/" target="_blank" rel="me noopener noreferrer" aria-label="Resolute Corp on Facebook"><svg class="icon icon--solid" aria-hidden="true"><use href="#i-facebook"/></svg></a>
      </div>
    </div>
  </div>
</section>
`;

export default html;
