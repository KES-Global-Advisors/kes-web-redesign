// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload hero image
    const heroImage = new Image()
    heroImage.src = '/assets/KES-Banner-5.webp'
    
    // Preload fonts
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = '/fonts/inter-var.woff2'
    document.head.appendChild(link)
  }
}

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    })
  }
  return null
}

// Reduce JavaScript bundle size
export const loadScriptAsync = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}