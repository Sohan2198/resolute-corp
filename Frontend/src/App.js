import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PreLoader from './components/layout/PreLoader';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import Portfolio from './components/pages/portfolio/Portfolio';
import Career from './components/pages/career/Career';
import Blog from './components/pages/blog/Blog';
import BlogPostDetail from './components/pages/blog/BlogPostDetail';
import PressReleases from './components/pages/media/PressReleases';
import EventsHighlights from './components/pages/media/EventsHighlights';
import SchemeOfArrangement from './components/pages/media/SchemeOfArrangement';
import Pitch from './components/pages/media/Pitch';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

// Admin Components
import { AdminProvider } from './contexts/AdminContext';
import AdminLogin from './components/pages/admin/AdminLogin';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import BlogManager from './components/pages/admin/BlogManager';
import ContentManager from './components/pages/admin/ContentManager';

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <AdminProvider>
      <PreLoader/>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Header and Footer */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={
                <Suspense fallback={<div>Components are loading please wait....</div>}>
                  <Helmet>
                    <title>Distinguished Investment Firm in India | Global Investment Firm | Resolutecorp</title>
                    <meta name="description" content="Resolute Group drives financial growth across sectors like Cement, Real Estate, Fashion, and Sports with innovative strategies and risk diversification."/>
                    <meta name="keywords" content="Distinguished investment firm, distinguished investment firm in India, global investment firm, investment management, financial services"/>
                    <meta name="robots" content="index,follow"/>
                  </Helmet>
                  <Home/>
                </Suspense>
              } />
              <Route path="about" element={<About />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="career" element={<Career />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPostDetail />} />
              <Route path="pitch" element={<Pitch />} />
              <Route path="events-highlights" element={<EventsHighlights />} />
              <Route path="press-releases" element={<PressReleases />} />
              <Route path="scheme-of-arrangement" element={<SchemeOfArrangement />} />
            </Route>

            {/* Admin Routes (No public Header/Footer) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/blog" element={<BlogManager />} />
            <Route path="/admin/dashboard/content" element={<ContentManager />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AdminProvider>
  );
};

export default App;
