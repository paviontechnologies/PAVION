// src/components/SmoothScroll.tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    // On touch devices (phones & tablets), rely on native momentum scrolling for maximum responsiveness
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Detect Safari / WebKit (macOS / iOS)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Initialize Lenis smooth scroll: In Safari, preserve native 120Hz trackpad physics to avoid heavy scroll drag
    const lenis = new Lenis({
      duration: isSafari ? 0.75 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isSafari, // Safari trackpad has native momentum; synthetic wheel causes heavy drag
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // Enable lag smoothing so dropped frames don't cause sudden jerks or animation halts
    gsap.ticker.lagSmoothing(500, 33);

    // Handle anchor links
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target as HTMLElement, {
            offset: -100,
            duration: 1.5,
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(updateLenis);
    };
  }, [isHomePage]);

  // Handle route change - clean up and reinitialize
  useEffect(() => {
    if (!isHomePage && lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    // Scroll to top
    if (isHomePage && lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger after a delay to allow lazy components to render
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(refreshTimeout);
  }, [location.pathname, isHomePage]);

  return <>{children}</>;
};

export default SmoothScroll;
