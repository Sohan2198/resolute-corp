import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Seo from './Seo';
import SEO from './seo.json';
import { initPage } from './runtime';
import { isLandingPage } from './SiteLayout';
import { LatestPosts, PitchForm, CareerJobs } from './slots';
import CONTENT from './content';

const SLOT_COMPONENTS = {
  'blog-cards': () => <LatestPosts count={4} />,
  'pitch-form': () => <PitchForm />,
  'career-jobs': () => <CareerJobs />,
};

/**
 * A page of the redesigned website. The page HTML (src/site/content) is written into <main> as-is, the design's
 * behaviour is attached to it (src/site/runtime.js), and live parts are rendered into its [data-slot] elements.
 */
export default function DesignPage({ pageKey, seo }) {
  const mainRef = useRef(null);
  const [slots, setSlots] = useState([]);

  useLayoutEffect(() => {
    const main = mainRef.current;
    setSlots(Array.from(main.querySelectorAll('[data-slot]')));
    return initPage(main, { firstLoad: isLandingPage() });
  }, [pageKey]);

  return (
    <>
      <Seo {...(seo || SEO[pageKey])} />
      <main id="main" ref={mainRef} dangerouslySetInnerHTML={{ __html: CONTENT[pageKey] }} />
      {slots.map((node) => {
        const render = SLOT_COMPONENTS[node.dataset.slot];
        return render ? createPortal(render(), node, node.dataset.slot) : null;
      })}
    </>
  );
}
