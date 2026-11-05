/*
 * Live parts of the design's pages, rendered by React into the empty [data-slot] elements of the page HTML:
 * blog cards and footer posts (from the Firebase blog), and the Microsoft Forms / Keka embeds.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts, { isoDate } from './useBlogPosts';
import { observeReveal } from './runtime';

const PITCH_FORM_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=Nuzr3ZxEQEeJ3Y8lwpCrElEh8u2_oLhFtowKYPoXBaNUQVlHQkZOWExUQlU4TEQ3Sjk4VVFXTk5UOC4u&embed=true';
// The same form outside the frame: Microsoft shows a "Fill out the form" screen instead of the form in browsers
// that block third-party cookies or storage, so offer a direct link as well.
const PITCH_FORM_DIRECT_URL = PITCH_FORM_URL.replace('&embed=true', '');
const CAREERS_URL = 'https://resolute.keka.com/careers/jobdetails/';

export function BlogCard({ post, delay, withImage = false }) {
  return (
    <article className={`blog-card${withImage ? ' blog-card--image' : ''}`} data-reveal data-delay={delay}>
      {withImage && post.banner && (
        <Link className="blog-card__image" to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <img src={post.banner} alt="" loading="lazy" />
        </Link>
      )}
      <div className="blog-card__meta"><span>{post.category}</span><time dateTime={isoDate(post.date)}>{post.date}</time></div>
      <h3 className="blog-card__title"><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      {withImage && post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
      {post.author && <p className="blog-card__author">By {post.author}</p>}
    </article>
  );
}

/** Reveals [data-reveal] children once they are on the page (they arrive after the page's own reveal ran). */
export function useReveal(ref, deps) {
  useEffect(() => {
    if (!ref.current) return undefined;
    return observeReveal(Array.from(ref.current.querySelectorAll('[data-reveal]:not(.is-revealed)')));
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/** The latest posts as cards; rendered inside the design's .blog__grid. */
export function LatestPosts({ count = 4 }) {
  const { posts } = useBlogPosts();
  const latest = posts.slice(0, count);
  const anchor = useRef(null);
  useEffect(() => {
    const grid = anchor.current && anchor.current.parentNode;
    if (!grid) return undefined;
    return observeReveal(Array.from(grid.querySelectorAll('[data-reveal]:not(.is-revealed)')));
  }, [latest.length]);
  return (
    <>
      {latest.map((post, i) => <BlogCard key={post.slug} post={post} delay={String(i + 1)} />)}
      <span ref={anchor} hidden />
    </>
  );
}

/** "Latest from our blog" in the footer. */
export function FooterPosts({ count = 3 }) {
  const { posts } = useBlogPosts();
  return posts.slice(0, count).map((post) => (
    <li key={post.slug}>
      <Link to={`/blog/${post.slug}`}>{post.title}<time dateTime={isoDate(post.date)}>{post.date}</time></Link>
    </li>
  ));
}

/** The existing Microsoft Forms pitch form. */
export function PitchForm() {
  return (
    <div className="embed embed--form">
      <iframe
        title="Pitch your idea to Resolute"
        src={PITCH_FORM_URL}
        width="100%"
        height="600"
        allowFullScreen
      />
      <p className="embed__fallback">
        Form not loading?{' '}
        <a href={PITCH_FORM_DIRECT_URL} target="_blank" rel="noopener noreferrer">Open the pitch form in a new tab</a>
      </p>
    </div>
  );
}

/**
 * The existing Keka careers portal. Opening a job (or going back to the list) loads a new Keka page at the top of
 * the frame, while the visitor may be scrolled far down it; bring the top of the frame into view each time.
 */
export function CareerJobs() {
  const frameRef = useRef(null);
  const loads = useRef(0);
  const onFrameLoad = () => {
    loads.current += 1;
    if (loads.current === 1) return; // the first load is the job list itself
    const frame = frameRef.current;
    if (frame && frame.getBoundingClientRect().top < 0) {
      const header = document.querySelector('[data-header]');
      const offset = (header ? header.getBoundingClientRect().height : 0) + 16;
      window.scrollTo({ top: frame.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };
  return (
    <div className="embed embed--jobs">
      <iframe ref={frameRef} title="Open roles at Resolute Group" src={CAREERS_URL} width="100%" loading="lazy" onLoad={onFrameLoad} />
      <p className="embed__fallback">
        Openings not loading, or prefer a full page?{' '}
        <a href={CAREERS_URL} target="_blank" rel="noopener noreferrer">Open our careers page in a new tab</a>
      </p>
    </div>
  );
}
