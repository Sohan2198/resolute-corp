// Vercel serverless function behind /sitemap.xml (see the rewrite in vercel.json; robots.txt points here).
// Lists the main pages below plus every blog post in Firebase, so posts published or deleted in the admin panel
// are added to or removed from the sitemap automatically (within the cache time below).
const ORIGIN = 'https://www.resolutecorp.in';
const FIRESTORE = 'https://firestore.googleapis.com/v1/projects/resolutecorp-web/databases/(default)/documents/blogs';
const API_KEY = 'AIzaSyBvN-q_RzizPAGhmMLqAhh9ogjj3nxujbg'; // the site's public web key (also in src/firebase.js)

// Main pages: [address, last changed, change frequency, priority]. Add a line here when a new page is added.
const PAGES = [
  ['/', '2026-11-04', 'weekly', '1.0'],
  ['/about', '2026-11-04', 'monthly', '0.9'],
  ['/portfolio', '2026-11-04', 'monthly', '0.9'],
  ['/leadership', '2026-11-04', 'monthly', '0.8'],
  ['/media', '2026-11-04', 'weekly', '0.8'],
  ['/scheme-of-arrangement', '2026-11-04', 'yearly', '0.6'],
  ['/career', '2026-11-04', 'monthly', '0.7'],
  ['/pitch', '2026-11-04', 'monthly', '0.7'],
  ['/faq', '2026-11-04', 'monthly', '0.6'],
  ['/privacy-policy', '2026-11-04', 'yearly', '0.3'],
  ['/portfolio/sharesquare', '2026-11-04', 'monthly', '0.7'],
  ['/portfolio/hair-drama-co', '2026-11-04', 'monthly', '0.7'],
  ['/portfolio/delhi-toofans', '2026-11-04', 'monthly', '0.7'],
  ['/portfolio/hyderabad-toofans', '2026-11-04', 'monthly', '0.7'],
  ['/blog', null, 'weekly', '0.8'], // last changed = newest post
  ['/press-releases', '2026-11-04', 'monthly', '0.6'],
  ['/events-highlights', '2026-11-04', 'monthly', '0.5'],
];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));

/** Every post's address and the day it was last saved in the admin panel. */
async function getPosts() {
  const posts = [];
  let pageToken = '';
  do {
    const url = `${FIRESTORE}?pageSize=300&mask.fieldPaths=title&key=${API_KEY}${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Firestore ${response.status}`);
    const data = await response.json();
    (data.documents || []).forEach((d) => posts.push({ slug: d.name.split('/').pop(), lastmod: (d.updateTime || '').slice(0, 10) }));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return posts.sort((a, b) => b.lastmod.localeCompare(a.lastmod) || a.slug.localeCompare(b.slug));
}

const entry = (loc, lastmod, changefreq, priority) =>
  `  <url><loc>${esc(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

module.exports = async function handler(req, res) {
  let posts;
  try {
    posts = await getPosts();
  } catch (error) {
    // Better to ask search engines to come back than to hand them a sitemap without the blog posts.
    console.error('sitemap:', error);
    res.statusCode = 503;
    res.setHeader('Retry-After', '600');
    res.end('Sitemap temporarily unavailable.');
    return;
  }

  const newest = posts.length ? posts[0].lastmod : null;
  const urls = [
    ...PAGES.map(([page, lastmod, changefreq, priority]) => entry(`${ORIGIN}${page}`, lastmod || newest, changefreq, priority)),
    ...posts.map((post) => entry(`${ORIGIN}/blog/${encodeURIComponent(post.slug)}`, post.lastmod, 'monthly', '0.6')),
  ];

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Cached for 10 minutes, so new or deleted posts show up within about that long.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
};
