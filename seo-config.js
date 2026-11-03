/**
 * Ruddranil.io — Centralized Technical SEO & Canonical Origin Configuration
 * 
 * HOW TO USE ONCE DEPLOYED:
 * 1. Once you confirm your Vercel URL (e.g. 'https://ruddranil-agency.vercel.app')
 *    or your custom domain (e.g. 'https://ruddranil.io'), set it below in CONFIGURED_PRODUCTION_URL.
 * 2. If left empty (''), it automatically and safely detects the live origin from the browser!
 */
(function () {
  'use strict';

  // SET YOUR VERIFIED PRODUCTION URL HERE WHEN READY:
  // e.g. 'https://ruddranil.vercel.app' or 'https://ruddranil.io'
  // Leave empty ('') to auto-resolve dynamically based on where the app is hosted.
  const CONFIGURED_PRODUCTION_URL = '';

  function getBaseUrl() {
    if (CONFIGURED_PRODUCTION_URL && CONFIGURED_PRODUCTION_URL.startsWith('http')) {
      return CONFIGURED_PRODUCTION_URL.replace(/\/+$/, '');
    }
    return window.location.origin;
  }

  function applySeoMetadata() {
    try {
      const origin = getBaseUrl();
      const currentPath = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
      const canonicalUrl = `${origin}${currentPath}`;

      // 1. Enforce or Update Canonical Link Tag
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);

      // 2. OpenGraph URL (og:url)
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', canonicalUrl);

      // 3. OpenGraph & Twitter absolute image URLs
      const imageSelectors = ['meta[property="og:image"]', 'meta[name="twitter:image"]'];
      imageSelectors.forEach(selector => {
        const metaTag = document.querySelector(selector);
        if (metaTag) {
          const val = metaTag.getAttribute('content') || '';
          if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
            const cleanVal = val.startsWith('/') ? val : `/${val}`;
            metaTag.setAttribute('content', `${origin}${cleanVal}`);
          }
        }
      });

      // 4. Update JSON-LD Structured Data Schema URLs dynamically
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      schemaScripts.forEach(scriptTag => {
        if (scriptTag && scriptTag.textContent && scriptTag.textContent.includes('YOUR_PRODUCTION_DOMAIN')) {
          scriptTag.textContent = scriptTag.textContent.split('YOUR_PRODUCTION_DOMAIN').join(origin);
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
    CONFIGURED_PRODUCTION_URL
  };
})();
