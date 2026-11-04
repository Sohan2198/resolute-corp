import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../Seo';
import SEO from '../seo.json';
import useBlogPosts from '../useBlogPosts';
import { BlogCard, useReveal } from '../slots';

const POSTS_PER_PAGE = 12;

/** /blog: all posts from Firebase, with category filter, search and pagination (same features as before). */
export default function BlogList() {
  const { posts, loading } = useBlogPosts();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const categories = useMemo(() => [...new Set(posts.map((post) => post.category).filter(Boolean))], [posts]);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter((post) => (category === 'All' || post.category === category) && (!term
      || post.title?.toLowerCase().includes(term)
      || post.excerpt?.toLowerCase().includes(term)
      || post.content?.toLowerCase().includes(term)));
  }, [posts, category, search]);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const visible = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  useReveal(gridRef, [visible]);

  const chooseCategory = (value) => { setCategory(value); setPage(1); };
  const goToPage = (value) => {
    setPage(value);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main id="main">
      <Seo {...SEO.blog} />
      <div className="crumbbar">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-current="page">Blog</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="section section--tint media blog-index" aria-labelledby="blog-title">
        <div className="container">
          <div className="media__head">
            <div>
              <span className="eyebrow is-revealed" data-reveal>Blog</span>
              <h1 className="section-title is-revealed" id="blog-title" data-reveal>Insights on investments and growth</h1>
            </div>
          </div>

          {loading ? (
            <div className="blog-index__status" role="status"><span className="spinner" aria-hidden="true" />Loading articles…</div>
          ) : (
            <>
              <div className="blog-index__tools">
                <div className="filter-chips" role="group" aria-label="Filter articles by category">
                  {['All', ...categories].map((value) => (
                    <button key={value} type="button" className={category === value ? 'is-active' : undefined}
                      aria-pressed={category === value} onClick={() => chooseCategory(value)}>{value}</button>
                  ))}
                </div>
                <label className="blog-index__search">
                  <span className="sr-only">Search articles</span>
                  <input type="search" placeholder="Search articles" value={search}
                    onChange={(event) => { setSearch(event.target.value); setPage(1); }} />
                </label>
              </div>

              <div className="blog__grid blog__grid--index" ref={gridRef}>
                {visible.length > 0
                  ? visible.map((post, i) => <BlogCard key={post.slug} post={post} delay={String((i % 4) + 1)} withImage />)
                  : <p className="blog-index__status">No articles found.</p>}
              </div>

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Blog pages">
                  <button type="button" className="pagination__step" disabled={page === 1} onClick={() => goToPage(page - 1)}>Previous</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button key={number} type="button" className={number === page ? 'is-active' : undefined}
                      aria-current={number === page ? 'page' : undefined} onClick={() => goToPage(number)}>{number}</button>
                  ))}
                  <button type="button" className="pagination__step" disabled={page === totalPages} onClick={() => goToPage(page + 1)}>Next</button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
