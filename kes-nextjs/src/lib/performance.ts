// Enhanced performance utilities for better Core Web Vitals

// Preload critical resources with priority
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload hero image with high priority
  const heroImage = new Image();
  heroImage.src = 'https://i.postimg.cc/tTPMrGpV/KES-Banner-5.webp';
  heroImage.loading = 'eager';

  // Preload logo image
  const logoImage = new Image();
  logoImage.src = '/assets/KES-Logo-print.png';
  logoImage.loading = 'eager';

  // Preload critical fonts with font-display: swap
  const preloadFont = (href: string, fontName: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    document.head.appendChild(link);

    // Add font-display: swap for better CLS
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${fontName}';
        font-display: swap;
        src: url('${href}') format('woff2');
      }
    `;
    document.head.appendChild(style);
  };

  // Preload Inter font
  preloadFont('/fonts/inter-var.woff2', 'Inter');
};

// Enhanced Intersection Observer with better performance
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: [0, 0.1, 0.5, 1],
    ...options,
  });
};

// Lazy load scripts with better error handling
export const loadScriptAsync = (src: string, options: {
  id?: string;
  defer?: boolean;
  async?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
} = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (options.id && document.getElementById(options.id)) {
      options.onLoad?.();
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = options.async !== false;
    script.defer = options.defer || false;
    
    if (options.id) {
      script.id = options.id;
    }

    script.onload = () => {
      options.onLoad?.();
      resolve();
    };

    script.onerror = () => {
      const scriptError = new Error(`Failed to load script: ${src}`);
      options.onError?.(scriptError);
      reject(scriptError);
    };

    document.head.appendChild(script);
  });
};

// Optimize images with better compression and format detection
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined') return;

  // Check WebP support
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('webp') !== -1;
  };

  // Check AVIF support
  const supportsAVIF = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('avif') !== -1;
  };

  return {
    webp: supportsWebP(),
    avif: supportsAVIF(),
  };
};

// Enhanced resource hints
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;

  const hints = [
    // DNS prefetch for external domains
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
    { rel: 'dns-prefetch', href: '//i.postimg.cc' },
    
    // Preconnect to critical domains
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: '' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
    
    // Prefetch likely next pages
    { rel: 'prefetch', href: '/services' },
    { rel: 'prefetch', href: '/about' },
    { rel: 'prefetch', href: '/contact' },
  ];

  hints.forEach(({ rel, href, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin !== undefined) {
      link.crossOrigin = crossOrigin;
    }
    document.head.appendChild(link);
  });
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Measure key performance metrics
  const measurements = {
    navigationStart: performance.timing.navigationStart,
    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
    firstPaint: 0,
    firstContentfulPaint: 0,
  };

  // Get paint timings
  const paintEntries = performance.getEntriesByType('paint');
  paintEntries.forEach(entry => {
    if (entry.name === 'first-paint') {
      measurements.firstPaint = entry.startTime;
    } else if (entry.name === 'first-contentful-paint') {
      measurements.firstContentfulPaint = entry.startTime;
    }
  });

  return measurements;
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  if (typeof window === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.log('Service Worker registration failed:', error);
  }
};

// Reduce layout shift by reserving space for dynamic content
export const reserveSpaceForContent = (selector: string, height: number) => {
  if (typeof window === 'undefined') return;

  const element = document.querySelector(selector);
  if (element) {
    (element as HTMLElement).style.minHeight = `${height}px`;
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Run on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      addResourceHints();
    });
  } else {
    preloadCriticalResources();
    addResourceHints();
  }

  // Register service worker after page load
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
};