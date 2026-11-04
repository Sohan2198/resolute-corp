/*
 * Live parts of the design's pages, rendered by React into the empty [data-slot] elements of the page HTML:
 * blog cards and footer posts (from the Firebase blog), and the Microsoft Forms / Keka embeds.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useBlogPosts, { isoDate } from './useBlogPosts';
import { observeReveal } from './runtime';

const PITCH_FORM_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=Nuzr3ZxEQEeJ3Y8lwpCrElEh8u2_oLhFtowKYPoXBaNUQVlHQkZOWExUQlU4TEQ3Sjk4VVFXTk5UOC4u&embed=true';
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
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}

/** The existing Keka careers portal. */
export function CareerJobs() {
  return (
    <div className="embed embed--jobs">
      <iframe title="Open roles at Resolute Group" src={CAREERS_URL} width="100%" loading="lazy" />
    </div>
  );
}
