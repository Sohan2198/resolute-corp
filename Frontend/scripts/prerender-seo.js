// Runs after `react-scripts build` (see "build" in package.json).
// For every main page, writes a copy of build/index.html with that page's title, description, robots, canonical,
// social sharing tags and structured data already in the HTML, so View Page Source, SEO tools and link previews
// see them without running JavaScript. The tags are the same ones src/site/Seo.js sets in the browser, taken
// from src/site/seo.json (and, for the two Resolute Sports pages, from the constants in their components).
// vercel.json serves each page's file at its address (the "/seo-pages/..." rewrites); blog posts are handled
// separately by api/blog-page.js. Once the app loads, react-helmet takes over these tags (data-react-helmet).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const OUT_DIR = 'seo-pages';
const ORIGIN = 'https://www.resolutecorp.in';
const DEFAULT_IMAGE = `${ORIGIN}/assets/img/banner-1-share.jpg`;
const DEFAULT_IMAGE_ALT = 'Resolute Group: Fuelling innovation. Empowering tomorrow.';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Same tags as src/site/Seo.js. */
function seoTags({ title, description, path: pagePath, robots, keywords, ogType = 'website', image, imageAlt, jsonLd }) {
  const url = `${ORIGIN}${pagePath}`;
  const shareImage = image || DEFAULT_IMAGE;
  const meta = (attr, key, content) => `<meta ${attr}="${key}" content="${esc(content)}" data-react-helmet="true">`;
  const link = (rel, extra) => `<link rel="${rel}" href="${esc(url)}"${extra} data-react-helmet="true">`;
  return [
    `<title>${esc(title)}</title>`,
    description && meta('name', 'description', description),
    meta('name', 'robots', robots || DEFAULT_ROBOTS),
    keywords && meta('name', 'keywords', keywords),
    link('canonical', ''),
    link('alternate', ' hreflang="en-IN"'),
    link('alternate', ' hreflang="x-default"'),
    meta('property', 'og:type', ogType),
    meta('property', 'og:site_name', 'Resolute Group'),
    meta('property', 'og:locale', 'en_IN'),
    meta('property', 'og:title', title),
    description && meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', shareImage),
    meta('property', 'og:image:alt', imageAlt || DEFAULT_IMAGE_ALT),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    description && meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', shareImage),
    jsonLd && `<script type="application/ld+json" data-react-helmet="true">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('');
}

/** Reads a `const NAME = '...';` string constant from a component file. */
function constant(file, name) {
  const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const match = source.match(new RegExp(`const ${name} = '((?:[^'\\\\]|\\\\.)*)';`));
  return match ? match[1].replace(/\\(.)/g, '$1') : undefined;
}

function pages() {
  const seo = require(path.join(ROOT, 'src/site/seo.json'));
  // The home page is index.html itself, whose default tags are the home page's; it also serves unknown
  // addresses, so it gets no canonical here.
  const list = Object.values(seo).filter((page) => page.path && page.path !== '/');
  const sports = 'src/components/pages/resolutesports/';
  list.push(
    { path: '/resolutesports', title: constant(`${sports}ResoluteSports.js`, 'PAGE_TITLE'), description: constant(`${sports}ResoluteSports.js`, 'PAGE_DESCRIPTION') },
    { path: '/sponsorship-privacy-notice', title: constant(`${sports}SponsorshipPrivacyNotice.js`, 'PAGE_TITLE') },
  );
  return list.filter((page) => page.title);
}

function main() {
  const shell = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
  // Pages without a description of their own keep the default one, as they do in the browser.
  const defaultDescription = ((shell.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '')
    .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  const stripped = shell.replace(/<title>[\s\S]*?<\/title>/i, '').replace(/<meta[^>]*data-react-helmet[^>]*>/gi, '');
  if (!/<head>/i.test(stripped)) throw new Error('build/index.html has no <head>');

  const rewrites = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).rewrites || [];
  const list = pages();
  list.forEach((page) => {
    const file = path.join(BUILD, OUT_DIR, `${page.path}.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, stripped.replace(/<head>/i, `<head>${seoTags({ description: defaultDescription, ...page })}`));
    const destination = `/${OUT_DIR}${page.path}.html`;
    if (!rewrites.some((r) => r.source === page.path && r.destination === destination)) {
      console.warn(`prerender-seo: vercel.json has no rewrite { "source": "${page.path}", "destination": "${destination}" }, so the page's tags will not be in its HTML.`);
    }
  });
  console.log(`prerender-seo: wrote page tags for ${list.length} pages into build/${OUT_DIR}/`);
}

main();
