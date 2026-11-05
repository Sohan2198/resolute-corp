# Website redesign (`src/site`)

The main website (everything except `/resolutesports`, `/sponsorship-privacy-notice` and `/admin`) uses the
redesign from the design package `Resolute-Website-Multipage` (4 Nov 2026), rebuilt inside this React app.
Addresses, Google Analytics, the Search Console tag, the Firebase blog, Keka and Microsoft Forms are unchanged.

| What | Where |
|---|---|
| Text and layout of a page | `content/<page>.js`: the page's HTML, as in the design. Edit it like an HTML file. |
| Header, mobile menu, footer, icons | `content/chrome.js` |
| Page title, description, structured data | `seo.json` (one entry per page) |
| Which address shows which page | `src/App.js` |
| Animations and interactions (hero, reveal, ventures deck, FAQ, news filters, menu) | `runtime.js` (port of the design's `main.js`) |
| Blog cards on Home and Media, footer "Latest from our blog" | `slots.js`, from Firebase (`useBlogPosts.js`) |
| Pitch form (Microsoft Forms) and careers (Keka) | `slots.js` |
| Blog list and blog post pages | `pages/BlogList.js`, `pages/BlogPost.js` |
| Images | `public/assets/img/` |

## Styles

- `design/main.css` is the designer's stylesheet, unchanged. **Do not import it directly.**
- `src/site/design.css` is generated from it, with every rule scoped to the site (`.rg`) so it cannot affect
  `/resolutesports` or the admin panel. After changing `design/main.css`, run `node scripts/scope-design-css.js`.
- `src/site/site.css` holds the additions the design did not cover (embedded forms, blog pages, "Coming soon").

## Live parts inside page HTML

A page's HTML can contain an empty element such as `<div data-slot="blog-cards"></div>`; `DesignPage.js` renders the
matching React component into it (`blog-cards`, `pitch-form`, `career-jobs`).

Links in the page HTML that start with `/` open through the router without reloading the page. Links to files
(`/documents/...pdf`, `/assets/...`) and links with `target="_blank"` behave normally.

## Open items from the design

- Alok Sanghi's cut-out portrait: save it as `public/assets/img/alok-sanghi.webp`. Until then his current photo is
  shown in a frame (automatic fallback).
- Privacy Policy (`content/privacy.js`): draft for legal review. "How our forms work" and "Cookies and tracking" were
  corrected for Microsoft Forms, Keka and Google Analytics.
