// src/App.tsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';

import AIChatBot from './components/AIChatBot';

// Lazy load dedicated pages for optimized performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const Careers = lazy(() => import('./components/Careers'));
const ProcessView = lazy(() => import('./components/ProcessView'));
const TeamMemberDetail = lazy(() => import('./components/TeamMemberDetail'));
const FooterNew = lazy(() => import('./components/FooterNew'));

// Minimal loading fallback
const SectionLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#050508]">
    <div className="w-9 h-9 border-2 border-[#DB2777]/30 border-t-[#DB2777] rounded-full animate-spin" />
  </div>
);

// Inner App component that has access to location
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHomePage);

  useEffect(() => {
    // Add lenis class to html
    document.documentElement.classList.add('lenis');
  }, []);

  // Only show preloader on initial homepage load
  useEffect(() => {
    if (!isHomePage) {
      setIsLoading(false);
    }
  }, [isHomePage]);

  return (
    <>
      {/* Preloader - only on homepage */}
      {isLoading && isHomePage && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Scroll to top on route change */}
      <ScrollToTop />
      
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      <SmoothScroll>
        <div className={`min-h-screen ${isLoading ? 'overflow-hidden' : ''}`}>
          
          {/* Global Navbar */}
          <Navbar />
          
          <Suspense fallback={<SectionLoader />}>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated About Page */}
              <Route path="/about" element={<AboutPage />} />

              {/* Dedicated Services Page */}
              <Route path="/services" element={<ServicesPage />} />

              {/* Dedicated Portfolio Page */}
              <Route path="/portfolio" element={<PortfolioPage />} />

              {/* Individual Project Detail Page */}
              <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />

              {/* Dedicated Contact Page */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Team Member Detail Route */}
              <Route path="/team/:id" element={<TeamMemberDetail />} />

              {/* Process Deep Dive Route */}
              <Route path="/process" element={<ProcessView />} />

              {/* Blog Page Route */}
              <Route path="/blog" element={<BlogPage />} />

              {/* Individual Blog Post Route */}
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              {/* Careers Page Route */}
              <Route path="/careers" element={<Careers />} />

              {/* Fallback redirect to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>

          {/* Global Footer */}
          <Suspense fallback={<div className="h-20 bg-[#050508]" />}>
            <FooterNew />
          </Suspense>
          
        </div>
      </SmoothScroll>

      {/* Interactive Global AI Chat Assistant */}
      <AIChatBot />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
