/**
 * Ruddranil.io — Centralized Technical SEO & Canonical Origin Configuration
 */
(function () {
  'use strict';

  const DEFAULT_CANONICAL_ORIGIN = 'https://ruddronil-io-kdcr.vercel.app';
  const CONFIGURED_PRODUCTION_URL = '';

  function getBaseUrl() {
    if (CONFIGURED_PRODUCTION_URL && CONFIGURED_PRODUCTION_URL.startsWith('http')) {
      return CONFIGURED_PRODUCTION_URL.replace(/\/+$/, '');
    }
    return window.location.origin || DEFAULT_CANONICAL_ORIGIN;
  }

  function normalizeCleanPath(pathname) {
    if (!pathname || pathname === '/index.html') return '/';
    return pathname.replace(/\.html$/i, '') || '/';
  }

  function applySeoMetadata() {
    try {
      const origin = getBaseUrl();
      const currentPath = normalizeCleanPath(window.location.pathname);
      const canonicalUrl = `${origin}${currentPath}`;

      // 1. Enforce or Update Canonical Link Tag
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);

      // 2. OpenGraph URL (og:url) & Twitter URL
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', canonicalUrl);

      const twUrl = document.querySelector('meta[name="twitter:url"]');
      if (twUrl) {
        twUrl.setAttribute('content', canonicalUrl);
      }

      // 3. OpenGraph & Twitter absolute image URLs (normalize any legacy /public/assets prefix)
      const imageSelectors = ['meta[property="og:image"]', 'meta[property="og:image:secure_url"]', 'meta[name="twitter:image"]'];
      imageSelectors.forEach(selector => {
        const metaTag = document.querySelector(selector);
        if (metaTag) {
          let val = (metaTag.getAttribute('content') || '').replace(/^\/?public\/assets\//, '/assets/');
          if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
            const cleanVal = val.startsWith('/') ? val : `/${val}`;
            metaTag.setAttribute('content', `${origin}${cleanVal}`);
          } else if (val && val.includes(DEFAULT_CANONICAL_ORIGIN) && origin !== DEFAULT_CANONICAL_ORIGIN) {
            metaTag.setAttribute('content', val.split(DEFAULT_CANONICAL_ORIGIN).join(origin));
          } else if (val) {
            metaTag.setAttribute('content', val);
          }
        }
      });

      // 4. Update JSON-LD Structured Data Schema URLs dynamically to match active origin
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      schemaScripts.forEach(scriptTag => {
        if (scriptTag && scriptTag.textContent) {
          let updated = scriptTag.textContent;
          if (updated.includes('YOUR_PRODUCTION_DOMAIN')) {
            updated = updated.split('YOUR_PRODUCTION_DOMAIN').join(origin);
          }
          if (updated.includes(DEFAULT_CANONICAL_ORIGIN) && origin !== DEFAULT_CANONICAL_ORIGIN) {
            updated = updated.split(DEFAULT_CANONICAL_ORIGIN).join(origin);
          }
          if (updated !== scriptTag.textContent) {
            scriptTag.textContent = updated;
          }
        }
      });
    } catch (err) {
      console.warn('[SEO Engine notice]:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySeoMetadata);
  } else {
    applySeoMetadata();
  }

  window.RUDDRANIL_SEO = {
    getBaseUrl,
    DEFAULT_CANONICAL_ORIGIN,
    CONFIGURED_PRODUCTION_URL
  };
})();
