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

// Graceful Error Boundary
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-3 text-red-400">Something went wrong</h2>
          <p className="text-gray-400 max-w-md mb-6 text-sm">We apologize for the inconvenience. Please refresh or return to the homepage.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2.5 bg-gradient-to-r from-[#DB2777] to-[#60A5FA] rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Reload Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Inner App component that has access to location
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const [isLoading, setIsLoading] = useState(() => {
    if (!isHomePage) return false;
    try {
      return !sessionStorage.getItem('pavion_preloader_seen');
    } catch {
      return true;
    }
  });

  const handleComplete = React.useCallback(() => {
    setIsLoading(false);
    try {
      sessionStorage.setItem('pavion_preloader_seen', 'true');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Add lenis class to html
    document.documentElement.classList.add('lenis');
  }, []);

  // Hard safety timeout: guaranteed to unlock the screen within 2.2s maximum
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // If navigated away from homepage, immediately hide preloader
  useEffect(() => {
    if (!isHomePage) {
      setIsLoading(false);
    }
  }, [isHomePage]);

  return (
    <ErrorBoundary>
      {/* Preloader - only on initial homepage visit */}
      {isLoading && isHomePage && <Preloader onComplete={handleComplete} />}
      
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
    </ErrorBoundary>
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
