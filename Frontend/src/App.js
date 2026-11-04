import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import './App.css';

import PreLoader from './components/layout/PreLoader';
import ResoluteSports from './components/pages/resolutesports/ResoluteSports';
import SponsorshipPrivacyNotice from './components/pages/resolutesports/SponsorshipPrivacyNotice';

// Redesigned website (src/site)
import SiteLayout from './site/SiteLayout';
import DesignPage from './site/DesignPage';
import BlogList from './site/pages/BlogList';
import BlogPost from './site/pages/BlogPost';
import NotFound from './site/pages/NotFound';

// Admin Components
import { AdminProvider } from './contexts/AdminContext';
import AdminLogin from './components/pages/admin/AdminLogin';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import BlogManager from './components/pages/admin/BlogManager';
import ContentManager from './components/pages/admin/ContentManager';

// Pages that keep their own design (Resolute Sports, admin) keep the original loading screen.
const LegacyLayout = () => (
  <>
    <PreLoader />
    <Outlet />
  </>
);

const page = (key) => <DesignPage key={key} pageKey={key} />;

function App() {
  return (
    <AdminProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Main website, new design */}
            <Route path="/" element={<SiteLayout />}>
              <Route index element={page('home')} />
              <Route path="about" element={page('about')} />
              <Route path="portfolio" element={page('portfolio')} />
              <Route path="portfolio/sharesquare" element={page('sharesquare')} />
              <Route path="portfolio/hair-drama-co" element={page('hairDramaCo')} />
              <Route path="portfolio/delhi-toofans" element={page('delhiToofans')} />
              <Route path="portfolio/hyderabad-toofans" element={page('hyderabadToofans')} />
              <Route path="leadership" element={page('leadership')} />
              <Route path="media" element={page('media')} />
              <Route path="press-releases" element={page('pressReleases')} />
              <Route path="events-highlights" element={page('eventsHighlights')} />
              <Route path="scheme-of-arrangement" element={page('investors')} />
              <Route path="investors" element={<Navigate to="/scheme-of-arrangement" replace />} />
              <Route path="career" element={page('career')} />
              <Route path="pitch" element={page('pitch')} />
              <Route path="faq" element={page('faq')} />
              <Route path="privacy-policy" element={page('privacy')} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<LegacyLayout />}>
              {/* Resolute Sports landing page (has its own header and footer) */}
              <Route path="/resolutesports" element={<ResoluteSports />} />
              <Route path="/sponsorship-privacy-notice" element={<SponsorshipPrivacyNotice />} />

              {/* Admin Routes (No public Header/Footer) */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/dashboard/blog" element={<BlogManager />} />
              <Route path="/admin/dashboard/content" element={<ContentManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AdminProvider>
  );
};

export default App;
