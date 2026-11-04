import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { sprite, header, footer } from './content/chrome';
import { initLayout, setActiveNav, requestScrollFrame } from './runtime';
import { FooterPosts } from './slots';
import './design.css';
import './site.css';

// The home intro (preloader) plays only on the page the visitor lands on. Pages call this once when they start.
const landingPath = window.location.pathname;
let landingUsed = false;
export function isLandingPage() {
  const landing = !landingUsed && window.location.pathname === landingPath;
  landingUsed = true;
  return landing;
}

/** Links in the page HTML that should be handled by the router instead of reloading the page. */
function internalHref(anchor) {
  const href = anchor.getAttribute('href');
  if (!href || !href.startsWith('/') || href.startsWith('//')) return null;
  if (anchor.target && anchor.target !== '_self') return null;
  if (anchor.hasAttribute('download')) return null;
  const path = href.split(/[?#]/)[0];
  if (/^\/(documents|assets|static)\//.test(path) || /\.[a-z0-9]{2,5}$/i.test(path)) return null; // files
  return href;
}

/** The redesigned website's shell: icon sprite, header, mobile menu, page, footer. */
export default function SiteLayout() {
  const rootRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [footerPosts, setFooterPosts] = useState(null);

  // The design styles <html> and <body> too; scope those rules to while this layout is on screen.
  useLayoutEffect(() => {
    document.documentElement.classList.add('rg-html');
    document.body.classList.add('rg-body');
    setFooterPosts(rootRef.current.querySelector('[data-slot="footer-posts"]'));
    const cleanup = initLayout(rootRef.current);
    return () => {
      cleanup();
      document.documentElement.classList.remove('rg-html');
      document.body.classList.remove('rg-body');
    };
  }, []);

  // Same-site links in the HTML open through the router (no full page reload).
  useEffect(() => {
    const root = rootRef.current;
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest && event.target.closest('a');
      if (!anchor || !root.contains(anchor)) return;
      const href = internalHref(anchor);
      if (!href) return;
      event.preventDefault();
      const [path, hash] = href.split('#');
      if ((path || '/') === window.location.pathname && hash) {
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navigate(href);
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [navigate]);

  // New page: mark the menu item, start at the top (or at #section), refresh scroll effects.
  useLayoutEffect(() => {
    landingUsed = true; // landed on a page without the intro (e.g. /blog): never play it later
    setActiveNav(rootRef.current, location.pathname);
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    requestScrollFrame();
  }, [location.pathname, location.hash]);

  return (
    <div className="rg" ref={rootRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="rg-contents" dangerouslySetInnerHTML={{ __html: sprite + header }} />
      <Outlet />
      <div className="rg-contents" dangerouslySetInnerHTML={{ __html: footer }} />
      {footerPosts && createPortal(<FooterPosts count={3} />, footerPosts)}
    </div>
  );
}
