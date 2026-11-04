import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Seo, { ORIGIN } from '../Seo';
import { isoDate } from '../useBlogPosts';
import NotFound from './NotFound';

/**
 * The blog editor saves headings as bold-only paragraphs (<p><strong>Title</strong></p>), sometimes centred, plus
 * empty bold paragraphs as spacers. Mark them so the article styles can show them as headings:
 *   article__heading           a paragraph whose text is all bold
 *   article__heading--main     ...that the editor centred (the main section titles)
 *   article__spacer            an empty paragraph (spacing now comes from the heading styles)
 */
function formatContent(html) {
  const doc = new DOMParser().parseFromString(`<div>${html || ''}</div>`, 'text/html');
  doc.querySelectorAll('p').forEach((p) => {
    const text = p.textContent.replace(/ /g, ' ').trim();
    if (!text) {
      if (!p.querySelector('img, iframe, video')) p.classList.add('article__spacer');
      return;
    }
    const bold = Array.from(p.querySelectorAll('strong, b'))
      .filter((node) => !node.parentElement.closest('strong, b'))
      .map((node) => node.textContent).join('').replace(/ /g, ' ').trim();
    if (bold === text && text.length <= 160) {
      p.classList.add('article__heading');
      if (p.classList.contains('ql-align-center')) p.classList.add('article__heading--main');
    }
  });
  return doc.body.firstChild.innerHTML;
}

const plainText = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
};

/** /blog/:slug: one post from Firebase (same data as before), in the new design. */
export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    let alive = true;
    setPost(undefined);
    getDoc(doc(db, 'blogs', slug))
      .then((snapshot) => { if (alive) setPost(snapshot.exists() ? snapshot.data() : null); })
      .catch((error) => { console.error('Error fetching blog post from Firebase:', error); if (alive) setPost(null); });
    return () => { alive = false; };
  }, [slug]);

  if (post === null) return <NotFound />;

  const path = `/blog/${slug}`;
  const description = post ? (post.excerpt || plainText(post.content).slice(0, 160)) : '';
  // Banners pasted into the editor are stored as data: URLs, which social networks cannot fetch.
  const shareImage = post && /^https?:\/\//.test(post.banner || '') ? post.banner
    : post && post.banner && post.banner.startsWith('/') ? `${ORIGIN}${post.banner}` : undefined;

  return (
    <main id="main">
      {post && (
        <Seo
          title={`${post.title} | Resolute Corp Blog`}
          description={description}
          path={path}
          ogType="article"
          image={shareImage}
          imageAlt={post.title}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            datePublished: isoDate(post.date),
            author: { '@type': 'Organization', name: post.author || 'Resolute Corp' },
            publisher: { '@id': `${ORIGIN}/#organization` },
            mainEntityOfPage: `${ORIGIN}${path}`,
            ...(shareImage ? { image: shareImage } : {}),
          }}
        />
      )}
      <div className="crumbbar">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li aria-current="page">{post ? post.title : 'Article'}</li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="section article">
        <div className="container article__container">
          {post === undefined ? (
            <div className="blog-index__status" role="status"><span className="spinner" aria-hidden="true" />Loading article…</div>
          ) : (
            <>
              <header className="article__head">
                {post.category && <span className="eyebrow">{post.category}</span>}
                <h1 className="article__title">{post.title}</h1>
                <p className="article__meta">
                  {post.author && <span>By {post.author}</span>}
                  {post.date && <time dateTime={isoDate(post.date)}>{post.date}</time>}
                </p>
              </header>
              {post.banner && <img className="article__banner" src={post.banner} alt={post.title} />}
              {/* Post HTML comes from the blog editor in the admin panel, as before. */}
              <div className="article__body" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
              <p className="article__back"><Link className="arrow-link" to="/blog">All articles <svg className="icon" aria-hidden="true"><use href="#i-arrow" /></svg></Link></p>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
