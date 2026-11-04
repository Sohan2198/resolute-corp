import { Helmet } from 'react-helmet';

export const ORIGIN = 'https://www.resolutecorp.in';
const DEFAULT_IMAGE = `${ORIGIN}/assets/img/banner-1.jpg`;
const DEFAULT_IMAGE_ALT = 'Resolute Group: Fuelling innovation. Empowering tomorrow.';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

/**
 * Page title, description, canonical address, social sharing tags and structured data (JSON-LD).
 * `path` is the page's address on this site; leave it out for pages that should not have a canonical (404).
 */
export default function Seo({ title, description, path, robots, ogType = 'website', image, imageAlt, jsonLd }) {
  const url = path != null ? `${ORIGIN}${path}` : null;
  const shareImage = image || DEFAULT_IMAGE;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots || DEFAULT_ROBOTS} />
      {url && <link rel="canonical" href={url} />}
      {url && <link rel="alternate" hrefLang="en-IN" href={url} />}
      {url && <link rel="alternate" hrefLang="x-default" href={url} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Resolute Group" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:alt" content={imageAlt || DEFAULT_IMAGE_ALT} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
