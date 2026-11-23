// Vercel serverless function behind /blog/:slug (see the rewrite in vercel.json).
// Serves the normal app page (index.html) with that post's title, description, keywords, robots, canonical and
// social sharing tags already in the HTML, so View Page Source, SEO tools and link previews (WhatsApp, LinkedIn,
// Facebook) see them without running JavaScript. The tags come from the post's SEO fields in the admin panel,
// with the same fallbacks as src/site/pages/BlogPost.js and src/site/Seo.js; once the app loads, react-helmet
// takes over these tags (they carry data-react-helmet, like the defaults in public/index.html).
const ORIGIN = 'https://www.resolutecorp.in';
const FIRESTORE = 'https://firestore.googleapis.com/v1/projects/resolutecorp-web/databases/(default)/documents/blogs/';
const API_KEY = 'AIzaSyBvN-q_RzizPAGhmMLqAhh9ogjj3nxujbg'; // the site's public web key (also in src/firebase.js)
const DEFAULT_IMAGE = `${ORIGIN}/assets/img/banner-1-share.jpg`;
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';
const FIELDS = ['title', 'excerpt', 'banner', 'metaTitle', 'metaDescription', 'metaKeywords', 'metaRobots'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
const plainText = (html) => String(html || '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&(#\d+|#x[0-9a-f]+|\w+);/gi, (m, e) => {
    if (ENTITIES[e.toLowerCase()]) return ENTITIES[e.toLowerCase()];
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return m;
  })
  .replace(/\s+/g, ' ')
  .trim();

/** Fetches some fields of one post. Returns null when the post does not exist; throws on other failures. */
async function getPost(slug, fields) {
  const mask = fields.map((f) => `mask.fieldPaths=${f}`).join('&');
  const response = await fetch(`${FIRESTORE}${encodeURIComponent(slug)}?${mask}&key=${API_KEY}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Firestore ${response.status}`);
  const data = await response.json();
  const post = {};
  Object.entries(data.fields || {}).forEach(([name, value]) => { post[name] = typeof value.stringValue === 'string' ? value.stringValue : ''; });
  return post;
}

/** The deployed index.html. Cached per instance; each deployment has its own instances. */
let shell;
async function getShell(req) {
  if (shell) return shell;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  // Pass the cookie along so protected preview deployments can read their own file.
  const headers = req.headers.cookie ? { cookie: req.headers.cookie } : {};
  for (const url of [`https://${host}/index.html`, `${ORIGIN}/index.html`]) {
    try {
      const response = await fetch(url, { headers, redirect: 'manual' });
      const html = response.ok ? await response.text() : '';
      if (html.includes('<div id="root">')) { shell = html; return shell; }
    } catch (error) { /* try the next address */ }
  }
  throw new Error('Could not load index.html');
}

function seoTags(slug, post) {
  const field = (name) => (post[name] || '').trim();
  const title = field('metaTitle') || `${post.title} | Resolute Corp Blog`;
  const description = field('metaDescription') || post.excerpt || plainText(post.content).slice(0, 160);
  const keywords = field('metaKeywords').split(',').map((k) => k.trim()).filter(Boolean).join(', ');
  const robots = field('metaRobots') || DEFAULT_ROBOTS;
  const banner = post.banner || '';
  const image = /^https?:\/\//.test(banner) ? banner : banner.startsWith('/') ? `${ORIGIN}${banner}` : DEFAULT_IMAGE;
  const url = `${ORIGIN}/blog/${slug}`;
  const meta = (attr, key, content) => `<meta ${attr}="${key}" content="${esc(content)}" data-react-helmet="true">`;
  const link = (rel, extra) => `<link rel="${rel}" href="${esc(url)}"${extra} data-react-helmet="true">`;
  return [
    `<title>${esc(title)}</title>`,
    meta('name', 'description', description),
    meta('name', 'robots', robots),
    keywords && meta('name', 'keywords', keywords),
    link('canonical', ''),
    link('alternate', ' hreflang="en-IN"'),
    link('alternate', ' hreflang="x-default"'),
    meta('property', 'og:type', 'article'),
    meta('property', 'og:site_name', 'Resolute Group'),
    meta('property', 'og:locale', 'en_IN'),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:image:alt', post.title || ''),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
  ].filter(Boolean).join('');
}

module.exports = async function handler(req, res) {
  const slug = String((req.query && req.query.slug) || '').slice(0, 300);
  let html;
  try {
    html = await getShell(req);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Something went wrong. Please refresh the page.');
    return;
  }

  let status = 200;
  try {
    const post = slug ? await getPost(slug, FIELDS) : null;
    if (!post) {
      status = 404; // the app shows its "page not found" screen
    } else {
      if (!(post.metaDescription || '').trim() && !post.excerpt) post.content = ((await getPost(slug, ['content'])) || {}).content;
      html = html
        .replace(/<title>[\s\S]*?<\/title>/i, '')
        .replace(/<meta[^>]*data-react-helmet[^>]*>/gi, '')
        .replace(/<head>/i, `<head>${seoTags(slug, post)}`);
    }
  } catch (error) {
    // Firebase unreachable: serve the page with its default tags; the app still loads the post in the browser.
    console.error('blog-page:', error);
  }

  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // Short cache so edits in the admin panel show up within about a minute.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
  res.end(html);
};
