// src/utils/analytics.ts
// Privacy-First Telemetry & Analytics Utility for Pavion Technologies

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const COOKIE_CONSENT_KEY = 'pavion_cookie_consent_v1';
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || '';

let isInitialized = false;

export const hasConsent = (): boolean => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
  } catch (e) {
    return false;
  }
};

export const initAnalytics = (): void => {
  if (isInitialized) return;
  if (!hasConsent()) {
    // Listen for future consent grant
    window.addEventListener('pavion_consent_updated', (event: any) => {
      if (event.detail?.analytics) {
        loadGoogleAnalytics();
      }
    }, { once: true });
    return;
  }

  loadGoogleAnalytics();
};

const loadGoogleAnalytics = (): void => {
  if (!GA_MEASUREMENT_ID || isInitialized) return;

  try {
    // Inject gtag.js script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });

    isInitialized = true;
  } catch (e) {
    console.debug('Analytics initialization skipped:', e);
  }
};

export const trackPageView = (path: string, title?: string): void => {
  if (!hasConsent() || !isInitialized || !window.gtag) return;

  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  } catch (e) {
    // Ignore in non-browser or sandbox environments
  }
};

export const trackEvent = (eventName: string, params: Record<string, any> = {}): void => {
  if (!hasConsent() || !isInitialized || !window.gtag) return;

  try {
    window.gtag('event', eventName, params);
  } catch (e) {
    // Ignore error
  }
};
