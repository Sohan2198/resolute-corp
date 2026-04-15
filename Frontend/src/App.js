import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Career from './components/Career';
import Home from './components/Home';
import Pitch from './components/Pitch';
import { Suspense } from 'react';
import PreLoader from './components/PreLoader';
import Blog from './components/Blog';
import { Helmet } from 'react-helmet';
import BlogPostDetail from './components/BlogPostDetail';
import EventsHighlights from './components/EventsHighlights';
import PressReleases from './components/PressReleases';


function App() {
  return (
    <>
    <PreLoader/>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path='/' element={
            <Suspense fallback={<div>Components are loading please wait....</div>}
            >
              <Helmet>
                <title>Distinguished Investment Firm in India | Global Investment Firm | Resolutecorp</title>
                <meta name="description" content="Resolute Group drives financial growth across sectors like Cement, Real Estate, Fashion, and Sports with innovative strategies and risk diversification."/>
                <meta name="keywords" content="Distinguished investment firm, distinguished investment firm in India, global investment firm, investment management, financial services"/>
                <meta name="robots" content="index,follow"/>
              </Helmet>
              <Home/>
            </Suspense>
          }
          />
          <Route path="/about" Component={About} />
          <Route path="/portfolio" Component={Portfolio} />
          <Route path="/career" Component={Career} />
          <Route path='/blog' Component={Blog} />
          <Route path='/:slug' Component={BlogPostDetail} />
          <Route path="/pitch" Component={Pitch} />
          <Route path="/events-highlights" Component={EventsHighlights} />
          <Route path="/press-releases" Component={PressReleases} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </>
  );
  
};

export default App;
